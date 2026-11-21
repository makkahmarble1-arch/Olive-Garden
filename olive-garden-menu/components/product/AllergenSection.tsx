import SectionHeading from "@/components/ui/SectionHeading";
import { officialLinks } from "@/content/home/homepage";
import { allergenGuideNotes } from "@/content/menu/nutrition/documents";
import { formatMonthYear } from "@/lib/format";
import { getAllergenMapping } from "@/lib/nutrition-data";
import type { ProductPageData } from "@/lib/product-pages";
import type { AllergenId } from "@/lib/types";
import Icon from "./icons";

/** Column names of the official U.S. allergen guide. */
export const ALLERGEN_LABELS: Record<AllergenId, string> = {
  dairy: "Dairy",
  eggs: "Eggs",
  fish: "Fish",
  crustacean: "Crustacean shellfish",
  mollusk: "Mollusk",
  "tree-nuts": "Tree nuts",
  peanuts: "Peanuts",
  wheat: "Wheat",
  gluten: "Gluten",
  soy: "Soy",
  sesame: "Sesame",
  sulfites: "Sulfites",
};
const ALL_ALLERGENS = Object.keys(ALLERGEN_LABELS) as AllergenId[];

function OfficialLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      rel="nofollow noopener"
      target="_blank"
      className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-allergen-text underline underline-offset-4 hover:no-underline focus-visible:outline-2 focus-visible:outline-allergen-text"
    >
      <Icon name="link" className="size-4" />
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/**
 * Ingredients, allergens and dietary labels (docs/product-pages/PRODUCT_PAGE_DESIGN.md §6).
 * - Ingredients: only confirmed components, marked "partial" (never a full recipe).
 * - Allergens: the official U.S. allergen-guide row of the primary offering
 *   (content/menu/nutrition/): "contains" chips, the guide's other columns as
 *   "not marked", and the prep marks (fried in soy oil / grilled). Every
 *   status is written in words, never shown by color alone. Without an
 *   official row the card says so and links to the guide.
 * - Dietary: official labels exactly as the menu shows them.
 */
