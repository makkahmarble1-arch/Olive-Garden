import { defineOfferings } from "@/lib/menu-data";
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

/**
 * 2. Appetizers: 10 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const appetizersOfferings = defineOfferings("appetizers", [
  { inventoryName: "Breadsticks", displayName: "Breadsticks", productId: "breadsticks" },
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
  },
  {
    inventoryName: "Stuffed Ziti Fritta",
    displayName: "Stuffed Ziti Fritta",
    productId: "stuffed-ziti-fritta",
  },
  {
    inventoryName: "Dipping Sauces with breadsticks",
    displayName: "Dipping Sauces with Breadsticks",
    productId: "dipping-sauces-with-breadsticks",
  },
  { inventoryName: "Calamari", displayName: "Calamari", productId: "calamari" },
  {
    inventoryName: "Meatballs Parmigiana",
    displayName: "Meatballs Parmigiana",
    productId: "meatballs-parmigiana",
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
  },
  {
    inventoryName: "Shrimp Fritto Misto",
    displayName: "Shrimp Fritto Misto",
    productId: "shrimp-fritto-misto",
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
  },
]);
