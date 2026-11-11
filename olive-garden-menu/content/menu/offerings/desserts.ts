import { defineOfferings } from "@/lib/menu-data";

/**
 * 10. Desserts: 6 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const dessertsOfferings = defineOfferings("desserts", [
  {
    inventoryName: "Chocolate lasagna",
    displayName: "Chocolate Lasagna",
    productId: "chocolate-lasagna",
  },
  {
    inventoryName: "Black tie Mousse Cake",
    displayName: "Black Tie Mousse Cake",
    productId: "black-tie-mousse-cake",
  },
  { inventoryName: "Tiramisu", displayName: "Tiramisu", productId: "tiramisu" },
  {
    inventoryName: "Strawberry cream cake",
    displayName: "Strawberry Cream Cake",
    productId: "strawberry-cream-cake",
  },
  {
    inventoryName: "Warm italian doughnuts",
    displayName: "Warm Italian Doughnuts",
    productId: "warm-italian-doughnuts",
  },
  {
    inventoryName: "Sicilian cheesecake with strawberry topping",
    displayName: "Sicilian Cheesecake with Strawberry Topping",
    productId: "sicilian-cheesecake-with-strawberry-topping",
  },
]);
