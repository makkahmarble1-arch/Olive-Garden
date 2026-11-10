import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { menuCategories } from "@/content/menu/categories";
import Container from "@/components/layout/Container";
import Hero from "@/components/home/Hero";
import CategoryCard from "@/components/menu/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Hero />

      <section aria-labelledby="menu-categories" className="py-12 md:py-16">
        <Container>
          <SectionHeading
            id="menu-categories"
            title="Menu Categories"
            intro="Explore the menu by category. Each category page will include a table of menu items with verified prices and calories."
          />

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menuCategories.map((category) => (
              <li key={category.slug} className="flex">
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section
        aria-labelledby="about-this-guide"
        className="border-t border-line bg-white py-12 md:py-16"
      >
        <Container>
          <SectionHeading
            id="about-this-guide"
            title="About This Guide"
            intro="We are an independent website that helps diners in the United States plan their meal before they go."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-line p-6">
              <h3 className="font-display text-xl font-bold text-ink">
                How we check prices
              </h3>
              <p className="mt-2 leading-7 text-muted">
                Prices and calories are added only after they are checked
                against a real source, such as a restaurant menu or official
                nutrition information. Each price table will show where and
                when it was checked. Anything we have not checked yet is marked
                &ldquo;Not verified yet&rdquo;.
              </p>
            </div>

            <div className="rounded-lg border border-brand bg-brand-tint p-6">
              <h3 className="font-display text-xl font-bold text-ink">
                Please note
              </h3>
              <p className="mt-2 leading-7 text-ink">{siteConfig.priceNotice}</p>
              <p className="mt-2 leading-7 text-muted">
                This is not the official Olive Garden website.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
