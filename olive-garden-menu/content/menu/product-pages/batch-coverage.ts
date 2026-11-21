import type { ProductPageContent, RelatedMenuRef } from "@/lib/types";
import { itemPage, type ItemPageInput } from "./_build";

/**
 * Complete menu coverage (owner decisions 2026-11-19): every remaining
 * genuinely distinct menu item gets its own page with the verified data that
 * exists, and every gap is disclosed on the page (never filled in):
 * - 3 homemade soups (detail-only records, content/menu/detail-items.ts)
 * - 14 wines and 6 beers (bottle price and calories from the online menu;
 *   the nutrition guide has only generic values by wine/beer type)
 * - simple drinks (fountain sodas, brewed teas, 2-liter sodas, gallons, bottled water)
 * - kids pasta meals (calculated main-dish calories) and the gluten-free rotini kids meals
 * - bundles and combinations (official totals, parts listed, never re-added)
 * Status "preview" until the owner's visual approval. Fact logs:
 * research/products/<slug>/FACT_VERIFICATION.md.
 */
const D = "2026-11-19";
const GAP = (reason: string) => ({ decidedAt: D, checklistKeys: ["nutritionAndAllergens" as const], reason: `Owner decision ${D}: ${reason}` });

/* ------------------------------------------------------------------ soups */

