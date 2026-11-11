import type { AliasCase } from "@/lib/types";

/**
 * Possible aliases found in docs/MENU_INVENTORY.md (CONTENT_ARCHITECTURE.md §7).
 *
 * All are UNRESOLVED: the offerings below stay separate (separate products)
 * until the owner confirms them with evidence. To resolve a case later:
 * 1. Set `status` to "confirmed-same" or "confirmed-different".
 * 2. If "confirmed-same", point the offerings to one shared `productId`.
 *    Never delete an offering: every inventory entry is kept.
 */
export const aliasCases: AliasCase[] = [
  {
    id: "A1",
    question: "Rotini Pasta with Marinara vs. Rotini with Marinara: same item listed twice, or adult vs. kids version?",
    offeringIds: ["gluten-sensitive--rotini-pasta-with-marinara", "gluten-sensitive--rotini-with-marinara"],
    status: "unresolved",
  },
  {
    id: "A2",
    question: "Rotini Pasta with Meat Sauce vs. Rotini with Meat Sauce: same as A1.",
    offeringIds: ["gluten-sensitive--rotini-pasta-with-meat-sauce", "gluten-sensitive--rotini-with-meat-sauce"],
    status: "unresolved",
  },
  {
    id: "A3",
    question: "Grilled Chicken with Rotini Pasta & Marinara (Gluten Sensitive) vs. the Kids version: adult vs. kids, or the same item?",
    offeringIds: [
      "gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara",
      "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara",
    ],
    status: "unresolved",
  },
  {
    id: "A4",
    question: "Our Famous Jumbo House Salad vs. Large Salad (both in Family-Style Meals): same product?",
    offeringIds: ["family-style-meals--famous-house-salad", "family-style-meals--large-salad"],
    status: "unresolved",
  },
  {
    id: "A5",
    question: "Famous House Salad without Croutons: a variant of the house salad? (Kept as its own offering either way.)",
    offeringIds: [
      "gluten-sensitive--famous-house-salad-without-croutons",
      "family-style-meals--famous-house-salad",
      "soups-salad-and-breadsticks--famous-house-salad",
      "catering--famous-house-salad",
    ],
    status: "unresolved",
  },
  {
    id: "A6",
    question: "Toasted Ravioli (Appetizers) vs. Toasted Beef Ravioli (Catering): same product?",
    offeringIds: ["appetizers--toasted-ravioli", "catering--toasted-beef-ravioli"],
    status: "unresolved",
  },
  {
    id: "A7",
    question: "Sicilian Cheesecake with Strawberry Topping vs. Sicilian Cheesecake (Catering): same product, different topping or format?",
    offeringIds: ["desserts--sicilian-cheesecake-with-strawberry-topping", "catering--sicilian-cheesecake"],
    status: "unresolved",
  },
  {
    id: "A8",
    question: "Cheese Ravioli and the two 'with meat or marinara sauce' names: one product with a sauce choice?",
    offeringIds: [
      "family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce",
      "classic-entrees--cheese-ravioli",
      "lighter-portions--cheese-ravioli",
      "lunch-menu--cheese-ravioli",
      "catering--cheese-ravioli-with-marinara-or-meat-sauce",
    ],
    status: "unresolved",
  },
  {
    id: "A9",
    question: "Spaghetti with Marinara Sauce / Spaghetti with Marinara / Spaghetti (Lunch): which sauce is the lunch Spaghetti?",
    offeringIds: [
      "family-style-meals--spaghetti-with-marinara-sauce",
      "catering--spaghetti-with-marinara-sauce",
      "classic-entrees--spaghetti-with-marinara",
      "lunch-menu--spaghetti",
    ],
    status: "unresolved",
  },
  {
    id: "A10",
    question: "Soup, Salad & Breadsticks / Soup, Salad and Breadsticks (Lunch) / Weekday Lunch Special: the same offer at different times?",
    offeringIds: [
      "soups-salad-and-breadsticks--soup-salad-and-breadsticks",
      "lunch-menu--soup-salad-and-breadsticks-lunch",
      "soups-salad-and-breadsticks--weekday-lunch-special",
    ],
    status: "unresolved",
  },
  {
    id: "A11",
    question: "Side of Meatballs / Italian Meatballs (Catering) / Meatballs Parmigiana (Appetizers): related but likely distinct?",
    offeringIds: [
      "sides-sauces-and-extras--side-of-meatballs",
      "catering--italian-meatballs",
      "appetizers--meatballs-parmigiana",
    ],
    status: "unresolved",
  },
  {
    id: "A12",
    question: "Side of Grilled Chicken vs. Grilled Chicken Breasts (Catering): same product, different portion?",
    offeringIds: ["sides-sauces-and-extras--side-of-grilled-chicken", "catering--grilled-chicken-breasts"],
    status: "unresolved",
  },
  {
    id: "A13",
    question: "Side of Broccoli vs. Broccoli (Catering): same product, different portion?",
    offeringIds: ["sides-sauces-and-extras--side-of-broccoli", "catering--broccoli"],
    status: "unresolved",
  },
  {
    id: "A14",
    question: "Large side sauces vs. catering dipping sauces (alfredo, marinara, meat, five cheese marinara): same sauce, different container size?",
    offeringIds: [
      "sides-sauces-and-extras--side-of-alfredo-sauce--large",
      "catering--alfredo-dipping-sauce",
      "sides-sauces-and-extras--side-of-marinara-sauce--large",
      "catering--marinara-dipping-sauce",
      "sides-sauces-and-extras--side-of-meat-sauce--large",
      "catering--meat-dipping-sauce",
      "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
      "catering--five-cheese-marinara-dipping-sauce",
    ],
    status: "unresolved",
  },
  {
    id: "A15",
    question: "Kids Chicken Fingers vs. Chicken Fingers (Catering): same product, different portion?",
    offeringIds: ["kids-meal--kids-chicken-fingers", "catering--chicken-fingers"],
    status: "unresolved",
  },
  {
    id: "A16",
    question: "Kids Tomato Sauce Pasta vs. Kids Rotini with Marinara, and Kids Meat Sauce Pasta vs. Kids Rotini with Meat Sauce: regular vs. gluten-sensitive pasta?",
    offeringIds: [
      "kids-meal--kids-tomato-sauce-pasta",
      "kids-meal--kids-rotini-with-marinara",
      "kids-meal--kids-meat-sauce-pasta",
      "kids-meal--kids-rotini-with-meat-sauce",
    ],
    status: "unresolved",
  },
  {
    id: "A17",
    question: "Zuppa Toscana (Gluten Sensitive) vs. Homemade Soups: is Zuppa Toscana one of the homemade soups? Which soups are offered?",
    offeringIds: [
      "gluten-sensitive--zuppa-toscana",
      "family-style-meals--homemade-soups",
      "soups-salad-and-breadsticks--homemade-soups",
      "catering--homemade-soups",
    ],
    status: "unresolved",
  },
];
