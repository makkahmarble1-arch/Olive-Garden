/* eslint-disable -- Node research script (CommonJS), not app code. */
// Writes the four product-page reports (research helper).
const S = process.argv[2];
const ROOT = process.argv[3];
const fs = require("fs");
const { summary: s, rows } = require(S + "/stats.json");
const { createJiti } = require(ROOT + "/node_modules/jiti");
const j = createJiti(ROOT + "/x.js", { alias: { "@": ROOT } });
const { offeringNutritionMap: N, offeringAllergenMap: A } = j(ROOT + "/content/menu/nutrition/offering-map.ts");
const { nutritionGuideRows } = j(ROOT + "/content/menu/nutrition/nutrition-guide.ts");
const { allergenGuideRows } = j(ROOT + "/content/menu/nutrition/allergen-guide.ts");
const { menuOfferings } = j(ROOT + "/content/menu/offerings/index.ts");
const nRow = (id) => nutritionGuideRows.find((r) => r.id === id);
const aRow = (id) => allergenGuideRows.find((r) => r.id === id);
const D = "2026-11-18";
const yes = (b) => (b ? "Yes" : "No");
const stat = (o) => Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} |`).join("\n");

/* ---------- PRODUCT_INVENTORY.md ---------- */
const inv = `# Product Inventory (menu item pages)

**Generated:** ${D} from \`content/menu/\` and the central official data
(\`content/menu/nutrition/\`, PDFs US_101926). Re-generate after data changes.

## Totals

| Measure | Count |
|---|---|
| Unique products (\`content/menu/products.ts\`) | ${s.products} |
| Offerings (product placements in categories) | ${s.offerings} |
| Official nutrition rows entered (incl. ${s.nutritionAddOnRows} "add ..." sauce/topping rows) | ${s.nutritionRows} |
| Official allergen rows entered | ${s.allergenRows} |
| Products with verified official nutrition (≥ 1 offering "exact"/"same-item") | ${s.productsWithNutrition} |
| Products with verified official allergen marks | ${s.productsWithAllergens} |
| Products with both | ${s.productsWithBoth} |
| Products with a calorie conflict | ${s.productsWithConflict} |
| Products with no single official row (bundles, wines/beers, multi-flavor, composites...) | ${s.productsWithNeither} |

"Verified" = an official row that describes exactly that item (same name or
documented same item, same serving, and the same calories as our data;
checked at build time by \`lib/nutrition-data.ts\`). Unavailable values stay
\`null\` and are never shown as zero.

## All products

| Product id | Name | Offerings | Nutrition rows | Allergen rows | Conflict | Photo | Eligibility | Categories |
|---|---|---:|---:|---:|---:|---|---|---|
${rows.map((r) => `| \`${r.id}\` | ${r.name} | ${r.offerings} | ${r.nut} | ${r.alg} | ${r.conflicts || ""} | ${yes(r.image)} | ${r.tier} | ${r.categories} |`).join("\n")}
`;
fs.writeFileSync(ROOT + "/docs/product-pages/PRODUCT_INVENTORY.md", inv);

/* ---------- NUTRITION_DATA_REPORT.md ---------- */
const nonExact = menuOfferings.filter((o) => N[o.id].status !== "exact");
const nut = `# Nutrition Data Report

