import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import {
  getAllMenuCategories,
  getCreateYourOwnPasta,
  getMenuCategoriesWithPages,
  getMenuCheckDates,
  getOffering,
  getOfferingsForCategory,
  getReferenceLocation,
} from "@/lib/content";
import { referenceLocations } from "@/content/menu/locations";
import {
  categoryNotes,
  heroImage,
  heroIntro,
  lowerCalorieOfferingIds,
  popularOfferingIds,
} from "@/content/home/homepage";
import type { MenuOffering } from "@/lib/types";
import Container from "@/components/layout/Container";
import Hero, { PricingInfoBar } from "@/components/home/Hero";
import CategoryNav from "@/components/home/CategoryNav";
import MenuSearch from "@/components/home/MenuSearch";
import BackToTop from "@/components/home/BackToTop";
import MenuCategorySection, { cardGridClass } from "@/components/home/MenuCategorySection";
import CreateYourOwnPastaTable from "@/components/home/CreateYourOwnPastaTable";
import MenuItemCard from "@/components/menu/MenuItemCard";
import JsonLd from "@/components/seo/JsonLd";
import {
  DealsSection,
  FaqSection,
  HolidaySection,
  HoursSection,
  ImportantLinks,
  NutritionSection,
  OrderOnlineSection,
  PopularSection,
  SourcesList,
} from "@/components/home/SupportingSections";

const H1 = "Olive Garden Menu with Prices & Calories 2026";
const TITLE = "Olive Garden Menu with Prices & Calories (2026)";
const DESCRIPTION =
  "Explore the complete Olive Garden menu with updated 2026 prices, calories, lunch specials, family meals, desserts, drinks, and catering options.";

// The homepage is the primary (and only) indexable full-menu page.
export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/", absoluteTitle: true });

/** Looks up offerings by id; a missing id is a data error, so it fails the build. */
function offeringsById(ids: readonly string[]): MenuOffering[] {
  return ids.map((id) => {
    const offering = getOffering(id);
    if (!offering) throw new Error(`Homepage: unknown offering "${id}".`);
    return offering;
  });
}

/**
 * Homepage = the complete Olive Garden menu (owner-approved spec,
 * docs/MENU_PAGE_OUTLINES.md "Homepage"). Everything is server-rendered;
 * only the category bar, search, size selectors, and back-to-top link
 * run in the browser.
 */
export default function Home() {
  const categories = getAllMenuCategories();
  const cyop = getCreateYourOwnPasta();
  const location = getReferenceLocation(referenceLocations[0].id) ?? referenceLocations[0];
  const sections = categories.map((category) => ({
    category,
    offerings: getOfferingsForCategory(category.id),
  }));
  const searchableTotal =
    sections.reduce((sum, s) => sum + s.offerings.length, 0) + cyop.options.length + 1;

  // WebSite + Organization (this independent publisher, NOT the restaurant)
  // + WebPage. No Menu/MenuItem/Product/AggregateRating: docs/SEO_ARCHITECTURE.md §3.
  const checkDates = getMenuCheckDates();
  const home = `${siteConfig.url}/`;
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${home}#website`,
        url: home,
        name: siteConfig.name,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": `${home}#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${home}#organization`,
        name: siteConfig.name,
        url: home,
        description:
          "Independent publisher of an informational Olive Garden menu and price guide. Not affiliated with Olive Garden or Darden Restaurants, Inc.",
      },
      {
        "@type": "WebPage",
        "@id": `${home}#webpage`,
        url: home,
        name: TITLE,
        headline: H1,
        description: DESCRIPTION,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${home}#website` },
        publisher: { "@id": `${home}#organization` },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteConfig.url}${heroImage.src}`,
          width: heroImage.width,
          height: heroImage.height,
        },
        ...(checkDates ? { dateModified: checkDates.last } : {}),
      },
    ],
  };

  return (
    <>
      {/* 2-3. Hero (H1, short intro, food photo) and the pricing/verification facts */}
      <Hero title={H1} intro={heroIntro} image={heroImage} />
      <PricingInfoBar location={location} checked={checkDates} />

      {/* 4-6. Category navigation, search, and all 17 menu sections */}
      <div id="full-menu" className="scroll-mt-16">
        <Container>
          <CategoryNav categories={categories.map((c) => ({ id: c.slug, label: c.name }))} />
          <div className="py-6">
            <MenuSearch containerId="menu-sections" total={searchableTotal} />
          </div>
          <div id="menu-sections" className="space-y-10 pb-12">
            {sections.map(({ category, offerings }) =>
              category.id === "create-your-own-pasta" ? (
                <MenuCategorySection
                  key={category.id}
                  category={category}
                  itemCount={cyop.options.length}
                  itemWord="build options"
                  note={categoryNotes[category.id]}
                >
                  <CreateYourOwnPastaTable data={cyop} />
                </MenuCategorySection>
              ) : (
                <MenuCategorySection
                  key={category.id}
                  category={category}
                  itemCount={offerings.length}
                  note={categoryNotes[category.id]}
                >
                  <ul className={cardGridClass}>
                    {offerings.map((offering) => (
                      <MenuItemCard key={offering.id} offering={offering} searchable />
                    ))}
                  </ul>
                </MenuCategorySection>
              ),
            )}
          </div>
        </Container>
      </div>

      {/* 7-13. Supporting sections (seven H2s) */}
      <PopularSection offerings={offeringsById(popularOfferingIds)} />
      <DealsSection />
      <HoursSection location={location} />
      <HolidaySection />
      <NutritionSection lowerCalorie={offeringsById(lowerCalorieOfferingIds)} />
      <OrderOnlineSection />
      <FaqSection />

      {/* 14-15. Important links and sources (the footer adds the disclaimer) */}
      <ImportantLinks categoryPages={getMenuCategoriesWithPages().map((c) => ({ slug: c.slug, name: c.name }))} />
      <SourcesList />

      <BackToTop />
      <JsonLd data={homeJsonLd} />
    </>
  );
}
