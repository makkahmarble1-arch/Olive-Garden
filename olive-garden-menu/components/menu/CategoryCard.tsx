import Link from "next/link";
import type { MenuCategory } from "@/lib/types";
import PlaceholderImage from "@/components/ui/PlaceholderImage";

type CategoryCardProps = {
  category: MenuCategory;
};

/**
 * Card for one menu category.
 * Published categories link to /menu/[slug]; placeholders are not links,
 * because their pages do not exist yet.
 */
export default function CategoryCard({ category }: CategoryCardProps) {
  const isPublished = category.contentStatus === "published";

  const body = (
    <>
      <PlaceholderImage label={`${category.name} photo`} />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-display text-xl font-bold text-ink">
          {isPublished ? (
            <Link
              href={`/menu/${category.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-brand-dark"
            >
              {category.name}
            </Link>
          ) : (
            category.name
          )}
        </h3>
        <p className="text-muted">{category.summary}</p>
        <p className="mt-auto pt-2 text-sm">
          <span className="font-medium text-ink">Prices: </span>
          <span className="inline-block rounded-full bg-warning-bg px-2.5 py-0.5 font-medium text-warning-text">
            Not verified yet
          </span>
        </p>
        {!isPublished && (
          <p className="text-xs font-semibold tracking-wide text-muted uppercase">
            Placeholder &middot; Page coming soon
          </p>
        )}
      </div>
    </>
  );

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-lg border border-line bg-white ${
        isPublished ? "transition-shadow hover:shadow-md" : ""
      }`}
    >
      {body}
    </article>
  );
}
