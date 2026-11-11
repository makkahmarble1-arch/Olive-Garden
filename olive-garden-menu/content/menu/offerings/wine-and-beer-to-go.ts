import { defineOfferings } from "@/lib/menu-data";

/**
 * 14. Wine & beer to go: 19 inventory entries (docs/MENU_INVENTORY.md).
 * Order = inventory order. Prices and calories stay empty/null until verified
 * (see docs/MENU_RESEARCH_PLAN.md). `inventoryName` is the owner's exact text.
 */
export const wineAndBeerToGoOfferings = defineOfferings("wine-and-beer-to-go", [
  {
    inventoryName: "Moscato primo amore",
    displayName: "Moscato Primo Amore",
    productId: "moscato-primo-amore",
  },
  {
    inventoryName: "Sweet pink moscato blend confetti",
    displayName: "Sweet Pink Moscato Blend Confetti",
    productId: "sweet-pink-moscato-blend-confetti",
  },
  {
    inventoryName: "Sweet red roscato rosso dolce",
    displayName: "Sweet Red Roscato Rosso Dolce",
    productId: "sweet-red-roscato-rosso-dolce",
  },
  {
    inventoryName: "Red blend porta vita",
    displayName: "Red Blend Porta Vita",
    productId: "red-blend-porta-vita",
  },
  {
    inventoryName: "Moscato castello del poggio",
    displayName: "Moscato Castello del Poggio",
    productId: "moscato-castello-del-poggio",
  },
  {
    inventoryName: "White zinfandel sutter home",
    displayName: "White Zinfandel Sutter Home",
    productId: "white-zinfandel-sutter-home",
  },
  {
    inventoryName: "Riesling Chateau Ste. Michelle",
    displayName: "Riesling Chateau Ste. Michelle",
    productId: "riesling-chateau-ste-michelle",
  },
  {
    inventoryName: "Pinot Grigio Cavit",
    displayName: "Pinot Grigio Cavit",
    productId: "pinot-grigio-cavit",
  },
  {
    inventoryName: "Sauvignon Blanc Starborough",
    displayName: "Sauvignon Blanc Starborough",
    productId: "sauvignon-blanc-starborough",
  },
  {
    inventoryName: "Chardonnay Chateau Ste. Michelle",
    displayName: "Chardonnay Chateau Ste. Michelle",
    productId: "chardonnay-chateau-ste-michelle",
  },
  {
    inventoryName: "Pinot Noir Meiomi",
    displayName: "Pinot Noir Meiomi",
    productId: "pinot-noir-meiomi",
  },
  {
    inventoryName: "Merlot Beringer",
    displayName: "Merlot Beringer",
    productId: "merlot-beringer",
  },
  {
    inventoryName: "Chianti Classico Rocca delle Macie",
    displayName: "Chianti Classico Rocca delle Macie",
    productId: "chianti-classico-rocca-delle-macie",
  },
  {
    inventoryName: "Cabernet Robert Mondavi Private Selection",
    displayName: "Cabernet Robert Mondavi Private Selection",
    productId: "cabernet-robert-mondavi-private-selection",
  },
  { inventoryName: "Budweiser", displayName: "Budweiser", productId: "budweiser" },
  { inventoryName: "Bud Light", displayName: "Bud Light", productId: "bud-light" },
  { inventoryName: "Coors Light", displayName: "Coors Light", productId: "coors-light" },
  { inventoryName: "Michelob Ultra", displayName: "Michelob Ultra", productId: "michelob-ultra" },
  { inventoryName: "Miller Lite", displayName: "Miller Lite", productId: "miller-lite" },
]);
