# Fried Mozzarella: Fact Verification

Page: `/menu/fried-mozzarella` (`content/menu/product-pages/fried-mozzarella.ts`).
Internal record: the reference restaurant may be named here, never on the site.

## 1. Access check on 2026-11-15

| Official source | Result from our network on 2026-11-15 |
|---|---|
| https://www.olivegarden.com/menu/fried-mozzarella/prod2350153 | "Not found" in Chrome; HTTP 403 for fetch/curl |
| https://www.olivegarden.com/ and /menu/appetizers | "Not found" in Chrome |
| https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf | "Access Denied" (Akamai edge) / HTTP 403 |
| Allergen guide PDF, food-allergies page | HTTP 403 |

The official U.S. site appears to block this network. Archive copies were not
used (not permitted in this session). **No new official values could be read
today.** The page therefore uses only the values already verified on
2026-11-11 / 2026-11-12 (below). Re-check from a U.S. network before publishing.

## 2. Verified facts used on the page

| Fact | Value | Source | Checked | Where recorded |
|---|---|---|---|---|
| Official name | Fried Mozzarella | Item page prod2350153 | 2026-11-11 | `research/menu/appetizers/prices.md` |
| Price (online pickup, reference restaurant) | $9.79 | Item page prod2350153 | 2026-11-11 | `content/menu/offerings/appetizers.ts` |
| Calories (one order, as served, without sauce) | 800 | Nutrition PDF p. 2 + ordering page | 2026-11-11 | `research/appetizers/nutrition.md` |
| Included sauce | Marinara, 35 Cal | Nutrition PDF + ordering page ("add marinara 35") | 2026-11-11 | same |
| Serving size | "One appetizer order"; no piece count stated | Item page | 2026-11-11 | `research/appetizers/prices.md` |
| Description basis | Breaded mozzarella, fried, served with marinara | Item page (paraphrased) | 2026-11-11 | `research/menu/appetizers/descriptions.md` |
| Catering tray | "Fried Mozzarella (Serves 4 - 6)", 30 pieces, $32.29, 3,450 Cal | Catering item prod81849 + PDF p. 24 | 2026-11-12 | `research/menu/catering/*` |
| Catering marinara | 110 Cal (not shown on page) | PDF | 2026-11-12 | `research/menu/catering/nutrition.md` |
| Vegetarian label | Not marked (V) on the online menu | Appetizers menu | 2026-11-11 | `research/appetizers/prices.md`, appetizers page |
| Gluten-sensitive menu | Not listed | Gluten-sensitive listing | 2026-11-12 | `research/homepage/nutrition-guide.md` |
| No separate fryer | Official gluten-sensitive page | /nutrition/gluten-sensitive-diet | 2026-11-12 | `research/menu/OFFICIAL_FACTS_LOG.md` |
| Allergen guide based on supplier info; tell server | /nutrition/food-allergies | 2026-11-12 | `research/homepage/nutrition-guide.md` |
| Cross-contact possible | /nutrition/vegetarian-and-vegan-options | 2026-11-12 | `OFFICIAL_FACTS_LOG.md` |
| 2,000 calories a day for general advice | Official menu note | 2026-11-12 | `research/homepage/nutrition-guide.md` |
| Large side of marinara | $9.79, 290 Cal | Item prod15600003 | 2026-11-12 | `content/menu/offerings/sides-sauces-and-extras.ts` |

## 3. Calculations shown (labeled "Calc.")

| Value | Formula |
|---|---|
| Order with marinara | 800 + 35 = 835 Cal |
| Share of 2,000-calorie day | 800 ÷ 2,000 = 40% |
| Catering per piece | 3,450 ÷ 30 = 115 Cal; $32.29 ÷ 30 = $1.08 |
| Catering per guest | $32.29 ÷ 6 = $5.38 to $32.29 ÷ 4 = $8.07 |

## 4. Not verified (not shown as facts)

> **Update 2026-11-18:** the first three rows below are now verified from the
> owner-supplied official PDFs (section 7). The rest stay open.

| Item | Status |
|---|---|
| ~~Total fat, saturated fat, trans fat, cholesterol, sodium, carbohydrates, fiber, sugars, protein~~ | **Verified 2026-11-18** (section 7). Third-party values were never used |
| ~~Allergen marks in the U.S. allergen guide~~ | **Verified 2026-11-18** (section 7) |
| Breading ingredients | The guide marks the whole item (wheat, gluten, dairy, soy); which component carries each allergen is not stated, so the page does not attribute it |
| Piece count of the restaurant order | Not published by Olive Garden |
| Customizations / substitutions | Not verified; page says so |
| Dine-in price | Not checked |

Canadian official guides (olivegarden.ca) exist but describe Canadian
restaurants; not used for this USA-only page.

## 5. Text-to-data check

The build check (`lib/product-pages.ts`) fails if any `$` amount in the page
text is not a current price of this item, its catering tray, or the large
marinara side, or if the meta description lacks the current price/calories.

## 6. Documents requested from the owner (decision 2026-11-15)

