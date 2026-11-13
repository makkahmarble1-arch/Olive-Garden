import { defineOfferings } from "@/lib/menu-data";

/**
 * 5. Amazing Alfredos: 5 inventory entries.
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/amazing-alfredos/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const amazingAlfredosOfferings = defineOfferings("amazing-alfredos", [
  {
    inventoryName: "Chicken Alfredo",
    displayName: "Chicken Alfredo",
    productId: "chicken-alfredo",
    officialName: "Chicken Alfredo",
    isNewOfficialItem: false,
    description: "Fettuccine in a from-scratch alfredo sauce of parmesan, cream, garlic, and butter, topped with slices of grilled chicken breast.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 21.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/chicken-alfredo/prod80389",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1480,
    caloriesMax: 1710,
    caloriesBasis: "per entrée, depends on the chicken",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/chicken-alfredo/prod80389",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Soup or salad and 2 breadsticks included (dine-in/pickup entrée). Listed in the official \"Amazing Alfredos!\" section"
  },
  {
    inventoryName: "Fettuccine Alfredo",
    displayName: "Fettuccine Alfredo",
    productId: "fettuccine-alfredo",
    officialName: "Fettuccine Alfredo (V)",
    isNewOfficialItem: false,
    description: "Fettuccine tossed in alfredo sauce made in-house each morning with parmesan, cream, garlic, and butter; a vegetarian favorite.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 17.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/fettuccine-alfredo-v/prod80168",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1220,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/fettuccine-alfredo-v/prod80168",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Soup or salad and 2 breadsticks included (dine-in/pickup entrée). Listed in the official \"Amazing Alfredos!\" section"
  },
  {
    inventoryName: "Shrimp Alfredo",
    displayName: "Shrimp Alfredo",
    productId: "shrimp-alfredo",
    officialName: "Shrimp Alfredo",
    isNewOfficialItem: false,
    description: "Fettuccine in a from-scratch alfredo sauce of parmesan, cream, garlic, and butter, tossed with tender sautéed shrimp.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 22.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/shrimp-alfredo/prod2030064",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1390,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/shrimp-alfredo/prod2030064",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Soup or salad and 2 breadsticks included (dine-in/pickup entrée). Listed in the official \"Amazing Alfredos!\" section"
  },
  {
    inventoryName: "Chicken Tortelloni alfredo",
    displayName: "Chicken Tortelloni Alfredo",
    productId: "chicken-tortelloni-alfredo",
    officialName: "Chicken Tortelloni Alfredo",
    isNewOfficialItem: false,
    description: "Asiago-filled tortelloni baked in alfredo with Italian cheeses and toasted breadcrumbs, topped with sliced grilled chicken or shrimp.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 23.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/chicken-tortelloni-alfredo/prod5250302",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Chicken Tortelloni Alfredo",
        price: 23.99,
        calories: 1980,
        caloriesMax: null,
        caloriesUnit: "per entrée",
        caloriesBasis: "official",
        caloriesFormula: null
      },
      {
        label: "Shrimp Tortelloni Alfredo",
        price: 25.79,
        calories: 1870,
        caloriesMax: null,
        caloriesUnit: "per entrée",
        caloriesBasis: "official",
        caloriesFormula: null
      }
    ],
    calories: 1980,
    caloriesMax: null,
    caloriesBasis: "per entrée (chicken version)",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/chicken-tortelloni-alfredo/prod5250302",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Soup or salad and 2 breadsticks included (dine-in/pickup entrée). Listed in the official \"Amazing Alfredos!\" section"
  },
  {
    inventoryName: "Seafood Alfredo",
    displayName: "Seafood Alfredo",
    productId: "seafood-alfredo",
    officialName: "Seafood Alfredo",
    isNewOfficialItem: false,
    description: "Fettuccine in a from-scratch alfredo sauce, tossed with sautéed shrimp and scallops for a rich seafood pasta dish.",
    portionType: "regular",
    servingSize: "Entrée",
    prices: [
      {
        amount: 23.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/seafood-alfredo/prod80587",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1370,
    caloriesMax: null,
    caloriesBasis: "per entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/seafood-alfredo/prod80587",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Soup or salad and 2 breadsticks included (dine-in/pickup entrée). Listed in the official \"Amazing Alfredos!\" section"
  }
]);
