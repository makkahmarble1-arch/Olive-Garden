import { defineOfferings } from "@/lib/menu-data";

/**
 * 15. Gluten sensitive: 10 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const glutenSensitiveOfferings = defineOfferings("gluten-sensitive", [
  {
    inventoryName: "Herb-Grilled Salmon",
    displayName: "Herb-Grilled Salmon",
    productId: "herb-grilled-salmon",
  },
  { inventoryName: "Zuppa Toscana", displayName: "Zuppa Toscana", productId: "zuppa-toscana" },
  {
    inventoryName: "Famous House Salad without croutons",
    displayName: "Famous House Salad without Croutons",
    productId: "famous-house-salad-without-croutons",
  },
  {
    inventoryName: "Grilled Chicken Parmigiana",
    displayName: "Grilled Chicken Parmigiana",
    productId: "grilled-chicken-parmigiana",
  },
  {
    inventoryName: "6 oz Sirloin (Gluten Sensitive)",
    displayName: "6 oz. Sirloin (Gluten Sensitive)",
    productId: "6-oz-sirloin",
  },
  {
    inventoryName: "Rotini Pasta with Marinara",
    displayName: "Rotini Pasta with Marinara",
    productId: "rotini-pasta-with-marinara",
  },
  {
    inventoryName: "Rotini Pasta with Meat Sauce",
    displayName: "Rotini Pasta with Meat Sauce",
    productId: "rotini-pasta-with-meat-sauce",
  },
  {
    inventoryName: "Grilled Chicken with Rotini Pasta & Marinara",
    displayName: "Grilled Chicken with Rotini Pasta & Marinara",
    productId: "grilled-chicken-with-rotini-pasta-and-marinara",
  },
  {
    inventoryName: "Rotini with Marinara",
    displayName: "Rotini with Marinara",
    productId: "rotini-with-marinara",
  },
  {
    inventoryName: "Rotini with Meat Sauce",
    displayName: "Rotini with Meat Sauce",
    productId: "rotini-with-meat-sauce",
  },
]);
