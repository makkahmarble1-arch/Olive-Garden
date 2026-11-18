import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Phase 4 (owner approval 2026-11-18): dishes with genuinely different,
 * officially listed versions. Each version has its own price and calories
 * (shared offering data) and its own official nutrition and allergen rows
 * (content/menu/nutrition/); the page shows them with the version selector
 * (components/product/VersionSection.tsx). One page per product, nothing merged.
 * Also here: Grilled Chicken Parmigiana (gluten-sensitive), built without its
 * hero photo because both owner photos are materially misleading for a
 * gluten-sensitive dish (research/products/PENDING.md).
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const ENTREE_RELATED: RelatedMenuRef[] = [
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "lunch-menu", text: "Weekday lunch portions at lower prices." },
  { categoryId: "lighter-portions", text: "Smaller dinner portions of popular pastas." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const LUNCH_RELATED: RelatedMenuRef[] = [
  { categoryId: "lunch-menu", text: "Every weekday lunch item with prices and calories." },
  { categoryId: "soups-salad-and-breadsticks", text: "The weekday soup, salad and breadsticks lunch." },
  { categoryId: "lighter-portions", text: "Smaller pasta portions after lunch hours." },
  { guide: "hours", text: "When the lunch menu is served." },
];
const SALAD = "soups-salad-and-breadsticks--famous-house-salad";
const LEMONADE = "non-alcoholic-beverages--classic-lemonade";
const UNSWEET_TEA = "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea";
const LUNCH_TIME =
  "Olive Garden lists it on the weekday lunch menu, served Monday to Friday until 3 PM at the restaurant we checked. Lunch hours can vary by location.";

export const versionPages: ProductPageContent[] = [
  itemPage({
    slug: "chicken-alfredo",
    primaryOfferingId: "classic-entrees--chicken-alfredo",
    sizeOfferingIds: ["family-style-meals--chicken-alfredo"],
    versions: [
      {
        key: "grilled-chicken",
        label: "Chicken Alfredo with grilled chicken",
        shortLabel: "Grilled chicken",
        description: "Fettuccine in alfredo sauce topped with slices of grilled chicken breast, the standard version.",
        price: 21.79,
        calories: 1480,
        nutritionRowId: "p8-chicken-alfredo-with-grilled-chicken",
        allergenRowId: "a6-chicken-alfredo-with-grilled-chicken",
      },
      {
        key: "crispy-chicken-fritta",
        label: "Chicken Alfredo with crispy chicken fritta",
        shortLabel: "Crispy chicken",
        description: "The same fettuccine alfredo topped with breaded, fried crispy chicken fritta instead of grilled chicken.",
        price: 21.79,
        calories: 1710,
        nutritionRowId: "p8-chicken-alfredo-with-crispy-chicken-fritta",
        allergenRowId: "a6-chicken-alfredo-with-crispy-chicken-fritta",
      },
    ],
    primaryKeyword: "olive garden chicken alfredo",
    secondaryKeywords: ["chicken alfredo price", "chicken alfredo calories", "crispy chicken alfredo", "chicken alfredo family size"],
    metaTitle: "Olive Garden Chicken Alfredo: Price, Calories & Versions",
    metaDescription:
      "Olive Garden Chicken Alfredo costs $21.79 with 1,480 calories with grilled chicken or 1,710 with crispy chicken fritta. Compare versions, nutrition and allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée with grilled chicken (default version), as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Chicken Alfredo",
      paragraphs: [
        "Chicken Alfredo is fettuccine in a from-scratch alfredo sauce of parmesan, cream, garlic and butter, topped with sliced chicken.",
        "Olive Garden lists two versions. With grilled chicken it has 1,480 calories and 79 g protein; with crispy chicken fritta it has 1,710 calories and 67 g protein. The online menu showed one price, $21.79, when we checked.",
        [
          "A family-size pan serves 4 to 6. Compare it with every other alfredo dish on the ",
          { text: "Amazing Alfredos page", href: "/amazing-alfredos" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Fettuccine", detail: "Flat ribbon pasta." },
      { name: "Alfredo sauce", detail: "Parmesan, cream, garlic and butter, according to the menu." },
      { name: "Chicken", detail: "Grilled chicken breast, or crispy chicken fritta (breaded and fried)." },
    ],
    allergenFacts: ["Fettuccine alfredo with grilled chicken or breaded, fried crispy chicken fritta."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Broccoli is a listed add-on for alfredo dishes." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert to finish." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A bright lemonade next to a rich sauce." },
    ],
    relatedOfferingIds: ["classic-entrees--fettuccine-alfredo", "classic-entrees--shrimp-alfredo", "classic-entrees--chicken-tortelloni-alfredo"],
    faqs: [
      {
        question: "What is the difference between grilled and crispy Chicken Alfredo?",
        answer:
          "The grilled version uses sliced grilled chicken breast (1,480 calories); the crispy version uses breaded, fried chicken fritta (1,710 calories). The allergen guide marks the crispy version as fried in soy oil and the grilled one as grilled.",
      },
      {
        question: "Can you get Chicken Alfredo for a family?",
        answer: "Yes. Olive Garden sells a family-size Chicken Alfredo pan that serves 4 to 6, with an optional broccoli version. Both are in the sizes table on this page.",
        link: { text: "See family-style meals", href: "/family-style-meals" },
      },
    ],
    related: [
      { categoryId: "amazing-alfredos", text: "Every Alfredo dish side by side." },
      { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
      { categoryId: "family-style-meals", text: "Family-size pans for 4 to 6 people." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),

  itemPage({
    slug: "calabrian-steak-and-shrimp-bucatini",
    primaryOfferingId: "classic-entrees--calabrian-steak-and-shrimp-bucatini",
    versions: [
      {
        key: "steak-and-shrimp",
        label: "Calabrian Steak & Shrimp Bucatini",
        shortLabel: "Steak & shrimp",
        description: "Grilled sirloin tips and shrimp with bucatini in a spicy Calabrian cream sauce with spinach and tomatoes; the steak is prepared medium.",
        price: 25.29,
        calories: 1220,
        nutritionRowId: "p8-calabrian-steak-and-shrimp-bucatini",
        allergenRowId: "a5-calabrian-steak-and-shrimp-bucatini",
      },
      {
        key: "steak",
        label: "Calabrian Steak Bucatini",
        shortLabel: "Steak only",
        description: "The same spicy Calabrian cream sauce, spinach and tomatoes with grilled sirloin tips and no shrimp.",
        price: 27.29,
        calories: 1130,
        nutritionRowId: "p8-calabrian-steak-bucatini",
        allergenRowId: "a5-calabrian-steak-bucatini",
      },
      {
        key: "shrimp",
        label: "Calabrian Shrimp Bucatini",
        shortLabel: "Shrimp only",
        description: "The same bucatini and spicy Calabrian cream sauce with shrimp and no steak.",
        price: 25.29,
        calories: 1040,
        nutritionRowId: "p8-calabrian-shrimp-bucatini",
        allergenRowId: "a5-calabrian-shrimp-bucatini",
      },
    ],
    primaryKeyword: "olive garden calabrian steak and shrimp bucatini",
    secondaryKeywords: ["calabrian bucatini price", "calabrian bucatini calories", "olive garden spicy pasta", "calabrian shrimp bucatini"],
    metaTitle: "Olive Garden Calabrian Steak & Shrimp Bucatini: Price & Calories",
    metaDescription:
      "Olive Garden Calabrian Bucatini costs $25.29 with steak and shrimp (1,220 calories) or shrimp only (1,040 calories); steak only is $27.29. Compare all three.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée with steak and shrimp (default version), as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Calabrian Steak & Shrimp Bucatini",
      paragraphs: [
        "Calabrian Steak & Shrimp Bucatini tosses thick, hollow bucatini pasta with grilled sirloin tips and shrimp in a spicy Calabrian cream sauce with spinach and tomatoes. Olive Garden prepares the steak medium.",
        "Olive Garden lists three versions: steak and shrimp (1,220 calories), steak only (1,130) and shrimp only (1,040). The steak-only version was priced higher than the other two when we checked; compare them in the selector below.",
        [
          "For more spicy pasta, see the limited-time Spicy Alfredo on the ",
          { text: "Amazing Alfredos page", href: "/amazing-alfredos" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Bucatini", detail: "Thick, hollow spaghetti-style pasta." },
      { name: "Sirloin tips", detail: "Grilled; prepared medium (steak versions)." },
      { name: "Shrimp", detail: "Shrimp versions." },
      { name: "Spicy Calabrian cream sauce", detail: "With spinach and tomatoes." },
    ],
    allergenFacts: ["Bucatini with grilled sirloin tips and/or shrimp in a spicy Calabrian cream sauce with spinach and tomatoes."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad cools things down before a spicy pasta." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A seafood starter to share." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A cold lemonade with a spicy sauce." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A cool, creamy dessert after some heat." },
    ],
    relatedOfferingIds: ["classic-entrees--steak-gorgonzola-alfredo", "classic-entrees--shrimp-scampi", "classic-entrees--6-oz-sirloin"],
    faqs: [
      {
        question: "Is the Calabrian Bucatini spicy?",
        answer: "Yes. Olive Garden describes the sauce as a spicy Calabrian cream sauce, served with spinach and tomatoes.",
      },
      {
        question: "Can I order the Calabrian Bucatini without shrimp?",
        answer:
          "Yes. Olive Garden lists a steak-only version (1,130 calories) and a shrimp-only version (1,040 calories) besides the steak and shrimp version. The steak-only version does not contain shellfish according to the allergen guide.",
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "spaghetti-and-meatballs",
    acceptedGaps: {
      decidedAt: "2026-11-18",
      checklistKeys: ["nutritionAndAllergens"],
      reason: "Owner decision 2026-11-18: publish with the verified information; the dinner marinara version has no official row, which the page discloses.",
    },
    primaryOfferingId: "classic-entrees--spaghetti-and-meatballs",
    sizeOfferingIds: ["lunch-menu--spaghetti-and-meatballs", "lighter-portions--spaghetti-and-meatballs"],
    versions: [
      {
        key: "meat-sauce",
        label: "Spaghetti with Meat Sauce & Meatballs",
        shortLabel: "Meat sauce",
        description: "Spaghetti and three meatballs in homemade meat sauce made with beef and Italian sausage.",
        price: 18.48,
        calories: 1120,
        nutritionRowId: "p10-spaghetti-with-meat-sauce-and-meatballs-3",
        allergenRowId: "a7-spaghetti-with-meat-sauce-and-meatballs",
      },
      {
        key: "marinara",
        label: "Spaghetti with Marinara & Meatballs",
        shortLabel: "Marinara",
        description: "Spaghetti and meatballs in homemade marinara. Olive Garden’s nutrition guide has no separate dinner row for this version, so only its menu calories are shown.",
        price: 18.48,
        calories: 970,
        nutritionRowId: null,
        allergenRowId: "a7-spaghetti-with-marinara-sauce-and-meatballs",
      },
    ],
    primaryKeyword: "olive garden spaghetti and meatballs",
    secondaryKeywords: ["spaghetti and meatballs price", "spaghetti and meatballs calories", "lunch spaghetti and meatballs"],
    metaTitle: "Olive Garden Spaghetti & Meatballs: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Spaghetti & Meatballs costs $18.48 with 970 calories with marinara or 1,120 with meat sauce. Compare sauces, lunch and lighter sizes.",
    servingSummary: "Dinner entrée with three meatballs, plus soup or salad and breadsticks",
    servingBasis: "One dinner entrée with meat sauce and three meatballs (default version), as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Spaghetti & Meatballs",
      paragraphs: [
        "Spaghetti & Meatballs is Olive Garden’s red-sauce classic: spaghetti with meatballs and your choice of homemade meat sauce or marinara. The dinner entrée comes with three meatballs.",
        "Both sauces were $18.48 when we checked. With meat sauce it has 1,120 calories and 49 g protein according to the nutrition guide; with marinara the online menu lists 970 calories.",
        [
          "Smaller lunch and ",
          { text: "lighter portions", href: "/lighter-portions" },
          " come with two meatballs; all sizes are compared below.",
        ],
      ],
    },
    ingredients: [
      { name: "Spaghetti", detail: "Long pasta." },
      { name: "Meatballs", detail: "Three on the dinner entrée." },
      { name: "Meat sauce or marinara", detail: "The meat sauce is made with beef and Italian sausage." },
    ],
    allergenFacts: ["Spaghetti and meatballs in meat sauce or marinara."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Extra breadsticks for the sauce." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a tomato dish." },
      { offeringId: "desserts--chocolate-lasagna", kind: "Dessert", reason: "A classic Italian-American dinner, a rich dessert." },
    ],
    relatedOfferingIds: ["classic-entrees--spaghetti-with-meat-sauce", "classic-entrees--spaghetti-with-marinara", "classic-entrees--lasagna-classico"],
    faqs: [
      {
        question: "How many meatballs come with Olive Garden Spaghetti & Meatballs?",
        answer: "Three on the dinner entrée, according to Olive Garden’s nutrition guide. The lunch and lighter-portion versions come with two meatballs.",
      },
      {
        question: "Is Spaghetti & Meatballs on the lunch menu?",
        answer: "Yes. The weekday lunch menu lists a smaller Spaghetti & Meatballs with two meatballs, with marinara or meat sauce.",
        link: { text: "See the lunch menu", href: "/lunch-menu" },
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "cheese-ravioli",
    primaryOfferingId: "classic-entrees--cheese-ravioli",
    sizeOfferingIds: ["lunch-menu--cheese-ravioli", "lighter-portions--cheese-ravioli"],
    versions: [
      {
        key: "marinara",
        label: "Cheese Ravioli with Marinara Sauce",
        shortLabel: "Marinara",
        description: "Cheese-filled ravioli with homemade marinara and melted mozzarella; Olive Garden marks the marinara version vegetarian (V).",
        price: 17.99,
        calories: 750,
        nutritionRowId: "p8-cheese-ravioli-with-marinara-sauce",
        allergenRowId: "a5-cheese-ravioli-with-marinara-sauce",
      },
      {
        key: "meat-sauce",
        label: "Cheese Ravioli with Meat Sauce",
        shortLabel: "Meat sauce",
        description: "The same cheese ravioli and mozzarella with homemade meat sauce of beef and Italian sausage.",
        price: 17.99,
        calories: 860,
        nutritionRowId: "p8-cheese-ravioli-with-meat-sauce",
        allergenRowId: "a5-cheese-ravioli-with-meat-sauce",
      },
    ],
    primaryKeyword: "olive garden cheese ravioli",
    secondaryKeywords: ["cheese ravioli price", "cheese ravioli calories", "lunch cheese ravioli", "cheese ravioli meat sauce"],
    metaTitle: "Olive Garden Cheese Ravioli: Price, Calories & Sauces",
    metaDescription:
      "Olive Garden Cheese Ravioli costs $17.99 with 750 calories with marinara or 860 with meat sauce. Compare sauces, lunch and lighter sizes, nutrition and allergens.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée with marinara (default version), as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    dietary: [{ label: "Vegetarian label", value: "Marinara version marked (V) on Olive Garden’s online menu", tone: "info" }],
    about: {
      heading: "About Olive Garden Cheese Ravioli",
      paragraphs: [
        "Cheese Ravioli is filled with a blend of Italian cheeses and topped with melted mozzarella and your choice of homemade marinara or meat sauce.",
        "Both sauces were $17.99 when we checked. With marinara it has 750 calories; with meat sauce 860 calories and 50 g protein, according to Olive Garden’s U.S. nutrition guide.",
        [
          "Smaller portions are on the weekday lunch menu and the ",
          { text: "lighter portions menu", href: "/lighter-portions" },
          " (440 to 500 calories); the kids menu has its own Kids Cheese Ravioli.",
        ],
      ],
    },
    ingredients: [
      { name: "Cheese ravioli", detail: "Filled with a blend of Italian cheeses." },
      { name: "Marinara or meat sauce", detail: "Your choice." },
      { name: "Mozzarella", detail: "Melted on top." },
    ],
    allergenFacts: ["Cheese-filled ravioli with marinara or meat sauce and melted mozzarella."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "sides-sauces-and-extras--side-of-meatballs", kind: "Side", reason: "Add meatballs for more protein." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a tomato sauce dish." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity dessert." },
    ],
    relatedOfferingIds: ["classic-entrees--ravioli-carbonara", "classic-entrees--five-cheese-ziti-al-forno", "classic-entrees--lasagna-classico"],
    faqs: [
      {
        question: "Is Olive Garden Cheese Ravioli vegetarian?",
        answer:
          "Olive Garden marks the marinara version with its vegetarian (V) label; the meat sauce version contains beef and sausage. Shared kitchens mean cross-contact is possible.",
      },
      {
        question: "Is there a smaller Cheese Ravioli?",
        answer: "Yes. The weekday lunch menu and the lighter portions menu list a smaller Cheese Ravioli with 440 calories with marinara or 500 with meat sauce.",
        link: { text: "See lighter portions", href: "/lighter-portions" },
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "lunch-spaghetti",
    primaryOfferingId: "lunch-menu--spaghetti",
    versions: [
      {
        key: "marinara",
        label: "Lunch Spaghetti with Marinara",
        shortLabel: "Marinara",
        description: "Lunch-size spaghetti with homemade marinara.",
        price: 11.49,
        calories: 370,
        nutritionRowId: "p7-spaghetti-with-marinara",
        allergenRowId: "a7-spaghetti-with-marinara-sauce",
      },
      {
        key: "meat-sauce",
        label: "Lunch Spaghetti with Meat Sauce",
        shortLabel: "Meat sauce",
        description: "Lunch-size spaghetti with homemade meat sauce of beef and Italian sausage.",
        price: 11.49,
        calories: 480,
        nutritionRowId: "p7-spaghetti-with-meat-sauce",
        allergenRowId: "a7-spaghetti-with-meat-sauce",
      },
    ],
    primaryKeyword: "olive garden lunch spaghetti",
    secondaryKeywords: ["olive garden spaghetti lunch price", "lunch spaghetti calories", "olive garden cheapest lunch"],
    h1: "Olive Garden Lunch Spaghetti",
    metaTitle: "Olive Garden Lunch Spaghetti: Price, Calories & Sauces",
    metaDescription:
      "Olive Garden Lunch Spaghetti costs $11.49 with 370 calories with marinara or 480 with meat sauce, a weekday lunch plate. Compare sauces and allergens.",
    servingSummary: "Lunch-size entrée (weekday lunch)",
    servingBasis: "One lunch-size entrée with marinara (default version), as served",
    priceSubject: "One lunch entrée",
    about: {
      heading: "About Olive Garden Lunch Spaghetti",
      paragraphs: [
        "Lunch Spaghetti is a lunch-size plate of spaghetti with your choice of homemade marinara or meat sauce, offered on Olive Garden’s weekday lunch menu.",
        "Both sauces were $11.49 when we checked. With marinara it has 370 calories, the fewest of the lunch plates, and with meat sauce 480 calories, according to Olive Garden’s U.S. nutrition guide.",
        [
          "For a full dinner portion, see Spaghetti with Marinara and Spaghetti with Meat Sauce on the ",
          { text: "classic entrées page", href: "/classic-entrees" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Spaghetti", detail: "Lunch-size portion." },
      { name: "Marinara or meat sauce", detail: "Your choice; the meat sauce has beef and Italian sausage." },
    ],
    allergenFacts: ["Lunch-size spaghetti with marinara or meat sauce."],
    pairings: [
      { offeringId: "sides-sauces-and-extras--side-of-meatballs", kind: "Side", reason: "Add meatballs for more protein." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Add grilled chicken to a light lunch." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert, if you want something sweet." },
    ],
    relatedOfferingIds: ["lunch-menu--cheese-ravioli", "lunch-menu--fettuccine-alfredo", "lunch-menu--five-cheese-flatbread"],
    compareHeading: "How Lunch Spaghetti compares with other lunch items",
    faqs: [
      { question: "When can you order Olive Garden Lunch Spaghetti?", answer: LUNCH_TIME, link: { text: "See Olive Garden hours", href: "/hours" } },
      {
        question: "What is the lowest-calorie lunch at Olive Garden?",
        answer:
          "Among the lunch plates, Lunch Spaghetti with Marinara has the fewest calories at 370, according to Olive Garden’s nutrition guide. Soup, salad and breadsticks are counted separately.",
        link: { text: "See the lunch menu", href: "/lunch-menu" },
      },
    ],
    related: LUNCH_RELATED,
  }),

  itemPage({
    slug: "chicken-parmigiana-sandwich",
    primaryOfferingId: "lunch-menu--chicken-parmigiana-sandwich",
    versions: [
      {
        key: "crispy-chicken-fritta",
        label: "Chicken Parmigiana Sandwich (crispy chicken fritta)",
        shortLabel: "Crispy chicken",
        description: "Crispy chicken fritta with mozzarella and marinara on a toasted garlic knot bun, with french fries.",
        price: 11.99,
        calories: 960,
        nutritionRowId: "p7-chicken-parmigiana-sandwich-with-fries",
        allergenRowId: "a8-chicken-parmigiana-sandwich-with-fries",
      },
      {
        key: "grilled-chicken",
        label: "Grilled Chicken Parmigiana Sandwich",
        shortLabel: "Grilled chicken",
        description: "Grilled chicken with mozzarella and marinara on a toasted garlic knot bun, with french fries.",
        price: 11.99,
        calories: 840,
        nutritionRowId: "p7-grilled-chicken-parmigiana-sandwich-with-fries",
        allergenRowId: "a8-grilled-chicken-parmigiana-sandwich-with-fries",
      },
    ],
    primaryKeyword: "olive garden chicken parmigiana sandwich",
    secondaryKeywords: ["chicken parm sandwich price", "chicken parmigiana sandwich calories", "grilled chicken parmigiana sandwich"],
    metaTitle: "Olive Garden Chicken Parmigiana Sandwich: Price & Calories",
    metaDescription:
      "The Olive Garden Chicken Parmigiana Sandwich costs $11.99 with fries: 960 calories with crispy chicken or 840 calories grilled. Compare both versions.",
    servingSummary: "One sandwich with french fries (weekday lunch)",
    servingBasis: "One sandwich with crispy chicken fritta and french fries (default version), as served",
    unitLabel: "sandwich",
    priceSubject: "One sandwich",
    about: {
      heading: "About the Chicken Parmigiana Sandwich",
      paragraphs: [
        "The Chicken Parmigiana Sandwich puts Olive Garden’s chicken parmigiana on a toasted garlic knot bun with mozzarella and marinara, served with french fries on the weekday lunch menu.",
        "You can choose crispy chicken fritta (960 calories) or grilled chicken (840 calories, 45 g protein); both were $11.99 when we checked. The calories include the fries.",
        ["See the other weekday sandwiches and flatbreads on the ", { text: "lunch menu", href: "/lunch-menu" }, "."],
      ],
    },
    ingredients: [
      { name: "Chicken", detail: "Crispy chicken fritta or grilled chicken." },
      { name: "Mozzarella and marinara", detail: "On the chicken." },
      { name: "Garlic knot bun", detail: "Toasted." },
      { name: "French fries", detail: "On the side; marked as fried in soy oil." },
    ],
    allergenFacts: ["Crispy or grilled chicken with mozzarella and marinara on a garlic knot bun, with fries."],
    pairings: [
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a sandwich." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Add a vegetable side." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert, if you want something sweet." },
    ],
    relatedOfferingIds: ["lunch-menu--eggplant-parmigiana-sandwich", "lunch-menu--italian-grilled-chicken-sandwich", "lunch-menu--chicken-parmigiana"],
    compareHeading: "How the Chicken Parmigiana Sandwich compares with other lunch items",
    faqs: [
      { question: "When can you order the Chicken Parmigiana Sandwich?", answer: LUNCH_TIME, link: { text: "See Olive Garden hours", href: "/hours" } },
      {
        question: "Is the grilled Chicken Parmigiana Sandwich lighter?",
        answer: "Yes. With fries the grilled version has 840 calories and the crispy chicken fritta version 960, according to Olive Garden’s nutrition guide.",
      },
    ],
    related: LUNCH_RELATED,
  }),

  itemPage({
    slug: "grilled-chicken-parmigiana",
    acceptedGaps: {
      decidedAt: "2026-11-18",
      checklistKeys: ["accurateImage"],
      reason: "Owner decision 2026-11-18: publish with a neutral image placeholder until an accurate photo (grilled, unbreaded chicken with gluten-free rotini) exists.",
    },
    primaryOfferingId: "gluten-sensitive--grilled-chicken-parmigiana",
    heroImageOmitted:
      "Both owner photos are materially misleading for a gluten-sensitive dish: one shows regular spaghetti, the rotini photo shows breaded chicken (the dish is grilled, no wheat in the allergen row). Checked 2026-11-18.",
    primaryKeyword: "olive garden gluten free chicken parmigiana",
    secondaryKeywords: ["grilled chicken parmigiana olive garden", "gluten sensitive chicken parm", "grilled chicken parmigiana calories"],
    metaTitle: "Olive Garden Grilled Chicken Parmigiana (Gluten-Sensitive): Price & Calories",
    metaDescription:
      "Olive Garden Grilled Chicken Parmigiana costs $21.29 with 810 calories and 75 g protein: grilled chicken with gluten-free rotini in marinara, gluten-sensitive menu.",
    servingSummary: "Entrée from the gluten-sensitive menu: grilled chicken with gluten-free rotini",
    servingBasis: "One entrée with gluten-free rotini and marinara, as served",
    priceSubject: "One entrée",
    about: {
      heading: "About the Grilled Chicken Parmigiana",
      paragraphs: [
        "Grilled Chicken Parmigiana is the gluten-sensitive take on the classic: grilled chicken breasts topped with marinara and Italian cheeses, served with gluten-free rotini in marinara instead of spaghetti.",
        "It costs $21.29 and has 810 calories with 75 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The allergen guide lists dairy, eggs and soy, and marks it as grilled.",
        [
          "Olive Garden says gluten-sensitive items are made without gluten-containing ingredients but are not lab-tested gluten-free. See the full ",
          { text: "gluten-sensitive menu", href: "/gluten-sensitive" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Chicken breasts", detail: "Grilled, not breaded." },
      { name: "Marinara and Italian cheeses", detail: "On top." },
      { name: "Gluten-free rotini", detail: "With marinara; Olive Garden says it meets the FDA gluten-free definition." },
    ],
    allergenFacts: ["Grilled chicken with marinara, Italian cheeses and gluten-free rotini."],
    pairings: [
      { offeringId: "gluten-sensitive--famous-house-salad-without-croutons", kind: "Soup & salad", reason: "The gluten-sensitive house salad, without croutons." },
      { offeringId: "gluten-sensitive--zuppa-toscana", kind: "Soup & salad", reason: "A gluten-sensitive soup to start." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a tomato sauce dish." },
    ],
    relatedOfferingIds: ["gluten-sensitive--rotini-pasta-with-marinara", "gluten-sensitive--herb-grilled-salmon", "gluten-sensitive--6-oz-sirloin"],
    compareHeading: "How it compares with other gluten-sensitive entrées",
    faqs: [
      {
        question: "Is Olive Garden Grilled Chicken Parmigiana gluten-free?",
        answer:
          "It is on Olive Garden’s gluten-sensitive menu. Olive Garden says these items are made without gluten-containing ingredients, but they are not lab-tested gluten-free, the kitchen is not gluten-free and the grill is shared. Tell your server that you are avoiding gluten.",
        link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" },
      },
      {
        question: "How is it different from the regular Chicken Parmigiana?",
        answer:
          "The regular Chicken Parmigiana uses two parmesan-breaded, fried chicken breasts with spaghetti (1,020 calories). This version uses grilled chicken with gluten-free rotini (810 calories), according to Olive Garden’s nutrition guide.",
        link: { text: "See the classic entrées", href: "/classic-entrees" },
      },
    ],
    related: [
      { categoryId: "gluten-sensitive", text: "Every gluten-sensitive item with prices and calories." },
      { categoryId: "classic-entrees", text: "The regular Chicken Parmigiana and other entrées." },
      { categoryId: "create-your-own-pasta", text: "Build a pasta with gluten-free rotini." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),
];
