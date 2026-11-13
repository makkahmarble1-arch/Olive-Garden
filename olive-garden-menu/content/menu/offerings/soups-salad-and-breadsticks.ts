import { defineOfferings } from "@/lib/menu-data";

/**
 * 6. Soups, Salad and Breadsticks: 6 inventory entries.
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/soups-salad-and-breadsticks/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const soupsSaladAndBreadsticksOfferings = defineOfferings("soups-salad-and-breadsticks", [
  {
    inventoryName: "Our famous Jumbo house salad",
    displayName: "Our Famous Jumbo House Salad",
    productId: "famous-house-salad",
    officialName: "Our Famous House Salad",
    isNewOfficialItem: false,
    description: "The Famous House Salad with signature Italian dressing served on the side, plus two warm breadsticks.",
    portionType: "regular",
    servingSize: "One salad + 2 breadsticks",
    prices: [
      {
        amount: 9.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/our-famous-house-salad/prod81854",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 290,
    caloriesMax: null,
    caloriesBasis: "per salad (with dressing)",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/our-famous-house-salad/prod81854",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Official name in this section is \"Our Famous House Salad\" (not \"Jumbo\")"
  },
  {
    inventoryName: "Homemade Soups",
    displayName: "Homemade Soups",
    productId: "homemade-soups",
    officialName: "Homemade Soups",
    isNewOfficialItem: false,
    description: "A bowl of one of four homemade soups: Pasta e Fagioli, Zuppa Toscana, Minestrone, or creamy Chicken & Gnocchi.",
    portionType: "regular",
    servingSize: "One serving; Pasta e Fagioli, Zuppa Toscana, Minestrone (V), Chicken & Gnocchi",
    prices: [
      {
        amount: 9.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/homemade-soups/prod81927",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 110,
    caloriesMax: 230,
    caloriesBasis: "per serving, depends on soup",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/homemade-soups/prod81927",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: null
  },
  {
    inventoryName: "Breadsticks",
    displayName: "Breadsticks",
    productId: "breadsticks",
    officialName: "Breadsticks (V)",
    isNewOfficialItem: false,
    description: "Soft, warm breadsticks brushed with a garlic topping, sold by the half dozen or dozen, freshly baked or ready to bake at home.",
    portionType: "regular",
    servingSize: "6 or 12 breadsticks",
    prices: [
      {
        amount: 4.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/breadsticks-v/prod840053",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "6 breadsticks (baked or unbaked)",
        price: 4.99,
        calories: 840,
        caloriesMax: null,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "6 × 140"
      },
      {
        label: "12 breadsticks (baked or unbaked)",
        price: 7.29,
        calories: 1680,
        caloriesMax: null,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "12 × 140"
      }
    ],
    calories: 140,
    caloriesMax: null,
    caloriesBasis: "per breadstick",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/breadsticks-v/prod840053",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: null
  },
  {
    inventoryName: "Dipping sauces with breadsticks",
    displayName: "Dipping Sauces with Breadsticks",
    productId: "dipping-sauces-with-breadsticks",
    officialName: "Dipping Sauces Includes Breadsticks (V)",
    isNewOfficialItem: false,
    description: "A warm cup of marinara, alfredo, or five cheese marinara sauce with fresh breadsticks; the regular comes with four, the large with eight.",
    portionType: "regular",
    servingSize: "Regular: 4 breadsticks, serves 2. Large: 8 breadsticks + 8 oz sauce, serves 4",
    prices: [
      {
        amount: 5.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/dipping-sauces-includes-breadsticks-v/prod80955",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Regular sauce with 4 breadsticks (serves 2)",
        price: 5.29,
        calories: 630,
        caloriesMax: 1050,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "560 + 70-490"
      },
      {
        label: "Large sauce (8 oz) with 8 breadsticks (serves 4)",
        price: 7.29,
        calories: 1270,
        caloriesMax: 2100,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "1,120 + 150-980"
      }
    ],
    calories: 630,
    caloriesMax: 1050,
    caloriesBasis: "per regular order (4 breadsticks + 1 sauce)",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "calculated",
    caloriesFormula: "4 × 140 + sauce 70-490",
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: "Same item as Appetizers listing | Owner decision 2026-11-12: show calculated totals. Menu card shows a different sauce range (90-440 / 190-870). | PDF check (match (calculated from PDF parts)): Calculated from PDF parts: 4 breadsticks × 140 + sauce 70-490 (same as Appetizers)"
  },
  {
    inventoryName: "Weekday lunch special",
    displayName: "Weekday Lunch Special",
    productId: "weekday-lunch-special",
    officialName: "WEEKDAY Lunch Special: Soup AND Salad AND Breadsticks (Mon-Fri 11-2:30PM)",
    isNewOfficialItem: false,
    description: "A weekday lunch deal pairing the Famous House Salad with a homemade soup and warm garlic breadsticks, offered until early afternoon.",
    portionType: "regular",
    servingSize: "House salad + choice of 4 soups + breadsticks",
    prices: [
      {
        amount: 9.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/weekday-lunch-special-soup-and-salad-and-breadsticks-mon-fri-11-230pm/prod7810013",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 400,
    caloriesMax: 520,
    caloriesBasis: "per meal (soup, salad, breadstick), depends on soup",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/weekday-lunch-special-soup-and-salad-and-breadsticks-mon-fri-11-230pm/prod7810013",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "limited-time",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Official specials page: Never-Ending Soup, Salad & Breadsticks $9.99, Mon-Fri until 3 PM, limited time, refills dine-in only. This card says 11 AM-2:30 PM; 3 PM is used (specials page, location lunch hours, and Lunch section agree). Optional $6 Take Home entrée. | Listed on the Millenia online ordering menu | PDF check (match (calculated from PDF parts)): Calculated from PDF parts: salad with dressing 150 + soup 110-230 + 1 breadstick 140 = 400-520 (matches the menu)"
  },
  {
    inventoryName: "Soup, salad & breadsticks",
    displayName: "Soup, Salad & Breadsticks",
    productId: "soup-salad-and-breadsticks",
    officialName: "Soup AND Salad AND Breadsticks",
    isNewOfficialItem: false,
    description: "The Famous House Salad, a bowl of homemade soup, and warm garlic breadsticks served together as a lighter meal.",
    portionType: "regular",
    servingSize: "House salad + choice of 4 soups + breadsticks",
    prices: [
      {
        amount: 13.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/soup-and-salad-and-breadsticks/prod7290092",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 400,
    caloriesMax: 520,
    caloriesBasis: "per meal, depends on soup",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/soup-and-salad-and-breadsticks/prod7290092",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Regular (non-lunch) price | PDF check (match (calculated from PDF parts)): Calculated from PDF parts: salad with dressing 150 + soup 110-230 + 1 breadstick 140 = 400-520 (matches the menu)"
  }
]);
