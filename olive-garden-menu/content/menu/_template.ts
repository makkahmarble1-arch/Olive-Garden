import type { MenuCategory } from "@/lib/types";

/**
 * TEMPLATE ONLY. Not imported anywhere and never shown on the site.
 *
 * When the owner provides verified data for a category:
 * 1. Copy this file to content/menu/<slug>.ts
 * 2. Fill in real items. Unknown price/calories stay `null`.
 * 3. Replace the matching placeholder in categories.ts with the new import.
 */
export const menuCategoryTemplate: MenuCategory = {
  slug: "replace-with-category-slug",
  name: "Replace With Category Name",
  summary: "Replace with a one-sentence summary of the category.",
  contentStatus: "placeholder", // "published" only after owner approval
  updatedAt: null,
  items: [
    {
      name: "Replace With Item Name",
      description: null,
      price: null, // e.g. 12.99, only if verified
      calories: null, // e.g. 850, only if verified
      status: "needs-verification", // "verified" once checked against a source
      source: null, // e.g. "Official nutrition information (PDF)"
      location: null, // e.g. "Orlando, FL"
      lastChecked: null, // e.g. "2026-11-10"
    },
  ],
};
