import type { CategoryPageContent } from "@/lib/types";

/**
 * Written content for category pages. A category gets a page only when its
 * contentStatus (content/menu/categories.ts) is "preview" or "published"
 * AND it has an entry here.
 *
 * Rules: no invented prices, calories, descriptions, or availability.
 * FAQ answers state only facts about this guide or verified data.
 */
export const categoryPages: CategoryPageContent[] = [
  {
    categoryId: "appetizers",
    metaTitle: "Olive Garden Appetizers Menu with Prices",
    metaDescription:
      "See the Olive Garden appetizers covered in this guide, from Fried Mozzarella to Toasted Ravioli. Prices and calories are shown only after they are verified.",
    h1: "Olive Garden Appetizers Menu with Prices",
    intro: [
      "Planning to start your meal with something to share? This page lists the 10 Olive Garden appetizers covered in this guide in one table, so you can compare them before you order.",
      "Prices are checked at one reference restaurant in Orlando, Florida, so every item is compared at the same location. Anything we have not checked yet is clearly marked instead of showing a guess.",
    ],
    tableCaption: "Olive Garden Appetizer Prices and Calories",
    nutritionNotes: [
      "Calories come from Olive Garden's official nutrition information and are listed for the full order unless a note says otherwise.",
      "Dipping sauces can add calories. When the official source lists a sauce separately, we note it next to the item.",
      "For allergens and full nutrition details, check Olive Garden's official nutrition information or ask your server.",
    ],
    faqs: [
      {
        question: "Why do some appetizers show “Not verified yet”?",
        answer:
          "We publish a price or calorie count only after checking it against an official source. Until an item has been checked, it is marked “Not verified yet” instead of showing an estimate.",
      },
      {
        question: "Are these prices the same at every Olive Garden?",
        answer:
          "No. Prices vary by location and can change at any time. This guide checks prices at one restaurant in Orlando, Florida, so always confirm the price with your local restaurant.",
      },
      {
        question: "What does “Not currently listed” mean?",
        answer:
          "It means we checked the reference restaurant's menu and the item was not on it at that time. It may still be offered at other locations or return later.",
      },
    ],
    related: [
      {
        categoryId: "soups-salad-and-breadsticks",
        text: "Looking for soup, salad, and breadsticks? They have their own page.",
      },
      {
        categoryId: "sides-sauces-and-extras",
        text: "Want extra dipping sauce or a side for the table? See sides, sauces, and extras.",
      },
      {
        categoryId: "catering",
        text: "Feeding a bigger group? Compare the catering menu.",
      },
    ],
  },
];
