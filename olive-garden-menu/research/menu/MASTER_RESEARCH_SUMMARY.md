# Master Research Summary

**Last updated:** 2026-11-12 (final, after owner Decisions 1-4)
**Reference restaurant:** Olive Garden Orlando - Millenia Mall, 4101 Conroy
Road, Orlando, FL 32839 ([official page](https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614)),
online ordering, Order Type: Pickup.
**Rules:** `docs/MENU_RESEARCH_PLAN.md`. Research only: `content/menu/` and
the website are unchanged until the owner approves integration.

## Status: final for all 17 categories

| # | Category | Offerings (new) | Official prices | Calories: official + calculated | PDF cross-check (match / differs) | Descriptions | Limitations |
|---:|---|---:|---:|---:|---|---:|---|
| 1 | Family-Style Meals | 23 (3) | 22 | 22 | 16 / 1 | 22 | Large Salad not on the menu; bundles not in the PDF |
| 2 | Appetizers | 10 | 10 | 9 + 1 | 10 / 0 | 10 | — |
| 3 | Classic Entrees | 28 (1) | 28 | 28 | 27 / 0 | 28 | 3 option prices not captured |
| 4 | Buy One Take One | 7 | 3 ($6 promo add-on) | 0 | not in PDF | 5 | Official offer is "$6 Take Home Entrées"; 4 items not eligible |
| 5 | Amazing Alfredos | 5 | 5 | 5 | 5 / 0 | 5 | — |
| 6 | Soups, Salad and Breadsticks | 6 | 6 | 5 + 1 | 6 / 0 | 6 | Lunch hours conflict (2:30 vs 3 PM) |
| 7 | Lighter Portions | 8 (1) | 8 | 8 | 8 / 0 | 8 | — |
| 8 | Create Your Own Pasta | 0 + 23 options | base + 7 add-ons | 22 of 23 options | components match (1 differs) | 1 | — |
| 9 | Lunch Menu | 17 (7) | 17 | 17 | 17 / 0 | 17 | — |
| 10 | Desserts | 7 (1) | 7 | 7 | 6 / 1 (PDF used) | 7 | — |
| 11 | Drink Menu | 13 (1) | 13 | 13 | 10 / 2 (PDF used) | 13 | Mango tea "currently unavailable"; sweet tea not in PDF |
| 12 | Sides, Sauces and Extras | 12 (3) | 12 | 11 | 10 / 1 | 12 | Cheese Grater has no calories |
| 13 | Non-Alcoholic Beverages | 14 (1) | 14 | 14 | 11 / 2 (PDF used) | 14 | Same as Drink Menu |
| 14 | Wine & Beer To Go | 20 (1) | 20 | 20 | 13 / 7 (PDF generic only) | 20 | Bottle/can sizes not stated |
| 15 | Gluten Sensitive | 10 | 10 | 10 | 10 / 0 | 10 | 3 entries are officially kids meals |
| 16 | Kids Meal | 11 | 11 | 11 | 10 / 0 | 11 | Kids side calories: PDF 40-290 vs menu 35-250 |
| 17 | Catering | 40 (2) | 40 | 40 | 35 / 3 | 40 | Catering cakes and combinations not in the PDF |
| | **Total** | **231 (21 new)** | **226** | **220 + 2** | **193 match, 8 resolved with the PDF, 2 conflicts kept, 7 generic, 20 not in the PDF, 1 components** | **228** | 5 entries not on the menu |

## Totals

| Measure | Value |
|---|---:|
| Categories | 17 |
| Owner inventory entries | 210 (all kept) |
| New official items added (Decision 3) | 21 offerings / 16 products |
| **Total offerings** | **231** |
| **Unique products** | **146** |
| Official prices | 226 (3 of them are $6 promotional add-ons, kept separate from regular prices) |
| Official calorie values | 220 (8 of them corrected to the nutrition-PDF value) |
| Calculated values (labeled) | 2 calorie values + 14 calculated totals |
| Estimated (third-party) values | 0 |
| Original descriptions | 228 (3 entries have no official dish to describe) |
| Create Your Own Pasta option records | 23 |
| Unique food photos | 129 (7 usable, 3 need replacement, 119 to supply) |

## Owner decisions applied

**Round 1 (2026-11-12):** problem photos marked for replacement; Create Your
Own Pasta options added; alias cases A1-A17 decided (`ALIAS_MAPPING.md`).

