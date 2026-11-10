/**
 * Shared data shapes. TypeScript uses these to catch mistakes in content files.
 */

/* ------------------------------------------------------------------ */
/* Menu                                                                 */
/* ------------------------------------------------------------------ */

/** "verified" = checked against a real source. Anything else is not shown as fact. */
export type VerificationStatus = "verified" | "needs-verification";

export type MenuItem = {
  name: string;
  /** Optional short description, shown under the item name. */
  description?: string | null;
  /** Price in US dollars. `null` = not verified yet (never guess). */
  price: number | null;
  /** Calories. `null` = not verified yet (never guess). */
  calories: number | null;
  /** Price and calories are displayed only when this is "verified". */
  status: VerificationStatus;
  /** Where the price/calories came from (e.g. official nutrition PDF, store menu). */
  source: string | null;
  /** Location the price was checked at (prices vary by location). */
  location: string | null;
  /** ISO date, e.g. "2026-11-10". */
  lastChecked: string | null;
};

export type MenuCategory = {
  /** Used in the URL: /menu/[slug] */
  slug: string;
  name: string;
  summary: string;
  /**
   * "placeholder" = temporary design content, no real page yet.
   * "published" = real, owner-approved content with its own page.
   */
  contentStatus: "placeholder" | "published";
  items: MenuItem[];
  /** ISO date of the last content update. */
  updatedAt: string | null;
};

/* ------------------------------------------------------------------ */
/* Articles                                                             */
/* ------------------------------------------------------------------ */

/** A link inside text. Internal links start with "/" (e.g. "/menu"). */
export type InlineLink = { text: string; href: string };

/** Plain text, or a mix of text and links: ["See our ", { text: "menu", href: "/menu" }, "."] */
export type RichText = string | (string | InlineLink)[];

/** Building blocks for article sections. */
export type ContentBlock =
  | { type: "paragraph"; text: RichText }
  | { type: "subheading"; text: string; id?: string }
  | { type: "list"; items: RichText[]; ordered?: boolean }
  | { type: "note"; text: RichText };

export type ArticleSection = {
  /** Unique, lowercase-hyphenated id. Used for the table of contents link (#id). */
  id: string;
  /** Rendered as an h2 and listed in the table of contents. */
  heading: string;
  blocks: ContentBlock[];
};

export type ArticleImage = {
  /** Image path in /public. `null` until the owner provides an approved image. */
  src: string | null;
  /** Describes the image for screen readers and search engines. */
  alt: string;
};

export type Article = {
  /** Used in the URL: /blog/[slug] */
  slug: string;
  /** The h1 of the article. */
  title: string;
  /** Meta description and card summary (~140-160 characters). */
  description: string;
  intro: RichText;
  featuredImage: ArticleImage | null;
  /** ISO date, e.g. "2026-11-10". */
  publishedAt: string;
  /** ISO date of the last meaningful update, or `null`. */
  updatedAt: string | null;
  /** Real author name only (owner-provided). `null` = not shown. */
  author: string | null;
  /** Only "published" articles are listed and linked. */
  contentStatus: "draft" | "published";
  sections: ArticleSection[];
  /** Slugs of related articles (shown at the bottom). */
  relatedSlugs: string[];
};

/** Data needed to show an article card. */
export type ArticleCardData = {
  title: string;
  description: string;
  href: string;
  /** ISO date shown on the card (updated date if available). */
  date: string | null;
};

/** One link in the breadcrumb trail. The last item (current page) has no href. */
export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/** One entry in a table of contents. */
export type TocItem = {
  id: string;
  label: string;
};
