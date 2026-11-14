# Category Development Checklist

Use this list for each of the 17 category pages, **one page at a time**. Start only after the owner has approved that page's SEO outline. Standards: `CATEGORY_CONTENT_STANDARDS.md`. Architecture: `CATEGORY_PAGE_ARCHITECTURE.md`.

## A. Before writing

- [ ] The owner-approved SEO outline exists, covering the primary keyword, semantic cluster, search intent, competitor notes, and content outline.
- [ ] Read `research/seo/categories/<slug>.md` and the page's rows in `KEYWORD_CANNIBALIZATION.md` and `CONTENT_GAPS.md`.
- [ ] Check the category data in `content/menu/offerings/<slug>.ts`:
  - all items present (inventory preserved)
  - verified prices and calories
  - notes for missing values
- [ ] Every fact the outline needs has an official source in `research/menu/<slug>/` (prices, calories, rules, status dates). Anything missing is researched first or left out; it is never guessed.

## B. Content entry (`content/menu/category-pages.ts`)

- [ ] `primaryKeyword` (approved), `secondaryKeywords`, `searchIntent`.
- [ ] `metaTitle`: unique, about 50-60 characters, without "Olive Garden Menu with Prices".
- [ ] `metaDescription`: unique, about 140-160 characters, natural.
- [ ] `h1` (search intent) and `intro` (original, short).
- [ ] `tableCaption`, `priceNotes` (other sizes, price type).
- [ ] `featuredOfferingIds`: 3-5 relevant items with owner images; optional `featuredHeading`.
- [ ] `sections` with H2s from the outline; comparison blocks where they help.
- [ ] `comparisons`:
  - rows by offering id
  - `servings` from the official serving size for any per-serving value
  - a note explaining the method
- [ ] `nutritionNotes` (units: per item, per bundle, per bottle).
- [ ] `faqs`: original, based on observed questions, dated where things change, not repeated elsewhere.
- [ ] `related`: contextual links, each with a reason.
- [ ] `sources`: the official pages and PDFs actually used.
- [ ] `contentReviewedAt`: today's date.

## C. Publishing workflow

