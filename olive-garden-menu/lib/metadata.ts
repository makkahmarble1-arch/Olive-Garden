import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

/**
 * Reusable page metadata (docs/SEO_ARCHITECTURE.md §2, docs/HOMEPAGE_SEO_AUDIT.md).
 * Every page gets: title, description, self-canonical, Open Graph, Twitter
 * card, and robots that respect the global indexing switch. URLs are
 * relative; the root layout's metadataBase (NEXT_PUBLIC_SITE_URL) makes
 * them absolute, so no domain is hardcoded.
 */

export type SocialImage = { url: string; width: number; height: number; alt: string };

/** Default social preview (owner photo, 1200 x 630 JPEG). */
export const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  url: "/images/og/olive-garden-menu-prices.jpg",
  width: 1200,
  height: 630,
  alt: "Pasta, breadsticks, salad, iced tea, and bowls of toppings on a table",
};

/**
 * index only when the page itself may be indexed AND the site-wide switch
 * is on; "follow" always, so links are still discovered.
 */
export function robotsFor(indexable: boolean): NonNullable<Metadata["robots"]> {
  return indexable && siteConfig.indexingEnabled ? { index: true, follow: true } : { index: false, follow: true };
}

type PageMetadataInput = {
  title: string;
  description: string;
  /** Canonical path, e.g. "/" or "/appetizers". */
  path: string;
  /** true = use the title as is (no " | Site Name" suffix). */
  absoluteTitle?: boolean;
  /** false for previews, hubs, and utility pages (always noindex). */
  indexable?: boolean;
  image?: SocialImage;
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
  indexable = true,
  image = DEFAULT_SOCIAL_IMAGE,
  type = "website",
}: PageMetadataInput): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: robotsFor(indexable),
    openGraph: {
      type,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      url: path,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
