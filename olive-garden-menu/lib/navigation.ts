import { getCategoryPageContent, getMenuCategoriesWithPages, menuCategoryPath, menuPath } from "@/lib/content";
import { infoPages, infoPagePath } from "@/content/site/info-pages";
import { getPublishedGuides, guidePath } from "@/content/guides";
import { isToolPageLive, nutritionCalculatorPage, toolPath } from "@/content/tools/nutrition-calculator";
import { MENU_PDF_SECTION_HREF } from "@/lib/menu-pdf-info";

/** Nutrition Calculator link while the tool is live (preview: not on the production deployment). */
function calculatorLink(): NavChild[] {
  return isToolPageLive(nutritionCalculatorPage) ? [{ label: "Nutrition Calculator", href: toolPath(nutritionCalculatorPage) }] : [];
}

/**
 * Main navigation of the global header (docs/DESIGN_SYSTEM.md 4.4), built from
 * the shared data so new category pages and info pages appear automatically.
 * Only destinations that exist are listed (no placeholders). Dinner Menu and
 * Hours are published guides (content/guides/). Future guides with
 * navGroup "hours" (e.g. holiday articles) join the Hours dropdown
 * automatically once published.
 */

export type NavChild = { label: string; href: string };
export type NavItem = {
  label: string;
  /** Plain link (no dropdown). */
  href?: string;
  /** Dropdown entries. */
  children?: NavChild[];
  /** Full Menu: wide, multi-column dropdown. */
  wide?: boolean;
  /** Link shown at the bottom of a dropdown, e.g. "See the full menu". */
  footer?: NavChild;
};

/** "Olive Garden Lunch Menu" -> "Lunch Menu": the dropdown heading already names the restaurant. */
function shortTitle(title: string): string {
  return title.replace(/^Olive Garden\s+/i, "");
}

export function getMainNav(): NavItem[] {
  const categories = getMenuCategoriesWithPages().map((c) => ({
    slug: c.slug,
    label: shortTitle(getCategoryPageContent(c.id)?.menuTitle ?? c.name),
    href: menuCategoryPath(c.slug),
  }));
  const has = (slug: string) => categories.some((c) => c.slug === slug);
  const cat = (slug: string) => categories.find((c) => c.slug === slug)!;
  const guide = (slug: string) => getPublishedGuides().find((g) => g.slug === slug);
  const published = (key: keyof typeof infoPages) =>
    infoPages[key].status === "published" ? [{ label: infoPages[key].title, href: infoPagePath(infoPages[key]) }] : [];

  const items: NavItem[] = [
    { label: "Home", href: "/" },
    {
      label: "Full Menu",
      wide: true,
      children: categories.map(({ label, href }) => ({ label, href })),
      footer: { label: "See the full menu with prices", href: menuPath },
    },
  ];
  if (has("lunch-menu")) items.push({ label: "Lunch Menu", href: cat("lunch-menu").href });
  // Dinner Menu: a guide page (content/guides/), shown only once published.
  const dinner = guide("dinner-menu");
  if (dinner) items.push({ label: "Dinner Menu", href: guidePath(dinner) });
  items.push({
    label: "Specials & Deals",
    children: [
      ...(has("buy-one-take-one") ? [{ label: "Buy One Take One & $6 Take Home", href: cat("buy-one-take-one").href }] : []),
      { label: "Lunch Specials & Deals", href: "/#lunch-specials-deals" },
      ...(has("soups-salad-and-breadsticks") ? [{ label: "Soup, Salad & Breadsticks", href: cat("soups-salad-and-breadsticks").href }] : []),
      ...(has("family-style-meals") ? [{ label: "Family-Style Meals", href: cat("family-style-meals").href }] : []),
    ],
  });
  const hours = guide("hours");
  const hoursHref = hours ? guidePath(hours) : "/#hours";
  const moreHours = getPublishedGuides()
    .filter((g) => g.navGroup === "hours" && g.slug !== "hours")
    .map((g) => ({ label: g.navLabel ?? g.menuTitle, href: guidePath(g) }));
  items.push({
    label: "Hours",
    children: [
      { label: "Opening & Closing Hours", href: hoursHref },
      { label: "Holiday Hours", href: hours ? `${hoursHref}#holiday-hours` : "/#holiday-hours" },
      ...(has("lunch-menu") ? [{ label: "Lunch Hours", href: cat("lunch-menu").href }] : []),
      ...(dinner ? [{ label: "Dinner Hours", href: `${guidePath(dinner)}#dinner-hours` }] : []),
      ...moreHours,
    ],
  });
  if (has("catering")) items.push({ label: "Catering", href: cat("catering").href });
  items.push({
    label: "More",
    children: [
      { label: "Popular Menu Items", href: "/#popular-menu-items" },
      { label: "Nutrition & Dietary Options", href: "/#nutrition" },
      ...calculatorLink(),
      { label: "Menu PDF", href: MENU_PDF_SECTION_HREF },
      { label: "How to Order Online", href: "/#order-online" },
      { label: "FAQ", href: "/#faq" },
      ...published("prices"),
      ...published("about"),
      ...published("contact"),
    ],
  });
  return items;
}

export type FooterColumn = { heading: string; links: NavChild[] };

/**
 * Footer link columns (docs/DESIGN_SYSTEM.md "Footer"). Same data rules as
 * the header: only destinations that exist (categories with a page, published
 * guides such as /dinner-menu, published info pages).
 */
export function getFooterColumns(): FooterColumn[] {
  const pages = new Map([
    ...getMenuCategoriesWithPages().map((c) => [c.slug, menuCategoryPath(c.slug)] as const),
    ...getPublishedGuides().map((g) => [g.slug, guidePath(g)] as const),
  ]);
  const pick = (items: [string, string][]): NavChild[] =>
    items.filter(([, slug]) => pages.has(slug)).map(([label, slug]) => ({ label, href: pages.get(slug)! }));
  const info = (key: keyof typeof infoPages, label?: string): NavChild[] =>
    infoPages[key].status === "published" ? [{ label: label ?? infoPages[key].title, href: infoPagePath(infoPages[key]) }] : [];

  return [
    {
      heading: "Popular Menus",
      links: [
        { label: "Full Menu", href: menuPath },
        { label: "Menu PDF", href: MENU_PDF_SECTION_HREF },
        ...pick([["Lunch Menu", "lunch-menu"], ["Dinner Menu", "dinner-menu"], ["Kids Menu", "kids-meal"], ["Catering Menu", "catering"], ["Dessert Menu", "desserts"]]),
      ],
    },
    {
      heading: "Explore More",
      links: pick([
        ["Family Style Meals", "family-style-meals"],
        ["Appetizers", "appetizers"],
        ["Classic Entrees", "classic-entrees"],
        ["Amazing Alfredos", "amazing-alfredos"],
        ["Gluten-Sensitive Menu", "gluten-sensitive"],
        ["Drinks Menu", "drink-menu"],
        ["Olive Garden Hours", "hours"],
      ]).concat(calculatorLink()),
    },
    {
      heading: "Important Links",
      links: [
        ...info("about"),
        ...info("contact"),
        ...info("privacy"),
        ...info("terms", "Terms & Conditions"),
        ...info("disclaimer"),
        ...info("editorial"),
        ...info("prices"),
      ],
    },
  ];
}
