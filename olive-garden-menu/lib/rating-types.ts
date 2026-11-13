/**
 * Rating data shared by the server (lib/ratings.ts, app/api/ratings/**)
 * and the browser components (components/rating/).
 * Ratings are genuine visitor votes only (docs/RATING_SYSTEM.md).
 */

/** Average (1.00-5.00) and vote count of one rated dish. */
export type RatingSummaryData = {
  average: number;
  count: number;
};

/** GET /api/ratings */
export type RatingsPayload = {
  /** false = the database could not be reached; show "Ratings unavailable". */
  available: boolean;
  /**
   * Products that share another product's rating (confirmed aliases):
   * productId -> ratingKey. Every other product's rating key is its own id.
   */
  keys: Record<string, string>;
  /**
   * Only dishes with at least one vote, keyed by rating key. A missing key
   * means 0 votes ("Not rated yet").
   */
  ratings: Record<string, RatingSummaryData>;
};

/** POST /api/ratings/vote request body. */
export type VoteRequest = {
  productId: string;
  rating: number;
};

export type VoteErrorCode =
  | "invalid_request"
  | "unknown_product"
  | "forbidden"
  | "rate_limited"
  | "unavailable";

/** POST /api/ratings/vote response body. */
export type VoteResponse =
  | {
      ok: true;
      /** created = new vote, updated = changed rating, unchanged = same rating again. */
      result: "created" | "updated" | "unchanged";
      productId: string;
      ratingKey: string;
      average: number;
      count: number;
    }
  | { ok: false; error: VoteErrorCode };

/** Valid product id format (same rule as the database). */
export const PRODUCT_ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function isValidStars(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 1 && value <= 5;
}