**Source:** Olive Garden *Nutrition Information (U.S. Restaurants, excludes
Hawaii)*, footer code **US_101926**, 25 pages (PDF created 2026-09-11),
supplied by the owner on 2026-11-15 (\`research/official-sources/\`, git-ignored).
**Entered:** ${s.nutritionRows} rows → \`content/menu/nutrition/nutrition-guide.ts\`
(each row keeps its page, section and printed label). Mapping →
\`content/menu/nutrition/offering-map.ts\`. Checks → \`lib/nutrition-data.ts\`.

## Method

1. Text and word positions extracted with PyMuPDF (research tool in
   \`research/nutrition-extraction/\`, not a project dependency); values assigned
   to columns by the x-position of the printed header.
2. Rows that continue across a page break are joined; "add ..." rows are
   linked to the item above them (\`addOnFor\`).
3. Visual checks against rendered pages: nutrition p. 2 (incl. Fried
   Mozzarella), allergen pp. 2, 4, 9, 11. Every page yields 12-13 rows (full table).
4. Values: number as printed; \`{ lessThan: n }\` for "less than n g/mg"; \`null\`
   only when the cell is empty (none in this PDF). Zero stays 0.
5. Each offering matched by name + section + calories, then reviewed.

## Offering statuses (${s.offerings} offerings)

| Status | Offerings |
|---|---:|
${stat(s.offeringsNutrition)}

Meaning: see \`NutritionMapping\` in \`lib/types.ts\`. Only "exact" and
"same-item" rows are shown as an item's official nutrition.

## Calorie conflicts (owner decision needed; data NOT changed)

| Offering | Our data | Guide | Row | Note |
|---|---:|---:|---|---|
${menuOfferings.filter((o) => N[o.id].status === "conflict").map((o) => { const r = nRow(N[o.id].rowId); return `| \`${o.id}\` | ${o.calories} | ${r.values.calories} | p. ${r.page} "${r.label}" | ${N[o.id].note} |`; }).join("\n")}

**Fried Mozzarella: no conflict.** Our 800 = guide row "Fried Mozzarella",
p. 2, APPETIZERS (one order, as served, without the marinara, which is the
separate "add marinara" row of 35). The catering tray (3,450) = p. 24
"Fried Mozzarella" under CATERING PANS (SERVES 4 - 6).

## Every non-exact offering

| Offering | Status | Row(s) | Note |
|---|---|---|---|
${nonExact.map((o) => { const m = N[o.id]; const ids = [m.rowId, ...(m.variantRowIds || [])].filter(Boolean).map((id) => { const r = nRow(id); return `p${r.page} "${r.label}" (${r.values.calories})`; }).join("; "); return `| \`${o.id}\` | ${m.status} | ${ids || "—"} | ${m.note || ""} |`; }).join("\n")}

## Known limits

- The guide's catering "add marinara" (110) follows Toasted Ravioli on p. 24;
  it is linked to that row only (the guide does not repeat it for Fried Mozzarella).
- Wines/beers: the guide gives generic rows only; brand offerings stay "generic".
- Items not in the guide (fountain drinks, fresh-brewed sweet/unsweet iced tea,
  bottled waters, kids five cheese marinara sauce, bundles) keep their existing
  menu-page calories; no official breakdown exists.
`;
fs.writeFileSync(ROOT + "/docs/product-pages/NUTRITION_DATA_REPORT.md", nut);

/* ---------- ALLERGEN_DATA_REPORT.md ---------- */
const alg = `# Allergen Data Report

