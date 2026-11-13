import { defineOfferings } from "@/lib/menu-data";

/**
 * 4. Buy One Take One: 7 inventory entries.
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/buy-one-take-one/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const buyOneTakeOneOfferings = defineOfferings("buy-one-take-one", [
  {
    inventoryName: "Chicken Parmigiana",
    displayName: "Chicken Parmigiana",
    productId: "chicken-parmigiana",
    officialName: null,
    isNewOfficialItem: false,
    description: "Two parmesan-breaded chicken breasts, lightly fried and topped with marinara and melted Italian cheeses, with a side of spaghetti.",
    portionType: "promotion",
    servingSize: null,
    prices: [],
    priceNote: "Not in the current $6 Take Home offer",
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not part of this offer",
    calorieExtras: [],
    availability: "not-listed",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: false,
      conditions: [],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: "classic-entrees--chicken-parmigiana",
    status: "not-verified",
    verifiedAt: null,
    notes: "Not in the current $6 Take Home lineup (Fettuccine Alfredo, Five Cheese Ziti al Forno, Spaghetti with Meat Sauce) on 2026-11-12. The \"Buy One Take One\" name is not used on the official site now. | Not part of the current $6 Take Home offer. Available as a regular entrée in Classic Entrées ($21.29). | PDF check (not-listed): Not in the current take-home offer; the regular entrée values are checked under Classic Entrées"
  },
  {
    inventoryName: "Fettuccine Alfredo",
    displayName: "Fettuccine Alfredo",
    productId: "fettuccine-alfredo",
    officialName: "Fettuccine Alfredo ($6 Take Home)",
    isNewOfficialItem: false,
    description: "A chilled Fettuccine Alfredo to reheat at home, added for $6 when you buy an entrée; no soup, salad, or breadsticks.",
    portionType: "promotion",
    servingSize: "One chilled take-home entrée",
    prices: [
      {
        amount: 6,
        unit: "add-on with an entrée purchase",
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/specials/take-home-offer",
        sourceNote: "Official $6 Take Home offer page",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not published for the take-home portion",
    calorieExtras: [],
    availability: "available",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: true,
      conditions: [
        "Buy any entrée (online, phone, or in restaurant) to add a take-home entrée for $6",
        "Take-home entrée is freshly prepared and chilled to heat later",
        "No soup, salad, or breadsticks with the take-home entrée",
        "To go: one Take Home per entrée; dine-in: up to five per entrée",
        "No substitutions; prices vary by location",
        "Participating locations in the continental US (not Times Square) and Canada"
      ],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer",
        "https://www.olivegarden.com/specials"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: "classic-entrees--fettuccine-alfredo",
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Current official offer is \"$6 Take Home Entrées\": buy any entrée and add a chilled take-home classic for $6 (one per entrée to go; up to five per entrée dine-in). No soup, salad, or breadsticks. Prices vary by location. | Calories for the take-home portion are not published | Listed on the Millenia online ordering menu | PDF check (not-listed): Take-home portions are not listed in the PDF"
  },
  {
    inventoryName: "Five cheese ziti al forno",
    displayName: "Five Cheese Ziti al Forno",
    productId: "five-cheese-ziti-al-forno",
    officialName: "Five Cheese Ziti al Forno ($6 Take Home)",
    isNewOfficialItem: false,
    description: "A chilled Five Cheese Ziti al Forno to reheat at home, added for $6 when you buy an entrée; no soup or salad.",
    portionType: "promotion",
    servingSize: "One chilled take-home entrée",
    prices: [
      {
        amount: 6,
        unit: "add-on with an entrée purchase",
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/specials/take-home-offer",
        sourceNote: "Official $6 Take Home offer page",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not published for the take-home portion",
    calorieExtras: [],
    availability: "available",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: true,
      conditions: [
        "Buy any entrée (online, phone, or in restaurant) to add a take-home entrée for $6",
        "Take-home entrée is freshly prepared and chilled to heat later",
        "No soup, salad, or breadsticks with the take-home entrée",
        "To go: one Take Home per entrée; dine-in: up to five per entrée",
        "No substitutions; prices vary by location",
        "Participating locations in the continental US (not Times Square) and Canada"
      ],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer",
        "https://www.olivegarden.com/specials"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: "classic-entrees--five-cheese-ziti-al-forno",
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Current official offer is \"$6 Take Home Entrées\": buy any entrée and add a chilled take-home classic for $6 (one per entrée to go; up to five per entrée dine-in). No soup, salad, or breadsticks. Prices vary by location. | Calories for the take-home portion are not published | Listed on the Millenia online ordering menu | PDF check (not-listed): Take-home portions are not listed in the PDF"
  },
  {
    inventoryName: "Spaghetti With meat sauce",
    displayName: "Spaghetti with Meat Sauce",
    productId: "spaghetti-with-meat-sauce",
    officialName: "Spaghetti with Meat Sauce ($6 Take Home)",
    isNewOfficialItem: false,
    description: "A chilled Spaghetti with Meat Sauce to reheat at home, added for $6 when you buy an entrée; no soup or salad.",
    portionType: "promotion",
    servingSize: "One chilled take-home entrée",
    prices: [
      {
        amount: 6,
        unit: "add-on with an entrée purchase",
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/specials/take-home-offer",
        sourceNote: "Official $6 Take Home offer page",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not published for the take-home portion",
    calorieExtras: [],
    availability: "available",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: true,
      conditions: [
        "Buy any entrée (online, phone, or in restaurant) to add a take-home entrée for $6",
        "Take-home entrée is freshly prepared and chilled to heat later",
        "No soup, salad, or breadsticks with the take-home entrée",
        "To go: one Take Home per entrée; dine-in: up to five per entrée",
        "No substitutions; prices vary by location",
        "Participating locations in the continental US (not Times Square) and Canada"
      ],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer",
        "https://www.olivegarden.com/specials"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: "classic-entrees--spaghetti-with-meat-sauce",
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Current official offer is \"$6 Take Home Entrées\": buy any entrée and add a chilled take-home classic for $6 (one per entrée to go; up to five per entrée dine-in). No soup, salad, or breadsticks. Prices vary by location. | Calories for the take-home portion are not published | Listed on the Millenia online ordering menu | PDF check (not-listed): Take-home portions are not listed in the PDF"
  },
  {
    inventoryName: "Lasagna Classico",
    displayName: "Lasagna Classico",
    productId: "lasagna-classico",
    officialName: null,
    isNewOfficialItem: false,
    description: "Lasagna made fresh daily with layers of pasta, homemade meat sauce, and parmesan, mozzarella, and pecorino romano cheeses.",
    portionType: "promotion",
    servingSize: null,
    prices: [],
    priceNote: "Not in the current $6 Take Home offer",
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not part of this offer",
    calorieExtras: [],
    availability: "not-listed",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: false,
      conditions: [],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: "classic-entrees--lasagna-classico",
    status: "not-verified",
    verifiedAt: null,
    notes: "Not in the current $6 Take Home lineup (Fettuccine Alfredo, Five Cheese Ziti al Forno, Spaghetti with Meat Sauce) on 2026-11-12. The \"Buy One Take One\" name is not used on the official site now. | Not part of the current $6 Take Home offer. Available as a regular entrée in Classic Entrées ($19.99). | PDF check (not-listed): Not in the current take-home offer; the regular entrée values are checked under Classic Entrées"
  },
  {
    inventoryName: "Rigatoni alla Vodka",
    displayName: "Rigatoni alla Vodka",
    productId: "rigatoni-alla-vodka",
    officialName: null,
    isNewOfficialItem: false,
    description: null,
    portionType: "promotion",
    servingSize: null,
    prices: [],
    priceNote: "Not on the current online menu",
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not listed (not on the menu)",
    calorieExtras: [],
    availability: "not-listed",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: false,
      conditions: [],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: null,
    status: "not-verified",
    verifiedAt: null,
    notes: "Not in the current $6 Take Home lineup (Fettuccine Alfredo, Five Cheese Ziti al Forno, Spaghetti with Meat Sauce) on 2026-11-12. The \"Buy One Take One\" name is not used on the official site now. | Not part of the current $6 Take Home offer and not on the Millenia online menu (2026-11-12). | PDF check (not-listed): Not on the Millenia menu and not in the nutrition PDF"
  },
  {
    inventoryName: "Four-cheese manicotti with marinara",
    displayName: "Four-Cheese Manicotti with Marinara",
    productId: "four-cheese-manicotti-with-marinara",
    officialName: null,
    isNewOfficialItem: false,
    description: null,
    portionType: "promotion",
    servingSize: null,
    prices: [],
    priceNote: "Not on the current online menu",
    options: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    caloriesValueBasis: null,
    caloriesFormula: null,
    caloriesNote: "Not listed (not on the menu)",
    calorieExtras: [],
    availability: "not-listed",
    promotion: {
      name: "$6 Take Home Entrées",
      eligible: false,
      conditions: [],
      sourceUrls: [
        "https://www.olivegarden.com/specials/take-home-offer"
      ],
      checkedAt: "2026-11-12"
    },
    regularPriceOfferingId: null,
    status: "not-verified",
    verifiedAt: null,
    notes: "Not in the current $6 Take Home lineup (Fettuccine Alfredo, Five Cheese Ziti al Forno, Spaghetti with Meat Sauce) on 2026-11-12. The \"Buy One Take One\" name is not used on the official site now. | Not part of the current $6 Take Home offer and not on the Millenia online menu (2026-11-12). | PDF check (not-listed): Not on the Millenia menu and not in the nutrition PDF"
  }
]);
