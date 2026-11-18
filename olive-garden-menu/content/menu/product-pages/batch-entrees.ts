import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Phase 2 (2026-11-18): Classic Entrées and Alfredos with a single official
 * row and an accurate photo. Pending (photo does not match the official dish,
 * research/products/PENDING.md): Chicken Parmigiana, Chicken Scampi, Shrimp
 * Scampi, Herb-Grilled Salmon, 6 oz. Sirloin, Spicy Alfredo Fettuccine.
 * Multi-version dishes (Chicken Alfredo, Spaghetti & Meatballs, Cheese
 * Ravioli, Calabrian Bucatini) wait for the version-aware layout approval.
 */

const ENTREE_RELATED: RelatedMenuRef[] = [
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "lunch-menu", text: "Weekday lunch portions at lower prices." },
  { categoryId: "lighter-portions", text: "Smaller dinner portions of popular pastas." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const ALFREDO_RELATED: RelatedMenuRef[] = [
  { categoryId: "amazing-alfredos", text: "Every Alfredo dish side by side." },
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "catering", text: "Alfredo pans for groups." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const SALAD = "soups-salad-and-breadsticks--famous-house-salad";
const SOUP = "soups-salad-and-breadsticks--homemade-soups";

export const entreePages: ProductPageContent[] = [
  itemPage({
    slug: "fettuccine-alfredo",
    primaryOfferingId: "classic-entrees--fettuccine-alfredo",
    sizeOfferingIds: ["lunch-menu--fettuccine-alfredo", "lighter-portions--fettuccine-alfredo", "family-style-meals--fettuccine-alfredo"],
    primaryKeyword: "olive garden fettuccine alfredo",
    secondaryKeywords: ["fettuccine alfredo price", "fettuccine alfredo calories", "lunch fettuccine alfredo", "alfredo pan"],
    metaTitle: "Olive Garden Fettuccine Alfredo: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Fettuccine Alfredo costs $17.49 with 1,220 calories as a dinner entrée. Compare lunch, lighter and family-size versions, nutrition and allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Fettuccine Alfredo",
      paragraphs: [
        "Fettuccine Alfredo is Olive Garden’s signature pasta: fettuccine tossed in an alfredo sauce that the menu says is made in-house each morning with parmesan, cream, garlic and butter. Olive Garden marks it with its vegetarian (V) label.",
        "The dinner entrée costs $17.49 and has 1,220 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The guide also lists broccoli as an add-on at 150 calories.",
        [
          "The same dish comes in smaller sizes: a weekday lunch portion and a lighter dinner portion (920 calories each), plus a family-style pan. All versions are compared below; the ",
          { text: "Amazing Alfredos page", href: "/amazing-alfredos" },
          " lines it up against the other alfredo dishes.",
        ],
      ],
    },
    ingredients: [
      { name: "Fettuccine", detail: "Flat ribbon pasta." },
      { name: "Alfredo sauce", detail: "Made with parmesan, cream, garlic and butter, according to the menu." },
    ],
    allergenFacts: ["Fettuccine in a cream, parmesan and butter alfredo sauce."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices and balances a creamy pasta." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Add grilled chicken if you want more protein with your alfredo." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A classic Italian dessert to finish." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A bright lemonade next to a rich sauce." },
    ],
    relatedOfferingIds: ["classic-entrees--shrimp-alfredo", "classic-entrees--seafood-alfredo", "classic-entrees--steak-gorgonzola-alfredo", "classic-entrees--five-cheese-ziti-al-forno"],
    faqs: [
      {
        question: "Is Olive Garden Fettuccine Alfredo vegetarian?",
        answer:
          "Olive Garden marks it with its vegetarian (V) label on the online menu. Olive Garden also notes that shared kitchens mean cross-contact with animal products is possible.",
      },
      {
        question: "Is there a smaller Fettuccine Alfredo?",
        answer: "Yes. The weekday lunch menu and the lighter portions menu each list a smaller Fettuccine Alfredo with 920 calories.",
        link: { text: "See lighter portions", href: "/lighter-portions" },
      },
    ],
    related: ALFREDO_RELATED,
  }),

  itemPage({
    slug: "shrimp-alfredo",
    primaryOfferingId: "classic-entrees--shrimp-alfredo",
    sizeOfferingIds: ["family-style-meals--shrimp-alfredo"],
    primaryKeyword: "olive garden shrimp alfredo",
    secondaryKeywords: ["shrimp alfredo price", "shrimp alfredo calories", "shrimp alfredo pan"],
    metaTitle: "Olive Garden Shrimp Alfredo: Price, Calories & Nutrition",
    metaDescription:
      "Olive Garden Shrimp Alfredo costs $22.49 with 1,390 calories: fettuccine alfredo with sautéed shrimp. See the family pan, nutrition and shellfish allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Shrimp Alfredo",
      paragraphs: [
        "Shrimp Alfredo tosses fettuccine in Olive Garden’s from-scratch alfredo sauce of parmesan, cream, garlic and butter, with tender sautéed shrimp mixed in.",
        "The dinner entrée costs $22.49 and has 1,390 calories, based on the online pickup price we checked and the U.S. nutrition guide. With 60 g protein it has more than twice the protein of plain Fettuccine Alfredo (27 g).",
        "Because of the shrimp, the allergen guide marks it as containing crustacean shellfish as well as dairy, wheat, gluten and sulfites.",
      ],
    },
    ingredients: [
      { name: "Fettuccine", detail: "Flat ribbon pasta." },
      { name: "Alfredo sauce", detail: "Parmesan, cream, garlic and butter, according to the menu." },
      { name: "Sautéed shrimp", detail: "Tossed with the pasta." },
    ],
    allergenFacts: ["Fettuccine alfredo with sautéed shrimp."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp first course before a creamy seafood pasta." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "Share a seafood starter before the main course." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity cake to finish." },
      { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade with seafood." },
    ],
    relatedOfferingIds: ["classic-entrees--seafood-alfredo", "classic-entrees--fettuccine-alfredo", "classic-entrees--shrimp-carbonara", "classic-entrees--steak-gorgonzola-alfredo"],
    faqs: [
      {
        question: "What is the difference between Shrimp Alfredo and Seafood Alfredo?",
        answer:
          "Shrimp Alfredo has sautéed shrimp; Seafood Alfredo has both shrimp and scallops. Shrimp Alfredo has 1,390 calories and Seafood Alfredo 1,370, according to Olive Garden’s nutrition guide.",
        link: { text: "See Seafood Alfredo", href: "/menu/seafood-alfredo" },
      },
    ],
    related: ALFREDO_RELATED,
  }),

  itemPage({
    slug: "seafood-alfredo",
    primaryOfferingId: "classic-entrees--seafood-alfredo",
    primaryKeyword: "olive garden seafood alfredo",
    secondaryKeywords: ["seafood alfredo price", "seafood alfredo calories", "shrimp and scallops alfredo"],
    metaTitle: "Olive Garden Seafood Alfredo: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Seafood Alfredo costs $23.49 with 1,370 calories: fettuccine alfredo with shrimp and scallops. See nutrition and shellfish and mollusk allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Seafood Alfredo",
      paragraphs: [
        "Seafood Alfredo combines fettuccine and a from-scratch alfredo sauce with sautéed shrimp and scallops, making it the richest seafood pasta on the Alfredo menu.",
        "It costs $23.49 and has 1,370 calories as a dinner entrée, based on the online pickup price we checked and the U.S. nutrition guide.",
        "Scallops are mollusks and shrimp are crustaceans, so the allergen guide marks both, along with dairy, wheat, gluten and sulfites.",
      ],
    },
    ingredients: [
      { name: "Fettuccine", detail: "Flat ribbon pasta." },
      { name: "Alfredo sauce", detail: "Made from scratch, according to the menu." },
      { name: "Shrimp", detail: "Sautéed." },
      { name: "Scallops", detail: "Sautéed." },
    ],
    allergenFacts: ["Fettuccine alfredo with sautéed shrimp and scallops."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A fresh first course before a rich seafood pasta." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "Keep the seafood theme with a shared starter." },
      { offeringId: "desserts--sicilian-cheesecake-with-strawberry-topping", kind: "Dessert", reason: "Ricotta cheesecake with strawberry sauce to finish." },
      { offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata", kind: "Drink", reason: "A sparkling fruit drink with seafood." },
    ],
    relatedOfferingIds: ["classic-entrees--shrimp-alfredo", "classic-entrees--shrimp-carbonara", "classic-entrees--fettuccine-alfredo", "classic-entrees--steak-gorgonzola-alfredo"],
    faqs: [
      {
        question: "What seafood is in Olive Garden Seafood Alfredo?",
        answer: "Sautéed shrimp and scallops, tossed with fettuccine in alfredo sauce.",
      },
    ],
    related: ALFREDO_RELATED,
  }),

  itemPage({
    slug: "steak-gorgonzola-alfredo",
    primaryOfferingId: "classic-entrees--steak-gorgonzola-alfredo",
    primaryKeyword: "olive garden steak gorgonzola alfredo",
    secondaryKeywords: ["steak gorgonzola alfredo price", "steak gorgonzola alfredo calories", "steak alfredo olive garden"],
    metaTitle: "Olive Garden Steak Gorgonzola Alfredo: Price & Calories",
    metaDescription:
      "Olive Garden Steak Gorgonzola Alfredo costs $23.29 with 1,580 calories: grilled sirloin tips over fettuccine alfredo with gorgonzola. See nutrition and allergens.",
    servingSummary: "Dinner entrée, steak prepared medium",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Steak Gorgonzola Alfredo",
      paragraphs: [
        "Steak Gorgonzola Alfredo tops fettuccine alfredo with grilled sirloin tips, gorgonzola and spinach, then finishes the plate with sun-dried tomatoes and a balsamic drizzle. Olive Garden lists the steak as prepared medium.",
        "It costs $23.29 and has 1,580 calories with 74 g protein, based on the online pickup price we checked and the U.S. nutrition guide.",
        "The allergen guide marks it as grilled (shared grill) and as containing dairy, wheat, gluten and sulfites.",
      ],
    },
    ingredients: [
      { name: "Sirloin tips", detail: "Grilled." },
      { name: "Fettuccine alfredo", detail: "The pasta base." },
      { name: "Gorgonzola", detail: "Named in the dish." },
      { name: "Spinach", detail: "Tossed in." },
      { name: "Sun-dried tomatoes and balsamic drizzle", detail: "The finishing touch." },
    ],
    allergenFacts: ["Grilled sirloin tips over fettuccine alfredo with gorgonzola."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A light first course before a big steak pasta." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Parmesan garlic broccoli adds a vegetable side." },
      { offeringId: "desserts--black-tie-mousse-cake", kind: "Dessert", reason: "A chocolate finish for a steakhouse-style meal." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "A zero-calorie drink next to a 1,580-calorie plate." },
    ],
    relatedOfferingIds: ["classic-entrees--fettuccine-alfredo", "classic-entrees--seafood-alfredo", "classic-entrees--tour-of-italy", "classic-entrees--stuffed-chicken-marsala"],
    faqs: [
      {
        question: "How is the steak cooked in Steak Gorgonzola Alfredo?",
        answer: "Olive Garden’s menu lists the sirloin tips as grilled and prepared medium.",
      },
    ],
    related: ALFREDO_RELATED,
  }),

  itemPage({
    slug: "five-cheese-ziti-al-forno",
    primaryOfferingId: "classic-entrees--five-cheese-ziti-al-forno",
    sizeOfferingIds: ["lunch-menu--five-cheese-ziti-al-forno", "lighter-portions--five-cheese-ziti-al-forno", "family-style-meals--five-cheese-ziti-al-forno"],
    primaryKeyword: "olive garden five cheese ziti al forno",
    secondaryKeywords: ["five cheese ziti price", "five cheese ziti calories", "baked ziti olive garden"],
    metaTitle: "Olive Garden Five Cheese Ziti al Forno: Price & Calories",
    metaDescription:
      "Olive Garden Five Cheese Ziti al Forno costs $19.29 with 1,170 calories as a dinner entrée. Compare lunch, lighter and family sizes, nutrition and allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Five Cheese Ziti al Forno",
      paragraphs: [
        "Five Cheese Ziti al Forno is baked pasta: ziti in five cheese marinara under a blend of melted Italian cheeses, baked until bubbly and golden on top.",
        "The dinner entrée costs $19.29 and has 1,170 calories, based on the online pickup price we checked and the U.S. nutrition guide. Lunch and lighter portions (630 calories) and a family-style pan are compared below.",
        "There is no meat in the menu description, but Olive Garden does not mark it with its vegetarian (V) label on the online menu we checked.",
      ],
    },
    ingredients: [
      { name: "Ziti", detail: "Tube pasta." },
      { name: "Five cheese marinara", detail: "The baking sauce." },
      { name: "Italian cheeses", detail: "Melted on top." },
    ],
    allergenFacts: ["Ziti baked in five cheese marinara under melted Italian cheeses."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp salad to balance a cheesy bake." },
      { offeringId: "appetizers--stuffed-ziti-fritta", kind: "Appetizer", reason: "The fried, appetizer-size take on cheese-filled ziti." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A classic finish." },
      { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea", kind: "Drink", reason: "A light fruit tea at 80 calories." },
    ],
    relatedOfferingIds: ["classic-entrees--lasagna-classico", "classic-entrees--ravioli-carbonara", "classic-entrees--eggplant-parmigiana", "classic-entrees--spaghetti-with-meat-sauce"],
    faqs: [
      {
        question: "Is there a smaller Five Cheese Ziti al Forno?",
        answer: "Yes. The weekday lunch menu and the lighter portions menu each list it with 630 calories.",
        link: { text: "See the lunch menu", href: "/lunch-menu" },
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "lasagna-classico",
    primaryOfferingId: "classic-entrees--lasagna-classico",
    sizeOfferingIds: ["lunch-menu--lasagna-classico", "lighter-portions--lasagna-classico", "family-style-meals--lasagna-classico"],
    primaryKeyword: "olive garden lasagna classico",
    secondaryKeywords: ["lasagna classico price", "lasagna classico calories", "olive garden lasagna", "lasagna pan"],
    metaTitle: "Olive Garden Lasagna Classico: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Lasagna Classico costs $19.99 with 940 calories as a dinner entrée. Compare the lunch, lighter and family pan sizes, nutrition and allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Lasagna Classico",
      paragraphs: [
        "Lasagna Classico is made fresh daily, according to the menu, with layers of pasta, homemade meat sauce, and parmesan, mozzarella and pecorino romano cheeses.",
        "The dinner entrée costs $19.99 and has 940 calories with 54 g protein, based on the online pickup price we checked and the U.S. nutrition guide. Lunch and lighter portions (500 calories) and a family pan are compared below.",
        [
          "It is also one of the three dishes on the ",
          { text: "Tour of Italy", href: "/menu/tour-of-italy" },
          " plate, next to Chicken Parmigiana and Fettuccine Alfredo.",
        ],
      ],
    },
    ingredients: [
      { name: "Lasagna pasta", detail: "Layered sheets." },
      { name: "Meat sauce", detail: "Homemade, according to the menu." },
      { name: "Parmesan, mozzarella and pecorino romano", detail: "The three cheeses named in the description." },
    ],
    allergenFacts: ["Layered pasta with meat sauce and three Italian cheeses."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp first course before a hearty bake." },
      { offeringId: "appetizers--lasagna-fritta", kind: "Appetizer", reason: "The fried appetizer version, for real lasagna fans." },
      { offeringId: "desserts--chocolate-lasagna", kind: "Dessert", reason: "The dessert namesake: layered chocolate cake." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade." },
    ],
    relatedOfferingIds: ["classic-entrees--five-cheese-ziti-al-forno", "classic-entrees--tour-of-italy", "classic-entrees--spaghetti-with-meat-sauce", "classic-entrees--ravioli-carbonara"],
    faqs: [
      {
        question: "Is there a smaller Lasagna Classico?",
        answer: "Yes. The weekday lunch menu and the lighter portions menu each list a smaller Lasagna Classico with 500 calories.",
        link: { text: "See lighter portions", href: "/lighter-portions" },
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "spaghetti-with-meat-sauce",
    primaryOfferingId: "classic-entrees--spaghetti-with-meat-sauce",
    sizeOfferingIds: ["family-style-meals--spaghetti-with-meat-sauce"],
    primaryKeyword: "olive garden spaghetti with meat sauce",
    secondaryKeywords: ["spaghetti with meat sauce price", "spaghetti with meat sauce calories", "olive garden spaghetti"],
    metaTitle: "Olive Garden Spaghetti with Meat Sauce: Price & Calories",
    metaDescription:
      "Olive Garden Spaghetti with Meat Sauce costs $13.99 with 640 calories as a dinner entrée, with beef and Italian sausage sauce. See the family pan and nutrition.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Spaghetti with Meat Sauce",
      paragraphs: [
        "Spaghetti with Meat Sauce is the simplest meat pasta on the menu: spaghetti topped with a homemade meat sauce made with pan-seared beef and Italian sausage.",
        "At $13.99 it is one of the lowest-priced dinner entrées, and at 640 calories one of the lighter ones, based on the online pickup price we checked and the U.S. nutrition guide.",
        "A family-style pan is also available and compared below.",
      ],
    },
    ingredients: [
      { name: "Spaghetti", detail: "The pasta base." },
      { name: "Meat sauce", detail: "Pan-seared beef and Italian sausage, according to the menu." },
    ],
    allergenFacts: ["Spaghetti with a beef and Italian sausage meat sauce."],
    pairings: [
      { offeringId: SOUP, kind: "Soup & salad", reason: "A cup of soup is one of the first-course choices." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "A cheesy shared starter before a simple pasta." },
      { offeringId: "desserts--warm-italian-doughnuts", kind: "Dessert", reason: "Warm doughnuts to finish." },
      { offeringId: "non-alcoholic-beverages--half-iced-tea-and-half-lemonade", kind: "Drink", reason: "Half iced tea, half lemonade at 80 calories." },
    ],
    relatedOfferingIds: ["classic-entrees--spaghetti-with-marinara", "classic-entrees--lasagna-classico", "classic-entrees--five-cheese-ziti-al-forno", "classic-entrees--tour-of-italy"],
    faqs: [
      {
        question: "What meat is in Olive Garden’s meat sauce?",
        answer: "Olive Garden’s menu describes the homemade meat sauce as made with pan-seared beef and Italian sausage.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "spaghetti-with-marinara",
    primaryOfferingId: "classic-entrees--spaghetti-with-marinara",
    primaryKeyword: "olive garden spaghetti with marinara",
    secondaryKeywords: ["spaghetti marinara price", "spaghetti marinara calories", "vegetarian pasta olive garden"],
    metaTitle: "Olive Garden Spaghetti with Marinara: Price & Calories",
    metaDescription:
      "Olive Garden Spaghetti with Marinara costs $13.99 with 490 calories, one of the lightest dinner entrées. See nutrition, allergens and the (V) label.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Spaghetti with Marinara",
      paragraphs: [
        "Spaghetti with Marinara is spaghetti topped with Olive Garden’s homemade marinara sauce. Olive Garden marks it with its vegetarian (V) label, and the menu notes it can be upgraded with sautéed shrimp for an extra charge.",
        "It costs $13.99 and has 490 calories with 12 g fat, which makes it one of the lightest dinner entrées, based on the online pickup price we checked and the U.S. nutrition guide.",
        "The allergen guide lists it as containing wheat, gluten and soy, and does not mark dairy or eggs.",
      ],
    },
    ingredients: [
      { name: "Spaghetti", detail: "The pasta base." },
      { name: "Marinara sauce", detail: "Homemade, according to the menu." },
    ],
    allergenFacts: ["Spaghetti with homemade marinara sauce."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A fresh first course with a light pasta." },
      { offeringId: "appetizers--breadsticks", kind: "Side", reason: "Extra breadsticks for the marinara." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A fruity cake to finish a light meal." },
      { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea", kind: "Drink", reason: "A light fruit tea at 80 calories." },
    ],
    relatedOfferingIds: ["classic-entrees--spaghetti-with-meat-sauce", "classic-entrees--eggplant-parmigiana", "classic-entrees--fettuccine-alfredo", "classic-entrees--five-cheese-ziti-al-forno"],
    faqs: [
      {
        question: "Is Olive Garden Spaghetti with Marinara vegetarian?",
        answer:
          "Olive Garden marks it with its vegetarian (V) label on the online menu. Shared kitchens mean cross-contact with animal products is possible, according to Olive Garden.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "shrimp-carbonara",
    primaryOfferingId: "classic-entrees--shrimp-carbonara",
    primaryKeyword: "olive garden shrimp carbonara",
    secondaryKeywords: ["shrimp carbonara price", "shrimp carbonara calories"],
    metaTitle: "Olive Garden Shrimp Carbonara: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Shrimp Carbonara costs $24.99 with 1,200 calories: shrimp in a creamy sauce with bacon and roasted red peppers over spaghetti. See nutrition.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Shrimp Carbonara",
      paragraphs: [
        "Shrimp Carbonara sautés shrimp in a creamy sauce with bacon and roasted red peppers and serves it over a generous bed of spaghetti.",
        "At $24.99 it is one of the higher-priced dinner entrées; it has 1,200 calories and 58 g protein, based on the online pickup price we checked and the U.S. nutrition guide.",
        "The allergen guide marks it as containing crustacean shellfish, dairy, wheat, gluten and sulfites.",
      ],
    },
    ingredients: [
      { name: "Shrimp", detail: "Sautéed." },
      { name: "Creamy carbonara sauce", detail: "With bacon and roasted red peppers." },
      { name: "Spaghetti", detail: "Served underneath." },
    ],
    allergenFacts: ["Sautéed shrimp in a creamy sauce with bacon and roasted red peppers, over spaghetti."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp first course before a creamy pasta." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A shared seafood starter." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A classic Italian finish." },
      { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade with seafood." },
    ],
    relatedOfferingIds: ["classic-entrees--ravioli-carbonara", "classic-entrees--shrimp-alfredo", "classic-entrees--seafood-alfredo", "classic-entrees--fettuccine-alfredo"],
    faqs: [
      {
        question: "Does Olive Garden Shrimp Carbonara have bacon?",
        answer: "Yes. The menu describes a creamy sauce with bacon and roasted red peppers.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "ravioli-carbonara",
    primaryOfferingId: "classic-entrees--ravioli-carbonara",
    primaryKeyword: "olive garden ravioli carbonara",
    secondaryKeywords: ["ravioli carbonara price", "ravioli carbonara calories"],
    metaTitle: "Olive Garden Ravioli Carbonara: Price, Calories & Nutrition",
    metaDescription:
      "Olive Garden Ravioli Carbonara costs $18.99 with 1,390 calories: cheese ravioli baked in a creamy sauce with bacon under melted cheeses. See nutrition and allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Ravioli Carbonara",
      paragraphs: [
        "Ravioli Carbonara bakes cheese ravioli in a creamy sauce with bacon and finishes it with a blend of melted Italian cheeses on top.",
        "It costs $18.99 and has 1,390 calories with 104 g fat, one of the highest fat totals among the dinner entrées, based on the online pickup price we checked and the U.S. nutrition guide.",
        "The allergen guide marks it as containing dairy, eggs, wheat, gluten and soy.",
      ],
    },
    ingredients: [
      { name: "Cheese ravioli", detail: "The pasta base." },
      { name: "Creamy sauce with bacon", detail: "The carbonara-style sauce." },
      { name: "Italian cheeses", detail: "Melted on top." },
    ],
    allergenFacts: ["Cheese ravioli baked in a creamy bacon sauce under melted Italian cheeses."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp salad before a rich, baked pasta." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "A vegetable side for a creamy dish." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity finish." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "A zero-calorie drink." },
    ],
    relatedOfferingIds: ["classic-entrees--shrimp-carbonara", "classic-entrees--five-cheese-ziti-al-forno", "classic-entrees--lasagna-classico", "classic-entrees--fettuccine-alfredo"],
    faqs: [
      {
        question: "What is in Olive Garden Ravioli Carbonara?",
        answer: "Cheese ravioli baked in a creamy sauce with bacon, topped with a blend of melted Italian cheeses.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "tour-of-italy",
    primaryOfferingId: "classic-entrees--tour-of-italy",
    primaryKeyword: "olive garden tour of italy",
    secondaryKeywords: ["tour of italy price", "tour of italy calories", "olive garden combo plate"],
    metaTitle: "Olive Garden Tour of Italy: Price, Calories & What’s on It",
    metaDescription:
      "Olive Garden Tour of Italy costs $23.49 with 1,550 calories: Chicken Parmigiana, Lasagna Classico and Fettuccine Alfredo on one plate. See nutrition and allergens.",
    servingSummary: "Three dishes on one plate, with soup or salad and breadsticks",
    servingBasis: "One Tour of Italy plate, as served",
    entreeFirstCourse: true,
    priceSubject: "A Tour of Italy plate",
    about: {
      heading: "About the Olive Garden Tour of Italy",
      paragraphs: [
        "The Tour of Italy puts three Olive Garden favorites on one plate: Chicken Parmigiana, Lasagna Classico and Fettuccine Alfredo. It is made for diners who cannot pick just one.",
        "It costs $23.49 and has 1,550 calories with 72 g protein, based on the online pickup price we checked and the U.S. nutrition guide, which lists the plate as one row.",
        [
          "Because it includes the fried chicken parmigiana, the allergen guide marks it as fried in soy oil. Want just one of the three? See ",
          { text: "Lasagna Classico", href: "/menu/lasagna-classico" },
          " or ",
          { text: "Fettuccine Alfredo", href: "/menu/fettuccine-alfredo" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Chicken Parmigiana", detail: "One of the three dishes on the plate." },
      { name: "Lasagna Classico", detail: "One of the three dishes on the plate." },
      { name: "Fettuccine Alfredo", detail: "One of the three dishes on the plate." },
    ],
    allergenFacts: ["Three dishes on one plate: Chicken Parmigiana, Lasagna Classico and Fettuccine Alfredo."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A light first course before a big plate." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "A zero-calorie drink next to a 1,550-calorie plate." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "If you still have room, a classic finish to share." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade." },
    ],
    relatedOfferingIds: ["classic-entrees--lasagna-classico", "classic-entrees--fettuccine-alfredo", "classic-entrees--eggplant-parmigiana", "classic-entrees--steak-gorgonzola-alfredo"],
    faqs: [
      {
        question: "What comes on the Olive Garden Tour of Italy?",
        answer: "Chicken Parmigiana, Lasagna Classico and Fettuccine Alfredo, all on one plate.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "eggplant-parmigiana",
    primaryOfferingId: "classic-entrees--eggplant-parmigiana",
    sizeOfferingIds: ["lunch-menu--eggplant-parmigiana", "lighter-portions--eggplant-parmigiana"],
    primaryKeyword: "olive garden eggplant parmigiana",
    secondaryKeywords: ["eggplant parmigiana price", "eggplant parmigiana calories", "vegetarian entree olive garden"],
    metaTitle: "Olive Garden Eggplant Parmigiana: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Eggplant Parmigiana costs $18.79 with 1,070 calories as a dinner entrée, with a side of spaghetti. Compare lunch and lighter sizes and allergens.",
    servingSummary: "Dinner entrée with a side of spaghetti",
    servingBasis: "One dinner entrée with its side of spaghetti, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Eggplant Parmigiana",
      paragraphs: [
        "Eggplant Parmigiana is hand-breaded eggplant, lightly fried and topped with marinara and melted mozzarella, served with a side of spaghetti. Olive Garden marks it with its vegetarian (V) label.",
        "The dinner entrée costs $18.79 and has 1,070 calories, based on the online pickup price we checked and the U.S. nutrition guide. Lunch and lighter portions (660 calories) are compared below.",
        "The allergen guide marks it as fried in soy oil and as containing dairy, wheat, gluten and soy.",
      ],
    },
    ingredients: [
      { name: "Eggplant", detail: "Hand-breaded and lightly fried." },
      { name: "Marinara", detail: "Spooned on top." },
      { name: "Mozzarella", detail: "Melted on top." },
      { name: "Spaghetti", detail: "Served on the side." },
    ],
    allergenFacts: ["Hand-breaded fried eggplant with marinara and mozzarella, with spaghetti."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad as your first course." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "A cheesy starter to share." },
      { offeringId: "desserts--sicilian-cheesecake-with-strawberry-topping", kind: "Dessert", reason: "Ricotta cheesecake with strawberry sauce." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade." },
    ],
    relatedOfferingIds: ["classic-entrees--spaghetti-with-marinara", "classic-entrees--five-cheese-ziti-al-forno", "classic-entrees--tour-of-italy", "classic-entrees--fettuccine-alfredo"],
    faqs: [
      {
        question: "Is Olive Garden Eggplant Parmigiana vegetarian?",
        answer:
          "Olive Garden marks it with its vegetarian (V) label. It is fried in shared fryers, and Olive Garden notes that cross-contact with animal products is possible.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "stuffed-chicken-marsala",
    primaryOfferingId: "classic-entrees--stuffed-chicken-marsala",
    primaryKeyword: "olive garden stuffed chicken marsala",
    secondaryKeywords: ["stuffed chicken marsala price", "stuffed chicken marsala calories", "chicken marsala olive garden"],
    metaTitle: "Olive Garden Stuffed Chicken Marsala: Price & Calories",
    metaDescription:
      "Olive Garden Stuffed Chicken Marsala costs $21.79 with 1,170 calories: grilled chicken stuffed with cheeses and sun-dried tomatoes, with mashed potatoes. See nutrition.",
    servingSummary: "Dinner entrée with mashed potatoes",
    servingBasis: "One dinner entrée with mashed potatoes, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Stuffed Chicken Marsala",
      paragraphs: [
        "Stuffed Chicken Marsala is a grilled chicken breast stuffed with Italian cheeses and sun-dried tomatoes, topped with a creamy marsala mushroom sauce and served with mashed potatoes instead of pasta.",
        "It costs $21.79 and has 1,170 calories with 70 g protein, based on the online pickup price we checked and the U.S. nutrition guide.",
        "The allergen guide marks it as grilled (shared grill) and as containing dairy, wheat, gluten, soy and sulfites.",
      ],
    },
    ingredients: [
      { name: "Chicken breast", detail: "Grilled and stuffed." },
      { name: "Italian cheeses and sun-dried tomatoes", detail: "The stuffing." },
      { name: "Marsala mushroom sauce", detail: "Creamy, spooned on top." },
      { name: "Mashed potatoes", detail: "Served on the side." },
    ],
    allergenFacts: ["Grilled stuffed chicken with a creamy marsala mushroom sauce and mashed potatoes."],
    pairings: [
      { offeringId: SOUP, kind: "Soup & salad", reason: "A cup of soup as the first course." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Parmesan garlic broccoli adds a green vegetable." },
      { offeringId: "desserts--black-tie-mousse-cake", kind: "Dessert", reason: "A chocolate finish." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "A zero-calorie drink." },
    ],
    relatedOfferingIds: ["classic-entrees--grilled-chicken-margherita", "classic-entrees--steak-gorgonzola-alfredo", "classic-entrees--tour-of-italy", "classic-entrees--lasagna-classico"],
    faqs: [
      {
        question: "What comes with Olive Garden Stuffed Chicken Marsala?",
        answer: "It is served with mashed potatoes, and like other classic entrées it comes with soup or salad and breadsticks.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "grilled-chicken-margherita",
    primaryOfferingId: "classic-entrees--grilled-chicken-margherita",
    primaryKeyword: "olive garden grilled chicken margherita",
    secondaryKeywords: ["grilled chicken margherita price", "grilled chicken margherita calories", "low carb olive garden"],
    metaTitle: "Olive Garden Grilled Chicken Margherita: Price & Calories",
    metaDescription:
      "Olive Garden Grilled Chicken Margherita costs $21.29 with 650 calories and 65 g protein, served with parmesan garlic broccoli. See nutrition and allergens.",
    servingSummary: "Grilled chicken breasts with parmesan garlic broccoli",
    servingBasis: "One dinner entrée with broccoli, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Grilled Chicken Margherita",
      paragraphs: [
        "Grilled Chicken Margherita tops grilled chicken breasts with fresh tomatoes, mozzarella, basil pesto and a lemon garlic sauce, and serves them with parmesan garlic broccoli instead of pasta.",
        "It costs $21.29 and has 650 calories, 65 g protein and 15 g carbohydrates, based on the online pickup price we checked and the U.S. nutrition guide. Its sides are broccoli rather than pasta, which keeps the carbohydrates low.",
        "The allergen guide marks it as grilled (shared grill) and as containing dairy, wheat, gluten, soy and sulfites.",
      ],
    },
    ingredients: [
      { name: "Chicken breasts", detail: "Grilled." },
      { name: "Fresh tomatoes and mozzarella", detail: "On top." },
      { name: "Basil pesto and lemon garlic sauce", detail: "Named in the description." },
      { name: "Parmesan garlic broccoli", detail: "Served on the side." },
    ],
    allergenFacts: ["Grilled chicken with tomatoes, mozzarella, pesto and lemon garlic sauce, with broccoli."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "Keep the meal fresh with the house salad." },
      { offeringId: SOUP, kind: "Soup & salad", reason: "Or start with a cup of soup." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity finish." },
      { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea", kind: "Drink", reason: "A light fruit tea at 80 calories." },
    ],
    relatedOfferingIds: ["classic-entrees--stuffed-chicken-marsala", "classic-entrees--spaghetti-with-marinara", "classic-entrees--shrimp-carbonara", "classic-entrees--eggplant-parmigiana"],
    faqs: [
      {
        question: "Does Grilled Chicken Margherita come with pasta?",
        answer: "No. Olive Garden serves it with parmesan garlic broccoli on the side.",
      },
    ],
    related: ENTREE_RELATED,
  }),
];
