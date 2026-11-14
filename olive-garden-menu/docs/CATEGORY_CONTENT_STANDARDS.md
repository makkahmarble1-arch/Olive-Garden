# Category Content Standards

**Applies to:** all 17 category pages (Lesson 8). **Audience:** whoever writes or reviews page text.
Architecture: `CATEGORY_PAGE_ARCHITECTURE.md`. Research: `research/seo/` (keyword map, cannibalization, content gaps, 17 category files).

## 1. Approved page focus (primary keywords)

| URL | Primary keyword | Distinct job (from `research/seo/KEYWORD_CANNIBALIZATION.md`) |
|---|---|---|
| `/family-style-meals` | Olive Garden Family Style Meals | Feeding a household at home (4-12): bundles vs pans, cost per person |
| `/appetizers` | Olive Garden Appetizers Menu | Every starter by price, calories, dipping sauce |
| `/classic-entrees` | Olive Garden Classic Entrees | Regular dinner list, what's included, portion ladder links |
| `/buy-one-take-one` | Olive Garden Buy One Take One | Date-stamped promotion status + current take-home rules |
| `/amazing-alfredos` | Olive Garden Alfredo Menu | All Alfredo dishes compared; Alfredo in every size |
| `/soups-salad-and-breadsticks` | Olive Garden Soup Salad and Breadsticks | First course: regular vs weekday price, refill rules, soup calories |
| `/lighter-portions` | Olive Garden Lighter Portions Menu | Owns the regular vs lighter vs lunch comparison |
| `/create-your-own-pasta` | Olive Garden Create Your Own Pasta | Builder options with add-on prices; calculated example builds |
| `/lunch-menu` | Olive Garden Lunch Menu | Weekday 11 AM-3 PM lineup; weekend answer |
| `/desserts` | Olive Garden Dessert Menu | All desserts, seasonal items, slice vs catering tray |
| `/drink-menu` | Olive Garden Drink Menu | Hub of drink types; routes to the two drink pages |
| `/sides-sauces-and-extras` | Olive Garden Sides Menu | Add-ons and extras with price, calories, size |
| `/non-alcoholic-beverages` | Olive Garden Non Alcoholic Drinks | Detailed alcohol-free reference |
| `/wine-and-beer-to-go` | Olive Garden Wine and Beer Menu | To-go bottles and beers; 21+ rules |
| `/gluten-sensitive` | Olive Garden Gluten Free Menu | Ordering guide; official wording "gluten-sensitive" and exact cautions |
| `/kids-meal` | Olive Garden Kids Menu | Parents' guide: price, calories, what's included, honest answers |
| `/catering` | Olive Garden Catering Menu | Events by headcount, delivery rules, planner |

URL slugs never change, even when the searched phrase differs (e.g. `/kids-meal` vs "kids menu"). The H1 and title can carry the searched phrase.

## 2. Required on every page

- A unique primary keyword, meta title, meta description, and H1 (checked at build).
- A **search-intent H1**: answer what the visitor came for. The H1 does not need to equal the keyword.
- A concise original intro (2 short paragraphs is usually enough) that says what the page answers. Never reuse homepage or other category paragraphs.
- The complete price and calorie table of the category (automatic, from shared data).
- **3-5 relevant food images** (`featuredOfferingIds`). Only owner-supplied images from `IMAGE_MANIFEST.md`; pick items that match the page's job.
- **Category-specific helpful sections**, chosen from the research gaps for this page (`research/seo/CONTENT_GAPS.md`). Typical examples:
  - what's included
  - availability and time windows
  - comparisons
  - how to order
  - official cautions
- **Comparisons** only where they help a decision, built as `comparisons` from shared data. Calculations are labeled "Calc." automatically.
- **Original FAQs** based on observed search questions (`[Observed]` items in the category research). Each answer is short, factual, and dated where things change. FAQ questions must not repeat the homepage or another category (checked at build).
- **Contextual internal links** with a reason (use the internal-link table in `CONTENT_GAPS.md`), plus the related-category cards.
- **Verification facts** (automatic): "Last verified: Month Year", ordering type, USA price-variation note, one official source (+ at most one extra), independent-site disclaimer. Set `contentReviewedAt` when the text is reviewed.

### Public display standards (owner-approved 2026-11-13, permanent)

- **No reference location in public text.** Never write Orlando, Florida, Millenia Mall, an address, or "our Orlando reference restaurant". Say "for online pickup", "at the prices we verified", or "the restaurant we checked", and add "Prices may vary by location across the USA." where prices are stated. Do not imply that every restaurant has the same price.
- **Month and year only** for verification dates in text and FAQs: "when we checked in November 2026", "as of November 2026". Never a day. Never move the month forward without a real re-check.
- **Sources:** keep the full list in `sources` (internal). Choose `officialSource` (website or nutrition PDF) and add `extraSource` only for a promotion, status, or dietary claim that needs its own official page.
- **Related Menus:** list the contextually relevant menus in `related` with a short reason; the card title comes from the target's `menuTitle`. Entries for unfinished pages may stay in the list; they appear once that page is live.

## 3. Keyword use

- Use the primary keyword naturally in the title, H1 (or a close variant), and the first paragraph. Do not force it into every heading.
- Cover the semantic cluster by **answering** its questions, not by listing words.
- Never use "Olive Garden Menu with Prices" as a category title or H1 phrase (the homepage owns it; checked at build).
- Year modifiers ("2026") only on pages that are re-checked for that year.
- Do not target copycat recipes, coupons, menu PDFs, or other out-of-scope intents (`KEYWORD_MASTER_MAP.md`, notes).

## 4. Accuracy (from `CLAUDE.md`, never relaxed)

- No invented prices, calories, descriptions, availability, promotions, or "best/most popular" claims. "Best" questions are answered with genuine visitor ratings or not at all.
- Each value has one basis: official, calculated (labeled, parts shown), or estimated (labeled). Never present a calculation or estimate as official.
- Use official wording: "gluten-sensitive" (the rotini is "gluten-free"), "(V)", "serves 4-6".
- Promotions and limited-time items carry a date ("as of November 13, 2026").
- No health, weight-loss, or allergy-safety claims. Point to the official nutrition and allergen guides.
- The site is independent: never imply it is Olive Garden.

## 5. Length and structure

- No minimum word count. A section exists only if it helps the visitor's task for this page.
- H2 for each section, H3 only inside a section when needed, no skipped levels.
- Short paragraphs (2-4 sentences), plain US English, no filler ("In today's world…"), no keyword stuffing, no repeated disclaimers inside the text (the layout adds them).
- Tables for numbers, lists for steps or options, notes for official cautions.

## 6. Overlapping pages: how to stay distinct

| Pair | Rule |
|---|---|
| Drink Menu vs Non-Alcoholic | Drink Menu = hub (compact list, routes). Non-Alcoholic = the detailed reference (sizes, calories, sugar or caffeine questions) |
| Family-Style vs Catering | Household dinner (cost per person) vs events by headcount (packages, delivery, planner). Shared pans appear on both, framed differently; each links once to the other |
| Classic Entrees vs Alfredos | Entrées list all dishes, with no Alfredo comparison. Alfredos page owns the comparison and every size |
| Lunch vs Lighter Portions | Lunch owns the weekday window. Lighter owns the three-way comparison; Lunch links to it in one sentence |
| Gluten Sensitive vs others | Only the gluten page targets "gluten free". Others add a one-line note with a link |
| Homepage vs all | Category pages add depth (comparisons, rules, planners, specific FAQs) and never copy homepage text |
