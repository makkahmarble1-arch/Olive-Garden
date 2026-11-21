import type { ProductPageContent } from "@/lib/types";
import { friedMozzarellaPage } from "./fried-mozzarella";
import { calamariPage } from "./calamari";
import { toastedRavioliPage } from "./toasted-ravioli";
import { stuffedZitiFrittaPage } from "./stuffed-ziti-fritta";
import { breadsticksPage } from "./breadsticks";
import { appetizerPages } from "./batch-appetizers";
import { entreePages } from "./batch-entrees";
import { dessertPages } from "./batch-desserts";
import { lunchPages } from "./batch-lunch";
import { gsKidsPages } from "./batch-gs-kids";
import { morePages } from "./batch-more";
import { sidePages } from "./batch-sides";
import { versionPages } from "./batch-versions";
import { finalPages } from "./batch-final";
import { coveragePages } from "./batch-coverage";

/**
 * All individual menu item pages (/menu/[slug]).
 * docs/product-pages/PRODUCT_PAGE_ARCHITECTURE.md.
 *
 * Add a page only after it passes docs/product-pages/PRODUCT_CONTENT_CHECKLIST.md
 * (including a visual photo check). Never generate pages automatically for
 * every product id. Status lives in ./registry.ts (also read by proxy.ts).
 */
export const productPages: readonly ProductPageContent[] = [
  friedMozzarellaPage,
  calamariPage,
  toastedRavioliPage,
  stuffedZitiFrittaPage,
  breadsticksPage,
  ...appetizerPages,
  ...entreePages,
  ...dessertPages,
  ...lunchPages,
  ...gsKidsPages,
  ...morePages,
  ...sidePages,
  ...versionPages,
  ...finalPages,
  ...coveragePages,
];

export { isLiveProductPage, isProductionDeployment, liveProductSlugs } from "./registry";
