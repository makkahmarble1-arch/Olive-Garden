import type { ProductPageContent } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Phase 1 batch 2 (2026-11-18): remaining appetizers with an accurate photo.
 * Not built (photo does not match the official dish, research/products/PENDING.md):
 * Meatballs Parmigiana (photo shows 4 meatballs, official order has 5),
 * Shrimp Fritto Misto (photo shows zucchini and rings, only one sauce).
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
export const appetizerPages: ProductPageContent[] = [
  itemPage({
    slug: "lasagna-fritta",
    primaryOfferingId: "appetizers--lasagna-fritta",
    primaryKeyword: "olive garden lasagna fritta",
    secondaryKeywords: ["lasagna fritta price", "lasagna fritta calories", "fried lasagna olive garden"],
    metaTitle: "Olive Garden Lasagna Fritta: Price, Calories & What It Is",
    metaDescription:
      "Olive Garden Lasagna Fritta costs $11.79 with 1,130 calories per order: fried, parmesan-breaded lasagna with meat sauce and alfredo. See nutrition and allergens.",
    servingSummary: "One appetizer order, topped with meat sauce, with alfredo",
    servingBasis: "One restaurant order, as served",
    about: {
      heading: "About Olive Garden Lasagna Fritta",
      paragraphs: [
        "Lasagna Fritta turns Olive Garden’s lasagna into a crunchy starter: pieces of lasagna are coated in a parmesan breading and fried, then topped with parmesan and a meat sauce made with beef and Italian sausage, and served with creamy alfredo.",
        "One order costs $11.79 and has 1,130 calories as served, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The nutrition guide lists it as a single row, so the sauces are not counted separately.",
        [
          "It is one of the richer starters on the ",
          { text: "appetizers menu", href: "/appetizers" },
          ", with 39 g protein and 1,800 mg sodium per order, so it works best shared before a lighter main course.",
        ],
      ],
    },
    ingredients: [
      { name: "Lasagna", detail: "Cut into pieces, the base of the starter." },
      { name: "Parmesan breading", detail: "Coats the lasagna before frying." },
      { name: "Meat sauce", detail: "Beef and Italian sausage, spooned on top." },
      { name: "Alfredo", detail: "Served with the starter." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
    ],
    allergenFacts: ["Made with breaded lasagna, a beef and Italian sausage meat sauce and alfredo, and fried."],
    pairings: [
      {
        offeringId: "soups-salad-and-breadsticks--famous-house-salad",
        kind: "Soup & salad",
        reason: "A crisp salad balances a rich, cheesy fried starter.",
      },
      {
        offeringId: "classic-entrees--shrimp-scampi",
        kind: "Entrée",
        reason: "At 490 calories, one of the lighter entrées to follow a big appetizer.",
      },
      {
        offeringId: "classic-entrees--herb-grilled-salmon",
        kind: "Entrée",
        reason: "A grilled main course after a fried starter.",
      },
      {
        offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea",
        kind: "Drink",
        reason: "A zero-calorie drink next to a 1,130-calorie starter.",
      },
    ],
    relatedOfferingIds: ["appetizers--fried-mozzarella", "appetizers--stuffed-ziti-fritta", "appetizers--toasted-ravioli", "appetizers--meatballs-parmigiana"],
    compareHeading: "How Lasagna Fritta compares with other fried starters",
    faqs: [
      {
        question: "What is Olive Garden Lasagna Fritta?",
        answer:
          "It is lasagna coated in parmesan breading and fried, topped with parmesan and a beef and Italian sausage meat sauce, and served with creamy alfredo.",
      },
      {
        question: "Is Lasagna Fritta a meat-free appetizer?",
        answer: "No. Its meat sauce is made with beef and Italian sausage, according to Olive Garden’s menu description.",
      },
    ],
    related: [
      { categoryId: "appetizers", text: "Every Olive Garden starter with prices, calories and sauces." },
      { categoryId: "classic-entrees", text: "Lasagna Classico and other entrées to follow your appetizer." },
      { categoryId: "lighter-portions", text: "Smaller entrées if you start with a rich appetizer." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),

  itemPage({
    slug: "spinach-artichoke-dip",
    primaryOfferingId: "appetizers--spinach-artichoke-dip",
    sizeOfferingIds: ["catering--spinach-artichoke-dip"],
    primaryKeyword: "olive garden spinach artichoke dip",
    secondaryKeywords: ["spinach artichoke dip price", "spinach artichoke dip calories", "flatbread crisps", "spinach dip catering"],
    metaTitle: "Olive Garden Spinach-Artichoke Dip: Price, Calories & Size",
    metaDescription:
      "Olive Garden Spinach-Artichoke Dip costs $11.49 with 1,160 calories per order, including flatbread crisps. See the catering size, nutrition and allergens.",
    servingSummary: "One appetizer order, with flatbread crisps",
    servingBasis: "One restaurant order with flatbread crisps, as served",
    about: {
      heading: "About Olive Garden Spinach-Artichoke Dip",
      paragraphs: [
        "Olive Garden’s Spinach-Artichoke Dip is a warm, cheesy blend of spinach and artichokes, served with crisp flatbread crisps for scooping. It is built to be shared at the table.",
        "One order costs $11.49 and has 1,160 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide, which counts the flatbread crisps in the same row.",
        [
          "For a group, the ",
          { text: "catering menu", href: "/catering" },
          " sells the dip as a pan for 4 to 6 guests with flatbread crisps; both sizes are compared below.",
        ],
        "The allergen guide marks it as containing dairy, wheat and gluten, and marks it as fried in soy oil (the guide does not say which part is fried).",
      ],
    },
    ingredients: [
      { name: "Spinach", detail: "Named in the dish and its description." },
      { name: "Artichokes", detail: "Named in the dish and its description." },
      { name: "Cheese", detail: "The dip is described as warm and cheesy." },
      { name: "Flatbread crisps", detail: "Served with the dip for scooping." },
    ],
    allergenFacts: ["A warm, cheesy spinach and artichoke dip served with flatbread crisps."],
    pairings: [
      {
        offeringId: "classic-entrees--grilled-chicken-margherita",
        kind: "Entrée",
        reason: "A fresh, tomato-and-basil chicken dish after a creamy dip.",
      },
      {
        offeringId: "classic-entrees--spaghetti-with-marinara",
        kind: "Entrée",
        reason: "A simple marinara pasta, marked (V) by Olive Garden.",
      },
      {
        offeringId: "soups-salad-and-breadsticks--homemade-soups",
        kind: "Soup & salad",
        reason: "A cup of soup to round out a shared starter.",
      },
      {
        offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata",
        kind: "Drink",
        reason: "A sparkling fruit drink with a rich, cheesy dip.",
      },
    ],
    relatedOfferingIds: ["appetizers--fried-mozzarella", "appetizers--dipping-sauces-with-breadsticks", "appetizers--calamari", "appetizers--lasagna-fritta"],
    compareHeading: "How Spinach-Artichoke Dip compares with other shareable starters",
    faqs: [
      {
        question: "What comes with Olive Garden Spinach-Artichoke Dip?",
        answer: "It is served with flatbread crisps for scooping, and the 1,160 calories include them.",
      },
      {
        question: "Can I order Spinach-Artichoke Dip for a party?",
        answer: "Yes. The catering menu lists a Spinach-Artichoke Dip pan for 4 to 6 guests, with flatbread crisps.",
        link: { text: "See the catering menu", href: "/catering" },
      },
    ],
    related: [
      { categoryId: "appetizers", text: "Every Olive Garden starter with prices, calories and sauces." },
      { categoryId: "catering", text: "The Spinach-Artichoke Dip pan and other party trays." },
      { categoryId: "classic-entrees", text: "Entrées to follow a shared starter." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),
];
