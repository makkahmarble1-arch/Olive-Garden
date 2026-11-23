/**
 * Site-wide settings. Change the site name, navigation, or disclaimer here
 * and it updates everywhere.
 */

// The domain is never hardcoded. Order:
// 1. NEXT_PUBLIC_SITE_URL (set it in Vercel Production: https://olivegardenmenuprices.us),
// 2. on the Vercel Production deployment only: the project's production domain from
//    Vercel (VERCEL_PROJECT_PRODUCTION_URL, passed in next.config.ts as VERCEL_PRODUCTION_HOST),
// 3. http://localhost:3000 (development).
function getSiteUrl(): string {
  const host = process.env.VERCEL_PRODUCTION_HOST;
  const url = process.env.NEXT_PUBLIC_SITE_URL || (host ? `https://${host}` : "") || "http://localhost:3000";
  return url.replace(/\/+$/, "");
}

/** A real public https domain (not localhost, not a *.vercel.app deployment address). */
function isPublicSiteUrl(url: string): boolean {
  return /^https:\/\/[^/]+$/.test(url) && !/localhost|127\.0\.0\.1|\.vercel\.app$/i.test(url);
}

const SITE_URL = getSiteUrl();

export type NavLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  // Owner-approved public name (Lesson 9.5, 2026-11-14).
  name: "Olive Garden Menu Prices",
  tagline: "Independent menu & price guide",
  description:
    "An independent guide to the Olive Garden menu for US diners, with prices and calorie information as they are verified. Not affiliated with Olive Garden.",
  url: SITE_URL,
  /** Content language (html lang, Open Graph locale, structured data). */
  language: "en-US",
  locale: "en_US",
  /**
   * Search-engine indexing switch. ON only when BOTH are true:
   * - SITE_INDEXING=true (set only in Vercel Production, at launch, with owner approval), and
   * - this is the Vercel Production deployment (PRODUCTION_DEPLOYMENT=1, from VERCEL_ENV in next.config.ts).
   * - the site URL is a public https domain (not localhost or *.vercel.app).
   * So local development, local builds and Vercel preview deployments stay noindex even if the
   * variable is set by mistake for all environments. While off, every page is noindex, the
   * sitemap is empty and robots.txt does not announce it (docs/LAUNCH_CHECKLIST.md).
   */
  // Fail-safe: never index while the canonical site URL is not a public https domain
  // (e.g. http://localhost:3000 when NEXT_PUBLIC_SITE_URL is missing).
  indexingEnabled: process.env.SITE_INDEXING === "true" && process.env.PRODUCTION_DEPLOYMENT === "1" && isPublicSiteUrl(SITE_URL),

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
  officialSource: { label: "Olive Garden website", url: "https://www.olivegarden.com/" },
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

  // Information and legal pages about this website (footer). Only pages that exist.
  infoLinks: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact-us" },
    { label: "Editorial Policy", href: "/editorial-policy" },
    { label: "How We Check Prices", href: "/how-we-check-prices" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
    { label: "Disclaimer", href: "/disclaimer" },
  ] satisfies NavLink[],

  // Official Olive Garden pages listed in the footer (checked 2026-11-12).
  officialLinks: [
    { label: "Official Olive Garden menu", href: "https://www.olivegarden.com/menu" },
    { label: "Nutrition information (PDF)", href: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf" },
    { label: "Find a restaurant", href: "https://www.olivegarden.com/locations/location-search" },
  ] satisfies NavLink[],
} as const;
