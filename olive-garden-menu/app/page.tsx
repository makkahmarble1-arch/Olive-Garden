import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import {
  getAllMenuCategories,
  getFeaturedMenuCategories,
  getPublishedArticles,
  menuPath,
  toArticleCard,
} from "@/lib/content";
import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/menu/CategoryCard";
import ArticleCard from "@/components/content/ArticleCard";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const guidePoints = [
  {
    title: "We check before we publish",
    text: "Prices and calories appear only after we check them against a real source, such as an official menu or official nutrition information. Until then, you will see “Not verified yet.”",
  },
  {
    title: "Prices vary by location",
    text: `${siteConfig.priceNotice} Each price table will show where and when prices were checked.`,
  },
  {
    title: "Independent, not official",
    text: "This website is not the official Olive Garden website and is not affiliated with Olive Garden or Darden Restaurants, Inc.",
  },
];

export default function Home() {
  // The homepage previews a few categories; the full list lives on /menu.
  const featuredCategories = getFeaturedMenuCategories();
  const totalCategories = getAllMenuCategories().length;
  // Only guides that already exist are shown (none yet, so the section is hidden).
  const guides = getPublishedArticles().slice(0, 3).map(toArticleCard);

  return (
    <>
      <Hero categoryCount={totalCategories} />

      <section aria-labelledby="menu-categories" className="py-12 md:py-16">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="menu-categories"
              title="Start With a Menu Category"
              intro={`A few of the categories covered in this guide. The full menu page lists all ${totalCategories}.`}
            />
            <Link
              href={menuPath}
              className="inline-flex min-h-12 shrink-0 items-center justify-center self-start rounded-lg border border-brand-dark bg-white px-5 font-semibold text-brand-dark transition-colors hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark md:self-auto"
            >
              See All {totalCategories} Categories
            </Link>
          </div>

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCategories.map((category) => (
              <li key={category.slug} className="flex">
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {guides.length > 0 && (
        <section aria-labelledby="helpful-guides" className="border-t border-line py-12 md:py-16">
          <Container>
            <SectionHeading id="helpful-guides" title="Helpful Guides" />
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <li key={guide.href}>
                  <ArticleCard article={guide} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section
        aria-labelledby="about-this-guide"
        className="border-t border-line bg-brand-tint py-12 md:py-16"
      >
        <Container>
          <SectionHeading
            id="about-this-guide"
            title="About This Guide"
            intro="We are an independent website that helps diners in the United States plan their meal before they go."
          />

          <ul className="mt-8 grid gap-6 md:grid-cols-3">
            {guidePoints.map((point) => (
              <li key={point.title} className="rounded-lg border border-line bg-white p-6">
                <div aria-hidden="true" className="h-1.5 w-10 rounded-full bg-brand" />
                <h3 className="mt-4 font-display text-xl font-bold text-ink">{point.title}</h3>
                <p className="mt-2 leading-7 text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
