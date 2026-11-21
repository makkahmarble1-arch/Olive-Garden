import type { ProductPageStatus } from "@/lib/types";

/**
 * Light registry of individual menu item pages: slug + status only, no data
 * imports. proxy.ts reads it (real HTTP 404 for other /menu/<slug> URLs), so
 * it must stay tiny. The page content lives in ./<slug>.ts and is collected
 * in ./index.ts; the build check fails if the two lists differ.
 *
 * Status rules (docs/product-pages/PRODUCT_PAGE_ARCHITECTURE.md):
 * - "preview"   = built, waiting for owner review: local dev / Vercel previews only.
 * - "published" = owner-approved (ownerApprovedAt in the page file), live everywhere.
 * Never mark a page "published" without the owner's actual approval.
 */
export const productPageRegistry = {
  // Owner visual approval of all remaining pages: 2026-11-18 (content/menu/product-pages/approvals.ts).
  // Owner-approved sample (2026-11-18).
  "fried-mozzarella": "published",
  // Phase 1 batch 1 (2026-11-18).
  calamari: "published",
  "toasted-ravioli": "published",
  "stuffed-ziti-fritta": "published",
  breadsticks: "published",
  // Phase 1 batch 2 (2026-11-18).
  "lasagna-fritta": "published",
  "spinach-artichoke-dip": "published",
  // Phase 2 (2026-11-18): classic entrées and alfredos.
  "fettuccine-alfredo": "published",
  "shrimp-alfredo": "published",
  "seafood-alfredo": "published",
  "steak-gorgonzola-alfredo": "published",
  "five-cheese-ziti-al-forno": "published",
  "lasagna-classico": "published",
  "spaghetti-with-meat-sauce": "published",
  "spaghetti-with-marinara": "published",
  "shrimp-carbonara": "published",
  "ravioli-carbonara": "published",
  "tour-of-italy": "published",
  "eggplant-parmigiana": "published",
  "stuffed-chicken-marsala": "published",
  "grilled-chicken-margherita": "published",
  // Phase 3 (2026-11-18): desserts.
  tiramisu: "published",
  "black-tie-mousse-cake": "published",
  "strawberry-cream-cake": "published",
  "sicilian-cheesecake-with-strawberry-topping": "published",
  // Phase 5 (2026-11-18): weekday lunch sandwich and flatbreads.
  "eggplant-parmigiana-sandwich": "published",
  "chicken-alfredo-flatbread": "published",
  "five-cheese-flatbread": "published",
  "classic-pepperoni-flatbread": "published",
  // Phase 7 (2026-11-18): gluten-sensitive and kids items.
  "zuppa-toscana": "published",
  "rotini-pasta-with-marinara": "published",
  "rotini-pasta-with-meat-sauce": "published",
  "kids-pizza": "published",
  "kids-chicken-fingers": "published",
  "kids-cheese-ravioli": "published",
  // 2026-11-18, after the owner's permanent image instruction: remaining single-row items.
  "meatballs-parmigiana": "published",
  "shrimp-fritto-misto": "published",
  "chicken-parmigiana": "published",
  "chicken-scampi": "published",
  "shrimp-scampi": "published",
  "herb-grilled-salmon": "published",
  "6-oz-sirloin": "published",
  "spicy-alfredo-fettuccine": "published",
  "chocolate-lasagna": "published",
  "warm-italian-doughnuts": "published",
  "pumpkin-cookie-butter-cheesecake": "published",
  "kids-macaroni-and-cheese": "published",
  "italian-grilled-chicken-sandwich": "published",
  "famous-house-salad": "published",
  // Sides with observed search demand (2026-11-18).
  "side-of-grilled-chicken": "published",
  "side-of-meatballs": "published",
  "italian-sausage": "published",
  "side-of-crispy-chicken-fritta": "published",
  "side-of-broccoli": "published",
  "side-of-alfredo-sauce": "published",
  // Phase 4 (owner approval 2026-11-18): version-aware pages, plus the gluten-sensitive Grilled Chicken Parmigiana (no hero photo).
  "chicken-alfredo": "published",
  "calabrian-steak-and-shrimp-bucatini": "published",
  "spaghetti-and-meatballs": "published",
  "cheese-ravioli": "published",
  "lunch-spaghetti": "published",
  "chicken-parmigiana-sandwich": "published",
  "grilled-chicken-parmigiana": "published",
  // Final batch (2026-11-18): every remaining product with an official nutrition row.
  "chicken-tortelloni-alfredo": "published",
  "chicken-and-shrimp-carbonara": "published",
  "side-of-mashed-potatoes": "published",
  "side-of-marinara-sauce": "published",
  "side-of-meat-sauce": "published",
  "side-of-five-cheese-marinara-sauce": "published",
  "classic-lemonade": "published",
  "raspberry-lemonade": "published",
  "sweet-pear-limonata": "published",
  "strawberry-passion-fruit-limonata": "published",
  "mango-passion-fruit-iced-tea": "published",
  "bellini-peach-raspberry-iced-tea": "published",
  "half-iced-tea-and-half-lemonade": "published",
  "cappuccino": "published",
  "lavazza-espresso": "published",
  // Complete menu coverage (owner decisions 2026-11-19): owner visual approval 2026-11-19.
  "chicken-and-gnocchi-soup": "published",
  "pasta-e-fagioli-soup": "published",
  "minestrone-soup": "published",
  "moscato-primo-amore": "published",
  "sweet-pink-moscato-blend-confetti": "published",
  "sweet-red-roscato-rosso-dolce": "published",
  "red-blend-porta-vita": "published",
  "moscato-castello-del-poggio": "published",
  "white-zinfandel-sutter-home": "published",
  "riesling-chateau-ste-michelle": "published",
  "pinot-grigio-cavit": "published",
  "sauvignon-blanc-starborough": "published",
  "chardonnay-chateau-ste-michelle": "published",
  "pinot-noir-meiomi": "published",
  "merlot-beringer": "published",
  "chianti-classico-rocca-delle-macie": "published",
  "cabernet-robert-mondavi-private-selection": "published",
  "budweiser": "published",
  "bud-light": "published",
  "coors-light": "published",
  "michelob-ultra": "published",
  "miller-lite": "published",
  "heineken-0-0-non-alcoholic": "published",
  "to-go-fountain-drinks": "published",
  "fresh-brewed-sweet-iced-tea": "published",
  "fresh-brewed-unsweet-iced-tea": "published",
  "2-liter-soda": "published",
  "gallon-iced-teas-and-raspberry-lemonade": "published",
  "san-pellegrino-sparkling-water": "published",
  "acqua-panna-spring-water": "published",
  "kids-alfredo-pasta": "published",
  "kids-meat-sauce-pasta": "published",
  "kids-tomato-sauce-pasta": "published",
  "kids-five-cheese-marinara-pasta": "published",
  "kids-rotini-with-marinara": "published",
  "kids-rotini-with-meat-sauce": "published",
  "kids-grilled-chicken-with-rotini": "published",
  "family-style-lasagna-bundle": "published",
  "family-style-chicken-alfredo-bundle": "published",
  "family-style-chicken-parmigiana-bundle": "published",
  "family-style-five-cheese-ziti-al-forno-bundle": "published",
  "chicken-parmigiana-combination": "published",
  "lasagna-combination": "published",
  "create-your-own-pasta-station": "published",
  "dipping-sauces-with-breadsticks": "published",
} as const satisfies Record<string, ProductPageStatus>;

export type ProductSlug = keyof typeof productPageRegistry;

export function pageStatus(slug: ProductSlug): ProductPageStatus {
  return productPageRegistry[slug];
}

/**
 * True only on the real production deployment (Vercel Production). Set at
 * build time in next.config.ts from VERCEL_ENV, so the server, the proxy and
 * the search index all agree. Local `next dev`, local `next start` and Vercel
 * preview deployments are not production.
 */
export const isProductionDeployment = process.env.PRODUCTION_DEPLOYMENT === "1";

/**
 * Owner decision 2026-11-15: "preview" item pages stay reachable for local
 * development and testing, but are never exposed on the production site
 * (no URL, no card/table links, no search entry). "published" pages are live everywhere.
 */
export function isLiveProductPage(page: { status: ProductPageStatus }): boolean {
  return page.status === "published" || (page.status === "preview" && !isProductionDeployment);
}

/** Slugs of live pages (used by proxy.ts). */
export const liveProductSlugs: readonly string[] = (Object.entries(productPageRegistry) as [string, ProductPageStatus][])
  .filter(([, status]) => isLiveProductPage({ status }))
  .map(([slug]) => slug);