const SOUP_RELATED: RelatedMenuRef[] = [
  { categoryId: "soups-salad-and-breadsticks", text: "All four soups, the house salad and breadsticks." },
  { categoryId: "family-style-meals", text: "Soup by the half gallon or gallon for a group." },
  { categoryId: "lunch-menu", text: "The weekday soup, salad and breadsticks lunch." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const SOUP_FAQ_FIRST_COURSE = {
  question: "Can I choose this soup with an entrée?",
  answer:
    "Yes. Olive Garden’s classic entrées come with soup or salad and breadsticks, and each of the four homemade soups is one of the choices. It is also one of the soups for the never-ending soup, salad and breadsticks meal.",
  link: { text: "See soups, salad and breadsticks", href: "/soups-salad-and-breadsticks" },
};

type SoupInput = { slug: ItemPageInput["slug"]; id: string; name: string; short: string; kw: string; meta: string; about: [string, string]; ingredients: { name: string; detail: string }[]; faq: { question: string; answer: string } };
const soupPage = (s: SoupInput) =>
  itemPage({
    slug: s.slug,
    primaryOfferingId: `soups-salad-and-breadsticks--${s.id}`,
    sizeOfferingIds: [`family-style-meals--${s.id}--half-gallon`, `family-style-meals--${s.id}--gallon`],
    // A single soup has no rating group of its own: it shares "Homemade Soups" (existing rating data unchanged).
    ratingProductId: "homemade-soups",
    primaryKeyword: s.kw,
    secondaryKeywords: [`${s.short} calories`, `${s.short} price`, `${s.short} gallon`],
    metaTitle: `Olive Garden ${s.name}: Price, Calories & Sizes`,
    metaDescription: s.meta,
    servingSummary: "One bowl; also by the half gallon or gallon",
    servingBasis: "One bowl, as served",
    unitLabel: "bowl",
    priceSubject: "One bowl",
    priceNote: "One bowl, online pickup",
    about: { heading: `About Olive Garden ${s.name}`, paragraphs: [s.about[0], s.about[1], ["Compare all four soups on the ", { text: "soups, salad and breadsticks page", href: "/soups-salad-and-breadsticks" }, "."]] },
    ingredients: s.ingredients,
    allergenFacts: [`${s.name}, one of Olive Garden’s four homemade soups.`],
    pairings: [
      { offeringId: "soups-salad-and-breadsticks--famous-house-salad", kind: "Soup & salad", reason: "Soup and salad together make the classic first course." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée after the soup." },
      { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", kind: "Drink", reason: "An unsweetened iced tea with no calories." },
    ],
    relatedOfferingIds: ["gluten-sensitive--zuppa-toscana", "soups-salad-and-breadsticks--famous-house-salad", "soups-salad-and-breadsticks--soup-salad-and-breadsticks"],
    compareHeading: `How ${s.name} compares`,
    faqs: [SOUP_FAQ_FIRST_COURSE, s.faq],
    related: SOUP_RELATED,
  });

/* ------------------------------------------------------------- wine & beer */

const WINE_RELATED: RelatedMenuRef[] = [
  { categoryId: "wine-and-beer-to-go", text: "Every wine and beer to go with prices and calories." },
  { categoryId: "drink-menu", text: "The full Olive Garden drink menu." },
  { categoryId: "classic-entrees", text: "Classic entrées to enjoy with a drink." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const ALCOHOL_RULES =
  "Olive Garden sells wine and beer to go at select locations where permitted by law, to guests 21 and older with a valid ID; some locations require a food purchase.";
const WINE_NUTRITION =
  "Olive Garden’s online menu lists the bottle’s calories, but its nutrition guide gives only general values for wine by type (such as a bottle of white or rosé wine, or of red wine), not for this wine, so fat, carbohydrate and sugar values are not shown. Olive Garden does not state the bottle size.";
const BEER_NUTRITION =
  "The nutrition guide gives only general values for bottled beer by type (light, regular or non-alcoholic), not for this brand, so no other nutrient values are shown.";
const DRINK_ALLERGEN =
  "Olive Garden’s official U.S. allergen guide does not cover this drink. This does not mean it is allergen-free; ask your server if you have an allergy.";

const WINES = [
  "wine-and-beer-to-go--moscato-primo-amore",
  "wine-and-beer-to-go--sweet-pink-moscato-blend-confetti",
  "wine-and-beer-to-go--sweet-red-roscato-rosso-dolce",
  "wine-and-beer-to-go--red-blend-porta-vita",
  "wine-and-beer-to-go--moscato-castello-del-poggio",
  "wine-and-beer-to-go--white-zinfandel-sutter-home",
  "wine-and-beer-to-go--riesling-chateau-ste-michelle",
  "wine-and-beer-to-go--pinot-grigio-cavit",
  "wine-and-beer-to-go--sauvignon-blanc-starborough",
  "wine-and-beer-to-go--chardonnay-chateau-ste-michelle",
  "wine-and-beer-to-go--pinot-noir-meiomi",
  "wine-and-beer-to-go--merlot-beringer",
  "wine-and-beer-to-go--chianti-classico-rocca-delle-macie",
  "wine-and-beer-to-go--cabernet-robert-mondavi-private-selection",
];
const BEERS = [
  "wine-and-beer-to-go--budweiser",
  "wine-and-beer-to-go--bud-light",
  "wine-and-beer-to-go--coors-light",
  "wine-and-beer-to-go--michelob-ultra",
  "wine-and-beer-to-go--miller-lite",
  "wine-and-beer-to-go--heineken-0-0-non-alcoholic",
];
const others = (list: string[], self: string, n = 3) => {
  const i = list.indexOf(self);
  return [...list.slice(i + 1), ...list.slice(0, i)].slice(0, n);
};

type WineInput = { slug: ItemPageInput["slug"]; name: string; price: string; cal: string; style: string; kw: string; pair: [string, string] };
const winePage = (w: WineInput) => {
  const id = `wine-and-beer-to-go--${w.slug}`;
  return itemPage({
    slug: w.slug,
    primaryOfferingId: id,
    acceptedGaps: GAP("publish with the bottle price and calories; no brand nutrition row and no allergen coverage, both disclosed."),
    nutritionUnavailableNote: WINE_NUTRITION,
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: w.kw,
    secondaryKeywords: [`${w.kw} price`, `${w.kw} calories`, "olive garden wine to go"],
    metaTitle: `Olive Garden ${w.name}: Bottle Price & Calories`,
    metaDescription: `${w.name}: ${w.price} a bottle to go at Olive Garden, with ${w.cal} calories per bottle. Who can buy it, and how it compares.`,
    servingSummary: "One bottle to go (21+, where permitted)",
    servingBasis: "One bottle",
    unitLabel: "bottle",
    priceSubject: "One bottle",
    priceNote: "One bottle, online pickup",
    about: {
      heading: `About ${w.name} at Olive Garden`,
      paragraphs: [
        `${w.name} is one of the wines Olive Garden sells by the bottle for to-go orders. ${w.style}`,
        `A bottle costs ${w.price} and the online menu lists ${w.cal} calories for the bottle, at the prices we checked. ${ALCOHOL_RULES}`,
        ["Compare every bottle on the ", { text: "wine and beer to go page", href: "/wine-and-beer-to-go" }, "."],
      ],
    },
    ingredients: [{ name: "Wine", detail: "One bottle, as sold to go." }],
    allergenFacts: ["Olive Garden’s U.S. allergen guide does not cover wine and beer to go."],
    pairings: [
      { offeringId: w.pair[0], kind: "Entrée", reason: "An entrée to enjoy at home with the bottle." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "A shareable starter for the table." },
      { offeringId: w.pair[1], kind: "Dessert", reason: "A dessert to finish the meal." },
      { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
    ],
    relatedOfferingIds: others(WINES, id),
    compareHeading: `How ${w.name} compares with other wines`,
    faqs: [
      { question: `Can I buy ${w.name} to go from Olive Garden?`, answer: ALCOHOL_RULES, link: { text: "See wine and beer to go", href: "/wine-and-beer-to-go" } },
      {
        question: "How many glasses are in the bottle?",
        answer: "Olive Garden does not state the bottle size on its online menu, so we do not convert the bottle calories into glasses.",
      },
    ],
    related: WINE_RELATED,
  });
};

type BeerInput = { slug: ItemPageInput["slug"]; name: string; price: string; cal: string; kind: string; kw: string; na?: boolean };
const beerPage = (b: BeerInput) => {
  const id = `wine-and-beer-to-go--${b.slug}`;
  return itemPage({
    slug: b.slug,
    primaryOfferingId: id,
    acceptedGaps: GAP("publish with the price and calories; only generic beer nutrition and no allergen coverage, both disclosed."),
    nutritionUnavailableNote: BEER_NUTRITION,
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: b.kw,
    secondaryKeywords: [`${b.kw} price`, `${b.kw} calories`, "olive garden beer to go"],
    metaTitle: `Olive Garden ${b.name}: Price & Calories To Go`,
    metaDescription: `${b.name} costs ${b.price} to go at Olive Garden, with ${b.cal} calories per beer on the online menu. ${b.na ? "A non-alcoholic beer." : "Sold to guests 21 and older where permitted."} See the details.`,
    servingSummary: b.na ? "One non-alcoholic beer to go" : "One beer to go (21+, where permitted)",
    servingBasis: "One beer",
    unitLabel: "beer",
    priceSubject: "One beer",
    priceNote: "One beer, online pickup",
    about: {
      heading: `About ${b.name} at Olive Garden`,
      paragraphs: [
        `${b.name} is one of the beers on Olive Garden’s to-go menu${b.kind}`,
        b.na
          ? `It costs ${b.price} and the online menu lists ${b.cal} calories, at the price we checked. It is listed in Olive Garden’s wine and beer to go section.`
          : `It costs ${b.price} and the online menu lists ${b.cal} calories per beer, at the price we checked. ${ALCOHOL_RULES}`,
        ["Compare every beer and wine on the ", { text: "wine and beer to go page", href: "/wine-and-beer-to-go" }, "."],
      ],
    },
    ingredients: [{ name: b.na ? "Non-alcoholic beer" : "Beer", detail: "One beer, as sold to go." }],
    allergenFacts: ["Olive Garden’s U.S. allergen guide does not cover wine and beer to go."],
    pairings: [
      { offeringId: "lunch-menu--classic-pepperoni-flatbread", kind: "Entrée", reason: "A flatbread pizza with a beer." },
      { offeringId: "appetizers--calamari", kind: "Appetizer", reason: "A fried starter to share." },
      { offeringId: "classic-entrees--chicken-parmigiana", kind: "Entrée", reason: "A hearty entrée to enjoy at home." },
      { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "A shareable starter for the table." },
    ],
    relatedOfferingIds: others(BEERS, id),
    compareHeading: `How ${b.name} compares with other beers`,
    faqs: [
      b.na
        ? { question: "Does Heineken 0.0 contain alcohol?", answer: "Olive Garden lists it as a non-alcoholic beer in its wine and beer to go section." }
        : { question: `Can I buy ${b.name} to go from Olive Garden?`, answer: ALCOHOL_RULES, link: { text: "See wine and beer to go", href: "/wine-and-beer-to-go" } },
      { question: "Is the beer cold or in a can or bottle?", answer: "Olive Garden’s online menu does not state the container or temperature, so we do not describe it." },
    ],
    related: WINE_RELATED,
  });
};

/* ----------------------------------------------------------- simple drinks */

const DRINK_RELATED: RelatedMenuRef[] = [
  { categoryId: "non-alcoholic-beverages", text: "Every non-alcoholic drink with prices and calories." },
  { categoryId: "drink-menu", text: "The full Olive Garden drink menu." },
  { categoryId: "catering", text: "Drinks by the gallon or bottle for groups." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const NOT_IN_GUIDE = (what: string) =>
  `Olive Garden’s online menu lists ${what}, but its nutrition guide has no row for it, so no other nutrient values are shown.`;
const DRINK_PAIRINGS: ProductPageContent["pairings"] = [
  { offeringId: "classic-entrees--fettuccine-alfredo", kind: "Entrée", reason: "A classic pasta to go with your drink." },
  { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
  { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "The lowest-calorie regular dessert." },
  { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "A shareable starter." },
];

/* -------------------------------------------------------------- kids meals */

const KIDS_RELATED: RelatedMenuRef[] = [
  { categoryId: "kids-meal", text: "Every kids meal with prices and calories." },
  { categoryId: "gluten-sensitive", text: "Kids options on the gluten-sensitive menu." },
  { categoryId: "desserts", text: "Desserts to share after the meal." },
  { guide: "dinner-menu", text: "Plan a family dinner, from starters to dessert." },
];
const KIDS_PORTION = "Olive Garden lists kids meals for children under 12, with a side and 1% low-fat milk; the side and the milk are counted separately.";
const KIDS_PASTA_NOTE =
  "The calories are our calculation from Olive Garden’s official values: the kids pasta you choose (spaghetti 170, small shells 210 or fettuccine 220 calories) plus the sauce. Olive Garden lists the pasta and the sauce separately, so no single nutrition row exists for the meal.";
const KIDS_ALLERGEN =
  "Olive Garden’s U.S. allergen guide does not list this kids meal. This does not mean it is allergen-free; tell your server about any allergy before ordering.";
const KIDS_PAIRINGS: ProductPageContent["pairings"] = [
  { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée for the adults at the table." },
  { offeringId: "non-alcoholic-beverages--raspberry-lemonade", kind: "Drink", reason: "A fruity lemonade for the table." },
  { offeringId: "desserts--strawberry-cream-cake", kind: "Dessert", reason: "A fruity dessert to share." },
  { offeringId: "appetizers--breadsticks", kind: "Appetizer", reason: "Breadsticks for the table." },
];

type KidsPastaInput = { slug: ItemPageInput["slug"]; name: string; sauce: string; sauceCal: number; v: boolean; sauceSource: string };
const kidsPastaPage = (k: KidsPastaInput) => {
  const lo = 170 + k.sauceCal, mid = 210 + k.sauceCal, hi = 220 + k.sauceCal;
  return itemPage({
    slug: k.slug,
    primaryOfferingId: `kids-meal--${k.slug}`,
    acceptedGaps: GAP("publish with calculated main-dish calories (official pasta and sauce values) and an allergen disclosure."),
    nutritionUnavailableNote: KIDS_PASTA_NOTE,
    allergenUnavailableNote: KIDS_ALLERGEN,
    primaryKeyword: `olive garden ${k.name.toLowerCase()}`,
    secondaryKeywords: [`${k.name.toLowerCase()} calories`, `${k.name.toLowerCase()} price`, "olive garden kids pasta"],
    h1: `Olive Garden ${k.name}`,
    metaTitle: `Olive Garden ${k.name}: Price & Calories`,
    metaDescription: `Olive Garden ${k.name}: $7.49, from ${lo} calories with spaghetti to ${hi} with fettuccine (our calculation), plus a side and milk.`,
    servingSummary: "Kids meal: pasta with " + k.sauce + ", a side and milk",
    servingBasis: "Kids main dish (pasta + sauce; side and milk not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: `About the Olive Garden ${k.name}`,
      paragraphs: [
        `The ${k.name} is kid-size pasta with ${k.sauce}: children choose fettuccine, small shells or spaghetti, and the meal comes with a side and 1% low-fat milk.${k.v ? " Olive Garden marks it with its vegetarian (V) label." : ""}`,
        `The kids meal costs $7.49. The pasta and sauce come to ${lo} calories with spaghetti, ${mid} with small shells and ${hi} with fettuccine, by our calculation from Olive Garden’s official values (${k.sauceSource}).`,
        ["See every kids meal on the ", { text: "kids menu", href: "/kids-meal" }, "."],
      ],
    },
    ingredients: [
      { name: "Kids pasta", detail: "Fettuccine, small shells or spaghetti." },
      { name: k.sauce.charAt(0).toUpperCase() + k.sauce.slice(1), detail: "The sauce." },
    ],
    allergenFacts: [`Kid-size pasta with ${k.sauce}.`],
    pairings: KIDS_PAIRINGS,
    relatedOfferingIds: ["kids-meal--kids-cheese-ravioli", "kids-meal--kids-macaroni-and-cheese", "kids-meal--kids-pizza"],
    compareHeading: `How the ${k.name} compares with other kids meals`,
    faqs: [
      { question: `What comes with the ${k.name}?`, answer: KIDS_PORTION, link: { text: "See all kids meals", href: "/kids-meal" } },
      {
        question: "Which pasta has the fewest calories?",
        answer: `Spaghetti: ${lo} calories with the ${k.sauce}, compared with ${mid} for small shells and ${hi} for fettuccine (our calculation from Olive Garden’s nutrition values).`,
      },
    ],
    related: KIDS_RELATED,
  });
};

/* -------------------------------------------------------- bundles & combos */

const FAMILY_RELATED: RelatedMenuRef[] = [
  { categoryId: "family-style-meals", text: "Every family bundle and pan with prices." },
  { categoryId: "catering", text: "Larger packages and pans for events." },
  { categoryId: "classic-entrees", text: "The same dishes as single entrées." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const CATERING_RELATED: RelatedMenuRef[] = [
  { categoryId: "catering", text: "Every catering package, pan and tray." },
  { categoryId: "family-style-meals", text: "Smaller bundles for 4 to 6 people." },
  { categoryId: "desserts", text: "Desserts and whole cakes." },
  { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
];
const BUNDLE_NUTRITION =
  "Olive Garden lists only the total calories for this order. Its nutrition guide lists the parts separately, not the order as a whole, so fat, sodium, carbohydrate and protein totals are not shown.";
const BUNDLE_ALLERGEN =
  "Olive Garden’s U.S. allergen guide does not cover family-style and catering orders. This does not mean they are allergen-free; check each dish’s own page and ask the restaurant about any allergy.";
const SALAD_PAN = "family-style-meals--famous-house-salad";
const STICKS = "family-style-meals--breadsticks";
const BUNDLE_PAIRINGS: ProductPageContent["pairings"] = [
  { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A dessert to share after dinner." },
  { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade for the table." },
  { offeringId: "appetizers--fried-mozzarella", kind: "Appetizer", reason: "A starter while the table gets ready." },
  { offeringId: "desserts--black-tie-mousse-cake", kind: "Dessert", reason: "A chocolate dessert for a celebration." },
];

export const coveragePages: ProductPageContent[] = [
  // ============================== soups
  soupPage({
    slug: "chicken-and-gnocchi-soup",
    id: "chicken-and-gnocchi-soup",
    name: "Chicken & Gnocchi Soup",
    short: "chicken gnocchi soup",
    kw: "olive garden chicken gnocchi soup",
    meta: "Olive Garden Chicken & Gnocchi Soup costs $9.29 a bowl with 230 calories: creamy soup with roasted chicken, gnocchi and spinach. Also by the half gallon or gallon.",
    about: [
      "Chicken & Gnocchi is the creamiest of Olive Garden’s four homemade soups, made with roasted chicken, traditional Italian dumplings (gnocchi) and spinach.",
      "A bowl costs $9.29 and has 230 calories, according to Olive Garden’s online menu and U.S. nutrition guide: the most calories of the four soups. A half gallon (serves 6) and a gallon (serves 12) are listed for groups.",
    ],
    ingredients: [
      { name: "Roasted chicken", detail: "The protein." },
      { name: "Gnocchi", detail: "Traditional Italian dumplings." },
      { name: "Spinach", detail: "In the creamy soup." },
    ],
    faq: { question: "Is Chicken & Gnocchi the highest-calorie Olive Garden soup?", answer: "Yes. A bowl has 230 calories, compared with 220 for Zuppa Toscana, 150 for Pasta e Fagioli and 110 for Minestrone, according to Olive Garden’s nutrition guide." },
  }),
  soupPage({
    slug: "pasta-e-fagioli-soup",
    id: "pasta-e-fagioli-soup",
    name: "Pasta e Fagioli Soup",
    short: "pasta e fagioli",
    kw: "olive garden pasta e fagioli",
    meta: "Olive Garden Pasta e Fagioli costs $9.29 a bowl with 150 calories: beans, ground beef, tomatoes and pasta in broth. Also by the half gallon or gallon to go.",
    about: [
      "Pasta e Fagioli is a hearty Olive Garden soup of white and red beans, ground beef, tomatoes and small pasta in broth.",
      "A bowl costs $9.29 and has 150 calories, according to Olive Garden’s online menu and U.S. nutrition guide. A half gallon (serves 6) and a gallon (serves 12) are listed for groups.",
    ],
    ingredients: [
      { name: "White and red beans", detail: "The beans of the soup." },
      { name: "Ground beef", detail: "The meat." },
      { name: "Tomatoes and small pasta", detail: "In broth." },
    ],
    faq: { question: "Does Olive Garden Pasta e Fagioli have meat?", answer: "Yes. Olive Garden describes it with ground beef, so it is not a vegetarian soup. Minestrone is the soup marked vegetarian (V)." },
  }),
  soupPage({
    slug: "minestrone-soup",
    id: "minestrone-soup",
    name: "Minestrone Soup",
    short: "minestrone",
    kw: "olive garden minestrone soup",
    meta: "Olive Garden Minestrone costs $9.29 a bowl with 110 calories, the lightest of the four soups and marked vegetarian (V). Also by the half gallon or gallon.",
    about: [
      "Minestrone is Olive Garden’s vegetable soup with beans and pasta in a tomato broth, and the only one of the four homemade soups marked with its vegetarian (V) label.",
      "A bowl costs $9.29 and has 110 calories, according to Olive Garden’s online menu and U.S. nutrition guide: the fewest of the four soups. A half gallon (serves 6) and a gallon (serves 12) are listed for groups.",
    ],
    ingredients: [
      { name: "Vegetables", detail: "The base of the soup." },
      { name: "Beans and pasta", detail: "In a tomato broth." },
    ],
    faq: { question: "Is Olive Garden Minestrone vegetarian?", answer: "Olive Garden marks it with its vegetarian (V) label. Shared kitchens mean cross-contact with animal products is possible." },
  }),

  // ============================== wines
  winePage({ slug: "moscato-primo-amore", name: "Primo Amore Moscato", price: "$25.50", cal: "630", style: "Olive Garden describes it as a sweet white wine.", kw: "olive garden moscato", pair: ["classic-entrees--spicy-alfredo-fettuccine", "desserts--strawberry-cream-cake"] }),
  winePage({ slug: "sweet-pink-moscato-blend-confetti", name: "Confetti Sweet Pink Moscato", price: "$25.50", cal: "630", style: "Olive Garden describes it as a sweet pink moscato blend.", kw: "olive garden confetti wine", pair: ["classic-entrees--shrimp-scampi", "desserts--sicilian-cheesecake-with-strawberry-topping"] }),
  winePage({ slug: "sweet-red-roscato-rosso-dolce", name: "Roscato Rosso Dolce", price: "$25.50", cal: "660", style: "Olive Garden describes it as a sweet red wine.", kw: "olive garden roscato", pair: ["classic-entrees--lasagna-classico", "desserts--chocolate-lasagna"] }),
  winePage({ slug: "red-blend-porta-vita", name: "Porta Vita Red Blend", price: "$25.50", cal: "660", style: "Olive Garden describes it as a red blend.", kw: "olive garden porta vita", pair: ["classic-entrees--chicken-parmigiana", "desserts--black-tie-mousse-cake"] }),
  winePage({ slug: "moscato-castello-del-poggio", name: "Castello del Poggio Moscato", price: "$28.50", cal: "620", style: "Olive Garden describes it as a sweet white wine.", kw: "olive garden castello del poggio moscato", pair: ["classic-entrees--fettuccine-alfredo", "desserts--strawberry-cream-cake"] }),
  winePage({ slug: "white-zinfandel-sutter-home", name: "Sutter Home White Zinfandel", price: "$25.50", cal: "630", style: "Olive Garden describes it as a pink wine.", kw: "olive garden white zinfandel", pair: ["classic-entrees--shrimp-alfredo", "desserts--tiramisu"] }),
  winePage({ slug: "riesling-chateau-ste-michelle", name: "Chateau Ste. Michelle Riesling", price: "$27.00", cal: "620", style: "Olive Garden describes it as a white wine.", kw: "olive garden riesling", pair: ["classic-entrees--chicken-alfredo", "desserts--tiramisu"] }),
  winePage({ slug: "pinot-grigio-cavit", name: "Cavit Pinot Grigio", price: "$25.50", cal: "620", style: "Olive Garden describes it as a white wine.", kw: "olive garden pinot grigio", pair: ["classic-entrees--shrimp-scampi", "desserts--sicilian-cheesecake-with-strawberry-topping"] }),
  winePage({ slug: "sauvignon-blanc-starborough", name: "Starborough Sauvignon Blanc", price: "$28.50", cal: "620", style: "Olive Garden describes it as a white wine.", kw: "olive garden sauvignon blanc", pair: ["classic-entrees--herb-grilled-salmon", "desserts--strawberry-cream-cake"] }),
  winePage({ slug: "chardonnay-chateau-ste-michelle", name: "Chateau Ste. Michelle Chardonnay", price: "$27.00", cal: "620", style: "Olive Garden describes it as a white wine.", kw: "olive garden chardonnay", pair: ["classic-entrees--chicken-alfredo", "desserts--tiramisu"] }),
  winePage({ slug: "pinot-noir-meiomi", name: "Meiomi Pinot Noir", price: "$34.50", cal: "660", style: "Olive Garden describes it as a red wine.", kw: "olive garden pinot noir", pair: ["classic-entrees--herb-grilled-salmon", "desserts--black-tie-mousse-cake"] }),
  winePage({ slug: "merlot-beringer", name: "Beringer Merlot", price: "$27.00", cal: "660", style: "Olive Garden describes it as a red wine.", kw: "olive garden merlot", pair: ["classic-entrees--lasagna-classico", "desserts--chocolate-lasagna"] }),
  winePage({ slug: "chianti-classico-rocca-delle-macie", name: "Rocca delle Macie Chianti Classico", price: "$30.00", cal: "620", style: "Olive Garden describes it as a red wine.", kw: "olive garden chianti", pair: ["classic-entrees--tour-of-italy", "desserts--tiramisu"] }),
  winePage({ slug: "cabernet-robert-mondavi-private-selection", name: "Robert Mondavi Private Selection Cabernet", price: "$28.50", cal: "620", style: "Olive Garden describes it as a red wine.", kw: "olive garden cabernet", pair: ["classic-entrees--6-oz-sirloin", "desserts--black-tie-mousse-cake"] }),

  // ============================== beers
  beerPage({ slug: "budweiser", name: "Budweiser", price: "$6.29", cal: "150", kind: ", a regular beer.", kw: "olive garden budweiser" }),
  beerPage({ slug: "bud-light", name: "Bud Light", price: "$6.29", cal: "100", kind: ", a light beer.", kw: "olive garden bud light" }),
  beerPage({ slug: "coors-light", name: "Coors Light", price: "$6.29", cal: "100", kind: ", a light beer.", kw: "olive garden coors light" }),
  beerPage({ slug: "michelob-ultra", name: "Michelob Ultra", price: "$6.29", cal: "100", kind: ", a light beer.", kw: "olive garden michelob ultra" }),
  beerPage({ slug: "miller-lite", name: "Miller Lite", price: "$6.29", cal: "100", kind: ", a light beer.", kw: "olive garden miller lite" }),
  beerPage({ slug: "heineken-0-0-non-alcoholic", name: "Heineken 0.0", price: "$6.79", cal: "70", kind: ", a non-alcoholic beer.", kw: "olive garden non alcoholic beer", na: true }),

  // ============================== simple drinks
  itemPage({
    slug: "to-go-fountain-drinks",
    primaryOfferingId: "non-alcoholic-beverages--to-go-fountain-drinks",
    acceptedGaps: GAP("publish with the price and the online menu's calorie range; no nutrition or allergen row, both disclosed."),
    nutritionUnavailableNote: NOT_IN_GUIDE("0 to 180 calories depending on the soda"),
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden soda",
    secondaryKeywords: ["olive garden fountain drinks", "olive garden coke or pepsi", "olive garden soda price"],
    h1: "Olive Garden To Go Fountain Drinks",
    metaTitle: "Olive Garden Fountain Drinks: Sodas, Price & Calories",
    metaDescription: "Olive Garden to-go fountain drinks cost $3.99 with 0 to 180 calories, depending on the soda: Coke, Diet Coke, Coke Zero Sugar, Sprite, Dr Pepper or ginger ale.",
    servingSummary: "One fountain drink, to go",
    servingBasis: "One fountain drink",
    unitLabel: "drink",
    priceSubject: "One fountain drink",
    priceNote: "One drink, online pickup",
    about: {
      heading: "About Olive Garden fountain drinks",
      paragraphs: [
        "Olive Garden’s to-go fountain drinks offer a choice of Coke, Diet Coke, Coke Zero Sugar, Sprite, Dr Pepper or ginger ale.",
        "One drink costs $3.99, and the online menu lists 0 to 180 calories depending on the soda you choose.",
        ["See every lemonade, tea and coffee on the ", { text: "non-alcoholic beverages page", href: "/non-alcoholic-beverages" }, "."],
      ],
    },
    ingredients: [{ name: "Fountain soda", detail: "Coke, Diet Coke, Coke Zero Sugar, Sprite, Dr Pepper or ginger ale." }],
    allergenFacts: ["A to-go fountain soda."],
    pairings: DRINK_PAIRINGS,
    relatedOfferingIds: ["non-alcoholic-beverages--2-liter-soda", "non-alcoholic-beverages--classic-lemonade", "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea"],
    compareHeading: "How fountain drinks compare with other drinks",
    faqs: [
      { question: "Does Olive Garden serve Coke or Pepsi?", answer: "The to-go fountain drinks on Olive Garden’s online menu are Coca-Cola products (Coke, Diet Coke, Coke Zero Sugar, Sprite) plus Dr Pepper and ginger ale." },
      { question: "Are soda refills free at Olive Garden?", answer: "Olive Garden’s online menu does not state a refill policy for to-go drinks, so check with your restaurant." },
    ],
    related: DRINK_RELATED,
  }),
  itemPage({
    slug: "fresh-brewed-sweet-iced-tea",
    primaryOfferingId: "non-alcoholic-beverages--fresh-brewed-sweet-iced-tea",
    acceptedGaps: GAP("publish with the price and the online menu's calories; no nutrition or allergen row, both disclosed."),
    nutritionUnavailableNote: NOT_IN_GUIDE("90 calories for the sweet tea"),
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden sweet tea",
    secondaryKeywords: ["olive garden sweet tea calories", "olive garden iced tea price"],
    h1: "Olive Garden Fresh Brewed Sweet Iced Tea",
    metaTitle: "Olive Garden Sweet Tea: Price & Calories",
    metaDescription: "Olive Garden Fresh Brewed Sweet Iced Tea costs $3.99 with 90 calories per drink on the online menu. Also sold by the gallon. Compare it with unsweet tea.",
    servingSummary: "One drink",
    servingBasis: "One drink",
    unitLabel: "drink",
    priceSubject: "One drink",
    priceNote: "One drink, online pickup",
    about: {
      heading: "About Olive Garden sweet tea",
      paragraphs: [
        "Fresh Brewed Sweet Iced Tea is sweetened iced tea served over ice; Olive Garden also sells sweet tea by the gallon for to-go orders.",
        "One drink costs $3.99 and the online menu lists 90 calories. The unsweetened version has 0 calories.",
        ["See every tea and lemonade on the ", { text: "non-alcoholic beverages page", href: "/non-alcoholic-beverages" }, "."],
      ],
    },
    ingredients: [{ name: "Fresh-brewed iced tea", detail: "Sweetened." }],
    allergenFacts: ["Sweetened fresh-brewed iced tea."],
    pairings: DRINK_PAIRINGS,
    relatedOfferingIds: ["non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea", "non-alcoholic-beverages--half-iced-tea-and-half-lemonade", "non-alcoholic-beverages--mango-passion-fruit-iced-tea"],
    compareHeading: "How sweet tea compares with other drinks",
    faqs: [
      { question: "How many calories are in Olive Garden sweet tea vs unsweet tea?", answer: "The online menu lists 90 calories for the sweet tea and 0 for the unsweetened tea." },
      { question: "Can I buy Olive Garden sweet tea by the gallon?", answer: "Yes. Olive Garden lists a gallon of sweet tea among its to-go gallons.", link: { text: "See the gallons", href: "/menu/gallon-iced-teas-and-raspberry-lemonade" } },
    ],
    related: DRINK_RELATED,
  }),
  itemPage({
    slug: "fresh-brewed-unsweet-iced-tea",
    primaryOfferingId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea",
    acceptedGaps: GAP("publish with the price and the online menu's calories; no nutrition or allergen row, both disclosed."),
    nutritionUnavailableNote: NOT_IN_GUIDE("0 calories for the unsweetened tea"),
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden unsweet tea",
    secondaryKeywords: ["olive garden unsweetened iced tea", "olive garden zero calorie drink"],
    h1: "Olive Garden Fresh Brewed Unsweet Iced Tea",
    metaTitle: "Olive Garden Unsweet Iced Tea: Price & Calories",
    metaDescription: "Olive Garden Fresh Brewed Unsweet Iced Tea costs $3.99 with 0 calories per drink on the online menu, the zero-calorie choice among its teas and lemonades.",
    servingSummary: "One drink",
    servingBasis: "One drink",
    unitLabel: "drink",
    priceSubject: "One drink",
    priceNote: "One drink, online pickup",
    about: {
      heading: "About Olive Garden unsweet tea",
      paragraphs: [
        "Fresh Brewed Unsweet Iced Tea is iced tea with no added sugar, served over ice; Olive Garden also sells it by the gallon for to-go orders.",
        "One drink costs $3.99 and the online menu lists 0 calories.",
        ["See every tea and lemonade on the ", { text: "non-alcoholic beverages page", href: "/non-alcoholic-beverages" }, "."],
      ],
    },
    ingredients: [{ name: "Fresh-brewed iced tea", detail: "No added sugar." }],
    allergenFacts: ["Fresh-brewed iced tea with no added sugar."],
    pairings: DRINK_PAIRINGS,
    relatedOfferingIds: ["non-alcoholic-beverages--fresh-brewed-sweet-iced-tea", "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea", "non-alcoholic-beverages--half-iced-tea-and-half-lemonade"],
    compareHeading: "How unsweet tea compares with other drinks",
    faqs: [
      { question: "Does Olive Garden have zero-calorie drinks?", answer: "Yes. The online menu lists the fresh-brewed unsweet iced tea at 0 calories; Diet Coke and Coke Zero Sugar are among the fountain drinks." },
      { question: "Is the unsweet tea sold by the gallon?", answer: "Yes. The gallon of unsweetened iced tea is listed at 40 calories in Olive Garden’s nutrition guide.", link: { text: "See the gallons", href: "/menu/gallon-iced-teas-and-raspberry-lemonade" } },
    ],
    related: DRINK_RELATED,
  }),
  itemPage({
    slug: "2-liter-soda",
    primaryOfferingId: "non-alcoholic-beverages--2-liter-soda",
    versions: [
      { key: "coke", label: "Coke, 2 liter", shortLabel: "Coke", description: "A two-liter bottle of Coke.", price: 5.49, calories: 790, nutritionRowId: "p25-coke-2-liter", allergenRowId: null },
      { key: "diet-coke", label: "Diet Coke, 2 liter", shortLabel: "Diet Coke", description: "A two-liter bottle of Diet Coke.", price: 5.49, calories: 0, nutritionRowId: "p25-diet-coke-2-liter", allergenRowId: null },
      { key: "sprite", label: "Sprite, 2 liter", shortLabel: "Sprite", description: "A two-liter bottle of Sprite.", price: 5.49, calories: 790, nutritionRowId: "p25-sprite-2-liter", allergenRowId: null },
    ],
    acceptedGaps: GAP("publish with official nutrition per flavor; the allergen guide does not cover to-go drinks (disclosed)."),
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden 2 liter",
    secondaryKeywords: ["olive garden 2 liter soda price", "olive garden coke 2 liter"],
    h1: "Olive Garden 2-Liter Soda",
    metaTitle: "Olive Garden 2-Liter Soda: Price & Calories by Flavor",
    metaDescription: "An Olive Garden 2-liter soda costs $5.49: Coke or Sprite with 790 calories per bottle, or Diet Coke with 0 calories. Compare the flavors and nutrition.",
    servingSummary: "One 2-liter bottle: Coke, Diet Coke or Sprite",
    servingBasis: "One 2-liter bottle of Coke (default version), as sold",
    unitLabel: "bottle",
    priceSubject: "One 2-liter bottle",
    priceNote: "One bottle, online pickup",
    about: {
      heading: "About the Olive Garden 2-liter soda",
      paragraphs: [
        "Olive Garden sells two-liter bottles of Coke, Diet Coke or Sprite to add to a to-go or catering order for the whole table.",
        "A bottle costs $5.49. Olive Garden’s nutrition guide lists 790 calories for a 2-liter Coke or Sprite and 0 for Diet Coke.",
        ["See the other drinks on the ", { text: "non-alcoholic beverages page", href: "/non-alcoholic-beverages" }, "."],
      ],
    },
    ingredients: [{ name: "Soda", detail: "Coke, Diet Coke or Sprite in a 2-liter bottle." }],
    allergenFacts: ["A two-liter bottle of soda."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["non-alcoholic-beverages--to-go-fountain-drinks", "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade", "non-alcoholic-beverages--classic-lemonade"],
    compareHeading: "How the 2-liter soda compares with other drinks",
    faqs: [
      { question: "Which 2-liter sodas does Olive Garden sell?", answer: "Coke, Diet Coke and Sprite, each $5.49 at the price we checked." },
      { question: "Can I add a 2-liter soda to a catering order?", answer: "Yes. The 2-liter soda is also listed on Olive Garden’s catering menu at the same price.", link: { text: "See the catering menu", href: "/catering" } },
    ],
    related: DRINK_RELATED,
  }),
  itemPage({
    slug: "gallon-iced-teas-and-raspberry-lemonade",
    primaryOfferingId: "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade",
    versions: [
      { key: "unsweet-tea", label: "Gallon Iced Tea (unsweet)", shortLabel: "Unsweet tea", description: "A gallon of fresh-brewed unsweetened iced tea.", price: 8.49, calories: 40, nutritionRowId: "p25-iced-tea-fresh-brewed-unsweetened-1-gallon", allergenRowId: null },
      { key: "sweet-tea", label: "Gallon Sweet Tea", shortLabel: "Sweet tea", description: "A gallon of sweet tea. The nutrition guide has no row for the sweet tea gallon, so only the menu calories are shown.", price: 8.49, calories: 960, nutritionRowId: null, allergenRowId: null },
      { key: "half-and-half", label: "Gallon Half Iced Tea + Half Lemonade", shortLabel: "Half & half", description: "A gallon of half iced tea and half lemonade.", price: 8.49, calories: 900, nutritionRowId: "p25-half-tea-half-lemonade-1-gallon", allergenRowId: null },
      { key: "bellini-peach-tea", label: "Gallon Bellini Peach Tea", shortLabel: "Bellini peach", description: "A gallon of Bellini peach-raspberry iced tea.", price: 10.49, calories: 800, nutritionRowId: "p25-iced-tea-bellini-peach-raspberry-1-gallon", allergenRowId: null },
      { key: "raspberry-tea", label: "Gallon Raspberry Tea", shortLabel: "Raspberry tea", description: "A gallon of raspberry iced tea.", price: 10.49, calories: 830, nutritionRowId: "p25-iced-tea-raspberry-1-gallon", allergenRowId: null },
      { key: "mango-tea", label: "Gallon Mango-Passion Fruit Iced Tea", shortLabel: "Mango-passion", description: "A gallon of mango-passion fruit iced tea.", price: 10.49, calories: 1140, nutritionRowId: "p25-iced-tea-mango-passion-fruit-1-gallon", allergenRowId: null },
      { key: "raspberry-lemonade", label: "Gallon Raspberry Lemonade", shortLabel: "Raspberry lemonade", description: "A gallon of raspberry lemonade.", price: 10.49, calories: 1760, nutritionRowId: "p25-lemonade-raspberry-1-gallon", allergenRowId: null },
    ],
    acceptedGaps: GAP("publish with official nutrition per flavor where the guide lists it (sweet tea gallon: calories only); the allergen guide does not cover to-go drinks (disclosed)."),
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden gallon tea",
    secondaryKeywords: ["olive garden gallon of lemonade", "olive garden sweet tea gallon", "olive garden gallon price"],
    h1: "Olive Garden Gallon Iced Teas & Raspberry Lemonade",
    metaTitle: "Olive Garden Gallon Tea & Lemonade: Prices & Calories",
    metaDescription: "Olive Garden gallons of iced tea or lemonade cost $8.49 to $10.49: from unsweet tea at 40 calories per gallon to raspberry lemonade. Compare all seven flavors.",
    servingSummary: "One gallon to go; seven flavors",
    servingBasis: "One gallon of unsweet iced tea (default version)",
    unitLabel: "gallon",
    priceSubject: "One gallon",
    priceNote: "One gallon, online pickup",
    about: {
      heading: "About Olive Garden gallons",
      paragraphs: [
        "Olive Garden sells take-home gallons of iced tea or raspberry lemonade for to-go and catering orders, in seven flavors from unsweetened tea to fruit teas.",
        "Sweet tea, unsweet tea and half tea + half lemonade cost $8.49 a gallon; the fruit teas and raspberry lemonade cost $10.49, at the prices we checked. Calories range from 40 for unsweet tea to 1,760 for raspberry lemonade per gallon.",
        ["Compare single drinks on the ", { text: "non-alcoholic beverages page", href: "/non-alcoholic-beverages" }, "."],
      ],
    },
    ingredients: [{ name: "Iced tea or lemonade", detail: "One gallon, in the flavor you choose." }],
    allergenFacts: ["A gallon of iced tea or lemonade."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["non-alcoholic-beverages--2-liter-soda", "non-alcoholic-beverages--fresh-brewed-sweet-iced-tea", "non-alcoholic-beverages--raspberry-lemonade"],
    compareHeading: "How gallons compare with single drinks",
    faqs: [
      { question: "How many people does a gallon serve?", answer: "Olive Garden does not state servings for the gallons, so we do not estimate them." },
      { question: "Which gallon has the fewest calories?", answer: "The unsweetened iced tea, at 40 calories per gallon according to Olive Garden’s nutrition guide." },
    ],
    related: DRINK_RELATED,
  }),
  itemPage({
    slug: "san-pellegrino-sparkling-water",
    primaryOfferingId: "catering--san-pellegrino-sparkling-1-liter-bottle",
    acceptedGaps: GAP("publish with the price and calories; no brand nutrition row and no allergen coverage, both disclosed."),
    nutritionUnavailableNote: "Olive Garden’s online menu lists 0 calories. Its nutrition guide lists Italian bottled water in general, not this brand and size, so no other values are shown.",
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden san pellegrino",
    secondaryKeywords: ["olive garden sparkling water", "olive garden bottled water"],
    h1: "Olive Garden San Pellegrino Sparkling Water",
    metaTitle: "Olive Garden San Pellegrino: Price & Calories",
    metaDescription: "A 1-liter bottle of San Pellegrino sparkling water costs $4.79 on Olive Garden’s catering menu, with 0 calories. Add it to a catering or to-go order.",
    servingSummary: "One 1-liter bottle",
    servingBasis: "One 1-liter bottle",
    unitLabel: "bottle",
    priceSubject: "One 1-liter bottle",
    priceNote: "One bottle, online pickup",
    about: {
      heading: "About San Pellegrino at Olive Garden",
      paragraphs: [
        "Olive Garden lists one-liter bottles of San Pellegrino sparkling mineral water on its catering menu, to add to a catering or to-go order.",
        "A bottle costs $4.79 and the online menu lists 0 calories.",
        ["See every drink for groups on the ", { text: "catering menu", href: "/catering" }, "."],
      ],
    },
    ingredients: [{ name: "Sparkling mineral water", detail: "One 1-liter bottle." }],
    allergenFacts: ["A 1-liter bottle of sparkling mineral water."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["catering--acqua-panna-spring-1-liter-bottle", "catering--2-liter-soda", "catering--gallon-iced-teas-and-raspberry-lemonade"],
    compareHeading: "How San Pellegrino compares with other drinks for groups",
    faqs: [
      { question: "Is San Pellegrino still or sparkling?", answer: "Sparkling: Olive Garden lists it as San Pellegrino sparkling mineral water. Acqua Panna is the still spring water." },
      { question: "Where can I order it?", answer: "It is listed on Olive Garden’s catering menu, to add to a catering or to-go order.", link: { text: "See the catering menu", href: "/catering" } },
    ],
    related: DRINK_RELATED,
  }),
  itemPage({
    slug: "acqua-panna-spring-water",
    primaryOfferingId: "catering--acqua-panna-spring-1-liter-bottle",
    acceptedGaps: GAP("publish with the price and calories; no brand nutrition row and no allergen coverage, both disclosed."),
    nutritionUnavailableNote: "Olive Garden’s online menu lists 0 calories. Its nutrition guide lists Italian bottled water in general, not this brand and size, so no other values are shown.",
    allergenUnavailableNote: DRINK_ALLERGEN,
    primaryKeyword: "olive garden acqua panna",
    secondaryKeywords: ["olive garden still water", "olive garden bottled water price"],
    h1: "Olive Garden Acqua Panna Spring Water",
    metaTitle: "Olive Garden Acqua Panna: Price & Calories",
    metaDescription: "A 1-liter bottle of Acqua Panna still spring water costs $4.79 on Olive Garden’s catering menu, with 0 calories. Add it to a catering or to-go order.",
    servingSummary: "One 1-liter bottle",
    servingBasis: "One 1-liter bottle",
    unitLabel: "bottle",
    priceSubject: "One 1-liter bottle",
    priceNote: "One bottle, online pickup",
    about: {
      heading: "About Acqua Panna at Olive Garden",
      paragraphs: [
        "Olive Garden lists one-liter bottles of Acqua Panna still spring water on its catering menu, to add to a catering or to-go order.",
        "A bottle costs $4.79 and the online menu lists 0 calories.",
        ["See every drink for groups on the ", { text: "catering menu", href: "/catering" }, "."],
      ],
    },
    ingredients: [{ name: "Still spring water", detail: "One 1-liter bottle." }],
    allergenFacts: ["A 1-liter bottle of still spring water."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["catering--san-pellegrino-sparkling-1-liter-bottle", "catering--2-liter-soda", "catering--gallon-iced-teas-and-raspberry-lemonade"],
    compareHeading: "How Acqua Panna compares with other drinks for groups",
    faqs: [
      { question: "Is Acqua Panna still or sparkling?", answer: "Still: Olive Garden lists it as Acqua Panna still spring water. San Pellegrino is the sparkling water." },
      { question: "Where can I order it?", answer: "It is listed on Olive Garden’s catering menu, to add to a catering or to-go order.", link: { text: "See the catering menu", href: "/catering" } },
    ],
    related: DRINK_RELATED,
  }),

  // ============================== kids pasta meals (calculated main dish)
  kidsPastaPage({ slug: "kids-alfredo-pasta", name: "Kids Alfredo Pasta", sauce: "alfredo sauce", sauceCal: 440, v: true, sauceSource: "kids pasta and alfredo sauce rows of the nutrition guide" }),
  kidsPastaPage({ slug: "kids-meat-sauce-pasta", name: "Kids Meat Sauce Pasta", sauce: "meat sauce", sauceCal: 110, v: false, sauceSource: "kids pasta and meat sauce rows of the nutrition guide" }),
  kidsPastaPage({ slug: "kids-tomato-sauce-pasta", name: "Kids Tomato Sauce Pasta", sauce: "tomato sauce", sauceCal: 80, v: true, sauceSource: "kids pasta and tomato sauce rows of the nutrition guide" }),
  kidsPastaPage({ slug: "kids-five-cheese-marinara-pasta", name: "Kids Five Cheese Marinara Pasta", sauce: "five cheese marinara", sauceCal: 150, v: true, sauceSource: "kids pasta rows of the nutrition guide and the 150-calorie sauce on the online menu, because the guide has no kids five cheese marinara row" }),

  // ============================== gluten-free rotini kids meals (also on the gluten-sensitive menu)
  itemPage({
    slug: "kids-rotini-with-marinara",
    primaryOfferingId: "kids-meal--kids-rotini-with-marinara",
    equivalentOfferingIds: ["gluten-sensitive--rotini-with-marinara"],
    acceptedGaps: GAP("publish with the official nutrition row; the allergen guide lists only the adult rotini dishes (disclosed)."),
    allergenUnavailableNote: "Olive Garden’s U.S. allergen guide lists the adult Rotini Pasta with Marinara, but not this kids meal. This does not mean it is allergen-free; tell your server about any allergy, and that you are avoiding gluten.",
    primaryKeyword: "olive garden kids gluten free pasta",
    secondaryKeywords: ["kids rotini with marinara", "olive garden gluten sensitive kids meal"],
    metaTitle: "Olive Garden Kids Rotini with Marinara: Price & Calories",
    metaDescription: "Olive Garden Kids Rotini with Marinara costs $7.49 with 260 calories: gluten-free rotini with marinara on the kids and gluten-sensitive menus, plus a side and milk.",
    servingSummary: "Kids meal: gluten-free rotini with marinara, a side and milk",
    servingBasis: "Kids main dish only (side and drink not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: "About Kids Rotini with Marinara",
      paragraphs: [
        "Kids Rotini with Marinara is gluten-free rotini with marinara, served with grapes or broccoli and 1% low-fat milk. It is listed on both the kids menu and the gluten-sensitive menu, and Olive Garden marks it with its vegetarian (V) label.",
        "The kids meal costs $7.49. The main dish has 260 calories according to Olive Garden’s U.S. nutrition guide; the side and milk are counted separately.",
        ["Olive Garden says gluten-sensitive dishes are made without gluten-containing ingredients but are not lab-tested gluten-free. See the ", { text: "gluten-sensitive menu", href: "/gluten-sensitive" }, "."],
      ],
    },
    ingredients: [
      { name: "Gluten-free rotini", detail: "Olive Garden says it meets the FDA gluten-free definition." },
      { name: "Marinara", detail: "The sauce." },
    ],
    allergenFacts: ["Gluten-free rotini with marinara, kids portion."],
    pairings: KIDS_PAIRINGS,
    relatedOfferingIds: ["kids-meal--kids-rotini-with-meat-sauce", "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara", "kids-meal--kids-cheese-ravioli"],
    compareHeading: "How it compares with other kids meals",
    faqs: [
      { question: "Is the kids rotini gluten-free?", answer: "The rotini pasta meets the FDA gluten-free definition according to Olive Garden. The meal is on the gluten-sensitive menu, but the kitchen is not gluten-free, so cross-contact is possible.", link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" } },
      { question: "What comes with Kids Rotini with Marinara?", answer: "Grapes or broccoli and 1% low-fat milk, according to Olive Garden’s menu." },
    ],
    related: KIDS_RELATED,
  }),
  itemPage({
    slug: "kids-rotini-with-meat-sauce",
    primaryOfferingId: "kids-meal--kids-rotini-with-meat-sauce",
    equivalentOfferingIds: ["gluten-sensitive--rotini-with-meat-sauce"],
    acceptedGaps: GAP("publish with the official nutrition row; the allergen guide lists only the adult rotini dishes (disclosed)."),
    allergenUnavailableNote: "Olive Garden’s U.S. allergen guide lists the adult Rotini Pasta with Meat Sauce, but not this kids meal. This does not mean it is allergen-free; tell your server about any allergy, and that you are avoiding gluten.",
    primaryKeyword: "olive garden kids rotini meat sauce",
    secondaryKeywords: ["kids rotini with meat sauce calories", "olive garden gluten sensitive kids meal"],
    metaTitle: "Olive Garden Kids Rotini with Meat Sauce: Price & Calories",
    metaDescription: "Olive Garden Kids Rotini with Meat Sauce costs $7.49 with 340 calories: gluten-free rotini with meat sauce on the kids and gluten-sensitive menus, plus a side and milk.",
    servingSummary: "Kids meal: gluten-free rotini with meat sauce, a side and milk",
    servingBasis: "Kids main dish only (side and drink not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: "About Kids Rotini with Meat Sauce",
      paragraphs: [
        "Kids Rotini with Meat Sauce is gluten-free rotini with Olive Garden’s meat sauce, served with grapes or broccoli and 1% low-fat milk. It is listed on both the kids menu and the gluten-sensitive menu.",
        "The kids meal costs $7.49. The main dish has 340 calories according to Olive Garden’s U.S. nutrition guide; the side and milk are counted separately.",
        ["Olive Garden says gluten-sensitive dishes are made without gluten-containing ingredients but are not lab-tested gluten-free. See the ", { text: "gluten-sensitive menu", href: "/gluten-sensitive" }, "."],
      ],
    },
    ingredients: [
      { name: "Gluten-free rotini", detail: "Olive Garden says it meets the FDA gluten-free definition." },
      { name: "Meat sauce", detail: "Beef and Italian sausage." },
    ],
    allergenFacts: ["Gluten-free rotini with meat sauce, kids portion."],
    pairings: KIDS_PAIRINGS,
    relatedOfferingIds: ["kids-meal--kids-rotini-with-marinara", "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara", "kids-meal--kids-cheese-ravioli"],
    compareHeading: "How it compares with other kids meals",
    faqs: [
      { question: "Is the kids rotini with meat sauce gluten-free?", answer: "The rotini meets the FDA gluten-free definition according to Olive Garden, and the meal is on the gluten-sensitive menu, but the kitchen is not gluten-free, so cross-contact is possible.", link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" } },
      { question: "What is in the meat sauce?", answer: "Olive Garden describes its homemade meat sauce as made with beef and Italian sausage." },
    ],
    related: KIDS_RELATED,
  }),
  itemPage({
    slug: "kids-grilled-chicken-with-rotini",
    primaryOfferingId: "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara",
    equivalentOfferingIds: ["gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara"],
    acceptedGaps: GAP("publish with the official nutrition row; the allergen guide does not list this kids meal as a whole (disclosed)."),
    allergenUnavailableNote: "Olive Garden’s U.S. allergen guide does not list this kids meal as a whole. This does not mean it is allergen-free; tell your server about any allergy, and that you are avoiding gluten.",
    primaryKeyword: "olive garden kids grilled chicken",
    secondaryKeywords: ["kids grilled chicken with rotini calories", "olive garden gluten sensitive kids meal"],
    h1: "Olive Garden Kids Grilled Chicken with Rotini Pasta & Marinara",
    metaTitle: "Olive Garden Kids Grilled Chicken with Rotini: Price & Calories",
    metaDescription: "Olive Garden Kids Grilled Chicken with Rotini Pasta & Marinara costs $9.98 with 430 calories, on the kids and gluten-sensitive menus, plus a side and milk.",
    servingSummary: "Kids meal: grilled chicken, gluten-free rotini and marinara, a side and milk",
    servingBasis: "Kids main dish only (side and drink not included)",
    unitLabel: "kids main dish",
    priceSubject: "One kids meal",
    about: {
      heading: "About Kids Grilled Chicken with Rotini",
      paragraphs: [
        "This kids meal pairs grilled chicken breast with gluten-free rotini and marinara, served with grapes or broccoli and 1% low-fat milk. It is listed on both the kids menu and the gluten-sensitive menu.",
        "The kids meal costs $9.98. The main dish has 430 calories according to Olive Garden’s U.S. nutrition guide; the side and milk are counted separately.",
        ["See the other choices on the ", { text: "kids menu", href: "/kids-meal" }, "."],
      ],
    },
    ingredients: [
      { name: "Grilled chicken breast", detail: "Cooked on the grill." },
      { name: "Gluten-free rotini with marinara", detail: "Olive Garden says the rotini meets the FDA gluten-free definition." },
    ],
    allergenFacts: ["Grilled chicken with gluten-free rotini and marinara, kids portion."],
    pairings: KIDS_PAIRINGS,
    relatedOfferingIds: ["kids-meal--kids-rotini-with-marinara", "kids-meal--kids-chicken-fingers", "kids-meal--kids-cheese-ravioli"],
    compareHeading: "How it compares with other kids meals",
    faqs: [
      { question: "Why does this kids meal cost more?", answer: "At the prices we checked it was $9.98, more than most other kids meals. Olive Garden does not give a reason on its menu." },
      { question: "Is it gluten-free?", answer: "It is on Olive Garden’s gluten-sensitive menu and the rotini meets the FDA gluten-free definition, but the kitchen is not gluten-free and the grill is shared.", link: { text: "See the gluten-sensitive menu", href: "/gluten-sensitive" } },
    ],
    related: KIDS_RELATED,
  }),

  // ============================== bundles & combinations
  itemPage({
    slug: "family-style-lasagna-bundle",
    primaryOfferingId: "family-style-meals--family-style-lasagna-bundle",
    sizeOfferingIds: ["family-style-meals--family-style-lasagna-bundle--large"],
    acceptedGaps: GAP("publish with Olive Garden's own bundle total and the parts listed; no single nutrition or allergen row (disclosed)."),
    nutritionUnavailableNote: BUNDLE_NUTRITION,
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Lasagna Classico", quantity: "One family-size pan", offeringId: "family-style-meals--lasagna-classico" },
      { label: "Famous House Salad", quantity: "One jumbo salad, with dressing", offeringId: SALAD_PAN },
      { label: "Breadsticks", quantity: "12 breadsticks", offeringId: STICKS },
    ],
    primaryKeyword: "olive garden lasagna bundle",
    secondaryKeywords: ["family style lasagna bundle price", "lasagna bundle calories", "olive garden family bundle"],
    metaTitle: "Olive Garden Family-Style Lasagna Bundle: Price & What’s Included",
    metaDescription: "The Olive Garden Family-Style Lasagna Bundle costs $68.99 for 4 to 6 people, with 6,700 calories in total: a lasagna pan, jumbo house salad and 12 breadsticks.",
    servingSummary: "Serves 4-6: lasagna pan, jumbo salad, 12 breadsticks",
    servingBasis: "The whole bundle (total)",
    unitLabel: "bundle",
    priceSubject: "One bundle",
    priceNote: "One bundle (serves 4-6), online pickup",
    about: {
      heading: "About the Family-Style Lasagna Bundle",
      paragraphs: [
        "The Family-Style Lasagna Bundle is a take-home dinner for four to six: a family-size pan of Lasagna Classico, a jumbo Famous House Salad and a dozen breadsticks.",
        "It costs $68.99 and Olive Garden lists 6,700 calories for the whole bundle. A large bundle for up to 12 people (two jumbo salads and 24 breadsticks) is $99.99 with 13,030 calories.",
        ["Compare every bundle and pan on the ", { text: "family-style meals page", href: "/family-style-meals" }, "."],
      ],
    },
    ingredients: [
      { name: "Lasagna Classico", detail: "Family-size pan." },
      { name: "Famous House Salad", detail: "Jumbo size, with dressing and croutons." },
      { name: "Breadsticks", detail: "A dozen (24 in the large bundle)." },
    ],
    allergenFacts: ["A lasagna pan, a jumbo house salad and breadsticks."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: [
      "family-style-meals--family-style-chicken-alfredo-bundle",
      "family-style-meals--family-style-chicken-parmigiana-bundle",
      "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle",
    ],
    compareHeading: "How the lasagna bundle compares with other family bundles",
    faqs: [
      { question: "How many people does the lasagna bundle feed?", answer: "Olive Garden lists the regular bundle for 4 to 6 people and the large bundle for up to 12." },
      { question: "How far ahead should I order?", answer: "The classic entrées menu lists the lasagna bundle with “allow 2 hours”, so order ahead of your dinner time." },
    ],
    related: FAMILY_RELATED,
  }),
  itemPage({
    slug: "family-style-chicken-alfredo-bundle",
    primaryOfferingId: "family-style-meals--family-style-chicken-alfredo-bundle",
    acceptedGaps: GAP("publish with Olive Garden's own bundle total and the parts listed; no single nutrition or allergen row (disclosed)."),
    nutritionUnavailableNote: BUNDLE_NUTRITION,
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Chicken Alfredo", quantity: "Family-size portion", offeringId: "family-style-meals--chicken-alfredo" },
      { label: "Alfredo sauce", quantity: "Extra sauce on the side" },
      { label: "Famous House Salad", quantity: "One jumbo salad, with dressing", offeringId: SALAD_PAN },
      { label: "Breadsticks", quantity: "12 breadsticks", offeringId: STICKS },
    ],
    primaryKeyword: "olive garden chicken alfredo bundle",
    secondaryKeywords: ["family style chicken alfredo bundle price", "chicken alfredo family meal"],
    metaTitle: "Olive Garden Family-Style Chicken Alfredo Bundle: Price & Contents",
    metaDescription: "The Olive Garden Family-Style Chicken Alfredo Bundle costs $82.49 for 4 to 6 people, with 9,330 calories in total: Chicken Alfredo, salad, breadsticks and sauce.",
    servingSummary: "Serves 4-6: Chicken Alfredo, jumbo salad, 12 breadsticks, extra sauce",
    servingBasis: "The whole bundle (total)",
    unitLabel: "bundle",
    priceSubject: "One bundle",
    priceNote: "One bundle (serves 4-6), online pickup",
    about: {
      heading: "About the Family-Style Chicken Alfredo Bundle",
      paragraphs: [
        "The Family-Style Chicken Alfredo Bundle is a take-home dinner for four to six with Chicken Alfredo, a jumbo Famous House Salad, a dozen breadsticks and alfredo sauce on the side.",
        "It costs $82.49 and Olive Garden lists 9,330 calories for the whole bundle, at the price we checked.",
        ["Compare every bundle and pan on the ", { text: "family-style meals page", href: "/family-style-meals" }, "."],
      ],
    },
    ingredients: [
      { name: "Chicken Alfredo", detail: "Fettuccine alfredo with sliced grilled chicken." },
      { name: "Alfredo sauce", detail: "Extra, on the side." },
      { name: "Famous House Salad and breadsticks", detail: "Jumbo salad and a dozen breadsticks." },
    ],
    allergenFacts: ["Chicken Alfredo with extra sauce, a jumbo house salad and breadsticks."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["family-style-meals--family-style-lasagna-bundle", "family-style-meals--family-style-chicken-parmigiana-bundle", "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle"],
    compareHeading: "How the Chicken Alfredo bundle compares with other family bundles",
    faqs: [
      { question: "What comes in the Chicken Alfredo bundle?", answer: "Chicken Alfredo for four to six, a jumbo Famous House Salad, a dozen breadsticks and alfredo sauce on the side, according to Olive Garden’s menu." },
      { question: "Is it cheaper than buying the parts?", answer: "Olive Garden does not publish a comparison, and the bundle portions are not stated part by part, so we do not calculate savings." },
    ],
    related: FAMILY_RELATED,
  }),
  itemPage({
    slug: "family-style-chicken-parmigiana-bundle",
    primaryOfferingId: "family-style-meals--family-style-chicken-parmigiana-bundle",
    acceptedGaps: GAP("publish with Olive Garden's own bundle total and the parts listed; no single nutrition or allergen row (disclosed)."),
    nutritionUnavailableNote: BUNDLE_NUTRITION,
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Chicken Parmigiana", quantity: "Family-size portion", offeringId: "family-style-meals--chicken-parmigiana" },
      { label: "Spaghetti with marinara", quantity: "Family-size portion", offeringId: "family-style-meals--spaghetti-with-marinara-sauce" },
      { label: "Famous House Salad", quantity: "One jumbo salad, with dressing", offeringId: SALAD_PAN },
      { label: "Breadsticks", quantity: "12 breadsticks", offeringId: STICKS },
    ],
    primaryKeyword: "olive garden chicken parmigiana bundle",
    secondaryKeywords: ["family style chicken parm bundle price", "chicken parmigiana family meal"],
    metaTitle: "Olive Garden Family-Style Chicken Parmigiana Bundle: Price & Contents",
    metaDescription: "The Olive Garden Family-Style Chicken Parmigiana Bundle costs $76.49 for 4 to 6 people, with 8,070 calories in total: chicken parm, spaghetti, salad and breadsticks.",
    servingSummary: "Serves 4-6: Chicken Parmigiana, spaghetti, jumbo salad, 12 breadsticks",
    servingBasis: "The whole bundle (total)",
    unitLabel: "bundle",
    priceSubject: "One bundle",
    priceNote: "One bundle (serves 4-6), online pickup",
    about: {
      heading: "About the Family-Style Chicken Parmigiana Bundle",
      paragraphs: [
        "The Family-Style Chicken Parmigiana Bundle is a take-home dinner for four to six with Chicken Parmigiana, spaghetti in marinara, a jumbo Famous House Salad and a dozen breadsticks.",
        "It costs $76.49 and Olive Garden lists 8,070 calories for the whole bundle, at the price we checked.",
        ["Compare every bundle and pan on the ", { text: "family-style meals page", href: "/family-style-meals" }, "."],
      ],
    },
    ingredients: [
      { name: "Chicken Parmigiana", detail: "Breaded chicken with marinara and melted cheese." },
      { name: "Spaghetti with marinara", detail: "Family-size portion." },
      { name: "Famous House Salad and breadsticks", detail: "Jumbo salad and a dozen breadsticks." },
    ],
    allergenFacts: ["Chicken Parmigiana with spaghetti in marinara, a jumbo house salad and breadsticks."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["family-style-meals--family-style-lasagna-bundle", "family-style-meals--family-style-chicken-alfredo-bundle", "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle"],
    compareHeading: "How the Chicken Parmigiana bundle compares with other family bundles",
    faqs: [
      { question: "What comes in the Chicken Parmigiana bundle?", answer: "Chicken Parmigiana and spaghetti in marinara for four to six, a jumbo Famous House Salad and a dozen breadsticks, according to Olive Garden’s menu." },
      { question: "How many chicken breasts are in the bundle?", answer: "Olive Garden does not state the number of breasts for this bundle, so we do not list one." },
    ],
    related: FAMILY_RELATED,
  }),
  itemPage({
    slug: "family-style-five-cheese-ziti-al-forno-bundle",
    primaryOfferingId: "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle",
    acceptedGaps: GAP("publish with Olive Garden's own bundle total and the parts listed; no single nutrition or allergen row (disclosed)."),
    nutritionUnavailableNote: BUNDLE_NUTRITION,
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Five Cheese Ziti al Forno", quantity: "One family-size pan", offeringId: "family-style-meals--five-cheese-ziti-al-forno" },
      { label: "Famous House Salad", quantity: "One jumbo salad, with dressing", offeringId: SALAD_PAN },
      { label: "Breadsticks", quantity: "12 breadsticks", offeringId: STICKS },
    ],
    primaryKeyword: "olive garden five cheese ziti bundle",
    secondaryKeywords: ["family style ziti bundle price", "five cheese ziti family meal"],
    metaTitle: "Olive Garden Family-Style Five Cheese Ziti Bundle: Price & Contents",
    metaDescription: "The Olive Garden Family-Style Five Cheese Ziti al Forno Bundle costs $66.49 for 4 to 6 people, with 7,960 calories in total: ziti pan, jumbo salad and breadsticks.",
    servingSummary: "Serves 4-6: ziti pan, jumbo salad, 12 breadsticks",
    servingBasis: "The whole bundle (total)",
    unitLabel: "bundle",
    priceSubject: "One bundle",
    priceNote: "One bundle (serves 4-6), online pickup",
    about: {
      heading: "About the Family-Style Five Cheese Ziti Bundle",
      paragraphs: [
        "The Family-Style Five Cheese Ziti al Forno Bundle is a take-home dinner for four to six with a pan of Five Cheese Ziti al Forno, a jumbo house salad and twelve breadsticks.",
        "It costs $66.49, the lowest price of the four family bundles, and Olive Garden lists 7,960 calories for the whole bundle, at the price we checked.",
        ["Compare every bundle and pan on the ", { text: "family-style meals page", href: "/family-style-meals" }, "."],
      ],
    },
    ingredients: [
      { name: "Five Cheese Ziti al Forno", detail: "Family-size pan." },
      { name: "Famous House Salad and breadsticks", detail: "Jumbo salad and a dozen breadsticks." },
    ],
    allergenFacts: ["A baked ziti pan, a jumbo house salad and breadsticks."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["family-style-meals--family-style-lasagna-bundle", "family-style-meals--family-style-chicken-alfredo-bundle", "family-style-meals--family-style-chicken-parmigiana-bundle"],
    compareHeading: "How the ziti bundle compares with other family bundles",
    faqs: [
      { question: "Which Olive Garden family bundle is the cheapest?", answer: "At the prices we checked, the Five Cheese Ziti al Forno Bundle was the lowest-priced of the four family bundles for 4 to 6 people." },
      { question: "Is the ziti bundle vegetarian?", answer: "Olive Garden marks Five Cheese Ziti al Forno itself with its vegetarian (V) label, but it does not label the bundle; ask the restaurant if this matters to you." },
    ],
    related: FAMILY_RELATED,
  }),
  itemPage({
    slug: "chicken-parmigiana-combination",
    primaryOfferingId: "catering--chicken-parmigiana-combination",
    acceptedGaps: GAP("publish with Olive Garden's own package total range and the parts listed; no single nutrition or allergen row (disclosed)."),
    nutritionUnavailableNote: BUNDLE_NUTRITION,
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Chicken Parmigiana", quantity: "One pan (8 breasts)", offeringId: "catering--chicken-parmigiana" },
      { label: "Spaghetti with marinara", quantity: "One pan", offeringId: "catering--spaghetti-with-marinara-sauce" },
      { label: "Five Cheese Ziti or Fettuccine Alfredo", quantity: "One pan, your choice" },
      { label: "Famous House Salad", quantity: "Two jumbo salads", offeringId: "catering--famous-house-salad" },
      { label: "Breadsticks", quantity: "24 breadsticks", offeringId: "catering--breadsticks" },
      { label: "Iced tea", quantity: "One gallon", offeringId: "catering--gallon-iced-teas-and-raspberry-lemonade" },
      { label: "Cake", quantity: "One whole cake" },
    ],
    primaryKeyword: "olive garden chicken parmigiana catering combination",
    secondaryKeywords: ["olive garden catering package price", "chicken parm catering for 10"],
    metaTitle: "Olive Garden Chicken Parmigiana Combination: Catering Price & Contents",
    metaDescription: "The Olive Garden Chicken Parmigiana Combination costs $224.00 and serves 8 to 14, with 22,020 calories or more in total. See every pan, salad and extra included.",
    servingSummary: "Serves 8-14: three pans, two jumbo salads, 24 breadsticks, tea, cake",
    servingBasis: "The whole package (total); depends on your choices",
    unitLabel: "package",
    priceSubject: "One package",
    priceNote: "One package (serves 8-14), online pickup",
    about: {
      heading: "About the Chicken Parmigiana Combination",
      paragraphs: [
        "The Chicken Parmigiana Combination is a catering package for eight to fourteen: a pan of Chicken Parmigiana (8 breasts), a pan of spaghetti with marinara, a pan of Five Cheese Ziti or Fettuccine Alfredo, two jumbo salads, 24 breadsticks, a gallon of iced tea and a whole cake.",
        "It costs $224.00 and Olive Garden lists 22,020 to 25,550 calories for the whole package, depending on your choices, at the price we checked.",
        ["See every package and pan on the ", { text: "catering menu", href: "/catering" }, "."],
      ],
    },
    ingredients: [
      { name: "Three pasta and chicken pans", detail: "Chicken Parmigiana, spaghetti marinara, and ziti or fettuccine alfredo." },
      { name: "Salads, breadsticks, tea and cake", detail: "Two jumbo salads, 24 breadsticks, a gallon of iced tea and a whole cake." },
    ],
    allergenFacts: ["A catering package of several pans, salads, breadsticks, iced tea and a cake."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["catering--lasagna-combination", "catering--create-your-own-pasta-station", "family-style-meals--family-style-chicken-parmigiana-bundle"],
    compareHeading: "How it compares with other catering packages",
    faqs: [
      { question: "How many people does the Chicken Parmigiana Combination serve?", answer: "Olive Garden lists it for 8 to 14 people." },
      { question: "Which cake comes with it?", answer: "Olive Garden’s menu lists a whole cake but the cake choice is made when ordering; the calorie range covers the choices." },
    ],
    related: CATERING_RELATED,
  }),
  itemPage({
    slug: "lasagna-combination",
    primaryOfferingId: "catering--lasagna-combination",
    acceptedGaps: GAP("publish with Olive Garden's own package total range and the parts listed; no single nutrition or allergen row (disclosed)."),
    nutritionUnavailableNote: BUNDLE_NUTRITION,
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Lasagna Classico", quantity: "One pan", offeringId: "catering--lasagna-classico" },
      { label: "Five Cheese Ziti or Fettuccine Alfredo", quantity: "One pan, your choice" },
      { label: "Famous House Salad", quantity: "Two jumbo salads", offeringId: "catering--famous-house-salad" },
      { label: "Breadsticks", quantity: "24 breadsticks", offeringId: "catering--breadsticks" },
      { label: "Iced tea", quantity: "One gallon", offeringId: "catering--gallon-iced-teas-and-raspberry-lemonade" },
      { label: "Cake", quantity: "One whole cake" },
    ],
    primaryKeyword: "olive garden lasagna catering combination",
    secondaryKeywords: ["olive garden lasagna catering price", "lasagna catering for 10"],
    metaTitle: "Olive Garden Lasagna Combination: Catering Price & Contents",
    metaDescription: "The Olive Garden Lasagna Combination costs $224.00 and serves 8 to 14, with 23,570 calories or more in total. See every pan, salad and extra included.",
    servingSummary: "Serves 8-14: two pans, two jumbo salads, 24 breadsticks, tea, cake",
    servingBasis: "The whole package (total); depends on your choices",
    unitLabel: "package",
    priceSubject: "One package",
    priceNote: "One package (serves 8-14), online pickup",
    about: {
      heading: "About the Lasagna Combination",
      paragraphs: [
        "The Lasagna Combination is a catering package for eight to fourteen: a pan of Lasagna Classico, a pan of Five Cheese Ziti or Fettuccine Alfredo, two jumbo salads, 24 breadsticks, a gallon of iced tea and a whole cake.",
        "It costs $224.00 and Olive Garden lists 23,570 to 27,100 calories for the whole package, depending on your choices, at the price we checked.",
        ["See every package and pan on the ", { text: "catering menu", href: "/catering" }, "."],
      ],
    },
    ingredients: [
      { name: "Two pasta pans", detail: "Lasagna Classico, and ziti or fettuccine alfredo." },
      { name: "Salads, breadsticks, tea and cake", detail: "Two jumbo salads, 24 breadsticks, a gallon of iced tea and a whole cake." },
    ],
    allergenFacts: ["A catering package of pasta pans, salads, breadsticks, iced tea and a cake."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["catering--chicken-parmigiana-combination", "catering--create-your-own-pasta-station", "family-style-meals--family-style-lasagna-bundle"],
    compareHeading: "How it compares with other catering packages",
    faqs: [
      { question: "How many people does the Lasagna Combination serve?", answer: "Olive Garden lists it for 8 to 14 people." },
      { question: "What is the difference from the Chicken Parmigiana Combination?", answer: "Both cost $224.00 at the prices we checked. The Chicken Parmigiana Combination adds a chicken parmigiana pan and a spaghetti pan; the Lasagna Combination has a lasagna pan instead." },
    ],
    related: CATERING_RELATED,
  }),
  itemPage({
    slug: "create-your-own-pasta-station",
    primaryOfferingId: "catering--create-your-own-pasta-station",
    acceptedGaps: GAP("publish with the official nutrition row; the allergen guide does not cover catering (disclosed)."),
    allergenUnavailableNote: BUNDLE_ALLERGEN,
    components: [
      { label: "Pasta", quantity: "Spaghetti and fettuccine" },
      { label: "Sauces", quantity: "Alfredo, meat sauce and marinara" },
      { label: "Toppings", quantity: "Grilled chicken, meatballs and Italian sausage" },
      { label: "Famous House Salad and breadsticks", quantity: "For the group" },
    ],
    primaryKeyword: "olive garden create your own pasta station",
    secondaryKeywords: ["olive garden pasta bar catering", "pasta station price per person", "create your own pasta station feeds how many"],
    metaTitle: "Olive Garden Create Your Own Pasta Station: Catering Price",
    metaDescription: "The Olive Garden Create Your Own Pasta Station costs $147.50 and serves 10, with 17,280 calories for the whole station: two pastas, three sauces, three toppings.",
    servingSummary: "Serves 10 per station: pastas, sauces, toppings, salad, breadsticks",
    servingBasis: "One station for 10 (total)",
    unitLabel: "station",
    priceSubject: "One station",
    priceNote: "One station (serves 10), online pickup",
    about: {
      heading: "About the Create Your Own Pasta Station",
      paragraphs: [
        "The Create Your Own Pasta Station is a catering pasta bar for ten: spaghetti and fettuccine, alfredo, meat sauce and marinara, grilled chicken, meatballs and Italian sausage, plus salad and breadsticks.",
        "One station costs $147.50 and has 17,280 calories in total according to Olive Garden’s U.S. nutrition guide, at the price we checked.",
        ["Building a pasta in the restaurant works differently; see ", { text: "Create Your Own Pasta", href: "/create-your-own-pasta" }, "."],
      ],
    },
    ingredients: [
      { name: "Spaghetti and fettuccine", detail: "Two pastas." },
      { name: "Alfredo, meat sauce and marinara", detail: "Three sauces." },
      { name: "Grilled chicken, meatballs and Italian sausage", detail: "Three toppings." },
    ],
    allergenFacts: ["A catering pasta bar with two pastas, three sauces and three toppings."],
    pairings: BUNDLE_PAIRINGS,
    relatedOfferingIds: ["catering--chicken-parmigiana-combination", "catering--lasagna-combination", "classic-entrees--create-your-own-pasta"],
    compareHeading: "How the pasta station compares with other catering packages",
    faqs: [
      { question: "How many people does the pasta station feed?", answer: "Olive Garden lists one station for 10 people; larger groups order more stations." },
      { question: "What is the price per person?", answer: "One station for 10 costs $147.50 at the price we checked. Prices can vary by location across the USA.", link: { text: "See the catering menu", href: "/catering" } },
    ],
    related: CATERING_RELATED,
  }),
  itemPage({
    slug: "dipping-sauces-with-breadsticks",
    primaryOfferingId: "appetizers--dipping-sauces-with-breadsticks",
    equivalentOfferingIds: [],
    acceptedGaps: GAP("publish with calculated calories from official breadstick and sauce values; no single row for the combination (disclosed)."),
    nutritionUnavailableNote:
      "The calories are our calculation from Olive Garden’s official values for the breadsticks and the sauce you choose. The guide lists the parts separately, so no single nutrition row exists for the order.",
    allergenUnavailableNote:
      "Olive Garden’s U.S. allergen guide lists the breadsticks and the sauces separately, not this combination. This does not mean it is allergen-free; check with your server about any allergy.",
    primaryKeyword: "olive garden dipping sauces with breadsticks",
    secondaryKeywords: ["olive garden breadstick dipping sauce price", "olive garden alfredo dipping sauce"],
    metaTitle: "Olive Garden Dipping Sauces with Breadsticks: Price & Calories",
    metaDescription: "Olive Garden Dipping Sauces with Breadsticks cost $5.29 for four breadsticks and a sauce (630 calories or more, our calculation), or $7.29 for the large.",
    servingSummary: "Regular: 4 breadsticks + 1 sauce (serves 2); large: 8 + 8 oz sauce",
    servingBasis: "A regular order (4 breadsticks + 1 sauce)",
    priceSubject: "A regular order",
    about: {
      heading: "About Dipping Sauces with Breadsticks",
      paragraphs: [
        "Dipping Sauces with Breadsticks pairs warm breadsticks with a cup of marinara, alfredo or five cheese marinara. The regular order has four breadsticks and serves two; the large has eight breadsticks and an 8 oz sauce and serves four. Olive Garden marks it with its vegetarian (V) label.",
        "The regular order costs $5.29 and the large $7.29. By our calculation from Olive Garden’s official values, the regular order has 630 to 1,050 calories, depending on the sauce.",
        ["See the breadsticks on their own on the ", { text: "appetizers menu", href: "/appetizers" }, "."],
      ],
    },
    ingredients: [
      { name: "Breadsticks", detail: "Four (regular) or eight (large)." },
      { name: "Dipping sauce", detail: "Marinara, alfredo or five cheese marinara." },
    ],
    allergenFacts: ["Breadsticks with a cup of marinara, alfredo or five cheese marinara."],
    pairings: [
      { offeringId: "soups-salad-and-breadsticks--famous-house-salad", kind: "Soup & salad", reason: "A salad next to warm breadsticks." },
      { offeringId: "classic-entrees--lasagna-classico", kind: "Entrée", reason: "A classic entrée after the starter." },
      { offeringId: "non-alcoholic-beverages--classic-lemonade", kind: "Drink", reason: "A classic lemonade for the table." },
      { offeringId: "desserts--tiramisu", kind: "Dessert", reason: "A dessert to finish." },
    ],
    relatedOfferingIds: ["appetizers--breadsticks", "appetizers--fried-mozzarella", "appetizers--spinach-artichoke-dip"],
    compareHeading: "How it compares with other appetizers",
    faqs: [
      { question: "Which dipping sauces can I choose?", answer: "Marinara, alfredo or five cheese marinara, according to Olive Garden’s menu." },
      { question: "How many breadsticks come with the dipping sauce?", answer: "Four with the regular order (serves 2) and eight with the large order and its 8 oz sauce (serves 4)." },
    ],
    related: [
      { categoryId: "appetizers", text: "Every Olive Garden appetizer with prices and calories." },
      { categoryId: "soups-salad-and-breadsticks", text: "Soups, salad and breadsticks." },
      { categoryId: "sides-sauces-and-extras", text: "Large sauces to take home." },
      { guide: "dinner-menu", text: "Plan a full dinner, from starters to dessert." },
    ],
  }),
];
