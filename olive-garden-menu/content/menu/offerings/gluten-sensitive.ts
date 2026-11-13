import { defineOfferings } from "@/lib/menu-data";

/**
 * 15. Gluten Sensitive: 10 inventory entries.
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/gluten-sensitive/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const glutenSensitiveOfferings = defineOfferings("gluten-sensitive", [
  {
    inventoryName: "Herb-Grilled Salmon",
    displayName: "Herb-Grilled Salmon",
    productId: "herb-grilled-salmon",
    officialName: "Herb-Grilled Salmon",
    isNewOfficialItem: false,
    description: "A grilled salmon fillet topped with garlic herb butter and served with parmesan garlic broccoli on the side.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 22.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/herb-grilled-salmon/prod80592",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 610,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/herb-grilled-salmon/prod80592",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available"
  },
  {
    inventoryName: "Zuppa Toscana",
    displayName: "Zuppa Toscana",
    productId: "zuppa-toscana",
    officialName: "Zuppa Toscana",
    isNewOfficialItem: false,
    description: "A creamy soup of spicy Italian sausage, kale, and potatoes, listed as made without gluten-containing ingredients.",
    portionType: "regular",
    servingSize: "One serving of soup",
    prices: [
      {
        amount: 9.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/zuppa-toscana/prod80794",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 220,
    caloriesMax: null,
    caloriesBasis: "per serving",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/zuppa-toscana/prod80794",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available"
  },
  {
    inventoryName: "Famous House Salad without croutons",
    displayName: "Famous House Salad without Croutons",
    productId: "famous-house-salad-without-croutons",
    officialName: "Famous House Salad without croutons",
    isNewOfficialItem: false,
    description: "The Famous House Salad prepared without croutons for the gluten-sensitive menu; breadsticks are left off unless requested.",
    portionType: "regular",
    servingSize: "One salad",
    prices: [
      {
        amount: 9.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/famous-house-salad-without-croutons/prod80077",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 110,
    caloriesMax: null,
    caloriesBasis: "per salad",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/famous-house-salad-without-croutons/prod80077",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available"
  },
  {
    inventoryName: "Grilled Chicken Parmigiana",
    displayName: "Grilled Chicken Parmigiana",
    productId: "grilled-chicken-parmigiana",
    officialName: "Grilled Chicken Parmigiana",
    isNewOfficialItem: false,
    description: "Grilled chicken breasts topped with marinara and Italian cheeses, served with gluten-free rotini in marinara instead of spaghetti.",
    portionType: "regular",
    servingSize: "Grilled chicken breasts + gluten-free rotini with marinara",
    prices: [
      {
        amount: 21.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/grilled-chicken-parmigiana/prod3520085",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 810,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/grilled-chicken-parmigiana/prod3520085",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available"
  },
  {
    inventoryName: "6 oz Sirloin (Gluten Sensitive)",
    displayName: "6 oz. Sirloin (Gluten Sensitive)",
    productId: "6-oz-sirloin",
    officialName: "6 oz Sirloin",
    isNewOfficialItem: false,
    description: "A grilled six-ounce sirloin topped with garlic herb butter, cooked to your chosen temperature and served with fettuccine alfredo.",
    portionType: "regular",
    servingSize: "6 oz sirloin + parmesan garlic broccoli (regular plate comes with fettuccine alfredo, 980 cal)",
    prices: [
      {
        amount: 21.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/6-oz-sirloin/prod5250492",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 480,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/6-oz-sirloin/prod5250492",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available"
  },
  {
    inventoryName: "Rotini Pasta with Marinara",
    displayName: "Rotini Pasta with Marinara",
    productId: "rotini-pasta-with-marinara",
    officialName: "Rotini Pasta with Marinara",
    isNewOfficialItem: false,
    description: "Gluten-free rotini tossed with homemade marinara, with optional grilled chicken, Italian sausage, or shrimp for an extra charge.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 13.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/rotini-pasta-with-marinara/prod260019",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 530,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/rotini-pasta-with-marinara/prod260019",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available. Add grilled chicken +$4.99; shrimp or sausage also offered"
  },
  {
    inventoryName: "Rotini Pasta with Meat Sauce",
    displayName: "Rotini Pasta with Meat Sauce",
    productId: "rotini-pasta-with-meat-sauce",
    officialName: "Rotini Pasta with Meat Sauce",
    isNewOfficialItem: false,
    description: "Gluten-free rotini tossed with homemade meat sauce made from beef and Italian sausage, with optional paid protein add-ons.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 13.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/rotini-pasta-with-meat-sauce/prod1580054",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 680,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/rotini-pasta-with-meat-sauce/prod1580054",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available"
  },
  {
    inventoryName: "Grilled Chicken with Rotini Pasta & Marinara",
    displayName: "Grilled Chicken with Rotini Pasta & Marinara",
    productId: "grilled-chicken-with-rotini-pasta-and-marinara",
    officialName: "Grilled Chicken with Rotini Pasta & Marinara (kids)",
    isNewOfficialItem: false,
    description: "A kids meal of grilled chicken breast with gluten-free rotini and marinara, plus grapes or broccoli and low-fat milk.",
    portionType: "regular",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 9.98,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/grilled-chicken-with-rotini-pasta-marinara-kids/prod2930079",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 430,
    caloriesMax: null,
    caloriesBasis: "kids main dish; 1% milk 100 cal extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/grilled-chicken-with-rotini-pasta-marinara-kids/prod2930079",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available. Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad. Officially a KIDS item (same as the Kids Meal listing)"
  },
  {
    inventoryName: "Rotini with Marinara",
    displayName: "Rotini with Marinara",
    productId: "rotini-with-marinara",
    officialName: "Rotini with Marinara (kids)",
    isNewOfficialItem: false,
    description: "A kids meal of gluten-free rotini with marinara sauce, served with grapes or broccoli and a 1% low-fat milk.",
    portionType: "regular",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/rotini-with-marinara-kids/prod2930078",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 260,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/rotini-with-marinara-kids/prod2930078",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available. Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad. Officially a KIDS item (alias A1: different from the adult Rotini Pasta with Marinara)"
  },
  {
    inventoryName: "Rotini with Meat Sauce",
    displayName: "Rotini with Meat Sauce",
    productId: "rotini-with-meat-sauce",
    officialName: "Rotini with Meat Sauce (kids)",
    isNewOfficialItem: false,
    description: "A kids meal of gluten-free rotini with meat sauce, served with grapes or broccoli and a 1% low-fat milk.",
    portionType: "regular",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/rotini-with-meat-sauce-kids/prod2930077",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 340,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/rotini-with-meat-sauce-kids/prod2930077",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Gluten Sensitive menu: breadsticks left off unless requested; complimentary garden salad (no croutons) or Zuppa Toscana where available. Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad. Officially a KIDS item (alias A2)"
  }
]);
