import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { getOfferingImage } from "@/lib/content";
import { formatNumber, formatPrice } from "@/lib/format";
import type { ProductPageData } from "@/lib/product-pages";

/**
 * "What to pair with" (docs/product-pages/PRODUCT_PAGE_DESIGN.md §8): editorial
 * suggestions, clearly labeled as ours (not an official Olive Garden combo),
 * with the shared photo, price and calories. Lazy-loaded images.
 */
export default function PairingSection({ data }: { data: ProductPageData }) {
  const { primary, pairings } = data;
  if (pairings.length === 0) return null;

  return (
    <section aria-labelledby="pairings" className="mt-14">
      <SectionHeading id="pairings" title={`What to Pair with ${primary.displayName}`} />
      <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-hero-highlight/50 px-3 py-1 text-xs font-semibold text-hero-deep">
        Editor’s suggestions, not an official Olive Garden meal combo
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pairings.map(({ offering, kind, reason, href, hrefLabel }) => {
          const image = getOfferingImage(offering);
          return (
            <li key={offering.id} className="flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card-bg shadow-[0_8px_20px_-14px_rgba(40,55,15,0.35)]">
              <div className="relative aspect-[4/3] bg-brand-tint">
                {image && (
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(min-width: 1024px) 270px, (min-width: 640px) 46vw, 92vw"
                    className="h-full w-full object-cover"
                  />
                )}
                <span className="absolute top-2 left-2 rounded-md bg-brand-dark/95 px-2 py-0.5 text-[0.7rem] leading-5 font-medium text-white shadow-sm">
                  {kind}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h3 className="font-display text-base leading-snug font-bold text-hero-deep">{offering.displayName}</h3>
                <p className="flex flex-wrap items-center gap-2">
                  {offering.prices[0] && (
                    <span className="text-lg font-bold text-brand-dark tabular-nums">{formatPrice(offering.prices[0].amount)}</span>
                  )}
                  {offering.calories !== null && (
                    <span className="rounded-full bg-kcal-bg px-2 py-0.5 text-xs font-semibold text-kcal-text tabular-nums">
                      {formatNumber(offering.calories)} Cal
                    </span>
                  )}
                </p>
                <p className="text-sm leading-6 text-card-text">{reason}</p>
                <Link
                  href={href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1 pt-1 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  {hrefLabel}
                  <span className="sr-only"> for {offering.displayName}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
