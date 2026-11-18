/**
 * Builder for menu item pages (2026-11-18). It fills the parts that must be
 * identical in form on every page, straight from the single sources of truth,
 * so numbers can never drift:
 * - official sources (item page from the offering's price record, nutrition + allergen PDFs)
 * - three standard FAQs: price (with month/year), calories (official row +
 *   included sauces, calculated total) and allergens (official row, prep marks)
 * - dietary notes: Olive Garden's own (V) label, gluten-sensitive menu listing,
 *   fryer/grill marks from the allergen guide
 * - checklist (visual review "missing" until the owner approves) and status (registry)
 * Each page still supplies its own wording (summary, about, ingredients,
 * pairings, product-specific FAQs). docs/product-pages/PRODUCT_DATA_STRUCTURE.md.
 */
import type { AllergenGuideRow, FaqItem, NutritionGuideRow, ProductPageContent, ProductVersion, RelatedMenuRef } from "@/lib/types";
import { menuOfferings } from "@/content/menu/offerings";
import { nutritionGuideRows } from "@/content/menu/nutrition/nutrition-guide";
import { allergenGuideRows } from "@/content/menu/nutrition/allergen-guide";
import { offeringAllergenMap, offeringNutritionMap } from "@/content/menu/nutrition/offering-map";
import { pageStatus, type ProductSlug } from "./registry";
import { ownerApprovals } from "./approvals";

