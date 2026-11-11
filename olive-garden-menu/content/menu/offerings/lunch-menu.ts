import { defineOfferings } from "@/lib/menu-data";

/**
 * 9. Lunch menu: 10 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const lunchMenuOfferings = defineOfferings("lunch-menu", [
  {
    inventoryName: "Chicken Parmigiana",
    displayName: "Chicken Parmigiana",
    productId: "chicken-parmigiana",
  },
  {
    inventoryName: "Fettuccine Alfredo",
    displayName: "Fettuccine Alfredo",
    productId: "fettuccine-alfredo",
  },
  {
    inventoryName: "Five cheese ziti al forno",
    displayName: "Five Cheese Ziti al Forno",
    productId: "five-cheese-ziti-al-forno",
  },
  {
    inventoryName: "Lasagna Classico",
    displayName: "Lasagna Classico",
    productId: "lasagna-classico",
  },
  { inventoryName: "Shrimp scampi", displayName: "Shrimp Scampi", productId: "shrimp-scampi" },
  {
    inventoryName: "Spaghetti & Meatballs",
    displayName: "Spaghetti & Meatballs",
    productId: "spaghetti-and-meatballs",
  },
  { inventoryName: "Cheese ravioli", displayName: "Cheese Ravioli", productId: "cheese-ravioli" },
  {
    inventoryName: "Eggplant parmigiana",
    displayName: "Eggplant Parmigiana",
    productId: "eggplant-parmigiana",
  },
  { inventoryName: "Spaghetti", displayName: "Spaghetti", productId: "spaghetti" },
  {
    inventoryName: "Soup, salad and breadsticks | Lunch",
    displayName: "Soup, Salad and Breadsticks (Lunch)",
    productId: "soup-salad-and-breadsticks-lunch",
  },
]);
