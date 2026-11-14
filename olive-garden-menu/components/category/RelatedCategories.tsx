import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import { menuPath } from "@/lib/content";

export type RelatedMenu = { title: string; href: string; text: string };

/**
 * "Related Menus" (owner standard 2026-11-13): cards with the linked page's
 * real article title and a short reason to visit, plus a link to the full
 * menu. Only live pages are passed in (lib/category-data.ts
 * getRelatedMenus), so there are no links to unfinished pages or to itself.
 */
export default function RelatedCategories({ items }: { items: RelatedMenu[] }) {
  return (
    <section aria-labelledby="related" className="mt-14 border-t border-line pt-10">
      <SectionHeading id="related" title="Related Menus" />
      {items.length > 0 && (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(({ title, href, text }) => (
            <li key={href} className="rounded-lg border border-line bg-white p-5">
              <Link
                href={href}
                className="font-display text-lg font-bold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
              >
                {title}
              </Link>
              <p className="mt-2 leading-7 text-muted">{text}</p>
            </li>
          ))}
        </ul>
      )}
      <p className="mt-6">
        <Link
          href={menuPath}
          className="font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
        >
          See the full menu <span aria-hidden="true">&rarr;</span>
        </Link>
      </p>
    </section>
  );
}
