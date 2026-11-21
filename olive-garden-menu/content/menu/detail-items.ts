import type { AllergenMapping, MenuOffering, MenuProduct, NutritionMapping } from "@/lib/types";
import { defineOfferings } from "@/lib/menu-data";
import { menuOfferings } from "@/content/menu/offerings";

/**
 * Detail-only menu records (owner decision 2026-11-19): distinct items that
 * exist on Olive Garden's menu only as a choice inside another inventory entry,
 * so they get their own product record and item page WITHOUT adding cards to
 * the homepage or category tables (the owner's 210 + 21 inventory stays exact).
 *
 * The three homemade soups are choices of "Homemade Soups" (bowl, half gallon,
 * gallon). Prices are the official prices of those entries, which apply to
 * every soup; calories come from each soup's own official nutrition row.
 * Zuppa Toscana already has a page (gluten-sensitive listing).
 *
 * Read through lib/content.ts (getOffering, getMenuProduct) and
 * lib/nutrition-data.ts like every other record. Never listed in a category.
 */

const BOWL = {
  amount: 9.29,
  unit: null,
  locationId: "orlando-fl-millenia-mall",
  sourceUrl: "https://www.olivegarden.com/menu/homemade-soups/prod81927",
  sourceNote: "Online ordering, Order Type: Pickup; one price for every soup choice",
  checkedAt: "2026-11-12",
};
const HALF_GALLON = {
  amount: 20.49,
  unit: null,
  locationId: "orlando-fl-millenia-mall",
  sourceUrl: "https://www.olivegarden.com/menu/homemade-soups-serves-6/prod7840053",
  sourceNote: "Online ordering, Order Type: Pickup; one price for every soup choice",
  checkedAt: "2026-11-12",
};
const GALLON = {
  amount: 32.49,
  unit: null,
  locationId: "orlando-fl-millenia-mall",
  sourceUrl: "https://www.olivegarden.com/menu/homemade-soups-large-serves-12/prod7840064",
  sourceNote: "Online ordering, Order Type: Pickup; one price for every soup choice",
  checkedAt: "2026-11-12",
};

const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";

type SoupInput = { productId: string; name: string; v: boolean; bowl: number; half: number; gallon: number; desc: string };

function soupOfferings(s: SoupInput) {
  const base = {
    displayName: s.name,
    productId: s.productId,
    inventoryName: null,
    isNewOfficialItem: false,
    caloriesSourceUrl: NUTRITION_PDF,
    caloriesValueBasis: "official" as const,
    availability: "available" as const,
    status: "verified" as const,
    verifiedAt: "2026-11-15",
  };
  return [
    ...defineOfferings("soups-salad-and-breadsticks", [
      {
        ...base,
        officialName: `${s.name}${s.v ? " (V)" : ""}`,
        description: s.desc,
        portionType: "regular",
        servingSize: "One bowl",
        prices: [BOWL],
        calories: s.bowl,
        caloriesBasis: "per bowl",
        notes: "Detail-only record: one of the four choices of Homemade Soups (soups-salad-and-breadsticks--homemade-soups).",
      },
    ]),
    ...defineOfferings("family-style-meals", [
      {
        ...base,
        variant: "half-gallon",
        officialName: `${s.name}, half gallon (Homemade Soups, Serves 6)`,
        description: `A half gallon of ${s.name} to take home, about six servings.`,
        portionType: "family-style",
        servingSize: "Half gallon, serves 6",
        prices: [HALF_GALLON],
        calories: s.half,
        caloriesBasis: "per half gallon (total)",
        notes: "Detail-only record: soup choice of Homemade Soups (Serves 6).",
      },
      {
        ...base,
        variant: "gallon",
        officialName: `${s.name}, one gallon (Homemade Soups Large, Serves 12)`,
        description: `A gallon of ${s.name} for a group, about twelve servings.`,
        portionType: "family-style",
        servingSize: "One gallon, serves 12",
        prices: [GALLON],
        calories: s.gallon,
        caloriesBasis: "per gallon (total)",
        notes: "Detail-only record: soup choice of Homemade Soups Large (Serves 12).",
      },
    ]),
  ];
}

const SOUPS: SoupInput[] = [
  {
    productId: "chicken-and-gnocchi-soup",
    name: "Chicken & Gnocchi Soup",
    v: false,
    bowl: 230,
    half: 1870,
    gallon: 3750,
    desc: "A creamy soup of roasted chicken, traditional Italian dumplings (gnocchi) and spinach, one of Olive Garden’s four homemade soups.",
  },
  {
    productId: "pasta-e-fagioli-soup",
    name: "Pasta e Fagioli Soup",
    v: false,
    bowl: 150,
    half: 1170,
    gallon: 2350,
    desc: "A hearty soup of white and red beans, ground beef, tomatoes and small tube pasta in broth, one of Olive Garden’s four homemade soups.",
  },
  {
    productId: "minestrone-soup",
    name: "Minestrone Soup",
    v: true,
    bowl: 110,
    half: 850,
    gallon: 1700,
    desc: "A vegetable soup with beans and pasta in a tomato broth, marked vegetarian (V) by Olive Garden.",
  },
];

