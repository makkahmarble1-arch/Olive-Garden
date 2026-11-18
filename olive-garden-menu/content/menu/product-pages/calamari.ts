import type { ProductPageContent } from "@/lib/types";
import { pageStatus } from "./registry";

/**
 * Calamari: Phase 1 item page, /menu/calamari (docs/product-pages/PRODUCT_DEVELOPMENT_PLAN.md).
 * Price, calories, image, category and rating come from the shared data
 * (appetizers--calamari); full nutrition and allergens from the central
 * official rows p2-calamari (+ add marinara, add spicy ranch) and a2-calamari.
 * Fact log: research/products/calamari/FACT_VERIFICATION.md.
 */

const ITEM_PAGE = "https://www.olivegarden.com/menu/calamari/prod600045";
const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";
const ALLERGEN_PDF = "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf";

export const calamariPage: ProductPageContent = {
  productId: "calamari",
  slug: "calamari",
  // Phase 1 batch: local development and testing only until the owner approves it.
  status: pageStatus("calamari"),
  primaryOfferingId: "appetizers--calamari",
  primaryKeyword: "olive garden calamari",
  secondaryKeywords: ["calamari price", "calamari calories", "calamari sauce", "fried calamari", "calamari allergens"],
  searchIntent:
    "A diner wants the price, calories, both dipping sauces, nutrition and shellfish/mollusk allergen information for Olive Garden's Calamari before ordering.",
  metaTitle: "Olive Garden Calamari: Price, Calories & Dipping Sauces",
  metaDescription:
    "Olive Garden Calamari costs $13.29 with 670 calories per order, served with marinara and spicy ranch. See nutrition, allergens and what to pair it with.",
  h1: "Olive Garden Calamari",
  summary:
    "Tender calamari in a light breading, fried until crisp and served with two dipping sauces: marinara and a spicy ranch.",
  servingSummary: "One appetizer order, served with marinara and spicy ranch",
  contentReviewedAt: "2026-11-18",
  about: {
    heading: "About Olive Garden Calamari",
    paragraphs: [
      "Olive Garden’s Calamari is lightly breaded and fried until crisp. Every order comes with two dipping sauces side by side: a classic marinara and a spicy ranch.",
      "One order costs $13.29 and has 670 calories before the sauces, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The sauces make a real difference: marinara adds 35 calories and the spicy ranch adds 240, so the order with both comes to 945 calories.",
      [
        "Calamari is one of two seafood starters on the ",
        { text: "appetizers menu", href: "/appetizers" },
        ", next to Shrimp Fritto Misto. Olive Garden does not state a piece count or how many people one order serves.",
      ],
      "Olive Garden’s allergen guide marks Calamari as containing mollusk (squid is a mollusk), dairy, eggs, wheat, gluten and soy, and as fried in soy oil in shared fryers. Read the allergen section before ordering if you have a food allergy.",
    ],
  },
  includes: [
    { label: "Marinara sauce", detail: "A cup of marinara for dipping comes with every order.", calories: 35 },
    { label: "Spicy ranch", detail: "A creamy spicy ranch is served alongside the marinara.", calories: 240 },
  ],
  extraSauceOfferingId: "sides-sauces-and-extras--side-of-marinara-sauce--large",
  nutrition: {
    // Official rows "p2-calamari" (+ "add marinara", "add spicy ranch"), US_101926 page 2.
    servingBasis: "One restaurant order, as served, without the dipping sauces",
  },
  ingredients: {
    completeness: "partial",
    items: [
      { name: "Calamari", detail: "The main ingredient; the allergen guide marks it as a mollusk." },
      { name: "Light breading", detail: "The calamari is lightly breaded before frying." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
      { name: "Marinara sauce", detail: "Served on the side for dipping." },
      { name: "Spicy ranch", detail: "Served on the side for dipping." },
    ],
    note: "This list only names components confirmed by Olive Garden’s menu description and allergen guide. Olive Garden does not publish a full recipe, so it is not a complete ingredient list.",
  },
  // Official marks: allergen-guide row "a2-calamari" (US_101926, page 2).
  allergens: {
    facts: ["Made with lightly breaded calamari (squid) and fried."],
    crossContact: ["Olive Garden says its kitchens do not have a separate fryer, so fried foods share cooking oil."],
  },
  dietary: [
    { label: "Seafood", value: "Calamari (squid); mollusk is marked in the allergen guide", tone: "caution" },
    { label: "Gluten-sensitive menu", value: "Not listed", tone: "caution" },
    { label: "Fryer", value: "Shared fryer (no separate fryer)", tone: "caution" },
  ],
  pairings: [
    {
      offeringId: "classic-entrees--shrimp-scampi",
      kind: "Entrée",
      reason: "Keeps the seafood theme, and at 490 calories it is one of the lighter dinner entrées.",
    },
    {
      offeringId: "classic-entrees--herb-grilled-salmon",
      kind: "Entrée",
      reason: "A grilled seafood main course to follow a fried starter.",
    },
    {
      offeringId: "soups-salad-and-breadsticks--famous-house-salad",
      kind: "Soup & salad",
      reason: "A fresh, crisp salad to balance the fried calamari.",
    },
    {
      offeringId: "non-alcoholic-beverages--raspberry-lemonade",
      kind: "Drink",
      reason: "A fruity lemonade to go with the spicy ranch.",
    },
  ],
  relatedOfferingIds: [
    "appetizers--shrimp-fritto-misto",
    "appetizers--fried-mozzarella",
    "appetizers--toasted-ravioli",
    "appetizers--stuffed-ziti-fritta",
  ],
  compareHeading: "How Calamari compares with other appetizers",
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
      question: "How much is Calamari at Olive Garden?",
      answer:
        "One order of Calamari was $13.29 on Olive Garden’s online menu for pickup when we checked in November 2026. Prices may vary by location across the USA.",
    },
    {
      question: "How many calories are in Olive Garden Calamari?",
      answer:
        "One order has 670 calories according to Olive Garden’s U.S. nutrition guide, with 42 g fat, 1,600 mg sodium and 24 g protein. Marinara adds 35 calories and spicy ranch adds 240, so the order with both sauces comes to 945 calories (our calculation).",
    },
    {
      question: "What sauces come with Olive Garden Calamari?",
      answer: "It comes with two dipping sauces: marinara (35 calories) and spicy ranch (240 calories). A large side of marinara is also sold separately.",
      link: { text: "See sides and sauces", href: "/sides-sauces-and-extras" },
    },
    {
      question: "Is Olive Garden Calamari a shellfish allergy risk?",
      answer:
        "Olive Garden’s U.S. allergen guide marks Calamari as containing mollusk, plus dairy, eggs, wheat, gluten and soy, and as fried in soy oil. It does not mark crustacean shellfish, but shared fryers mean cross-contact is possible, so tell your server about any allergy.",
    },
    {
      question: "How many people does Olive Garden Calamari serve?",
      answer: "Olive Garden does not state a piece count or a number of servings for the Calamari appetizer.",
    },
  ],
  sources: [
    { label: "Olive Garden: Calamari (online menu)", url: ITEM_PAGE },
    { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
    { label: "Olive Garden allergen guide (PDF)", url: ALLERGEN_PDF },
    { label: "Olive Garden food allergies", url: "https://www.olivegarden.com/nutrition/food-allergies" },
  ],
  officialSource: { label: "Olive Garden: Calamari", url: ITEM_PAGE },
  extraSource: { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
  related: [
    { categoryId: "appetizers", text: "Every Olive Garden starter with prices, calories and sauces." },
    { categoryId: "classic-entrees", text: "Seafood and pasta entrées to follow your appetizer." },
    { categoryId: "sides-sauces-and-extras", text: "Large sides of marinara for extra dipping." },
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