**Round 2 (2026-11-12):**
1. **Buy One Take One:** the official current offer "$6 Take Home Entrées"
   is confirmed (specials page + ordering page). 3 eligible items carry the
   $6 promotional add-on price with the offer conditions and a reference
   to their separate regular price. Chicken Parmigiana and Lasagna Classico
   are kept and marked "not eligible" (regular price shown for reference);
   Rigatoni alla Vodka and Four-Cheese Manicotti are kept and marked "not on
   the menu". None of the 4 is presented as part of the promotion.
2. **Large Salad:** no official listing, description, or serving size, so it
   does not match Our Famous Jumbo House Salad. Kept separate (alias A4).
3. **New official items:** 21 offerings added to existing categories (see
   below). Items in the PDF but not on the Millenia online menu were not
   added (`menu-research.json` → `officialItemsNotAdded`).
4. **PDF cross-check:** every category checked against the official
   nutrition PDF (25 pages, footer code US_101926). Differences were resolved
   in favor of the PDF where it lists the same portion; otherwise the menu
   value is kept and flagged (`UNVERIFIED_ITEMS.md`).

## New official items (Decision 3)

| Category | New offerings |
|---|---|
| Family-Style Meals | Family-Style Chicken Alfredo Bundle, Chicken Parmigiana Bundle, Five Cheese Ziti al Forno Bundle |
| Classic Entrees | Spicy Alfredo Fettuccine (limited time) |
| Lighter Portions | Spicy Alfredo Fettuccine |
| Lunch Menu | Spicy Alfredo Fettuccine; Chicken Parmigiana, Eggplant Parmigiana, Italian Grilled Chicken Sandwiches; Chicken Alfredo, Five Cheese, Classic Pepperoni Flatbreads |
| Desserts | Pumpkin Cookie Butter Cheesecake (limited time) |
| Sides, Sauces and Extras | Side of Crispy Shrimp Fritta, Side of Crispy Chicken Fritta, Side of Italian Sausage |
| Drink Menu / Non-Alcoholic Beverages | Half Iced Tea + Half Lemonade |
| Wine & Beer To Go | Heineken 0.0 Non-Alcoholic |
| Catering | Pumpkin Cookie Butter Cheesecake (half/whole), Italian Sausage (Serves 4-6) |

New items have stable IDs (`<category>--<product>`), no `inventoryName`
(they are not in the owner inventory), and `isNewOfficialItem: true`.

## Remaining limitations

- 5 entries not on the official menu: Large Salad, and 4 Buy One Take One
  items. They are documented, not estimated.
- Calories not published: $6 Take Home portions, Cheese Grater.
- Option prices: all captured (finalization pass, 2026-11-12). Every option
  price in the dataset is now official.
- Calabrian Steak & Shrimp Bucatini: item page $24.49 / $26.49 / $24.49 vs
  menu card "Starting at $25.29" (same day). Item-page price used; re-check
  before publishing.
- Conflicts kept for owner review: catering Sicilian Cheesecake (700 vs PDF
  dessert slice 730); Side of Crispy Shrimp Fritta (200 vs 220/350 in other
  official places); kids side range; wine values vs generic PDF values; kids
  age ("under 12" on the menu, "12 & under" in the FAQ).
- Lunch hours: resolved to Mon-Fri 11 AM-3 PM (specials page, location page,
  and Lunch section agree; one card says 2:30 PM).
- Price audit: all 207 menu-card prices were re-read on 2026-11-12; only the
  Calabrian card differs from its item page.
- Limited-time items (Spicy Alfredo, Crispy Shrimp Fritta, Pumpkin
  Cheesecake, $6 Take Home) need re-checking before and after publishing.

## Files

| File | Content |
|---|---|
| `INVENTORY_AUDIT.md` | 210 inventory entries + 21 new items, shared products, alias cases |
| `ALIAS_MAPPING.md` | Decisions A1-A17 and the shared product/photo map |
| `IMAGE_MANIFEST.md` | 129 unique photos: file, folder, reuse, status, alt text |
| `UNVERIFIED_ITEMS.md` | Not-on-menu entries, missing values, PDF conflicts, flags |
| `OFFICIAL_FACTS_LOG.md` | Raw notes from the official pages and the nutrition PDF |
| `menu-research.json` | Dataset: 231 offerings, 146 products, 23 CYOP options, alias decisions, PDF check per offering |
| `<category-slug>/` (17 folders) | `prices.md`, `nutrition.md`, `descriptions.md`, `sources.md` |