export const detailOfferings: MenuOffering[] = SOUPS.flatMap(soupOfferings);

const img = (file: string, alt: string) => ({
  src: `/images/soups-salad-and-breadsticks/${file}`,
  alt,
  width: 600,
  height: 450,
  credit: "Site owner",
  license: "AI-generated illustration supplied by the site owner",
  aiGenerated: true,
});

/** Products of the detail-only records (owner photos already in /public, IMAGE_MANIFEST.md). */
export const detailProducts: MenuProduct[] = [
  {
    id: "chicken-and-gnocchi-soup",
    name: "Chicken & Gnocchi Soup",
    description: null,
    image: img("chicken-and-gnocchi-soup.webp", "A bowl of creamy chicken and gnocchi with sliced chicken, spinach, and carrots, topped with grated cheese"),
    plannedImageSrc: "/images/soups-salad-and-breadsticks/chicken-and-gnocchi-soup.webp",
    imageIssue: null,
  },
  {
    id: "pasta-e-fagioli-soup",
    name: "Pasta e Fagioli Soup",
    description: null,
    image: img("pasta-e-fagioli.webp", "A bowl of pasta e fagioli with white beans, ground beef, small tube pasta, and tomatoes, topped with grated cheese"),
    plannedImageSrc: "/images/soups-salad-and-breadsticks/pasta-e-fagioli.webp",
    imageIssue: null,
  },
  {
    id: "minestrone-soup",
    name: "Minestrone Soup",
    description: null,
    image: img("minestrone.webp", "A bowl of minestrone with beans, small pasta, vegetables, and tomatoes in a tomato broth, topped with grated cheese"),
    plannedImageSrc: "/images/soups-salad-and-breadsticks/minestrone.webp",
    imageIssue: null,
  },
];

/** Official rows of the detail-only records (row ids only; values stay in the generated guide files). */
export const detailNutritionMap: Readonly<Record<string, NutritionMapping>> = {
  "soups-salad-and-breadsticks--chicken-and-gnocchi-soup": { status: "exact", rowId: "p4-chicken-and-gnocchi-soup" },
  "family-style-meals--chicken-and-gnocchi-soup--half-gallon": { status: "exact", rowId: "p21-chicken-and-gnocchi-half-gallon" },
  "family-style-meals--chicken-and-gnocchi-soup--gallon": { status: "exact", rowId: "p21-chicken-and-gnocchi-one-gallon" },
  "soups-salad-and-breadsticks--pasta-e-fagioli-soup": { status: "exact", rowId: "p4-pasta-fagioli-soup" },
  "family-style-meals--pasta-e-fagioli-soup--half-gallon": { status: "exact", rowId: "p21-pasta-fagioli-half-gallon" },
  "family-style-meals--pasta-e-fagioli-soup--gallon": { status: "exact", rowId: "p22-pasta-fagioli-one-gallon" },
  "soups-salad-and-breadsticks--minestrone-soup": { status: "exact", rowId: "p4-minestrone-soup" },
  "family-style-meals--minestrone-soup--half-gallon": { status: "exact", rowId: "p21-minestrone-half-gallon" },
  "family-style-meals--minestrone-soup--gallon": { status: "exact", rowId: "p21-minestrone-one-gallon" },
};

export const detailAllergenMap: Readonly<Record<string, AllergenMapping>> = {
  "soups-salad-and-breadsticks--chicken-and-gnocchi-soup": { status: "exact", rowId: "a2-chicken-and-gnocchi-soup" },
  "family-style-meals--chicken-and-gnocchi-soup--half-gallon": { status: "not-covered", note: "The allergen guide does not list family-style or catering sizes." },
  "family-style-meals--chicken-and-gnocchi-soup--gallon": { status: "not-covered", note: "The allergen guide does not list family-style or catering sizes." },
  "soups-salad-and-breadsticks--pasta-e-fagioli-soup": { status: "exact", rowId: "a3-pasta-fagioli-soup" },
  "family-style-meals--pasta-e-fagioli-soup--half-gallon": { status: "not-covered", note: "The allergen guide does not list family-style or catering sizes." },
  "family-style-meals--pasta-e-fagioli-soup--gallon": { status: "not-covered", note: "The allergen guide does not list family-style or catering sizes." },
  "soups-salad-and-breadsticks--minestrone-soup": { status: "exact", rowId: "a3-minestrone-soup" },
  "family-style-meals--minestrone-soup--half-gallon": { status: "not-covered", note: "The allergen guide does not list family-style or catering sizes." },
  "family-style-meals--minestrone-soup--gallon": { status: "not-covered", note: "The allergen guide does not list family-style or catering sizes." },
};

/** Every offering record: the 231 menu offerings plus the detail-only ones. */
export const allOfferings: MenuOffering[] = [...menuOfferings, ...detailOfferings];