export default function AllergenSection({ data }: { data: ProductPageData }) {
  const { page, primary, allergens: official } = data;
  const { ingredients, allergens, dietary } = page;
  const row = official?.row;
  const notMarked = row ? ALL_ALLERGENS.filter((id) => !row.contains.includes(id)) : [];

  return (
    <section aria-labelledby="allergens" className="mt-14">
      <SectionHeading id="allergens" title="Ingredients and Allergens" />

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* Allergens (first on phones: the most important card) */}
        <div className="rounded-3xl border border-allergen-border bg-allergen-bg p-5 sm:p-6 lg:order-2">
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-allergen-text">
            <span className="grid size-9 place-items-center rounded-xl bg-white text-allergen-text ring-1 ring-allergen-border">
              <Icon name="alert" />
            </span>
            Allergen information
          </h3>
          {row && official ? (
            <>
              {data.versions.length > 0 && (
                <p className="mt-3 text-xs leading-5 text-allergen-text">
                  Shown for the default version ({data.versions[0].label}). Every version’s marks are in the Versions section above.
                </p>
              )}
              <p className="mt-4 text-sm font-semibold text-allergen-text">
                {row.contains.length > 0
                  ? "Contains, per Olive Garden’s U.S. allergen guide:"
                  : "Olive Garden’s U.S. allergen guide marks none of its listed allergens for this item."}
              </p>
              {row.contains.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {row.contains.map((id) => (
                    <li
                      key={id}
                      className="inline-flex items-center gap-1.5 rounded-full border border-allergen-border bg-white px-3 py-1 text-sm font-semibold text-allergen-text"
                    >
                      <Icon name="alert" className="size-4" />
                      {ALLERGEN_LABELS[id]}
                    </li>
                  ))}
                </ul>
              )}
              {(row.prep.friedInSoyOil || row.prep.grilled) && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {row.prep.friedInSoyOil && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-kcal-bg px-3 py-1 text-sm font-semibold text-kcal-text">
                      <Icon name="flame" className="size-4" />
                      Fried in soy oil (shared fryer)
                    </li>
                  )}
                  {row.prep.grilled && (
                    <li className="inline-flex items-center gap-1.5 rounded-full bg-kcal-bg px-3 py-1 text-sm font-semibold text-kcal-text">
                      <Icon name="flame" className="size-4" />
                      Grilled (shared grill)
                    </li>
                  )}
                </ul>
              )}
              {notMarked.length > 0 && (
                <p className="mt-3 text-xs leading-5 text-ink">
                  <strong className="font-semibold">Not marked in the guide:</strong>{" "}
                  {notMarked.map((id) => ALLERGEN_LABELS[id].toLowerCase()).join(", ")}. Not marked does not mean
                  allergen-free (see the cross-contact notes below).
                </p>
              )}
              <p className="mt-2 text-xs leading-5 text-allergen-text">
                Source: U.S. Allergen Guide ({official.document.versionCode}), page {row.page}. Checked{" "}
                {official.document.receivedAt && (
                  <time dateTime={official.document.receivedAt}>{formatMonthYear(official.document.receivedAt)}</time>
                )}
                .
              </p>
            </>
          ) : (
            <p className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-allergen-border bg-white px-3 py-1 text-xs font-semibold text-allergen-text">
              <Icon name="info" className="size-4" />
              {page.allergenUnavailableNote
                ? page.allergenUnavailableNote
                : getAllergenMapping(primary.id)?.status === "not-covered"
                ? "Olive Garden’s official U.S. allergen guide does not cover this drink. This does not mean it is allergen-free; ask your server if you have an allergy."
                : "Official allergen list not verified yet"}
            </p>
          )}
          <div className="mt-3 flex flex-col">
            <OfficialLink href={officialLinks.allergenPdf}>Official allergen guide (PDF)</OfficialLink>
            <OfficialLink href={officialLinks.allergens}>Olive Garden food allergy information</OfficialLink>
          </div>
        </div>

        {/* Ingredients */}
        <div className="rounded-3xl border border-card-border bg-white p-5 sm:p-6 lg:order-1">
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-hero-deep">
            <span className="grid size-9 place-items-center rounded-xl bg-hero-highlight text-hero-deep">
              <Icon name="list" />
            </span>
            Ingredients
          </h3>
          <ul className="mt-4 space-y-3">
            {ingredients.items.map((item) => (
              <li key={item.name} className="flex gap-2.5">
                <Icon name="check" className="mt-1 size-4 text-brand-dark" />
                <span className="text-sm leading-6">
                  <strong className="font-semibold text-ink">{item.name}:</strong>{" "}
                  <span className="text-muted">{item.detail}</span>
                </span>
              </li>
            ))}
          </ul>
          {ingredients.completeness === "partial" && (
            <p className="mt-4 rounded-xl bg-brand-tint px-3 py-2 text-xs leading-5 text-ink">
              <strong className="font-semibold">Partial list.</strong> {ingredients.note}
            </p>
          )}
        </div>

        {/* Dietary */}
        <div className="rounded-3xl border border-card-border bg-header-cream p-5 sm:p-6 lg:order-3">
          <h3 className="flex items-center gap-2 font-display text-xl font-bold text-hero-deep">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-dark text-white">
              <Icon name="leaf" />
            </span>
            Dietary notes
          </h3>
          <dl className="mt-4 space-y-3">
            {dietary.map((d) => (
              <div key={d.label} className="rounded-2xl border border-card-border bg-white px-4 py-3">
                <dt className="text-xs font-semibold tracking-wide text-muted uppercase">{d.label}</dt>
                <dd className="mt-1 flex items-start gap-2 text-sm leading-6 font-medium text-ink">
                  <Icon
                    name={d.tone === "caution" ? "alert" : "info"}
                    className={`mt-0.5 size-4 ${d.tone === "caution" ? "text-kcal-text" : "text-brand-dark"}`}
                  />
                  {d.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Cross-contact: item facts + the guide's official statements (paraphrased) */}
      <div role="note" className="mt-5 rounded-2xl border border-allergen-border bg-white p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-allergen-text">
          <Icon name="alert" className="size-5" />
          Allergy safety and cross-contact
        </p>
        <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm leading-6 text-ink md:grid-cols-2">
          {[
            ...allergens.facts,
            ...allergens.crossContact,
            allergenGuideNotes.basis,
            allergenGuideNotes.crossContact,
            allergenGuideNotes.fryerGrill,
            allergenGuideNotes.gluten,
          ].map((fact) => (
            <li key={fact} className="flex gap-2">
              <Icon name="info" className="mt-1 size-4 text-allergen-text" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm leading-6 text-ink">
          <strong className="font-semibold text-allergen-text">Before you order:</strong> this page is general
          information. Recipes and suppliers can change, so check Olive Garden’s current allergen guide and tell your
          server about any food allergy before ordering {primary.displayName}.
        </p>
      </div>
    </section>
  );
}
