import { cacheLife, cacheTag } from "next/cache";
import { getAllMenuProductIds } from "@/lib/content";
import { getSupabaseClient, isSupabaseConfigured } from "@/lib/supabase";
import type { RatingsPayload } from "@/lib/rating-types";

/** Cache tag of the rating summaries (the voting API refreshes it, Lesson 7.4.5). */
export const RATINGS_CACHE_TAG = "ratings";

/**
 * Average and vote count of every product, read with ONE database call
 * (public.get_rating_summaries, publishable key, read-only). Cached on the
 * server for about a minute, so many visitors cost one query per minute.
 * Server-only: browsers fetch the result from /api/ratings.
 *
 * Throws when the database cannot be reached, so a failure is never cached
 * (the route handler turns it into `available: false` for that request).
 */
export async function getRatingSummaries(): Promise<RatingsPayload> {
  "use cache";
  cacheLife("minutes");
  cacheTag(RATINGS_CACHE_TAG);

  if (!isSupabaseConfigured()) throw new Error("Supabase is not configured.");

  // Free Plan projects can answer slowly after a pause; allow 15 s.
  const { data, error } = await getSupabaseClient()
    .rpc("get_rating_summaries", { p_product_ids: getAllMenuProductIds() })
    .abortSignal(AbortSignal.timeout(15_000));
  if (error || !data) throw new Error(`Rating summaries unavailable${error ? `: ${error.code}` : ""}`);

  const keys: RatingsPayload["keys"] = {};
  const ratings: RatingsPayload["ratings"] = {};
  for (const row of data) {
    if (!row.rating_key) continue; // product not registered for ratings
    if (row.rating_key !== row.product_id) keys[row.product_id] = row.rating_key;
    // Only real votes: unrated dishes are left out (= "Not rated yet").
    if (row.rating_count > 0 && row.average_rating !== null) {
      ratings[row.rating_key] = { average: Number(row.average_rating), count: row.rating_count };
    }
  }
  return { available: true, keys, ratings };
}
