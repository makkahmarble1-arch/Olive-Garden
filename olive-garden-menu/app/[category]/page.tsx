import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryPageContent,
  getMenuCategoriesWithPages,
  getMenuCategory,
  getMenuProduct,
  getOfferingsForCategory,
  getReferenceMarketLabel,
  menuCategoryHref,
  menuCategoryPath,
  menuPath,
  toMenuTableItem,
} from "@/lib/content";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import MenuTable from "@/components/menu/MenuTable";
import PriceNotice from "@/components/menu/PriceNotice";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";

/**
 * Category pages at the approved root-level URLs (e.g. /appetizers).
 * Only categories with contentStatus "preview" or "published" get a page;
 * every other path returns 404. "preview" pages stay noindex.
 */
export function generateStaticParams() {
  return getMenuCategoriesWithPages().map((c) => ({ category: c.slug }));
}

/** Category + its written content, or undefined if it has no page. */
function loadCategory(slug: string) {
  const category = getMenuCategory(slug);
  if (!category || category.contentStatus === "placeholder") return undefined;
  const content = getCategoryPageContent(category.id);
  if (!content) return undefined;
  return { category, content };
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const data = loadCategory(slug);
  if (!data) return {};
  const { category, content } = data;
  const path = menuCategoryPath(category.slug);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: path },
    openGraph: { title: content.metaTitle, description: content.metaDescription, url: path },
    robots: category.contentStatus === "published" ? undefined : { index: false, follow: true },
  };
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const data = loadCategory(slug);
  if (!data) notFound();
  const { category, content } = data;

  const offerings = getOfferingsForCategory(category.id);
  const rows = offerings.map(toMenuTableItem);
  const isPreview = category.contentStatus !== "published";

  // Most recent verified check date shown in the price notice.
  const lastChecked =
    rows
      .filter((r) => r.status === "verified" && r.lastChecked)
      .map((r) => r.lastChecked as string)
      .sort()
      .at(-1) ?? null;
  const location = rows.find((r) => r.location)?.location ?? getReferenceMarketLabel();

  // Popular section: only items with a real, owner-provided image (max 5).
  const popular = offerings
    .map((o) => ({ offering: o, image: o.image ?? getMenuProduct(o.productId)?.image ?? null }))
    .filter((p) => p.image !== null)
    .slice(0, 5);

  // Category ids are also their slugs.
  const related = content.related.flatMap((r) => {
    const rel = getMenuCategory(r.categoryId);
    return rel ? [{ text: r.text, category: rel }] : [];
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
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

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[2.5rem]">
            {content.h1}
          </h1>
          {content.intro.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-lg leading-8 text-muted">
              {paragraph}
            </p>
          ))}
        </header>

        {isPreview && (
          <div
            role="note"
            className="mt-6 max-w-3xl rounded-lg border border-line bg-warning-bg px-4 py-3 text-sm leading-6 text-warning-text"
          >
            <strong className="font-semibold">Preview:</strong> Prices and calories on this
            page are still being checked. Items marked “Not verified yet” have not been
            checked against an official source.
          </div>
        )}

        <section aria-labelledby="prices" className="mt-10">
          <h2 id="prices" className="sr-only">
            Prices and calories
          </h2>
          <div className="space-y-4">
            <PriceNotice lastChecked={lastChecked} location={location} />
            <MenuTable caption={content.tableCaption} items={rows} />
          </div>
        </section>

        {popular.length > 0 && (
          <section aria-labelledby="popular" className="mt-14">
            <SectionHeading
              id="popular"
              title={`Popular ${category.name}`}
              intro="Photos are provided by the site owner for illustration and are not official Olive Garden photos. Dishes may look different at your restaurant."
            />
            <ul
              className={`mt-8 grid gap-6 sm:grid-cols-2 ${popular.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
            >
              {popular.map(({ offering, image }) => (
                <li key={offering.id} className="overflow-hidden rounded-lg border border-line bg-white">
                  {image && (
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-3"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-xl font-bold text-ink">{offering.displayName}</h3>
                    {offering.description && (
                      <p className="mt-2 leading-7 text-muted">{offering.description}</p>
                    )}
                    {image?.credit && <p className="mt-2 text-xs text-muted">Photo: {image.credit}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section aria-labelledby="nutrition" className="mt-14 max-w-3xl">
          <SectionHeading id="nutrition" title="Calories and Nutrition" />
          <ul className="mt-6 list-disc space-y-3 pl-5 leading-7 text-muted marker:text-brand-dark">
            {content.nutritionNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </section>

        {content.faqs.length > 0 && (
          <section aria-labelledby="faqs" className="mt-14 max-w-3xl">
            <SectionHeading id="faqs" title="Frequently Asked Questions" />
            <div className="mt-6 divide-y divide-line rounded-lg border border-line">
              {content.faqs.map((faq) => (
                <details key={faq.question} className="group px-5 py-4">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand-dark">
                    <h3>{faq.question}</h3>
                    <span aria-hidden="true" className="text-xl text-brand-dark transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 leading-7 text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
            <JsonLd data={faqJsonLd} />
          </section>
        )}

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-14 border-t border-line pt-10">
            <SectionHeading id="related" title="Related Menu Categories" />
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {related.map(({ text, category: rel }) => (
                <li key={rel.id} className="rounded-lg border border-line bg-white p-5">
                  <Link
                    href={menuCategoryHref(rel)}
                    className="font-display text-lg font-bold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
                  >
                    {rel.name}
                  </Link>
                  <p className="mt-2 leading-7 text-muted">{text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              <Link
                href={menuPath}
                className="font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
              >
                See all menu categories <span aria-hidden="true">&rarr;</span>
              </Link>
            </p>
          </section>
        )}
      </Container>
    </div>
  );
}
