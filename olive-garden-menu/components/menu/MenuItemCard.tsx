import Image from "next/image";
import Link from "next/link";
import type { MenuOffering } from "@/lib/types";
import { getMenuCategory, getOffering, getOfferingImage } from "@/lib/content";
import { formatPrice } from "@/lib/format";
import {
  availabilityLabel,
  formatCalorieRange,
  offeringOptions,
  offeringValues,
  searchText,
  servingBadges,
} from "@/lib/menu-display";
import PriceBlock from "./PriceBlock";
import OptionPicker from "./OptionPicker";
import RatingSummary from "@/components/rating/RatingSummary";
import { productDetailHref } from "@/lib/product-pages";

type MenuItemCardProps = {
  offering: MenuOffering;
  /** Marks the card for the homepage menu search (only inside the full menu). */
  searchable?: boolean;
  /** Genuine visitor rating line (stars, average, count). Default: shown. */
  showRating?: boolean;
};

/** Longest serving badge (characters) shown on the photo; longer ones go under the title. */
const PHOTO_BADGE_MAX = 21;

/** Food photo, or a clearly labeled placeholder with the same size. */
function CardImage({ offering }: { offering: MenuOffering }) {
  const image = getOfferingImage(offering);
  if (image) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 1152px) 270px, (min-width: 1024px) 23vw, (min-width: 768px) 31vw, (min-width: 360px) 46vw, 92vw"
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-brand-tint p-3 text-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-7 text-brand-dark/60"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M21 16l-5-5-8 8" />
      </svg>
      <span className="text-xs font-medium text-muted">Photo coming soon</span>
    </div>
  );
}

/**
 * One menu item: the premium card design (owner-approved 2026-11-14 after the
 * Family-Style Lasagna Bundle prototype; docs/DESIGN_SYSTEM.md 4.2). Cream
 * card with a thin olive border, 4:3 photo with the serving badge(s) on its
 * top-left corner, serif title, price + amber calorie pill, description, size
 * selector, and the genuine visitor rating under a thin divider. Font sizes
 * match the earlier card design. Server component; only the size selector
 * and the rating run in the browser.
 */
export default function MenuItemCard({ offering, searchable = false, showRating = true }: MenuItemCardProps) {
  const values = offeringValues(offering);
  const options = offeringOptions(offering);
  const priceTag = offering.promotion?.eligible ? "Add-on" : null;
  const availability = availabilityLabel(offering);
  // Short serving badges ("Serves 4–6") sit on the photo; longer descriptions
  // ("Two chicken breasts + side of spaghetti") go under the title so they never
  // cover the food.
  const allBadges = servingBadges(offering.servingSize);
  const badges = allBadges.filter((badge) => badge.length <= PHOTO_BADGE_MAX);
  const textBadges = allBadges.filter((badge) => badge.length > PHOTO_BADGE_MAX);
  const regular = offering.regularPriceOfferingId ? getOffering(offering.regularPriceOfferingId) : undefined;
  const regularPrice = regular?.prices[0]?.amount;
  // Detail page link only when that item's page is live (never to unfinished pages).
  const detailHref = productDetailHref(offering.productId);

  return (
    <li
      className="group flex"
      data-menu-item={searchable ? "" : undefined}
      data-search={searchable ? searchText(offering.displayName, offering.officialName, offering.inventoryName) : undefined}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg shadow-[0_1px_2px_rgba(40,55,15,0.05),0_8px_20px_-14px_rgba(40,55,15,0.35)] transition-[border-color,box-shadow] duration-200 hover:border-brand-dark/45 hover:shadow-[0_1px_2px_rgba(40,55,15,0.06),0_12px_24px_-14px_rgba(40,55,15,0.45)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-tint">
          {detailHref ? (
            // Same destination as the name link: hidden from keyboard and screen readers to avoid a duplicate stop.
            <Link href={detailHref} tabIndex={-1} aria-hidden="true" className="block h-full w-full">
              <CardImage offering={offering} />
            </Link>
          ) : (
            <CardImage offering={offering} />
          )}
          {(badges.length > 0 || availability || offering.isNewOfficialItem) && (
            <p className="absolute top-2 left-2 flex max-w-[calc(100%-1rem)] flex-wrap gap-1">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-md bg-brand-dark/95 px-2 py-0.5 text-[0.7rem] leading-5 font-medium text-white shadow-sm"
                >
                  {badge}
                </span>
              ))}
              {availability && (
                <span className="rounded-md bg-warning-bg px-2 py-0.5 text-[0.7rem] leading-5 font-semibold text-warning-text shadow-sm">
                  {availability}
                </span>
              )}
              {offering.isNewOfficialItem && (
                <span className="rounded-md bg-brand-dark px-2 py-0.5 text-[0.7rem] leading-5 font-semibold text-white shadow-sm">
                  New
                </span>
              )}
            </p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 sm:gap-2.5 sm:p-4">
          <div>
            <p className="font-display text-base leading-snug font-bold text-hero-deep sm:text-[1.05rem]">
              {detailHref ? (
                <Link
                  href={detailHref}
                  className="underline-offset-4 hover:text-brand-dark hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  {offering.displayName}
                </Link>
              ) : (
                offering.displayName
              )}
            </p>
            {textBadges.length > 0 && (
              <p className="mt-1.5 flex flex-wrap gap-1">
                {textBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md bg-brand-tint px-1.5 py-0.5 text-[0.7rem] leading-4 font-medium text-brand-darker"
                  >
                    {badge}
                  </span>
                ))}
              </p>
            )}
          </div>

          {options.length > 1 ? (
            <OptionPicker itemName={offering.displayName} priceTag={priceTag} options={options} />
          ) : (
            <PriceBlock values={options[0] ?? values} priceTag={priceTag} />
          )}

          {offering.calorieExtras.map((extra) => (
            <p key={extra.label} className="text-xs leading-5 text-muted">
              {extra.label}: <span className="font-semibold text-ink">{formatCalorieRange(extra.calories, extra.caloriesMax)} Cal</span>{" "}
              (calculated: {extra.formula})
            </p>
          ))}

          {regular && regularPrice !== undefined && (
            <p className="text-xs leading-5 text-muted">
              Regular {regular.displayName}: {formatPrice(regularPrice)} ({getMenuCategory(regular.categoryId)?.name})
            </p>
          )}

          {offering.description && <p className="text-sm leading-[1.6] text-card-text">{offering.description}</p>}

          {detailHref && (
            <Link
              href={detailHref}
              className="inline-flex min-h-11 items-center gap-1 self-start text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark -my-2"
            >
              View details<span className="sr-only">: {offering.displayName}</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}

          {showRating && (
            <div className="og-rating-box mt-auto border-t border-card-border pt-2.5">
              <RatingSummary productId={offering.productId} itemName={offering.displayName} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
