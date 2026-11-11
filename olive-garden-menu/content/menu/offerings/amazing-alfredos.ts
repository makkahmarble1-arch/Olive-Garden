import { defineOfferings } from "@/lib/menu-data";

/**
 * 5. Amazing Alfredos: 5 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const amazingAlfredosOfferings = defineOfferings("amazing-alfredos", [
  {
    inventoryName: "Chicken Alfredo",
    displayName: "Chicken Alfredo",
    productId: "chicken-alfredo",
  },
  {
    inventoryName: "Fettuccine Alfredo",
    displayName: "Fettuccine Alfredo",
    productId: "fettuccine-alfredo",
  },
  { inventoryName: "Shrimp Alfredo", displayName: "Shrimp Alfredo", productId: "shrimp-alfredo" },
  {
    inventoryName: "Chicken Tortelloni alfredo",
    displayName: "Chicken Tortelloni Alfredo",
    productId: "chicken-tortelloni-alfredo",
  },
  {
    inventoryName: "Seafood Alfredo",
    displayName: "Seafood Alfredo",
    productId: "seafood-alfredo",
  },
]);
