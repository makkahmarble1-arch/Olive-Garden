import { defineOfferings, type OfferingInput } from "@/lib/menu-data";
import type { ImageRef } from "@/lib/types";

/** Owner-provided photo in public/images/appetizers/ (credit: site owner). */
function ownerPhoto(file: string, alt: string, width: number, height: number): ImageRef {
  return {
    src: `/images/appetizers/${file}`,
    alt,
    width,
    height,
    credit: "Site owner",
    license: "Owner-provided",
  };
}

/* ---------- Verified research, 2026-11-11 (research/appetizers/) ---------- */

const CHECKED = "2026-11-11";
const LOCATION = "orlando-fl-millenia-mall";
/** Official nutrition PDF (sources.md S6), pages 2-4. */
const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";

type VerifiedInput = {
  /** Online pickup price at the reference restaurant. */
  price: number;
  /** Official item page the price was read from (Millenia selected). */
  priceUrl: string;
  priceUnit?: string;
  /** From the official nutrition PDF. `null` = not verified. */
  calories: number | null;
  /** Upper end when the official value depends on a choice (e.g. the sauce). */
  caloriesMax?: number;
  caloriesBasis?: string;
  servingSize?: string;
  notes?: string;
};

/** Fields for an offering whose price (and usually calories) was verified. */
function verified(v: VerifiedInput): Partial<OfferingInput> {
  return {
    prices: [
      {
        amount: v.price,
        unit: v.priceUnit ?? null,
        locationId: LOCATION,
        sourceUrl: v.priceUrl,
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: CHECKED,
      },
    ],
    calories: v.calories,
    caloriesMax: v.caloriesMax ?? null,
    caloriesBasis: v.caloriesBasis ?? null,
    caloriesSourceUrl: v.calories === null ? null : NUTRITION_PDF,
    servingSize: v.servingSize ?? null,
    availability: "available",
    status: "verified",
    verifiedAt: CHECKED,
    notes: v.notes ?? null,
  };
}

/**
 * 2. Appetizers: 10 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. `inventoryName` is the owner's exact text.
 * Values come from research/appetizers/prices.md and nutrition.md.
 */
export const appetizersOfferings = defineOfferings("appetizers", [
  {
    inventoryName: "Breadsticks",
    displayName: "Breadsticks",
    productId: "breadsticks",
    ...verified({
      price: 4.99,
      priceUrl: "https://www.olivegarden.com/menu/breadsticks-v/prod840053",
      priceUnit: "6 breadsticks",
      calories: 140,
      caloriesBasis: "per breadstick",
      servingSize: "6 breadsticks",
      notes: "12 breadsticks: $7.29. Unbaked 6/12 same prices. Plain breadstick 130 cal (PDF).",
    }),
  },
  {
    inventoryName: "Fried Mozzarella",
    displayName: "Fried Mozzarella",
    productId: "fried-mozzarella",
    image: ownerPhoto(
      "fried-mozzarella.webp",
      "Breaded fried mozzarella sticks on a white plate, one pulled apart to show melted cheese, with a cup of red dipping sauce",
      1402,
      1122,
    ),
    ...verified({
      price: 9.79,
      priceUrl: "https://www.olivegarden.com/menu/fried-mozzarella/prod2350153",
      calories: 800,
      notes: "Marinara adds 35 cal.",
    }),
  },
  {
    inventoryName: "Stuffed Ziti Fritta",
    displayName: "Stuffed Ziti Fritta",
    productId: "stuffed-ziti-fritta",
    ...verified({
      price: 9.99,
      priceUrl: "https://www.olivegarden.com/menu/stuffed-ziti-fritta/prod6580009",
      calories: 500,
      notes: "Marinara adds 35 cal; alfredo adds 220 cal.",
    }),
  },
  {
    inventoryName: "Dipping Sauces with breadsticks",
    displayName: "Dipping Sauces with Breadsticks",
    productId: "dipping-sauces-with-breadsticks",
    ...verified({
      price: 5.29,
      priceUrl: "https://www.olivegarden.com/menu/dipping-sauces-includes-breadsticks-v/prod80955",
      priceUnit: "regular",
      // Owner decision 2026-11-11: use the official PDF per-sauce values
      // (regular: marinara 70 ... spicy alfredo 490), sauce only.
      calories: 70,
      caloriesMax: 490,
      caloriesBasis: "sauce only, depends on the sauce; breadsticks 140 each",
      servingSize: "Regular, with 4 breadsticks",
      notes: "Large (8 breadsticks, serves 4): $7.29. Ordering page card said 90-440 cal; PDF (used) says 70-490 regular, 150-980 large.",
    }),
  },
  {
    inventoryName: "Calamari",
    displayName: "Calamari",
    productId: "calamari",
    ...verified({
      price: 13.29,
      priceUrl: "https://www.olivegarden.com/menu/calamari/prod600045",
      calories: 670,
      notes: "Marinara adds 35 cal; spicy ranch adds 240 cal.",
    }),
  },
  {
    inventoryName: "Meatballs Parmigiana",
    displayName: "Meatballs Parmigiana",
    productId: "meatballs-parmigiana",
    ...verified({
      price: 11.79,
      priceUrl: "https://www.olivegarden.com/menu/meatballs-parmigiana/prod9760001",
      calories: 1040,
      servingSize: "5 meatballs",
    }),
  },
  {
    inventoryName: "Spinach-Artichoke Dip",
    displayName: "Spinach-Artichoke Dip",
    productId: "spinach-artichoke-dip",
    image: ownerPhoto(
      "spinach-artichoke-dip.webp",
      "Baked spinach and artichoke dip with browned cheese in a white dish, surrounded by toasted flatbread triangles and bread slices",
      1536,
      1024,
    ),
    ...verified({
      price: 11.49,
      priceUrl: "https://www.olivegarden.com/menu/spinach-artichoke-dip/prod4890016",
      calories: 1160,
      caloriesBasis: "with flatbread crisps",
    }),
  },
  {
    inventoryName: "Lasagna Fritta",
    displayName: "Lasagna Fritta",
    productId: "lasagna-fritta",
    image: ownerPhoto(
      "lasagna-fritta.webp",
      "Fried breaded lasagna pieces topped with red sauce, white sauce drizzle, and grated cheese, one cut open to show the cheese filling",
      1536,
      1024,
    ),
    ...verified({
      price: 11.79,
      priceUrl: "https://www.olivegarden.com/menu/lasagna-fritta/prod80749",
      calories: 1130,
    }),
  },
  {
    inventoryName: "Shrimp Fritto Misto",
    displayName: "Shrimp Fritto Misto",
    productId: "shrimp-fritto-misto",
    ...verified({
      price: 14.29,
      priceUrl: "https://www.olivegarden.com/menu/shrimp-fritto-misto/prod8290005",
      calories: 1280,
      servingSize: "Over a half pound of shrimp",
      notes: "Marinara adds 35 cal; spicy ranch adds 240 cal.",
    }),
  },
  {
    inventoryName: "Toasted Ravioli",
    displayName: "Toasted Ravioli",
    productId: "toasted-ravioli",
    image: ownerPhoto(
      "toasted-ravioli.webp",
      "Golden breaded toasted ravioli sprinkled with grated cheese and parsley around a cup of red dipping sauce, one cut open",
      1536,
      1024,
    ),
    ...verified({
      price: 10.29,
      priceUrl: "https://www.olivegarden.com/menu/toasted-ravioli/prod80841",
      calories: 650,
      notes: "Marinara adds 35 cal.",
    }),
  },
]);
