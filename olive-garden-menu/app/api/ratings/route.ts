import { connection } from "next/server";
import { getRatingSummaries } from "@/lib/ratings";
import type { RatingsPayload } from "@/lib/rating-types";

/**
 * GET /api/ratings: averages and vote counts of all products in one small
 * JSON response (read-only, no visitor data). Pages load it once in the
 * browser, so the static menu HTML never waits for the database.
 * A failed database read is answered for this request only (never cached).
 */
export async function GET() {
  try {
    return Response.json(await getRatingSummaries());
  } catch {
    await connection(); // keep the failure out of the prerendered/cached response
    const unavailable: RatingsPayload = { available: false, keys: {}, ratings: {} };
    return Response.json(unavailable, { headers: { "Cache-Control": "no-store" } });
  }
}