**Source:** Olive Garden *Allergen Guide (U.S. Restaurants, excludes Hawaii)*,
footer code **US_101926**, 11 pages (PDF created 2026-09-30), supplied by the
owner on 2026-11-15. **Entered:** ${s.allergenRows} rows →
\`content/menu/nutrition/allergen-guide.ts\` with the PREP marks (fried in soy
oil / grilled; a "●" glyph in the PDF) and the 12 allergen columns exactly as
printed: dairy, eggs, fish, crustacean, mollusk, tree nuts, peanuts, wheat,
gluten, soy, sesame, sulfites. A row with no marks has \`contains: []\` (the
guide marks none); it is never shown as "allergen-free".

## Official statements kept (page 1, paraphrased on item pages)

- Based on supplier information; does not show items made in a facility with an allergen.
- Shared cooking/prep areas: cross-contact cannot be completely ruled out; no item guaranteed free of any allergen.
- Fryer and grill items are marked because of special cross-contact risk.
- Pastas with and without egg share one pasta cooker.
- Kitchens are not gluten-free; cross-contact with gluten is possible.
- Note on soy: the readable part says the FDA does not consider highly refined
  soybean oil a major food allergen; **the rest of that sentence is cut off in
  the PDF itself**, so the site does not repeat it.
- Guests with a food allergy should notify the server/manager.

Stored in \`allergenGuideNotes\` (\`content/menu/nutrition/documents.ts\`).

## Offering statuses (${s.offerings} offerings)

| Status | Offerings |
|---|---:|
${stat(s.offeringsAllergen)}

"not-covered" = the guide has no section for catering, family-style, drinks,
wine/beer, Buy One Take One or bundles. "option-dependent" = the guide lists
each version (e.g. Chicken Alfredo grilled vs crispy, Cheese Ravioli marinara
vs meat sauce) and the marks differ by version. Lunch and lighter portions use
the ENTRÉES row of the same dish ("exact"/"same-item"); the guide lists entrées
once, not per portion.

## Fried Mozzarella

Row \`a2-fried-mozzarella\`, page 2, APPETIZERS: **fried in soy oil; contains
dairy, wheat, gluten, soy.** Not marked: eggs, fish, crustacean, mollusk, tree
nuts, peanuts, sesame, sulfites. Visually verified against the rendered page.

## Offerings with allergen rows

| Offering | Status | Row | Prep | Contains |
|---|---|---|---|---|
${menuOfferings.filter((o) => A[o.id].rowId).map((o) => { const m = A[o.id]; const r = aRow(m.rowId); const prep = [r.prep.friedInSoyOil && "fried in soy oil", r.prep.grilled && "grilled"].filter(Boolean).join(", "); return `| \`${o.id}\` | ${m.status} | p${r.page} "${r.label}" | ${prep || "—"} | ${r.contains.join(", ") || "none marked"} |`; }).join("\n")}
`;
fs.writeFileSync(ROOT + "/docs/product-pages/ALLERGEN_DATA_REPORT.md", alg);

/* ---------- PRODUCT_ELIGIBILITY_REPORT.md ---------- */
const tierA = rows.filter((r) => r.tier.startsWith("A:"));
const tierV = rows.filter((r) => r.tier.startsWith("V:"));
const tierB = rows.filter((r) => r.tier === "B: partial official data");
const elig = `# Product Eligibility Report (menu item pages)

**Generated:** ${D}. Data gates only (checklist gates 1, 3 and 5 of
\`PRODUCT_CONTENT_CHECKLIST.md\`). Gates 2 (unique search intent), 4 (original
content), 6 (links) and 7 (owner visual review) are decided per page, one at a
time, **after the owner approves the Fried Mozzarella sample**. No other page
has been created.

| Tier | Meaning | Products |
|---|---|---:|
${Object.entries(s.tiers).map(([k, v]) => `| ${k} | ${k.startsWith("V") ? "each version (sauce/protein) has its own official nutrition and allergen row; needs a version-aware page layout (owner approval)" : k.startsWith("A") ? "verified price + calories, owner photo, official nutrition AND allergen row, no conflict" : k.startsWith("B") ? "photo + only one of nutrition/allergen rows (e.g. catering, drinks, kids composites)" : k.startsWith("C") ? "no single official row (bundles, wines/beers, multi-flavor, composites)" : k.startsWith("page") ? "has a page" : "fails a basic data gate"} | ${v} |`).join("\n")}

## Tier A: data-ready candidates (${tierA.length})

Strongest search intent first is a later SEO step; this list is alphabetical.

| Product id | Name | Categories |
|---|---|---|
${tierA.sort((a, b) => a.name.localeCompare(b.name)).map((r) => `| \`${r.id}\` | ${r.name}${r.limited ? " (limited time)" : ""} | ${r.categories} |`).join("\n")}

## Tier V: official rows per version (${tierV.length})

| Product id | Name | Categories |
|---|---|---|
${tierV.sort((a, b) => a.name.localeCompare(b.name)).map((r) => `| \`${r.id}\` | ${r.name} | ${r.categories} |`).join("\n")}

## Tier B: partial official data (${tierB.length})

| Product id | Name | Nutrition | Allergens |
|---|---|---|---|
${tierB.sort((a, b) => a.name.localeCompare(b.name)).map((r) => `| \`${r.id}\` | ${r.name} | ${r.nStat} | ${r.aStat} |`).join("\n")}

## Not eligible / no single official row

${rows.filter((r) => r.tier.startsWith("C") || r.tier.startsWith("not")).sort((a, b) => a.name.localeCompare(b.name)).map((r) => `- \`${r.id}\` ${r.name}: ${r.tier}`).join("\n")}
`;
fs.writeFileSync(ROOT + "/docs/product-pages/PRODUCT_ELIGIBILITY_REPORT.md", elig);
console.log("reports written");
