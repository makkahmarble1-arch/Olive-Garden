import { defineOfferings } from "@/lib/menu-data";

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
  },
  { inventoryName: "Lasagna Fritta", displayName: "Lasagna Fritta", productId: "lasagna-fritta" },
  {
    inventoryName: "Shrimp Fritto Misto",
    displayName: "Shrimp Fritto Misto",
    productId: "shrimp-fritto-misto",
  },
  {
    inventoryName: "Toasted Ravioli",
    displayName: "Toasted Ravioli",
    productId: "toasted-ravioli",
  },
]);
