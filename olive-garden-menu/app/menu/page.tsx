import type { Metadata } from "next";
import {
  getAllMenuCategories,
  getMenuCategoryGroupHeading,
  menuPath,
} from "@/lib/content";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import CategoryCard from "@/components/menu/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";
import VerificationBadge from "@/components/ui/VerificationBadge";

// Main menu hub. Stays noindex while category pages and prices are not
// published yet (see docs/SEO_ARCHITECTURE.md, "/menu").
export const metadata: Metadata = {
  title: "Full Menu by Category",
  description:
    "See every Olive Garden menu category in one place, from family-style meals to catering. Prices and calories are added only after they are verified.",
  alternates: { canonical: menuPath },
  robots: { index: false, follow: true },
};

export default function MenuPage() {
  // Approved order (1-17, as in docs/MENU_INVENTORY.md).
  const categories = getAllMenuCategories();
  const total = categories.length;

  return (
    <div className="py-8 md:py-12">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Menu" }]} />

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[2.5rem]">
            Olive Garden Menu by Category
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            This page brings all {total} menu categories covered in this guide
            together in one list. Pick a category to see what it includes. Each
            category page will show prices and calories once they have been
            checked.
          </p>
        </header>

        <div
          role="note"
          className="mt-6 max-w-3xl rounded-lg border border-line bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text"
        >
          <strong className="font-semibold">Preview:</strong> Most category pages are
          still being prepared. Prices and calories are added only after they are
          verified.
        </div>

        <nav
          aria-labelledby="jump-to-category"
          className="mt-10 rounded-lg border border-line bg-brand-tint p-5 sm:p-6"
        >
          <h2 id="jump-to-category" className="font-display text-xl font-bold text-ink">
            Jump to a Category
          </h2>
          <ol className="mt-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.slug}`}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink transition-colors hover:border-brand-dark hover:text-brand-dark focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  <span aria-hidden="true" className="text-xs font-semibold text-brand-dark tabular-nums">
                    {String(category.inventoryOrder).padStart(2, "0")}
                  </span>
                  {category.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section aria-labelledby="all-categories" className="mt-12">
          <SectionHeading id="all-categories" title={`All ${total} Menu Categories`} />
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <li key={category.id} className="flex">
                <CategoryCard
                  category={category}
                  anchorId={category.slug}
                  label={getMenuCategoryGroupHeading(category.id)}
                />
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="how-prices-appear"
          className="mt-14 max-w-3xl border-t border-line pt-10"
        >
          <SectionHeading id="how-prices-appear" title="How Prices Will Appear" />
          <ul className="mt-6 space-y-4 leading-7 text-muted">
            <li>
              <strong className="font-semibold text-ink">One reference market.</strong>{" "}
              We plan to check prices at one Olive Garden restaurant in Orlando,
              Florida, so prices are comparable from one category to the next.
            </li>
            <li>
              <strong className="font-semibold text-ink">Dated checks.</strong> Each
              price table will show when its prices were last checked.
            </li>
            <li>
              <strong className="font-semibold text-ink">No guesses.</strong> Anything we
              have not checked yet is marked <VerificationBadge /> instead of showing
              an estimate.
            </li>
          </ul>
        </section>
      </Container>
    </div>
  );
}
