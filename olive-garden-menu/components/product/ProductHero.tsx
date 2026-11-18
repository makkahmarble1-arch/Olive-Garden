import Image from "next/image";
import Link from "next/link";
import RatingSummary from "@/components/rating/RatingSummary";
import { getOfferingImage, menuCategoryPath } from "@/lib/content";
import { formatMonthYear, formatNumber, formatPrice } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { ProductPageData } from "@/lib/product-pages";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import Icon from "./icons";

/** Section anchors listed in the hero (only sections that exist on the page). */
export const PRODUCT_SECTIONS = [
  { id: "nutrition", label: "Nutrition" },
  { id: "allergens", label: "Ingredients & allergens" },
  { id: "serving", label: "Sizes & sauce" },
  { id: "faqs", label: "FAQs" },
] as const;

/**
 * Two-column product hero (docs/product-pages/PRODUCT_PAGE_DESIGN.md §2):
 * large food photo in a rounded cream frame on the left; H1, the shared
 * golden rating, price badge, calorie badge, summary, serving line, category
 * link and section links on the right. Stacks on phones (photo first).
 * No order or cart buttons. The photo is the only priority image of the page.
 */
export default function ProductHero({ data }: { data: ProductPageData }) {
  const { page, primary, category, price, calories, lastChecked } = data;
  // A materially misleading photo is left out on the item page (owner instruction 2026-11-18).
  const image = page.heroImageOmitted ? null : getOfferingImage(primary);

  return (
    <section
      aria-labelledby="product-title"
      className="mt-5 overflow-hidden rounded-3xl border border-card-border bg-header-cream shadow-[0_1px_2px_rgba(40,55,15,0.05),0_18px_40px_-28px_rgba(40,55,15,0.45)]"
    >
      <div className="grid gap-6 p-3.5 sm:p-6 md:grid-cols-2 md:items-center lg:gap-10 lg:p-8">
        <figure>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgba(40,55,15,0.55)] ring-1 ring-card-border">
            {!image && <PlaceholderImage label="Photo coming soon" className="h-full rounded-2xl" />}
            {image && (
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1152px) 500px, (min-width: 768px) 45vw, 92vw"
                className="h-full w-full object-cover"
              />
            )}
            <span className="absolute top-3 left-3 rounded-md bg-hero-deep/95 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
              {category.name}
            </span>
          </div>
          <figcaption className="mt-2 text-xs leading-5 text-muted">
            {image
              ? "Photo supplied by the site owner for illustration; not an official Olive Garden photo."
              : "We only show a photo when it matches the dish as served. A photo for this item is coming soon."}
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-4">
          <p>
            <Link
              href={menuCategoryPath(category.slug)}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-full bg-hero-highlight/60 px-3 text-sm font-semibold text-hero-deep hover:bg-hero-highlight focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              <Icon name="folder" className="size-4" />
              Olive Garden {category.name}
            </Link>
          </p>

          <h1 id="product-title" className="font-display text-3xl leading-tight font-bold text-hero-deep sm:text-4xl lg:text-[2.75rem]">
            {page.h1}
          </h1>

          <RatingSummary productId={page.productId} itemName={primary.displayName} align="start" />

          <div className="flex flex-wrap items-stretch gap-2.5 sm:gap-3">
            <p className="flex flex-col justify-center rounded-2xl bg-brand-dark px-3.5 py-2.5 text-white sm:px-4 shadow-sm">
              <span className="text-[0.7rem] font-semibold tracking-wide text-hero-highlight uppercase">Price</span>
              <span className="text-2xl leading-8 font-bold tabular-nums sm:text-3xl sm:leading-9">{formatPrice(price)}</span>
            </p>
            <p className="flex flex-col justify-center rounded-2xl border border-kcal-text/20 bg-kcal-bg px-3.5 py-2.5 sm:px-4 text-kcal-text">
              <span className="text-[0.7rem] font-semibold tracking-wide uppercase">Calories</span>
              <span className="inline-flex items-center gap-1.5 text-2xl leading-8 font-bold tabular-nums sm:text-3xl sm:leading-9">
                <Icon name="flame" className="size-6" />
                {formatNumber(calories)}
              </span>
            </p>
            <p className="flex min-w-[9rem] flex-1 flex-col justify-center text-xs leading-5 text-muted">
              <span>
                {`${primary.caloriesBasis ? `Calories ${primary.caloriesBasis}` : "Calories per order"}${
                  page.includes.length > 0 ? `, without ${page.includes.length > 1 ? "sauces" : "sauce"}` : ""
                }.`}
              </span>
              <span>
                Online pickup price, {siteConfig.market}. {siteConfig.locationNotice}
              </span>
            </p>
          </div>

          <p className="text-[1.0625rem] leading-8 text-ink">{page.summary}</p>

          <p className="flex items-center gap-2 text-sm font-medium text-hero-deep">
            <Icon name="plate" className="size-5 text-brand-dark" />
            {page.servingSummary}
          </p>

          <nav aria-label="On this page">
            <ul className="flex flex-wrap gap-2">
              {[...(data.versions.length > 1 ? [{ id: "versions", label: "Versions" }] : []), ...PRODUCT_SECTIONS].map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-card-border bg-white px-4 text-sm font-medium text-brand-dark hover:border-brand-dark hover:bg-brand-tint focus-visible:outline-2 focus-visible:outline-brand-dark"
                  >
                    {section.id === "serving" && page.includes.length === 0 ? "Sizes & prices" : section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-sm text-muted">
            <strong className="font-semibold text-ink">Last verified:</strong>{" "}
            <time dateTime={lastChecked}>{formatMonthYear(lastChecked)}</time>
          </p>
        </div>
      </div>
    </section>
  );
}
