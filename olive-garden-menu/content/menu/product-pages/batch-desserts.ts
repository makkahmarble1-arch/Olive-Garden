import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Phase 3 (2026-11-18): desserts with a single official row and an accurate
 * photo (checked visually 2026-11-18). Pending (research/products/PENDING.md):
 * Chocolate Lasagna (photo shows white cream layers, official dish is chocolate
 * mousse), Warm Italian Doughnuts (photo shows a cream sauce, official choice is
 * raspberry or chocolate), Pumpkin Cookie Butter Cheesecake (limited time, not
 * re-checkable from our network).
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const DESSERT_RELATED: RelatedMenuRef[] = [
  { categoryId: "desserts", text: "Every Olive Garden dessert with prices and calories." },
  { categoryId: "non-alcoholic-beverages", text: "Coffee, tea and other drinks to go with dessert." },
  { categoryId: "classic-entrees", text: "Classic entrées to start the meal." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const DESSERT_CATERING_RELATED: RelatedMenuRef[] = [
  { categoryId: "desserts", text: "Every Olive Garden dessert with prices and calories." },
  { categoryId: "catering", text: "Half and whole cakes for groups." },
  { categoryId: "non-alcoholic-beverages", text: "Coffee, tea and other drinks to go with dessert." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const CAPPUCCINO = "non-alcoholic-beverages--cappuccino";
const ESPRESSO = "non-alcoholic-beverages--lavazza-espresso";
const UNSWEET_TEA = "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea";

export const dessertPages: ProductPageContent[] = [
  itemPage({
    slug: "tiramisu",
    primaryOfferingId: "desserts--tiramisu",
    sizeOfferingIds: ["catering--tiramisu"],
    primaryKeyword: "olive garden tiramisu",
    secondaryKeywords: ["olive garden tiramisu price", "olive garden tiramisu calories", "tiramisu catering"],
    metaTitle: "Olive Garden Tiramisu: Price, Calories & Catering Sizes",
    metaDescription:
      "Olive Garden Tiramisu costs $9.79 a slice with 470 calories, the lowest of the regular desserts. See half and whole catering sizes, nutrition and allergens.",
    servingSummary: "One dessert slice, served chilled",
    servingBasis: "One dessert slice, as served",
    unitLabel: "slice",
    priceSubject: "One slice",
    about: {
      heading: "About Olive Garden Tiramisu",
      paragraphs: [
        "Olive Garden’s Tiramisu is the classic Italian layered dessert: ladyfingers soaked in espresso under a smooth, creamy custard layer, served chilled by the slice. Olive Garden marks it with its vegetarian (V) label.",
        "One slice costs $9.79 and has 470 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. That is the fewest calories of the six regular desserts on the online menu.",
        [
          "For a party, the ",
          { text: "catering menu", href: "/catering" },
          " sells Tiramisu as a half (serves 6) or a whole (serves 12). Both sizes are compared below.",
        ],
      ],
    },
    ingredients: [
      { name: "Ladyfingers", detail: "Soaked in espresso." },
      { name: "Creamy custard", detail: "The smooth top layer." },
    ],
    allergenFacts: ["Espresso-soaked ladyfingers under a creamy custard layer."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "Coffee flavors on both sides of the table." },
      { offeringId: ESPRESSO, kind: "Drink", reason: "A small, strong coffee to match the espresso-soaked layers." },
      { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "A classic pasta before a classic Italian dessert." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened drink with no calories next to a sweet slice." },
    ],
    relatedOfferingIds: [
      "desserts--strawberry-cream-cake",
      "desserts--sicilian-cheesecake-with-strawberry-topping",
      "desserts--black-tie-mousse-cake",
    ],
    compareHeading: "How Tiramisu compares with other Olive Garden desserts",
    faqs: [
      {
        question: "Does Olive Garden Tiramisu have coffee in it?",
        answer: "Yes. Olive Garden describes its Tiramisu as ladyfingers soaked in espresso, so it contains coffee.",
      },
      {
        question: "Can you buy a whole Olive Garden Tiramisu?",
        answer:
          "Yes, through catering. When we checked in November 2026, a half Tiramisu (serves 6) was $40.49 and a whole Tiramisu (serves 12) was $73.99 for pickup. Each serving has the same 470 calories as a restaurant slice.",
        link: { text: "See the catering menu", href: "/catering" },
      },
    ],
    related: DESSERT_CATERING_RELATED,
  }),

  itemPage({
    slug: "black-tie-mousse-cake",
    primaryOfferingId: "desserts--black-tie-mousse-cake",
    sizeOfferingIds: ["catering--black-tie-mousse-cake"],
    primaryKeyword: "olive garden black tie mousse cake",
    secondaryKeywords: ["black tie mousse cake price", "black tie mousse cake calories", "black tie mousse cake catering"],
    metaTitle: "Olive Garden Black Tie Mousse Cake: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Black Tie Mousse Cake costs $10.29 a slice with 750 calories: chocolate cake, dark chocolate cheesecake and custard mousse. See catering sizes.",
    servingSummary: "One dessert slice",
    servingBasis: "One dessert slice, as served",
    unitLabel: "slice",
    priceSubject: "One slice",
    about: {
      heading: "About Olive Garden Black Tie Mousse Cake",
      paragraphs: [
        "Black Tie Mousse Cake layers chocolate cake with dark chocolate cheesecake and a creamy custard mousse, a dessert built for chocolate lovers. Olive Garden marks it with its vegetarian (V) label.",
        "One slice costs $10.29, the highest price of the regular desserts, and has 750 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. It has 59 g sugars per slice.",
        [
          "The same cake is sold on the ",
          { text: "catering menu", href: "/catering" },
          " as a half (serves 6) or a whole (serves 12) for celebrations.",
        ],
      ],
    },
    ingredients: [
      { name: "Chocolate cake", detail: "The base layer." },
      { name: "Dark chocolate cheesecake", detail: "Layered with the cake." },
      { name: "Custard mousse", detail: "A creamy mousse layer." },
    ],
    allergenFacts: ["Layers of chocolate cake, dark chocolate cheesecake and custard mousse."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "A coffee to balance a rich chocolate slice." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "No added sugar next to a sweet cake." },
      { offeringId: "classic-entrees--grilled-chicken-margherita", kind: "Entrée", reason: "At 650 calories, a lighter main course before a rich dessert." },
      { offeringId: ESPRESSO, kind: "Drink", reason: "A small, strong coffee with chocolate." },
    ],
    relatedOfferingIds: ["desserts--tiramisu", "desserts--sicilian-cheesecake-with-strawberry-topping", "desserts--strawberry-cream-cake"],
    compareHeading: "How Black Tie Mousse Cake compares with other Olive Garden desserts",
    faqs: [
      {
        question: "What is in Olive Garden Black Tie Mousse Cake?",
        answer:
          "Olive Garden describes it as chocolate cake layered with dark chocolate cheesecake and a creamy custard mousse. Olive Garden does not publish the full recipe.",
      },
      {
        question: "Can you order a whole Black Tie Mousse Cake?",
        answer:
          "Yes, through catering. When we checked in November 2026, a half cake (serves 6) was $40.49 and a whole cake (serves 12) was $73.99 for pickup.",
        link: { text: "See the catering menu", href: "/catering" },
      },
    ],
    related: DESSERT_CATERING_RELATED,
  }),

  itemPage({
    slug: "strawberry-cream-cake",
    primaryOfferingId: "desserts--strawberry-cream-cake",
    primaryKeyword: "olive garden strawberry cream cake",
    secondaryKeywords: ["strawberry cream cake price", "strawberry cream cake calories"],
    metaTitle: "Olive Garden Strawberry Cream Cake: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Strawberry Cream Cake costs $9.99 a slice with 540 calories: vanilla sponge, vanilla cream and fresh strawberries. See nutrition and allergens.",
    servingSummary: "One dessert slice",
    servingBasis: "One dessert slice, as served",
    unitLabel: "slice",
    priceSubject: "One slice",
    about: {
      heading: "About Olive Garden Strawberry Cream Cake",
      paragraphs: [
        "Strawberry Cream Cake is a light, fruity dessert: vanilla sponge cake layered with sweet vanilla cream and topped with fresh strawberries. Olive Garden marks it with its vegetarian (V) label.",
        "One slice costs $9.99 and has 540 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. Only Tiramisu has fewer calories among the regular desserts.",
        [
          "It is one of the fruit-based choices on the ",
          { text: "dessert menu", href: "/desserts" },
          ", along with the Sicilian Cheesecake with strawberry topping.",
        ],
      ],
    },
    ingredients: [
      { name: "Vanilla sponge cake", detail: "The cake layers." },
      { name: "Vanilla cream", detail: "Between the layers." },
      { name: "Strawberries", detail: "Fresh strawberries on top." },
    ],
    allergenFacts: ["Vanilla sponge cake with vanilla cream and fresh strawberries."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "A warm coffee next to a cool, creamy cake." },
      { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea", kind: "Drink", reason: "A fruity iced tea at 80 calories." },
      { offeringId: "classic-entrees--shrimp-scampi", kind: "Entrée", reason: "At 490 calories, a light main course before dessert." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "No added sugar next to a sweet slice." },
    ],
    relatedOfferingIds: ["desserts--tiramisu", "desserts--sicilian-cheesecake-with-strawberry-topping", "desserts--black-tie-mousse-cake"],
    compareHeading: "How Strawberry Cream Cake compares with other Olive Garden desserts",
    faqs: [
      {
        question: "Is Olive Garden Strawberry Cream Cake made with fresh strawberries?",
        answer: "Olive Garden’s menu describes the cake as topped with fresh strawberries, over layers of vanilla sponge cake and vanilla cream.",
      },
      {
        question: "Which is lighter, Strawberry Cream Cake or Sicilian Cheesecake?",
        answer:
          "Strawberry Cream Cake has 540 calories per slice and the Sicilian Cheesecake with strawberry topping has 730, according to Olive Garden’s U.S. nutrition guide.",
        link: { text: "Compare all desserts", href: "/desserts" },
      },
    ],
    related: DESSERT_RELATED,
  }),

  itemPage({
    slug: "sicilian-cheesecake-with-strawberry-topping",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["catering--sicilian-cheesecake"],
    primaryOfferingId: "desserts--sicilian-cheesecake-with-strawberry-topping",
    primaryKeyword: "olive garden sicilian cheesecake",
    secondaryKeywords: ["sicilian cheesecake price", "sicilian cheesecake calories", "olive garden cheesecake", "ricotta cheesecake"],
    h1: "Olive Garden Sicilian Cheesecake with Strawberry Topping",
    metaTitle: "Olive Garden Sicilian Cheesecake: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Sicilian Cheesecake with strawberry topping costs $9.79 a slice with 730 calories: a ricotta cheesecake on a shortbread crust. See nutrition.",
    servingSummary: "One dessert slice, with strawberry topping",
    servingBasis: "One dessert slice with strawberry topping, as served",
    unitLabel: "slice",
    priceSubject: "One slice",
    about: {
      heading: "About Olive Garden Sicilian Cheesecake",
      paragraphs: [
        "Olive Garden’s Sicilian Cheesecake is made with ricotta on a shortbread cookie crust and topped with strawberry sauce, which gives it a lighter, less dense texture than a classic cream cheese cheesecake. Olive Garden marks it with its vegetarian (V) label.",
        "One slice costs $9.79 and has 730 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide, with 12 g protein and 63 g sugars.",
        [
          "Olive Garden also lists a limited-time Pumpkin Cookie Butter Cheesecake on the ",
          { text: "dessert menu", href: "/desserts" },
          "; the Sicilian Cheesecake is the regular cheesecake choice.",
        ],
      ],
    },
    ingredients: [
      { name: "Ricotta cheesecake", detail: "The filling, lighter than a dense cheesecake." },
      { name: "Shortbread cookie crust", detail: "The base." },
      { name: "Strawberry sauce", detail: "The topping." },
    ],
    allergenFacts: ["Ricotta cheesecake on a shortbread cookie crust with strawberry topping."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "A classic coffee pairing for cheesecake." },
      { offeringId: ESPRESSO, kind: "Drink", reason: "A small, strong coffee next to a creamy slice." },
      { offeringId: "classic-entrees--spaghetti-with-marinara", kind: "Entrée", reason: "At 490 calories, a simple pasta before a rich dessert." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "No added sugar next to a sweet slice." },
    ],
    relatedOfferingIds: ["desserts--strawberry-cream-cake", "desserts--tiramisu", "desserts--black-tie-mousse-cake"],
    compareHeading: "How Sicilian Cheesecake compares with other Olive Garden desserts",
    faqs: [
      {
        question: "What makes Olive Garden’s cheesecake Sicilian?",
        answer:
          "Olive Garden describes it as a ricotta cheesecake on a shortbread cookie crust. Ricotta makes it lighter and less dense than a typical cream cheese cheesecake.",
      },
      {
        question: "Is the strawberry topping included?",
        answer: "Yes. The dessert is listed as Sicilian Cheesecake with Strawberry Topping, and the 730 calories are for the slice as served with its topping.",
      },
    ],
    related: DESSERT_RELATED,
  }),
];
