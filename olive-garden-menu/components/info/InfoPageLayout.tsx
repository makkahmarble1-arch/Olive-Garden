import type { ReactNode } from "react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/format";
import type { InfoPage } from "@/content/site/info-pages";
import { infoPagePath } from "@/content/site/info-pages";

type InfoPageLayoutProps = {
  page: InfoPage;
  /** Visible H1 (one per page). */
  h1: string;
  /** Short introduction under the H1. */
  intro: ReactNode;
  /** Meta description, reused in the structured data. */
  description: string;
  /** schema.org WebPage type for this page. */
  schemaType: "AboutPage" | "ContactPage" | "WebPage";
  /**
   * Legal pages only: show the complete "Effective date" and "Last updated"
   * dates (owner decision 2026-11-14). Menu pages keep month-and-year
   * verification labels.
   */
  showUpdated?: boolean;
  /** Optional "On this page" links (id + title of each H2 section). */
  toc?: { id: string; title: string }[];
  children: ReactNode;
};

/**
 * Shared layout for pages about the website itself (About Us, Contact Us,
 * later the legal pages): breadcrumb, soft cream/olive heading band, and a
 * readable content column (about 60rem = 960px). Server component.
 * Design: docs/DESIGN_SYSTEM.md 4.3.
 */
export default function InfoPageLayout({ page, h1, intro, description, schemaType, showUpdated = false, toc, children }: InfoPageLayoutProps) {
  const path = infoPagePath(page);
  const url = `${siteConfig.url}${path}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": schemaType,
    "@id": `${url}#webpage`,
    url,
    name: `${page.title} | ${siteConfig.name}`,
    headline: h1,
    description,
    inLanguage: siteConfig.language,
    dateModified: page.updatedAt,
    isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: `${siteConfig.url}/` },
    publisher: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
  };

  return (
    <div className="pb-12 md:pb-16">
      <div className="border-b border-card-border bg-card-bg">
        <Container className="py-6 md:py-10">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />
          <header className="mt-6 max-w-[60rem]">
            <p className="text-sm font-semibold tracking-wide text-brand-dark uppercase">{siteConfig.name}</p>
            <h1 className="mt-2 font-display text-3xl leading-tight font-bold text-hero-deep sm:text-4xl lg:text-[2.75rem]">
              {h1}
            </h1>
            <div className="mt-4 max-w-[48rem] text-lg leading-8 text-card-text">{intro}</div>
            {showUpdated && (
              <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                <span>
                  <strong className="font-semibold text-ink">Effective date:</strong>{" "}
                  <time dateTime={page.effectiveAt ?? page.updatedAt}>{formatDate(page.effectiveAt ?? page.updatedAt)}</time>
                </span>
                <span>
                  <strong className="font-semibold text-ink">Last updated:</strong>{" "}
                  <time dateTime={page.updatedAt}>{formatDate(page.updatedAt)}</time>
                </span>
              </p>
            )}
          </header>
          {page.status !== "published" && page.pending && (
            <p
              role="note"
              className="mt-6 max-w-[60rem] rounded-lg border border-line bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text"
            >
              <strong className="font-semibold">Preview:</strong> {page.pending}
            </p>
          )}
        </Container>
      </div>

      <Container>
        <div className="info-content mt-10 max-w-[60rem]">
          {toc && toc.length > 0 && (
            <nav aria-labelledby="on-this-page" className="mb-10 rounded-xl border border-card-border bg-card-bg p-5 sm:p-6">
              <h2 id="on-this-page" className="font-display text-lg font-bold text-hero-deep">
                On this page
              </h2>
              <ol className="mt-3 grid list-decimal gap-x-8 gap-y-1 pl-5 text-[0.95rem] leading-7 marker:text-brand-dark sm:grid-cols-2">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {children}
        </div>
      </Container>
      <JsonLd data={jsonLd} />
    </div>
  );
}

/** One titled content section (H2) inside an info page. */
export function InfoSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-heading`} id={id} className="scroll-mt-20 border-t border-line pt-8 first:border-t-0 first:pt-0 [&+&]:mt-10">
      <h2 id={`${id}-heading`} className="font-display text-2xl font-bold text-ink sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[1.0625rem] leading-8 text-ink/85">{children}</div>
    </section>
  );
}

/** Text link inside info content (brand-dark, underlined, focus ring). */
export function InfoLink({ href, children }: { href: string; children: ReactNode }) {
  const className =
    "font-medium text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark";
  if (!/^https?:\/\//.test(href)) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="nofollow noopener" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** H3 sub-heading inside an InfoSection. */
export function InfoSubheading({ children }: { children: ReactNode }) {
  return <h3 className="pt-2 font-display text-xl font-bold text-hero-deep">{children}</h3>;
}
