import type { ProductPageContent } from "@/lib/types";
import { pageStatus } from "./registry";

/**
 * Breadsticks: Phase 1 item page, /menu/breadsticks.
 * Shared data: appetizers--breadsticks (options: 6 or 12, baked or unbaked).
 * Official rows: p3-breadstick-with-garlic-topping-1-ea (per breadstick),
 * plain breadstick p4 (130, mentioned in the text), allergens
 * a2-breadstick-with-garlic-topping. Values are per breadstick.
 * Fact log: research/products/breadsticks/FACT_VERIFICATION.md.
 */

const ITEM_PAGE = "https://www.olivegarden.com/menu/breadsticks-v/prod840053";
const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";
const ALLERGEN_PDF = "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf";

export const breadsticksPage: ProductPageContent = {
  productId: "breadsticks",
  slug: "breadsticks",
  // Phase 1 batch: local development and testing only until the owner approves it.
  status: pageStatus("breadsticks"),
  primaryOfferingId: "appetizers--breadsticks",
  primaryKeyword: "olive garden breadsticks",
  secondaryKeywords: ["breadsticks price", "breadstick calories", "dozen breadsticks", "unbaked breadsticks", "breadsticks to go"],
  searchIntent:
    "A diner wants the price of 6 or 12 Olive Garden breadsticks, calories per breadstick, the bake-at-home option and allergen information.",
  metaTitle: "Olive Garden Breadsticks: Price, Calories & Bake-at-Home",
  metaDescription:
    "Olive Garden Breadsticks cost $4.99 for 6 or $7.29 for 12, with 140 calories per breadstick. See the bake-at-home option, nutrition and allergens.",
  h1: "Olive Garden Breadsticks",
  summary:
    "Soft, warm breadsticks brushed with a garlic topping, sold by the half dozen or dozen, freshly baked or ready to bake at home.",
  servingSummary: "Sold by 6 or 12, baked or unbaked to bake at home",
  unitLabel: "breadstick",
  priceNote: "6 breadsticks, online pickup",
  contentReviewedAt: "2026-11-18",
  about: {
    heading: "About Olive Garden Breadsticks",
    paragraphs: [
      "Olive Garden’s breadsticks are soft, warm and brushed with a garlic topping. On the to-go menu you can buy them by the half dozen or the dozen, either freshly baked or unbaked to finish in your own oven.",
      "Six breadsticks cost $4.99 and twelve cost $7.29 in our November 2026 check of the online pickup menu, whether baked or unbaked. Each breadstick with garlic topping has 140 calories in Olive Garden’s U.S. nutrition guide; a plain breadstick without the topping has 130.",
      [
        "Breadsticks also come with many meals: Olive Garden’s classic entrées include soup or salad and two breadsticks, and so does the ",
        { text: "Famous House Salad", href: "/soups-salad-and-breadsticks" },
        ". For dipping, the appetizer menu offers Dipping Sauces with Breadsticks.",
      ],
      "Olive Garden marks its breadsticks with its vegetarian (V) label. The allergen guide lists them as containing wheat, gluten and soy; they are not marked as fried or grilled.",
    ],
  },
  includes: [],
  extraSauceOfferingId: "sides-sauces-and-extras--side-of-marinara-sauce--large",
  nutrition: {
    // Official row "p3-breadstick-with-garlic-topping-1-ea", US_101926 page 3.
    servingBasis: "One breadstick with garlic topping, as served",
  },
  ingredients: {
    completeness: "partial",
    items: [
      { name: "Bread dough", detail: "Baked into soft breadsticks." },
      { name: "Garlic topping", detail: "Brushed on top, as the menu and nutrition guide describe." },
    ],
    note: "This list only names components confirmed by Olive Garden’s menu description and nutrition guide. Olive Garden does not publish a full recipe, so it is not a complete ingredient list.",
  },
  // Official marks: allergen-guide row "a2-breadstick-with-garlic-topping" (US_101926, page 2).
  allergens: {
    facts: ["Baked breadsticks with a garlic topping."],
    crossContact: ["Olive Garden kitchens share preparation areas, so cross-contact with other foods is possible."],
  },
  dietary: [
    { label: "Vegetarian label", value: "Marked (V) on Olive Garden’s online menu", tone: "info" },
    { label: "Preparation", value: "Not marked as fried or grilled in the allergen guide", tone: "info" },
    { label: "Gluten-sensitive menu", value: "Not listed (contains wheat and gluten)", tone: "caution" },
  ],
  pairings: [
    {
      offeringId: "classic-entrees--fettuccine-alfredo",
      kind: "Entrée",
      reason: "Breadsticks are a natural partner for a creamy alfredo.",
    },
    {
      offeringId: "classic-entrees--spaghetti-with-marinara",
      kind: "Entrée",
      reason: "A simple marinara pasta, also marked (V) by Olive Garden.",
    },
    {
      offeringId: "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
      kind: "Side",
      reason: "A large five cheese marinara for dipping at home.",
    },
    {
      offeringId: "non-alcoholic-beverages--classic-lemonade",
      kind: "Drink",
      reason: "A classic lemonade to go with a breadstick snack.",
    },
  ],
  relatedOfferingIds: [
    "appetizers--dipping-sauces-with-breadsticks",
    "soups-salad-and-breadsticks--famous-house-salad",
    "soups-salad-and-breadsticks--homemade-soups",
    "appetizers--fried-mozzarella",
  ],
  faqs: [
    {
      question: "How much are Olive Garden breadsticks?",
      answer:
        "On Olive Garden’s online menu for pickup, 6 breadsticks were $4.99 and 12 were $7.29 when we checked in November 2026, baked or unbaked. Prices may vary by location across the USA.",
    },
    {
      question: "How many calories are in an Olive Garden breadstick?",
      answer:
        "One breadstick with garlic topping has 140 calories according to Olive Garden’s U.S. nutrition guide, with 460 mg sodium and 4 g protein. A plain breadstick has 130. Six breadsticks come to 840 calories and twelve to 1,680 (our calculation).",
    },
    {
      question: "Can I bake Olive Garden breadsticks at home?",
      answer: "Yes. The online menu offers 6 or 12 unbaked breadsticks to bake at home, at the same prices as the baked ones.",
    },
    {
      question: "Do Olive Garden entrées come with breadsticks?",
      answer: "Olive Garden’s online menu lists classic entrées with soup or salad and two breadsticks, and the Famous House Salad also includes two breadsticks.",
      link: { text: "See the classic entrées", href: "/classic-entrees" },
    },
    {
      question: "What allergens are in Olive Garden breadsticks?",
      answer:
        "Olive Garden’s U.S. allergen guide lists the breadstick with garlic topping as containing wheat, gluten and soy. Tell your server about any allergy before ordering.",
    },
  ],
  sources: [
    { label: "Olive Garden: Breadsticks (online menu)", url: ITEM_PAGE },
    { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
    { label: "Olive Garden allergen guide (PDF)", url: ALLERGEN_PDF },
  ],
  officialSource: { label: "Olive Garden: Breadsticks", url: ITEM_PAGE },
  extraSource: { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
  related: [
    { categoryId: "soups-salad-and-breadsticks", text: "Soups, the house salad and breadsticks with prices and calories." },
    { categoryId: "appetizers", text: "Every Olive Garden starter, including Dipping Sauces with Breadsticks." },
    { categoryId: "catering", text: "Breadsticks by the dozen for parties and events." },
    { categoryId: "classic-entrees", text: "Entrées that come with soup or salad and two breadsticks." },
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
