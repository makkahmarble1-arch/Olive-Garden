import { formatNumber, formatPrice } from "@/lib/format";
import type { ProductPageData } from "@/lib/product-pages";
import type { MenuOffering } from "@/lib/types";
import Icon, { type IconName } from "./icons";

type Fact = { icon: IconName; label: string; value: string; note: string; tone: "olive" | "amber" | "lime" | "cream" };

const TONES: Record<Fact["tone"], string> = {
  olive: "bg-brand-dark text-white",
  amber: "bg-kcal-bg text-kcal-text",
  lime: "bg-hero-highlight text-hero-deep",
  cream: "bg-brand-tint text-brand-darker",
};

/**
 * Compact "at a glance" cards under the hero. Only verified values; a fact
 * without data is simply left out. Values come from the shared offerings.
 */
export default function QuickFacts({ data }: { data: ProductPageData }) {
  const { page, primary, category, price, calories, sizes } = data;
  // Single-version pages whose calories depend on a choice (kids pasta, combinations...) show the official range.
  const calText = !page.versions?.length && primary.caloriesMax ? `${formatNumber(calories)}–${formatNumber(primary.caloriesMax)}` : formatNumber(calories);
  const sauces = page.includes;
  const sauceCalories = sauces.map((s) => s.calories);
  const facts: Fact[] = [
    { icon: "tag", label: "Price", value: formatPrice(price), note: page.priceNote ?? `One ${page.unitLabel ?? "order"}, online pickup`, tone: "olive" },
    { icon: "flame", label: "Calories", value: `${calText} Cal`, note: primary.caloriesBasis ?? "As served", tone: "amber" },
  ];
  if (sauces.length > 0) {
    facts.push({
      icon: "cup",
      label: sauces.length > 1 ? "Dipping sauces" : "Dipping sauce",
      value: sauces.map((x) => x.label.replace(/ sauce$/i, "")).join(" + "),
      note: sauceCalories.every((c) => c !== null)
        ? `Included, +${sauceCalories.map((c) => formatNumber(c as number)).join(" / +")} Cal`
        : "Included",
      tone: "lime",
    });
  }
  if (primary.servingSize) facts.push({ icon: "plate", label: "Serving", value: primary.servingSize, note: "As listed on the menu", tone: "cream" });
  // Protein from the official nutrition row; without it, the category card is shown instead.
  const protein = data.nutrition?.row.values.protein;
  if (typeof protein === "number") {
    facts.push({ icon: "spark", label: "Protein", value: `${formatNumber(protein)} g`, note: `Per ${page.unitLabel ?? "order"} (official)`, tone: "olive" });
  } else {
    facts.push({ icon: "folder", label: "Category", value: category.name, note: "Menu section", tone: "cream" });
  }
  // Other sizes of the same dish. "Per tray/pan" only for group sizes; lunch and
  // lighter portions are single plates (2026-11-18 review fix).
  const SIZE_LABEL: Partial<Record<MenuOffering["portionType"], [string, string]>> = {
    catering: ["Catering size", "per tray"],
    "family-style": ["Family size", "per pan"],
    lunch: ["Lunch size", "weekday lunch"],
    "lighter-portion": ["Lighter portion", "per plate"],
  };
  for (const size of sizes) {
    if (size.servingSize) {
      const [label, perUnit] = SIZE_LABEL[size.portionType] ?? ["Other size", ""];
      // Soups by the gallon and bundles are not pans or trays: show the price alone.
      const per = /gallon/i.test(size.servingSize) || /bundle|combination/i.test(size.officialName ?? "") ? "" : perUnit;
      const price = size.prices[0] ? formatPrice(size.prices[0].amount) : "";
      facts.push({ icon: "users", label, value: size.servingSize.replace(/(\d)-(\d)/g, "$1–$2"), note: price && per ? (per.startsWith("per ") ? `${price} ${per}` : `${price}, ${per}`) : price, tone: "lime" });
    }
  }

  return (
    <section aria-labelledby="quick-facts" className="mt-8">
      <h2 id="quick-facts" className="sr-only">
        Quick facts
      </h2>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {facts.map((fact) => (
          <li key={`${fact.label}-${fact.value}`} className="flex flex-col gap-2 rounded-2xl border border-card-border bg-white p-3.5 shadow-[0_6px_18px_-14px_rgba(40,55,15,0.5)] sm:p-4">
            <span className={`grid size-9 place-items-center rounded-xl ${TONES[fact.tone]}`}>
              <Icon name={fact.icon} className="size-5" />
            </span>
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">{fact.label}</span>
            <span className="font-display text-lg leading-6 font-bold break-words text-hero-deep">{fact.value}</span>
            {fact.note && <span className="text-xs leading-5 text-muted first-letter:uppercase">{fact.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}
