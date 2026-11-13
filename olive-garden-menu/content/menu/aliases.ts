import type { AliasCase } from "@/lib/types";

/**
 * Possible aliases found in docs/MENU_INVENTORY.md (CONTENT_ARCHITECTURE.md §7).
 *
 * Owner decisions of 2026-11-12 (research/menu/ALIAS_MAPPING.md):
 * - "confirmed-different": different items, kept separate.
 * - "shared-data": the same dish (often a different portion). The entries
 *   share product information/photos, but every inventory entry is kept with
 *   its own price, calories, and portion. Nothing is merged or deleted.
 */
export const aliasCases: AliasCase[] = [
  {
    id: "A1",
    question: "Rotini Pasta with Marinara vs. Rotini with Marinara: same item listed twice, or adult vs. kids version?",
    offeringIds: ["gluten-sensitive--rotini-pasta-with-marinara", "gluten-sensitive--rotini-with-marinara"],
    status: "confirmed-different",
    decision: "different: Rotini Pasta with Marinara is the adult gluten-sensitive entrée ($13.99, 530 cal). Rotini with Marinara is officially the kids gluten-sensitive meal ($7.49, 260 cal). Not merged.",
  },
  {
    id: "A2",
    question: "Rotini Pasta with Meat Sauce vs. Rotini with Meat Sauce: same as A1.",
    offeringIds: ["gluten-sensitive--rotini-pasta-with-meat-sauce", "gluten-sensitive--rotini-with-meat-sauce"],
    status: "confirmed-different",
    decision: "different: Same pattern as A1: adult Rotini Pasta with Meat Sauce ($13.99, 680 cal) vs kids Rotini with Meat Sauce ($7.49, 340 cal). Not merged.",
  },
  {
    id: "A3",
    question: "Grilled Chicken with Rotini Pasta & Marinara (Gluten Sensitive) vs. the Kids version: adult vs. kids, or the same item?",
    offeringIds: [
      "gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara",
      "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara",
    ],
    status: "shared-data",
    decision: "identical: Gluten-sensitive listing and Kids listing are the same kids meal (same description, $9.98, 430 cal). Shared product data and image; both entries kept.",
  },
  {
    id: "A4",
    question: "Our Famous Jumbo House Salad vs. Large Salad (both in Family-Style Meals): same product?",
    offeringIds: ["family-style-meals--famous-house-salad", "family-style-meals--large-salad"],
    status: "confirmed-different",
    decision: "different (kept separate): Owner Decision 2: map only if identity, description, and serving size match. \"Large Salad\" has no official listing, description, or serving size (not on the Millenia menu, not in the nutrition PDF), so it cannot be matched to Our Famous Jumbo House Salad (Serves 6, 1,650 cal, 12 breadsticks). Both offerings kept separately; no shared data.",
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
    status: "confirmed-different",
    decision: "different: Famous House Salad without croutons is a separate gluten-sensitive item ($9.29, 110 cal vs 290 cal). Not merged.",
  },
  {
    id: "A6",
    question: "Toasted Ravioli (Appetizers) vs. Toasted Beef Ravioli (Catering): same product?",
    offeringIds: ["appetizers--toasted-ravioli", "catering--toasted-beef-ravioli"],
    status: "shared-data",
    decision: "same dish, different portion: Toasted Ravioli (appetizer) is filled with seasoned beef; the catering pan is named Toasted Beef Ravioli. Shared product information and photo; prices and calories kept separate.",
  },
  {
    id: "A7",
    question: "Sicilian Cheesecake with Strawberry Topping vs. Sicilian Cheesecake (Catering): same product, different topping or format?",
    offeringIds: ["desserts--sicilian-cheesecake-with-strawberry-topping", "catering--sicilian-cheesecake"],
    status: "shared-data",
    decision: "same dish, different portion: Both are ricotta cheesecake on a shortbread crust with strawberry sauce (700 cal per slice). Dessert slice vs half/whole catering cake. Shared product data and photo; values separate.",
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
    status: "shared-data",
    decision: "same dish, different portion: Cheese Ravioli (entrée, lighter, lunch) and the two \"with Marinara or Meat Sauce\" pans are the same dish with a sauce choice. The two pan names are identical items (same price and calories). Shared product data; portions separate.",
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
    status: "shared-data",
    decision: "partly resolved: Spaghetti with Marinara Sauce (pans) and Spaghetti with Marinara (entrée) are the same dish, different portion: shared product data. Lunch \"Spaghetti\" is a choice of marinara or meat sauce, so it stays its own product.",
  },
  {
    id: "A10",
    question: "Soup, Salad & Breadsticks / Soup, Salad and Breadsticks (Lunch) / Weekday Lunch Special: the same offer at different times?",
    offeringIds: [
      "soups-salad-and-breadsticks--soup-salad-and-breadsticks",
      "lunch-menu--soup-salad-and-breadsticks-lunch",
      "soups-salad-and-breadsticks--weekday-lunch-special",
    ],
    status: "shared-data",
    decision: "identical (lunch) / same meal (dinner): Weekday Lunch Special and Soup, Salad and Breadsticks (Lunch) are the same lunch meal ($9.99, 400-520 cal); hours differ on the two cards (11-2:30 vs 11-3). The dinner version ($13.49) is the same meal at another time and price. Shared product data and image; prices separate.",
  },
  {
    id: "A11",
    question: "Side of Meatballs / Italian Meatballs (Catering) / Meatballs Parmigiana (Appetizers): related but likely distinct?",
    offeringIds: [
      "sides-sauces-and-extras--side-of-meatballs",
      "catering--italian-meatballs",
      "appetizers--meatballs-parmigiana",
    ],
    status: "confirmed-different",
    decision: "different: Meatballs Parmigiana is a baked appetizer with cheese and breadcrumbs. Side of Meatballs and catering Italian Meatballs are plain meatballs in different portions, but the side's count is not stated. Not merged.",
  },
  {
    id: "A12",
    question: "Side of Grilled Chicken vs. Grilled Chicken Breasts (Catering): same product, different portion?",
    offeringIds: ["sides-sauces-and-extras--side-of-grilled-chicken", "catering--grilled-chicken-breasts"],
    status: "shared-data",
    decision: "same food, different portion: Side of Grilled Chicken (130 cal) and catering Grilled Chicken Breasts (6 sliced breasts, 810 cal). Shared product data and photo; values separate.",
  },
  {
    id: "A13",
    question: "Side of Broccoli vs. Broccoli (Catering): same product, different portion?",
    offeringIds: ["sides-sauces-and-extras--side-of-broccoli", "catering--broccoli"],
    status: "shared-data",
    decision: "same food, different portion: Both are parmesan garlic broccoli (side 150 cal; catering tray 610 cal). Shared product data and photo.",
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
    status: "shared-data",
    decision: "identical: Each large side sauce and its catering dipping sauce have the same price and calories (alfredo $11.29 / 1,750; marinara, meat, five cheese marinara $9.79 / 290, 600, 800). Shared product data and photo; both entries kept.",
  },
  {
    id: "A15",
    question: "Kids Chicken Fingers vs. Chicken Fingers (Catering): same product, different portion?",
    offeringIds: ["kids-meal--kids-chicken-fingers", "catering--chicken-fingers"],
    status: "shared-data",
    decision: "same food, different portion: Both are lightly breaded chicken tenders (kids meal vs 18-piece catering tray). Shared product data and photo; values separate.",
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
    status: "confirmed-different",
    decision: "different: Kids Tomato/Meat Sauce with Choice of Pasta (fettuccine, shells, spaghetti) vs Kids Rotini (gluten-free rotini). Not merged.",
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
    status: "confirmed-different",
    decision: "related (option of): Zuppa Toscana is one of the four Homemade Soups. The gluten-sensitive Zuppa Toscana entry stays separate; no merge.",
  },
];
