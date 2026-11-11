import Link from "next/link";
import type { MenuCategoryDef } from "@/lib/types";
import { hasCategoryPage, menuCategoryPath } from "@/lib/content";
import VerificationBadge from "@/components/ui/VerificationBadge";
import CategoryVisual from "./CategoryVisual";

type CategoryCardProps = {
  category: Pick<
    MenuCategoryDef,
    "slug" | "name" | "summary" | "contentStatus" | "inventoryOrder" | "image"
  >;
  /** Small label above the name, e.g. the category's group on /menu. */
  label?: string;
  /** Optional id so in-page navigation can jump to this card. */
  anchorId?: string;
};

/**
 * Card for one menu category.
 *
 * Link activation: a card links to /{slug} only when the category's page
 * exists (`contentStatus` "preview" or "published"). Until then it shows
 * "Page coming soon" and is not a link, so there are no broken links.
 */
export default function CategoryCard({ category, label, anchorId }: CategoryCardProps) {
  const isPublished = hasCategoryPage(category);

  return (
    <article
      id={anchorId}
      className={`relative flex w-full flex-col overflow-hidden rounded-lg border border-line bg-white ${
        isPublished ? "transition-shadow hover:shadow-md" : ""
      }`}
    >
      <CategoryVisual number={category.inventoryOrder} image={category.image} />

      <div className="flex flex-1 flex-col gap-2 p-5">
        {label && (
          <p className="text-xs font-semibold tracking-wide text-brand-dark uppercase">{label}</p>
        )}
        <h3 className="font-display text-xl font-bold text-ink">
          {isPublished ? (
            <Link
              href={menuCategoryPath(category.slug)}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              {category.name}
            </Link>
          ) : (
            category.name
          )}
        </h3>
        <p className="leading-7 text-muted">{category.summary}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3 text-sm">
          <p>
            <span className="font-medium text-ink">Prices: </span>
            <VerificationBadge />
          </p>
          {isPublished ? (
            <p className="font-semibold text-brand-dark">
              View menu <span aria-hidden="true">&rarr;</span>
            </p>
          ) : (
            <p className="font-medium text-muted">Page coming soon</p>
          )}
        </div>
      </div>
    </article>
  );
}
