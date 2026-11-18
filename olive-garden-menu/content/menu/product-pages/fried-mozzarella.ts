import type { ProductPageContent } from "@/lib/types";
import { pageStatus } from "./registry";

/**
 * Fried Mozzarella: the first (sample) menu item page, /menu/fried-mozzarella.
 * Price, calories, serving size, image, category and rating are read from the
 * shared data (appetizers--fried-mozzarella, catering--fried-mozzarella,
 * products.ts). Every fact below is logged with its source in
 * research/products/fried-mozzarella/FACT_VERIFICATION.md.
 * Numbers in the text must match the shared data (checked by validation).
 */

const ITEM_PAGE = "https://www.olivegarden.com/menu/fried-mozzarella/prod2350153";
const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";
const ALLERGEN_PDF = "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf";

export const friedMozzarellaPage: ProductPageContent = {
  productId: "fried-mozzarella",
  slug: "fried-mozzarella",
  // Published 2026-11-18 after owner approval (design, data) and passing checks.
  // Indexing stays off until SITE_INDEXING=true at launch (owner decision).
  status: pageStatus("fried-mozzarella"),
  primaryOfferingId: "appetizers--fried-mozzarella",
  sizeOfferingIds: ["catering--fried-mozzarella"],
  primaryKeyword: "olive garden fried mozzarella",
  secondaryKeywords: [
    "fried mozzarella price",
    "fried mozzarella calories",
    "mozzarella sticks",
    "fried mozzarella sauce",
    "fried mozzarella catering",
  ],
  searchIntent:
    "A diner wants the price, calories, dipping sauce, size and allergen guidance for Olive Garden's Fried Mozzarella before ordering.",
  metaTitle: "Olive Garden Fried Mozzarella: Price, Calories & Sauce",
  metaDescription:
    "Olive Garden Fried Mozzarella costs $9.79 for one order with 800 calories, served with marinara. See sizes, catering tray, allergen notes and pairings.",
  h1: "Olive Garden Fried Mozzarella",
  summary:
    "Breaded mozzarella cheese, fried until crisp and golden outside and melted inside, with warm marinara sauce for dipping. It is one of the classic starters on Olive Garden’s appetizer menu.",
  servingSummary: "One appetizer order, served with marinara",
  contentReviewedAt: "2026-11-15",
  about: {
    heading: "About Olive Garden Fried Mozzarella",
    paragraphs: [
      "Fried Mozzarella is Olive Garden’s take on mozzarella sticks: pieces of mozzarella cheese are breaded and fried, so the coating turns crisp and golden while the cheese inside melts. Each order comes with a cup of marinara sauce for dipping.",
      "One order costs $9.79 and has 800 calories before the sauce, based on the online pickup price we checked and Olive Garden’s nutrition guide. The marinara adds 35 calories, for 835 in total. Olive Garden does not say how many pieces are in a restaurant order or how many people it serves.",
      [
        "For a group, Olive Garden also sells Fried Mozzarella as a catering tray of 30 pieces that serves 4 to 6 people. Both versions are listed on the ",
        { text: "appetizers menu", href: "/appetizers" },
        " and the ",
        { text: "catering menu", href: "/catering" },
        ".",
      ],
      "Olive Garden does not mark Fried Mozzarella with its vegetarian (V) label on the online menu, and it is fried in soy oil in shared fryers. Read the allergen section below before ordering if you have a food allergy.",
    ],
  },
  includes: [{ label: "Marinara sauce", detail: "A cup of warm marinara for dipping comes with every order.", calories: 35 }],
  extraSauceOfferingId: "sides-sauces-and-extras--side-of-marinara-sauce--large",
  nutrition: {
    // Official values: row "p2-fried-mozzarella" (+ "add marinara") of the U.S.
    // nutrition guide US_101926, page 2 (content/menu/nutrition/).
    servingBasis: "One restaurant order, as served, without the marinara dipping sauce",
  },
  ingredients: {
    completeness: "partial",
    items: [
      { name: "Mozzarella cheese", detail: "The main ingredient, named in the dish and its menu description." },
      { name: "Breading", detail: "The cheese is breaded before frying." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
      { name: "Marinara sauce", detail: "Served on the side for dipping." },
    ],
    note: "This list only names components confirmed by Olive Garden’s menu description and allergen guide. Olive Garden does not publish a full recipe, so it is not a complete ingredient list.",
  },
  // Official marks: allergen-guide row "a2-fried-mozzarella" (US_101926, page 2).
  allergens: {
    facts: ["Made with breaded mozzarella cheese and fried."],
    crossContact: ["Olive Garden says its kitchens do not have a separate fryer, so fried foods share cooking oil."],
  },
  dietary: [
    { label: "Vegetarian label", value: "Not marked (V) on the online menu", tone: "info" },
    { label: "Gluten-sensitive menu", value: "Not listed", tone: "caution" },
    { label: "Fryer", value: "Shared fryer (no separate fryer)", tone: "caution" },
  ],
  pairings: [
    {
      offeringId: "classic-entrees--spaghetti-with-marinara",
      kind: "Entrée",
      reason: "Keeps the marinara theme going and is one of the lower-calorie classic pasta dishes. Olive Garden marks it vegetarian (V).",
    },
    {
      offeringId: "classic-entrees--herb-grilled-salmon",
      kind: "Entrée",
      reason: "A grilled main course if you want something lighter after a fried starter.",
    },
    {
      offeringId: "soups-salad-and-breadsticks--famous-house-salad",
      kind: "Soup & salad",
      reason: "A crisp, fresh salad to balance the warm, cheesy appetizer.",
    },
    {
      offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea",
      kind: "Drink",
      reason: "A zero-calorie drink that does not add to the 800-calorie starter.",
    },
  ],
  relatedOfferingIds: [
    "appetizers--stuffed-ziti-fritta",
    "appetizers--toasted-ravioli",
    "appetizers--calamari",
    "appetizers--lasagna-fritta",
  ],
  compareHeading: "How Fried Mozzarella compares with other appetizers",
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
      question: "How much is Fried Mozzarella at Olive Garden?",
      answer:
        "One order of Fried Mozzarella was $9.79 on Olive Garden’s online menu for pickup when we checked in November 2026. The 30-piece catering tray was $32.29. Prices may vary by location across the USA.",
    },
    {
      question: "How many calories are in Olive Garden Fried Mozzarella?",
      answer:
        "One order has 800 calories according to Olive Garden’s U.S. nutrition guide, with 49 g fat, 1,990 mg sodium and 33 g protein. The marinara dipping sauce adds 35 calories, so the order with its sauce comes to 835 calories (our calculation). The catering tray has 3,450 calories in total.",
    },
    {
      question: "What sauce comes with Fried Mozzarella?",
      answer:
        "It comes with marinara sauce for dipping (35 calories). If you want more, a large side of marinara sauce is sold separately on the sides menu.",
      link: { text: "See sides and sauces", href: "/sides-sauces-and-extras" },
    },
    {
      question: "What allergens are in Olive Garden Fried Mozzarella?",
      answer:
        "Olive Garden’s U.S. allergen guide lists Fried Mozzarella as containing dairy, wheat, gluten and soy, and marks it as fried in soy oil. Olive Garden says shared kitchens and fryers mean it cannot rule out cross-contact, so tell your server about any allergy before ordering.",
    },
    {
      question: "Is Olive Garden Fried Mozzarella vegetarian?",
      answer:
        "Olive Garden does not mark Fried Mozzarella with its vegetarian (V) label on the online menu we checked, so we do not call it vegetarian. Ask your server for ingredient details.",
    },
    {
      question: "How many people does Fried Mozzarella serve?",
      answer:
        "Olive Garden does not state a piece count or serving number for the restaurant order. The catering tray is listed with 30 pieces and serves 4 to 6 people.",
      link: { text: "See the catering menu", href: "/catering" },
    },
  ],
  sources: [
    { label: "Olive Garden: Fried Mozzarella (online menu)", url: ITEM_PAGE },
    { label: "Olive Garden: Fried Mozzarella (Serves 4 - 6), catering", url: "https://www.olivegarden.com/menu/fried-mozzarella-serves-4-6/prod81849" },
    { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
    { label: "Olive Garden allergen guide (PDF)", url: ALLERGEN_PDF },
    { label: "Olive Garden food allergies", url: "https://www.olivegarden.com/nutrition/food-allergies" },
    { label: "Olive Garden gluten-sensitive diet", url: "https://www.olivegarden.com/nutrition/gluten-sensitive-diet" },
    { label: "Olive Garden vegetarian and vegan options", url: "https://www.olivegarden.com/nutrition/vegetarian-and-vegan-options" },
  ],
  officialSource: { label: "Olive Garden: Fried Mozzarella", url: ITEM_PAGE },
  extraSource: { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
  related: [
    { categoryId: "appetizers", text: "Every Olive Garden starter with prices, calories and sauces." },
    { categoryId: "catering", text: "The 30-piece Fried Mozzarella tray and other party-size pans." },
    { categoryId: "sides-sauces-and-extras", text: "Large sides of marinara and other sauces for extra dipping." },
    { categoryId: "classic-entrees", text: "Choose a main course to follow your appetizer." },
  ],
  checklist: {
    verifiedProductInfo: "done",
    uniqueSearchIntent: "done",
    // Official rows entered from the owner-supplied U.S. PDFs (US_101926) on 2026-11-15.
    nutritionAndAllergens: "done",
    originalContent: "done",
    accurateImage: "done",
    internalLinks: "done",
    // Owner approved the sample's visual design on 2026-11-18 (desktop + mobile screenshots).
    visualReview: "done",
  },
  // Owner approval (2026-11-18): design approved; publish after all checks pass.
  ownerApprovedAt: "2026-11-18",
};
