import MenuItemCard from "@/components/menu/MenuItemCard";
import { cardGridClass } from "@/components/home/MenuCategorySection";
import type { MenuOffering } from "@/lib/types";

/**
 * 3-5 photo cards of selected items (owner decision 2: category pages show
 * the complete table plus a few images reused from the homepage). Uses the
 * same MenuItemCard as the homepage, so prices, sizes, and the golden
 * rating row are identical and shared.
 */
export default function FeaturedItems({
  id = "popular",
  title,
  offerings,
  showRating = true,
}: {
  id?: string;
  title: string;
  offerings: MenuOffering[];
  showRating?: boolean;
}) {
  if (offerings.length === 0) return null;
  // An H3 inside the price-table section (keeps the page outline to the approved H2s).
  return (
    <div aria-labelledby={id} role="group" className="mt-10">
      <h3 id={id} className="font-display text-xl font-bold text-ink sm:text-2xl">
        {title}
      </h3>
      <p className="mt-2 max-w-prose text-sm leading-6 text-muted">
        Photos are supplied by the site owner for illustration and are not official Olive Garden photos. Dishes may
        look different at your restaurant.
      </p>
      <ul className={`mt-6 ${cardGridClass}`}>
        {offerings.map((offering) => (
          <MenuItemCard key={offering.id} offering={offering} showRating={showRating} />
        ))}
      </ul>
    </div>
  );
}
