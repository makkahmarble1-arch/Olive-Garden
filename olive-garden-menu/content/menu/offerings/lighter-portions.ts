import { defineOfferings } from "@/lib/menu-data";

/**
 * 7. Lighter Portions: 7 inventory entries + 1 new official item(s).
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/lighter-portions/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const lighterPortionsOfferings = defineOfferings("lighter-portions", [
  {
    inventoryName: "Chicken Parmigiana",
    displayName: "Chicken Parmigiana",
    productId: "chicken-parmigiana",
    officialName: "Chicken Parmigiana (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller portion of Chicken Parmigiana with homemade marinara and a side of spaghetti, served weekday evenings and all weekend.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 14.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/chicken-parmigiana/prod19310013",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 630,
    caloriesMax: null,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/chicken-parmigiana/prod19310013",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: "Fettuccine Alfredo",
    displayName: "Fettuccine Alfredo",
    productId: "fettuccine-alfredo",
    officialName: "Fettuccine Alfredo (V) (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller plate of fettuccine in alfredo sauce made in-house each morning, offered weekday evenings and all day on weekends.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 13.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/fettuccine-alfredo-v/prod19310003",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 920,
    caloriesMax: null,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/fettuccine-alfredo-v/prod19310003",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: "Five cheese ziti al forno",
    displayName: "Five Cheese Ziti al Forno",
    productId: "five-cheese-ziti-al-forno",
    officialName: "Five Cheese Ziti al Forno (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller portion of ziti baked with Italian cheeses and five cheese marinara, available weekday evenings and all weekend.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 13.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/five-cheese-ziti-al-forno/prod19310007",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 630,
    caloriesMax: null,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/five-cheese-ziti-al-forno/prod19310007",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: "Lasagna Classico",
    displayName: "Lasagna Classico",
    productId: "lasagna-classico",
    officialName: "Lasagna Classico (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller serving of lasagna layered with pasta, Italian cheeses, and homemade meat sauce, available weekday evenings and weekends.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 14.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/lasagna-classico/prod19310015",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 500,
    caloriesMax: null,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/lasagna-classico/prod19310015",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: "Spaghetti & Meatballs",
    displayName: "Spaghetti & Meatballs",
    productId: "spaghetti-and-meatballs",
    officialName: "Spaghetti & Meatballs (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller plate of spaghetti with two meatballs, or one Italian sausage, in your choice of meat sauce or marinara.",
    portionType: "lighter-portion",
    servingSize: "Two meatballs (or one Italian sausage)",
    prices: [
      {
        amount: 14.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/spaghetti-meatballs/prod19310017",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Marinara & meatballs",
        price: 14.49,
        calories: 690,
        caloriesMax: null,
        caloriesUnit: "per lighter-portion entrée",
        caloriesBasis: "official",
        caloriesFormula: null
      },
      {
        label: "Meat sauce & meatballs",
        price: 14.49,
        calories: 800,
        caloriesMax: null,
        caloriesUnit: "per lighter-portion entrée",
        caloriesBasis: "official",
        caloriesFormula: null
      }
    ],
    calories: 690,
    caloriesMax: 800,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/spaghetti-meatballs/prod19310017",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: "Cheese Ravioli",
    displayName: "Cheese Ravioli",
    productId: "cheese-ravioli",
    officialName: "Cheese Ravioli (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller portion of cheese ravioli with melted mozzarella and your choice of homemade marinara or meat sauce.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 13.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/cheese-ravioli/prod19310009",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 440,
    caloriesMax: 500,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/cheese-ravioli/prod19310009",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: "Eggplant Parmigiana",
    displayName: "Eggplant Parmigiana",
    productId: "eggplant-parmigiana",
    officialName: "Eggplant Parmigiana (V) (Lighter Portion)",
    isNewOfficialItem: false,
    description: "A smaller portion of hand-breaded, lightly fried eggplant parmigiana served with a side of spaghetti; a vegetarian option.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 13.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/eggplant-parmigiana-v/prod19310014",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 660,
    caloriesMax: null,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/eggplant-parmigiana-v/prod19310014",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  },
  {
    inventoryName: null,
    displayName: "Spicy Alfredo Fettuccine (Lighter Portion)",
    productId: "spicy-alfredo-fettuccine",
    officialName: "NEW! Spicy Alfredo Fettuccine (Lighter Portion)",
    isNewOfficialItem: true,
    description: "A smaller, limited-time plate of fettuccine in spicy alfredo made with Calabrian peppers, served weekday evenings and all weekend.",
    portionType: "lighter-portion",
    servingSize: "Lighter portion",
    prices: [
      {
        amount: 13.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/spicy-alfredo-fettuccine/prod0219000045",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 1000,
    caloriesMax: null,
    caloriesBasis: "per lighter-portion entrée",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/spicy-alfredo-fettuccine/prod0219000045",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "limited-time",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Lighter Portions: Mon-Fri after 3 PM and all day Sat-Sun. Soup or salad and 2 breadsticks included (dine-in/pickup entrée) | Listed on the Millenia online ordering menu"
  }
]);
