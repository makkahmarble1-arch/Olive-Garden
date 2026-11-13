import Image from "next/image";
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

type MenuItemCardProps = {
  offering: MenuOffering;
  /** Marks the card for the homepage menu search (only inside the full menu). */
  searchable?: boolean;
  /** Genuine visitor rating line (stars, average, count). Default: shown. */
  showRating?: boolean;
};

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
 * One menu item (approved card design Option C, compact version from the
 * owner's UI review): photo, name, serving badge, price + calorie badge,
 * short description, size selector, availability. Server component; only
 * the size selector runs in the browser.
 */
export default function MenuItemCard({ offering, searchable = false, showRating = true }: MenuItemCardProps) {
  const values = offeringValues(offering);
  const options = offeringOptions(offering);
  const priceTag = offering.promotion?.eligible ? "Add-on" : null;
  const availability = availabilityLabel(offering);
  const badges = servingBadges(offering.servingSize);
  const regular = offering.regularPriceOfferingId ? getOffering(offering.regularPriceOfferingId) : undefined;
  const regularPrice = regular?.prices[0]?.amount;

  return (
    <li
      className="group flex"
      data-menu-item={searchable ? "" : undefined}
      data-search={searchable ? searchText(offering.displayName, offering.officialName, offering.inventoryName) : undefined}
    >
      <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-brand/60 hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-tint">
          <CardImage offering={offering} />
          {(availability || offering.isNewOfficialItem) && (
            <p className="absolute top-2 left-2 flex flex-wrap gap-1">
              {availability && (
                <span className="rounded-full bg-warning-bg px-2 py-0.5 text-[0.7rem] font-semibold text-warning-text shadow-sm">
                  {availability}
                </span>
              )}
              {offering.isNewOfficialItem && (
                <span className="rounded-full bg-brand-dark px-2 py-0.5 text-[0.7rem] font-semibold text-white shadow-sm">
                  New
                </span>
              )}
            </p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2 p-3 sm:p-4">
          <div>
            <p className="font-display text-base leading-snug font-bold text-ink sm:text-[1.05rem]">
              {offering.displayName}
            </p>
            {badges.length > 0 && (
              <p className="mt-1.5 flex flex-wrap gap-1">
                {badges.map((badge) => (
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

          {offering.description && <p className="text-sm leading-6 text-muted">{offering.description}</p>}

          {showRating && (
            <RatingSummary className="mt-auto pt-1" productId={offering.productId} itemName={offering.displayName} />
          )}
        </div>
      </div>
    </li>
  );
}
