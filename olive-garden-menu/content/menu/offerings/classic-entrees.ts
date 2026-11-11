import { defineOfferings } from "@/lib/menu-data";

/**
 * 3. Classic Entrees: 27 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const classicEntreesOfferings = defineOfferings("classic-entrees", [
  {
    inventoryName: "Family-style lasagna Bundle",
    displayName: "Family-Style Lasagna Bundle",
    productId: "family-style-lasagna-bundle",
    notes: "Listed under Classic Entrees by the owner. Confirm it is sold in this category.",
  },
  {
    inventoryName: "Chicken Alfredo",
    displayName: "Chicken Alfredo",
    productId: "chicken-alfredo",
  },
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
  { inventoryName: "Shrimp Alfredo", displayName: "Shrimp Alfredo", productId: "shrimp-alfredo" },
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
    inventoryName: "Chicken Tortelloni alfredo",
    displayName: "Chicken Tortelloni Alfredo",
    productId: "chicken-tortelloni-alfredo",
  },
  {
    inventoryName: "Lasagna Classico",
    displayName: "Lasagna Classico",
    productId: "lasagna-classico",
  },
  { inventoryName: "Chicken Scampi", displayName: "Chicken Scampi", productId: "chicken-scampi" },
  {
    inventoryName: "Chicken and shrimp carbonara",
    displayName: "Chicken and Shrimp Carbonara",
    productId: "chicken-and-shrimp-carbonara",
  },
  { inventoryName: "Shrimp Scampi", displayName: "Shrimp Scampi", productId: "shrimp-scampi" },
  {
    inventoryName: "Calabrian steak & shrimp bucatini",
    displayName: "Calabrian Steak & Shrimp Bucatini",
    productId: "calabrian-steak-and-shrimp-bucatini",
  },
  {
    inventoryName: "Shrimp Carbonara",
    displayName: "Shrimp Carbonara",
    productId: "shrimp-carbonara",
  },
  { inventoryName: "Tour of italy", displayName: "Tour of Italy", productId: "tour-of-italy" },
  {
    inventoryName: "Ravioli Carbonara",
    displayName: "Ravioli Carbonara",
    productId: "ravioli-carbonara",
  },
  {
    inventoryName: "Spaghetti & Meatballs",
    displayName: "Spaghetti & Meatballs",
    productId: "spaghetti-and-meatballs",
  },
  {
    inventoryName: "Spaghetti with Marinara",
    displayName: "Spaghetti with Marinara",
    productId: "spaghetti-with-marinara",
  },
  {
    inventoryName: "Stuffed Chicken Marsala",
    displayName: "Stuffed Chicken Marsala",
    productId: "stuffed-chicken-marsala",
  },
  {
    inventoryName: "Steak Gorgonzola Alfredo",
    displayName: "Steak Gorgonzola Alfredo",
    productId: "steak-gorgonzola-alfredo",
  },
  {
    inventoryName: "Seafood Alfredo",
    displayName: "Seafood Alfredo",
    productId: "seafood-alfredo",
  },
  { inventoryName: "Cheese Ravioli", displayName: "Cheese Ravioli", productId: "cheese-ravioli" },
  {
    inventoryName: "Eggplant Parmigiana",
    displayName: "Eggplant Parmigiana",
    productId: "eggplant-parmigiana",
  },
  {
    inventoryName: "Grilled Chicken Margherita",
    displayName: "Grilled Chicken Margherita",
    productId: "grilled-chicken-margherita",
  },
  {
    inventoryName: "Herb-Grilled Salmon",
    displayName: "Herb-Grilled Salmon",
    productId: "herb-grilled-salmon",
  },
  { inventoryName: "6 oz.sirloin", displayName: "6 oz. Sirloin", productId: "6-oz-sirloin" },
  {
    inventoryName: "Create your own Pasta",
    displayName: "Create Your Own Pasta",
    productId: "create-your-own-pasta",
    notes: "Build options (pastas, sauces, proteins) not supplied yet. Do not invent combinations.",
  },
]);
