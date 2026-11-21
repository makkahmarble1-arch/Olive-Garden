import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import RichText from "@/components/content/RichText";
import JsonLd from "@/components/seo/JsonLd";
import SectionHeading from "@/components/ui/SectionHeading";
import MenuItemCard from "@/components/menu/MenuItemCard";
import { cardGridClass } from "@/components/home/MenuCategorySection";
import FAQSection from "@/components/category/FAQSection";
import SourceNote from "@/components/category/SourceNote";
import RelatedCategories from "@/components/category/RelatedCategories";
import { menuCategoryPath, menuPath } from "@/lib/content";
import { productPath, type ProductPageData } from "@/lib/product-pages";
import { siteConfig } from "@/lib/site";
import ProductHero from "./ProductHero";
import QuickFacts from "./QuickFacts";
import NutritionSection from "./NutritionSection";
import AllergenSection from "./AllergenSection";
import ServingSection from "./ServingSection";
import PairingSection from "./PairingSection";
import VersionSection from "./VersionSection";
import ComponentsSection from "./ComponentsSection";

/**
 * Reusable layout of every menu item page (/menu/[slug]).
 * docs/product-pages/PRODUCT_PAGE_ARCHITECTURE.md (order) and
 * PRODUCT_PAGE_DESIGN.md (visual rules). Server-rendered; only the rating
 * stars run in the browser.
 *  1. Breadcrumbs: Home / Menu / {Category} / {Item} (+ BreadcrumbList JSON-LD)
 *  2. Hero: photo, H1, rating, price + calorie badges, summary, section links
 *  3. Quick facts cards (+ 3a. Versions: selector and table, version-aware items only)
 *  4. About (H2)
 *  5. Nutrition (H2): calorie spotlight, verified table, comparison
 *  6. Ingredients and allergens (H2)
 *  7. Serving size, sauce and sizes (H2)
 *  8. Pairings (H2, editorial)
 *  9. Similar items (H2, approved menu cards with the shared ratings)
 * 10. FAQs (+ FAQPage JSON-LD), 11. Sources, 12. Related Menus
 * Plus WebPage JSON-LD. No Product, Offer, Review or AggregateRating schema.
 */
export default function ProductPageLayout({ data }: { data: ProductPageData }) {
  const { page, primary, category, lastChecked, related, relatedMenus } = data;
  const url = `${siteConfig.url}${productPath(page.slug)}`;
  const modified = page.contentReviewedAt > lastChecked ? page.contentReviewedAt : lastChecked;
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.metaTitle,
    headline: page.h1,
    description: page.metaDescription,
    inLanguage: siteConfig.language,
    isPartOf: { "@type": "WebSite", "@id": `${siteConfig.url}/#website`, name: siteConfig.name, url: `${siteConfig.url}/` },
    publisher: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.name },
    dateModified: modified,
  };

  return (
    <div className="py-6 md:py-10">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Menu", href: menuPath },
            { label: category.name, href: menuCategoryPath(category.slug) },
            { label: primary.displayName },
          ]}
        />

        <ProductHero data={data} />
        <QuickFacts data={data} />
        <VersionSection data={data} />

        <section aria-labelledby="about" className="mt-14">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <div>
              <SectionHeading id="about" title={page.about.heading} />
              <div className="mt-5 max-w-prose space-y-4 text-[1.0625rem] leading-8 text-ink">
                {page.about.paragraphs.map((paragraph, i) => (
                  <p key={i}>
                    <RichText value={paragraph} />
                  </p>
                ))}
              </div>
            </div>
            <aside aria-label="Good to know" className="h-fit rounded-3xl bg-hero-deep p-5 text-footer-text sm:p-6">
              <p className="font-display text-lg font-bold text-hero-highlight">Good to know</p>
              <ul className="mt-3 space-y-3 text-sm leading-6">
                <li>Prices shown are online pickup prices. Dine-in prices were not checked and may differ.</li>
                <li>{siteConfig.locationNotice} Confirm with your local restaurant.</li>
                <li>
                  {page.includes.length > 0
                    ? `Calories are for one ${page.unitLabel ?? "order"} as served; the dipping ${page.includes.length > 1 ? "sauces are" : "sauce is"} listed separately.`
                    : `Calories are for one ${page.unitLabel ?? "order"} as served.`}
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <ComponentsSection data={data} />
        <NutritionSection data={data} />
        <AllergenSection data={data} />
        <ServingSection data={data} />
        <PairingSection data={data} />

        {related.length > 0 && (
          <section aria-labelledby="similar" className="mt-14">
            <SectionHeading id="similar" title={`Similar ${category.name}`} />
            <ul className={`mt-6 ${cardGridClass}`}>
              {related.map((offering) => (
                <MenuItemCard key={offering.id} offering={offering} />
              ))}
            </ul>
          </section>
        )}

        <FAQSection faqs={page.faqs} />

        <SourceNote
          officialSource={page.officialSource}
          extraSource={page.extraSource}
          lastChecked={lastChecked}
          summary={`Price, calories and serving details are from Olive Garden’s official online menu and nutrition information. Prices may vary by location across the ${siteConfig.market}. Values marked “Calc.” are our calculations from official values.`}
        />

        <RelatedCategories items={relatedMenus} />
        <JsonLd data={webPageJsonLd} />
      </Container>
    </div>
  );
}
