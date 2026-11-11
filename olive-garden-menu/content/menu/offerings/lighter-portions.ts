import { defineOfferings } from "@/lib/menu-data";

/**
 * 7. Lighter portions: 7 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const lighterPortionsOfferings = defineOfferings("lighter-portions", [
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
  {
    inventoryName: "Spaghetti & Meatballs",
    displayName: "Spaghetti & Meatballs",
    productId: "spaghetti-and-meatballs",
  },
  { inventoryName: "Cheese Ravioli", displayName: "Cheese Ravioli", productId: "cheese-ravioli" },
  {
    inventoryName: "Eggplant Parmigiana",
    displayName: "Eggplant Parmigiana",
    productId: "eggplant-parmigiana",
  },
]);
