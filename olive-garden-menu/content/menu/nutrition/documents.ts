import type { OfficialDocument } from "@/lib/types";

/**
 * Official Olive Garden documents for nutrition and allergen facts (U.S.
 * restaurants only). docs/product-pages/NUTRITION_ALLERGEN_DATA.md.
 *
 * Owner decision 2026-11-15: use the official PDFs; the owner supplies the
 * files when direct access fails. Copies live in research/official-sources/
 * (git-ignored, never in public/). Never fill in values from any other source.
 */
export const officialDocuments: readonly OfficialDocument[] = [
  {
    id: "us-nutrition-guide",
    title: "Olive Garden Nutrition Information (U.S. Restaurants, excludes Hawaii)",
    url: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    market: "USA",
    // Footer code on every page; PDF created 2026-09-11. 25 pages, 303 rows entered.
    versionCode: "US_101926",
    status: "entered",
    obtainedBy: "owner",
    receivedAt: "2026-11-15",
    localCopy: "research/official-sources/olive_garden_nutrition.pdf",
  },
  {
    id: "us-allergen-guide",
    title: "Olive Garden Allergen Guide (U.S. Restaurants, excludes Hawaii)",
    url: "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf",
    market: "USA",
    // Footer code on every page; PDF created 2026-09-30. 11 pages, 112 rows entered.
    versionCode: "US_101926",
    status: "entered",
    obtainedBy: "owner",
    receivedAt: "2026-11-15",
    localCopy: "research/official-sources/allergen_guide.pdf",
  },
  {
    id: "us-veg-vegan-guide",
    title: "Olive Garden Vegetarian and Vegan Menu (U.S. Restaurants)",
    url: "https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf",
    market: "USA",
    versionCode: null,
    status: "not-received",
    obtainedBy: null,
    receivedAt: null,
    localCopy: null,
  },
];

/**
 * Official cross-contact statements of the U.S. allergen guide (page 1),
 * paraphrased. Shown on item pages; never shortened into a "safe" claim.
 */
export const allergenGuideNotes = {
  basis: "Olive Garden's allergen guide is based on information from its suppliers and does not show which items may have been made in a facility with an allergen.",
  crossContact:
    "Because of shared cooking and preparation areas, Olive Garden says it cannot completely rule out cross-contact or guarantee that any item is free of any allergen.",
  fryerGrill: "Olive Garden marks items cooked in its fryer or on its grill, because these carry a special cross-contact risk.",
  pastaCooker: "Pastas with and without egg are cooked in the same pasta cooker.",
  gluten: "Olive Garden kitchens are not gluten-free, so cross-contact with gluten is possible.",
  notify: "Olive Garden asks guests with a food allergy or intolerance to tell their server.",
} as const;
