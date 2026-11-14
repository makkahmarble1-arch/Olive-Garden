/**
 * Site-wide settings. Change the site name, navigation, or disclaimer here
 * and it updates everywhere.
 */

// The production domain is not decided yet, so it is never hardcoded.
// Set NEXT_PUBLIC_SITE_URL (e.g. in Vercel) before launch.
function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Olive Garden Menu & Prices",
  tagline: "Independent menu & price guide",
  description:
    "An independent guide to the Olive Garden menu for US diners, with prices and calorie information as they are verified. Not affiliated with Olive Garden.",
  url: getSiteUrl(),
  /** Content language (html lang, Open Graph locale, structured data). */
  language: "en-US",
  locale: "en_US",
  /**
   * Search-engine indexing switch. OFF unless SITE_INDEXING=true is set
   * (only in Vercel Production, at launch, with owner approval). While off,
   * every page is noindex and the sitemap is empty (docs/LAUNCH_CHECKLIST.md).
   */
  indexingEnabled: process.env.SITE_INDEXING === "true",

  disclaimer:
    "This is an independent informational website. It is not the official Olive Garden website and is not affiliated with, endorsed by, or sponsored by Olive Garden or Darden Restaurants, Inc. Olive Garden is a trademark of its respective owner.",
  priceNotice:
    "Prices vary by location and can change at any time. Always confirm with your local restaurant.",

  /**
   * Public location standard (owner, 2026-11-13): the site shows the target
   * country only, never the reference restaurant (name, city, address).
   * The exact reference location stays in content/menu/locations.ts and research/.
   */
  market: "USA",
  locationNotice: "Prices may vary by location across the USA.",
  /** Default official source shown in the short Sources section of every page. */
  officialSource: { label: "Olive Garden", url: "https://www.olivegarden.com/" },
  nutritionSource: {
    label: "Olive Garden Nutrition Information (PDF)",
    url: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
  },

  // Only link to sections/pages that exist. The full menu lives on the
  // homepage; /menu is noindex and not linked (redirect reviewed before launch).
  // Add "About", "Contact", and legal pages here once those routes exist.
  nav: [
    { label: "Full Menu", href: "/#full-menu" },
    { label: "Popular", href: "/#popular-menu-items" },
    { label: "Deals", href: "/#lunch-specials-deals" },
    { label: "Hours", href: "/#hours" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies NavLink[],

  // Official Olive Garden pages listed in the footer (checked 2026-11-12).
  officialLinks: [
    { label: "Official Olive Garden menu", href: "https://www.olivegarden.com/menu" },
    { label: "Nutrition information (PDF)", href: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf" },
    { label: "Find a restaurant", href: "https://www.olivegarden.com/locations/location-search" },
  ] satisfies NavLink[],
} as const;
