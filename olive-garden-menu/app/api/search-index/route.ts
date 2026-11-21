import { getCategoryPageContent, getMenuCategoriesWithPages, menuCategoryPath, menuPath } from "@/lib/content";
import { infoPages, infoPagePath } from "@/content/site/info-pages";
import { getPublishedGuides, guidePath } from "@/content/guides";
import type { SearchEntry } from "@/lib/site-search";
import { getLiveProductPages, productPath } from "@/lib/product-pages";
import { getMenuCategory, getOffering } from "@/lib/content";
import { isToolPageLive, nutritionCalculatorPage, toolPath } from "@/content/tools/nutrition-calculator";

/**
 * GET /api/search-index: the small static index for the header search
 * (titles, short descriptions, keywords and URLs of public pages only; no
 * article bodies, no unpublished pages, no admin routes). Prerendered at
 * build time; the browser loads it once, on first use of the search box.
 */
export function GET() {
  const entries: SearchEntry[] = [
    {
      title: "Olive Garden Menu with Prices & Calories",
      description: "The full menu: every category with prices, calories, and ratings.",
      url: menuPath,
      kind: "Menu",
      keywords: ["full menu", "prices", "calories", "all items", "entrees"],
    },
  ];

  for (const category of getMenuCategoriesWithPages()) {
    const content = getCategoryPageContent(category.id);
    if (!content) continue;
    entries.push({
      title: content.menuTitle,
      description: content.metaDescription,
      url: menuCategoryPath(category.slug),
      kind: "Menu",
      keywords: [category.name, content.primaryKeyword, ...(content.secondaryKeywords ?? [])],
    });
  }

  // Menu item pages (/menu/<slug>): every live page (preview pages are linked
  // from the menu cards too). Listed before the menu pages so an exact item
  // name ranks the item first.
  for (const page of getLiveProductPages()) {
    const offering = getOffering(page.primaryOfferingId);
    const category = offering ? getMenuCategory(offering.categoryId) : undefined;
    entries.unshift({
      title: offering?.displayName ?? page.h1,
      description: page.metaDescription,
      url: productPath(page.slug),
      kind: "Menu item",
      keywords: [page.h1, page.primaryKeyword, ...(page.secondaryKeywords ?? []), ...(category ? [category.name] : [])],
    });
  }

  for (const guide of getPublishedGuides()) {
    entries.push({
      title: guide.menuTitle,
      description: guide.metaDescription,
      url: guidePath(guide),
      kind: guide.searchKind ?? "Menu",
      keywords: [guide.name, guide.primaryKeyword, ...(guide.secondaryKeywords ?? [])],
    });
  }

  const sections: [string, string, string, string[]][] = [
    // Hours: the /hours guide is its own entry (from content/guides); the holiday table gets a direct entry.
    ...(getPublishedGuides().some((g) => g.slug === "hours")
      ? [["Olive Garden Holiday Hours", "Thanksgiving, Christmas, and other holidays.", "/hours#holiday-hours", ["holiday", "thanksgiving", "christmas", "easter", "new year", "christmas eve"]] as [string, string, string, string[]]]
      : [
          ["Olive Garden Hours", "Opening and closing times.", "/#hours", ["hours", "open", "close", "opening", "closing", "time"]] as [string, string, string, string[]],
          ["Olive Garden Holiday Hours", "Thanksgiving, Christmas, and other holidays.", "/#holiday-hours", ["holiday", "thanksgiving", "christmas", "easter", "new year"]] as [string, string, string, string[]],
        ]),
    ["Lunch Specials & Deals", "Current lunch specials and deals.", "/#lunch-specials-deals", ["deals", "specials", "coupons", "offers", "lunch specials"]],
    ["Popular Menu Items", "Six well-known dishes with prices and calories.", "/#popular-menu-items", ["popular", "best", "favorites"]],
    ["Nutrition & Dietary Options", "Calories, allergens, and dietary choices.", "/#nutrition", ["nutrition", "allergens", "vegetarian", "low calorie", "dietary"]],
    ["How to Order Online", "Pickup, delivery, and online ordering.", "/#order-online", ["order online", "pickup", "delivery", "to go"]],
    ["Frequently Asked Questions", "Answers to common questions about the menu.", "/#faq", ["faq", "questions"]],
  ];
  for (const [title, description, url, keywords] of sections) entries.push({ title, description, url, kind: "Homepage section", keywords });

  // Nutrition & Meal Price Calculator (tool page), while it is live.
  if (isToolPageLive(nutritionCalculatorPage)) {
    const tool = nutritionCalculatorPage;
    entries.push({
      title: tool.h1,
      description: tool.metaDescription,
      url: toolPath(tool),
      kind: "Tool",
      keywords: [tool.name, tool.primaryKeyword, ...tool.secondaryKeywords, "calorie counter", "macros", "protein", "meal planner", "meal cost"],
    });
  }

  for (const page of Object.values(infoPages)) {
    if (page.status !== "published") continue;
    entries.push({ title: page.title, description: page.description, url: infoPagePath(page), kind: "Guide", keywords: page.keywords });
  }

  return Response.json(entries, { headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
