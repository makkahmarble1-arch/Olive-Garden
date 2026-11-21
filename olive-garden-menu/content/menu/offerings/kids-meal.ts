import { defineOfferings } from "@/lib/menu-data";

/**
 * 16. Kids Meal: 11 inventory entries.
 *
 * Imported from research/menu/menu-research.json (final research, 2026-11-12;
 * owner approved integration in Lesson 7.2). Source notes per value:
 * research/menu/kids-meal/. Order = inventory order, new official items last.
 * `inventoryName` is the owner's exact text (null only for new official items).
 * Prices: online pickup, Olive Garden Orlando - Millenia Mall.
 */
export const kidsMealOfferings = defineOfferings("kids-meal", [
  {
    inventoryName: "Kids Alfredo Pasta",
    displayName: "Kids Alfredo Pasta",
    productId: "kids-alfredo-pasta",
    officialName: "Kids Alfredo Sauce with Choice of Pasta (V)",
    isNewOfficialItem: false,
    description: "Kid-size pasta with alfredo sauce, choosing fettuccine, small shells, or spaghetti, served with a side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-alfredo-sauce-with-choice-of-pasta-v/prod340057",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Spaghetti with alfredo sauce",
        price: 7.49,
        calories: 610,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "spaghetti 170 + alfredo sauce 440"
      },
      {
        label: "Small Shells with alfredo sauce",
        price: 7.49,
        calories: 650,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "small shells 210 + alfredo sauce 440"
      },
      {
        label: "Fettuccine with alfredo sauce",
        price: 7.49,
        calories: 660,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "fettuccine 220 + alfredo sauce 440"
      }
    ],
    calories: 610,
    caloriesMax: 660,
    caloriesBasis: "kids main dish (pasta + alfredo sauce), depends on the pasta; side and milk extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-alfredo-sauce-with-choice-of-pasta-v/prod340057",
    caloriesValueBasis: "calculated",
    caloriesFormula: "kids pasta 170-220 (spaghetti 170, small shells 210, fettuccine 220; guide p. 12-13) + alfredo sauce 440 (guide p. 13 “Alfredo Sauce” 440)",
    caloriesNote: "Corrected 2026-11-19 (owner request): the previous value was the sauce alone. The online menu lists the sauce and a separate 305-570 range for pasta, side and milk.",
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Pizza",
    displayName: "Kids Pizza",
    productId: "kids-pizza",
    officialName: "Kids Pizza",
    isNewOfficialItem: false,
    description: "A kid-size cheese or pepperoni pizza with marinara and mozzarella, served with a side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-pizza/prod80723",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 400,
    caloriesMax: null,
    caloriesBasis: "cheese pizza; pepperoni not listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-pizza/prod80723",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Chicken Fingers",
    displayName: "Kids Chicken Fingers",
    productId: "kids-chicken-fingers",
    officialName: "Kids Chicken Fingers",
    isNewOfficialItem: false,
    description: "Lightly breaded chicken tenders for kids, served with a choice of side such as fries or grapes and a drink.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-chicken-fingers/prod80724",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 300,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-chicken-fingers/prod80724",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Macaroni & Cheese",
    displayName: "Kids Macaroni & Cheese",
    productId: "kids-macaroni-and-cheese",
    officialName: "Kids Macaroni & Cheese (V)",
    isNewOfficialItem: false,
    description: "Kid-size pasta shells in a creamy cheese sauce, served with a choice of side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-macaroni-cheese-v/prod80721",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 360,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-macaroni-cheese-v/prod80721",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Meat Sauce Pasta",
    displayName: "Kids Meat Sauce Pasta",
    productId: "kids-meat-sauce-pasta",
    officialName: "Kids Meat Sauce with Choice of Pasta",
    isNewOfficialItem: false,
    description: "Kid-size pasta with meat sauce, choosing fettuccine, small shells, or spaghetti, served with a side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-meat-sauce-with-choice-of-pasta/prod340059",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Spaghetti with meat sauce",
        price: 7.49,
        calories: 280,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "spaghetti 170 + meat sauce 110"
      },
      {
        label: "Small Shells with meat sauce",
        price: 7.49,
        calories: 320,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "small shells 210 + meat sauce 110"
      },
      {
        label: "Fettuccine with meat sauce",
        price: 7.49,
        calories: 330,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "fettuccine 220 + meat sauce 110"
      }
    ],
    calories: 280,
    caloriesMax: 330,
    caloriesBasis: "kids main dish (pasta + meat sauce), depends on the pasta; side and milk extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-meat-sauce-with-choice-of-pasta/prod340059",
    caloriesValueBasis: "calculated",
    caloriesFormula: "kids pasta 170-220 (spaghetti 170, small shells 210, fettuccine 220; guide p. 12-13) + meat sauce 110 (guide p. 13 “Meat Sauce” 110)",
    caloriesNote: "Corrected 2026-11-19 (owner request): the previous value was the sauce alone. The online menu lists the sauce and a separate 305-570 range for pasta, side and milk.",
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Tomato Sauce Pasta",
    displayName: "Kids Tomato Sauce Pasta",
    productId: "kids-tomato-sauce-pasta",
    officialName: "Kids Tomato Sauce with Choice of Pasta (V)",
    isNewOfficialItem: false,
    description: "Kid-size pasta with tomato sauce, choosing fettuccine, small shells, or spaghetti, served with a side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-tomato-sauce-with-choice-of-pasta-v/prod340058",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Spaghetti with tomato sauce",
        price: 7.49,
        calories: 250,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "spaghetti 170 + tomato sauce 80"
      },
      {
        label: "Small Shells with tomato sauce",
        price: 7.49,
        calories: 290,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "small shells 210 + tomato sauce 80"
      },
      {
        label: "Fettuccine with tomato sauce",
        price: 7.49,
        calories: 300,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "fettuccine 220 + tomato sauce 80"
      }
    ],
    calories: 250,
    caloriesMax: 300,
    caloriesBasis: "kids main dish (pasta + tomato sauce), depends on the pasta; side and milk extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-tomato-sauce-with-choice-of-pasta-v/prod340058",
    caloriesValueBasis: "calculated",
    caloriesFormula: "kids pasta 170-220 (spaghetti 170, small shells 210, fettuccine 220; guide p. 12-13) + tomato sauce 80 (guide p. 13 “Tomato Sauce” 80)",
    caloriesNote: "Corrected 2026-11-19 (owner request): the previous value was the sauce alone. The online menu lists the sauce and a separate 305-570 range for pasta, side and milk.",
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Five Cheese Marinara Pasta",
    displayName: "Kids Five Cheese Marinara Pasta",
    productId: "kids-five-cheese-marinara-pasta",
    officialName: "Kids Five Cheese Marinara with Choice of Pasta (V)",
    isNewOfficialItem: false,
    description: "Kid-size pasta with five cheese marinara, choosing fettuccine, small shells, or spaghetti, with a side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-five-cheese-marinara-with-choice-of-pasta-v/prod2910022",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [
      {
        label: "Spaghetti with five cheese marinara",
        price: 7.49,
        calories: 320,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "spaghetti 170 + five cheese marinara 150"
      },
      {
        label: "Small Shells with five cheese marinara",
        price: 7.49,
        calories: 360,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "small shells 210 + five cheese marinara 150"
      },
      {
        label: "Fettuccine with five cheese marinara",
        price: 7.49,
        calories: 370,
        caloriesMax: null,
        caloriesUnit: "per kids main dish",
        caloriesBasis: "calculated",
        caloriesFormula: "fettuccine 220 + five cheese marinara 150"
      }
    ],
    calories: 320,
    caloriesMax: 370,
    caloriesBasis: "kids main dish (pasta + five cheese marinara), depends on the pasta; side and milk extra",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-five-cheese-marinara-with-choice-of-pasta-v/prod2910022",
    caloriesValueBasis: "calculated",
    caloriesFormula: "kids pasta 170-220 (spaghetti 170, small shells 210, fettuccine 220; guide p. 12-13) + five cheese marinara 150 (online menu item page 150 (the guide has no kids five cheese marinara row))",
    caloriesNote: "Corrected 2026-11-19 (owner request): the previous value was the sauce alone. The online menu lists the sauce and a separate 305-570 range for pasta, side and milk.",
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad | PDF check (not-listed): Kids five cheese marinara sauce is not listed in the PDF kids section (only alfredo, meat, tomato)"
  },
  {
    inventoryName: "Kids Cheese Ravioli",
    displayName: "Kids Cheese Ravioli",
    productId: "kids-cheese-ravioli",
    officialName: "Kids Cheese Ravioli (V)",
    isNewOfficialItem: false,
    description: "Kid-size cheese-filled ravioli with tomato sauce, served with a choice of side and 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-cheese-ravioli-v/prod80722",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 340,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-cheese-ravioli-v/prod80722",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Grilled Chicken with Rotini Pasta & Marinara",
    displayName: "Kids Grilled Chicken with Rotini Pasta & Marinara",
    productId: "kids-grilled-chicken-with-rotini-pasta-and-marinara",
    officialName: "Kids Grilled Chicken with Rotini Pasta & Marinara",
    isNewOfficialItem: false,
    description: "A kids meal of grilled chicken breast with gluten-free rotini and marinara, plus grapes or broccoli and low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 9.98,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-grilled-chicken-with-rotini-pasta-marinara/prod7240045",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 430,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-grilled-chicken-with-rotini-pasta-marinara/prod7240045",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Rotini with Marinara",
    displayName: "Kids Rotini with Marinara",
    productId: "kids-rotini-with-marinara",
    officialName: "Kids Rotini with Marinara (V)",
    isNewOfficialItem: false,
    description: "A kids meal of gluten-free rotini with marinara sauce, served with grapes or broccoli and a 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-rotini-with-marinara-v/prod7240046",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 260,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-rotini-with-marinara-v/prod7240046",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  },
  {
    inventoryName: "Kids Rotini with Meat Sauce",
    displayName: "Kids Rotini with Meat Sauce",
    productId: "kids-rotini-with-meat-sauce",
    officialName: "Kids Rotini with Meat Sauce",
    isNewOfficialItem: false,
    description: "A kids meal of gluten-free rotini with meat sauce, served with grapes or broccoli and a 1% low-fat milk.",
    portionType: "kids",
    servingSize: "Kids meal",
    prices: [
      {
        amount: 7.49,
        unit: null,
        locationId: "orlando-fl-millenia-mall",
        sourceUrl: "https://www.olivegarden.com/menu/kids-rotini-with-meat-sauce/prod7240047",
        sourceNote: "Online ordering, Order Type: Pickup",
        checkedAt: "2026-11-12"
      }
    ],
    priceNote: null,
    options: [],
    calories: 340,
    caloriesMax: null,
    caloriesBasis: "kids main dish; side and milk listed separately",
    caloriesSourceUrl: "https://www.olivegarden.com/menu/kids-rotini-with-meat-sauce/prod7240047",
    caloriesValueBasis: "official",
    caloriesFormula: null,
    caloriesNote: null,
    calorieExtras: [],
    availability: "available",
    promotion: null,
    regularPriceOfferingId: null,
    status: "verified",
    verifiedAt: "2026-11-12",
    notes: "Kids meal for children under 12: includes a side and 1% low-fat milk; no soup or salad"
  }
]);
