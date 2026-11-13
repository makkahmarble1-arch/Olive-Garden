/**
 * Supabase database types (docs/SUPABASE_SETUP.md, docs/RATING_SYSTEM.md).
 *
 * Written by hand to match supabase/migrations/001_create_ratings.sql.
 * The rating tables live in the private schema `ratings_private`, which
 * the Data API does not expose, so only the two public functions appear
 * here. Update this file whenever a migration changes them.
 */
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

/** One row of get_rating_summaries / submit_rating. */
type RatingSummaryRow = {
  product_id: string;
  /** Product whose ratings are shared (null for an unknown product id). */
  rating_key: string | null;
  /** Average 1.00-5.00 with two decimals; null when there are no votes. */
  average_rating: number | null;
  rating_count: number;
};

export type Database = {
  public: {
    Tables: Record<never, never>;
    Views: Record<never, never>;
    Functions: {
      /** Public read (publishable key): averages and counts, max 300 ids per call. */
      get_rating_summaries: {
        Args: { p_product_ids: string[] };
        Returns: RatingSummaryRow[];
      };
      /** Server only (secret key / service_role). Browsers get "permission denied". */
      submit_rating: {
        Args: { p_product_id: string; p_visitor_hash: string; p_network_hash: string; p_rating: number };
        Returns: (RatingSummaryRow & { rating_key: string; result: "created" | "updated" | "unchanged" })[];
      };
    };
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
