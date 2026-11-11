import { defineOfferings } from "@/lib/menu-data";

/**
 * 6. Soups, salad and breadsticks: 6 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const soupsSaladAndBreadsticksOfferings = defineOfferings("soups-salad-and-breadsticks", [
  {
    inventoryName: "Our famous Jumbo house salad",
    displayName: "Our Famous Jumbo House Salad",
    productId: "famous-house-salad",
  },
  { inventoryName: "Homemade Soups", displayName: "Homemade Soups", productId: "homemade-soups" },
  { inventoryName: "Breadsticks", displayName: "Breadsticks", productId: "breadsticks" },
  {
    inventoryName: "Dipping sauces with breadsticks",
    displayName: "Dipping Sauces with Breadsticks",
    productId: "dipping-sauces-with-breadsticks",
  },
  {
    inventoryName: "Weekday lunch special",
    displayName: "Weekday Lunch Special",
    productId: "weekday-lunch-special",
  },
  {
    inventoryName: "Soup, salad & breadsticks",
    displayName: "Soup, Salad & Breadsticks",
    productId: "soup-salad-and-breadsticks",
  },
]);
