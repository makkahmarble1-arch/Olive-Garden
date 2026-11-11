import { defineOfferings } from "@/lib/menu-data";

/**
 * 12. Sides, sauces and extras: 9 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const sidesSaucesAndExtrasOfferings = defineOfferings("sides-sauces-and-extras", [
  {
    inventoryName: "Cheese Grater",
    displayName: "Cheese Grater",
    productId: "cheese-grater",
    notes: "Unclear whether this is a product for sale or a table service. Confirm before publishing.",
  },
  {
    inventoryName: "Side of Meatballs",
    displayName: "Side of Meatballs",
    productId: "side-of-meatballs",
  },
  {
    inventoryName: "Side of grilled chicken",
    displayName: "Side of Grilled Chicken",
    productId: "side-of-grilled-chicken",
  },
  {
    inventoryName: "Side of mashed potatoes",
    displayName: "Side of Mashed Potatoes",
    productId: "side-of-mashed-potatoes",
  },
  {
    inventoryName: "Side of broccoli",
    displayName: "Side of Broccoli",
    productId: "side-of-broccoli",
  },
  {
    inventoryName: "Side of alfredo sauce (large)",
    displayName: "Side of Alfredo Sauce (Large)",
    productId: "side-of-alfredo-sauce",
    variant: "large",
  },
  {
    inventoryName: "Side of marinara sauce (large)",
    displayName: "Side of Marinara Sauce (Large)",
    productId: "side-of-marinara-sauce",
    variant: "large",
  },
  {
    inventoryName: "Side of meat sauce (large)",
    displayName: "Side of Meat Sauce (Large)",
    productId: "side-of-meat-sauce",
    variant: "large",
  },
  {
    inventoryName: "Side of five cheese marinara sauce (Large)",
    displayName: "Side of Five Cheese Marinara Sauce (Large)",
    productId: "side-of-five-cheese-marinara-sauce",
    variant: "large",
  },
]);
