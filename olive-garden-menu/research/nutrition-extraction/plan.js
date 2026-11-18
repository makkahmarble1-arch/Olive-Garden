/* eslint-disable -- Node research script (CommonJS), not app code. */
// Writes docs/product-pages/PRODUCT_DEVELOPMENT_PLAN.md from plan.json (research helper).
const S = process.argv[2];
const ROOT = process.argv[3];
const fs = require("fs");
const plan = require(S + "/plan.json");
const NOTES = {
  "italian-grilled-chicken-sandwich": "Photo differs from the official dish (IMAGE_MANIFEST): new photo needed first.",
  "side-of-meatballs": "Photo shows four meatballs; the official side has three: new photo needed first.",
  spaghetti: "Overlaps Spaghetti with Marinara / Meat Sauce; decide one canonical page (cannibalization).",
  "chicken-parmigiana-sandwich": "Two versions (crispy fritta vs grilled chicken).",
  "chicken-alfredo": "Two versions (grilled chicken vs crispy chicken fritta); highest search interest among entrées.",
  "spaghetti-and-meatballs": "Marinara vs meat sauce versions; image: white version pending.",
  "cheese-ravioli": "Marinara vs meat sauce versions.",
  "calabrian-steak-and-shrimp-bucatini": "Three protein versions.",
  "famous-house-salad": "Coordinate with the gluten-sensitive 'without croutons' row; one page.",
  "famous-house-salad-without-croutons": "Better as a section of the house salad page than its own page.",
  breadsticks: "Per-breadstick nutrition; also sold by 6/12 and on catering.",
  "pumpkin-cookie-butter-cheesecake": "Limited time: build only if still on the menu.",
  "spicy-alfredo-fettuccine": "Limited time: build only if still on the menu.",
};
const PHASES = [
  { title: "Phase 1: Appetizers (finish the category of the approved sample)", cats: ["appetizers"], why: "Same layout as Fried Mozzarella, single-row official data, strong item searches (calamari, toasted ravioli, breadsticks)." },
  { title: "Phase 2: Classic Entrées and Alfredos (single-version dishes)", cats: ["classic-entrees", "amazing-alfredos"], filter: (p) => !p.tier.startsWith("V"), why: "Highest item-level search interest; lunch / lighter / catering versions of the same dish go into each page's sizes table, not separate pages." },
  { title: "Phase 3: Desserts", cats: ["desserts"], why: "Single rows, clear allergens, catering cake sizes shown in the sizes table." },
  { title: "Phase 4: Multi-version entrées (needs a version-aware layout first)", cats: ["classic-entrees", "lunch-menu"], filter: (p) => p.tier.startsWith("V"), why: "Each version has its own official nutrition and allergen row; the page needs a version switcher or table. Owner approval of that layout needed before Phase 4." },
  { title: "Phase 5: Lunch sandwiches and flatbreads", cats: ["lunch-menu"], filter: (p) => !p.tier.startsWith("V"), why: "Weekday-lunch items with their own rows; check photo accuracy first." },
  { title: "Phase 6: Soups, Salad and Breadsticks", cats: ["soups-salad-and-breadsticks"], why: "Only the house salad has a single product row. Individual soups are options of one product (Homemade Soups); per-soup pages would need new product records (owner decision)." },
  { title: "Phase 7: Gluten-sensitive and Kids items (extra care)", cats: ["gluten-sensitive", "kids-meal"], why: "Sensitive audiences: wording rules for 'gluten-sensitive' (never 'gluten-free') and kids portions; consider whether the category pages already answer these intents." },
  { title: "Not recommended for now: Sides and sauces", cats: ["sides-sauces-and-extras"], why: "Data-ready but low unique search intent; the Sides page answers them. Build only if search data shows demand." },
];
const used = new Set();
let md = `# Product Development Plan (individual menu item pages)

**Prepared:** 2026-11-18, after the owner approved and published the Fried
Mozzarella sample. Data basis: \`PRODUCT_ELIGIBILITY_REPORT.md\` (official
U.S. guides US_101926). **No other page has been created.** Each page still
needs gates 2, 4, 6, 7 of \`PRODUCT_CONTENT_CHECKLIST.md\`, its own fact log,
and owner approval before \`published\`.

## Rules for every page

- One page per **product** (not per offering). The home category = the
  primary offering below; other placements (lunch, lighter portions, catering,
  family-style) appear in the page's sizes table and link to their category pages.
- Use the approved Fried Mozzarella layout (\`components/product/\`), premium
  design standard, official rows only, editorial pairings labeled.
- Before each page: re-check the price on the official site (or keep the last
  verified month and say nothing more), confirm the photo matches the dish, write
  original copy, 3+ FAQs, exactly 4 Related Menus.
- Build in small batches (3-5 pages), owner review per batch.

## Summary

| Group | Products |
|---|---:|
| Published | ${plan.filter((p) => p.tier.startsWith("page")).length} (Fried Mozzarella) |
| Data-ready (single official row) | ${plan.filter((p) => p.tier.startsWith("A")).length} |
| Official rows per version (needs version-aware layout) | ${plan.filter((p) => p.tier.startsWith("V")).length} |
| Total candidates | ${plan.length} |

Not candidates: bundles, combinations, wines/beers (generic rows only),
multi-flavor drinks, catering-only items, items without verified price,
calories or photo (see the eligibility report).
`;
for (const ph of PHASES) {
  const items = plan.filter((p) => ph.cats.includes(p.home) && (!ph.filter || ph.filter(p)) && !used.has(p.id));
  items.forEach((p) => used.add(p.id));
  md += `\n## ${ph.title} (${items.length})\n\n${ph.why}\n\n| Product | Primary offering (home) | Also on | Status / note |\n|---|---|---|---|\n`;
  md += items.map((p) => `| ${p.name} (\`${p.id}\`) | \`${p.primary}\` | ${p.others.join(", ") || "—"} | ${p.tier.startsWith("page") ? "**Published** /menu/fried-mozzarella" : [p.tier.startsWith("V") ? "Version-aware layout" : "Ready", NOTES[p.id]].filter(Boolean).join(". ")} |`).join("\n") + "\n";
}
const left = plan.filter((p) => !used.has(p.id));
if (left.length) md += `\n## Other\n\n${left.map((p) => `- ${p.name} (\`${p.id}\`), home ${p.home}`).join("\n")}\n`;
md += `
## Open owner decisions before or during the phases

1. Side of Crispy Shrimp Fritta calories (200 vs guide 220): serving size not confirmable (see NUTRITION_DATA_REPORT). Not a page candidate now.
2. Version-aware layout for Phase 4 (Chicken Alfredo, Spaghetti & Meatballs, Cheese Ravioli, Calabrian Bucatini, lunch Spaghetti, Chicken Parmigiana Sandwich).
3. Replacement photos: Italian Grilled Chicken Sandwich, Side of Meatballs.
4. Whether to create per-soup products (Phase 6) and sides pages (not recommended).
5. Batch size and order inside each phase (suggested: highest search interest first).
`;
fs.writeFileSync(ROOT + "/docs/product-pages/PRODUCT_DEVELOPMENT_PLAN.md", md);
console.log("plan written", plan.length, "used", used.size);
