import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Remaining single-row items (2026-11-18), built after the owner's permanent
 * image instruction (reuse every existing owner photo, no routine image
 * review; CLAUDE.md). Not built: Grilled Chicken Parmigiana (gluten-sensitive):
 * its photo shows regular spaghetti, a materially misleading image for guests
 * avoiding gluten (flagged in research/products/PENDING.md). Phase 4
 * multi-version dishes wait for the version-aware layout approval.
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const APPETIZER_RELATED: RelatedMenuRef[] = [
  { categoryId: "appetizers", text: "Every Olive Garden appetizer with prices and calories." },
  { categoryId: "soups-salad-and-breadsticks", text: "Soups, salad and breadsticks to start." },
  { categoryId: "classic-entrees", text: "Classic entrées to follow your starter." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const ENTREE_RELATED: RelatedMenuRef[] = [
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "lunch-menu", text: "Weekday lunch portions at lower prices." },
  { categoryId: "lighter-portions", text: "Smaller dinner portions of popular pastas." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const FAMILY_ENTREE_RELATED: RelatedMenuRef[] = [
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "family-style-meals", text: "Family-size pans for 4 to 6 people." },
  { categoryId: "catering", text: "Pans and packages for groups." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const GRILL_RELATED: RelatedMenuRef[] = [
  { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
  { categoryId: "gluten-sensitive", text: "The gluten-sensitive menu with prices and calories." },
  { categoryId: "sides-sauces-and-extras", text: "Sides and add-ons for your entrée." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const DESSERT_RELATED: RelatedMenuRef[] = [
  { categoryId: "desserts", text: "Every Olive Garden dessert with prices and calories." },
  { categoryId: "non-alcoholic-beverages", text: "Coffee, tea and other drinks to go with dessert." },
  { categoryId: "classic-entrees", text: "Classic entrées to start the meal." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const SALAD = "soups-salad-and-breadsticks--famous-house-salad";
const SOUPS = "soups-salad-and-breadsticks--homemade-soups";
const BREADSTICKS = "appetizers--breadsticks";
const LEMONADE = "non-alcoholic-beverages--classic-lemonade";
const UNSWEET_TEA = "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea";
const CAPPUCCINO = "non-alcoholic-beverages--cappuccino";
const ESPRESSO = "non-alcoholic-beverages--lavazza-espresso";

export const morePages: ProductPageContent[] = [
  // ---------------- Appetizers
  itemPage({
    slug: "meatballs-parmigiana",
    primaryOfferingId: "appetizers--meatballs-parmigiana",
    primaryKeyword: "olive garden meatballs parmigiana",
    secondaryKeywords: ["meatballs parmigiana price", "meatballs parmigiana calories", "olive garden meatball appetizer"],
    metaTitle: "Olive Garden Meatballs Parmigiana: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Meatballs Parmigiana costs $11.79 with 1,040 calories: five meatballs baked in marinara with melted cheese and breadcrumbs. See nutrition.",
    servingSummary: "One appetizer order of five meatballs",
    servingBasis: "One order (five meatballs), as served",
    about: {
      heading: "About Olive Garden Meatballs Parmigiana",
      paragraphs: [
        "Meatballs Parmigiana is a baked starter: five meatballs in marinara sauce, finished with melted Italian cheeses and a crunchy layer of toasted breadcrumbs.",
        "One order costs $11.79 and has 1,040 calories with 51 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. It is not fried.",
        ["It is one of the heartier starters on the ", { text: "appetizers menu", href: "/appetizers" }, ", so it works best shared."],
      ],
    },
    ingredients: [
      { name: "Meatballs", detail: "Five per order." },
      { name: "Marinara", detail: "The meatballs are baked in it." },
      { name: "Italian cheeses", detail: "Melted on top." },
      { name: "Toasted breadcrumbs", detail: "A crunchy top layer." },
    ],
    allergenFacts: ["Five meatballs baked in marinara with melted cheese and toasted breadcrumbs."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp salad next to a rich, cheesy starter." },
      { offeringId: "classic-entrees--shrimp-scampi", kind: "Entrée", reason: "At 490 calories, a lighter main course after a big appetizer." },
      { offeringId: BREADSTICKS, kind: "Appetizer", reason: "Breadsticks to dip in the marinara." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["appetizers--lasagna-fritta", "appetizers--fried-mozzarella", "appetizers--toasted-ravioli"],
    compareHeading: "How Meatballs Parmigiana compares with other appetizers",
    faqs: [
      {
        question: "How many meatballs are in Olive Garden Meatballs Parmigiana?",
        answer: "Olive Garden lists five meatballs per order, baked in marinara with melted Italian cheeses and toasted breadcrumbs.",
      },
      {
        question: "Is Meatballs Parmigiana fried?",
        answer: "No. Olive Garden describes it as baked, and the allergen guide does not mark it as fried.",
      },
    ],
    related: APPETIZER_RELATED,
  }),

  itemPage({
    slug: "shrimp-fritto-misto",
    primaryOfferingId: "appetizers--shrimp-fritto-misto",
    primaryKeyword: "olive garden shrimp fritto misto",
    secondaryKeywords: ["shrimp fritto misto price", "shrimp fritto misto calories", "olive garden fried shrimp appetizer"],
    metaTitle: "Olive Garden Shrimp Fritto Misto: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Shrimp Fritto Misto costs $14.29 with 1,280 calories: breaded shrimp, onions and bell peppers, fried, with marinara and spicy ranch.",
    servingSummary: "One appetizer order, with marinara and spicy ranch",
    servingBasis: "One order without the dipping sauces",
    about: {
      heading: "About Olive Garden Shrimp Fritto Misto",
      paragraphs: [
        "Shrimp Fritto Misto is Olive Garden’s fried shrimp starter: more than half a pound of shrimp, hand-breaded with onions and bell peppers, lightly fried and served with marinara and spicy ranch for dipping.",
        "One order costs $14.29, the highest price on the appetizer menu, and has 1,280 calories before the sauces, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        ["The other seafood starter on the ", { text: "appetizers menu", href: "/appetizers" }, " is Calamari."],
      ],
    },
    includes: [
      { label: "Marinara", detail: "Dipping sauce", calories: 35 },
      { label: "Spicy ranch", detail: "Dipping sauce", calories: 240 },
    ],
    ingredients: [
      { name: "Shrimp", detail: "More than half a pound, hand-breaded." },
      { name: "Onions and bell peppers", detail: "Breaded and fried with the shrimp." },
      { name: "Marinara and spicy ranch", detail: "Served for dipping." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks it as fried in soy oil." },
    ],
    allergenFacts: ["Hand-breaded shrimp with onions and bell peppers, fried, with marinara and spicy ranch."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "A crisp salad after a fried starter." },
      { offeringId: "classic-entrees--herb-grilled-salmon", kind: "Entrée", reason: "A grilled main course after a fried appetizer." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A bright lemonade with fried seafood." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["appetizers--calamari", "appetizers--fried-mozzarella", "appetizers--lasagna-fritta"],
    compareHeading: "How Shrimp Fritto Misto compares with other appetizers",
    faqs: [
      {
        question: "What is in Olive Garden Shrimp Fritto Misto?",
        answer: "Olive Garden describes it as more than half a pound of shrimp, hand-breaded with onions and bell peppers and lightly fried, served with marinara and spicy ranch.",
      },
      {
        question: "Does Shrimp Fritto Misto contain shellfish?",
        answer: "Yes. Olive Garden’s U.S. allergen guide lists crustacean shellfish for it, and it is fried in a shared fryer.",
      },
    ],
    related: APPETIZER_RELATED,
  }),

  // ---------------- Classic entrées
  itemPage({
    slug: "chicken-parmigiana",
    primaryOfferingId: "classic-entrees--chicken-parmigiana",
    sizeOfferingIds: ["lunch-menu--chicken-parmigiana", "lighter-portions--chicken-parmigiana", "family-style-meals--chicken-parmigiana"],
    primaryKeyword: "olive garden chicken parmigiana",
    secondaryKeywords: ["chicken parmigiana price", "chicken parmigiana calories", "lunch chicken parmigiana", "chicken parm family size"],
    metaTitle: "Olive Garden Chicken Parmigiana: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Chicken Parmigiana costs $21.29 with 1,020 calories: two breaded chicken breasts with spaghetti. Compare lunch, lighter and family sizes.",
    servingSummary: "Dinner entrée: two chicken breasts with spaghetti, plus soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Chicken Parmigiana",
      paragraphs: [
        "Chicken Parmigiana is one of Olive Garden’s best-known entrées: two parmesan-breaded chicken breasts, lightly fried and topped with marinara and melted Italian cheeses, with a side of spaghetti.",
        "The dinner entrée costs $21.29 and has 1,020 calories with 64 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        [
          "Smaller versions are on the weekday lunch menu and the ",
          { text: "lighter portions menu", href: "/lighter-portions" },
          " (630 calories each), and a family-size pan serves 4 to 6. All sizes are compared below.",
        ],
      ],
    },
    ingredients: [
      { name: "Chicken breasts", detail: "Two, parmesan-breaded and lightly fried." },
      { name: "Marinara", detail: "Spooned on top." },
      { name: "Italian cheeses", detail: "Melted on top." },
      { name: "Spaghetti", detail: "Served on the side." },
    ],
    allergenFacts: ["Two parmesan-breaded, fried chicken breasts with marinara, melted cheese and spaghetti."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert to finish." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a tomato sauce dish." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Add a vegetable side to the plate." },
    ],
    relatedOfferingIds: ["classic-entrees--eggplant-parmigiana", "classic-entrees--grilled-chicken-margherita", "classic-entrees--lasagna-classico", "classic-entrees--tour-of-italy"],
    faqs: [
      {
        question: "How many chicken breasts come with Olive Garden Chicken Parmigiana?",
        answer: "The dinner entrée has two parmesan-breaded chicken breasts with a side of spaghetti, according to Olive Garden’s menu.",
      },
      {
        question: "Is there a smaller Chicken Parmigiana?",
        answer: "Yes. The weekday lunch menu and the lighter portions menu each list a smaller Chicken Parmigiana with 630 calories.",
        link: { text: "See lighter portions", href: "/lighter-portions" },
      },
    ],
    related: ENTREE_RELATED,
  }),

  itemPage({
    slug: "chicken-scampi",
    primaryOfferingId: "classic-entrees--chicken-scampi",
    sizeOfferingIds: ["family-style-meals--chicken-scampi"],
    primaryKeyword: "olive garden chicken scampi",
    secondaryKeywords: ["chicken scampi price", "chicken scampi calories", "chicken scampi family size"],
    metaTitle: "Olive Garden Chicken Scampi: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Chicken Scampi costs $21.79 with 1,050 calories: chicken, bell peppers and red onions in garlic scampi sauce over angel hair. See the family pan.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Chicken Scampi",
      paragraphs: [
        "Chicken Scampi sautés chicken with bell peppers and red onions in a garlic scampi sauce and serves it over thin angel hair pasta.",
        "The dinner entrée costs $21.79 and has 1,050 calories with 49 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        [
          "A family-size pan serves 4 to 6 people; see it with the other pans on the ",
          { text: "family-style meals page", href: "/family-style-meals" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Chicken", detail: "Sautéed." },
      { name: "Bell peppers and red onions", detail: "Sautéed with the chicken." },
      { name: "Garlic scampi sauce", detail: "The sauce." },
      { name: "Angel hair pasta", detail: "Thin pasta under the chicken." },
    ],
    allergenFacts: ["Chicken with bell peppers and red onions in a garlic scampi sauce over angel hair."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A lighter, fruity dessert after a garlicky pasta." },
      { offeringId: LEMONADE, kind: "Drink", reason: "Lemonade and garlic sauce work well together." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["classic-entrees--shrimp-scampi", "classic-entrees--stuffed-chicken-marsala", "classic-entrees--grilled-chicken-margherita"],
    faqs: [
      {
        question: "What pasta comes with Olive Garden Chicken Scampi?",
        answer: "Olive Garden serves it over thin angel hair pasta, with bell peppers and red onions in a garlic scampi sauce.",
      },
      {
        question: "Which has fewer calories, Chicken Scampi or Shrimp Scampi?",
        answer: "Shrimp Scampi, with 490 calories. Chicken Scampi has 1,050, according to Olive Garden’s U.S. nutrition guide.",
      },
    ],
    related: FAMILY_ENTREE_RELATED,
  }),

  itemPage({
    slug: "shrimp-scampi",
    primaryOfferingId: "classic-entrees--shrimp-scampi",
    sizeOfferingIds: ["lunch-menu--shrimp-scampi", "family-style-meals--shrimp-scampi"],
    primaryKeyword: "olive garden shrimp scampi",
    secondaryKeywords: ["shrimp scampi price", "shrimp scampi calories", "lunch shrimp scampi", "shrimp scampi family size"],
    metaTitle: "Olive Garden Shrimp Scampi: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Shrimp Scampi costs $21.79 with 490 calories, one of the lightest entrées: shrimp, asparagus and tomatoes over angel hair. See lunch and family sizes.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Shrimp Scampi",
      paragraphs: [
        "Shrimp Scampi sautés shrimp in a garlic scampi sauce and tosses it with asparagus, tomatoes and thin angel hair pasta.",
        "The dinner entrée costs $21.79 and has 490 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. That ties with Spaghetti with Marinara for the fewest calories among the classic entrées.",
        [
          "A weekday lunch version has 460 calories, and a family-size pan serves 4 to 6. All sizes are compared below; see more light choices on the ",
          { text: "lighter portions menu", href: "/lighter-portions" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Shrimp", detail: "Sautéed." },
      { name: "Garlic scampi sauce", detail: "The sauce." },
      { name: "Asparagus and tomatoes", detail: "Tossed with the pasta." },
      { name: "Angel hair pasta", detail: "Thin pasta." },
    ],
    allergenFacts: ["Shrimp in a garlic scampi sauce with asparagus, tomatoes and angel hair."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A seafood starter to share before a light entrée." },
      { offeringId: "desserts--chocolate-lasagna", kind: "Dessert", reason: "A light entrée leaves room for a rich dessert." },
      { offeringId: LEMONADE, kind: "Drink", reason: "Lemonade with a garlic and lemon-style sauce." },
    ],
    relatedOfferingIds: ["classic-entrees--chicken-scampi", "classic-entrees--shrimp-alfredo", "classic-entrees--herb-grilled-salmon"],
    faqs: [
      {
        question: "Is Olive Garden Shrimp Scampi a low-calorie entrée?",
        answer:
          "At 490 calories it ties with Spaghetti with Marinara for the fewest calories among the classic entrées, according to Olive Garden’s nutrition guide. Soup or salad and breadsticks add more.",
      },
      {
        question: "Is Shrimp Scampi on the lunch menu?",
        answer: "Yes. Olive Garden’s weekday lunch menu lists a Shrimp Scampi with 460 calories.",
        link: { text: "See the lunch menu", href: "/lunch-menu" },
      },
    ],
    related: FAMILY_ENTREE_RELATED,
  }),

  itemPage({
    slug: "herb-grilled-salmon",
    primaryOfferingId: "classic-entrees--herb-grilled-salmon",
    primaryKeyword: "olive garden salmon",
    secondaryKeywords: ["herb grilled salmon price", "herb grilled salmon calories", "olive garden gluten sensitive salmon"],
    h1: "Olive Garden Herb-Grilled Salmon",
    metaTitle: "Olive Garden Herb-Grilled Salmon: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Herb-Grilled Salmon costs $22.79 with 610 calories and 45 g protein, served with parmesan garlic broccoli. Also on the gluten-sensitive menu.",
    servingSummary: "Dinner entrée: salmon fillet with parmesan garlic broccoli",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Herb-Grilled Salmon",
      paragraphs: [
        "Herb-Grilled Salmon is a grilled salmon fillet topped with garlic herb butter and served with parmesan garlic broccoli. It is also listed on Olive Garden’s gluten-sensitive menu.",
        "It costs $22.79 and has 610 calories with 45 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        ["See the other grilled and gluten-sensitive choices on the ", { text: "gluten-sensitive menu", href: "/gluten-sensitive" }, "."],
      ],
    },
    ingredients: [
      { name: "Salmon fillet", detail: "Grilled." },
      { name: "Garlic herb butter", detail: "On top." },
      { name: "Parmesan garlic broccoli", detail: "On the side." },
    ],
    allergenFacts: ["Grilled salmon fillet with garlic herb butter and parmesan garlic broccoli."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "gluten-sensitive--zuppa-toscana", kind: "Soup & salad", reason: "A gluten-sensitive soup to start." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert to finish." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["classic-entrees--6-oz-sirloin", "classic-entrees--shrimp-scampi", "classic-entrees--grilled-chicken-margherita"],
    faqs: [
      {
        question: "Is Olive Garden salmon gluten-free?",
        answer:
          "It is on Olive Garden’s gluten-sensitive menu, which means it is made without gluten-containing ingredients. Olive Garden does not call it gluten-free: the kitchen is not gluten-free and the grill is shared.",
        link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" },
      },
      {
        question: "What comes with the Herb-Grilled Salmon?",
        answer: "Olive Garden serves it with parmesan garlic broccoli, plus the soup or salad and breadsticks that come with classic entrées.",
      },
    ],
    related: GRILL_RELATED,
  }),

  itemPage({
    slug: "6-oz-sirloin",
    primaryOfferingId: "classic-entrees--6-oz-sirloin",
    sizeOfferingIds: ["gluten-sensitive--6-oz-sirloin"],
    primaryKeyword: "olive garden steak",
    secondaryKeywords: ["olive garden 6 oz sirloin", "sirloin price", "sirloin calories", "gluten sensitive sirloin"],
    h1: "Olive Garden 6 oz. Sirloin",
    metaTitle: "Olive Garden 6 oz. Sirloin: Price, Calories & Sides",
    metaDescription:
      "The Olive Garden 6 oz. Sirloin costs $21.99 with 980 calories, served with fettuccine alfredo; the gluten-sensitive plate with broccoli has 480. See allergens.",
    servingSummary: "Dinner entrée: 6 oz sirloin with fettuccine alfredo",
    servingBasis: "One dinner entrée with fettuccine alfredo, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About the Olive Garden 6 oz. Sirloin",
      paragraphs: [
        "The 6 oz. Sirloin is a grilled six-ounce sirloin topped with garlic herb butter, cooked to the temperature you choose and served with fettuccine alfredo.",
        "It costs $21.99 and has 980 calories with 57 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        [
          "The ",
          { text: "gluten-sensitive menu", href: "/gluten-sensitive" },
          " lists the same steak with parmesan garlic broccoli instead of pasta, at 480 calories. Both plates are compared below.",
        ],
      ],
    },
    ingredients: [
      { name: "Sirloin", detail: "Six ounces, grilled to order." },
      { name: "Garlic herb butter", detail: "On top." },
      { name: "Fettuccine alfredo", detail: "On the side (classic plate)." },
    ],
    allergenFacts: ["Grilled sirloin with garlic herb butter and a side of fettuccine alfredo."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad is one of the first-course choices." },
      { offeringId: "sides-sauces-and-extras--side-of-mashed-potatoes", kind: "Side", reason: "A classic side with steak." },
      { offeringId: "desserts--black-tie-mousse-cake", kind: "Dessert", reason: "A rich chocolate dessert for a steak dinner." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["classic-entrees--herb-grilled-salmon", "classic-entrees--steak-gorgonzola-alfredo", "classic-entrees--grilled-chicken-margherita"],
    faqs: [
      {
        question: "Does Olive Garden have steak?",
        answer:
          "Yes. The 6 oz. Sirloin is a grilled steak entrée, and Steak Gorgonzola Alfredo combines sirloin with pasta. The sirloin is cooked to the temperature you choose.",
      },
      {
        question: "What is the difference between the classic and gluten-sensitive sirloin?",
        answer:
          "The classic plate comes with fettuccine alfredo and has 980 calories; the gluten-sensitive plate comes with parmesan garlic broccoli and has 480, according to Olive Garden’s nutrition guide.",
        link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" },
      },
    ],
    related: GRILL_RELATED,
  }),

  itemPage({
    slug: "spicy-alfredo-fettuccine",
    primaryOfferingId: "classic-entrees--spicy-alfredo-fettuccine",
    sizeOfferingIds: ["lunch-menu--spicy-alfredo-fettuccine", "lighter-portions--spicy-alfredo-fettuccine"],
    primaryKeyword: "olive garden spicy alfredo",
    secondaryKeywords: ["spicy alfredo fettuccine price", "spicy alfredo calories", "spicy alfredo vs regular"],
    metaTitle: "Olive Garden Spicy Alfredo Fettuccine: Price, Calories & Sizes",
    metaDescription:
      "Olive Garden Spicy Alfredo Fettuccine costs $17.49 with 1,330 calories: alfredo warmed up with Calabrian peppers. Limited time. See lunch and lighter sizes.",
    servingSummary: "Dinner entrée, with soup or salad and breadsticks (limited time)",
    servingBasis: "One dinner entrée, as served",
    entreeFirstCourse: true,
    priceSubject: "A dinner entrée",
    about: {
      heading: "About Olive Garden Spicy Alfredo Fettuccine",
      paragraphs: [
        "Spicy Alfredo Fettuccine is a limited-time version of Olive Garden’s signature pasta: fettuccine in the classic parmesan, cream, butter and garlic alfredo sauce, warmed up with Calabrian peppers.",
        "The dinner entrée costs $17.49 and has 1,330 calories, based on the online pickup price we checked in November 2026 and Olive Garden’s U.S. nutrition guide. As a limited-time item it may leave the menu.",
        [
          "Lunch and lighter versions have 1,000 calories each. Compare it with the regular dish on the ",
          { text: "Amazing Alfredos page", href: "/amazing-alfredos" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Fettuccine", detail: "Flat ribbon pasta." },
      { name: "Alfredo sauce", detail: "Parmesan, cream, butter and garlic." },
      { name: "Calabrian peppers", detail: "Add the heat." },
    ],
    allergenFacts: ["Fettuccine in a spicy alfredo sauce with Calabrian peppers."],
    pairings: [
      { offeringId: SALAD, kind: "Soup & salad", reason: "The house salad cools things down." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Add grilled chicken for more protein." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A cold lemonade with a spicy sauce." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A cool, creamy dessert after some heat." },
    ],
    relatedOfferingIds: ["classic-entrees--fettuccine-alfredo", "classic-entrees--shrimp-alfredo", "classic-entrees--seafood-alfredo"],
    faqs: [
      {
        question: "How is Spicy Alfredo different from regular Fettuccine Alfredo?",
        answer:
          "Olive Garden makes it with the same alfredo sauce warmed up with Calabrian peppers. The dinner portion has 1,330 calories versus 1,220 for the regular Fettuccine Alfredo, according to the nutrition guide.",
      },
      {
        question: "Is Spicy Alfredo still on the menu?",
        answer:
          "It was on Olive Garden’s online menu as a limited-time item when we checked in November 2026. Limited-time dishes can leave the menu.",
      },
    ],
    related: [
      { categoryId: "amazing-alfredos", text: "Every Alfredo dish side by side." },
      { categoryId: "classic-entrees", text: "Every classic entrée with prices and calories." },
      { categoryId: "lighter-portions", text: "Smaller dinner portions of popular pastas." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),

  // ---------------- Desserts
  itemPage({
    slug: "chocolate-lasagna",
    primaryOfferingId: "desserts--chocolate-lasagna",
    primaryKeyword: "olive garden chocolate lasagna",
    secondaryKeywords: ["chocolate lasagna price", "chocolate lasagna calories", "olive garden chocolate dessert"],
    metaTitle: "Olive Garden Chocolate Lasagna: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Chocolate Lasagna costs $9.99 a slice with 980 calories: layers of chocolate cake and chocolate mousse. See nutrition, allergens and FAQs.",
    servingSummary: "One dessert slice",
    servingBasis: "One dessert slice, as served",
    unitLabel: "slice",
    priceSubject: "One slice",
    about: {
      heading: "About Olive Garden Chocolate Lasagna",
      paragraphs: [
        "Chocolate Lasagna is a layered chocolate dessert: chocolate cake and creamy chocolate mousse with a thin layer of crushed wafers, finished with chocolate sauce. Olive Garden marks it with its vegetarian (V) label.",
        "One slice costs $9.99 and has 980 calories with 86 g sugars, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. That is the most calories of the regular desserts.",
        ["Lighter choices are on the ", { text: "dessert menu", href: "/desserts" }, ", from 470 calories for Tiramisu."],
      ],
    },
    ingredients: [
      { name: "Chocolate cake", detail: "Layered." },
      { name: "Chocolate mousse", detail: "Between the cake layers." },
      { name: "Crushed wafers", detail: "A thin layer." },
      { name: "Chocolate sauce", detail: "On top." },
    ],
    allergenFacts: ["Layers of chocolate cake and chocolate mousse with crushed wafers and chocolate sauce."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "A coffee to balance a very sweet slice." },
      { offeringId: ESPRESSO, kind: "Drink", reason: "A small, strong coffee with chocolate." },
      { offeringId: "classic-entrees--shrimp-scampi", kind: "Entrée", reason: "At 490 calories, a light main course before a rich dessert." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "No added sugar next to a sweet cake." },
    ],
    relatedOfferingIds: ["desserts--black-tie-mousse-cake", "desserts--tiramisu", "desserts--warm-italian-doughnuts"],
    compareHeading: "How Chocolate Lasagna compares with other Olive Garden desserts",
    faqs: [
      {
        question: "What is Olive Garden Chocolate Lasagna made of?",
        answer: "Olive Garden describes it as layers of chocolate cake and creamy chocolate mousse with a thin layer of crushed wafers, finished with chocolate sauce. It contains no pasta.",
      },
      {
        question: "Is Chocolate Lasagna big enough to share?",
        answer:
          "Olive Garden sells it as one dessert slice and does not state a number of servings. At 980 calories and 86 g sugars, many guests choose to share it.",
      },
    ],
    related: DESSERT_RELATED,
  }),

  itemPage({
    slug: "warm-italian-doughnuts",
    primaryOfferingId: "desserts--warm-italian-doughnuts",
    primaryKeyword: "olive garden doughnuts",
    secondaryKeywords: ["warm italian doughnuts price", "warm italian doughnuts calories", "olive garden zeppoli"],
    h1: "Olive Garden Warm Italian Doughnuts",
    metaTitle: "Olive Garden Warm Italian Doughnuts: Price, Calories & Sauces",
    metaDescription:
      "Olive Garden Warm Italian Doughnuts cost $8.99 with 810 calories before the dipping sauce: raspberry adds 210, chocolate 220. See allergens and FAQs.",
    servingSummary: "One dessert order, with raspberry or chocolate dipping sauce",
    servingBasis: "One order without the dipping sauce",
    priceSubject: "One order",
    about: {
      heading: "About Olive Garden Warm Italian Doughnuts",
      paragraphs: [
        "Warm Italian Doughnuts are fried doughnuts tossed in vanilla sugar and served with your choice of raspberry or chocolate sauce for dipping. Olive Garden marks them with its vegetarian (V) label.",
        "One order costs $8.99, the lowest price of the regular desserts, and has 810 calories before the sauce, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        ["Compare them with the cakes and cheesecakes on the ", { text: "dessert menu", href: "/desserts" }, "."],
      ],
    },
    ingredients: [
      { name: "Doughnuts", detail: "Fried and served warm." },
      { name: "Vanilla sugar", detail: "The coating." },
      { name: "Raspberry or chocolate sauce", detail: "Your choice, for dipping." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks them as fried in soy oil." },
    ],
    allergenFacts: ["Fried doughnuts in vanilla sugar with raspberry or chocolate dipping sauce."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "Coffee and warm doughnuts." },
      { offeringId: ESPRESSO, kind: "Drink", reason: "A small, strong coffee with something sweet." },
      { offeringId: "classic-entrees--grilled-chicken-margherita", kind: "Entrée", reason: "At 650 calories, a lighter main course before dessert." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "No added sugar next to a sweet dessert." },
    ],
    relatedOfferingIds: ["desserts--tiramisu", "desserts--chocolate-lasagna", "desserts--strawberry-cream-cake"],
    compareHeading: "How Warm Italian Doughnuts compare with other Olive Garden desserts",
    faqs: [
      {
        question: "Which sauce comes with the Warm Italian Doughnuts?",
        answer:
          "You choose raspberry or chocolate. Olive Garden’s nutrition guide lists the raspberry sauce at 210 calories and the chocolate sauce at 220, so the order comes to 1,020 or 1,030 calories with one sauce (our calculation).",
      },
      {
        question: "Are the doughnuts fried?",
        answer: "Yes. Olive Garden’s allergen guide marks them as fried in soy oil, and Olive Garden says its kitchens do not have a separate fryer.",
      },
    ],
    related: DESSERT_RELATED,
  }),

  itemPage({
    slug: "pumpkin-cookie-butter-cheesecake",
    primaryOfferingId: "desserts--pumpkin-cookie-butter-cheesecake",
    sizeOfferingIds: ["catering--pumpkin-cookie-butter-cheesecake"],
    primaryKeyword: "olive garden pumpkin cheesecake",
    secondaryKeywords: ["pumpkin cookie butter cheesecake price", "pumpkin cookie butter cheesecake calories", "olive garden seasonal dessert"],
    h1: "Olive Garden Pumpkin Cookie Butter Cheesecake",
    metaTitle: "Olive Garden Pumpkin Cookie Butter Cheesecake: Price & Calories",
    metaDescription:
      "Olive Garden Pumpkin Cookie Butter Cheesecake costs $9.79 a slice with 620 calories, a limited-time dessert with caramel and whipped cream. See allergens.",
    servingSummary: "One dessert slice (limited time)",
    servingBasis: "One dessert slice, as served",
    unitLabel: "slice",
    priceSubject: "One slice",
    about: {
      heading: "About the Pumpkin Cookie Butter Cheesecake",
      paragraphs: [
        "The Pumpkin Cookie Butter Cheesecake is a limited-time dessert: layers of pumpkin and classic cheesecake with a cookie butter swirl on a graham crust, topped with caramel and whipped cream. Olive Garden marks it with its vegetarian (V) label.",
        "One slice costs $9.79 and has 620 calories, based on the online pickup price we checked in November 2026 and Olive Garden’s U.S. nutrition guide. As a limited-time item it may leave the menu.",
        ["The regular cheesecake on the ", { text: "dessert menu", href: "/desserts" }, " is the Sicilian Cheesecake with strawberry topping."],
      ],
    },
    ingredients: [
      { name: "Pumpkin cheesecake", detail: "Layered with classic cheesecake." },
      { name: "Cookie butter swirl", detail: "Through the filling." },
      { name: "Graham crust", detail: "The base." },
      { name: "Caramel and whipped cream", detail: "On top." },
    ],
    allergenFacts: ["Pumpkin and classic cheesecake with cookie butter on a graham crust, with caramel and whipped cream."],
    pairings: [
      { offeringId: CAPPUCCINO, kind: "Drink", reason: "A warm coffee with a seasonal dessert." },
      { offeringId: ESPRESSO, kind: "Drink", reason: "A small, strong coffee next to a sweet slice." },
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée before dessert." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "No added sugar next to a sweet slice." },
    ],
    relatedOfferingIds: ["desserts--sicilian-cheesecake-with-strawberry-topping", "desserts--tiramisu", "desserts--strawberry-cream-cake"],
    compareHeading: "How the Pumpkin Cookie Butter Cheesecake compares with other desserts",
    faqs: [
      {
        question: "Is the Pumpkin Cookie Butter Cheesecake still available?",
        answer:
          "It was on Olive Garden’s online menu as a limited-time dessert when we checked in November 2026. Seasonal desserts can leave the menu.",
      },
      {
        question: "Can you order the Pumpkin Cookie Butter Cheesecake for a group?",
        answer: "Yes. Olive Garden’s catering menu also listed it when we checked; see the sizes table above and the catering page.",
        link: { text: "See the catering menu", href: "/catering" },
      },
    ],
    related: [
      { categoryId: "desserts", text: "Every Olive Garden dessert with prices and calories." },
      { categoryId: "catering", text: "Desserts for groups." },
      { categoryId: "non-alcoholic-beverages", text: "Coffee, tea and other drinks to go with dessert." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),

  // ---------------- Kids, lunch, salad
  itemPage({
    slug: "kids-macaroni-and-cheese",
    primaryOfferingId: "kids-meal--kids-macaroni-and-cheese",
    primaryKeyword: "olive garden kids mac and cheese",
    secondaryKeywords: ["olive garden kids macaroni and cheese", "kids mac and cheese calories", "kids mac and cheese price"],
    h1: "Olive Garden Kids Macaroni & Cheese",
    metaTitle: "Olive Garden Kids Mac & Cheese: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Kids Macaroni & Cheese costs $7.49 with 360 calories for the main dish: pasta shells in creamy cheese sauce, served with a side and milk.",
    servingSummary: "Kids meal: macaroni & cheese, with a side and milk",
    servingBasis: "Kids macaroni & cheese only (side and drink not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: "About Olive Garden Kids Macaroni & Cheese",
      paragraphs: [
        "Kids Macaroni & Cheese is a kid-size portion of pasta shells in a creamy cheese sauce, served with a choice of side and 1% low-fat milk. Olive Garden marks it with its vegetarian (V) label and lists kids meals for children under 12.",
        "The kids meal costs $7.49. The macaroni & cheese has 360 calories according to Olive Garden’s U.S. nutrition guide.",
        ["See every option on the ", { text: "kids menu", href: "/kids-meal" }, "."],
      ],
    },
    ingredients: [
      { name: "Pasta shells", detail: "Kid-size portion." },
      { name: "Cheese sauce", detail: "Creamy." },
    ],
    allergenFacts: ["Pasta shells in a creamy cheese sauce."],
    pairings: [
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée for the adults at the table." },
      { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade for the table." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A fruity dessert to share." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade for the table." },
    ],
    relatedOfferingIds: ["kids-meal--kids-pizza", "kids-meal--kids-cheese-ravioli", "kids-meal--kids-chicken-fingers"],
    compareHeading: "How Kids Macaroni & Cheese compares with other kids meals",
    faqs: [
      {
        question: "What comes with the Kids Macaroni & Cheese?",
        answer:
          "Olive Garden lists kids meals for children under 12. The calories in the nutrition guide are for the main dish; the side and the drink are listed separately.",
        link: { text: "See all kids meals", href: "/kids-meal" },
      },
      {
        question: "Is the Kids Macaroni & Cheese vegetarian?",
        answer:
          "Olive Garden marks it with its vegetarian (V) label on the online menu. Olive Garden also notes that shared kitchens mean cross-contact with animal products is possible.",
      },
    ],
    related: [
      { categoryId: "kids-meal", text: "Every kids meal with prices and calories." },
      { categoryId: "gluten-sensitive", text: "Kids options on the gluten-sensitive menu." },
      { categoryId: "desserts", text: "Desserts to share after the meal." },
      { guide: "dinner-menu", text: "Plan a family dinner, from starters to dessert." },
    ],
  }),

  itemPage({
    slug: "italian-grilled-chicken-sandwich",
    primaryOfferingId: "lunch-menu--italian-grilled-chicken-sandwich",
    primaryKeyword: "olive garden grilled chicken sandwich",
    secondaryKeywords: ["italian grilled chicken sandwich price", "italian grilled chicken sandwich calories", "olive garden lunch sandwich"],
    h1: "Olive Garden Italian Grilled Chicken Sandwich",
    metaTitle: "Olive Garden Italian Grilled Chicken Sandwich: Price & Calories",
    metaDescription:
      "The Olive Garden Italian Grilled Chicken Sandwich costs $11.99 with 860 calories and 45 g protein, served with french fries at weekday lunch. See allergens.",
    servingSummary: "One sandwich with french fries (weekday lunch)",
    servingBasis: "One sandwich with french fries, as served",
    unitLabel: "sandwich",
    priceSubject: "One sandwich",
    about: {
      heading: "About the Italian Grilled Chicken Sandwich",
      paragraphs: [
        "The Italian Grilled Chicken Sandwich layers grilled chicken breast with mozzarella, tomatoes, pepperoncini and lettuce in Olive Garden’s signature dressing on a garlic knot bun, served with french fries.",
        "It costs $11.99 and has 860 calories with 45 g protein, including the fries, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide.",
        ["It is one of the weekday sandwiches on the ", { text: "lunch menu", href: "/lunch-menu" }, "."],
      ],
    },
    ingredients: [
      { name: "Grilled chicken breast", detail: "The main protein." },
      { name: "Mozzarella, tomatoes, pepperoncini and lettuce", detail: "Toppings." },
      { name: "Signature dressing", detail: "On the sandwich." },
      { name: "Garlic knot bun", detail: "The bread." },
      { name: "French fries", detail: "On the side; marked as fried in soy oil." },
    ],
    allergenFacts: ["Grilled chicken with mozzarella, tomatoes, pepperoncini, lettuce and dressing on a garlic knot bun, with fries."],
    pairings: [
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a sandwich." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert, if you want something sweet." },
      { offeringId: "sides-sauces-and-extras--side-of-broccoli", kind: "Side", reason: "Add a vegetable side." },
    ],
    relatedOfferingIds: ["lunch-menu--eggplant-parmigiana-sandwich", "lunch-menu--chicken-alfredo-flatbread", "lunch-menu--five-cheese-flatbread"],
    compareHeading: "How the Italian Grilled Chicken Sandwich compares with other lunch items",
    faqs: [
      {
        question: "When can you order the Italian Grilled Chicken Sandwich?",
        answer: "Olive Garden lists it on the weekday lunch menu, served Monday to Friday until 3 PM at the restaurant we checked. Lunch hours can vary by location.",
        link: { text: "See Olive Garden hours", href: "/hours" },
      },
      {
        question: "Does the sandwich come with fries?",
        answer: "Yes. It is served with french fries, and the 860 calories in the nutrition guide include them.",
      },
    ],
    related: [
      { categoryId: "lunch-menu", text: "Every weekday lunch item with prices and calories." },
      { categoryId: "soups-salad-and-breadsticks", text: "The weekday soup, salad and breadsticks lunch." },
      { categoryId: "lighter-portions", text: "Smaller pasta portions after lunch hours." },
      { guide: "hours", text: "When the lunch menu is served." },
    ],
  }),

  itemPage({
    slug: "famous-house-salad",
    // Same dish as a catering tray / family pan / other listing (owner decision 2026-11-19).
    equivalentOfferingIds: ["gluten-sensitive--famous-house-salad-without-croutons"],
    primaryOfferingId: SALAD,
    sizeOfferingIds: ["family-style-meals--famous-house-salad"],
    primaryKeyword: "olive garden salad",
    secondaryKeywords: ["olive garden house salad calories", "olive garden salad price", "jumbo house salad", "salad without croutons"],
    h1: "Olive Garden Famous House Salad",
    metaTitle: "Olive Garden Famous House Salad: Price, Calories & Sizes",
    metaDescription:
      "The Olive Garden Famous House Salad costs $9.29 to go with 290 calories with dressing, plus two breadsticks. See the jumbo salad, the version without croutons and allergens.",
    servingSummary: "One to-go salad with dressing, plus two breadsticks",
    servingBasis: "One to-go salad with signature Italian dressing (breadsticks not included)",
    unitLabel: "salad",
    priceSubject: "One to-go salad",
    about: {
      heading: "About the Olive Garden Famous House Salad",
      paragraphs: [
        "The Famous House Salad is Olive Garden’s classic first course: crisp greens with olives, onions, pepperoncini, tomatoes, croutons and parmesan, with the signature Italian dressing. Ordered on its own to go, it comes with two breadsticks.",
        "The to-go salad costs $9.29 and has 290 calories with dressing, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The breadsticks are listed separately at 140 calories each.",
        [
          "For a group, the jumbo salad serves 6 with 12 breadsticks. Guests avoiding gluten can order it without croutons from the ",
          { text: "gluten-sensitive menu", href: "/gluten-sensitive" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Salad greens", detail: "The base." },
      { name: "Olives, onions, pepperoncini and tomatoes", detail: "Toppings." },
      { name: "Croutons and parmesan", detail: "Left off on the gluten-sensitive version (croutons)." },
      { name: "Signature Italian dressing", detail: "Included." },
    ],
    allergenFacts: ["House salad with croutons, parmesan and the signature Italian dressing."],
    pairings: [
      { offeringId: SOUPS, kind: "Soup & salad", reason: "Soup and salad together make the classic first course." },
      { offeringId: BREADSTICKS, kind: "Appetizer", reason: "Extra breadsticks for the table." },
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée after the salad." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["gluten-sensitive--famous-house-salad-without-croutons", SOUPS, "soups-salad-and-breadsticks--soup-salad-and-breadsticks"],
    compareHeading: "How the house salad compares with soups and the gluten-sensitive salad",
    faqs: [
      {
        question: "How many calories are in the house salad that comes with an entrée?",
        answer:
          "Olive Garden’s nutrition guide lists the salad served as a first course at 150 calories with signature Italian dressing. The 290-calorie value on this page is for the larger to-go salad.",
      },
      {
        question: "Can I get the house salad without croutons?",
        answer: "Yes. The gluten-sensitive menu lists the Famous House Salad without croutons at 110 calories; breadsticks are left off unless requested.",
        link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" },
      },
    ],
    related: [
      { categoryId: "soups-salad-and-breadsticks", text: "Soups, salad and breadsticks with prices and calories." },
      { categoryId: "gluten-sensitive", text: "The salad without croutons and other gluten-sensitive items." },
      { categoryId: "family-style-meals", text: "The jumbo salad for 6 and family pans." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),
];
