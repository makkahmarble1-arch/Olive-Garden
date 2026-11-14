import type { CategoryPageContent, CustomizationOption, FaqItem, MenuOffering, MenuProduct } from "./types";

/**
 * Build-time checks for category page content (docs/CATEGORY_CONTENT_STANDARDS.md).
 * Runs on every dev/build through lib/content.ts; a failure stops the build.
 * Never weaken a rule to make content pass.
 */

/** Section ids used by the layout itself. */
const RESERVED_IDS = new Set(["prices", "popular", "nutrition", "faqs", "sources", "related", "main-content"]);
/** The homepage owns this phrase (research/seo/KEYWORD_CANNIBALIZATION.md). */
const HOMEPAGE_PHRASE = "olive garden menu with prices";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function validateCategoryPages(input: {
  pages: CategoryPageContent[];
  offerings: MenuOffering[];
  products: MenuProduct[];
  homepageFaqs: FaqItem[];
  /** Create Your Own Pasta build options (for option tables and example builds). */
  pastaOptions: CustomizationOption[];
}): string[] {
  const { pages, offerings, products, homepageFaqs, pastaOptions } = input;
  const optionById = new Map(pastaOptions.map((o) => [o.id, o]));
  const issues: string[] = [];
  const offeringById = new Map(offerings.map((o) => [o.id, o]));
  const productById = new Map(products.map((p) => [p.id, p]));
  const seen = { keyword: new Map<string, string>(), title: new Map<string, string>(), h1: new Map<string, string>(), faq: new Map<string, string>(), menuTitle: new Map<string, string>() };
  for (const faq of homepageFaqs) seen.faq.set(norm(faq.question), "homepage");

  const unique = (kind: keyof typeof seen, value: string, page: string, label: string) => {
    const key = norm(value);
    const other = seen[kind].get(key);
    if (other) issues.push(`${page}: ${label} "${value}" is already used by ${other}.`);
    else seen[kind].set(key, page);
  };

  for (const page of pages) {
    const where = `category page "${page.categoryId}"`;
    if (!page.primaryKeyword.trim()) issues.push(`${where}: primaryKeyword is required.`);
    unique("keyword", page.primaryKeyword, where, "primary keyword");
    unique("title", page.metaTitle, where, "meta title");
    unique("h1", page.h1, where, "H1");
    // Public article title used by "Related Menus" (owner standard 2026-11-13).
    if (!/^Olive Garden \S/.test(page.menuTitle)) issues.push(`${where}: menuTitle must start with "Olive Garden".`);
    if (/\b20\d\d\b/.test(page.menuTitle)) issues.push(`${where}: menuTitle must not contain a year.`);
    unique("menuTitle", page.menuTitle, where, "menu title");
    // Short public Sources section: an extra source must come from the page's full source record.
    if (page.extraSource && !page.sources.some((src) => src.url === page.extraSource?.url)) {
      issues.push(`${where}: extraSource must also be listed in sources.`);
    }
    for (const r of page.related) {
      if (r.categoryId === page.categoryId) issues.push(`${where}: related must not link the page to itself.`);
    }
    for (const text of [page.metaTitle, page.h1]) {
      if (norm(text).includes(HOMEPAGE_PHRASE)) issues.push(`${where}: "${text}" uses the homepage phrase "Olive Garden Menu with Prices".`);
    }
    if (page.metaDescription.length < 70 || page.metaDescription.length > 165) {
      issues.push(`${where}: meta description should be about 70-165 characters (now ${page.metaDescription.length}).`);
    }
    for (const faq of page.faqs) unique("faq", faq.question, where, "FAQ question");

    // Borrowed table rows: only for a category without its own offerings.
    const tableIds = page.tableOfferingIds ?? [];
    if (page.tableOfferingIds) {
      if (offerings.some((o) => o.categoryId === page.categoryId)) {
        issues.push(`${where}: tableOfferingIds is only allowed when the category has no offerings of its own.`);
      }
      if (tableIds.length === 0) issues.push(`${where}: tableOfferingIds must not be empty.`);
      for (const id of tableIds) if (!offeringById.has(id)) issues.push(`${where}: table offering "${id}" does not exist.`);
    }

    // Photo cards: 3-5 items of this category, each with a real image.
    // A page whose table is built from tableOfferingIds may show all of those
    // rows instead when there are fewer than 3 (it has nothing else to show).
    if (page.featuredOfferingIds) {
      const n = page.featuredOfferingIds.length;
      const borrowedAll = tableIds.length > 0 && tableIds.length < 3 && n === tableIds.length;
      if (n !== 0 && (n < 3 || n > 5) && !borrowedAll) {
        issues.push(`${where}: featuredOfferingIds needs 3-5 items, or [] for none (now ${n}).`);
      }
      for (const id of page.featuredOfferingIds) {
        const o = offeringById.get(id);
        if (!o) issues.push(`${where}: featured offering "${id}" does not exist.`);
        else if (o.categoryId !== page.categoryId && !tableIds.includes(id)) issues.push(`${where}: featured offering "${id}" is not in this category.`);
        else if (!(o.image ?? productById.get(o.productId)?.image)) issues.push(`${where}: featured offering "${id}" has no image.`);
      }
    }

    // Rows without ratings (merchandise): must be table rows and never photo cards.
    for (const id of page.noRatingOfferingIds ?? []) {
      const o = offeringById.get(id);
      if (!o || (o.categoryId !== page.categoryId && !tableIds.includes(id))) issues.push(`${where}: noRatingOfferingIds "${id}" is not a row of this page's table.`);
      if (page.featuredOfferingIds?.includes(id)) issues.push(`${where}: "${id}" has no rating, so it cannot be a photo card.`);
    }

    // Sections and comparison tables.
    const sectionIds = new Set<string>();
    const comparisonIds = new Set((page.comparisons ?? []).map((c) => c.id));
    const optionTableIds = new Set((page.optionTables ?? []).map((t) => t.id));
    const buildIds = new Set((page.pastaBuilds ?? []).map((b) => b.id));
    const placed = new Set<string>();
    const placedOptionTables = new Set<string>();
    const placedBuilds = new Set<string>();
    const placedPlans = new Set<string>();
    for (const section of page.sections ?? []) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(section.id)) issues.push(`${where}: section id "${section.id}" must be lowercase-hyphenated.`);
      if (RESERVED_IDS.has(section.id)) issues.push(`${where}: section id "${section.id}" is reserved by the layout.`);
      if (sectionIds.has(section.id)) issues.push(`${where}: duplicate section id "${section.id}".`);
      sectionIds.add(section.id);
      for (const block of section.blocks) {
        if (block.type === "servingPlan") {
          if (!(page.servingPlans ?? []).some((p) => p.id === block.id)) issues.push(`${where}: section "${section.id}" places unknown serving plan "${block.id}".`);
          placedPlans.add(block.id);
        }
        if (block.type === "gallery") {
          if (block.images.length < 2) issues.push(`${where}: gallery in "${section.id}" needs at least 2 images.`);
          for (const img of block.images) {
            if (!img.src.startsWith("/images/")) issues.push(`${where}: gallery image "${img.src}" must be under /images/.`);
            if (!img.alt.trim() || !img.caption.trim()) issues.push(`${where}: gallery image "${img.src}" needs alt text and a caption.`);
          }
        }
        if (block.type === "optionTable") {
          if (!optionTableIds.has(block.id)) issues.push(`${where}: section "${section.id}" places unknown option table "${block.id}".`);
          placedOptionTables.add(block.id);
        }
        if (block.type === "pastaBuilds") {
          if (!buildIds.has(block.id)) issues.push(`${where}: section "${section.id}" places unknown pasta builds "${block.id}".`);
          placedBuilds.add(block.id);
        }
        if (block.type !== "comparison") continue;
        if (!comparisonIds.has(block.id)) issues.push(`${where}: section "${section.id}" places unknown comparison "${block.id}".`);
        placed.add(block.id);
      }
    }
    for (const spec of page.comparisons ?? []) {
      if (!placed.has(spec.id)) issues.push(`${where}: comparison "${spec.id}" is never placed in a section.`);
      if (spec.rows.length < 2) issues.push(`${where}: comparison "${spec.id}" needs at least 2 rows.`);
      for (const row of spec.rows) {
        const o = offeringById.get(row.offeringId);
        if (!o) {
          issues.push(`${where}: comparison "${spec.id}" uses unknown offering "${row.offeringId}".`);
          continue;
        }
        if (row.option && !o.options.some((opt) => opt.label === row.option)) {
          issues.push(`${where}: comparison "${spec.id}": "${row.offeringId}" has no option "${row.option}".`);
        }
        for (const [key, ref] of Object.entries(row.refs ?? {})) {
          const r = offeringById.get(ref.offeringId);
          if (key === "main") issues.push(`${where}: comparison "${spec.id}": ref key "main" is reserved for the row's own offering.`);
          if (!r) issues.push(`${where}: comparison "${spec.id}" ref "${key}" uses unknown offering "${ref.offeringId}".`);
          else if (ref.option && !r.options.some((opt) => opt.label === ref.option)) {
            issues.push(`${where}: comparison "${spec.id}": ref "${ref.offeringId}" has no option "${ref.option}".`);
          }
        }
      }
      // Every ref key used by a column must exist on at least one row (catches typos).
      const refKeys = new Set(spec.rows.flatMap((r) => Object.keys(r.refs ?? {})));
      for (const col of spec.columns) {
        const keys =
          col.kind === "refDifference" ? [col.ref, col.baseRef] : col.kind === "price" || col.kind === "calories" ? [col.ref] : [];
        for (const key of keys) {
          if (key && key !== "main" && !refKeys.has(key)) issues.push(`${where}: comparison "${spec.id}" uses ref "${key}", but no row has it.`);
        }
      }
      for (const col of spec.columns) {
        if (col.kind === "pricePerServing" && col.use !== "min" && spec.rows.some((r) => !r.servings || r.servings <= 0)) {
          issues.push(`${where}: comparison "${spec.id}" uses price per serving, so every row needs official "servings".`);
        }
        if (col.kind === "pricePerServing" && col.use === "min" && !spec.rows.some((r) => r.servingsMin)) {
          issues.push(`${where}: comparison "${spec.id}" uses the lower serving number, but no row has "servingsMin".`);
        }
        if ((col.kind === "priceDifference" || col.kind === "caloriesDifference") && !spec.rows[col.baseRow]) {
          issues.push(`${where}: comparison "${spec.id}": baseRow ${col.baseRow} does not exist.`);
        }
      }
    }
    // Create Your Own Pasta option tables and example builds (shared option data).
    const findOption = (id: string, ctx: string) => {
      const o = optionById.get(id);
      if (!o) issues.push(`${where}: ${ctx} uses unknown option "${id}".`);
      return o;
    };
    for (const table of page.optionTables ?? []) {
      const ctx = `option table "${table.id}"`;
      if (!placedOptionTables.has(table.id)) issues.push(`${where}: ${ctx} is never placed in a section.`);
      if (table.rows.length < 2) issues.push(`${where}: ${ctx} needs at least 2 rows.`);
      for (const row of table.rows) findOption(row.optionId, ctx);
      for (const col of table.columns) {
        if (col.kind !== "caloriesPlus") continue;
        for (const add of col.add) {
          const o = findOption(add.optionId, ctx);
          if (o && o.calories === null) issues.push(`${where}: ${ctx} adds "${add.optionId}", which has no calories.`);
        }
      }
    }
    for (const spec of page.pastaBuilds ?? []) {
      const ctx = `pasta builds "${spec.id}"`;
      if (!placedBuilds.has(spec.id)) issues.push(`${where}: ${ctx} is never placed in a section.`);
      if (spec.builds.length < 2) issues.push(`${where}: ${ctx} needs at least 2 builds.`);
      for (const b of spec.builds) {
        const expect: [string | undefined, CustomizationOption["group"]][] = [
          [b.pasta, "pasta"],
          [b.sauce, "sauce"],
          ...(b.toppings ?? []).map((t): [string, CustomizationOption["group"]] => [t, "topping"]),
          [b.firstCourse, "first-course"],
        ];
        for (const [id, group] of expect) {
          if (!id) continue;
          const o = findOption(id, ctx);
          if (o && o.group !== group) issues.push(`${where}: ${ctx}: "${id}" is not a ${group} option.`);
          if (o && o.calories === null) issues.push(`${where}: ${ctx}: "${id}" has no calories, so totals cannot be calculated.`);
        }
        if (b.breadsticks !== undefined && (b.breadsticks < 0 || b.breadsticks > 2 || !b.firstCourse)) {
          issues.push(`${where}: ${ctx}: "${b.label}" breadsticks must be 0-2 and need a firstCourse.`);
        }
      }
    }

    // Headcount plans: placed, real offerings/options, positive numbers.
    for (const plan of page.servingPlans ?? []) {
      const ctx = `serving plan "${plan.id}"`;
      if (!placedPlans.has(plan.id)) issues.push(`${where}: ${ctx} is never placed in a section.`);
      if (!(plan.guests > 0)) issues.push(`${where}: ${ctx} needs a positive guest count.`);
      for (const p of plan.plans) {
        const o = offeringById.get(p.offeringId);
        if (!o) issues.push(`${where}: ${ctx} uses unknown offering "${p.offeringId}".`);
        else if (p.option && !o.options.some((opt) => opt.label === p.option)) issues.push(`${where}: ${ctx}: "${p.offeringId}" has no option "${p.option}".`);
        if (!(p.servesPerUnit > 0)) issues.push(`${where}: ${ctx}: servesPerUnit must be positive.`);
      }
    }

    if (page.contentReviewedAt && !/^\d{4}-\d{2}-\d{2}$/.test(page.contentReviewedAt)) {
      issues.push(`${where}: contentReviewedAt must be an ISO date (YYYY-MM-DD).`);
    }
  }
  return issues;
}
