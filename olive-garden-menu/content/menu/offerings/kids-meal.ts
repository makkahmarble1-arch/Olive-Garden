import { defineOfferings } from "@/lib/menu-data";

/**
 * 16. Kids meal: 11 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const kidsMealOfferings = defineOfferings("kids-meal", [
  {
    inventoryName: "Kids Alfredo Pasta",
    displayName: "Kids Alfredo Pasta",
    productId: "kids-alfredo-pasta",
  },
  { inventoryName: "Kids Pizza", displayName: "Kids Pizza", productId: "kids-pizza" },
  {
    inventoryName: "Kids Chicken Fingers",
    displayName: "Kids Chicken Fingers",
    productId: "kids-chicken-fingers",
  },
  {
    inventoryName: "Kids Macaroni & Cheese",
    displayName: "Kids Macaroni & Cheese",
    productId: "kids-macaroni-and-cheese",
  },
  {
    inventoryName: "Kids Meat Sauce Pasta",
    displayName: "Kids Meat Sauce Pasta",
    productId: "kids-meat-sauce-pasta",
  },
  {
    inventoryName: "Kids Tomato Sauce Pasta",
    displayName: "Kids Tomato Sauce Pasta",
    productId: "kids-tomato-sauce-pasta",
  },
  {
    inventoryName: "Kids Five Cheese Marinara Pasta",
    displayName: "Kids Five Cheese Marinara Pasta",
    productId: "kids-five-cheese-marinara-pasta",
  },
  {
    inventoryName: "Kids Cheese Ravioli",
    displayName: "Kids Cheese Ravioli",
    productId: "kids-cheese-ravioli",
  },
  {
    inventoryName: "Kids Grilled Chicken with Rotini Pasta & Marinara",
    displayName: "Kids Grilled Chicken with Rotini Pasta & Marinara",
    productId: "kids-grilled-chicken-with-rotini-pasta-and-marinara",
  },
  {
    inventoryName: "Kids Rotini with Marinara",
    displayName: "Kids Rotini with Marinara",
    productId: "kids-rotini-with-marinara",
  },
  {
    inventoryName: "Kids Rotini with Meat Sauce",
    displayName: "Kids Rotini with Meat Sauce",
    productId: "kids-rotini-with-meat-sauce",
  },
]);
