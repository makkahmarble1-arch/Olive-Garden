import type { OfferingInput } from "@/lib/menu-data";

/**
 * TEMPLATE ONLY. Not imported anywhere and never shown on the site.
 *
 * Shows how ONE entry in content/menu/offerings/<category>.ts looks once its
 * values are verified (docs/MENU_RESEARCH_PLAN.md). Steps:
 * 1. Add the approved restaurant to content/menu/locations.ts first.
 * 2. In the category file, find the entry and add only the verified fields.
 * 3. Set status: "verified" and verifiedAt. Unknown fields stay out (= null).
 * The build fails if a value is stored without status "verified", or a price
 * has no approved location or source.
 *
 * All values below are "REPLACE" placeholders, not real data.
 */
export const verifiedOfferingTemplate: OfferingInput = {
  inventoryName: "Exact text from MENU_INVENTORY.md (do not change)",
  displayName: "Public Item Name",
  productId: "product-id-from-products-ts",
  prices: [
    {
      amount: 0, // REPLACE: verified price in USD, e.g. 12.99
      unit: null, // e.g. "per entree", "per half pan"
      locationId: "REPLACE-with-id-from-locations-ts",
      sourceUrl: "https://REPLACE-with-official-page", // or null + sourceNote
      sourceNote: null,
      checkedAt: "YYYY-MM-DD",
    },
  ],
  calories: null, // e.g. 1180, only from official nutrition information
  caloriesMax: null, // only if the official value is a range
  caloriesBasis: null, // e.g. "per entree"
  caloriesSourceUrl: null, // official nutrition page/PDF
  servingSize: null, // e.g. "Serves 4-6", as stated officially
  availability: "unknown", // "available" only when confirmed
  status: "verified",
  verifiedAt: "YYYY-MM-DD",
  notes: null,
};
