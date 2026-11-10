import type { Metadata } from "next";
import { getAllMenuCategories, menuPath } from "@/lib/content";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import CategoryCard from "@/components/menu/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";

// Placeholder page: noindex until approved menu content exists
// (see docs/SEO_ARCHITECTURE.md, "/menu" note).
export const metadata: Metadata = {
  title: "Menu Categories",
  description:
    "Browse the Olive Garden menu by category. Prices and calories are added only after they are verified.",
  alternates: { canonical: menuPath },
  robots: { index: false, follow: true },
};

export default function MenuPage() {
  const categories = getAllMenuCategories();

  return (
    <div className="py-8 md:py-12">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Menu" }]} />

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[2.5rem]">
            Olive Garden Menu by Category
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            Choose a category to see its menu items, prices, and calories.
          </p>
        </header>

        <div
          role="note"
          className="mt-6 max-w-3xl rounded-lg border border-line bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text"
        >
          <strong className="font-semibold">Preview:</strong> The categories below are
          placeholders. Menu items, prices, and calories will be added after they
          are verified.
        </div>

        <section aria-labelledby="all-categories" className="mt-12">
          <SectionHeading id="all-categories" title="All Categories" />
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.slug} className="flex">
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </div>
  );
}
