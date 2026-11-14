import { CONTACT_LIMITS, validateContact, type ContactErrorCode, type ContactInput, type ContactResponse } from "@/lib/contact";
import { isContactEmailConfigured, sendContactEmail } from "@/lib/contact-email";
import { trustedClientIp } from "@/lib/rating-visitor";
import { siteConfig } from "@/lib/site";

/**
 * POST /api/contact  { name, email, subject, message, website (honeypot), startedAt }
 *
 * Contact form endpoint (docs/CONTACT_FORM_SETUP.md):
 * same-origin JSON only -> size limit -> honeypot + timing check -> rate limit
 * -> shared validation -> email through Resend (server-side key).
 * "ok: true" is returned ONLY after the email provider accepted the message
 * for delivery (acceptance, not proof that it reached the inbox).
 * Messages are not stored anywhere and never logged.
 */

const STATUS: Record<ContactErrorCode, number> = {
  invalid_request: 400,
  forbidden: 403,
  rate_limited: 429,
  not_configured: 503,
  delivery_failed: 502,
};

function reply(body: ContactResponse, status = 200, headers?: HeadersInit) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

function fail(error: ContactErrorCode, extra: Partial<Extract<ContactResponse, { ok: false }>> = {}, headers?: HeadersInit) {
  return reply({ ok: false, error, ...extra }, STATUS[error], headers);
}

/** Same-origin check (CSRF protection), same rule as the rating vote API. */
function isSameOrigin(request: Request): boolean {
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite && fetchSite !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return false;
  return new Set([new URL(request.url).origin, new URL(siteConfig.url).origin]).has(origin);
}

/*
 * Rate limit kept in server memory (no database, owner decision): at most
 * 5 messages per network per 10 minutes and 30 in total per hour per server
 * instance. On Vercel each instance has its own memory, so this is a basic
 * limit, not a hard guarantee (docs/CONTACT_FORM_SETUP.md).
 */
const PER_NETWORK = { limit: 5, windowMs: 10 * 60 * 1000 };
const GLOBAL = { limit: 30, windowMs: 60 * 60 * 1000 };
const hits = new Map<string, number[]>();

function rateLimited(key: string, now: number): number | null {
  const check = (k: string, { limit, windowMs }: { limit: number; windowMs: number }) => {
    const recent = (hits.get(k) ?? []).filter((t) => now - t < windowMs);
    hits.set(k, recent);
    return recent.length >= limit ? Math.ceil((recent[0] + windowMs - now) / 1000) : null;
  };
  const wait = check(`net:${key}`, PER_NETWORK) ?? check("global", GLOBAL);
  if (wait !== null) return wait;
  hits.get(`net:${key}`)!.push(now);
  hits.get("global")!.push(now);
  if (hits.size > 5_000) hits.clear(); // memory safety
  return null;
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) return fail("forbidden");
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return fail("invalid_request");

  const text = await request.text();
  if (new TextEncoder().encode(text).length > CONTACT_LIMITS.bodyMaxBytes) return fail("invalid_request");
  let input: Partial<ContactInput>;
  try {
    const parsed: unknown = JSON.parse(text);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return fail("invalid_request");
    input = parsed as Partial<ContactInput>;
  } catch {
    return fail("invalid_request");
  }

  // Spam checks: the hidden field must be empty and the form must not be sent instantly.
  const now = Date.now();
  const started = typeof input.startedAt === "number" ? input.startedAt : NaN;
  if (input.website !== "") return fail("invalid_request");
  if (!Number.isFinite(started) || now - started < CONTACT_LIMITS.minFillMs || now - started > CONTACT_LIMITS.maxFillMs) {
    return fail("invalid_request");
  }

  const { values, errors } = validateContact(input);
  if (!values) return fail("invalid_request", { fields: errors });

  if (!isContactEmailConfigured()) return fail("not_configured");

  const wait = rateLimited(trustedClientIp(request.headers), now);
  if (wait !== null) return fail("rate_limited", {}, { "Retry-After": String(wait) });

  const result = await sendContactEmail(values);
  if (!result.accepted) {
    // Status and provider error name only: never the message, name, or email address.
    console.error(`Contact email not accepted by the provider: ${result.status}${result.reason ? ` (${result.reason})` : ""}`);
    return fail("delivery_failed");
  }
  // ok = the email provider accepted the message for delivery (not proof of inbox receipt).
  return reply({ ok: true });
}
