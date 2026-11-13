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
      "Compare Olive Garden appetizer prices and calories, from Fried Mozzarella to Shrimp Fritto Misto, checked at one Orlando, Florida restaurant.",
    h1: "Olive Garden Appetizers Menu with Prices",
    intro: [
      "Planning to start your meal with something to share? This page lists 10 Olive Garden appetizers in one table, so you can compare prices and calories before you order.",
      "Prices were checked on Olive Garden's online ordering menu for one restaurant in Orlando, Florida, so every item is compared at the same location. Calories come from Olive Garden's official nutrition guide. Anything we could not confirm is clearly marked instead of showing a guess.",
    ],
    tableCaption: "Olive Garden Appetizer Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices at the Orlando – Millenia Mall restaurant. Dine-in prices were not checked and may be different.",
      "Breadsticks: the price shown is for 6 breadsticks. An order of 12 breadsticks was $7.29.",
      "Dipping Sauces with Breadsticks: the price shown is for the regular size with 4 breadsticks. The large size with 8 breadsticks was $7.29.",
    ],
    nutritionNotes: [
      "Calories are for the full order as served, unless a note in the table says otherwise. Breadsticks are listed per breadstick.",
      "Dipping sauces are counted separately. Marinara adds 35 calories to Fried Mozzarella, Stuffed Ziti Fritta, Calamari, Shrimp Fritto Misto, and Toasted Ravioli. Alfredo adds 220 calories to Stuffed Ziti Fritta, and spicy ranch adds 240 calories to Calamari and Shrimp Fritto Misto.",
      "Dipping Sauces with Breadsticks: the table shows a calculated total for the regular order, 4 breadsticks (140 each) plus one sauce: Marinara 70, Five Cheese Marinara 200, Alfredo 440, or Spicy Alfredo 490, for 630 to 1,050 calories. The large order (8 breadsticks and an 8 oz sauce of 150 to 980 calories) comes to 1,270 to 2,100 calories. These totals are our calculation from Olive Garden's official values.",
      "Calorie counts are national values from Olive Garden's nutrition guide for U.S. restaurants. For allergens and full nutrition details, check that guide or ask your server.",
    ],
    sources: [
      {
        label: "Olive Garden online ordering menu (Orlando – Millenia Mall, pickup)",
        url: "https://www.olivegarden.com/menu/appetizers",
      },
      {
        label: "Olive Garden Nutrition Information (U.S. Restaurants)",
        url: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
      },
    ],
    faqs: [
      {
        question: "What is the cheapest appetizer on this list?",
        answer:
          "Breadsticks are the lowest-priced item at $4.99 for 6. Among the shareable starters, Fried Mozzarella was the lowest at $9.79. Prices were checked at one Orlando, Florida restaurant and can be different at yours.",
      },
      {
        question: "Which appetizer has the most calories?",
        answer:
          "Among the single-size appetizers, Shrimp Fritto Misto has the most at 1,280 calories before dipping sauce, followed by Spinach-Artichoke Dip at 1,160 calories with flatbread crisps. A large Dipping Sauces with Breadsticks order can reach 2,100 calories with Spicy Alfredo (our calculation from official values). Breadsticks are 140 calories each.",
      },
      {
        question: "Are these prices the same at every Olive Garden?",
        answer:
          "No. Prices vary by location and can change at any time. This guide shows online pickup prices from one restaurant in Orlando, Florida, so always confirm the price with your local restaurant.",
      },
      {
        question: "Where do these prices and calories come from?",
        answer:
          "Prices were read from Olive Garden's online ordering menu for the Orlando – Millenia Mall restaurant (pickup) on November 11, 2026. Calories come from Olive Garden's official nutrition guide for U.S. restaurants. Both sources are linked on this page.",
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
