/* eslint-disable -- Node test script (CommonJS), not app code. */
// Tests of the Nutrition & Meal Price Calculator data and math (no test framework,
// no network). Usage: npm run test:calculator
// docs/tools/NUTRITION_CALCULATOR_TEST_REPORT.md
const ROOT = process.cwd();
const { createJiti } = require(ROOT + "/node_modules/jiti");
const j = createJiti(ROOT + "/x.js", { alias: { "@": ROOT } });
const { getCalculatorData, validateCalculatorData } = j(ROOT + "/lib/calculator-data.ts");
const { mealTotals, isComplete } = j(ROOT + "/lib/calculator-math.ts");
const { allOfferings } = j(ROOT + "/content/menu/detail-items.ts");
const { productPages } = j(ROOT + "/content/menu/product-pages/index.ts");
const N = j(ROOT + "/lib/nutrition-data.ts");

let passed = 0;
const failed = [];
function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    failed.push(`${name}: ${e.message}`);
  }
}
function eq(actual, expected, what = "") {
  if (JSON.stringify(actual) !== JSON.stringify(expected)) throw new Error(`${what} expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}
function ok(cond, what) {
  if (!cond) throw new Error(what);
}

const data = getCalculatorData();
const item = (id) => data.items.find((i) => i.id === id) || (() => { throw new Error(`no item ${id}`); })();
const choice = (id, label) => item(id).choices.find((c) => c.label === label) || (() => { throw new Error(`no choice ${id} / ${label}: ${item(id).choices.map((c) => c.label).join(" | ")}`); })();
const line = (id, label, qty = 1) => ({ name: item(id).name, choice: choice(id, label), qty });

/* ---------- Data rules ---------- */

test("build check has no issues", () => eq(validateCalculatorData(data), []));

test("promotions, unavailable and not-listed entries are excluded", () => {
  const ids = new Set(data.items.flatMap((i) => i.choices.map((c) => c.id)));
  ok(ids.size > 0, "no choices");
  for (const o of allOfferings) {
    if (o.portionType === "promotion" || o.availability === "not-listed" || o.availability === "unavailable") {
      ok(data.stats.excluded.some((e) => e.offeringId === o.id), `${o.id} not excluded`);
    }
  }
});

test("every price is a verified price of that dish (offering, option or item-page version)", () => {
  const owner = new Map();
  for (const p of productPages) for (const id of p.equivalentOfferingIds || []) owner.set(id, p.productId);
  const known = new Map();
  const addP = (pid, v) => known.set(pid, new Set([...(known.get(pid) || []), v]));
  for (const o of allOfferings) {
    const pid = owner.get(o.id) || o.productId;
    o.prices.forEach((p) => addP(pid, p.amount));
    o.options.forEach((x) => x.price !== null && addP(pid, x.price));
  }
  for (const p of productPages) (p.versions || []).forEach((v) => addP(p.productId, v.price));
  for (const i of data.items) for (const c of i.choices) ok(c.price === null || (known.get(i.id) || new Set()).has(c.price), `${i.id} ${c.label} price ${c.price} not in data`);
});

test("every calorie value is a verified value of that dish", () => {
  const owner = new Map();
  for (const p of productPages) for (const id of p.equivalentOfferingIds || []) owner.set(id, p.productId);
  const known = new Map();
  const addC = (pid, v) => known.set(pid, new Set([...(known.get(pid) || []), v]));
  for (const o of allOfferings) {
    const pid = owner.get(o.id) || o.productId;
    if (o.calories !== null) addC(pid, `${o.calories}-${o.caloriesMax ?? o.calories}`);
    o.options.forEach((x) => x.calories !== null && addC(pid, `${x.calories}-${x.caloriesMax ?? x.calories}`));
  }
  for (const p of productPages) (p.versions || []).forEach((v) => addC(p.productId, `${v.calories}-${v.calories}`));
  for (const i of data.items) for (const c of i.choices) ok(c.calories === null || (known.get(i.id) || new Set()).has(c.calories.join("-")), `${i.id} ${c.label} calories ${c.calories} not in data`);
});

test("nutrition only from an official row with the same calories", () => {
  for (const i of data.items)
    for (const c of i.choices) {
      if (!c.nutrition) continue;
      ok(c.calories && c.calories[0] === c.calories[1], `${c.id} range with nutrition`);
      const page = Number(c.nutrition.source.match(/p\. (\d+)/)[1]);
      ok(page >= 1 && page <= 30, `${c.id} bad page`);
    }
});

test("a version without its own row never borrows another version's nutrition", () => {
  eq(choice("spaghetti-and-meatballs", "Regular: Marinara").nutrition, null, "Spaghetti & Meatballs marinara");
  eq(choice("chicken-and-shrimp-carbonara", "Regular: Chicken only").nutrition, null, "Chicken carbonara");
  eq(choice("gallon-iced-teas-and-raspberry-lemonade", "Sweet tea").nutrition, null, "Gallon sweet tea");
});

test("version switching gives each version its own price, calories and row", () => {
  const g = choice("chicken-alfredo", "Regular: Grilled chicken");
  const c = choice("chicken-alfredo", "Regular: Crispy chicken");
  eq([g.price, g.calories, g.nutrition.protein], [21.79, [1480, 1480], 79], "grilled");
  eq([c.price, c.calories, c.nutrition.protein], [21.79, [1710, 1710], 67], "crispy");
  const lunch = choice("lasagna-classico", "Lunch");
  eq([lunch.price, lunch.calories, lunch.nutrition.source], [12.49, [500, 500], "U.S. Nutrition Information, p. 6"], "lasagna lunch");
  const coke = choice("2-liter-soda", "Coke");
  const sprite = choice("2-liter-soda", "Sprite");
  ok(coke.nutrition.carbs !== sprite.nutrition.carbs, "Coke and Sprite have their own rows");
  eq(item("2-liter-soda").choices.length, 3, "2-liter soda versions (no duplicate range entry)");
});

test("the same choice in several categories is listed once", () => {
  const fa = item("fettuccine-alfredo").choices.filter((c) => c.label === "Regular");
  eq(fa.length, 1, "fettuccine regular");
  ok(fa[0].categoryIds.includes("classic-entrees") && fa[0].categoryIds.includes("amazing-alfredos"), "both categories kept");
  eq(item("breadsticks").choices.map((c) => c.label), ["6 breadsticks", "12 breadsticks"], "breadsticks");
});

test("catering and pan versions use their own verified values", () => {
  const pan = choice("chicken-alfredo", "Family-style · Catering: Pan with broccoli");
  eq([pan.price, pan.calories], [74.99, [6660, 6660]]);
  const cake = choice("black-tie-mousse-cake", "Catering: Whole cake (serves 12)");
  eq([cake.price, cake.calories], [73.99, null], "per-slice calories are not paired with a whole cake");
});

test("kids versions use the corrected pasta + sauce calories (Calc.)", () => {
  const k = choice("kids-alfredo-pasta", "Fettuccine with alfredo sauce");
  eq([k.price, k.calories, k.caloriesCalculated, k.nutrition], [7.49, [660, 660], true, null]);
});

test("bundles: one item, Olive Garden's own total, no single-item nutrition", () => {
  const b = choice("family-style-lasagna-bundle", "Bundle: Serves 4-6");
  eq([b.price, b.calories, b.bundle, b.nutrition], [68.99, [6700, 6700], true, null]);
  const combo = item("lasagna-combination").choices[0];
  eq([combo.price, combo.calories, combo.bundle], [224, [23570, 27100], true]);
  ok(data.items.every((i) => i.choices.filter((c) => c.bundle).every((c) => c.nutrition === null)), "bundle with nutrition");
});

test("categories: every listed category has items; Buy One Take One has only promotion entries", () => {
  ok(data.categories.length >= 15, `only ${data.categories.length} categories`);
  ok(data.categories.every((c) => c.count > 0), "empty category");
  ok(!data.categories.some((c) => c.id === "buy-one-take-one"), "promotion category listed");
});

/* ---------- Meal math ---------- */

test("totals = value x quantity, added up", () => {
  const t = mealTotals([line("chicken-alfredo", "Regular: Grilled chicken", 2), line("fettuccine-alfredo", "Regular", 1)]);
  eq(t.items, 3);
  eq(t.price.value, 61.07, "price 2 x 21.79 + 17.49");
  eq([t.calories.value, t.calories.max], [4180, 4180], "calories 2 x 1480 + 1220");
  eq(t.nutrients.protein.value, 79 * 2 + 27, "protein");
  eq(t.nutrients.carbs.value, 79 * 2 + 78, "carbs");
  eq(t.nutrients.fat.value, 95 * 2 + 89, "fat");
  eq(t.nutrients.sodium.value, 2290 * 2 + 1210, "sodium");
  ok(isComplete(t.price) && isComplete(t.calories) && isComplete(t.nutrients.sodium), "complete");
});

test("missing nutrients are never zero: total incomplete and the item is named", () => {
  const t = mealTotals([line("chicken-alfredo", "Regular: Grilled chicken"), line("budweiser", "To go")]);
  eq(t.nutrients.protein.value, 79, "protein of known item only");
  eq(t.nutrients.protein.missing, ["Budweiser (To go)"]);
  ok(!isComplete(t.nutrients.protein), "marked incomplete");
  eq(t.calories.value, 1480 + 150, "calories still complete");
  ok(isComplete(t.calories), "calories complete");
});

test("only missing values: nothing known, not zero", () => {
  const t = mealTotals([line("budweiser", "To go", 3)]);
  eq([t.nutrients.fat.known, t.nutrients.fat.missing.length], [0, 1]);
});

test("missing price marks the subtotal incomplete", () => {
  const fake = { name: "Test item", choice: { label: "Regular", price: null, calories: [100, 100], nutrition: null }, qty: 2 };
  const t = mealTotals([line("calamari", "Regular"), fake]);
  eq(t.price.value, 13.29);
  eq(t.price.missing, ["Test item (Regular)"]);
});

test("missing calories mark the calorie total incomplete", () => {
  const t = mealTotals([line("black-tie-mousse-cake", "Catering: Half cake (serves 6)")]);
  eq([t.calories.known, t.calories.missing.length, t.price.value], [0, 1, 40.49]);
});

test("calorie ranges stay ranges", () => {
  const t = mealTotals([line("dipping-sauces-with-breadsticks", "Regular sauce with 4 breadsticks (serves 2)", 2)]);
  eq([t.calories.value, t.calories.max], [1260, 2100]);
});

test("'less than' values count at their upper limit and are flagged", () => {
  const fake = { name: "Tea", choice: { label: "Regular", price: 1, calories: [5, 5], nutrition: { protein: { lt: 1 }, carbs: 1, fat: 0, sodium: 10 } }, qty: 2 };
  const t = mealTotals([fake]);
  eq([t.nutrients.protein.value, t.nutrients.protein.upperBound, t.nutrients.fat.value], [2, true, 0]);
});

test("money has no float noise", () => {
  eq(mealTotals([line("breadsticks", "6 breadsticks", 3)]).price.value, 14.97);
});

test("quantity 0 and an empty meal give empty totals (reset)", () => {
  const t = mealTotals([{ ...line("calamari", "Regular"), qty: 0 }]);
  eq([t.items, t.price.known, t.calories.known], [0, 0, 0]);
  eq(mealTotals([]).items, 0);
});

/* ---------- Meal report, print and PDF ---------- */

const { buildMealReport, PRICE_DISCLOSURE } = j(ROOT + "/lib/meal-report.ts");
const { buildMealPdf, toPdfText } = j(ROOT + "/lib/meal-pdf.ts");
const META = { siteName: "Olive Garden Menu Prices", siteUrl: "http://localhost:3000", lastChecked: "2026-11-18", locationNotice: "Prices may vary by location across the USA.", disclaimer: "Independent site.", guideVersion: "US_101926" };
const reportOf = (ls) =>
  buildMealReport(
    ls.map((l) => ({ name: l.name, version: l.choice.label, qty: l.qty, price: l.choice.price, calories: l.choice.calories, hasNutrition: !!l.choice.nutrition, bundle: !!l.choice.bundle })),
    mealTotals(ls),
    META,
    new Date(2026, 10, 20),
  );
const pdfText = (bytes) => Buffer.from(bytes).toString("latin1");

test("report: same totals and incomplete notes as the screen", () => {
  const r = reportOf([line("chicken-alfredo", "Regular: Grilled chicken", 2), line("budweiser", "To go")]);
  eq(r.rows.map((x) => [x.item, x.version, x.qty, x.price, x.calories]), [
    ["Chicken Alfredo", "Regular: Grilled chicken", "2", "$43.58", "2,960 Cal"],
    ["Budweiser", "To go", "1", "$6.29", "150 Cal"],
  ]);
  const t = Object.fromEntries(r.totals.map((x) => [x.label, x]));
  eq([t["Estimated price"].value, t["Calories"].value, t["Protein"].value, t["Sodium"].value], ["$49.87", "3,110", "158 g", "4,580 mg"]);
  ok(t["Protein"].incomplete && /Budweiser \(To go\)/.test(t["Protein"].note), "protein incomplete and named");
  eq(t["Protein"].coverage, "Includes 1 of 2 items", "coverage");
  eq(t["Calories"].coverage, null, "calories cover every item");
  ok(r.coverageNotes.length === 1 && /no exact protein, carbs, fat or sodium values for Budweiser, so it is left out/.test(r.coverageNotes[0]) && /price and calories are still counted/.test(r.coverageNotes[0]), r.coverageNotes.join(" | "));
  ok(!t["Calories"].incomplete, "calories complete");
  ok(r.notes[0] === PRICE_DISCLOSURE, "price disclosure first");
  ok(r.notes.some((n) => /November 2026/.test(n)) && !r.notes.some((n) => /Orlando|Millenia/i.test(n)), "month-year date, no location");
  eq(r.createdIso, "2026-11-20");
});

test("report: nothing known -> Not listed, never 0", () => {
  const r = reportOf([line("budweiser", "To go")]);
  eq(r.totals.find((x) => x.label === "Total fat").value, "Not listed");
});

test("PDF: valid structure (header, objects, xref offsets, EOF)", () => {
  const bytes = buildMealPdf(reportOf([line("chicken-alfredo", "Regular: Grilled chicken"), line("family-style-lasagna-bundle", "Bundle: Serves 4-6")]));
  const s = pdfText(bytes);
  ok(s.startsWith("%PDF-1.4\n") && s.trimEnd().endsWith("%%EOF"), "header/EOF");
  const xrefAt = Number(s.match(/startxref\n(\d+)/)[1]);
  ok(s.slice(xrefAt, xrefAt + 4) === "xref", "startxref points to xref");
  const entries = [...s.slice(xrefAt).matchAll(/(\d{10}) 00000 n /g)].map((m) => Number(m[1]));
  entries.forEach((off, i) => ok(s.slice(off, off + `${i + 1} 0 obj`.length) === `${i + 1} 0 obj`, `xref entry ${i + 1}`));
  for (const m of s.matchAll(/<< \/Length (\d+) >>\nstream\n/g)) {
    const start = m.index + m[0].length;
    ok(s.slice(start + Number(m[1]), start + Number(m[1]) + 10) === "\nendstream", "stream length");
  }
  ok(/[^\x00-\x7f]/.test(s) === false, "ASCII only");
  ok(s.includes("(Chicken Alfredo) Tj") && s.includes("($21.79) Tj") && s.includes("Prices vary by location."), "content present");
  ok(s.includes("(Includes 1 of 2 items) Tj") && s.includes("(How these totals are counted) Tj") && !s.includes("INCOMPLETE"), "friendly coverage text");
});

test("PDF: long meals continue on more pages", () => {
  const many = data.items.slice(0, 60).map((i) => ({ name: i.name, choice: i.choices[0], qty: 1 }));
  const s = pdfText(buildMealPdf(reportOf(many)));
  const count = Number(s.match(/\/Count (\d+)/)[1]);
  ok(count >= 2, `pages ${count}`);
  ok(s.includes(`(Page ${count} of ${count}) Tj`), "page numbers");
});

test("PDF text: special characters become plain ASCII", () => {
  eq(toPdfText("1,260–2,100 ≤ 3 g · Olive Garden’s “Calc.”"), "1,260-2,100 <= 3 g - Olive Garden's \"Calc.\"");
});

console.log(`calculator tests: ${passed} passed, ${failed.length} failed`);
console.log(
  `data: ${data.stats.items} items, ${data.stats.choices} choices, ${data.stats.withNutrition} with full nutrition, ` +
    `${data.stats.withCalories} with calories, ${data.stats.withPrice} with price, ${data.stats.calorieRanges} calorie ranges, ` +
    `${data.stats.bundles} bundle choices, ${data.stats.excluded.length} offerings excluded, ${data.categories.length} categories`,
);
if (failed.length) {
  console.log(failed.map((f) => "FAIL " + f).join("\n"));
  process.exit(1);
}
