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

  disclaimer:
    "This is an independent informational website. It is not the official Olive Garden website and is not affiliated with, endorsed by, or sponsored by Olive Garden or Darden Restaurants, Inc. Olive Garden is a trademark of its respective owner.",
  priceNotice:
    "Prices vary by location and can change at any time. Always confirm with your local restaurant.",

  // Only link to sections/pages that exist. Add "Blog" and "About" here
  // once those routes are built (see docs/DEVELOPMENT_ROADMAP.md).
  nav: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "About This Guide", href: "/#about-this-guide" },
  ] satisfies NavLink[],
} as const;
