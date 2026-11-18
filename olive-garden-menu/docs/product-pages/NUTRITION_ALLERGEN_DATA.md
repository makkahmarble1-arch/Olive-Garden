# Central Nutrition and Allergen Data

Owner decision 2026-11-15: full nutrition and allergen facts come **only**
from Olive Garden's official U.S. PDFs (supplied by the owner when direct
access fails). Missing data is never invented, estimated, or taken from
third-party calorie sites or the Canadian guides.

**Current data (2026-11-18):** Nutrition Information + Allergen Guide, both
footer code **US_101926**, supplied by the owner on 2026-11-15
(`research/official-sources/`, git-ignored). Reports:
`NUTRITION_DATA_REPORT.md`, `ALLERGEN_DATA_REPORT.md`, `PRODUCT_INVENTORY.md`,
`PRODUCT_ELIGIBILITY_REPORT.md`.

## 1. Files

| File | Holds |
|---|---|
| `content/menu/nutrition/documents.ts` | Official document registry (version code, status, how/when obtained, local copy) + `allergenGuideNotes` (the guide's cross-contact statements, paraphrased) |
| `content/menu/nutrition/nutrition-guide.ts` | **Every** nutrition-guide row once (303): id, page, section, printed label, all 11 columns; "add ..." rows linked by `addOnFor` (GENERATED) |
| `content/menu/nutrition/allergen-guide.ts` | **Every** allergen-guide row once (112): prep marks (fried in soy oil, grilled) + allergen columns marked "Y" (GENERATED) |
| `content/menu/nutrition/offering-map.ts` | For each of the 231 offerings: status + row id(s) + note, for nutrition and allergens (GENERATED, then reviewed) |
| `lib/nutrition-data.ts` | Lookups (`getOfferingNutrition`, `getOfferingAllergens`, `getNutritionRow`, mappings) + build check |
| `research/nutrition-extraction/` | Research scripts: `extract.py` (PDF → rows), `render.py` (page images for visual checks), `build.js` (rows + reviewed decisions → TypeScript), `stats.js` + `reports.js` (reports). PyMuPDF is installed only in a scratch folder, never in the project |

No duplicate records: a row is stored once and referenced by any number of
offerings (e.g. the breadstick row serves four offerings).

## 2. Value rules

- Number exactly as printed; `{ lessThan: n }` for "less than n g/mg" (shown
  as "Less than 1 g", "<1 g" on phones, screen readers hear the full words).
- `null` = the guide prints nothing (shown as "—", read as "Not listed"). Zero is 0.
- Serving basis = the guide's row (e.g. per order as served, per breadstick,
  per pan, per gallon); the offering's `caloriesBasis` must say the same.
- Allergens: only the columns marked "Y". `contains: []` = none marked; never
  shown as "allergen-free". Unmarked columns are listed as "not marked in the guide".

## 3. Mapping statuses

Nutrition: `exact`, `same-item`, `variants`, `conflict`, `generic`, `composite`,
`multi-row`, `not-in-guide`, `not-applicable`. Allergens: `exact`, `same-item`,
`option-dependent`, `composite`, `multi-row`, `not-in-guide`, `not-covered`,
`not-applicable`. Definitions: `NutritionMapping` / `AllergenMapping` in
`lib/types.ts`. Only `exact` and `same-item` rows are shown as an item's
official values.

## 4. Build check (`lib/nutrition-data.ts`)

Fails when: a row id is duplicated or unknown; an "add ..." row has no parent;
a value is negative/invalid; a sub-value (saturated/trans fat, fiber, sugars)
is larger than its total; an offering is missing from either map; a mapped row
does not exist; **an exact/same-item row's calories differ from the calories
shown on the site** (must be marked `conflict` and decided by the owner); a
received document lacks a date or version code.

Item pages add (`lib/product-pages.ts`): included-sauce calories must equal the
official "add ..." row; nutrient numbers in the text ("49 g fat", "1,990 mg
sodium") must equal the official row; publishing needs both official rows.

## 5. New PDF version (step by step)

1. Save the owner's PDFs in `research/official-sources/` (official file names).
2. Run `research/nutrition-extraction/extract.py` (rows), render 3-4 pages with
   `render.py` and compare visually (header columns, a page-break row, an empty row).
3. Re-run `build.js` to regenerate the three data files; review new or changed
   statuses (the build check lists any calorie conflict).
4. Update `documents.ts` (version code, dates), then regenerate the reports
   with `stats.js` + `reports.js`.
5. Update item fact logs (`research/products/<slug>/FACT_VERIFICATION.md`).
6. `npm run build`.

## 6. Rules

- U.S. documents only. Paraphrase notes; never reproduce the guides as tables
  on the site beyond the item's own row.
- Public pages show month and year of the check only.
- Never change existing menu calories to match the guide without owner approval.
