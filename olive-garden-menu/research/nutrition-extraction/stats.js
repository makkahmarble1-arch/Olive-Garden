/* eslint-disable -- Node research script (CommonJS), not app code. */
// Product-level inventory statistics for the reports (research helper).
const S = process.argv[2];
const ROOT = process.argv[3];
const fs = require("fs");
const { createJiti } = require(ROOT + "/node_modules/jiti");
const j = createJiti(ROOT + "/x.js", { alias: { "@": ROOT } });
const { menuOfferings } = j(ROOT + "/content/menu/offerings/index.ts");
const { menuProducts } = j(ROOT + "/content/menu/products.ts");
const { offeringNutritionMap: N, offeringAllergenMap: A } = j(ROOT + "/content/menu/nutrition/offering-map.ts");
const { nutritionGuideRows } = j(ROOT + "/content/menu/nutrition/nutrition-guide.ts");
const { allergenGuideRows } = j(ROOT + "/content/menu/nutrition/allergen-guide.ts");
const { productPages } = j(ROOT + "/content/menu/product-pages/index.ts");

const SHOW = new Set(["exact", "same-item"]);
const rows = menuProducts.map((p) => {
  const offs = menuOfferings.filter((o) => o.productId === p.id);
  const nut = offs.filter((o) => SHOW.has(N[o.id]?.status));
  const alg = offs.filter((o) => SHOW.has(A[o.id]?.status));
  const conflicts = offs.filter((o) => N[o.id]?.status === "conflict");
  const variants = offs.filter((o) => N[o.id]?.status === "variants");
  const priced = offs.some((o) => o.status === "verified" && o.prices.length > 0 && o.calories !== null);
  const image = !!p.image;
  const available = offs.some((o) => ["available", "limited-time", "location-dependent"].includes(o.availability));
  const limited = !offs.some((o) => o.availability === "available") && offs.some((o) => o.availability === "limited-time");
  const variantReady = offs.some((o) => N[o.id]?.status === "variants" && (N[o.id].variantRowIds?.length || 0) > 0) && offs.some((o) => A[o.id]?.status === "option-dependent");
  const nStat = [...new Set(offs.map((o) => N[o.id]?.status))].join("/");
  const aStat = [...new Set(offs.map((o) => A[o.id]?.status))].join("/");
  // Eligibility tiers (PRODUCT_CONTENT_CHECKLIST gates 1, 3, 5): data-ready = priced + photo + an offering with BOTH official rows.
  const both = offs.filter((o) => SHOW.has(N[o.id]?.status) && SHOW.has(A[o.id]?.status));
  const page = productPages.find((x) => x.productId === p.id);
  let tier;
  if (page) tier = `page (${page.status})`;
  else if (!priced) tier = "not eligible: no verified price/calories";
  else if (!available) tier = "not eligible: not currently available";
  else if (both.length && image && conflicts.length === 0) tier = limited ? "A: data-ready (limited time)" : "A: data-ready";
  else if (variantReady && image) tier = "V: official rows per version";
  else if ((nut.length || alg.length) && image) tier = "B: partial official data";
  else tier = "C: no single official row";
  return { id: p.id, limited, name: p.name, offerings: offs.length, nut: nut.length, alg: alg.length, both: both.length, conflicts: conflicts.length, variants: variants.length, image, priced, available, nStat, aStat, tier, categories: [...new Set(offs.map((o) => o.categoryId))].join(", ") };
});
const count = (f) => rows.filter(f).length;
const tiers = rows.reduce((a, r) => ((a[r.tier] = (a[r.tier] || 0) + 1), a), {});
const summary = {
  products: rows.length,
  offerings: menuOfferings.length,
  nutritionRows: nutritionGuideRows.length,
  nutritionAddOnRows: nutritionGuideRows.filter((r) => r.addOnFor).length,
  allergenRows: allergenGuideRows.length,
  productsWithNutrition: count((r) => r.nut > 0),
  productsWithAllergens: count((r) => r.alg > 0),
  productsWithBoth: count((r) => r.both > 0),
  productsWithConflict: count((r) => r.conflicts > 0),
  productsWithNeither: count((r) => r.nut === 0 && r.alg === 0),
  offeringsNutrition: Object.values(N).reduce((a, v) => ((a[v.status] = (a[v.status] || 0) + 1), a), {}),
  offeringsAllergen: Object.values(A).reduce((a, v) => ((a[v.status] = (a[v.status] || 0) + 1), a), {}),
  tiers,
};
fs.writeFileSync(S + "/stats.json", JSON.stringify({ summary, rows }, null, 1));
console.log(JSON.stringify(summary, null, 1));
