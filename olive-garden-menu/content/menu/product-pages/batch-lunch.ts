import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Phase 5 (2026-11-18): weekday lunch sandwich and flatbreads with a single
 * official row and an accurate photo (checked visually 2026-11-18).
 * Pending (research/products/PENDING.md): Italian Grilled Chicken Sandwich
 * (photo differs). Chicken Parmigiana Sandwich has two versions (Phase 4,
 * version-aware layout, owner approval needed).
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const LUNCH_RELATED: RelatedMenuRef[] = [
  { categoryId: "lunch-menu", text: "Every weekday lunch item with prices and calories." },
  { categoryId: "soups-salad-and-breadsticks", text: "The weekday soup, salad and breadsticks lunch." },
  { categoryId: "lighter-portions", text: "Smaller pasta portions after lunch hours." },
  { guide: "hours", text: "When the lunch menu is served." },
];
const LUNCH_TIME = "Olive Garden lists it on the weekday lunch menu, served Monday to Friday until 3 PM at the restaurant we checked. Lunch hours can vary by location.";
const FLATBREADS = ["lunch-menu--five-cheese-flatbread", "lunch-menu--classic-pepperoni-flatbread", "lunch-menu--chicken-alfredo-flatbread"];
const LEMONADE = "non-alcoholic-beverages--classic-lemonade";
const UNSWEET_TEA = "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea";
const LUNCH_SOUP_SALAD = "lunch-menu--soup-salad-and-breadsticks-lunch";

const lunchFaq = (name: string) => ({
  question: `When can you order the ${name} at Olive Garden?`,
  answer: LUNCH_TIME,
  link: { text: "See Olive Garden hours", href: "/hours" },
});

