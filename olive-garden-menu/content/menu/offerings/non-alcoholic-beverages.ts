import { defineOfferings } from "@/lib/menu-data";

/**
 * 13. Non- alcoholic beverages: 13 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const nonAlcoholicBeveragesOfferings = defineOfferings("non-alcoholic-beverages", [
  {
    inventoryName: "Gallon iced teas & raspberry lemonade",
    displayName: "Gallon Iced Teas & Raspberry Lemonade",
    productId: "gallon-iced-teas-and-raspberry-lemonade",
  },
  { inventoryName: "2-liter soda", displayName: "2-Liter Soda", productId: "2-liter-soda" },
  {
    inventoryName: "To go fountain drinks",
    displayName: "To-Go Fountain Drinks",
    productId: "to-go-fountain-drinks",
  },
  {
    inventoryName: "Raspberry lemonade",
    displayName: "Raspberry Lemonade",
    productId: "raspberry-lemonade",
  },
  {
    inventoryName: "Classic lemonade",
    displayName: "Classic Lemonade",
    productId: "classic-lemonade",
  },
  {
    inventoryName: "Desert pear limonata",
    displayName: "Desert Pear Limonata",
    productId: "desert-pear-limonata",
    notes: "Spelling \"Desert\" kept as listed (likely the desert pear fruit). Confirm public spelling.",
  },
  {
    inventoryName: "Strawberry-passion fruit limonata",
    displayName: "Strawberry-Passion Fruit Limonata",
    productId: "strawberry-passion-fruit-limonata",
  },
  {
    inventoryName: "Mango-passion fruit lced tea",
    displayName: "Mango-Passion Fruit Iced Tea",
    productId: "mango-passion-fruit-iced-tea",
    notes: "Inventory spelling \"lced\" corrected to \"Iced\". Confirm on the official menu.",
  },
  {
    inventoryName: "Bellini peach-raspberry iced tea",
    displayName: "Bellini Peach-Raspberry Iced Tea",
    productId: "bellini-peach-raspberry-iced-tea",
  },
  {
    inventoryName: "Fresh brewed sweet iced tea",
    displayName: "Fresh-Brewed Sweet Iced Tea",
    productId: "fresh-brewed-sweet-iced-tea",
  },
  {
    inventoryName: "Fresh brewed unsweet iced tea",
    displayName: "Fresh-Brewed Unsweet Iced Tea",
    productId: "fresh-brewed-unsweet-iced-tea",
  },
  { inventoryName: "Cappuccino", displayName: "Cappuccino", productId: "cappuccino" },
  {
    inventoryName: "Lavazza espresso",
    displayName: "Lavazza Espresso",
    productId: "lavazza-espresso",
  },
]);
