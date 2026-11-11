import { defineOfferings } from "@/lib/menu-data";

/**
 * 17. Catering: 38 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const cateringOfferings = defineOfferings("catering", [
  {
    inventoryName: "Our Famous Jumbo House Salad",
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
    inventoryName: "Five Cheese Ziti al Forno",
    displayName: "Five Cheese Ziti al Forno",
    productId: "five-cheese-ziti-al-forno",
  },
  {
    inventoryName: "Spaghetti with Meat Sauce",
    displayName: "Spaghetti with Meat Sauce",
    productId: "spaghetti-with-meat-sauce",
  },
  {
    inventoryName: "Spaghetti with Marinara Sauce",
    displayName: "Spaghetti with Marinara Sauce",
    productId: "spaghetti-with-marinara-sauce",
  },
  {
    inventoryName: "Chicken Tortelloni Alfredo",
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
    inventoryName: "Chicken and Shrimp Carbonara",
    displayName: "Chicken and Shrimp Carbonara",
    productId: "chicken-and-shrimp-carbonara",
  },
  { inventoryName: "Shrimp Scampi", displayName: "Shrimp Scampi", productId: "shrimp-scampi" },
  {
    inventoryName: "Cheese Ravioli with Marinara or Meat Sauce",
    displayName: "Cheese Ravioli with Marinara or Meat Sauce",
    productId: "cheese-ravioli-with-marinara-or-meat-sauce",
  },
  {
    inventoryName: "Homemade Soups Large",
    displayName: "Homemade Soups (Large)",
    productId: "homemade-soups",
    variant: "large",
  },
  { inventoryName: "Homemade Soups", displayName: "Homemade Soups", productId: "homemade-soups" },
  { inventoryName: "Breadsticks", displayName: "Breadsticks", productId: "breadsticks" },
  {
    inventoryName: "Fried Mozzarella",
    displayName: "Fried Mozzarella",
    productId: "fried-mozzarella",
  },
  {
    inventoryName: "Spinach-Artichoke Dip",
    displayName: "Spinach-Artichoke Dip",
    productId: "spinach-artichoke-dip",
  },
  {
    inventoryName: "Black Tie Mousse Cake",
    displayName: "Black Tie Mousse Cake",
    productId: "black-tie-mousse-cake",
  },
  { inventoryName: "Tiramisu", displayName: "Tiramisu", productId: "tiramisu" },
  { inventoryName: "2-Liter Soda", displayName: "2-Liter Soda", productId: "2-liter-soda" },
  {
    inventoryName: "Chicken Parmigiana Combination",
    displayName: "Chicken Parmigiana Combination",
    productId: "chicken-parmigiana-combination",
  },
  {
    inventoryName: "Lasagna Combination",
    displayName: "Lasagna Combination",
    productId: "lasagna-combination",
  },
  {
    inventoryName: "Create Your Own Pasta Station",
    displayName: "Create Your Own Pasta Station",
    productId: "create-your-own-pasta-station",
    notes: "Treated as a different product from the dine-in Create Your Own Pasta.",
  },
  {
    inventoryName: "Toasted Beef Ravioli",
    displayName: "Toasted Beef Ravioli",
    productId: "toasted-beef-ravioli",
  },
  {
    inventoryName: "Alfredo Dipping Sauce",
    displayName: "Alfredo Dipping Sauce",
    productId: "alfredo-dipping-sauce",
  },
  {
    inventoryName: "Five Cheese Marinara Dipping Sauce",
    displayName: "Five Cheese Marinara Dipping Sauce",
    productId: "five-cheese-marinara-dipping-sauce",
  },
  {
    inventoryName: "Marinara Dipping Sauce",
    displayName: "Marinara Dipping Sauce",
    productId: "marinara-dipping-sauce",
  },
  {
    inventoryName: "Meat Dipping Sauce",
    displayName: "Meat Dipping Sauce",
    productId: "meat-dipping-sauce",
  },
  {
    inventoryName: "Grilled Chicken Breasts",
    displayName: "Grilled Chicken Breasts",
    productId: "grilled-chicken-breasts",
  },
  {
    inventoryName: "Chicken Fingers",
    displayName: "Chicken Fingers",
    productId: "chicken-fingers",
  },
  {
    inventoryName: "Italian Meatballs",
    displayName: "Italian Meatballs",
    productId: "italian-meatballs",
  },
  { inventoryName: "Broccoli", displayName: "Broccoli", productId: "broccoli" },
  {
    inventoryName: "Sicilian Cheesecake",
    displayName: "Sicilian Cheesecake",
    productId: "sicilian-cheesecake",
  },
  {
    inventoryName: "Gallon Iced Teas & Raspberry Lemonade",
    displayName: "Gallon Iced Teas & Raspberry Lemonade",
    productId: "gallon-iced-teas-and-raspberry-lemonade",
  },
  {
    inventoryName: "San Pellegrino Sparkling (1 liter bottle)",
    displayName: "San Pellegrino Sparkling (1-Liter Bottle)",
    productId: "san-pellegrino-sparkling-1-liter-bottle",
  },
  {
    inventoryName: "Acqua Panna Spring (1 liter bottle)",
    displayName: "Acqua Panna Spring (1-Liter Bottle)",
    productId: "acqua-panna-spring-1-liter-bottle",
  },
]);