1. [ ] Set the category's `contentStatus` to `"preview"` in `content/menu/categories.ts`. The page goes live in development and stays noindex.
2. [ ] `npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass (the build also runs the category content checks).
3. [ ] Browser check at 1280, 820, 390, and 340 px:
   - one H1 and a logical H2/H3 order
   - no horizontal page overflow; wide tables scroll inside their box
   - table header olive with white text, alternating rows
   - 3-5 photos load (no broken images), and the rating rows show
   - the FAQ accordion opens with mouse and keyboard
   - "Calc." appears on calculated cells
   - links work (no `/menu` links; related pages or homepage sections exist)
4. [ ] View source: a self-canonical `/<slug>`, `noindex` while in preview, valid JSON-LD (BreadcrumbList and FAQPage only).
5. [ ] Owner review of the preview.
6. [ ] With owner approval only: set `contentStatus` to `"published"`. The page becomes indexable when `SITE_INDEXING=true` and is added to the sitemap automatically.
7. [ ] Update `research/` (sources, dates), `CATEGORY_PAGE_ARCHITECTURE.md` §6 (status), and `IMAGE_MANIFEST.md` if image use changed.
8. [ ] Commit only when the owner asks. Do not deploy or push without approval.

## D. After a menu data update

- [ ] Prices and calories update everywhere automatically (shared data). Re-read the page text for sentences that mention specific numbers or dates, and refresh `contentReviewedAt`.
- [ ] Re-check promotion and limited-time statements and their dates.

## E. Batch status

### Batch 1 (Lesson 8.4, 2026-11-13)

| Page | Status | Checks done |
|---|---|---|
| `/family-style-meals` | Published | 23/23 table rows, prices = production data, 5 photos, 3 comparisons (servings, cost per person 4/6, pans), 5 FAQs |
| `/appetizers` | Published (rewritten) | 10/10 rows, prices match, 5 photos, 3 comparisons (sauces, calories, restaurant vs catering), 5 FAQs |
| `/classic-entrees` | Published | 28/28 rows, prices match, 5 photos, 4 comparisons (types, 2 portion ladders, budget), 5 FAQs |
| `/buy-one-take-one` | Published | 7/7 rows (3 current $6 items, 4 "not on the current offer"), no photo cards or ratings (promotion page), 1 comparison, status dated 2026-11-13 |
| `/amazing-alfredos` | Published | 5/5 rows, prices match, 5 photos, 5 comparisons (dishes, spicy vs regular, portions, family, extra sauce), 5 FAQs |

All five pages had the same checks:

- **Page structure:** one H1, the outline H2s in order, and a self-canonical.
- **Indexing:** `noindex` (the site-wide indexing switch is off).
- **Structured data:** WebPage, BreadcrumbList, and FAQPage only.
- **Images and links:** 0 broken images, 0 images without alt text; internal links go to live pages or homepage sections.
- **Layout:** no page overflow at 1280 and 390 px.
- **Build:** TypeScript, lint, and the production build pass.

Owner decisions of 2026-11-13 (all approved):

- [x] The 4 preview pages are published.
- [x] Homepage FAQs "Do entrées come with soup or salad and breadsticks?" and "What is the $6 Take Home offer?" keep a short answer and link to `/classic-entrees` and `/buy-one-take-one`.
- [ ] Remove the 2 development test votes: the owner runs `supabase/maintenance/2026-11-13_remove_dev_test_votes.sql` in the Supabase SQL Editor. This cannot be done from the code: no API key can reach `ratings_private`, by design.
- [ ] Before launch: re-check the Buy One Take One status and the $6 Take Home terms in a browser, and update the dates. Automated fetches of olivegarden.com return HTTP 403; the last check was 2026-11-13.

### Batch 2 (Lesson 8.4, 2026-11-13)

| Page | Status | Checks done |
|---|---|---|
| `/soups-salad-and-breadsticks` | Preview | 6/6 table rows, prices = production data, 5 photos, 11 rating rows; lunch vs regular ($9.99 vs $13.49), 4-soup comparison (per-bowl calories + calculated meal total), family soup sizes; 6 FAQs |
| `/lighter-portions` | Preview | 8/8 rows, 5 photos, 13 rating rows; three-way regular / lighter / lunch table (9 rows), calorie difference, lighter vs lunch, savings table; 6 FAQs |
| `/create-your-own-pasta` | Preview | Base meal row (shared Classic Entrées rating) + 23/23 build options in 4 separate tables (5 pastas, 5 sauces, 7 toppings, 6 first-course items), 6 calculated meal examples, 5 lower-calorie builds, station comparison; 6 FAQs |
| `/lunch-menu` | Preview | 17/17 rows (incl. 3 sandwiches, 3 flatbreads), 5 photos, 22 rating rows; sandwiches/flatbreads table, lunch vs dinner (12 rows), under-$11 and lower-calorie tables; 6 FAQs |

All four pages had the same checks:

- **Page structure:** one H1, the outline H2s in order, self-canonical, `noindex, follow`, not in the sitemap.
- **Structured data:** WebPage, BreadcrumbList, and FAQPage only (no rating schema).
- **Images and links:** 16 images return 200, 0 broken, 0 without alt text; internal links go to live pages or homepage sections.
- **Browser (headless Edge):** no page overflow at 1280 and 390 px; wide tables scroll inside their box; FAQ opens by mouse and keyboard; 0 script errors.
- **Calculations:** every calculated cell re-checked against the shared data (savings, percentages, calorie differences, pasta build totals). Two calculated builds equal official items exactly: spaghetti + meat sauce + 3 meatballs = Spaghetti & Meatballs ($18.48, 1,120); gluten-free rotini + marinara / meat sauce = the gluten-sensitive Rotini dishes (530 / 680).
- **Build:** TypeScript, lint, and the production build pass.

New reusable pieces (documented in `CATEGORY_PAGE_ARCHITECTURE.md`): comparison `refs` + `refDifference` (same dish in other sizes), `optionTables` and `pastaBuilds` (Create Your Own Pasta data), `tableOfferingIds` (category without its own offerings).

Open points for the owner:

- [ ] Owner visual review of all four pages, then approval. Until then they stay local previews: not approved for production or indexing (owner, 2026-11-13).
- [x] `/classic-entrees` FAQ "What is the difference between regular and lighter portions?" overlapped `/lighter-portions`. Replaced (owner instruction 2026-11-13) with "What types of dishes are included in Olive Garden's Classic Entrees menu?", answered from the 28-item inventory. Nothing else on the page changed.
- [ ] Limited-time items need a re-check before launch: $9.99 Never-Ending Soup, Salad & Breadsticks, Spicy Alfredo, Crispy Shrimp Fritta, Never-Ending Pasta Bowl (all last checked 2026-11-12/13).
- [ ] Not verified, so the pages say so: refills on the $13.49 soup, salad and breadsticks meal; whether lunch sandwiches and flatbreads include soup or salad; whether lighter portions are served on holidays.
- [x] **Homemade Soups photo: replaced 2026-11-14** with the owner's four soup photos (2×2 composite on all 5 cards, single photos in a gallery on `/soups-salad-and-breadsticks`; `docs/MISSING_IMAGES.md` section 0). History: It shows a cheese soup with bacon that is not on the menu. No correct photo of the four soups exists (only a single Zuppa Toscana photo), so nothing was substituted. Owner decision 2026-11-13 (Option B): the image is removed everywhere; all 5 Homemade Soups cards (homepage soups, family-style, and catering sections) show the "Photo coming soon" placeholder, and `/soups-salad-and-breadsticks` shows no Homemade Soups photo card. The original file is kept until the replacement is approved. Steps when the new photo arrives: `docs/MISSING_IMAGES.md` section 0.
- Development test votes: left as they are (owner decision 2026-11-13).

### Batch 3 (Lesson 8.4.5, 2026-11-14)

All five pages follow the owner-approved public display standards of 2026-11-13 (USA only, month-and-year dates, short Sources, Related Menus with real titles).

| Page | Status | Checks done |
|---|---|---|
| `/desserts` | Preview | 7/7 rows, 5 photos, 12 rating rows; dessert comparison (calories vs Tiramisu), individual vs catering half/whole cakes (per-serving Calc.), seasonal, birthday (official FAQ), 6 FAQs |
| `/drink-menu` | Preview | 13/13 to-go drinks, 5 photos, 18 rating rows; drink-type hub table, the 8 official dine-in cocktails named without prices, wine & beer summary + link, sizes table (single, 2-liter, gallon, 1-liter water); 5 FAQs |
| `/sides-sauces-and-extras` | Preview | 12/12 rows, 5 photos, 16 rating rows (Cheese Grater: merchandise, no rating via `noRatingOfferingIds`); large sauces, protein sides vs pasta-topping prices, sauce sizes, customization examples; 6 FAQs |
| `/non-alcoholic-beverages` | Preview | 14/14 rows, 5 photos, 19 rating rows; lemonade comparison, teas and coffee, fewest-to-most calories (incl. catering waters), one drink vs one gallon; refills and mocktails stated as not verified / not listed; 6 FAQs |
| `/wine-and-beer-to-go` | Preview | 20/20 rows (14 wines, 6 beers), 5 photos, 25 rating rows; beers, wines by style, calories per bottle/beer, to-go steps and restrictions (no legal claims); 6 FAQs |

All five pages had the same checks:

- **Page structure:** one H1, the outline H2s in order, self-canonical, `noindex, follow`, not in the sitemap.
- **Structured data:** WebPage, BreadcrumbList, and FAQPage only (no rating schema).
- **Global standards:** 0 location words (Orlando, Florida, Millenia, address, phone) and 0 full dates in visible text; Sources box with 1-2 official links; Related Menus link only to live pages (all HTTP 200, none to itself).
- **Browser (headless Edge):** no page overflow at 1280 and 390 px; 25 images, 0 broken, 0 without alt text; FAQ opens by mouse and keyboard; 0 script errors.
- **Build:** TypeScript, lint, and the production build pass (26 static pages).

New reusable piece: `noRatingOfferingIds` (table rows without a visitor rating, e.g. merchandise; validated, never a photo card).

Open points for the owner:

- [ ] Owner visual review and approval of the five previews (not approved for production or indexing).
- [ ] Sides FAQ: the requested question "Can you order extra Alfredo sauce?" already exists on `/amazing-alfredos` (Batch 1), so the build rejects it. Used "How much is extra Alfredo sauce at Olive Garden?" (an observed search) instead.
- [ ] Drink menu meta description (owner wording) mentions sangria. Sangria was not on the official cocktails page or the to-go menu we checked; the page says so. Keep the wording, or remove "sangria"?
- [ ] Images not featured because they differ from the official item (all owner AI or supplied images, still used on the homepage and in tables): Side of Meatballs (4 meatballs; official 3), 2-Liter Soda (5 flavors; official Coke, Diet Coke, Sprite), Warm Italian Doughnuts (cream sauce; official raspberry or chocolate), Cappuccino (cocoa; official whipped cream and cinnamon). Replace them?
- [ ] Homepage: the Cheese Grater card still shows a visitor rating there (homepage not changed). Remove it on the homepage too?
- [ ] Not verified, so the pages say so: drink refill policy, mocktails, cocktail prices, wine-by-the-glass and draft prices, wine bottle and beer container sizes, which desserts qualify for the birthday dessert.
- [ ] Re-check before launch: Pumpkin Cookie Butter Cheesecake (limited time), Mango-Passion Fruit Iced Tea (currently unavailable), Crispy Shrimp Fritta (limited time), cocktail list.

### Batch 3 (Lesson 8.4.5, 2026-11-14)

| Page | Status | Checks done |
|---|---|---|
| `/desserts` | Preview | 7/7 rows, prices = production data, 5 photos, 12 rating rows; dessert comparison (calories vs Tiramisu), individual vs catering half/whole cakes (per-serving Calc.), seasonal note, birthday dessert (official FAQ only); 6 FAQs |
| `/drink-menu` | Preview | 13/13 rows, 5 photos, 18 rating rows; drink-type hub table, dine-in cocktail names without prices, wine/beer summary + links, sizes table (single / 2-liter / gallon / 1-liter water); 5 FAQs |
| `/sides-sauces-and-extras` | Preview | 12/12 rows, 5 photos, 16 rating rows (Cheese Grater shown without a rating: merchandise, `noRatingOfferingIds`); large sauces, protein sides vs pasta toppings, sauce sizes, customization examples (Calc.); 6 FAQs |
| `/non-alcoholic-beverages` | Preview | 14/14 rows, 5 photos, 19 rating rows; lemonades compared, teas and coffee, lowest-calorie list, one drink vs one gallon; refill policy and mocktails stated as not verified / not listed; 6 FAQs |
| `/wine-and-beer-to-go` | Preview | 20/20 rows (14 wines, 6 beers), 5 photos, 25 rating rows; wines by style, beer table, calories per bottle/beer (no per-glass math: bottle size not stated), to-go and age rules; 6 FAQs |

All five pages had the same checks:

- **Global standards (2026-11-13):** no reference location in public text, month-and-year verification dates only, short "Sources" box (1-2 official links), "Related Menus" with real article titles and only live pages.
- **Page structure:** one H1, outline H2s in order, self-canonical, `noindex, follow`, not in the sitemap; WebPage, BreadcrumbList, and FAQPage only.
- **Browser (headless Edge):** no page overflow at 1280 and 390 px; 25 images, 0 broken, 0 without alt text; FAQ opens by mouse and keyboard; 0 script errors; Related Menus links all return 200.
- **Build:** TypeScript, lint, and the production build pass (the build caught a duplicate FAQ, see below).

Open points for the owner:

- [ ] Owner visual review of all five pages before approval (they stay local previews).
- [x] (Owner approved 2026-11-14) The requested Sides FAQ "Can you order extra Alfredo sauce?" already exists on `/amazing-alfredos` (Batch 1), and the build rejects duplicate FAQs. The Sides page uses "How much is extra Alfredo sauce at Olive Garden?" instead.
- [x] Drink Menu meta description: "sangria" removed (owner approved 2026-11-14); sangria was not on the cocktails page or the to-go menu we checked.
- [ ] Cocktail prices, wine-by-the-glass and draft beer prices, drink refill policy, birthday dessert details beyond "complimentary when dining in", and wine bottle / beer container sizes are not published online: the pages say so instead of guessing.
- [ ] Image notes, replacement photos to be supplied by the owner (not featured as photo cards, still shown in tables and on the homepage): Side of Meatballs shows 4 meatballs (official: 3); 2-Liter Soda shows 5 flavors (official: Coke, Diet Coke, Sprite); Warm Italian Doughnuts shows a cream sauce (official: raspberry or chocolate); Cappuccino shows cocoa (official: whipped cream and cinnamon). Optional replacements.
- [x] Homepage Cheese Grater rating widget: keep as it is (owner decision 2026-11-14); only the Sides page hides it.
- [ ] Limited-time items to re-check before launch: Pumpkin Cookie Butter Cheesecake, Side of Crispy Shrimp Fritta; Mango-Passion Fruit Iced Tea was "currently unavailable".

### Batch 4 (Lesson 8.4.6, 2026-11-14)

| Page | Status | Checks done |
|---|---|---|
| `/gluten-sensitive` | Preview | 10/10 rows, 5 photos, 15 rating rows; cross-contact warning above the table; GS vs regular comparison (6 rows), (G) Create Your Own Pasta choices, kids GS meals, breadsticks, GS vs gluten-free, allergen steps, how to order; 6 FAQs. Only official wording ("gluten-sensitive"; "gluten-free" only for the rotini); no safety guarantee |
| `/kids-meal` | Preview | 11/11 rows, 5 photos, 16 rating rows; comparison with "what the calories cover" (sauce only vs main dish), sides (PDF values) and drinks, calculated full-meal examples, both official age wordings, no invented kids-eat-free offer; 7 FAQs |
| `/catering` | Preview | 40/40 rows, 5 photos, 45 rating rows; packages and per person (Calc.), 13 pans per person, headcount plans for 10/20/50/100 (`servingPlans`: units rounded up from the smaller serving number, food subtotal only), extras, delivery rules (official), catering vs Family Style; 9 FAQs |

All three pages: one H1, outline H2s (and the four catering H3s) in order, self-canonical, `noindex, follow`, not in the sitemap; WebPage, BreadcrumbList, and FAQPage only; no page overflow at 1280 and 390 px; 15 images, 0 broken, 0 without alt text; FAQ opens by mouse and keyboard; 0 script errors; global standards (USA, month-year, short Sources, Related Menus) checked on all 18 public pages. TypeScript, lint, and the production build pass (29 static pages).

Data correction (verified evidence): the gluten-sensitive 6 oz. Sirloin description said "served with fettuccine alfredo"; the official gluten-sensitive item comes with parmesan garlic broccoli (480 cal). Fixed in `content/menu/offerings/gluten-sensitive.ts`, recorded in `research/menu/gluten-sensitive/descriptions.md`. This also corrects the homepage card text.

Open points for the owner:

- [x] Owner approved the three pages for completed local development (2026-11-14). They keep `contentStatus: "preview"` (noindex) until the owner approves publishing.
- [x] Catering FAQ replaced (owner decision 2026-11-14) with "Can I combine different Olive Garden catering trays for a large event?", answered only from verified catering facts (separate items, station limits, $350 phone rule, $100 delivery minimum).
- [x] Incorrect images removed site-wide (owner decision 2026-11-14): gluten-sensitive Grilled Chicken Parmigiana, 6 oz. Sirloin, Herb-Grilled Salmon, and Lasagna Combination now show the placeholder; on `/classic-entrees` the Herb-Grilled Salmon photo card was replaced by Shrimp Scampi. Replacements: `MISSING_IMAGES.md` section 00. Original notes: gluten-sensitive Grilled Chicken Parmigiana photo shows fettuccine in cream sauce (official: gluten-free rotini with marinara) — important to replace on a gluten-sensitive item; 6 oz. Sirloin photo shows mashed potatoes (gluten-sensitive version: broccoli); Herb-Grilled Salmon photo also shows mashed potatoes; Lasagna Combination photo shows chicken parmigiana (not part of that package); most kids photos show carrots, which are not an official kids side.
- [ ] Not published online, so the pages say so instead of guessing: a pickup minimum for catering, how the 10% / 5% delivery fee is calculated, adult ordering of kids meals, kids-eat-free offers.
- [ ] Re-check before launch: catering "starting at" per-person prices and delivery rules (checked 2026-11-13), limited-time Pumpkin Cookie Butter Cheesecake.

## F. Status of all 17 category pages (2026-11-14)

All 17 pages are content-complete and development-complete (owner approval of Batch 4 on 2026-11-14). Pre-launch noindex stays on for every page.

| # | Page | Status |
|---:|---|---|
| 1 | `/family-style-meals` | Published (Batch 1) |
| 2 | `/appetizers` | Published (Batch 1) |
| 3 | `/classic-entrees` | Published (Batch 1) |
| 4 | `/buy-one-take-one` | Published (Batch 1) |
| 5 | `/amazing-alfredos` | Published (Batch 1) |
| 6 | `/soups-salad-and-breadsticks` | Preview (Batch 2) |
| 7 | `/lighter-portions` | Preview (Batch 2) |
| 8 | `/create-your-own-pasta` | Preview (Batch 2) |
| 9 | `/lunch-menu` | Preview (Batch 2) |
| 10 | `/desserts` | Preview (Batch 3) |
| 11 | `/drink-menu` | Preview (Batch 3) |
| 12 | `/sides-sauces-and-extras` | Preview (Batch 3) |
| 13 | `/non-alcoholic-beverages` | Preview (Batch 3) |
| 14 | `/wine-and-beer-to-go` | Preview (Batch 3) |
| 15 | `/gluten-sensitive` | Preview (Batch 4) |
| 16 | `/kids-meal` | Preview (Batch 4) |
| 17 | `/catering` | Preview (Batch 4) |

"Published" pages become indexable only when `SITE_INDEXING=true` is set at launch (owner approval). Preview pages stay `noindex` until the owner approves publishing them.
