import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage } from "./_build";

/**
 * Phase 7 (2026-11-18): gluten-sensitive and kids items with a single official
 * row and an accurate photo (checked visually 2026-11-18). Wording rules:
 * "gluten-sensitive", never "gluten-free", except the rotini pasta itself
 * (official wording); kids calories are for the main dish only.
 * Pending (research/products/PENDING.md): Grilled Chicken Parmigiana (photo
 * shows spaghetti), Kids Macaroni & Cheese (photo shows elbow macaroni, the
 * official dish is pasta shells), Famous House Salad without croutons (one page
 * with the house salad, Phase 6 decision).
 * Fact logs: research/products/<slug>/FACT_VERIFICATION.md.
 */
const GS_RELATED: RelatedMenuRef[] = [
  { categoryId: "gluten-sensitive", text: "Every gluten-sensitive item with prices and calories." },
  { categoryId: "create-your-own-pasta", text: "Build a pasta with gluten-free rotini." },
  { categoryId: "soups-salad-and-breadsticks", text: "Soups and the house salad." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const KIDS_RELATED: RelatedMenuRef[] = [
  { categoryId: "kids-meal", text: "Every kids meal with prices and calories." },
  { categoryId: "gluten-sensitive", text: "Kids options on the gluten-sensitive menu." },
  { categoryId: "desserts", text: "Desserts to share after the meal." },
  { guide: "dinner-menu", text: "Plan a family dinner, from starters to dessert." },
];
const GS_NOTE =
  "Olive Garden says its gluten-sensitive items are made without gluten-containing ingredients, but they are not lab-tested gluten-free, the kitchen is not gluten-free and there is no separate fryer. Tell your server that you are avoiding gluten.";
const KIDS_PORTION =
  "Olive Garden lists kids meals for children under 12. The calories in the nutrition guide are for the main dish; the side and the drink are listed separately.";
const UNSWEET_TEA = "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea";
const LEMONADE = "non-alcoholic-beverages--classic-lemonade";
const GS_SALAD = "gluten-sensitive--famous-house-salad-without-croutons";

const gsFaq = (name: string) => ({
  question: `Is Olive Garden ${name} gluten-free?`,
  answer: `It is on Olive Garden’s gluten-sensitive menu. ${GS_NOTE}`,
  link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" },
});
const kidsFaq = (name: string) => ({
  question: `What comes with the Kids ${name}?`,
  answer: KIDS_PORTION,
  link: { text: "See all kids meals", href: "/kids-meal" },
});

export const gsKidsPages: ProductPageContent[] = [
  itemPage({
    slug: "zuppa-toscana",
    primaryOfferingId: "gluten-sensitive--zuppa-toscana",
    primaryKeyword: "olive garden zuppa toscana",
    secondaryKeywords: ["zuppa toscana calories", "zuppa toscana price", "olive garden sausage kale soup"],
    metaTitle: "Olive Garden Zuppa Toscana: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Zuppa Toscana costs $9.29 a serving with 220 calories: spicy Italian sausage, kale and potatoes in a creamy soup. See nutrition and allergens.",
    servingSummary: "One serving of soup",
    servingBasis: "One serving of soup, as served",
    unitLabel: "serving",
    priceSubject: "One serving",
    about: {
      heading: "About Olive Garden Zuppa Toscana",
      paragraphs: [
        "Zuppa Toscana is one of Olive Garden’s four homemade soups: a creamy soup with spicy Italian sausage, kale and potatoes. It is also listed on the gluten-sensitive menu.",
        "One serving costs $9.29 and has 220 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The allergen guide marks only dairy for it.",
        [
          "Zuppa Toscana is one of the soup choices with the never-ending ",
          { text: "soup, salad and breadsticks", href: "/soups-salad-and-breadsticks" },
          " and with classic entrées.",
        ],
      ],
    },
    ingredients: [
      { name: "Spicy Italian sausage", detail: "The main protein." },
      { name: "Kale", detail: "Leafy greens." },
      { name: "Potatoes", detail: "Cooked in the soup." },
      { name: "Creamy broth", detail: "The soup base." },
    ],
    allergenFacts: ["Creamy soup with spicy Italian sausage, kale and potatoes."],
    pairings: [
      { offeringId: GS_SALAD, kind: "Soup & salad", reason: "The gluten-sensitive house salad, without croutons." },
      { offeringId: "gluten-sensitive--herb-grilled-salmon", kind: "Entrée", reason: "A grilled main course from the same gluten-sensitive menu." },
      { offeringId: "gluten-sensitive--rotini-pasta-with-marinara", kind: "Entrée", reason: "Gluten-free rotini with marinara after a creamy soup." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: [GS_SALAD, "gluten-sensitive--rotini-pasta-with-marinara", "gluten-sensitive--herb-grilled-salmon"],
    compareHeading: "How Zuppa Toscana compares with other gluten-sensitive items",
    faqs: [
      gsFaq("Zuppa Toscana"),
      {
        question: "Is Zuppa Toscana spicy?",
        answer: "Olive Garden describes it as made with spicy Italian sausage, so it has some heat from the sausage.",
      },
    ],
    related: GS_RELATED,
  }),

  itemPage({
    slug: "rotini-pasta-with-marinara",
    primaryOfferingId: "gluten-sensitive--rotini-pasta-with-marinara",
    primaryKeyword: "olive garden gluten free pasta",
    secondaryKeywords: ["olive garden rotini marinara", "gluten-free rotini calories", "olive garden gluten sensitive pasta"],
    metaTitle: "Olive Garden Gluten-Free Rotini with Marinara: Price & Calories",
    metaDescription:
      "Olive Garden Rotini Pasta with Marinara costs $13.99 with 530 calories: gluten-free rotini in homemade marinara on the gluten-sensitive menu. See allergens.",
    servingSummary: "Entrée, from the gluten-sensitive menu",
    servingBasis: "One entrée, as served",
    priceSubject: "One entrée",
    about: {
      heading: "About Rotini Pasta with Marinara",
      paragraphs: [
        "Rotini Pasta with Marinara is the simplest pasta on Olive Garden’s gluten-sensitive menu: gluten-free rotini tossed with homemade marinara. Grilled chicken, Italian sausage or shrimp can be added for an extra charge.",
        "It costs $13.99 and has 530 calories, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. Olive Garden says the rotini meets the FDA definition of gluten-free; the dish itself is listed as gluten-sensitive because it is prepared in a shared kitchen.",
        [
          "The same rotini is a pasta choice when you ",
          { text: "create your own pasta", href: "/create-your-own-pasta" },
          ".",
        ],
      ],
    },
    ingredients: [
      { name: "Gluten-free rotini", detail: "Olive Garden says it meets the FDA gluten-free definition." },
      { name: "Marinara", detail: "Homemade tomato sauce." },
    ],
    allergenFacts: ["Gluten-free rotini with homemade marinara."],
    pairings: [
      { offeringId: "gluten-sensitive--zuppa-toscana", kind: "Soup & salad", reason: "A gluten-sensitive soup to start." },
      { offeringId: GS_SALAD, kind: "Soup & salad", reason: "The gluten-sensitive house salad, without croutons." },
      { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken", kind: "Side", reason: "Grilled chicken is one of the paid protein add-ons." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a tomato sauce pasta." },
    ],
    relatedOfferingIds: ["gluten-sensitive--rotini-pasta-with-meat-sauce", "gluten-sensitive--zuppa-toscana", "gluten-sensitive--herb-grilled-salmon"],
    compareHeading: "How Rotini with Marinara compares with other gluten-sensitive items",
    faqs: [
      {
        question: "What gluten-free pasta does Olive Garden use?",
        answer:
          "Olive Garden serves rotini that it says is made mainly from brown rice flour and meets the FDA gluten-free definition. It is cooked and held separately, but the kitchen is not gluten-free.",
        link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" },
      },
      gsFaq("Rotini Pasta with Marinara"),
    ],
    related: GS_RELATED,
  }),

  itemPage({
    slug: "rotini-pasta-with-meat-sauce",
    primaryOfferingId: "gluten-sensitive--rotini-pasta-with-meat-sauce",
    primaryKeyword: "olive garden gluten free pasta with meat sauce",
    secondaryKeywords: ["rotini with meat sauce calories", "olive garden gluten sensitive meat sauce", "gluten-free rotini"],
    metaTitle: "Olive Garden Rotini with Meat Sauce: Price & Calories",
    metaDescription:
      "Olive Garden Rotini Pasta with Meat Sauce costs $13.99 with 680 calories: gluten-free rotini in beef and Italian sausage meat sauce. See allergens and FAQs.",
    servingSummary: "Entrée, from the gluten-sensitive menu",
    servingBasis: "One entrée, as served",
    priceSubject: "One entrée",
    about: {
      heading: "About Rotini Pasta with Meat Sauce",
      paragraphs: [
        "Rotini Pasta with Meat Sauce pairs Olive Garden’s gluten-free rotini with its homemade meat sauce of beef and Italian sausage. It is on the gluten-sensitive menu, and protein add-ons are available for an extra charge.",
        "It costs $13.99 and has 680 calories with 23 g protein, based on the online pickup price we checked and Olive Garden’s U.S. nutrition guide. The marinara version has 530 calories.",
        [
          "Both rotini dishes are listed on the ",
          { text: "gluten-sensitive menu", href: "/gluten-sensitive" },
          "; kids versions are on the kids menu.",
        ],
      ],
    },
    ingredients: [
      { name: "Gluten-free rotini", detail: "Olive Garden says it meets the FDA gluten-free definition." },
      { name: "Meat sauce", detail: "Homemade, with beef and Italian sausage." },
    ],
    allergenFacts: ["Gluten-free rotini with a beef and Italian sausage meat sauce."],
    pairings: [
      { offeringId: GS_SALAD, kind: "Soup & salad", reason: "The gluten-sensitive house salad, without croutons." },
      { offeringId: "gluten-sensitive--zuppa-toscana", kind: "Soup & salad", reason: "A gluten-sensitive soup to start." },
      { offeringId: UNSWEET_TEA, kind: "Drink", reason: "An unsweetened iced tea with no calories." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade with a hearty pasta." },
    ],
    relatedOfferingIds: ["gluten-sensitive--rotini-pasta-with-marinara", "gluten-sensitive--zuppa-toscana", "gluten-sensitive--herb-grilled-salmon"],
    compareHeading: "How Rotini with Meat Sauce compares with other gluten-sensitive items",
    faqs: [
      gsFaq("Rotini Pasta with Meat Sauce"),
      {
        question: "What is in Olive Garden’s meat sauce?",
        answer: "Olive Garden describes its homemade meat sauce as made with beef and Italian sausage.",
      },
    ],
    related: GS_RELATED,
  }),

  itemPage({
    slug: "kids-pizza",
    primaryOfferingId: "kids-meal--kids-pizza",
    primaryKeyword: "olive garden kids pizza",
    secondaryKeywords: ["olive garden kids pizza price", "kids pizza calories", "olive garden kids menu pizza"],
    metaTitle: "Olive Garden Kids Pizza: Price, Calories & What Comes With It",
    metaDescription:
      "The Olive Garden Kids Pizza costs $7.49 with 400 calories for the cheese pizza, served with a side and milk. See pepperoni, nutrition and allergens.",
    servingSummary: "Kids meal: cheese or pepperoni pizza, with a side and milk",
    servingBasis: "Kids cheese pizza only (side and drink not included)",
    unitLabel: "kids pizza",
    priceSubject: "One kids meal",
    about: {
      heading: "About the Olive Garden Kids Pizza",
      paragraphs: [
        "The Kids Pizza is a kid-size cheese or pepperoni pizza with marinara and mozzarella, served with a choice of side and 1% low-fat milk. Olive Garden lists kids meals for children under 12.",
        "The kids meal costs $7.49. The cheese pizza has 400 calories according to Olive Garden’s U.S. nutrition guide, which lists pepperoni as an add-on of 60 calories.",
        ["Compare it with the other choices on the ", { text: "kids menu", href: "/kids-meal" }, " below."],
      ],
    },
    ingredients: [
      { name: "Pizza crust", detail: "Kid-size." },
      { name: "Marinara", detail: "Tomato sauce." },
      { name: "Mozzarella", detail: "Melted cheese." },
      { name: "Pepperoni", detail: "Optional." },
    ],
    allergenFacts: ["Kid-size pizza with marinara and mozzarella; pepperoni optional."],
    pairings: [
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée for the adults at the table." },
      { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade for the table." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A dessert for the adults to share." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade for the table." },
    ],
    relatedOfferingIds: ["kids-meal--kids-chicken-fingers", "kids-meal--kids-cheese-ravioli", "kids-meal--kids-macaroni-and-cheese"],
    compareHeading: "How the Kids Pizza compares with other kids meals",
    faqs: [
      kidsFaq("Pizza"),
      {
        question: "How many calories does pepperoni add to the Kids Pizza?",
        answer: "Olive Garden’s U.S. nutrition guide lists pepperoni as an add-on of 60 calories to the 400-calorie kids cheese pizza.",
      },
    ],
    related: KIDS_RELATED,
  }),

  itemPage({
    slug: "kids-chicken-fingers",
    primaryOfferingId: "kids-meal--kids-chicken-fingers",
    primaryKeyword: "olive garden kids chicken fingers",
    secondaryKeywords: ["olive garden chicken tenders kids", "kids chicken fingers calories", "kids chicken fingers price"],
    metaTitle: "Olive Garden Kids Chicken Fingers: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Kids Chicken Fingers cost $7.49 with 300 calories and 25 g protein for the main dish, served with a side and a drink. See allergens and FAQs.",
    servingSummary: "Kids meal: chicken fingers, with a side and a drink",
    servingBasis: "Kids chicken fingers only (side and drink not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: "About Olive Garden Kids Chicken Fingers",
      paragraphs: [
        "Kids Chicken Fingers are lightly breaded chicken tenders, served with a choice of side and a drink. Olive Garden lists kids meals for children under 12.",
        "The kids meal costs $7.49. The chicken fingers have 300 calories and 25 g protein according to Olive Garden’s U.S. nutrition guide, the most protein of the kids main dishes in our comparison below. The allergen guide marks them as fried in soy oil.",
        ["See every option on the ", { text: "kids menu", href: "/kids-meal" }, "."],
      ],
    },
    ingredients: [
      { name: "Chicken tenders", detail: "Lightly breaded." },
      { name: "Soybean oil", detail: "Olive Garden’s allergen guide marks them as fried in soy oil." },
    ],
    allergenFacts: ["Lightly breaded, fried chicken tenders."],
    pairings: [
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée for the adults at the table." },
      { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade for the table." },
      { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A fruity dessert to share." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade for the table." },
    ],
    relatedOfferingIds: ["kids-meal--kids-pizza", "kids-meal--kids-cheese-ravioli", "kids-meal--kids-macaroni-and-cheese"],
    compareHeading: "How Kids Chicken Fingers compare with other kids meals",
    faqs: [
      kidsFaq("Chicken Fingers"),
      {
        question: "Are Olive Garden Kids Chicken Fingers fried?",
        answer:
          "Yes. Olive Garden’s allergen guide marks them as fried in soy oil, and Olive Garden says its kitchens do not have a separate fryer.",
      },
    ],
    related: KIDS_RELATED,
  }),

  itemPage({
    slug: "kids-cheese-ravioli",
    primaryOfferingId: "kids-meal--kids-cheese-ravioli",
    primaryKeyword: "olive garden kids cheese ravioli",
    secondaryKeywords: ["kids cheese ravioli calories", "kids cheese ravioli price", "olive garden kids pasta"],
    metaTitle: "Olive Garden Kids Cheese Ravioli: Price, Calories & Allergens",
    metaDescription:
      "Olive Garden Kids Cheese Ravioli costs $7.49 with 340 calories for the main dish: cheese-filled ravioli with tomato sauce, served with a side and milk.",
    servingSummary: "Kids meal: cheese ravioli, with a side and milk",
    servingBasis: "Kids cheese ravioli only (side and drink not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: "About Olive Garden Kids Cheese Ravioli",
      paragraphs: [
        "Kids Cheese Ravioli is a kid-size portion of cheese-filled ravioli with tomato sauce, served with a choice of side and 1% low-fat milk. Olive Garden marks it with its vegetarian (V) label and lists kids meals for children under 12.",
        "The kids meal costs $7.49. The ravioli has 340 calories according to Olive Garden’s U.S. nutrition guide.",
        ["See every option on the ", { text: "kids menu", href: "/kids-meal" }, "."],
      ],
    },
    ingredients: [
      { name: "Cheese ravioli", detail: "Cheese-filled pasta." },
      { name: "Tomato sauce", detail: "On top." },
    ],
    allergenFacts: ["Kid-size cheese-filled ravioli with tomato sauce."],
    pairings: [
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée for the adults at the table." },
      { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade for the table." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A dessert for the adults to share." },
      { offeringId: LEMONADE, kind: "Drink", reason: "A classic lemonade for the table." },
    ],
    relatedOfferingIds: ["kids-meal--kids-pizza", "kids-meal--kids-chicken-fingers", "kids-meal--kids-macaroni-and-cheese"],
    compareHeading: "How Kids Cheese Ravioli compares with other kids meals",
    faqs: [
      kidsFaq("Cheese Ravioli"),
      {
        question: "Is the Kids Cheese Ravioli vegetarian?",
        answer:
          "Olive Garden marks it with its vegetarian (V) label on the online menu. Olive Garden also notes that shared kitchens mean cross-contact with animal products is possible.",
      },
    ],
    related: KIDS_RELATED,
  }),
];
