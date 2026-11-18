/* eslint-disable -- Node research script (CommonJS), not app code. */
// Builds content/menu/nutrition/{nutrition-guide,allergen-guide,offering-map}.ts
// from the extracted official rows + reviewed mapping decisions (research helper).
const S = process.argv[2];
const OUT = process.argv[3];
const fs = require("fs");
const nut = require(S + "/nutrition_rows.json");
const alg = require(S + "/allergen_rows.json");
const { offerings } = require(S + "/offerings.json");

const slug = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const STOP = new Set(["the", "and", "with", "of", "a", "our", "famous", "ea", "1", "per", "one", "serving", "serves", "two", "to", "go", "regional", "where", "available", "sauce", "soup"]);
const words = (s) => (s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").split(" ").filter((w) => w && !STOP.has(w));
function sim(a, b) { const A = new Set(words(a)), B = new Set(words(b)); if (!A.size || !B.size) return 0; let i = 0; for (const w of A) if (B.has(w)) i++; return i / Math.max(A.size, B.size); }

/* ---------- ids for official rows ---------- */
const used = new Set();
const uniq = (id) => { let x = id, n = 2; while (used.has(x)) x = `${id}-${n++}`; used.add(x); return x; };
let parent = null;
const NROWS = nut.map((r) => {
  const isAdd = /^add /i.test(r.label);
  const id = isAdd && parent ? uniq(`${parent.id}--${slug(r.label)}`) : uniq(`p${r.page}-${slug(r.label)}`);
  const row = { id, page: r.page, section: r.section, label: r.label.replace("Marinara sipping sauce", "Marinara sipping sauce"), values: r.values };
  if (isAdd && parent) row.addOnFor = parent.id; else parent = row;
  return row;
});
used.clear();
const AROWS = alg.map((r) => {
  const prep = { friedInSoyOil: r.marks.friedInSoyOil, grilled: r.marks.grilled };
  const map = { dairy: "dairy", eggs: "eggs", fish: "fish", crustacean: "crustacean", mollusk: "mollusk", treeNuts: "tree-nuts", peanuts: "peanuts", wheat: "wheat", gluten: "gluten", soy: "soy", sesame: "sesame", sulfites: "sulfites" };
  const contains = Object.entries(map).filter(([k]) => r.marks[k]).map(([, v]) => v);
  return { id: uniq(`a${r.page}-${slug(r.label)}`), page: r.page, section: r.section, label: r.label, prep, contains };
});
const nByLabel = (page, label) => { const r = NROWS.find((x) => x.page === page && x.label === label); if (!r) throw new Error(`no nutrition row p${page} "${label}"`); return r.id; };
const aByLabel = (label, section) => { const r = AROWS.find((x) => x.label === label && (!section || x.section === section)); if (!r) throw new Error(`no allergen row "${label}"`); return r.id; };

/* ---------- nutrition mapping ---------- */
const SECTIONS = {
  appetizers: ["APPETIZERS"], "soups-salad-and-breadsticks": ["SOUPS, SALAD & BREADSTICKS", "TO GO SOUPS & SALAD"],
  "create-your-own-pasta": ["CREATE YOUR OWN PASTA"], "lunch-menu": ["LUNCH"], "classic-entrees": ["DINNER"], "amazing-alfredos": ["DINNER"],
  "lighter-portions": ["LIGHTER PORTIONS"], "sides-sauces-and-extras": ["SIDES", "CATERING PANS (SERVES 4 - 6)"], desserts: ["DESSERTS"],
  "kids-meal": ["KIDS MENU", "GLUTEN SENSITIVE MENU"], "gluten-sensitive": ["GLUTEN SENSITIVE MENU"], "drink-menu": ["NON-ALCOHOLIC DRINKS"],
  "non-alcoholic-beverages": ["NON-ALCOHOLIC DRINKS"], catering: ["CATERING PANS (SERVES 4 - 6)", "CATERING SOUPS & SALAD"],
  "family-style-meals": ["CATERING PANS (SERVES 4 - 6)", "CATERING SOUPS & SALAD"],
};
const BREADSTICK = nByLabel(3, "Breadstick with garlic topping (1 ea.)");
// Reviewed decisions (research/products/../NUTRITION_DATA_REPORT): same item, same serving, same calories.
const N_MANUAL = {
  "appetizers--breadsticks": { status: "same-item", rowId: BREADSTICK, note: "Per breadstick (with garlic topping); orders of 6 or 12 are multiples." },
  "soups-salad-and-breadsticks--breadsticks": { status: "same-item", rowId: BREADSTICK, note: "Per breadstick (with garlic topping)." },
  "family-style-meals--breadsticks": { status: "same-item", rowId: BREADSTICK, note: "Per breadstick (with garlic topping)." },
  "catering--breadsticks": { status: "same-item", rowId: BREADSTICK, note: "Per breadstick (with garlic topping)." },
  "family-style-meals--famous-house-salad": { status: "same-item", rowId: nByLabel(21, "Jumbo Famous House Salad (Serves 6)") },
  "gluten-sensitive--zuppa-toscana": { status: "same-item", rowId: NROWS.find((r) => r.section === "GLUTEN SENSITIVE MENU" && r.label === "Zuppa Toscana Soup").id },
  "catering--black-tie-mousse-cake": { status: "same-item", rowId: nByLabel(12, "Black Tie Mousse Cake"), note: "Per slice (the dessert-menu row)." },
  "catering--tiramisu": { status: "same-item", rowId: nByLabel(12, "Tiramisu"), note: "Per slice (the dessert-menu row)." },
  "catering--pumpkin-cookie-butter-cheesecake": { status: "same-item", rowId: nByLabel(12, "Pumpkin Cookie Butter Cheesecake"), note: "Per slice (the dessert-menu row)." },
  "sides-sauces-and-extras--side-of-alfredo-sauce--large": { status: "same-item", rowId: nByLabel(24, "Alfredo, one pint"), note: "Large side sauce = one pint (official PDF row)." },
  "sides-sauces-and-extras--side-of-marinara-sauce--large": { status: "same-item", rowId: nByLabel(24, "Marinara, one pint"), note: "Large side sauce = one pint (official PDF row)." },
  "sides-sauces-and-extras--side-of-meat-sauce--large": { status: "same-item", rowId: nByLabel(24, "Meat sauce, one pint"), note: "Large side sauce = one pint (official PDF row)." },
  "sides-sauces-and-extras--side-of-grilled-chicken": { status: "exact", rowId: NROWS.find((r) => r.section === "SIDES" && r.label === "Grilled Chicken").id },
  "sides-sauces-and-extras--side-of-broccoli": { status: "exact", rowId: NROWS.find((r) => r.section === "SIDES" && r.label === "Parmesan Garlic Broccoli").id },
  "catering--broccoli": { status: "same-item", rowId: NROWS.find((r) => r.section === "CATERING PANS (SERVES 4 - 6)" && r.label === "Parmesan Garlic Broccoli").id },
  "catering--sicilian-cheesecake": { status: "same-item", rowId: nByLabel(12, "Sicilian Cheesecake with Strawberry Topping"), note: "Per slice (the dessert-menu row). Owner decision 2026-11-18: official 730 replaces the 700 from the catering ordering card." },
  "sides-sauces-and-extras--side-of-crispy-shrimp-fritta": { status: "conflict", rowId: nByLabel(5, "Crispy Shrimp Fritta"), note: "Guide: 220, but only as a Create Your Own Pasta topping row (no piece count). Ordering pages: side 200 (no piece count), pasta topping 350 for 16 pieces. Owner decision 2026-11-18 (final): keep 200, because the serving size of the guide row could not be confirmed. Not shown as official nutrition." },
  "wine-and-beer-to-go--heineken-0-0-non-alcoholic": { status: "generic", rowId: nByLabel(18, "Beer - Bottle, Non-Alcoholic"), note: "The guide lists only a generic non-alcoholic bottled beer row." },
  "sides-sauces-and-extras--side-of-crispy-chicken-fritta": { status: "same-item", rowId: nByLabel(5, "Crispy Chicken Fritta"), note: "Create Your Own Pasta topping row; same 240 calories." },
  "classic-entrees--spaghetti-and-meatballs": { status: "variants", variantRowIds: [nByLabel(10, "Spaghetti with Meat Sauce & Meatballs (3)")], note: "The guide lists the meat-sauce version (1,120); the marinara version (970 in our data) has no row of its own in the dinner section." },
  "lighter-portions--spaghetti-and-meatballs": { status: "variants", variantRowIds: [NROWS.find((r) => r.section === "LIGHTER PORTIONS" && r.label === "Spaghetti & Meatballs with Meat Sauce").id], note: "The lighter-portions section lists the meat-sauce version (800); the marinara version (690) is listed only under Lunch." },
  "drink-menu--gallon-iced-teas-and-raspberry-lemonade": { status: "multi-row", note: "Several flavors; the guide lists most gallon flavors separately (sweet tea gallon not listed)." },
  "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade": { status: "multi-row", note: "Several flavors; see the gallon rows on page 25." },
  "catering--gallon-iced-teas-and-raspberry-lemonade": { status: "multi-row", note: "Several flavors; see the gallon rows on page 25." },
  "drink-menu--2-liter-soda": { status: "multi-row", note: "Several flavors (Coke 790, Diet Coke 0, Sprite 790 on page 25)." },
  "non-alcoholic-beverages--2-liter-soda": { status: "multi-row", note: "Several flavors (page 25)." },
  "catering--2-liter-soda": { status: "multi-row", note: "Several flavors (page 25)." },
};
const REASON = (o) => {
  const id = o.id;
  if (o.calories === null) return { status: "not-applicable", note: "No calories in our data (promotion entry, merchandise, or unpriced placement)." };
  if (/bundle|combination/.test(id)) return { status: "composite", note: "Bundle/combination: the guide lists its parts, not the bundle." };
  if (/homemade-soups/.test(id)) return { status: "multi-row", note: "Several soups; each soup has its own row." };
  if (/soup-salad-and-breadsticks|weekday-lunch-special/.test(id)) return { status: "composite", note: "Soup + salad + breadstick; the guide lists the parts." };
  if (/dipping-sauces-with-breadsticks/.test(id)) return { status: "composite", note: "Breadsticks + chosen sauce (calculated on the site)." };
  if (/create-your-own-pasta$/.test(id)) return { status: "composite", note: "Built from pasta, sauce and topping rows (Create Your Own Pasta section)." };
  if (/^kids-meal--kids-(alfredo|meat-sauce|tomato-sauce|five-cheese-marinara)-pasta$/.test(id)) return { status: "composite", note: "Kids pasta + sauce; the guide lists pasta and sauce rows separately." };
  if (/^wine-and-beer-to-go--/.test(id)) return { status: "generic", note: "The guide gives only generic wine/beer rows (e.g. white/rosé bottle 630, red bottle 660, light bottle 100, regular bottle 150), not brand rows." };
  if (/fountain-drinks|sweet-iced-tea|unsweet-iced-tea|pellegrino|acqua-panna|large-salad/.test(id)) return { status: "not-in-guide", note: "No matching row in the U.S. nutrition guide." };
  return { status: "not-in-guide", note: "No matching row found in the U.S. nutrition guide; needs review." };
};

function autoRow(o) {
  const secs = SECTIONS[o.categoryId] || [];
  const cands = NROWS.filter((r) => !r.addOnFor && secs.includes(r.section)).map((r) => ({ r, s: Math.max(sim(o.displayName, r.label), sim(o.officialName, r.label)) })).filter((c) => c.s >= 0.5);
  const hit = cands.filter((c) => c.r.values.calories === o.calories).sort((a, b) => b.s - a.s)[0];
  return { hit, cands };
}

const nutritionMap = {};
for (const o of offerings) {
  if (N_MANUAL[o.id]) { nutritionMap[o.id] = N_MANUAL[o.id]; continue; }
  const { hit, cands } = o.calories === null ? {} : autoRow(o);
  const optCals = o.options.map((x) => x.calories).filter((x) => x != null);
  const hasVariants = o.caloriesMax != null || new Set(optCals).size > 1;
  if (hit && !hasVariants) { nutritionMap[o.id] = { status: "exact", rowId: hit.r.id }; continue; }
  if (hit && hasVariants) {
    const want = new Set([o.calories, o.caloriesMax, ...optCals].filter((x) => x != null));
    const variants = cands.filter((c) => c.r.id !== hit.r.id && want.has(c.r.values.calories)).map((c) => c.r.id);
    nutritionMap[o.id] = { status: "variants", rowId: hit.r.id, variantRowIds: [...new Set(variants)], note: "Default version shown; other versions (sauce, protein, size) have their own rows." };
    continue;
  }
  nutritionMap[o.id] = REASON(o);
}

/* ---------- allergen mapping ---------- */
const ASEC = {
  appetizers: ["APPETIZERS"], "soups-salad-and-breadsticks": ["SOUPS, SALAD & BREADSTICKS"], "create-your-own-pasta": ["CREATE YOUR OWN PASTA"],
  "lunch-menu": ["ENTRÉES"], "classic-entrees": ["ENTRÉES"], "amazing-alfredos": ["ENTRÉES"], "lighter-portions": ["ENTRÉES"],
  "sides-sauces-and-extras": ["SIDES"], desserts: ["DESSERTS"], "kids-meal": ["KIDS ENTRÉES"], "gluten-sensitive": ["GLUTEN-SENSITIVE"],
};
const A_MANUAL = {
  "appetizers--spinach-artichoke-dip": { status: "exact", rowId: aByLabel("Spinach-Artichoke Dip with flatbread crisps") },
  "appetizers--breadsticks": { status: "same-item", rowId: aByLabel("Breadstick with garlic topping") },
  "soups-salad-and-breadsticks--breadsticks": { status: "same-item", rowId: aByLabel("Breadstick with garlic topping") },
  "lighter-portions--spicy-alfredo-fettuccine": { status: "same-item", rowId: aByLabel("Spicy Alfredo Fettuccine") },
  "lunch-menu--spicy-alfredo-fettuccine": { status: "same-item", rowId: aByLabel("Spicy Alfredo Fettuccine") },
  "lunch-menu--eggplant-parmigiana-sandwich": { status: "exact", rowId: aByLabel("Eggplant Parmigiana Sandwich (with fries)") },
  "lunch-menu--italian-grilled-chicken-sandwich": { status: "exact", rowId: aByLabel("Italian Grilled Chicken Sandwich (with fries)") },
  "sides-sauces-and-extras--side-of-meatballs": { status: "exact", rowId: aByLabel("Meatballs (with marinara)", "SIDES") },
  "sides-sauces-and-extras--side-of-mashed-potatoes": { status: "exact", rowId: aByLabel("Mashed Potatoes", "SIDES") },
  "sides-sauces-and-extras--side-of-broccoli": { status: "exact", rowId: aByLabel("Parmesan Garlic Broccoli", "SIDES") },
  "sides-sauces-and-extras--italian-sausage": { status: "exact", rowId: aByLabel("Italian Sausage (with marinara)", "SIDES") },
  "sides-sauces-and-extras--side-of-grilled-chicken": { status: "same-item", rowId: aByLabel("Grilled Chicken", "CREATE YOUR OWN PASTA"), note: "Grilled chicken component row (Create Your Own Pasta section)." },
  "sides-sauces-and-extras--side-of-crispy-shrimp-fritta": { status: "same-item", rowId: aByLabel("Crispy Shrimp Fritta", "CREATE YOUR OWN PASTA") },
  "sides-sauces-and-extras--side-of-crispy-chicken-fritta": { status: "same-item", rowId: aByLabel("Crispy Chicken Fritta", "CREATE YOUR OWN PASTA") },
  "sides-sauces-and-extras--side-of-alfredo-sauce--large": { status: "same-item", rowId: aByLabel("Alfredo Sauce", "CREATE YOUR OWN PASTA") },
  "sides-sauces-and-extras--side-of-marinara-sauce--large": { status: "same-item", rowId: aByLabel("Marinara", "CREATE YOUR OWN PASTA") },
  "sides-sauces-and-extras--side-of-meat-sauce--large": { status: "same-item", rowId: aByLabel("Meat Sauce", "CREATE YOUR OWN PASTA") },
  "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large": { status: "same-item", rowId: aByLabel("Five Cheese Marinara Sauce", "CREATE YOUR OWN PASTA") },
  "gluten-sensitive--grilled-chicken-parmigiana": { status: "exact", rowId: aByLabel("Grilled Chicken Parmigiana with Rotini & Marinara") },
  "gluten-sensitive--rotini-pasta-with-marinara": { status: "exact", rowId: aByLabel("Rotini Pasta with Marinara") },
  "gluten-sensitive--rotini-pasta-with-meat-sauce": { status: "exact", rowId: aByLabel("Rotini Pasta with Meat Sauce") },
  "kids-meal--kids-pizza": { status: "exact", rowId: aByLabel("Cheese Pizza"), note: "Cheese pizza; the guide marks no allergens for the pepperoni add-on." },
  "kids-meal--kids-chicken-fingers": { status: "exact", rowId: aByLabel("Chicken Fingers") },
  "kids-meal--kids-macaroni-and-cheese": { status: "exact", rowId: aByLabel("Macaroni & Cheese") },
  "kids-meal--kids-cheese-ravioli": { status: "exact", rowId: aByLabel("Cheese Ravioli", "KIDS ENTRÉES") },
  "soups-salad-and-breadsticks--famous-house-salad": { status: "same-item", rowId: aByLabel("Salad with Signature Italian Dressing"), note: "The house salad with signature Italian dressing." },
};
const A_REASON = (o) => {
  const id = o.id;
  if (/cheese-grater/.test(id)) return { status: "not-applicable", note: "Merchandise, not food." };
  if (/homemade-soups/.test(id)) return { status: "multi-row", note: "Several soups; each soup has its own row." };
  if (/bundle|soup-salad-and-breadsticks|weekday-lunch-special|dipping-sauces-with-breadsticks|create-your-own-pasta$|kids-(alfredo|meat-sauce|tomato-sauce|five-cheese-marinara)-pasta$|grilled-chicken-with-rotini/.test(id)) return { status: "composite", note: "Made of several listed parts (pasta, sauce, toppings, soup, salad, breadsticks); check each part's row." };
  if (/rotini-with-(marinara|meat-sauce)$/.test(id)) return { status: "not-in-guide", note: "Kids gluten-sensitive version: the guide lists only the adult rotini rows." };
  return { status: "not-in-guide", note: "No matching row in the U.S. allergen guide." };
};
const A_OPTION = /chicken-alfredo$|spaghetti-and-meatballs$|cheese-ravioli$|lunch-menu--spaghetti$|chicken-parmigiana-sandwich$|calabrian-steak-and-shrimp-bucatini$|chicken-tortelloni-alfredo$|chicken-and-shrimp-carbonara$/;
const allergenMap = {};
for (const o of offerings) {
  if (A_MANUAL[o.id]) { allergenMap[o.id] = A_MANUAL[o.id]; continue; }
  const secs = ASEC[o.categoryId];
  if (!secs) { allergenMap[o.id] = { status: "not-covered", note: "The allergen guide does not list this menu section (catering, family-style, to-go drinks, promotions)." }; continue; }
  if (A_OPTION.test(o.id)) { allergenMap[o.id] = { status: "option-dependent", note: "The guide lists each version (sauce or protein) separately; marks depend on the version ordered." }; continue; }
  const hit = AROWS.filter((r) => secs.includes(r.section) && !/^add /i.test(r.label)).find((r) => sim(o.displayName, r.label) >= 0.99 || sim(o.officialName, r.label) >= 0.99);
  allergenMap[o.id] = hit ? { status: "exact", rowId: hit.id } : A_REASON(o);
}

/* ---------- write TypeScript ---------- */
const HEADER = (what) => `/**\n * ${what}\n * GENERATED from the owner-supplied official PDF (footer code US_101926) by the\n * research extractor; every row keeps its PDF page. Do not edit values by hand:\n * re-run the extractor for a new PDF version (docs/product-pages/NUTRITION_ALLERGEN_DATA.md).\n * Visual spot checks: research/products/fried-mozzarella/FACT_VERIFICATION.md.\n */\n`;
const j = (x) => JSON.stringify(x);
fs.writeFileSync(OUT + "/nutrition-guide.ts", HEADER("Every row of Olive Garden's U.S. Nutrition Information guide (25 pages), as printed.") +
  `import type { NutritionGuideRow } from "@/lib/types";\n\nexport const nutritionGuideRows: readonly NutritionGuideRow[] = [\n` +
  NROWS.map((r) => `  ${j(r)},`).join("\n") + `\n];\n`);
fs.writeFileSync(OUT + "/allergen-guide.ts", HEADER("Every row of Olive Garden's U.S. Allergen Guide (11 pages), as marked (Y = contains; prep = fried in soy oil / grilled).") +
  `import type { AllergenGuideRow } from "@/lib/types";\n\nexport const allergenGuideRows: readonly AllergenGuideRow[] = [\n` +
  AROWS.map((r) => `  ${j(r)},`).join("\n") + `\n];\n`);
fs.writeFileSync(OUT + "/offering-map.ts", `/**\n * Which official guide row(s) describe each offering (all ${offerings.length} offerings).\n * GENERATED by the research mapper, then reviewed; statuses and notes are\n * explained in docs/product-pages/NUTRITION_DATA_REPORT.md and ALLERGEN_DATA_REPORT.md.\n */\nimport type { AllergenMapping, NutritionMapping } from "@/lib/types";\n\n` +
  `export const offeringNutritionMap: Readonly<Record<string, NutritionMapping>> = {\n` + Object.entries(nutritionMap).map(([k, v]) => `  ${j(k)}: ${j(v)},`).join("\n") + `\n};\n\n` +
  `export const offeringAllergenMap: Readonly<Record<string, AllergenMapping>> = {\n` + Object.entries(allergenMap).map(([k, v]) => `  ${j(k)}: ${j(v)},`).join("\n") + `\n};\n`);
const count = (m) => Object.values(m).reduce((a, v) => ((a[v.status] = (a[v.status] || 0) + 1), a), {});
console.log("nutrition rows", NROWS.length, "allergen rows", AROWS.length);
console.log("nutrition map", count(nutritionMap));
console.log("allergen map", count(allergenMap));
fs.writeFileSync(S + "/maps.json", JSON.stringify({ nutritionMap, allergenMap }, null, 1));
