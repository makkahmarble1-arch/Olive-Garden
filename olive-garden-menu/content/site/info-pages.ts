/**
 * Information pages about the website itself (docs/IMPORTANT_PAGES_PLAN.md).
 *
 * status:
 *   "preview"   = the page exists and is linked, but something is still
 *                 missing (noindex, not in the sitemap, a notice on the page)
 *   "published" = complete; indexable once SITE_INDEXING=true (owner approval)
 */
export type InfoPageStatus = "preview" | "published";

export type InfoPage = {
  slug: string;
  title: string;
  /** Meta description (also used by the site search). */
  description: string;
  /** Extra words people may search for (site search only). */
  keywords: string[];
  status: InfoPageStatus;
  /** Real date the page content was last changed (sitemap lastModified). */
  updatedAt: string;
  /** Legal pages: the date the current terms took effect (shown in full). */
  effectiveAt?: string;
  /** Why the page is still a preview (shown in the notice, owner-facing wording). */
  pending?: string;
};

export const infoPages: Record<"about" | "contact" | "editorial" | "prices" | "privacy" | "terms" | "disclaimer", InfoPage> = {
  about: {
    slug: "about-us",
    title: "About Us",
    description:
      "Learn about Olive Garden Menu Prices, our independent menu research, pricing verification, nutrition information and editorial standards.",
    keywords: ["about", "who we are", "independent", "editorial desk", "mission"],
    // Published 2026-11-14: founder section replaced by the Editorial Desk (owner decision).
    status: "published",
    updatedAt: "2026-11-14",
  },
  contact: {
    slug: "contact-us",
    title: "Contact Us",
    description:
      "Contact Olive Garden Menu Prices with menu corrections, pricing updates, nutrition questions, website feedback or business inquiries.",
    keywords: ["contact", "email", "correction", "feedback", "report", "advertising"],
    // Published 2026-11-14 (Lesson 9.5.4): Resend configured and one end-to-end
    // test email confirmed in the inbox by the owner, Reply-To checked.
    status: "published",
    updatedAt: "2026-11-14",
  },
  // Editorial pages (Lesson 9.7).
  editorial: {
    slug: "editorial-policy",
    title: "Editorial Policy",
    description:
      "Learn about our editorial standards, menu research, fact-checking process, content updates and commitment to accurate information.",
    keywords: ["editorial", "standards", "fact checking", "corrections", "sources", "independence"],
    status: "published",
    updatedAt: "2026-11-14",
  },
  prices: {
    slug: "how-we-check-prices",
    title: "How We Check Prices",
    description:
      "Discover how we research Olive Garden menu prices, verify calories, calculate comparisons and update restaurant menu information.",
    keywords: ["prices", "verification", "methodology", "calories", "how we check", "accuracy", "updates"],
    status: "published",
    updatedAt: "2026-11-14",
  },
  // Legal pages (Lesson 9.6). effectiveAt / updatedAt are real dates and are
  // shown in full ("November 14, 2026") on these pages only (owner decision
  // 2026-11-14). Change updatedAt only when the text actually changes.
  // Owner/legal review items: docs/LEGAL_PAGES_REVIEW.md.
  privacy: {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description:
      "Learn how Olive Garden Menu Prices handles visitor information, cookies, anonymous ratings, contact messages, advertising and privacy choices.",
    keywords: ["privacy", "cookies", "data", "ratings", "personal information", "adsense"],
    status: "published",
    updatedAt: "2026-11-14",
    effectiveAt: "2026-11-14",
  },
  terms: {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    description:
      "Read the terms governing the use of Olive Garden Menu Prices, including menu information, visitor ratings, content and external links.",
    keywords: ["terms", "conditions", "rules", "use"],
    status: "published",
    updatedAt: "2026-11-14",
    effectiveAt: "2026-11-14",
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    description:
      "Read our independent website disclaimer covering menu prices, nutrition information, dietary limitations, food images and restaurant affiliation.",
    keywords: ["disclaimer", "allergens", "gluten", "nutrition", "images", "trademark", "not affiliated"],
    status: "published",
    updatedAt: "2026-11-14",
    effectiveAt: "2026-11-14",
  },
};

export function infoPagePath(page: InfoPage): string {
  return `/${page.slug}`;
}
