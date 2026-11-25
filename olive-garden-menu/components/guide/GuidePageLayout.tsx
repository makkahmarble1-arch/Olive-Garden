import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import RichText from "@/components/content/RichText";
import JsonLd from "@/components/seo/JsonLd";
import CategoryHero from "@/components/category/CategoryHero";
import ComparisonTable from "@/components/category/ComparisonTable";
import FeaturedItems from "@/components/category/FeaturedItems";
import ContentSection, { tableKey } from "@/components/category/ContentSection";
import FAQSection from "@/components/category/FAQSection";
import SourceNote from "@/components/category/SourceNote";
import RelatedCategories from "@/components/category/RelatedCategories";
import HolidayHero from "./HolidayHero";
import HolidayStatus from "@/components/guide/HolidayStatus";
import {
  REFERENCE_ORDER_TYPE,
  getGuideCheckDate,
  getGuideRelatedMenus,
  resolveComparison,
  resolveMealExamples,
  resolvePriceOverview,
  resolveStaticTable,
  type ResolvedComparison,
} from "@/lib/category-data";
import { getOffering, menuPath } from "@/lib/content";
import { guidePath } from "@/content/guides";
import { siteConfig } from "@/lib/site";
import type { GuidePageContent, MenuOffering } from "@/lib/types";


/**
 * Layout of a guide that is not one of the 17 categories (e.g. /dinner-menu,
 * /hours; docs/SEO_ARCHITECTURE.md "Guide pages"). Same components and order
 * as the category pages, so it looks identical; only the data differs:
 *  1. Breadcrumb (Home > Menu > Guide, BreadcrumbList JSON-LD)
 *  2. Hero: H1, intro, facts bar (holiday articles: seasonal label + quick-answer status cards)
 *  3. Main table (H2): a price overview from the shared menu data, or a
 *     static facts table (e.g. weekly hours); optional photo cards (H3, shared ratings)
 *  4. Guide sections (H2 each), FAQ (+ FAQPage JSON-LD), Sources, Related Menus
 * Plus WebPage JSON-LD (no rating, menu, product, or restaurant schema).
 */
export default function GuidePageLayout({ guide }: { guide: GuidePageContent }) {
  const lastChecked = getGuideCheckDate(guide);
  const TABLE_ID = guide.tableAnchor ?? "prices";
  const staticTables = new Map((guide.staticTables ?? []).map((spec) => [spec.id, resolveStaticTable(spec)] as const));
  const tables = new Map<string, ResolvedComparison>([
    ...(guide.comparisons ?? []).map((spec) => [tableKey("comparison", spec.id), resolveComparison(spec)] as const),
    ...(guide.priceOverviews ?? []).map((spec) => [tableKey("priceOverview", spec.id), resolvePriceOverview(spec)] as const),
    ...(guide.mealExamples ?? []).map((spec) => [tableKey("mealExamples", spec.id), resolveMealExamples(spec)] as const),
    ...[...staticTables].map(([id, table]) => [tableKey("staticTable", id), table] as const),
  ]);
  const mainTable = guide.overview
    ? resolvePriceOverview(guide.overview)
    : guide.mainStaticTableId
      ? staticTables.get(guide.mainStaticTableId)
      : undefined;
  if (!mainTable) throw new Error(`Guide "${guide.slug}": needs an overview or a mainStaticTableId.`);
  const featured = (guide.featuredOfferingIds ?? []).map((id) => {
    const offering = getOffering(id);
    if (!offering) throw new Error(`Guide "${guide.slug}": unknown featured offering "${id}".`);
    return offering;
  }) satisfies MenuOffering[];
  const related = getGuideRelatedMenus(guide);
  // Menu guides show the section count and the price basis; other guides their own facts.
  const isMenuGuide = Boolean(guide.overview);

  const url = `${siteConfig.url}${guidePath(guide)}`;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: guide.metaTitle,
    headline: guide.h1,
    description: guide.metaDescription,
    inLanguage: siteConfig.language,
    isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: `${siteConfig.url}/` },
    publisher: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
    dateModified: lastChecked && lastChecked > guide.contentReviewedAt ? lastChecked : guide.contentReviewedAt,
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            guide.breadcrumbParent ?? { label: "Menu", href: menuPath },
            { label: guide.name },
          ]}
        />

        {guide.holiday ? (
          <HolidayHero
            holiday={guide.holiday}
            h1={guide.h1}
            intro={guide.intro}
            lastChecked={lastChecked}
            facts={guide.heroFacts}
            jumpLabel={guide.jumpLabel ?? "Jump to the schedule"}
            tableId={TABLE_ID}
          />
        ) : (
          <CategoryHero
            h1={guide.h1}
            intro={guide.intro}
            itemCount={isMenuGuide ? guide.overview?.rows.length : undefined}
            countLabel={guide.countLabel}
            lastChecked={lastChecked}
            orderType={isMenuGuide ? REFERENCE_ORDER_TYPE : undefined}
            extraFacts={guide.heroFacts}
            jumpLabel={guide.jumpLabel}
            tableId={TABLE_ID}
            isPreview={guide.status !== "published"}
          />
        )}

        {guide.holiday && <HolidayStatus holiday={guide.holiday} />}

        <section aria-labelledby={TABLE_ID} className="mt-10 scroll-mt-20">
          <h2 id={TABLE_ID} className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {guide.tableHeading}
          </h2>
          {guide.tableIntro && guide.tableIntro.length > 0 && (
            <div className="mt-4 max-w-3xl space-y-4 text-[1.0625rem] leading-8 text-ink">
              {guide.tableIntro.map((paragraph, i) => (
                <p key={i}>
                  <RichText value={paragraph} />
                </p>
              ))}
            </div>
          )}
          <div className="mt-6">
            <ComparisonTable table={mainTable} />
          </div>
          {featured.length > 0 && guide.featuredHeading && <FeaturedItems title={guide.featuredHeading} offerings={featured} />}
          {featured.length > 0 && guide.featuredIntro && <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">{guide.featuredIntro}</p>}
        </section>

        {guide.sections.map((section) => (
          <ContentSection key={section.id} section={section} tables={tables} />
        ))}

        <FAQSection faqs={guide.faqs} />

        <SourceNote
          officialSource={guide.officialSource === "nutrition" ? siteConfig.nutritionSource : siteConfig.officialSource}
          extraSource={guide.extraSource}
          lastChecked={lastChecked}
          summary={guide.sourceSummary}
        />

        <RelatedCategories items={related} />
        <JsonLd data={webPageJsonLd} />
      </Container>
    </div>
  );
}
