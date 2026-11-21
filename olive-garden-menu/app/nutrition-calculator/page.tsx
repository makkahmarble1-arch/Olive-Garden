import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import RichText from "@/components/content/RichText";
import JsonLd from "@/components/seo/JsonLd";
import FAQSection from "@/components/category/FAQSection";
import SourceNote from "@/components/category/SourceNote";
import RelatedCategories from "@/components/category/RelatedCategories";
import Icon from "@/components/product/icons";
import NutritionCalculator from "@/components/calculator/NutritionCalculator";
import { isToolPageLive, nutritionCalculatorPage as page, toolPath } from "@/content/tools/nutrition-calculator";
import { getCalculatorData, validateCalculatorData } from "@/lib/calculator-data";
import { resolveRelatedMenus } from "@/lib/category-data";
import { getOfficialDocument } from "@/lib/nutrition-data";
import { formatMonthYear, formatNumber } from "@/lib/format";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

/**
 * /nutrition-calculator: Nutrition & Meal Price Calculator (Improvement 7).
 * Server-rendered page; only <NutritionCalculator> runs in the browser.
 * docs/tools/NUTRITION_CALCULATOR_ARCHITECTURE.md.
 */
const path = toolPath(page);

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path,
  absoluteTitle: true,
  indexable: page.status === "published",
});

export default function NutritionCalculatorPage() {
  if (!isToolPageLive(page)) notFound();

  const data = getCalculatorData();
  // Build check: fails the build instead of publishing a wrong value.
  const issues = validateCalculatorData(data);
  if (issues.length) throw new Error(`Nutrition calculator data check failed:\n- ${issues.join("\n- ")}`);

  const { stats, lastChecked } = data;
  const guideDoc = getOfficialDocument("us-nutrition-guide");
  const related = resolveRelatedMenus(page.related, { path, isPreview: page.status !== "published" });
  const url = `${siteConfig.url}${path}`;
  const modified = lastChecked && lastChecked > page.contentReviewedAt ? lastChecked : page.contentReviewedAt;
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

  const facts = [
    { icon: "plate" as const, value: formatNumber(stats.items), label: "menu items" },
    { icon: "list" as const, value: formatNumber(stats.choices), label: "portions & versions" },
    { icon: "spark" as const, value: formatNumber(stats.withNutrition), label: "with full official nutrition" },
  ];

  return (
    <div className="py-6 md:py-10">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.name }]} />

        <header className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-hero-deep via-hero-deep to-brand-dark p-5 text-white shadow-[0_18px_40px_-28px_rgba(40,55,15,0.7)] sm:p-8">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-hero-highlight uppercase ring-1 ring-white/20">
            <Icon name="spark" className="size-4" />
            Free meal planner
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-[2.75rem]">{page.h1}</h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-hero-soft sm:text-lg sm:leading-8">{page.intro}</p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-3" aria-label="What the calculator covers">
            {facts.map((f) => (
              <li key={f.label} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-hero-cta text-hero-deep" aria-hidden="true">
                  <Icon name={f.icon} className="size-5" />
                </span>
                <span className="leading-5">
                  <span className="block font-display text-2xl font-bold text-hero-highlight tabular-nums">{f.value}</span>
                  <span className="text-sm text-hero-soft">{f.label}</span>
                </span>
              </li>
            ))}
          </ul>
          {lastChecked && (
            <p className="mt-4 text-sm text-hero-soft">
              <span className="font-semibold text-white">Prices last verified:</span> <time dateTime={lastChecked}>{formatMonthYear(lastChecked)}</time>.{" "}
              {siteConfig.locationNotice}
            </p>
          )}
        </header>

        <div className="mt-8">
          <NutritionCalculator
            items={data.items}
            categories={data.categories}
            meta={{
              siteName: siteConfig.name,
              siteUrl: siteConfig.url,
              lastChecked,
              locationNotice: siteConfig.locationNotice,
              disclaimer: siteConfig.disclaimer,
              guideVersion: guideDoc.versionCode,
            }}
          />
        </div>

        <section aria-labelledby="calculator-guide" className="mt-14">
          <h2 id="calculator-guide" className="font-display text-2xl font-bold text-ink sm:text-3xl">
            How the Calculator Works
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {page.guide.map((g, i) => (
              <article
                key={g.id}
                id={g.id}
                aria-labelledby={`${g.id}-title`}
                className={`scroll-mt-[calc(var(--header-h)+1rem)] rounded-3xl border p-5 sm:p-6 ${
                  g.icon === "alert" ? "border-allergen-border bg-allergen-bg" : "border-card-border bg-header-cream"
                } ${i === page.guide.length - 1 && page.guide.length % 2 === 1 ? "md:col-span-2" : ""}`}
              >
                <h3 id={`${g.id}-title`} className="flex items-center gap-2 font-display text-xl font-bold text-hero-deep">
                  <span
                    className={`grid size-9 shrink-0 place-items-center rounded-xl ${g.icon === "alert" ? "bg-white text-allergen-text" : "bg-brand-dark text-white"}`}
                    aria-hidden="true"
                  >
                    <Icon name={g.icon} className="size-5" />
                  </span>
                  {g.heading}
                </h3>
                <div className="mt-3 space-y-3 leading-7 text-ink">
                  {g.paragraphs.map((p, j) => (
                    <p key={j}>
                      <RichText value={p} />
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <FAQSection faqs={page.faqs} />

        <SourceNote
          officialSource={{ label: guideDoc.title, url: guideDoc.url }}
          lastChecked={lastChecked}
          summary={`Prices are the online pickup prices we verified; nutrition comes from Olive Garden’s official U.S. nutrition information (${guideDoc.versionCode ?? "current version"}) and online menu. ${siteConfig.locationNotice} Values marked “Calc.” are our calculations from official values.`}
        />

        <RelatedCategories items={related} />
        <JsonLd data={webPageJsonLd} />
      </Container>
    </div>
  );
}
