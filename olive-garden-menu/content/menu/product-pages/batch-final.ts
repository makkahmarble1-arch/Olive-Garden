import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Final batch of the item-page phase (2026-11-18): every remaining product
 * with an official nutrition row, after the owner asked to complete all
 * eligible pages.
 * - Two classic entrées with an extra version that the guide does not list
 *   separately (version selector; that version shows calories only).
 * - The four remaining sides and large sauces (previously skipped for lack of
 *   observed search demand).
 * - Nine single drinks with an official nutrition row. The U.S. allergen
 *   guide does not cover to-go drinks, so their pages say so
 *   (allergensNotListed) and the checklist stays "partial".
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const SIDE_RELATED: RelatedMenuRef[] = [
  { categoryId: "sides-sauces-and-extras", text: "Every side, sauce and extra with prices and calories." },
  { categoryId: "create-your-own-pasta", text: "Build a pasta with your favorite sauce." },
  { categoryId: "classic-entrees", text: "Classic entrées to pair with a side." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const DRINK_RELATED: RelatedMenuRef[] = [
  { categoryId: "non-alcoholic-beverages", text: "Every non-alcoholic drink with prices and calories." },
  { categoryId: "drink-menu", text: "The full Olive Garden drink menu." },
  { categoryId: "desserts", text: "Desserts to enjoy with your drink." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const FAMILY_RELATED: RelatedMenuRef[] = [
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "family-style-meals", text: "Family-size pans for 4 to 6 people." },
  { categoryId: "catering", text: "Pans and packages for groups." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const SALAD = "soups-salad-and-breadsticks--famous-house-salad";
const LEMONADES = [
  "non-alcoholic-beverages--classic-lemonade",
  "non-alcoholic-beverages--raspberry-lemonade",
  "non-alcoholic-beverages--strawberry-passion-fruit-limonata",
  "non-alcoholic-beverages--desert-pear-limonata",
];
const TEAS = [
  "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea",
  "non-alcoholic-beverages--mango-passion-fruit-iced-tea",
  "non-alcoholic-beverages--half-iced-tea-and-half-lemonade",
  "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea",
];
const without = (list: string[], self: string) => list.filter((x) => x !== self);
const drinkAllergyFaq = (name: string) => ({
  question: `Is ${name} on Olive Garden’s allergen guide?`,
  answer:
    "No. Olive Garden’s U.S. allergen guide covers its food menu but not these to-go drinks, so no official allergen marks are published for it. This does not mean it is allergen-free; ask your server if you have an allergy.",
});

type DrinkInput = {
  slug: Parameters<typeof itemPage>[0]["slug"];
  offeringId: string;
  name: string;
  keyword: string;
  secondary: string[];
  metaTitle: string;
  metaDescription: string;
  about: [string, string];
  ingredients: { name: string; detail: string }[];
  related: string[];
  faq: { question: string; answer: string };
  pairings: ProductPageContent["pairings"];
  compareHeading: string;
};
const drinkPage = (d: DrinkInput) =>
  itemPage({
    slug: d.slug,
    primaryOfferingId: d.offeringId,
    allergensNotListed: true,
    acceptedGaps: {
      decidedAt: "2026-11-18",
      checklistKeys: ["nutritionAndAllergens"],
      reason: "Owner decision 2026-11-18: publish with a clear notice that the official allergen guide does not cover this drink (never implying it is allergen-free).",
    },
    primaryKeyword: d.keyword,
    secondaryKeywords: d.secondary,
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    servingSummary: "One drink, to go",
    servingBasis: "One drink, as served",
    unitLabel: "drink",
    priceNote: "One drink, online pickup",
    priceSubject: "One drink",
    about: {
      heading: `About the Olive Garden ${d.name}`,
      paragraphs: [d.about[0], d.about[1], ["Compare it with every other drink on the ", { text: "non-alcoholic beverages page", href: "/non-alcoholic-beverages" }, "."]],
    },
    ingredients: d.ingredients,
    allergenFacts: ["Olive Garden’s U.S. allergen guide does not list to-go drinks."],
    pairings: d.pairings,
    relatedOfferingIds: d.related,
    compareHeading: d.compareHeading,
    faqs: [d.faq, drinkAllergyFaq(d.name)],
    related: DRINK_RELATED,
  });

export const finalPages: ProductPageContent[] = [
  // ---------------- Entrées with a version the guide does not list separately
  itemPage({
    slug: "chicken-tortelloni-alfredo",
    acceptedGaps: {
      decidedAt: "2026-11-18",
      checklistKeys: ["nutritionAndAllergens"],
      reason: "Owner decision 2026-11-18: publish with the verified information; the Shrimp Tortelloni Alfredo version has no official row, which the page discloses.",
    },
    primaryOfferingId: "classic-entrees--chicken-tortelloni-alfredo",
    sizeOfferingIds: ["family-style-meals--chicken-tortelloni-alfredo"],
    versions: [
      {
        key: "chicken",
        label: "Chicken Tortelloni Alfredo",
        shortLabel: "Grilled chicken",
        description: "Asiago-filled tortelloni baked in alfredo with Italian cheeses and toasted breadcrumbs, topped with sliced grilled chicken.",
        price: 23.99,
        calories: 1980,
        nutritionRowId: "p9-chicken-tortelloni-alfredo",
        allergenRowId: "a6-chicken-tortelloni-alfredo",
      },
      {
        key: "shrimp",
        label: "Shrimp Tortelloni Alfredo",
        shortLabel: "Shrimp",
        description: "The same baked tortelloni alfredo topped with shrimp instead of chicken. The official guides do not list this version separately.",
        price: 25.79,
        calories: 1870,
        nutritionRowId: null,
        allergenRowId: null,
      },
    ],
    primaryKeyword: "olive garden chicken tortelloni alfredo",
    secondaryKeywords: ["chicken tortelloni alfredo price", "chicken tortelloni alfredo calories", "shrimp tortelloni alfredo"],
    metaTitle: "Olive Garden Chicken Tortelloni Alfredo: Price, Calories & Versions",
    metaDescription:
      "Olive Garden Chicken Tortelloni Alfredo costs $23.99 with 1,980 calories; the shrimp version is $25.79 with 1,870. See nutrition, allergens and the family pan.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée with grilled chicken (default version), as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Chicken Tortelloni Alfredo",
      paragraphs: [
        "Chicken Tortelloni Alfredo bakes asiago-filled tortelloni in alfredo with Italian cheeses and toasted breadcrumbs, then tops it with sliced grilled chicken. The online menu also lists a shrimp version.",
        "The chicken version costs $23.99 and has 1,980 calories with 131 g fat and 112 g protein, according to Olive Garden’s U.S. nutrition guide, the most calories of the single-serving classic entrées. The shrimp version is $25.79 with 1,870 calories.",
        ["A family-size pan serves 4 to 6. Compare every alfredo dish on the ", { text: "Amazing Alfredos page", href: "/amazing-alfredos" }, "."],
      ],
    },
    ingredients: [
      { name: "Asiago-filled tortelloni", detail: "Baked in alfredo." },
      { name: "Alfredo and Italian cheeses", detail: "With toasted breadcrumbs." },
      { name: "Grilled chicken or shrimp", detail: "On top." },
    ],
    allergenFacts: ["Asiago-filled tortelloni baked in alfredo with cheese and breadcrumbs, topped with grilled chicken or shrimp."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "A vegetable next to a rich, baked pasta." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert to finish." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["classic-entrees--chicken-alfredo", "classic-entrees--seafood-alfredo", "classic-entrees--ravioli-carbonara"],
    faqs: [
      {
        question: "Is Chicken Tortelloni Alfredo the highest-calorie entrée at Olive Garden?",
        answer:
          "Among the single-serving classic entrées, yes: the chicken version has 1,980 calories according to Olive Garden’s nutrition guide. Soup or salad and breadsticks add more.",
        link: { text: "Compare classic entrées", href: "/classic-entrees" },
      },
      {
        question: "Can you get Tortelloni Alfredo with shrimp?",
        answer: "Yes. Olive Garden’s online menu lists a Shrimp Tortelloni Alfredo at $25.79 with 1,870 calories. The nutrition and allergen guides do not list it separately.",
      },
    ],
    related: FAMILY_RELATED,
  }),

  itemPage({
    slug: "chicken-and-shrimp-carbonara",
    acceptedGaps: {
      decidedAt: "2026-11-18",
      checklistKeys: ["nutritionAndAllergens"],
      reason: "Owner decision 2026-11-18: publish with the verified information; the Chicken Carbonara version has no official row, which the page discloses.",
    },
    primaryOfferingId: "classic-entrees--chicken-and-shrimp-carbonara",
    sizeOfferingIds: ["family-style-meals--chicken-and-shrimp-carbonara"],
    versions: [
      {
        key: "chicken-and-shrimp",
        label: "Chicken & Shrimp Carbonara",
        shortLabel: "Chicken & shrimp",
        description: "Seasoned chicken and shrimp tossed with spaghetti in a creamy sauce with bacon and roasted red peppers.",
        price: 23.99,
        calories: 1370,
        nutritionRowId: "p8-chicken-and-shrimp-carbonara",
        allergenRowId: "a5-chicken-and-shrimp-carbonara",
      },
      {
        key: "chicken",
        label: "Chicken Carbonara",
        shortLabel: "Chicken only",
        description: "The same creamy carbonara with chicken and no shrimp. The official guides do not list this version separately.",
        price: 23.99,
        calories: 1510,
        nutritionRowId: null,
        allergenRowId: null,
      },
    ],
    primaryKeyword: "olive garden chicken and shrimp carbonara",
    secondaryKeywords: ["chicken and shrimp carbonara price", "chicken carbonara olive garden", "carbonara calories"],
    metaTitle: "Olive Garden Chicken & Shrimp Carbonara: Price, Calories & Versions",
    metaDescription:
      "Olive Garden Chicken & Shrimp Carbonara costs $23.99 with 1,370 calories; Chicken Carbonara is listed at 1,510. See nutrition, allergens and the family pan.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée with chicken and shrimp (default version), as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Chicken & Shrimp Carbonara",
      paragraphs: [
        "Chicken & Shrimp Carbonara tosses seasoned chicken and shrimp with spaghetti in a creamy sauce with bacon and roasted red peppers.",
        "It costs $23.99 and has 1,370 calories with 64 g protein, according to Olive Garden’s U.S. nutrition guide. The online menu also lists a Chicken Carbonara (chicken only) at the same price with 1,510 calories.",
        ["Olive Garden also serves a Shrimp Carbonara and a Ravioli Carbonara; see them on the ", { text: "classic entrées page", href: "/classic-entrees" }, "."],
      ],
    },
    ingredients: [
      { name: "Spaghetti", detail: "Long pasta." },
      { name: "Chicken and shrimp", detail: "Seasoned." },
      { name: "Creamy sauce with bacon", detail: "The carbonara sauce." },
      { name: "Roasted red peppers", detail: "Tossed in." },
    ],
    allergenFacts: ["Chicken and shrimp with spaghetti in a creamy sauce with bacon and roasted red peppers."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A seafood starter to share." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A bright lemonade next to a creamy sauce." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity dessert." },
    ],
    relatedOfferingIds: ["classic-entrees--shrimp-carbonara", "classic-entrees--ravioli-carbonara", "classic-entrees--shrimp-alfredo"],
    faqs: [
      {
        question: "What is the difference between the carbonara dishes at Olive Garden?",
        answer:
          "Chicken & Shrimp Carbonara uses spaghetti with chicken and shrimp; Shrimp Carbonara has shrimp only; Ravioli Carbonara bakes cheese ravioli in the creamy bacon sauce. Each has its own page and nutrition values.",
        link: { text: "See classic entrées", href: "/classic-entrees" },
      },
      {
        question: "Does Chicken & Shrimp Carbonara contain shellfish?",
        answer: "Yes. Olive Garden’s U.S. allergen guide lists crustacean shellfish for it. The chicken-only version is not listed in the guide.",
      },
    ],
    related: FAMILY_RELATED,
  }),

  // ---------------- Sides and large sauces
  itemPage({
    slug: "side-of-mashed-potatoes",
    primaryOfferingId: "sides-sauces-and-extras--side-of-mashed-potatoes",
    primaryKeyword: "olive garden mashed potatoes",
    secondaryKeywords: ["side of mashed potatoes price", "olive garden mashed potatoes calories"],
    h1: "Olive Garden Side of Mashed Potatoes",
    metaTitle: "Olive Garden Mashed Potatoes: Price, Calories & Allergens",
    metaDescription:
      "An Olive Garden Side of Mashed Potatoes costs $3.79 with 200 calories, the same creamy side served with Stuffed Chicken Marsala. See nutrition and allergens.",
    servingSummary: "One side order",
    servingBasis: "One side order, as served",
    unitLabel: "side",
    priceSubject: "One side",
    about: {
      heading: "About the Side of Mashed Potatoes",
      paragraphs: [
        "The Side of Mashed Potatoes is a side order of creamy mashed potatoes, the same side Olive Garden serves with its Stuffed Chicken Marsala. Olive Garden marks it with its vegetarian (V) label.",
        "It costs $3.79 and has 200 calories with 8 g fat and 580 mg sodium, according to Olive Garden’s U.S. nutrition guide. The allergen guide marks only dairy for it.",
        ["See the other sides on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [{ name: "Mashed potatoes", detail: "Creamy." }],
    allergenFacts: ["Creamy mashed potatoes."],
    pairings: [
      { offeringId: "classic-entrees--stuffed-chicken-marsala", kind: "Entrée", reason: "The entrée Olive Garden serves with mashed potatoes." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Grilled chicken and potatoes make a simple plate." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "A vegetable next to the potatoes." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["sides-sauces-and-extras--side-of-broccoli", "sides-sauces-and-extras--side-of-grilled-chicken", "sides-sauces-and-extras--side-of-meatballs"],
    compareHeading: "How mashed potatoes compare with other sides",
    faqs: [
      { question: "Does Olive Garden have mashed potatoes?", answer: "Yes. Olive Garden sells a side of mashed potatoes and serves them with its Stuffed Chicken Marsala." },
      {
        question: "Are Olive Garden mashed potatoes vegetarian?",
        answer: "Olive Garden marks the side with its vegetarian (V) label. Shared kitchens mean cross-contact with animal products is possible.",
      },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-marinara-sauce",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--marinara-dipping-sauce"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-marinara-sauce--large",
    primaryKeyword: "olive garden marinara sauce",
    secondaryKeywords: ["olive garden marinara to go", "side of marinara sauce price", "olive garden marinara calories"],
    h1: "Olive Garden Side of Marinara Sauce",
    metaTitle: "Olive Garden Marinara Sauce To Go: Price, Calories & Size",
    metaDescription:
      "A large Olive Garden Side of Marinara Sauce costs $9.79 with 290 calories per container, freshly made for pasta or breadstick dipping. See nutrition and allergens.",
    servingSummary: "One large container (breadsticks not included)",
    servingBasis: "One large container (one pint), as sold",
    unitLabel: "large container",
    priceSubject: "One large container",
    about: {
      heading: "About the Side of Marinara Sauce",
      paragraphs: [
        "The Side of Marinara Sauce is a large container of Olive Garden’s freshly made marinara, sold for extra pasta sauce or for dipping breadsticks; breadsticks are not included. Olive Garden marks it with its vegetarian (V) label.",
        "The large container costs $9.79 and has 290 calories, according to Olive Garden’s U.S. nutrition guide, which lists it as one pint. It is the lowest-calorie of the four large sauces.",
        ["Alfredo, meat sauce and five cheese marinara are sold the same way on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [{ name: "Marinara sauce", detail: "Freshly made; one pint per large container." }],
    allergenFacts: ["Freshly made marinara sauce in a large container."],
    pairings: [
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for dipping are sold separately." },
      { offeringId: "classic-entrees--spaghetti-with-marinara", kind: "Entrée", reason: "Extra sauce for a simple pasta." },
      { offeringId: "sides-sauces-and-extras--side-of-meatballs", kind: "Side", reason: "Meatballs with marinara." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "Extra marinara for dipping." },
    ],
    relatedOfferingIds: [
      "sides-sauces-and-extras--side-of-alfredo-sauce--large",
      "sides-sauces-and-extras--side-of-meat-sauce--large",
      "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
    ],
    compareHeading: "How marinara compares with other large sauces",
    faqs: [
      { question: "Can you buy Olive Garden marinara sauce to go?", answer: "Yes. Olive Garden sells a large container of its freshly made marinara for pickup; breadsticks are not included." },
      { question: "How much marinara is in the large container?", answer: "Olive Garden’s U.S. nutrition guide lists it as one pint, with 290 calories for the whole container." },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-meat-sauce",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--meat-dipping-sauce"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-meat-sauce--large",
    primaryKeyword: "olive garden meat sauce",
    secondaryKeywords: ["olive garden meat sauce to go", "side of meat sauce price", "olive garden meat sauce calories"],
    h1: "Olive Garden Side of Meat Sauce",
    metaTitle: "Olive Garden Meat Sauce To Go: Price, Calories & Size",
    metaDescription:
      "A large Olive Garden Side of Meat Sauce costs $9.79 with 600 calories per container: homemade meat sauce with beef and Italian sausage. See nutrition and allergens.",
    servingSummary: "One large container (breadsticks not included)",
    servingBasis: "One large container (one pint), as sold",
    unitLabel: "large container",
    priceSubject: "One large container",
    about: {
      heading: "About the Side of Meat Sauce",
      paragraphs: [
        "The Side of Meat Sauce is a large container of Olive Garden’s freshly made meat sauce with beef and Italian sausage, sold for pasta or dipping; breadsticks are not included.",
        "The large container costs $9.79 and has 600 calories with 28 g protein, according to Olive Garden’s U.S. nutrition guide, which lists it as one pint.",
        ["See the other large sauces on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [
      { name: "Meat sauce", detail: "Freshly made with beef and Italian sausage; one pint per large container." },
    ],
    allergenFacts: ["Freshly made meat sauce with beef and Italian sausage."],
    pairings: [
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for dipping are sold separately." },
      { offeringId: "classic-entrees--spaghetti-with-meat-sauce", kind: "Entrée", reason: "Extra sauce for spaghetti." },
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A meat-sauce dish for meat-sauce fans." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade with a tomato dish." },
    ],
    relatedOfferingIds: [
      "sides-sauces-and-extras--side-of-marinara-sauce--large",
      "sides-sauces-and-extras--side-of-alfredo-sauce--large",
      "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
    ],
    compareHeading: "How meat sauce compares with other large sauces",
    faqs: [
      { question: "What is in Olive Garden meat sauce?", answer: "Olive Garden describes its homemade meat sauce as made with beef and Italian sausage." },
      { question: "Can you buy Olive Garden meat sauce to go?", answer: "Yes. Olive Garden sells a large container (one pint, 600 calories) for pickup; breadsticks are not included." },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-five-cheese-marinara-sauce",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--five-cheese-marinara-dipping-sauce"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
    primaryKeyword: "olive garden five cheese marinara",
    secondaryKeywords: ["five cheese marinara to go", "five cheese marinara calories", "side of five cheese marinara price"],
    h1: "Olive Garden Side of Five Cheese Marinara Sauce",
    metaTitle: "Olive Garden Five Cheese Marinara To Go: Price & Calories",
    metaDescription:
      "A large Olive Garden Side of Five Cheese Marinara Sauce costs $9.79 with 800 calories per container, freshly made for pasta or dipping. See nutrition and allergens.",
    servingSummary: "One large container (breadsticks not included)",
    servingBasis: "One large container (one pint), as sold",
    unitLabel: "large container",
    priceSubject: "One large container",
    about: {
      heading: "About the Side of Five Cheese Marinara Sauce",
      paragraphs: [
        "The Side of Five Cheese Marinara Sauce is a large container of Olive Garden’s freshly made five cheese marinara, sold for extra pasta sauce or for dipping breadsticks; breadsticks are not included. Olive Garden marks it with its vegetarian (V) label.",
        "The large container costs $9.79 and has 800 calories, according to Olive Garden’s U.S. nutrition guide, which lists it as one pint.",
        ["Compare it with the alfredo, marinara and meat sauce on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [{ name: "Five cheese marinara", detail: "Freshly made; one pint per large container." }],
    allergenFacts: ["Freshly made five cheese marinara in a large container."],
    pairings: [
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for dipping are sold separately." },
      { offeringId: "classic-entrees--five-cheese-ziti-al-forno", kind: "Entrée", reason: "The baked ziti uses a five cheese marinara." },
      { offeringId: "sides-sauces-and-extras--side-of-meatballs", kind: "Side", reason: "Meatballs with a cheesy tomato sauce." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade with a tomato dish." },
    ],
    relatedOfferingIds: [
      "sides-sauces-and-extras--side-of-marinara-sauce--large",
      "sides-sauces-and-extras--side-of-alfredo-sauce--large",
      "sides-sauces-and-extras--side-of-meat-sauce--large",
    ],
    compareHeading: "How five cheese marinara compares with other large sauces",
    faqs: [
      { question: "Can you buy Olive Garden five cheese marinara to go?", answer: "Yes. Olive Garden sells a large container (one pint) of its freshly made five cheese marinara for pickup." },
      {
        question: "Is five cheese marinara vegetarian?",
        answer: "Olive Garden marks it with its vegetarian (V) label. Shared kitchens mean cross-contact with animal products is possible.",
      },
    ],
    related: SIDE_RELATED,
  }),

  // ---------------- Drinks (official nutrition row; not in the allergen guide)
  drinkPage({
    slug: "classic-lemonade",
    offeringId: "non-alcoholic-beverages--classic-lemonade",
    name: "Classic Lemonade",
    keyword: "olive garden lemonade",
    secondary: ["olive garden lemonade calories", "olive garden lemonade price", "olive garden classic lemonade"],
    metaTitle: "Olive Garden Lemonade: Price, Calories & Sugar",
    metaDescription: "Olive Garden Classic Lemonade costs $3.99 with 170 calories and 42 g sugars per drink. Compare raspberry lemonade, limonatas and teas.",
    about: [
      "Classic Lemonade is Olive Garden’s plain cold lemonade, sold by the glass and also used in the Half Iced Tea + Half Lemonade drink.",
      "One drink costs $3.99 and has 170 calories with 42 g sugars and 43 g carbohydrates, according to Olive Garden’s U.S. nutrition guide.",
    ],
    ingredients: [{ name: "Lemonade", detail: "Served cold." }],
    related: [...without(LEMONADES, "non-alcoholic-beverages--classic-lemonade"), "non-alcoholic-beverages--half-iced-tea-and-half-lemonade"].slice(0, 4),
    faq: {
      question: "Which Olive Garden lemonade has the fewest calories?",
      answer: "Raspberry Lemonade has 160 calories and Classic Lemonade 170, according to Olive Garden’s nutrition guide. The half tea, half lemonade drink has 80.",
    },
    pairings: [
      { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "A bright drink next to a creamy pasta." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "Lemonade with a fried starter." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A fruity dessert." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How Classic Lemonade compares with other drinks",
  }),
  drinkPage({
    slug: "raspberry-lemonade",
    offeringId: "non-alcoholic-beverages--raspberry-lemonade",
    name: "Raspberry Lemonade",
    keyword: "olive garden raspberry lemonade",
    secondary: ["raspberry lemonade calories", "raspberry lemonade price", "olive garden raspberry lemonade gallon"],
    metaTitle: "Olive Garden Raspberry Lemonade: Price, Calories & Sugar",
    metaDescription: "Olive Garden Raspberry Lemonade costs $4.29 with 160 calories and 42 g sugars per drink. Also sold by the gallon for to-go orders.",
    about: [
      "Raspberry Lemonade is a cold raspberry-flavored lemonade, sold by the glass and also by the gallon for to-go orders.",
      "One drink costs $4.29 and has 160 calories with 42 g sugars, according to Olive Garden’s U.S. nutrition guide.",
    ],
    ingredients: [{ name: "Raspberry-flavored lemonade", detail: "Served cold." }],
    related: [...without(LEMONADES, "non-alcoholic-beverages--raspberry-lemonade"), "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea"].slice(0, 4),
    faq: {
      question: "Can you buy Olive Garden raspberry lemonade by the gallon?",
      answer: "Yes. Olive Garden sells gallons of its iced teas and raspberry lemonade for to-go orders; see the non-alcoholic beverages page for the gallon price.",
    },
    pairings: [
      { offeringId: "classic-entrees--chicken-parmigiana", kind: "Entrée", reason: "A fruity drink with a classic entrée." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "Lemonade with a fried starter." },
      { offeringId: "desserts--sicilian-cheesecake-with-strawberry-topping", kind: "Dessert", reason: "Berry flavors on both sides." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How Raspberry Lemonade compares with other drinks",
  }),
  drinkPage({
    slug: "sweet-pear-limonata",
    offeringId: "non-alcoholic-beverages--desert-pear-limonata",
    name: "Sweet Pear Limonata",
    keyword: "olive garden sweet pear limonata",
    secondary: ["olive garden pear limonata", "olive garden prickly pear lemonade", "limonata calories"],
    metaTitle: "Olive Garden Sweet Pear Limonata: Price, Calories & Sugar",
    metaDescription: "Olive Garden Sweet Pear Limonata costs $4.79 with 240 calories: prickly pear lemonade with sparkling water. See sugar and how it compares.",
    about: [
      "The Sweet Pear Limonata mixes sweet prickly pear lemonade with sparkling water for a lightly bubbly, fruity drink without alcohol.",
      "One drink costs $4.79 and has 240 calories with 57 g sugars, according to Olive Garden’s U.S. nutrition guide, the most calories of the non-alcoholic drinks.",
    ],
    ingredients: [
      { name: "Prickly pear lemonade", detail: "Sweet." },
      { name: "Sparkling water", detail: "Mixed in." },
    ],
    related: [...without(LEMONADES, "non-alcoholic-beverages--desert-pear-limonata"), "non-alcoholic-beverages--mango-passion-fruit-iced-tea"].slice(0, 4),
    faq: {
      question: "What is a limonata at Olive Garden?",
      answer: "Olive Garden’s limonatas are flavored lemonades mixed with sparkling water. The menu lists Sweet Pear (240 calories) and Strawberry-Passion Fruit (180 calories).",
    },
    pairings: [
      { offeringId: "classic-entrees--shrimp-scampi", kind: "Entrée", reason: "A light entrée with a sweeter drink." },
      { offeringId: "appetizers--toasted-ravioli", kind: "Appetizer", reason: "A fizzy drink with a fried starter." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How the Sweet Pear Limonata compares with other drinks",
  }),
  drinkPage({
    slug: "strawberry-passion-fruit-limonata",
    offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata",
    name: "Strawberry-Passion Fruit Limonata",
    keyword: "olive garden strawberry passion fruit limonata",
    secondary: ["strawberry limonata calories", "olive garden strawberry lemonade", "limonata price"],
    metaTitle: "Olive Garden Strawberry-Passion Fruit Limonata: Price & Calories",
    metaDescription: "Olive Garden Strawberry-Passion Fruit Limonata costs $4.79 with 180 calories: fruit lemonade topped with sparkling water. See sugar and comparisons.",
    about: [
      "The Strawberry-Passion Fruit Limonata is strawberry and passion fruit lemonade topped with sparkling water, a fizzy, fruit-forward drink without alcohol.",
      "One drink costs $4.79 and has 180 calories with 44 g sugars, according to Olive Garden’s U.S. nutrition guide.",
    ],
    ingredients: [
      { name: "Strawberry and passion fruit lemonade", detail: "Fruit-flavored." },
      { name: "Sparkling water", detail: "On top." },
    ],
    related: [...without(LEMONADES, "non-alcoholic-beverages--strawberry-passion-fruit-limonata"), "non-alcoholic-beverages--mango-passion-fruit-iced-tea"].slice(0, 4),
    faq: {
      question: "Does the Strawberry-Passion Fruit Limonata have alcohol?",
      answer: "No. It is on Olive Garden’s non-alcoholic beverages menu: strawberry and passion fruit lemonade with sparkling water.",
    },
    pairings: [
      { offeringId: "classic-entrees--grilled-chicken-margherita", kind: "Entrée", reason: "A light entrée with a fruity drink." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A fizzy drink with a fried starter." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "Strawberry on both sides." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How the Strawberry-Passion Fruit Limonata compares with other drinks",
  }),
  drinkPage({
    slug: "mango-passion-fruit-iced-tea",
    offeringId: "non-alcoholic-beverages--mango-passion-fruit-iced-tea",
    name: "Mango-Passion Fruit Iced Tea",
    keyword: "olive garden mango iced tea",
    secondary: ["mango passion fruit iced tea calories", "olive garden flavored iced tea", "mango iced tea price"],
    metaTitle: "Olive Garden Mango-Passion Fruit Iced Tea: Price & Calories",
    metaDescription: "Olive Garden Mango-Passion Fruit Iced Tea costs $4.29 with 100 calories and 24 g sugars, a fruity alternative to sweet or unsweet tea.",
    about: [
      "The Mango-Passion Fruit Iced Tea is iced tea flavored with mango and passion fruit, a fruity alternative to plain sweet or unsweet tea.",
      "One drink costs $4.29 and has 100 calories with 24 g sugars, according to Olive Garden’s U.S. nutrition guide.",
    ],
    ingredients: [{ name: "Iced tea", detail: "Flavored with mango and passion fruit." }],
    related: without(TEAS, "non-alcoholic-beverages--mango-passion-fruit-iced-tea"),
    faq: {
      question: "Which Olive Garden flavored iced tea has fewer calories?",
      answer: "The Bellini Peach-Raspberry Iced Tea has 80 calories and the Mango-Passion Fruit Iced Tea 100, according to Olive Garden’s nutrition guide.",
    },
    pairings: [
      { offeringId: "classic-entrees--herb-grilled-salmon", kind: "Entrée", reason: "A light drink with a grilled entrée." },
      { offeringId: "appetizers--toasted-ravioli", kind: "Appetizer", reason: "Iced tea with a fried starter." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How the Mango-Passion Fruit Iced Tea compares with other drinks",
  }),
  drinkPage({
    slug: "bellini-peach-raspberry-iced-tea",
    offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea",
    name: "Bellini Peach-Raspberry Iced Tea",
    keyword: "olive garden bellini iced tea",
    secondary: ["peach raspberry iced tea calories", "olive garden peach tea", "bellini iced tea price"],
    metaTitle: "Olive Garden Bellini Peach-Raspberry Iced Tea: Price & Calories",
    metaDescription: "Olive Garden Bellini Peach-Raspberry Iced Tea costs $4.29 with 80 calories and 17 g sugars, one of the lighter flavored drinks. See comparisons.",
    about: [
      "The Bellini Peach-Raspberry Iced Tea is iced tea flavored with peach and raspberry, served cold.",
      "One drink costs $4.29 and has 80 calories with 17 g sugars, according to Olive Garden’s U.S. nutrition guide, fewer than the sweet tea (90).",
    ],
    ingredients: [{ name: "Iced tea", detail: "Flavored with peach and raspberry." }],
    related: without(TEAS, "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea"),
    faq: {
      question: "Does the Bellini Iced Tea contain alcohol?",
      answer: "No. Despite the name, it is a peach and raspberry flavored iced tea on Olive Garden’s non-alcoholic beverages menu.",
    },
    pairings: [
      { offeringId: "classic-entrees--shrimp-scampi", kind: "Entrée", reason: "A light drink with a light entrée." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "Iced tea with a fried starter." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A fruity dessert." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How the Bellini Peach-Raspberry Iced Tea compares with other drinks",
  }),
  drinkPage({
    slug: "half-iced-tea-and-half-lemonade",
    offeringId: "non-alcoholic-beverages--half-iced-tea-and-half-lemonade",
    name: "Half Iced Tea + Half Lemonade",
    keyword: "olive garden half tea half lemonade",
    secondary: ["olive garden arnold palmer", "half iced tea half lemonade calories", "half tea half lemonade price"],
    metaTitle: "Olive Garden Half Iced Tea + Half Lemonade: Price & Calories",
    metaDescription: "Olive Garden Half Iced Tea + Half Lemonade costs $3.69 with 80 calories: fresh-brewed iced tea and lemonade in one glass. Also sold by the gallon.",
    about: [
      "Half Iced Tea + Half Lemonade pours fresh-brewed iced tea and lemonade together in one glass; it is also sold by the gallon for to-go orders.",
      "One drink costs $3.69 and has 80 calories with 21 g sugars, according to Olive Garden’s U.S. nutrition guide, less than half the calories of a Classic Lemonade (170).",
    ],
    ingredients: [
      { name: "Fresh-brewed iced tea", detail: "Half the glass." },
      { name: "Lemonade", detail: "Half the glass." },
    ],
    related: ["non-alcoholic-beverages--classic-lemonade", "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea"],
    faq: {
      question: "How many calories are in half tea, half lemonade compared with lemonade?",
      answer: "The half and half drink has 80 calories; a Classic Lemonade has 170, according to Olive Garden’s nutrition guide.",
    },
    pairings: [
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic drink with a classic entrée." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A cold drink with a fried starter." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    compareHeading: "How Half Iced Tea + Half Lemonade compares with other drinks",
  }),
  drinkPage({
    slug: "cappuccino",
    offeringId: "non-alcoholic-beverages--cappuccino",
    name: "Cappuccino",
    keyword: "olive garden cappuccino",
    secondary: ["olive garden cappuccino calories", "olive garden cappuccino price", "olive garden coffee"],
    metaTitle: "Olive Garden Cappuccino: Price, Calories & What’s In It",
    metaDescription: "Olive Garden Cappuccino costs $4.99 with 150 calories: Lavazza espresso with steamed milk, whipped cream and cinnamon. See nutrition and pairings.",
    about: [
      "Olive Garden’s Cappuccino is Lavazza espresso with steamed milk, topped with whipped cream and a sprinkle of cinnamon, a warm drink to finish dinner.",
      "One cappuccino costs $4.99 and has 150 calories with 9 g protein and 6 g fat, according to Olive Garden’s U.S. nutrition guide.",
    ],
    ingredients: [
      { name: "Lavazza espresso", detail: "The coffee base." },
      { name: "Steamed milk", detail: "Part of the drink, per the menu." },
      { name: "Whipped cream and cinnamon", detail: "On top." },
    ],
    related: ["non-alcoholic-beverages--lavazza-espresso", "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", "non-alcoholic-beverages--classic-lemonade"],
    faq: {
      question: "What espresso does Olive Garden use?",
      answer: "Olive Garden lists Lavazza espresso on its menu; the cappuccino is made with it.",
    },
    pairings: [
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "Coffee flavors on both sides of the table." },
      { offeringId: "desserts--black-tie-mousse-cake", kind: "Dessert", reason: "Coffee with a chocolate dessert." },
      { offeringId: "desserts--warm-italian-doughnuts", kind: "Dessert", reason: "Coffee and warm doughnuts." },
      { offeringId: "desserts--sicilian-cheesecake-with-strawberry-topping", kind: "Dessert", reason: "A classic coffee and cheesecake pairing." },
    ],
    compareHeading: "How the Cappuccino compares with other drinks",
  }),
  drinkPage({
    slug: "lavazza-espresso",
    offeringId: "non-alcoholic-beverages--lavazza-espresso",
    name: "Lavazza Espresso",
    keyword: "olive garden espresso",
    secondary: ["olive garden lavazza espresso", "olive garden espresso price", "espresso calories"],
    metaTitle: "Olive Garden Lavazza Espresso: Price & Calories",
    metaDescription: "Olive Garden Lavazza Espresso costs $3.99 with 60 calories, the same Italian coffee used in the cappuccino. See nutrition and dessert pairings.",
    about: [
      "Lavazza Espresso is a shot of the Italian coffee Olive Garden uses for its cappuccino, a strong, simple finish to a meal.",
      "One espresso costs $3.99 and has 60 calories, according to Olive Garden’s U.S. nutrition guide.",
    ],
    ingredients: [{ name: "Lavazza espresso", detail: "One espresso." }],
    related: ["non-alcoholic-beverages--cappuccino", "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea"],
    faq: {
      question: "What is the difference between the espresso and the cappuccino?",
      answer: "The espresso is a plain shot of Lavazza coffee (60 calories). The cappuccino adds steamed milk, whipped cream and cinnamon (150 calories), according to Olive Garden’s nutrition guide.",
    },
    pairings: [
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "Espresso with an espresso-soaked dessert." },
      { offeringId: "desserts--chocolate-lasagna", kind: "Dessert", reason: "A strong coffee with a rich chocolate dessert." },
      { offeringId: "desserts--warm-italian-doughnuts", kind: "Dessert", reason: "Coffee and warm doughnuts." },
      { offeringId: "desserts--black-tie-mousse-cake", kind: "Dessert", reason: "Coffee with chocolate." },
    ],
    compareHeading: "How the Lavazza Espresso compares with other drinks",
  }),
];
