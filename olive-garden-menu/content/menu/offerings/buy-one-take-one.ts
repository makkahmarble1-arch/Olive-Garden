import { defineOfferings } from "@/lib/menu-data";

/**
 * 4. Buy One Take One: 7 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const buyOneTakeOneOfferings = defineOfferings("buy-one-take-one", [
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
    inventoryName: "Spaghetti With meat sauce",
    displayName: "Spaghetti with Meat Sauce",
    productId: "spaghetti-with-meat-sauce",
  },
  {
    inventoryName: "Lasagna Classico",
    displayName: "Lasagna Classico",
    productId: "lasagna-classico",
  },
  {
    inventoryName: "Rigatoni alla Vodka",
    displayName: "Rigatoni alla Vodka",
    productId: "rigatoni-alla-vodka",
  },
  {
    inventoryName: "Four-cheese manicotti with marinara",
    displayName: "Four-Cheese Manicotti with Marinara",
    productId: "four-cheese-manicotti-with-marinara",
  },
]);
