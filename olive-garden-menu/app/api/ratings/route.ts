import { connection } from "next/server";
import { getRatingSummaries } from "@/lib/ratings";
import type { RatingsPayload } from "@/lib/rating-types";

/**
 * GET /api/ratings: averages and vote counts of all products in one small
 * JSON response (read-only, no visitor data). Pages load it once in the
 * browser, so the static menu HTML never waits for the database.
 *
 * The handler runs on every request (`connection()` first), but the database
 * is still read at most about once a minute: `getRatingSummaries` is a
 * `"use cache"` function (cacheLife "minutes", refreshed by the voting API).
 * A failed database read is never cached: that request alone gets
 * `available: false` (shown as "Ratings unavailable", never as zero votes),
 * and the next request tries the database again.
 *
 * Why not a static (prerendered) route: when a background refresh of a
 * static route hit a database error, calling `connection()` inside the error
 * branch was not allowed and the refresh failed with HTTP 500
 * (docs/seo/SEO_FIX_LIST.md P2-1, fixed 2026-11-14).
 */
/** Same CDN caching as the earlier static route (1 minute, then refreshed in the background). */
const SUCCESS_CACHE = "public, s-maxage=60, stale-while-revalidate=3540";

export async function GET() {
  await connection();
  try {
    return Response.json(await getRatingSummaries(), { headers: { "Cache-Control": SUCCESS_CACHE } });
  } catch {
    const unavailable: RatingsPayload = { available: false, keys: {}, ratings: {} };
    return Response.json(unavailable, { headers: { "Cache-Control": "no-store" } });
  }
}