const NUTRITION_PDF = { label: "Olive Garden Nutrition Information (PDF)", url: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf" };
const ALLERGEN_PDF = { label: "Olive Garden allergen guide (PDF)", url: "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf" };
const ALLERGEN_NAMES: Record<string, string> = {
  dairy: "dairy",
  eggs: "eggs",
  fish: "fish",
  crustacean: "crustacean shellfish",
  mollusk: "mollusk",
  "tree-nuts": "tree nuts",
  peanuts: "peanuts",
  wheat: "wheat",
  gluten: "gluten",
  soy: "soy",
  sesame: "sesame",
  sulfites: "sulfites",
};
const MEAT_WORDS = /\b(chicken|beef|sausage|meatball|shrimp|steak|sirloin|salmon|seafood|scallop|calamari|bacon|pancetta|pepperoni|meat sauce)\b/i;

const list = (items: string[]) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`);
const num = (n: number) => n.toLocaleString("en-US");
const usd = (n: number) => `$${n.toFixed(2)}`;
const monthYear = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

export type ItemPageInput = {
  slug: ProductSlug;
  primaryOfferingId: string;
  /** Default: the primary offering's product id. */
  productId?: string;
  sizeOfferingIds?: string[];
  /**
   * Officially listed versions with their own nutrition/allergen rows (Phase 4
   * version selector). The first one is the default shown in the hero.
   */
  versions?: ProductVersion[];
  /**
   * The official allergen guide does not cover this item (e.g. to-go drinks):
   * the page says so instead of showing allergen marks (offering-map status "not-covered").
   */
  allergensNotListed?: boolean;
  /** Internal reason the mapped photo is not shown (materially misleading only). */
  heroImageOmitted?: string;
  primaryKeyword: string;
  secondaryKeywords?: string[];
  metaTitle: string;
  /** Must show the current price and "<calories> calories" (build check). */
  metaDescription: string;
  /** Default: "Olive Garden <display name>". */
  h1?: string;
  /** Default: the offering's verified description. */
  summary?: string;
  servingSummary: string;
  unitLabel?: string;
  priceNote?: string;
  about: ProductPageContent["about"];
  /** Included sauces/sides (calories must equal the official "add ..." row). */
  includes?: ProductPageContent["includes"];
  extraSauceOfferingId?: string;
  servingBasis: string;
  ingredients: { name: string; detail: string }[];
  /** Item facts for the cross-contact box (short, verified). */
  allergenFacts: string[];
  /** Extra dietary rows (shown before the automatic ones). */
  dietary?: ProductPageContent["dietary"];
  pairings: ProductPageContent["pairings"];
  relatedOfferingIds: string[];
  /** Default: the primary offering + related items. */
  compareOfferingIds?: string[];
  compareHeading?: string;
  /** Product-specific FAQs, added after the three standard ones. */
  faqs: FaqItem[];
  related: RelatedMenuRef[];
  /** Phrase used in the price FAQ, e.g. "One order" / "A dinner portion". Default "One order". */
  priceSubject?: string;
  /**
   * Classic entrée served with soup or salad and two breadsticks (official
   * menu fact): adds a FAQ with the official first-course calories.
   */
  entreeFirstCourse?: boolean;
  /** Owner decision to publish with a documented, disclosed gap (see ProductPageContent.acceptedGaps). */
  acceptedGaps?: ProductPageContent["acceptedGaps"];
  /** ISO date of the owner's actual approval (only then can the registry say "published"). */
  ownerApprovedAt?: string;
};

/** Official first-course values (U.S. nutrition guide, SOUPS, SALAD & BREADSTICKS rows). */
function firstCourseFaq(name: string, calories: number): FaqItem {
  const row = (label: string) => nutritionGuideRows.find((r) => r.section === "SOUPS, SALAD & BREADSTICKS" && r.label === label)?.values.calories;
  const salad = row("Salad with Signature Italian Dressing");
  const stick = row("Breadstick with garlic topping (1 ea.)");
  const soups = ["Chicken & Gnocchi Soup", "Minestrone Soup", "Pasta Fagioli Soup", "Zuppa Toscana Soup"].map(row).filter((x): x is number => typeof x === "number");
  if (!salad || !stick || soups.length === 0) throw new Error("firstCourseFaq: official first-course rows missing");
  return {
    question: `Does ${name} come with soup or salad?`,
    answer: `Olive Garden’s online menu lists its classic entrées with soup or salad and two breadsticks. The ${num(calories)} calories are for the entrée alone: the house salad with dressing adds ${num(salad)}, a soup ${num(Math.min(...soups))} to ${num(Math.max(...soups))}, and each breadstick ${num(stick)}, according to Olive Garden’s nutrition guide.`,
  };
}

export function itemPage(input: ItemPageInput): ProductPageContent {
  // Owner visual approval lives in ./approvals.ts (empty until the owner confirms).
  input = { ...input, ownerApprovedAt: input.ownerApprovedAt ?? ownerApprovals[input.slug] };
  const o = menuOfferings.find((x) => x.id === input.primaryOfferingId);
  if (!o) throw new Error(`itemPage(${input.slug}): unknown offering ${input.primaryOfferingId}`);
  const price = o.prices[0];
  if (!price || o.calories === null) throw new Error(`itemPage(${input.slug}): needs a verified price and calories`);
  const versions = input.versions ?? [];
  const nm = offeringNutritionMap[o.id];
  const am = offeringAllergenMap[o.id];
  // Version pages read the default (first) version's own rows; other pages the offering's row.
  const row = versions.length
    ? nutritionGuideRows.find((r) => r.id === versions[0].nutritionRowId)
    : ["exact", "same-item"].includes(nm?.status) ? nutritionGuideRows.find((r) => r.id === nm?.rowId) : undefined;
  const arow = versions.length
    ? allergenGuideRows.find((r) => r.id === versions[0].allergenRowId)
    : ["exact", "same-item"].includes(am?.status) ? allergenGuideRows.find((r) => r.id === am?.rowId) : undefined;
  if (!row) throw new Error(`itemPage(${input.slug}): needs an official nutrition row (exact/same-item or the default version's row)`);
  if (!arow && !(input.allergensNotListed && am?.status === "not-covered")) {
    throw new Error(`itemPage(${input.slug}): needs an official allergen row (or allergensNotListed for items the guide does not cover)`);
  }
  const vRows = versions.map((v) => ({
    v,
    n: v.nutritionRowId ? nutritionGuideRows.find((r) => r.id === v.nutritionRowId) : undefined,
    a: v.allergenRowId ? allergenGuideRows.find((r) => r.id === v.allergenRowId) : undefined,
  }));
  if (vRows.some((x) => (x.v.allergenRowId && !x.a) || (x.v.nutritionRowId && !x.n))) throw new Error(`itemPage(${input.slug}): unknown version row`);
  const allARows: AllergenGuideRow[] = vRows.length ? vRows.flatMap((x) => (x.a ? [x.a] : [])) : arow ? [arow] : [];
  const anyFried = allARows.some((r) => r.prep.friedInSoyOil);
  const anyGrilled = allARows.some((r) => r.prep.grilled);
  const includes = input.includes ?? [];
  const addOns = nutritionGuideRows.filter((r) => r.addOnFor === row.id);
  const included = addOns.filter((a) => includes.some((i) => a.label.toLowerCase().includes(i.label.toLowerCase().replace(/ sauce$/, ""))));
  const name = o.displayName;
  // Classic entrées are counted "per entrée" (matches the hero's calorie basis).
  const unit = input.unitLabel ?? (input.entreeFirstCourse ? "entrée" : "order");
  const v = row.values;
  const g = (x: unknown) => (typeof x === "number" ? num(x) : null);

  // ---- standard FAQs (numbers straight from the data)
  const versionList = (f: (x: { v: ProductVersion; n?: NutritionGuideRow; a?: AllergenGuideRow }) => string) => list(vRows.map(f));
  const priceFaq: FaqItem = versions.length ? {
    question: `How much is ${name} at Olive Garden?`,
    answer: versions.every((v) => v.price === versions[0].price)
      ? `${input.priceSubject ?? "One order"} of ${name} was ${usd(versions[0].price)} on Olive Garden’s online menu for pickup when we checked in ${monthYear(price.checkedAt)}, for every version. Prices may vary by location across the USA.`
      : `On Olive Garden’s online menu for pickup in ${monthYear(price.checkedAt)}: ${versionList(({ v }) => `${v.label} ${usd(v.price)}`)}. Prices may vary by location across the USA.`,
  } : {
    question: `How much is ${name} at Olive Garden?`,
    answer: `${input.priceSubject ?? "One order"} of ${name} was ${usd(price.amount)} on Olive Garden’s online menu for pickup when we checked in ${monthYear(price.checkedAt)}. Prices may vary by location across the USA.`,
  };
  const macro = [g(v.totalFat) && `${g(v.totalFat)} g fat`, g(v.sodium) && `${g(v.sodium)} mg sodium`, g(v.protein) && `${g(v.protein)} g protein`].filter(Boolean) as string[];
  const withSauce = included.length
    ? ` ${list(included.map((a) => `${a.label.replace(/^add /i, "")} adds ${num(a.values.calories)}`))}, so with ${included.length > 1 ? "the sauces" : "the sauce"} it comes to ${num(o.calories + included.reduce((s, a) => s + a.values.calories, 0))} calories (our calculation).`
    : "";
  const caloriesFaq: FaqItem = versions.length ? {
    question: `How many calories are in Olive Garden ${name}?`,
    answer: `It depends on the version. Olive Garden lists ${versionList(({ v, n }) => `${v.label} at ${num(v.calories)} calories${n && typeof n.values.protein === "number" ? ` (${num(n.values.protein)} g protein)` : ""}`)}.${vRows.some((x) => !x.n) ? " The full nutrition breakdown is published only for the versions shown with a table on this page." : ""}`,
  } : {
    question: `How many calories are in Olive Garden ${name}?`,
    answer: `${unit === "order" ? "One order" : `One ${unit}`} has ${num(o.calories)} calories according to Olive Garden’s U.S. nutrition guide${macro.length ? `, with ${list(macro)}` : ""}.${withSauce}`,
  };
  const prep = arow ? ([arow.prep.friedInSoyOil && "fried in soy oil", arow.prep.grilled && "cooked on the grill"].filter(Boolean) as string[]) : [];
  const allergenFaq: FaqItem = versions.length ? {
    question: `What allergens are in Olive Garden ${name}?`,
    answer: `${versionList(({ v, a }) => (a ? `Olive Garden’s U.S. allergen guide lists ${v.label} as containing ${list(a.contains.map((x) => ALLERGEN_NAMES[x]))}` : `the guide does not list ${v.label} separately`))}. Shared kitchens mean cross-contact is possible, so tell your server about any allergy before ordering.`,
  } : !arow ? {
    question: `What allergens are in Olive Garden ${name}?`,
    answer: `Olive Garden’s U.S. allergen guide does not cover ${name}, so no official allergen information is published for it. This does not mean it is allergen-free. If you have an allergy, ask your server or contact Olive Garden before ordering.`,
  } : {
    question: `What allergens are in Olive Garden ${name}?`,
    answer: `${
      arow.contains.length
        ? `Olive Garden’s U.S. allergen guide lists ${name} as containing ${list(arow.contains.map((a) => ALLERGEN_NAMES[a]))}`
        : `Olive Garden’s U.S. allergen guide marks none of its listed allergens for ${name}`
    }${prep.length ? `, and marks it as ${list(prep)}` : ""}. Shared kitchens mean cross-contact is possible, so tell your server about any allergy before ordering.`,
  };

  // ---- dietary rows from official labels and marks
  const productOfferings = menuOfferings.filter((x) => x.productId === o.productId);
  const isV = /\(V\)/.test(o.officialName ?? "");
  const hasMeat = MEAT_WORDS.test(`${o.displayName} ${o.description ?? ""}`) || (arow?.contains ?? []).some((a) => ["fish", "crustacean", "mollusk"].includes(a));
  const dietary: ProductPageContent["dietary"] = [...(input.dietary ?? [])];
  if (isV) dietary.push({ label: "Vegetarian label", value: "Marked (V) on Olive Garden’s online menu", tone: "info" });
  else if (!hasMeat) dietary.push({ label: "Vegetarian label", value: "Not marked (V) on the online menu", tone: "info" });
  const gs = productOfferings.some((x) => x.categoryId === "gluten-sensitive") || o.categoryId === "gluten-sensitive";
  dietary.push({ label: "Gluten-sensitive menu", value: gs ? "Listed on the gluten-sensitive menu" : "Not listed", tone: gs ? "info" : "caution" });
  if (versions.length && (vRows.some((x) => !x.a) || new Set(allARows.map((r) => `${r.prep.friedInSoyOil}-${r.prep.grilled}`)).size > 1)) {
    dietary.push({
      label: "Preparation",
      value: versionList(({ v, a }) => `${v.shortLabel}: ${!a ? "not listed in the allergen guide" : a.prep.friedInSoyOil ? "fried in soy oil" : a.prep.grilled ? "grilled" : "not fried or grilled"}`),
      tone: "caution",
    });
  } else if (!arow) {
    dietary.push({ label: "Allergen guide", value: "Not listed (the guide does not cover to-go drinks)", tone: "caution" });
  } else {
    dietary.push({
      label: "Preparation",
      value: arow.prep.friedInSoyOil ? "Fried in soy oil (shared fryer)" : arow.prep.grilled ? "Grilled (shared grill)" : "Not marked as fried or grilled",
      tone: arow.prep.friedInSoyOil || arow.prep.grilled ? "caution" : "info",
    });
  }

  const itemUrl = price.sourceUrl ?? "https://www.olivegarden.com/menu";
  const crossContact = [
    ...(anyFried ? ["Olive Garden says its kitchens do not have a separate fryer, so fried foods share cooking oil."] : []),
    ...(anyGrilled ? ["Olive Garden marks grilled items because the shared grill carries a special cross-contact risk."] : []),
  ];
  if (crossContact.length === 0) crossContact.push("Olive Garden kitchens share preparation areas, so cross-contact with other foods is possible.");

  return {
    productId: input.productId ?? o.productId,
    slug: input.slug,
    status: pageStatus(input.slug),
    primaryOfferingId: o.id,
    sizeOfferingIds: input.sizeOfferingIds,
    versions: input.versions,
    heroImageOmitted: input.heroImageOmitted,
    primaryKeyword: input.primaryKeyword,
    secondaryKeywords: input.secondaryKeywords,
    searchIntent: `A diner wants the price, calories, nutrition and allergen information for Olive Garden's ${name}.`,
    metaTitle: input.metaTitle,
    metaDescription: input.metaDescription,
    h1: input.h1 ?? `Olive Garden ${name}`,
    summary: input.summary ?? o.description ?? "",
    servingSummary: input.servingSummary,
    unitLabel: input.unitLabel ?? (input.entreeFirstCourse ? "entrée" : undefined),
    priceNote: input.priceNote,
    contentReviewedAt: "2026-11-18",
    about: input.about,
    includes,
    extraSauceOfferingId: input.extraSauceOfferingId,
    nutrition: { servingBasis: input.servingBasis },
    ingredients: {
      completeness: "partial",
      items: input.ingredients,
      note: "This list only names components confirmed by Olive Garden’s menu description and official guides. Olive Garden does not publish a full recipe, so it is not a complete ingredient list.",
    },
    allergens: { facts: input.allergenFacts, crossContact },
    dietary,
    pairings: input.pairings,
    relatedOfferingIds: input.relatedOfferingIds,
    compareOfferingIds:
      input.compareOfferingIds ??
      [o.id, ...input.relatedOfferingIds].sort(
        (a, b) => (menuOfferings.find((x) => x.id === a)?.calories ?? 0) - (menuOfferings.find((x) => x.id === b)?.calories ?? 0),
      ),
    compareHeading: input.compareHeading ?? `How ${name} compares with similar dishes`,
    faqs: [priceFaq, caloriesFaq, allergenFaq, ...(input.entreeFirstCourse ? [firstCourseFaq(name, o.calories)] : []), ...input.faqs],
    sources: [{ label: `Olive Garden: ${name} (online menu)`, url: itemUrl }, NUTRITION_PDF, ALLERGEN_PDF],
    officialSource: { label: `Olive Garden: ${name}`, url: itemUrl },
    extraSource: NUTRITION_PDF,
    related: input.related,
    checklist: {
      verifiedProductInfo: "done",
      uniqueSearchIntent: "done",
      // Version pages: "done" only when every version has its own official rows.
      nutritionAndAllergens: !arow || vRows.some((x) => !x.n || !x.a) ? "partial" : "done",
      originalContent: "done",
      // Photo checked visually before the page was added (fact log).
      accurateImage: input.heroImageOmitted ? "missing" : "done",
      internalLinks: "done",
      visualReview: input.ownerApprovedAt ? "done" : "missing",
    },
    ownerApprovedAt: input.ownerApprovedAt ?? null,
    acceptedGaps: input.acceptedGaps,
  };
}
