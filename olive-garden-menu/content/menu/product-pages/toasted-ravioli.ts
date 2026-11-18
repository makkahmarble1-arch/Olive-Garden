import type { ProductPageContent } from "@/lib/types";
import { pageStatus } from "./registry";

/**
 * Toasted Ravioli: Phase 1 item page, /menu/toasted-ravioli.
 * Shared data: appetizers--toasted-ravioli. Official rows: p3-toasted-ravioli
 * (+ add marinara) and a2-toasted-ravioli. The catering pan is a separate
 * product (toasted-beef-ravioli) and is only linked, not merged.
 * Fact log: research/products/toasted-ravioli/FACT_VERIFICATION.md.
 */

const ITEM_PAGE = "https://www.olivegarden.com/menu/toasted-ravioli/prod80841";
const NUTRITION_PDF = "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf";
const ALLERGEN_PDF = "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf";

export const toastedRavioliPage: ProductPageContent = {
  productId: "toasted-ravioli",
  slug: "toasted-ravioli",
  // Phase 1 batch: local development and testing only until the owner approves it.
  status: pageStatus("toasted-ravioli"),
  primaryOfferingId: "appetizers--toasted-ravioli",
  primaryKeyword: "olive garden toasted ravioli",
  secondaryKeywords: ["toasted ravioli price", "toasted ravioli calories", "toasted beef ravioli", "fried ravioli olive garden"],
  searchIntent:
    "A diner wants the price, calories, filling, sauce, nutrition and allergen information for Olive Garden's Toasted Ravioli appetizer.",
  metaTitle: "Olive Garden Toasted Ravioli: Price, Calories & Filling",
  metaDescription:
    "Olive Garden Toasted Ravioli costs $10.29 with 650 calories per order: beef-filled ravioli fried crisp and served with marinara. See nutrition and allergens.",
  h1: "Olive Garden Toasted Ravioli",
  summary:
    "Ravioli filled with seasoned beef, lightly fried until golden and crisp, and served with homemade marinara sauce for dipping.",
  servingSummary: "One appetizer order, served with marinara",
  contentReviewedAt: "2026-11-18",
  about: {
    heading: "About Olive Garden Toasted Ravioli",
    paragraphs: [
      "Toasted Ravioli takes pasta pockets filled with seasoned beef and fries them until the outside turns golden and crisp. Each order comes with a cup of marinara for dipping.",
      "One order costs $10.29 and has 650 calories before the sauce, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The marinara adds 35 calories, for 685 in total.",
      [
        "Because of the beef filling, this is not a meat-free starter. For a group, the ",
        { text: "catering menu", href: "/catering" },
        " offers a Toasted Beef Ravioli pan for 4 to 6 guests.",
      ],
      "Olive Garden’s allergen guide marks Toasted Ravioli as containing dairy, eggs, wheat, gluten and soy, and as fried in soy oil in shared fryers.",
    ],
  },
  includes: [{ label: "Marinara sauce", detail: "A cup of homemade marinara for dipping comes with every order.", calories: 35 }],
  extraSauceOfferingId: "sides-sauces-and-extras--side-of-marinara-sauce--large",
  nutrition: {
    // Official rows "p3-toasted-ravioli" (+ "add marinara"), US_101926 page 3.
    servingBasis: "One restaurant order, as served, without the marinara dipping sauce",
  },
  ingredients: {
    completeness: "partial",
    items: [
      { name: "Ravioli", detail: "Pasta pockets, the base of the dish." },
      { name: "Seasoned beef", detail: "The filling named in the menu description." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
      { name: "Marinara sauce", detail: "Served on the side for dipping." },
    ],
    note: "This list only names components confirmed by Olive Garden’s menu description and allergen guide. Olive Garden does not publish a full recipe, so it is not a complete ingredient list.",
  },
  // Official marks: allergen-guide row "a2-toasted-ravioli" (US_101926, page 2).
  allergens: {
    facts: ["Made with beef-filled ravioli and fried."],
    crossContact: ["Olive Garden says its kitchens do not have a separate fryer, so fried foods share cooking oil."],
  },
  dietary: [
    { label: "Filling", value: "Seasoned beef (contains meat)", tone: "info" },
    { label: "Gluten-sensitive menu", value: "Not listed", tone: "caution" },
    { label: "Fryer", value: "Shared fryer (no separate fryer)", tone: "caution" },
  ],
  pairings: [
    {
      offeringId: "classic-entrees--lasagna-classico",
      kind: "Entrée",
      reason: "A classic baked pasta that keeps the meat-and-marinara flavors of the starter.",
    },
    {
      offeringId: "classic-entrees--grilled-chicken-margherita",
      kind: "Entrée",
      reason: "A grilled chicken dish with fresh tomatoes, lighter at 650 calories.",
    },
    {
      offeringId: "soups-salad-and-breadsticks--homemade-soups",
      kind: "Soup & salad",
      reason: "A cup of homemade soup is a light way to start before a fried appetizer.",
    },
    {
      offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata",
      kind: "Drink",
      reason: "A fruity, sparkling drink alongside a savory starter.",
    },
  ],
  relatedOfferingIds: [
    "appetizers--fried-mozzarella",
    "appetizers--stuffed-ziti-fritta",
    "appetizers--meatballs-parmigiana",
    "appetizers--calamari",
  ],
  compareHeading: "How Toasted Ravioli compares with other appetizers",
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
      question: "How much is Toasted Ravioli at Olive Garden?",
      answer:
        "One order of Toasted Ravioli was $10.29 on Olive Garden’s online menu for pickup when we checked in November 2026. Prices may vary by location across the USA.",
    },
    {
      question: "How many calories are in Olive Garden Toasted Ravioli?",
      answer:
        "One order has 650 calories according to Olive Garden’s U.S. nutrition guide, with 31 g fat, 1,330 mg sodium and 25 g protein. The marinara adds 35 calories, for 685 calories with the sauce (our calculation).",
    },
    {
      question: "What is inside Olive Garden Toasted Ravioli?",
      answer: "Olive Garden describes it as ravioli filled with seasoned beef, lightly fried until golden and crisp, and served with homemade marinara.",
    },
    {
      question: "What allergens are in Olive Garden Toasted Ravioli?",
      answer:
        "Olive Garden’s U.S. allergen guide lists Toasted Ravioli as containing dairy, eggs, wheat, gluten and soy, and marks it as fried in soy oil. Tell your server about any allergy before ordering.",
    },
    {
      question: "Can I order Toasted Ravioli for a group?",
      answer: "Yes. The catering menu lists a Toasted Beef Ravioli pan for 4 to 6 guests, with marinara for dipping.",
      link: { text: "See the catering menu", href: "/catering" },
    },
  ],
  sources: [
    { label: "Olive Garden: Toasted Ravioli (online menu)", url: ITEM_PAGE },
    { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
    { label: "Olive Garden allergen guide (PDF)", url: ALLERGEN_PDF },
    { label: "Olive Garden: Toasted Beef Ravioli (Serves 4 - 6), catering", url: "https://www.olivegarden.com/menu/toasted-beef-ravioli-serves-4-6/prod81863" },
  ],
  officialSource: { label: "Olive Garden: Toasted Ravioli", url: ITEM_PAGE },
  extraSource: { label: "Olive Garden Nutrition Information (PDF)", url: NUTRITION_PDF },
  related: [
    { categoryId: "appetizers", text: "Every Olive Garden starter with prices, calories and sauces." },
    { categoryId: "catering", text: "The Toasted Beef Ravioli pan and other party-size trays." },
    { categoryId: "classic-entrees", text: "Pasta and meat entrées to follow your appetizer." },
    { categoryId: "sides-sauces-and-extras", text: "Large sides of marinara for extra dipping." },
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