export const lunchPages: ProductPageContent[] = [
  itemPage({
    slug: "eggplant-parmigiana-sandwich",
    primaryOfferingId: "lunch-menu--eggplant-parmigiana-sandwich",
    primaryKeyword: "olive garden eggplant parmigiana sandwich",
    secondaryKeywords: ["eggplant parm sandwich price", "eggplant parmigiana sandwich calories", "olive garden lunch sandwich"],
    metaTitle: "Olive Garden Eggplant Parmigiana Sandwich: Price & Calories",
    metaDescription:
      "The Olive Garden Eggplant Parmigiana Sandwich costs $9.99 with 980 calories, served with french fries at weekday lunch. See nutrition, allergens and FAQs.",
    servingSummary: "One sandwich with french fries (weekday lunch)",
    servingBasis: "One sandwich with french fries, as served",
    unitLabel: "sandwich",
    priceSubject: "One sandwich",
    about: {
      heading: "About the Eggplant Parmigiana Sandwich",
      paragraphs: [
        "The Eggplant Parmigiana Sandwich is one of Olive Garden’s weekday lunch sandwiches: hand-breaded fried eggplant with melted mozzarella and marinara on a toasted garlic knot bun, served with french fries.",
        "It costs $9.99 and has 980 calories with the fries, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The nutrition guide lists the sandwich and fries as one row.",
        [
          "If you prefer pasta, the ",
          { text: "lunch menu", href: "/lunch-menu" },
          " also has a lunch-size Eggplant Parmigiana plate. Both are compared below.",
        ],
      ],
    },
    ingredients: [
      { name: "Eggplant", detail: "Hand-breaded and fried." },
      { name: "Mozzarella", detail: "Melted on top." },
      { name: "Marinara", detail: "Tomato sauce on the eggplant." },
      { name: "Garlic knot bun", detail: "Toasted." },
      { name: "French fries", detail: "Served on the side." },
    ],
    allergenFacts: ["Fried, breaded eggplant with mozzarella and marinara on a garlic knot bun, with french fries."],
    pairings: [
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a hot sandwich." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert, if you want something sweet." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Add a vegetable side to the meal." },
    ],
    relatedOfferingIds: ["lunch-menu--eggplant-parmigiana", ...FLATBREADS],
    compareHeading: "How the Eggplant Parmigiana Sandwich compares with other lunch items",
    faqs: [
      lunchFaq("Eggplant Parmigiana Sandwich"),
      {
        question: "Does the Eggplant Parmigiana Sandwich come with fries?",
        answer: "Yes. Olive Garden serves it with french fries, and the 980 calories in the nutrition guide include the fries.",
      },
      {
        question: "Is the sandwich or the lunch Eggplant Parmigiana lighter?",
        answer:
          "The lunch-size Eggplant Parmigiana plate has 660 calories and the sandwich with fries has 980, according to Olive Garden’s nutrition guide. Both prices are in the comparison table below.",
        link: { text: "See the lunch menu", href: "/lunch-menu" },
      },
    ],
    related: LUNCH_RELATED,
  }),

  itemPage({
    slug: "chicken-alfredo-flatbread",
    primaryOfferingId: "lunch-menu--chicken-alfredo-flatbread",
    primaryKeyword: "olive garden chicken alfredo flatbread",
    secondaryKeywords: ["chicken alfredo flatbread price", "chicken alfredo flatbread calories", "olive garden flatbread"],
    metaTitle: "Olive Garden Chicken Alfredo Flatbread: Price & Calories",
    metaDescription:
      "The Olive Garden Chicken Alfredo Flatbread costs $10.99 with 920 calories and 55 g protein, a weekday lunch item. See nutrition, allergens and the other flatbreads.",
    servingSummary: "One flatbread (weekday lunch)",
    servingBasis: "One flatbread, as served",
    unitLabel: "flatbread",
    priceSubject: "One flatbread",
    about: {
      heading: "About the Chicken Alfredo Flatbread",
      paragraphs: [
        "The Chicken Alfredo Flatbread is a flatbread pizza topped with Olive Garden’s signature alfredo sauce, chicken, roasted red peppers and melted mozzarella, offered on the weekday lunch menu.",
        "It costs $10.99 and has 920 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. With 55 g protein it has the most protein of the three lunch flatbreads, and also the most calories.",
        [
          "The ",
          { text: "lunch menu", href: "/lunch-menu" },
          " also lists a Five Cheese and a Classic Pepperoni flatbread at a lower price; all three are compared below.",
        ],
      ],
    },
    ingredients: [
      { name: "Flatbread", detail: "The base." },
      { name: "Alfredo sauce", detail: "Olive Garden’s signature alfredo." },
      { name: "Chicken", detail: "On top of the sauce." },
      { name: "Roasted red peppers", detail: "Topping." },
      { name: "Mozzarella", detail: "Melted on top." },
    ],
    allergenFacts: ["Flatbread with alfredo sauce, chicken, roasted red peppers and mozzarella."],
    pairings: [
      { offeringId: "lunch-menu--soup-salad-and-breadsticks-lunch", kind: "Soup & salad", reason: "The weekday soup and salad lunch, if you are sharing." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata", kind: "Drink", reason: "A fruity limonata with a creamy flatbread." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity dessert after a rich lunch." },
    ],
    relatedOfferingIds: ["lunch-menu--five-cheese-flatbread", "lunch-menu--classic-pepperoni-flatbread", "lunch-menu--eggplant-parmigiana-sandwich"],
    compareHeading: "How the Chicken Alfredo Flatbread compares with other lunch items",
    faqs: [
      lunchFaq("Chicken Alfredo Flatbread"),
      {
        question: "Which Olive Garden flatbread has the most protein?",
        answer:
          "The Chicken Alfredo Flatbread, with 55 g protein. The Classic Pepperoni Flatbread has 26 g and the Five Cheese Flatbread 23 g, according to Olive Garden’s U.S. nutrition guide.",
      },
    ],
    related: LUNCH_RELATED,
  }),

  itemPage({
    slug: "five-cheese-flatbread",
    primaryOfferingId: "lunch-menu--five-cheese-flatbread",
    primaryKeyword: "olive garden five cheese flatbread",
    secondaryKeywords: ["five cheese flatbread price", "five cheese flatbread calories", "olive garden cheese flatbread"],
    metaTitle: "Olive Garden Five Cheese Flatbread: Price & Calories",
    metaDescription:
      "The Olive Garden Five Cheese Flatbread costs $9.99 with 510 calories, the lightest lunch flatbread. See nutrition, allergens and how it compares.",
    servingSummary: "One flatbread (weekday lunch)",
    servingBasis: "One flatbread, as served",
    unitLabel: "flatbread",
    priceSubject: "One flatbread",
    about: {
      heading: "About the Five Cheese Flatbread",
      paragraphs: [
        "The Five Cheese Flatbread is the simplest of Olive Garden’s weekday lunch flatbreads: a flatbread pizza topped with five cheese marinara and melted mozzarella.",
        "It costs $9.99 and has 510 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. That is the fewest calories of the three lunch flatbreads.",
        [
          "Compare it with the pepperoni and chicken alfredo flatbreads below, or see every weekday item on the ",
          { text: "lunch menu", href: "/lunch-menu" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Flatbread", detail: "The base." },
      { name: "Five cheese marinara", detail: "The sauce." },
      { name: "Mozzarella", detail: "Melted on top." },
    ],
    allergenFacts: ["Flatbread with five cheese marinara and mozzarella."],
    pairings: [
      { offeringId: LUNCH_SOUP_SALAD, kind: "Soup & salad", reason: "Soup, salad and breadsticks round out a lighter lunch." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Add grilled chicken for more protein." },
      { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea", kind: "Drink", reason: "A fruity iced tea at 80 calories." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["lunch-menu--classic-pepperoni-flatbread", "lunch-menu--chicken-alfredo-flatbread", "lunch-menu--eggplant-parmigiana-sandwich"],
    compareHeading: "How the Five Cheese Flatbread compares with other lunch items",
    faqs: [
      lunchFaq("Five Cheese Flatbread"),
      {
        question: "Which Olive Garden lunch flatbread has the fewest calories?",
        answer:
          "The Five Cheese Flatbread, with 510 calories. The Classic Pepperoni Flatbread has 560 and the Chicken Alfredo Flatbread 920, according to Olive Garden’s U.S. nutrition guide.",
      },
    ],
    related: LUNCH_RELATED,
  }),

  itemPage({
    slug: "classic-pepperoni-flatbread",
    primaryOfferingId: "lunch-menu--classic-pepperoni-flatbread",
    primaryKeyword: "olive garden pepperoni flatbread",
    secondaryKeywords: ["classic pepperoni flatbread price", "pepperoni flatbread calories", "olive garden pizza"],
    h1: "Olive Garden Classic Pepperoni Flatbread",
    metaTitle: "Olive Garden Classic Pepperoni Flatbread: Price & Calories",
    metaDescription:
      "The Olive Garden Classic Pepperoni Flatbread costs $9.99 with 560 calories: marinara, mozzarella and pepperoni, a weekday lunch item. See nutrition and allergens.",
    servingSummary: "One flatbread (weekday lunch)",
    servingBasis: "One flatbread, as served",
    unitLabel: "flatbread",
    priceSubject: "One flatbread",
    about: {
      heading: "About the Classic Pepperoni Flatbread",
      paragraphs: [
        "The Classic Pepperoni Flatbread is a flatbread pizza topped with marinara sauce, mozzarella cheese and pepperoni, offered on Olive Garden’s weekday lunch menu.",
        "It costs $9.99 and has 560 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide, with 26 g protein and 1,470 mg sodium.",
        [
          "It sits between the Five Cheese (510 calories) and Chicken Alfredo (920 calories) flatbreads; see all three on the ",
          { text: "lunch menu", href: "/lunch-menu" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Flatbread", detail: "The base." },
      { name: "Marinara", detail: "Tomato sauce." },
      { name: "Mozzarella", detail: "Melted cheese." },
      { name: "Pepperoni", detail: "Topping." },
    ],
    allergenFacts: ["Flatbread with marinara, mozzarella and pepperoni."],
    pairings: [
      { offeringId: LUNCH_SOUP_SALAD, kind: "Soup & salad", reason: "Soup, salad and breadsticks to share with a flatbread." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with pizza." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert, if you want something sweet." },
    ],
    relatedOfferingIds: ["lunch-menu--five-cheese-flatbread", "lunch-menu--chicken-alfredo-flatbread", "lunch-menu--eggplant-parmigiana-sandwich"],
    compareHeading: "How the Classic Pepperoni Flatbread compares with other lunch items",
    faqs: [
      lunchFaq("Classic Pepperoni Flatbread"),
      {
        question: "Is the Olive Garden pepperoni flatbread a pizza?",
        answer:
          "Olive Garden describes it as a flatbread pizza: a flatbread topped with marinara, mozzarella and pepperoni. It is sold as one flatbread on the weekday lunch menu.",
      },
    ],
    related: LUNCH_RELATED,
  }),
];
