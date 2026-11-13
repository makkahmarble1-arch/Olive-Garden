import Link from "next/link";
import type { ReactNode } from "react";
import type { MenuCategoryDef } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { getCategoryCheckDate, hasCategoryPage, menuCategoryPath } from "@/lib/content";

type MenuCategorySectionProps = {
  category: MenuCategoryDef;
  /** Number of items shown (offerings or options). */
  itemCount: number;
  itemWord?: string;
  note?: string;
  children: ReactNode;
};

/** Grid used by every homepage card list: 1 / 2 / 3 / 4 cards per row. */
export const cardGridClass =
  "grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4";

/**
 * One of the 17 menu sections on the homepage: H2 with a stable id (the
 * category slug), check date, short note, items, and a link to the
 * dedicated category page when that page exists (never a link to a 404).
 */
export default function MenuCategorySection({
  category,
  itemCount,
  itemWord = "items",
  note,
  children,
}: MenuCategorySectionProps) {
  const checked = getCategoryCheckDate(category.id);
  const headingId = `${category.slug}-heading`;

  return (
    <section
      id={category.slug}
      aria-labelledby={headingId}
      data-menu-category=""
      className="scroll-mt-16 border-t border-line pt-8 first:border-t-0 first:pt-2"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id={headingId} className="font-display text-2xl font-bold text-ink sm:text-3xl">
            {category.name}
          </h2>
          <p className="mt-1 text-sm text-muted">
            {itemCount} {itemWord}
            {checked && (
              <>
                {" "}
                &middot; Prices checked <time dateTime={checked}>{formatDate(checked)}</time>
              </>
            )}
            {" "}&middot; Orlando, FL online pickup
          </p>
        </div>
        {hasCategoryPage(category) && (
          <Link
            href={menuCategoryPath(category.slug)}
            className="inline-flex min-h-11 items-center font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
          >
            More about {category.name} <span aria-hidden="true">&nbsp;&rarr;</span>
          </Link>
        )}
      </div>
      {note && <p className="mt-3 max-w-3xl leading-7 text-muted">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}
