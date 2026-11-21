import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { getOffering } from "@/lib/content";
import { formatNumber, formatPrice } from "@/lib/format";
import { productDetailHref, type ProductPageData } from "@/lib/product-pages";
import Icon from "./icons";

/**
 * "What's included" for bundles and combinations (owner decision 2026-11-19).
 * Each part comes from the bundle's official description; where the same item
 * is sold on its own, its official price and calories are shown for reference
 * and it links to its own page. The bundle total stays the official menu value
 * (hero); parts are never added up into a new "total" here.
 */
export default function ComponentsSection({ data }: { data: ProductPageData }) {
  const { page } = data;
  const parts = page.components ?? [];
  if (parts.length === 0) return null;
  return (
    <section aria-labelledby="included" className="mt-14">
      <SectionHeading
        id="included"
        title="What’s Included"
        intro="Every part listed by Olive Garden for this order. Where the same item is sold on its own, its official price and calories are shown for reference."
      />
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {parts.map((part) => {
          const o = part.offeringId ? getOffering(part.offeringId) : undefined;
          const href = o ? productDetailHref(o.productId) : null;
          return (
            <li key={part.label} className="flex flex-col gap-2 rounded-2xl border border-card-border bg-white p-4 shadow-[0_6px_18px_-14px_rgba(40,55,15,0.5)]">
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand-darker">
                  <Icon name="plate" className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-display text-lg leading-6 font-bold text-hero-deep">{part.label}</p>
                  <p className="text-sm font-semibold text-brand-dark">{part.quantity}</p>
                </div>
              </div>
              {part.note && <p className="text-sm leading-6 text-ink">{part.note}</p>}
              {o && (
                <p className="text-xs leading-5 text-muted">
                  Sold on its own as {o.displayName}
                  {o.servingSize ? ` (${o.servingSize})` : ""}
                  {o.prices[0] ? `: ${formatPrice(o.prices[0].amount)}` : ""}
                  {o.calories !== null ? `, ${formatNumber(o.calories)}${o.caloriesMax ? `–${formatNumber(o.caloriesMax)}` : ""} Cal` : ""}.
                </p>
              )}
              {href && (
                <Link
                  href={href}
                  className="mt-auto inline-flex min-h-11 items-center gap-1 text-sm font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
                >
                  View details <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs leading-5 text-muted">
        The calorie total at the top of this page is Olive Garden’s own value for the whole order. Reference values of single items are
        for their own serving sizes, which can differ from the portions inside this order.
      </p>
    </section>
  );
}