| # | Document | Official URL | Needed for |
|---|---|---|---|
| 1 | Olive Garden Nutrition Information, U.S. Restaurants (current PDF; note the footer version code) | https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf | Fried Mozzarella row (fat, saturated fat, trans fat, cholesterol, sodium, carbohydrates, fiber, sugars, protein) and the marinara dipping-sauce row; re-confirms 800 and 35 calories; catering tray row (3,450) |
| 2 | Olive Garden Allergen Guide, U.S. Restaurants (current PDF) | https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf | Fried Mozzarella row marks (milk, egg, wheat, soy, etc.) and any footnotes; marinara row |
| 3 (optional) | Olive Garden Vegetarian and Vegan Menu (PDF) | https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf | Confirms whether Fried Mozzarella is listed as vegetarian |
| 4 (optional) | Screenshot of the current online item page (any U.S. restaurant, pickup) | https://www.olivegarden.com/menu/fried-mozzarella/prod2350153 | Re-confirms price, description and any listed options (substitutions, extra sauce) |

Save PDFs in `research/official-sources/` (git-ignored); entry steps in
`docs/product-pages/NUTRITION_ALLERGEN_DATA.md` §4.

## 7. Official PDF verification (2026-11-18)

Documents: owner-supplied `research/official-sources/olive_garden_nutrition.pdf`
and `allergen_guide.pdf`, both footer code **US_101926** (identical files to
the owner's Downloads copies; SHA-1 70c7033c… and 6cf008e9…). Extracted with
word positions and checked visually against rendered page images.

### Nutrition (page 2, section APPETIZERS)

| Row | Cal | Cal from fat | Fat | Sat fat | Trans | Chol. | Sodium | Carbs | Fiber | Sugars | Protein |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Fried Mozzarella | 800 | 450 | 49 g | 17 g | 0 g | 65 mg | 1,990 mg | 57 g | 4 g | 3 g | 33 g |
| add marinara | 35 | 20 | 2 g | 0 g | 0 g | 0 mg | 320 mg | 4 g | less than 1 g | 2 g | less than 1 g |

Catering (page 24, CATERING PANS (SERVES 4 - 6)): "Fried Mozzarella" 3,450
calories (matches `catering--fried-mozzarella`).

### Calorie verification

| Check | Result |
|---|---|
| Our value (homepage, /appetizers, item page) | 800 (`appetizers--fried-mozzarella`) |
| Official guide | 800, row "Fried Mozzarella", p. 2 |
| Same serving? | Yes: one order, "as-served, unless otherwise noted" (guide p. 1); our basis "per order" |
| Sauce included? | No: marinara is a separate "add marinara" row (35); our data and page say "without sauce" and show 835 as a labeled calculation |
| Preparation | Same item (fried; the allergen guide marks it "fried in soy oil") |
| **Conclusion** | **No conflict. 800 stays; nothing was changed.** The build check now enforces that the homepage, category pages and item page all show the official 800 |

### Allergens (page 2, section APPETIZERS, row "Fried Mozzarella")

Prep: **fried in soy oil** (●). Contains (Y): **dairy, wheat, gluten, soy**.
Not marked: eggs, fish, crustacean, mollusk, tree nuts, peanuts, sesame, sulfites.
Official cross-contact statements (page 1) are shown paraphrased; the
"Note on Soy" sentence is cut off in the PDF itself and is not repeated.

### Page changes

- Nutrition: four macro cards (fat, sodium, carbs, protein) and the full
  11-column table with a "+ Marinara" column; "less than" kept as printed.
- Allergens: official chips + "fried in soy oil (shared fryer)" + "not marked" list + source page.
- Ingredients: "Soybean oil" added from the allergen guide's prep mark; list stays "partial".
- FAQ: calories answer adds 49 g fat, 1,990 mg sodium, 33 g protein (build-checked);
  allergen answer now cites the official marks.
- Quick facts: Protein 33 g (official) replaces the duplicate Category card.

### Still open

- Vegetarian: Olive Garden's vegetarian/vegan PDF not received; the page keeps
  "Not marked (V) on the online menu" (2026-11-11 check).
- Price ($9.79) and catering price ($32.29) were last read on 2026-11-11/12;
  the online menu is still blocked from our network, so they were not re-read.
- Customization options: not verified.

## 8. Owner approval and publication (2026-11-18)

- Owner approved the visual design (desktop + mobile screenshots of 2026-11-18): `visualReview: "done"`, `ownerApprovedAt: "2026-11-18"`.
- Price: $9.79 kept as **last verified November 2026** (read 2026-11-11). Not re-checked; the page claims no fresh check.
- Customization: no options verified, so the customization card and note were removed (owner decision: omit unverified customization information).
- Vegetarian: no suitability claim. The page only states that Olive Garden does not mark the item (V) on the online menu we checked; the "no meat in its description" wording was removed. Vegetarian PDF not received (optional).
- Checks before publishing (all passed): TypeScript, ESLint, production build (content, nutrition and calorie checks), 31 site pages HTTP 200, 30 internal links OK, invalid `/menu/*` URLs 404, `/menu` 308, search entry, same rating key on homepage / Appetizers / Catering / item page, production-deployment mode (`VERCEL_ENV=production`): page 200, linked, in search, `noindex`, sitemap empty.
- Status set to **`published`** after these checks. Indexing remains off until the owner enables `SITE_INDEXING=true` at launch.

