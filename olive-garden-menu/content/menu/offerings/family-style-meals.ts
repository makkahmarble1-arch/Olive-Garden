import { defineOfferings } from "@/lib/menu-data";

/**
 * 1. Family-style Meals: 20 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const familyStyleMealsOfferings = defineOfferings("family-style-meals", [
  {
    inventoryName: "Family-style lasagna Bundle",
    displayName: "Family-Style Lasagna Bundle",
    productId: "family-style-lasagna-bundle",
  },
  {
    inventoryName: "Large Family-style lasagna Bundle",
    displayName: "Large Family-Style Lasagna Bundle",
    productId: "family-style-lasagna-bundle",
    variant: "large",
  },
  {
    inventoryName: "Our famous Jumbo house salad",
    displayName: "Our Famous Jumbo House Salad",
    productId: "famous-house-salad",
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
    inventoryName: "Five Cheese Ziti Al forno",
    displayName: "Five Cheese Ziti al Forno",
    productId: "five-cheese-ziti-al-forno",
  },
  {
    inventoryName: "Spaghetti With meat sauce",
    displayName: "Spaghetti with Meat Sauce",
    productId: "spaghetti-with-meat-sauce",
  },
  {
    inventoryName: "Spaghetti with marinara sauce",
    displayName: "Spaghetti with Marinara Sauce",
    productId: "spaghetti-with-marinara-sauce",
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
    inventoryName: "Cheese Ravioli with meat or marinara sauce",
    displayName: "Cheese Ravioli with Meat or Marinara Sauce",
    productId: "cheese-ravioli-with-meat-or-marinara-sauce",
  },
  {
    inventoryName: "Homemade soups large",
    displayName: "Homemade Soups (Large)",
    productId: "homemade-soups",
    variant: "large",
  },
  { inventoryName: "Homemade Soups", displayName: "Homemade Soups", productId: "homemade-soups" },
  { inventoryName: "Breadsticks", displayName: "Breadsticks", productId: "breadsticks" },
  { inventoryName: "Large Salad", displayName: "Large Salad", productId: "large-salad" },
]);
