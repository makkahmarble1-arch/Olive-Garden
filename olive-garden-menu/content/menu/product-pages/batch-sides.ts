import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Sides and sauces (2026-11-18). The plan builds sides only where search data
 * shows demand: these six appear in observed Google autocomplete
 * (research/seo/categories/sides-sauces-and-extras.md, 2026-11-13).
 * Not built: mashed potatoes, marinara, meat sauce and five cheese marinara
 * (no item-level demand observed), Crispy Shrimp Fritta (calorie mapping is a
 * documented conflict), Cheese Grater (merchandise, no nutrition).
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const SIDE_RELATED: RelatedMenuRef[] = [
  { categoryId: "sides-sauces-and-extras", text: "Every side, sauce and extra with prices and calories." },
  { categoryId: "create-your-own-pasta", text: "Add a topping to your own pasta." },
  { categoryId: "classic-entrees", text: "Classic entrées to pair with a side." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const PROTEIN_SIDES = [
  "sides-sauces-and-extras--side-of-grilled-chicken",
  "sides-sauces-and-extras--side-of-meatballs",
  "sides-sauces-and-extras--italian-sausage",
  "sides-sauces-and-extras--side-of-crispy-chicken-fritta",
];
const others = (self: string) => PROTEIN_SIDES.filter((x) => x !== self);
const addFaq = {
  question: "Can I add this side to any dish?",
  answer:
    "Olive Garden lists its sides as add-ons for pastas, salads and entrées. The side is priced and counted on its own, so add its calories to those of your dish.",
  link: { text: "See all sides and extras", href: "/sides-sauces-and-extras" },
};

export const sidePages: ProductPageContent[] = [
  itemPage({
    slug: "side-of-grilled-chicken",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--grilled-chicken-breasts"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-grilled-chicken",
    primaryKeyword: "olive garden side of grilled chicken",
    secondaryKeywords: ["side of grilled chicken price", "side of grilled chicken calories", "add chicken olive garden"],
    metaTitle: "Olive Garden Side of Grilled Chicken: Price, Calories & Protein",
    metaDescription:
      "An Olive Garden Side of Grilled Chicken costs $4.99 with 130 calories and 26 g protein. Add it to pasta or salad. See nutrition and allergen notes.",
    servingSummary: "One side order",
    servingBasis: "One side order, as served",
    unitLabel: "side",
    priceSubject: "One side",
    about: {
      heading: "About the Side of Grilled Chicken",
      paragraphs: [
        "The Side of Grilled Chicken is a grilled chicken breast that you can add to a pasta, a salad or another entrée.",
        "It costs $4.99 and has 130 calories with 26 g protein and 2.5 g fat, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        ["Compare it with the other protein add-ons on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [{ name: "Grilled chicken breast", detail: "Cooked on the grill." }],
    allergenFacts: ["Grilled chicken breast."],
    pairings: [
      { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "Turns Fettuccine Alfredo into a chicken pasta." },
      { offeringId: "soups-salad-and-breadsticks--famous-house-salad", kind: "Soup & salad", reason: "Adds protein to the house salad." },
      { offeringId: "classic-entrees--spaghetti-with-marinara", kind: "Entrée", reason: "A simple pasta with added protein." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: others("sides-sauces-and-extras--side-of-grilled-chicken"),
    compareHeading: "How grilled chicken compares with other protein add-ons",
    faqs: [
      addFaq,
      {
        question: "Which Olive Garden protein add-on has the fewest calories?",
        answer:
          "Grilled chicken, with 130 calories. Crispy chicken fritta has 240, Italian sausage 510 and three meatballs 520, according to Olive Garden’s U.S. nutrition guide.",
      },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-meatballs",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--italian-meatballs"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-meatballs",
    primaryKeyword: "olive garden side of meatballs",
    secondaryKeywords: ["side of meatballs price", "side of meatballs calories", "olive garden meatballs"],
    metaTitle: "Olive Garden Side of Meatballs: Price, Calories & Allergens",
    metaDescription:
      "An Olive Garden Side of Meatballs costs $4.49 for three meatballs with 520 calories and 24 g protein. Add them to any pasta. See nutrition and allergens.",
    servingSummary: "One side order of three meatballs",
    servingBasis: "One side order (three meatballs), as served",
    unitLabel: "side",
    priceSubject: "One side",
    about: {
      heading: "About the Side of Meatballs",
      paragraphs: [
        "The Side of Meatballs is a side order of three meatballs that you can add to a pasta, a salad or any entrée.",
        "It costs $4.49 and has 520 calories with 24 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        [
          "For a starter, the ",
          { text: "appetizers menu", href: "/appetizers" },
          " has Meatballs Parmigiana: five meatballs baked with marinara and melted cheese.",
        ],
      ],
    },
    ingredients: [{ name: "Meatballs", detail: "Three per side order." }],
    allergenFacts: ["A side order of three meatballs."],
    pairings: [
      { offeringId: "classic-entrees--spaghetti-with-marinara", kind: "Entrée", reason: "Makes a spaghetti and meatballs plate." },
      { offeringId: "classic-entrees--five-cheese-ziti-al-forno", kind: "Entrée", reason: "A baked pasta with extra protein." },
      { offeringId: "soups-salad-and-breadsticks--famous-house-salad", kind: "Soup & salad", reason: "A salad next to a rich side." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade with a tomato dish." },
    ],
    relatedOfferingIds: [...others("sides-sauces-and-extras--side-of-meatballs"), "appetizers--meatballs-parmigiana"].slice(0, 4),
    compareHeading: "How the Side of Meatballs compares with other add-ons",
    faqs: [
      addFaq,
      {
        question: "How many meatballs are in an Olive Garden side of meatballs?",
        answer: "Three. Olive Garden’s nutrition guide lists the side as Meatballs (3) with 520 calories.",
      },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "italian-sausage",
    primaryOfferingId: "sides-sauces-and-extras--italian-sausage",
    sizeOfferingIds: ["catering--italian-sausage"],
    primaryKeyword: "olive garden italian sausage",
    secondaryKeywords: ["side of italian sausage price", "italian sausage calories", "italian sausage catering"],
    h1: "Olive Garden Side of Italian Sausage",
    metaTitle: "Olive Garden Side of Italian Sausage: Price, Calories & Sizes",
    metaDescription:
      "An Olive Garden Side of Italian Sausage costs $4.49 for two links with marinara, 510 calories and 27 g protein. See the catering tray and allergens.",
    servingSummary: "Two Italian sausage links with marinara",
    servingBasis: "One side order (two links with marinara), as served",
    unitLabel: "side",
    priceSubject: "One side",
    about: {
      heading: "About the Side of Italian Sausage",
      paragraphs: [
        "The Side of Italian Sausage is two Italian sausage links served with homemade marinara, added to a pasta or entrée for extra protein.",
        "It costs $4.49 and has 510 calories with 27 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        ["A larger tray is sold on the ", { text: "catering menu", href: "/catering" }, "; both sizes are compared below."],
      ],
    },
    ingredients: [
      { name: "Italian sausage", detail: "Two links." },
      { name: "Marinara", detail: "Homemade, served with the sausage." },
    ],
    allergenFacts: ["Two Italian sausage links with marinara."],
    pairings: [
      { offeringId: "classic-entrees--spaghetti-with-marinara", kind: "Entrée", reason: "A simple pasta with sausage." },
      { offeringId: "gluten-sensitive--rotini-pasta-with-marinara", kind: "Entrée", reason: "Italian sausage is one of the paid add-ons for the gluten-sensitive rotini." },
      { offeringId: "soups-salad-and-breadsticks--famous-house-salad", kind: "Soup & salad", reason: "A salad on the side." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: others("sides-sauces-and-extras--italian-sausage"),
    compareHeading: "How Italian sausage compares with other protein add-ons",
    faqs: [
      addFaq,
      {
        question: "How many sausage links come in a side order?",
        answer: "Two. Olive Garden lists the side as two Italian sausage links with marinara, with 510 calories.",
      },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-crispy-chicken-fritta",
    primaryOfferingId: "sides-sauces-and-extras--side-of-crispy-chicken-fritta",
    primaryKeyword: "olive garden crispy chicken fritta",
    secondaryKeywords: ["side of crispy chicken fritta price", "crispy chicken fritta calories"],
    metaTitle: "Olive Garden Side of Crispy Chicken Fritta: Price & Calories",
    metaDescription:
      "An Olive Garden Side of Crispy Chicken Fritta costs $4.49 with 240 calories and 20 g protein: fried, breaded chicken to add to pasta. See allergens.",
    servingSummary: "One side order",
    servingBasis: "One side order, as served",
    unitLabel: "side",
    priceSubject: "One side",
    about: {
      heading: "About the Side of Crispy Chicken Fritta",
      paragraphs: [
        "Crispy Chicken Fritta is breaded, fried chicken that adds a crunchy topping to a pasta, a salad or an entrée.",
        "A side costs $4.49 and has 240 calories with 20 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The allergen guide marks it as fried in soy oil.",
        ["It is also a topping when you ", { text: "create your own pasta", href: "/create-your-own-pasta" }, "."],
      ],
    },
    ingredients: [
      { name: "Chicken", detail: "Breaded." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
    ],
    allergenFacts: ["Breaded, fried chicken."],
    pairings: [
      { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "A crispy topping on a creamy pasta." },
      { offeringId: "classic-entrees--spaghetti-with-marinara", kind: "Entrée", reason: "A simple pasta with crunchy chicken." },
      { offeringId: "soups-salad-and-breadsticks--famous-house-salad", kind: "Soup & salad", reason: "A salad on the side." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade with fried chicken." },
    ],
    relatedOfferingIds: others("sides-sauces-and-extras--side-of-crispy-chicken-fritta"),
    compareHeading: "How crispy chicken fritta compares with other protein add-ons",
    faqs: [
      addFaq,
      {
        question: "Is crispy chicken fritta fried or grilled?",
        answer:
          "Fried. Olive Garden’s allergen guide marks it as fried in soy oil. For a grilled option, the side of grilled chicken has 130 calories.",
      },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-broccoli",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--broccoli"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-broccoli",
    primaryKeyword: "olive garden broccoli",
    secondaryKeywords: ["side of broccoli price", "parmesan garlic broccoli calories", "olive garden vegetable side"],
    h1: "Olive Garden Side of Broccoli",
    metaTitle: "Olive Garden Side of Broccoli: Price, Calories & Allergens",
    metaDescription:
      "An Olive Garden Side of Broccoli costs $3.79 with 150 calories: parmesan garlic broccoli, the same side served with salmon and sirloin plates.",
    servingSummary: "One side order of parmesan garlic broccoli",
    servingBasis: "One side order, as served",
    unitLabel: "side",
    priceSubject: "One side",
    about: {
      heading: "About the Side of Broccoli",
      paragraphs: [
        "The Side of Broccoli is parmesan garlic broccoli, the same vegetable Olive Garden serves with its grilled chicken, salmon and sirloin plates. Olive Garden marks it with its vegetarian (V) label.",
        "It costs $3.79 and has 150 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The allergen guide marks only dairy for it.",
        ["See the other vegetable and potato sides on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [
      { name: "Broccoli", detail: "The vegetable." },
      { name: "Parmesan and garlic", detail: "Seasoning." },
    ],
    allergenFacts: ["Broccoli with parmesan and garlic."],
    pairings: [
      { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "Olive Garden’s guide lists broccoli as an add-on for alfredo." },
      { offeringId: "classic-entrees--chicken-parmigiana", kind: "Entrée", reason: "A vegetable next to a fried entrée." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Grilled chicken and broccoli make a simple plate." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["sides-sauces-and-extras--side-of-mashed-potatoes", "sides-sauces-and-extras--side-of-grilled-chicken", "soups-salad-and-breadsticks--famous-house-salad"],
    compareHeading: "How the Side of Broccoli compares with other sides",
    faqs: [
      addFaq,
      {
        question: "Is Olive Garden broccoli vegetarian?",
        answer:
          "Olive Garden marks the Side of Broccoli with its vegetarian (V) label. Shared kitchens mean cross-contact with animal products is possible.",
      },
    ],
    related: SIDE_RELATED,
  }),

  itemPage({
    slug: "side-of-alfredo-sauce",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--alfredo-dipping-sauce"],
    primaryOfferingId: "sides-sauces-and-extras--side-of-alfredo-sauce--large",
    primaryKeyword: "olive garden alfredo sauce",
    secondaryKeywords: ["olive garden extra alfredo sauce price", "side of alfredo sauce calories", "olive garden alfredo sauce to go"],
    h1: "Olive Garden Side of Alfredo Sauce",
    metaTitle: "Olive Garden Alfredo Sauce To Go: Price, Calories & Size",
    metaDescription:
      "A large Olive Garden Side of Alfredo Sauce costs $11.29 with 1,750 calories per container, freshly made for pasta or dipping. See nutrition and allergens.",
    servingSummary: "One large container (breadsticks not included)",
    servingBasis: "One large container (one pint), as sold",
    unitLabel: "large container",
    priceSubject: "One large container",
    about: {
      heading: "About the Side of Alfredo Sauce",
      paragraphs: [
        "The Side of Alfredo Sauce is a large container of Olive Garden’s freshly made alfredo, sold for extra pasta sauce or for dipping breadsticks; breadsticks are not included. Olive Garden marks it with its vegetarian (V) label.",
        "The large container costs $11.29 and has 1,750 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide, which lists it as one pint. It is meant to be shared over several servings.",
        ["Marinara, meat sauce and five cheese marinara are sold the same way on the ", { text: "sides and extras page", href: "/sides-sauces-and-extras" }, "."],
      ],
    },
    ingredients: [{ name: "Alfredo sauce", detail: "Freshly made; one pint per large container." }],
    allergenFacts: ["Freshly made alfredo sauce in a large container."],
    pairings: [
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for dipping are sold separately." },
      { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "Extra sauce for a creamy pasta." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Grilled chicken with alfredo sauce." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Broccoli with alfredo sauce." },
    ],
    relatedOfferingIds: [
      "sides-sauces-and-extras--side-of-marinara-sauce--large",
      "sides-sauces-and-extras--side-of-meat-sauce--large",
      "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
    ],
    compareHeading: "How the alfredo sauce compares with other large sauces",
    faqs: [
      {
        question: "Can you buy Olive Garden alfredo sauce to go?",
        answer: "Yes. Olive Garden sells a large container of its freshly made alfredo for pickup; breadsticks are not included.",
      },
      {
        question: "How much alfredo sauce is in the large container?",
        answer: "Olive Garden’s U.S. nutrition guide lists it as one pint, with 1,750 calories for the whole container.",
      },
    ],
    related: SIDE_RELATED,
  }),
];
