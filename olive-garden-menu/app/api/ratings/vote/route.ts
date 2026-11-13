import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { getAllMenuProductIds } from "@/lib/content";
import { getSupabaseAdminClient, isSupabaseAdminConfigured } from "@/lib/supabase-admin";
import {
  createVisitor,
  isRatingSecretConfigured,
  networkHash,
  readVisitorId,
  trustedClientIp,
  visitorHash,
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
} from "@/lib/rating-visitor";
import { RATINGS_CACHE_TAG } from "@/lib/ratings";
import { siteConfig } from "@/lib/site";
import { isValidStars, PRODUCT_ID_PATTERN, type VoteErrorCode, type VoteResponse } from "@/lib/rating-types";

/**
 * POST /api/ratings/vote  { "productId": "tiramisu", "rating": 4 }
 *
 * The only way to create or change a rating (docs/RATING_SYSTEM.md):
 * same-origin JSON only -> validate -> server-issued visitor cookie ->
 * HMAC hashes -> public.submit_rating() with the secret key (server only).
 * The database enforces one vote per visitor per dish and the rate limits.
 */

const MAX_BODY_BYTES = 1024;
const KNOWN_PRODUCTS = new Set(getAllMenuProductIds());

const STATUS: Record<VoteErrorCode, number> = {
  invalid_request: 400,
  unknown_product: 404,
  forbidden: 403,
  rate_limited: 429,
  unavailable: 503,
};

function reply(body: VoteResponse, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function fail(error: VoteErrorCode, headers?: HeadersInit) {
  return reply({ ok: false, error }, STATUS[error], headers);
}

/** Same-origin check: blocks votes sent from other websites (CSRF). */
function isSameOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const allowed = new Set([new URL(request.url).origin, new URL(siteConfig.url).origin]);
  return allowed.has(origin);
}

function submit(productId: string, visitorId: string, headers: Headers, rating: number) {
  return getSupabaseAdminClient()
    .rpc("submit_rating", {
      p_product_id: productId,
      p_visitor_hash: visitorHash(visitorId),
      p_network_hash: networkHash(trustedClientIp(headers)),
      p_rating: rating,
    })
    .abortSignal(AbortSignal.timeout(15_000));
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return fail("forbidden");
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return fail("invalid_request");
  }

  // Small JSON body only.
  const text = await request.text();
  if (text.length > MAX_BODY_BYTES) return fail("invalid_request");
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return fail("invalid_request");
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) return fail("invalid_request");
  const { productId, rating } = body as Record<string, unknown>;
  if (typeof productId !== "string" || productId.length > 80 || !PRODUCT_ID_PATTERN.test(productId)) {
    return fail("invalid_request");
  }
  if (!isValidStars(rating)) return fail("invalid_request");
  if (!KNOWN_PRODUCTS.has(productId)) return fail("unknown_product");

  if (!isSupabaseAdminConfigured() || !isRatingSecretConfigured()) return fail("unavailable");

  // Trusted visitor id: only from our own signed cookie, otherwise a new one.
  const jar = await cookies();
  let visitorId = readVisitorId(jar.get(VISITOR_COOKIE)?.value);
  let newCookie: string | null = null;
  if (!visitorId) {
    const visitor = createVisitor();
    visitorId = visitor.id;
    newCookie = visitor.cookieValue;
  }

  let data: Awaited<ReturnType<typeof submit>>["data"] = null;
  let error: { code?: string; message?: string } | null = null;
  try {
    ({ data, error } = await submit(productId, visitorId, request.headers, rating));
  } catch (e) {
    error = { message: e instanceof Error ? e.message : "network error" };
  }

  // The visitor cookie is set even when the vote fails, so a retry keeps the same identity.
  if (newCookie) {
    jar.set(VISITOR_COOKIE, newCookie, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: VISITOR_COOKIE_MAX_AGE,
    });
  }

  if (error) {
    const message = error.message ?? "";
    if (message.includes("rate_limited")) return fail("rate_limited", { "Retry-After": "3600" });
    if (message.includes("unknown_product")) return fail("unknown_product");
    if (message.includes("invalid_rating")) return fail("invalid_request");
    // Short log only (an outage can return a whole HTML error page); never logs ids or hashes.
    console.error("submit_rating failed:", error.code ?? "", message.slice(0, 200));
    return fail("unavailable");
  }

  const row = data?.[0];
  if (!row || row.average_rating === null) return fail("unavailable");

  // Refresh the cached summaries so the next page view shows the new totals.
  revalidateTag(RATINGS_CACHE_TAG, { expire: 0 });

  return reply({
    ok: true,
    result: row.result,
    productId: row.product_id,
    ratingKey: row.rating_key,
    average: Number(row.average_rating),
    count: row.rating_count,
  });
}
