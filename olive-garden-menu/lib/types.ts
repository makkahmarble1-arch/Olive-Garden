/**
 * Shared data shapes. TypeScript uses these to catch mistakes in content files.
 */

/** "verified" = checked against a real source. Anything else is not shown as fact. */
export type VerificationStatus = "verified" | "needs-verification";

export type MenuItem = {
  name: string;
  /** Price in US dollars. `null` = not verified yet (never guess). */
  price: number | null;
  /** Calories. `null` = not verified yet (never guess). */
  calories: number | null;
  status: VerificationStatus;
  /** Where the price/calories came from (e.g. official nutrition PDF, store menu). */
  source: string | null;
  /** Location the price was checked at (prices vary by location). */
  location: string | null;
  /** ISO date, e.g. "2026-11-10". */
  lastChecked: string | null;
};

export type MenuCategory = {
  /** Used in the URL: /menu/[slug] */
  slug: string;
  name: string;
  summary: string;
  /**
   * "placeholder" = temporary design content, no real page yet.
   * "published" = real, owner-approved content with its own page.
   */
  contentStatus: "placeholder" | "published";
  items: MenuItem[];
  /** ISO date of the last content update. */
  updatedAt: string | null;
};
