import { defineOfferings } from "@/lib/menu-data";

/**
 * 10. Desserts: 6 inventory entries + 1 new official item(s).
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/desserts/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const dessertsOfferings = defineOfferings("desserts", [
  {
    inventoryName: "Chocolate lasagna",
    displayName: "Chocolate Lasagna",
    productId: "chocolate-lasagna",
    officialName: "Chocolate Lasagna (V)",
    isNewOfficialItem: false,
    description: "Layers of chocolate cake and creamy chocolate mousse with a thin layer of crushed wafers, finished with chocolate sauce.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 9.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/chocolate-lasagna-v/prod14320047",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 980,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/chocolate-lasagna-v/prod14320047",
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
    inventoryName: "Black tie Mousse Cake",
    displayName: "Black Tie Mousse Cake",
    productId: "black-tie-mousse-cake",
    officialName: "Black Tie Mousse Cake (V)",
    isNewOfficialItem: false,
    description: "Chocolate cake layered with dark chocolate cheesecake and creamy custard mousse, a rich choice for chocolate lovers.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 10.29,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/black-tie-mousse-cake-v/prod80978",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 750,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/black-tie-mousse-cake-v/prod80978",
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
    inventoryName: "Tiramisu",
    displayName: "Tiramisu",
    productId: "tiramisu",
    officialName: "Tiramisu (V)",
    isNewOfficialItem: false,
    description: "A classic Italian dessert of espresso-soaked ladyfingers topped with a smooth layer of creamy custard, served chilled by the slice.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 9.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/tiramisu-v/prod80967",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 470,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/tiramisu-v/prod80967",
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
    inventoryName: "Strawberry cream cake",
    displayName: "Strawberry Cream Cake",
    productId: "strawberry-cream-cake",
    officialName: "Strawberry Cream Cake (V)",
    isNewOfficialItem: false,
    description: "Light vanilla sponge cake layered with sweet vanilla cream and topped with fresh strawberries for a fruity finish.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 9.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/strawberry-cream-cake-v/prod81020",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 540,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/strawberry-cream-cake-v/prod81020",
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
    inventoryName: "Warm italian doughnuts",
    displayName: "Warm Italian Doughnuts",
    productId: "warm-italian-doughnuts",
    officialName: "Warm Italian Doughnuts (V)",
    isNewOfficialItem: false,
    description: "Warm fried doughnuts tossed in vanilla sugar, served with your choice of raspberry or chocolate sauce for dipping.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 8.99,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/warm-italian-doughnuts-v/prod81026",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 810,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/warm-italian-doughnuts-v/prod81026",
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
    inventoryName: "Sicilian cheesecake with strawberry topping",
    displayName: "Sicilian Cheesecake with Strawberry Topping",
    productId: "sicilian-cheesecake-with-strawberry-topping",
    officialName: "Sicilian Cheesecake with Strawberry Topping (V)",
    isNewOfficialItem: false,
    description: "A ricotta cheesecake on a shortbread cookie crust, topped with strawberry sauce for a lighter, less dense cheesecake slice.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 9.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/sicilian-cheesecake-with-strawberry-topping-v/prod1320006",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 730,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "PDF check: Menu card lists 700 cal; PDF lists 730"
  },
  {
    inventoryName: null,
    displayName: "Pumpkin Cookie Butter Cheesecake",
    productId: "pumpkin-cookie-butter-cheesecake",
    officialName: "NEW! Limited Time Pumpkin Cookie Butter Cheesecake (V)",
    isNewOfficialItem: true,
    description: "A limited-time cheesecake layering pumpkin and classic cheesecake with a cookie butter swirl on graham crust, topped with caramel and whipped cream.",
    portionType: "regular",
    servingSize: "Single dessert",
    prices: [
      {
        amount: 9.79,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/limited-time-pumpkin-cookie-butter-cheesecake-v/prod20770014",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 620,
    caloriesMax: null,
    caloriesBasis: "per dessert",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/limited-time-pumpkin-cookie-butter-cheesecake-v/prod20770014",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "limited-time",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Limited time (official label) | Listed on the Millenia online ordering menu"
  }
]);
