import { defineOfferings } from "@/lib/menu-data";

/**
 * 2. Appetizers: 10 inventory entries.
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/appetizers/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const appetizersOfferings = defineOfferings("appetizers", [
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
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "6 breadsticks, baked",
        price: 4.99,
        calories: 840,
        caloriesMax: null,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "6 × 140"
      },
      {
        label: "12 breadsticks, baked",
        price: 7.29,
        calories: 1680,
        caloriesMax: null,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "12 × 140"
      },
      {
        label: "6 breadsticks, unbaked (bake at home)",
        price: 4.99,
        calories: 840,
        caloriesMax: null,
        caloriesUnit: null,
        caloriesBasis: "calculated",
        caloriesFormula: "6 × 140"
      },
      {
        label: "12 breadsticks, unbaked (bake at home)",
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
    caloriesBasis: "per breadstick (with garlic topping)",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Fried Mozzarella",
    displayName: "Fried Mozzarella",
    productId: "fried-mozzarella",
    officialName: "Fried Mozzarella",
    isNewOfficialItem: false,
    description: "Breaded mozzarella cheese fried until golden and crisp outside and melty inside, served with warm marinara sauce for dipping.",
    portionType: "regular",
    servingSize: "One appetizer order",
    prices: [
      {
        amount: 9.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/fried-mozzarella/prod2350153",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 800,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Stuffed Ziti Fritta",
    displayName: "Stuffed Ziti Fritta",
    productId: "stuffed-ziti-fritta",
    officialName: "Stuffed Ziti Fritta",
    isNewOfficialItem: false,
    description: "Crispy fried ziti pasta stuffed with a five-cheese filling, served with two dipping sauces: creamy alfredo and classic marinara.",
    portionType: "regular",
    servingSize: "One appetizer order",
    prices: [
      {
        amount: 9.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/stuffed-ziti-fritta/prod6580009",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 500,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Dipping Sauces with breadsticks",
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
    notes: "Owner decision 2026-11-12: show calculated totals. Menu card shows a different sauce range (90-440 / 190-870)."
  },
  {
    inventoryName: "Calamari",
    displayName: "Calamari",
    productId: "calamari",
    officialName: "Calamari",
    isNewOfficialItem: false,
    description: "Tender calamari in a light breading, fried until crisp and served with marinara sauce and a spicy ranch for dipping.",
    portionType: "regular",
    servingSize: "One appetizer order",
    prices: [
      {
        amount: 13.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/calamari/prod600045",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 670,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Meatballs Parmigiana",
    displayName: "Meatballs Parmigiana",
    productId: "meatballs-parmigiana",
    officialName: "Meatballs Parmigiana",
    isNewOfficialItem: false,
    description: "Five meatballs baked in marinara sauce and finished with melted Italian cheeses and a crunchy layer of toasted breadcrumbs.",
    portionType: "regular",
    servingSize: "5 meatballs",
    prices: [
      {
        amount: 11.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/meatballs-parmigiana/prod9760001",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1040,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Spinach-Artichoke Dip",
    displayName: "Spinach-Artichoke Dip",
    productId: "spinach-artichoke-dip",
    officialName: "Spinach-Artichoke Dip",
    isNewOfficialItem: false,
    description: "A warm, cheesy blend of spinach and artichokes served with crisp flatbread chips for scooping, an easy starter to share.",
    portionType: "regular",
    servingSize: "One appetizer order",
    prices: [
      {
        amount: 11.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/spinach-artichoke-dip/prod4890016",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1160,
    caloriesMax: null,
    caloriesBasis: "per order, with flatbread crisps",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Lasagna Fritta",
    displayName: "Lasagna Fritta",
    productId: "lasagna-fritta",
    officialName: "Lasagna Fritta",
    isNewOfficialItem: false,
    description: "Lasagna coated in parmesan breading and fried, then topped with parmesan and a beef and Italian sausage meat sauce, with creamy alfredo.",
    portionType: "regular",
    servingSize: "One appetizer order",
    prices: [
      {
        amount: 11.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/lasagna-fritta/prod80749",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1130,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Shrimp Fritto Misto",
    displayName: "Shrimp Fritto Misto",
    productId: "shrimp-fritto-misto",
    officialName: "Shrimp Fritto Misto",
    isNewOfficialItem: false,
    description: "More than half a pound of shrimp, hand-breaded with onions and bell peppers, lightly fried, and served with marinara and spicy ranch.",
    portionType: "regular",
    servingSize: "More than half a pound of shrimp (with onions and bell peppers)",
    prices: [
      {
        amount: 14.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/shrimp-fritto-misto/prod8290005",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1280,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  },
  {
    inventoryName: "Toasted Ravioli",
    displayName: "Toasted Ravioli",
    productId: "toasted-ravioli",
    officialName: "Toasted Ravioli",
    isNewOfficialItem: false,
    description: "Ravioli filled with seasoned beef, lightly fried until golden and crisp, and served with homemade marinara sauce for dipping.",
    portionType: "regular",
    servingSize: "One appetizer order",
    prices: [
      {
        amount: 10.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/toasted-ravioli/prod80841",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-11"
      }
    ],
    priceNote: null,
    options: [],
    calories: 650,
    caloriesMax: null,
    caloriesBasis: "per order",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-11",
    notes: null
  }
]);
