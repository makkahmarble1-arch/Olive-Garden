import type { GuidePageContent } from "@/lib/types";
import { menuCategories } from "@/content/menu/categories";
import { dinnerMenuGuide } from "./dinner-menu";
import { hoursGuide } from "./hours";
import { thanksgivingHoursGuide } from "./thanksgiving-hours";
import { christmasHoursGuide } from "./christmas-hours";

/**
 * Registry of menu guides that are not one of the 17 menu categories
 * (docs/SEO_ARCHITECTURE.md §1). Each guide has its own static route
 * (app/<slug>/page.tsx) and is added to the navigation, footer, search index,
 * and sitemap from here once its status is "published".
 */
// Holiday articles (navGroup "hours") appear in the header Hours dropdown in this order.
export const guidePages = [dinnerMenuGuide, hoursGuide, thanksgivingHoursGuide, christmasHoursGuide] as const satisfies readonly GuidePageContent[];

// A guide URL must never shadow a category URL (both live at the root).
for (const guide of guidePages) {
  if (menuCategories.some((c) => c.slug === guide.slug)) throw new Error(`Guide slug "${guide.slug}" clashes with a menu category.`);
}

export type GuideSlug = (typeof guidePages)[number]["slug"];

export function guidePath(guide: Pick<GuidePageContent, "slug">): string {
  return `/${guide.slug}`;
}

export function getGuide(slug: GuideSlug): GuidePageContent {
  const guide = guidePages.find((g) => g.slug === slug);
  if (!guide) throw new Error(`Unknown guide "${slug}".`);
  return guide;
}

/** Guides that may be linked (navigation, footer, search, sitemap). */
export function getPublishedGuides(): GuidePageContent[] {
  return guidePages.filter((g) => g.status === "published");
}
