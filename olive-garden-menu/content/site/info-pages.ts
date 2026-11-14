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
    // Published 2026-11-14: founder section replaced by the Editorial Desk (owner decision).
    status: "published",
    updatedAt: "2026-11-14",
  },
  contact: {
    slug: "contact-us",
    title: "Contact Us",
    // Published 2026-11-14 (Lesson 9.5.4): Resend configured and one end-to-end
    // test email confirmed in the inbox by the owner, Reply-To checked.
    status: "published",
    updatedAt: "2026-11-14",
  },
  // Editorial pages (Lesson 9.7).
  editorial: {
    slug: "editorial-policy",
    title: "Editorial Policy",
    status: "published",
    updatedAt: "2026-11-14",
  },
  prices: {
    slug: "how-we-check-prices",
    title: "How We Check Prices",
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
    status: "published",
    updatedAt: "2026-11-14",
    effectiveAt: "2026-11-14",
  },
  terms: {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    status: "published",
    updatedAt: "2026-11-14",
    effectiveAt: "2026-11-14",
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    status: "published",
    updatedAt: "2026-11-14",
    effectiveAt: "2026-11-14",
  },
};

export function infoPagePath(page: InfoPage): string {
  return `/${page.slug}`;
}
