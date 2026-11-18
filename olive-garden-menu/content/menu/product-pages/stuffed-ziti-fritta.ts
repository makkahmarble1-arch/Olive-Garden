import type { ProductPageContent } from "@/lib/types";
import { pageStatus } from "./registry";

/**
 * Stuffed Ziti Fritta: Phase 1 item page, /menu/stuffed-ziti-fritta.
 * Shared data: appetizers--stuffed-ziti-fritta. Official rows:
 * p2-stuffed-ziti-fritta (+ add alfredo, add marinara) and a2-stuffed-ziti-fritta.
 * Fact log: research/products/stuffed-ziti-fritta/FACT_VERIFICATION.md.
 */

const ITEM_PAGE = "https://www.olivegarden.com/menu/stuffed-ziti-fritta/prod6580009";
const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";
const ALLERGEN_PDF = "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf";

export const stuffedZitiFrittaPage: ProductPageContent = {
  productId: "stuffed-ziti-fritta",
  slug: "stuffed-ziti-fritta",
  // Phase 1 batch: local development and testing only until the owner approves it.
  status: pageStatus("stuffed-ziti-fritta"),
  primaryOfferingId: "appetizers--stuffed-ziti-fritta",
  primaryKeyword: "olive garden stuffed ziti fritta",
  secondaryKeywords: ["stuffed ziti fritta price", "stuffed ziti fritta calories", "fried ziti", "ziti fritta sauces"],
  searchIntent:
    "A diner wants to know what Olive Garden's Stuffed Ziti Fritta is, its price, calories, both dipping sauces and allergen information.",
  metaTitle: "Olive Garden Stuffed Ziti Fritta: Price, Calories & Sauces",
  metaDescription:
    "Olive Garden Stuffed Ziti Fritta costs $9.99 with 500 calories per order: fried ziti with a five-cheese filling, alfredo and marinara. See nutrition and allergens.",
  h1: "Olive Garden Stuffed Ziti Fritta",
  summary:
    "Crispy fried ziti pasta stuffed with a five-cheese filling, served with two dipping sauces: creamy alfredo and classic marinara.",
  servingSummary: "One appetizer order, served with alfredo and marinara",
  contentReviewedAt: "2026-11-18",
  about: {
    heading: "About Olive Garden Stuffed Ziti Fritta",
    paragraphs: [
      "Stuffed Ziti Fritta turns a baked-pasta idea into a starter: ziti pasta is filled with a five-cheese blend and fried until crisp. It comes with two sauces for dipping, a creamy alfredo and a classic marinara.",
      "One order costs $9.99 and has 500 calories before the sauces, the fewest of Olive Garden’s fried and baked appetizers, based on the online pickup price we checked and the U.S. nutrition guide. The sauce choice matters: alfredo adds 220 calories and marinara adds 35, so the order with both comes to 755 calories.",
      [
        "If you like the cheese-and-pasta combination, the ",
        { text: "classic entrées", href: "/classic-entrees" },
        " include a full-size Five Cheese Ziti al Forno.",
      ],
      "Olive Garden does not mark Stuffed Ziti Fritta with its vegetarian (V) label on the online menu we checked. Its allergen guide marks it as containing dairy, eggs, wheat, gluten and soy, and as fried in soy oil.",
    ],
  },
  includes: [
    { label: "Alfredo sauce", detail: "A creamy alfredo for dipping comes with every order.", calories: 220 },
    { label: "Marinara sauce", detail: "A classic marinara is served alongside the alfredo.", calories: 35 },
  ],
  extraSauceOfferingId: "sides-sauces-and-extras--side-of-alfredo-sauce--large",
  nutrition: {
    // Official rows "p2-stuffed-ziti-fritta" (+ "add alfredo", "add marinara"), US_101926 pages 2-3.
    servingBasis: "One restaurant order, as served, without the dipping sauces",
  },
  ingredients: {
    completeness: "partial",
    items: [
      { name: "Ziti pasta", detail: "The pasta shell of the starter." },
      { name: "Five-cheese filling", detail: "Named in the menu description." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
      { name: "Alfredo and marinara", detail: "Both sauces are served on the side for dipping." },
    ],
    note: "This list only names components confirmed by Olive Garden’s menu description and allergen guide. Olive Garden does not publish a full recipe, so it is not a complete ingredient list.",
  },
  // Official marks: allergen-guide row "a2-stuffed-ziti-fritta" (US_101926, page 2).
  allergens: {
    facts: ["Made with cheese-filled ziti pasta and fried."],
    crossContact: ["Olive Garden says its kitchens do not have a separate fryer, so fried foods share cooking oil."],
  },
  dietary: [
    { label: "Vegetarian label", value: "Not marked (V) on the online menu", tone: "info" },
    { label: "Gluten-sensitive menu", value: "Not listed", tone: "caution" },
    { label: "Fryer", value: "Shared fryer (no separate fryer)", tone: "caution" },
  ],
  pairings: [
    {
      offeringId: "classic-entrees--five-cheese-ziti-al-forno",
      kind: "Entrée",
      reason: "The full-size baked version of the same cheese-and-ziti idea.",
    },
    {
      offeringId: "classic-entrees--chicken-parmigiana",
      kind: "Entrée",
      reason: "A classic main course that also pairs marinara with melted cheese.",
    },
    {
      offeringId: "soups-salad-and-breadsticks--famous-house-salad",
      kind: "Soup & salad",
      reason: "A crisp salad to balance the rich, cheesy starter.",
    },
    {
      offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea",
      kind: "Drink",
      reason: "A light fruit iced tea at 80 calories.",
    },
  ],
  relatedOfferingIds: [
    "appetizers--fried-mozzarella",
    "appetizers--lasagna-fritta",
    "appetizers--toasted-ravioli",
    "appetizers--spinach-artichoke-dip",
  ],
  compareHeading: "How Stuffed Ziti Fritta compares with other appetizers",
  compareOfferingIds: [
    "appetizers--stuffed-ziti-fritta",
    "appetizers--toasted-ravioli",
    "appetizers--calamari",
    "appetizers--fried-mozzarella",
    "appetizers--meatballs-parmigiana",
    "appetizers--lasagna-fritta",
    "appetizers--spinach-artichoke-dip",
    "appetizers--shrimp-fritto-misto",
  ],
  faqs: [
    {
      question: "How much is Stuffed Ziti Fritta at Olive Garden?",
      answer:
        "One order of Stuffed Ziti Fritta was $9.99 on Olive Garden’s online menu for pickup when we checked in November 2026. Prices may vary by location across the USA.",
    },
    {
      question: "How many calories are in Olive Garden Stuffed Ziti Fritta?",
      answer:
        "One order has 500 calories according to Olive Garden’s U.S. nutrition guide, with 26 g fat, 1,040 mg sodium and 27 g protein. Alfredo adds 220 calories and marinara adds 35, so the order with both sauces comes to 755 calories (our calculation).",
    },
    {
      question: "What is Stuffed Ziti Fritta?",
      answer: "It is ziti pasta stuffed with a five-cheese filling, fried until crisp, and served with alfredo and marinara for dipping.",
    },
    {
      question: "What allergens are in Olive Garden Stuffed Ziti Fritta?",
      answer:
        "Olive Garden’s U.S. allergen guide lists Stuffed Ziti Fritta as containing dairy, eggs, wheat, gluten and soy, and marks it as fried in soy oil. Tell your server about any allergy before ordering.",
    },
    {
      question: "Which Olive Garden appetizer has the fewest calories?",
      answer:
        "Among the fried and baked appetizers, Stuffed Ziti Fritta has the fewest calories at 500 per order before the dipping sauces. A single breadstick has 140.",
      link: { text: "Compare all appetizers", href: "/appetizers" },
    },
  ],
  sources: [
    { label: "Olive Garden: Stuffed Ziti Fritta (online menu)", url: ITEM_PAGE },
    { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
    { label: "Olive Garden allergen guide (PDF)", url: ALLERGEN_PDF },
  ],
  officialSource: { label: "Olive Garden: Stuffed Ziti Fritta", url: ITEM_PAGE },
  extraSource: { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
  related: [
    { categoryId: "appetizers", text: "Every Olive Garden starter with prices, calories and sauces." },
    { categoryId: "classic-entrees", text: "Five Cheese Ziti al Forno and other baked pastas." },
    { categoryId: "sides-sauces-and-extras", text: "Large sides of alfredo and marinara for extra dipping." },
    { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
  ],
  checklist: {
    verifiedProductInfo: "done",
    uniqueSearchIntent: "done",
    nutritionAndAllergens: "done",
    originalContent: "done",
    accurateImage: "done",
    internalLinks: "done",
    visualReview: "done",
  },
  ownerApprovedAt: "2026-11-18",
};
