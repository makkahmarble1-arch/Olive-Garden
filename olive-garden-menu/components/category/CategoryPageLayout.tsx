import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import MenuTable from "@/components/menu/MenuTable";
import RichText from "@/components/content/RichText";
import JsonLd from "@/components/seo/JsonLd";
import CategoryHero from "./CategoryHero";
import FeaturedItems from "./FeaturedItems";
import ContentSection, { tableKey } from "./ContentSection";
import FAQSection from "./FAQSection";
import SourceNote from "./SourceNote";
import RelatedCategories from "./RelatedCategories";
import {
  getCategoryFacts,
  getFeaturedOfferings,
  getRelatedMenus,
  resolveComparison,
  resolveOptionTable,
  resolvePastaBuilds,
  resolveServingPlan,
  type ResolvedComparison,
} from "@/lib/category-data";
import { menuCategoryPath, menuPath } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import type { CategoryPageContent, MenuCategoryDef } from "@/lib/types";

const TABLE_ID = "prices";

/**
 * Reusable layout of all 17 category pages (docs/CATEGORY_PAGE_ARCHITECTURE.md).
 * Fixed order, no sidebar, server-rendered:
 *  1. Breadcrumb (Home > Menu > Category, with BreadcrumbList JSON-LD)
 *  2. CategoryHero: H1, intro, price facts (count, month/year verified, order type, USA note)
 *  3. Price table section (H2): complete table (shared data, golden ratings),
 *     price and calorie notes, and 3-5 photo cards (H3)
 *  4. Category-specific sections (H2 each; text + comparison tables)
 *  5. FAQ accordion (+ FAQPage JSON-LD)
 *  6. Sources: one official source (+ optional one), month/year, disclaimer
 *  7. Related Menus (live pages, real article titles) + full menu link
 * Plus WebPage JSON-LD (no rating or menu schema).
 */
export default function CategoryPageLayout({ category, content }: { category: MenuCategoryDef; content: CategoryPageContent }) {
  const facts = getCategoryFacts(category, content);
  const showRatings = content.showRatings !== false;
  const featured = getFeaturedOfferings(content, facts.offerings);
  const tables = new Map<string, ResolvedComparison>([
    ...(content.comparisons ?? []).map((spec) => [tableKey("comparison", spec.id), resolveComparison(spec)] as const),
    ...(content.optionTables ?? []).map((spec) => [tableKey("optionTable", spec.id), resolveOptionTable(spec)] as const),
    ...(content.pastaBuilds ?? []).map((spec) => [tableKey("pastaBuilds", spec.id), resolvePastaBuilds(spec)] as const),
    ...(content.servingPlans ?? []).map((spec) => [tableKey("servingPlan", spec.id), resolveServingPlan(spec)] as const),
  ]);
  const related = getRelatedMenus(category, content);
  // Rows without a rating (e.g. merchandise): no productId means no rating widget.
  const noRating = new Set(content.noRatingOfferingIds ?? []);
  const tableRows = facts.rows.map((row, i) => (noRating.has(facts.offerings[i].id) ? { ...row, productId: null } : row));

  const url = `${siteConfig.url}${menuCategoryPath(category.slug)}`;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: content.metaTitle,
    headline: content.h1,
    description: content.metaDescription,
    inLanguage: siteConfig.language,
    isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: `${siteConfig.url}/` },
    publisher: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
    ...(facts.lastChecked ? { dateModified: content.contentReviewedAt && content.contentReviewedAt > facts.lastChecked ? content.contentReviewedAt : facts.lastChecked } : {}),
  };

  return (
    <div className="py-8 md:py-12">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Menu", href: menuPath },
            { label: category.name },
          ]}
        />

        <CategoryHero
          h1={content.h1}
          intro={content.intro}
          itemCount={facts.itemCount}
          countLabel={facts.countLabel}
          lastChecked={facts.lastChecked}
          orderType={facts.orderType}
          tableId={TABLE_ID}
          isPreview={category.contentStatus !== "published"}
        />

        <section aria-labelledby={TABLE_ID} className="mt-10 scroll-mt-20">
          {content.tableHeading ? (
            <h2 id={TABLE_ID} className="font-display text-2xl font-bold text-ink sm:text-3xl">
              {content.tableHeading}
            </h2>
          ) : (
            <h2 id={TABLE_ID} className="sr-only">
              Prices and calories
            </h2>
          )}
          {content.tableIntro && content.tableIntro.length > 0 && (
            <div className="mt-4 max-w-3xl space-y-4 text-[1.0625rem] leading-8 text-ink">
              {content.tableIntro.map((paragraph, i) => (
                <p key={i}>
                  <RichText value={paragraph} />
                </p>
              ))}
            </div>
          )}
          <div className={`space-y-4 ${content.tableHeading ? "mt-6" : ""}`}>
            <MenuTable caption={content.tableCaption} items={tableRows} showRatings={showRatings} />
            {(content.priceNotes.length > 0 || content.nutritionNotes.length > 0) && (
              <ul className="max-w-3xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted marker:text-brand-dark">
                {[...content.priceNotes, ...content.nutritionNotes].map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            )}
          </div>
          <FeaturedItems
            title={content.featuredHeading ?? `${category.name} with Photos`}
            offerings={featured}
            showRating={showRatings}
          />
        </section>

        {content.sections?.map((section) => (
          <ContentSection key={section.id} section={section} tables={tables} />
        ))}

        <FAQSection faqs={content.faqs} />

        <SourceNote
          officialSource={content.officialSource === "nutrition" ? siteConfig.nutritionSource : siteConfig.officialSource}
          extraSource={content.extraSource}
          lastChecked={facts.lastChecked}
        />

        <RelatedCategories items={related} />
        <JsonLd data={webPageJsonLd} />
      </Container>
    </div>
  );
}
