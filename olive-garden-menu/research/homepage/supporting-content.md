# Homepage Supporting Sections (research)

**Checked:** 2026-11-12. **Status:** research complete for all seven
supporting H2 sections; nothing is implemented. Prices are online pickup
prices at Olive Garden Orlando - Millenia Mall; calories are official
(ordering menu, cross-checked with the nutrition PDF).

| # | Section (H2) | Research file | Status |
|---:|---|---|---|
| 7 | Popular Menu Items | this file, §1 | Ready |
| 8 | Lunch Specials & Deals | `deals.md` | Ready (limited-time offers flagged) |
| 9 | Opening & Closing Hours | `hours.md` | Ready (Millenia weekly table) |
| 10 | Holiday Hours | `holiday-hours.md` | Ready (company policy confirmed; restaurant times not announced) |
| 11 | Nutrition & Dietary Options | `nutrition-guide.md` | Ready |
| 12 | How to Order Online | this file, §2 | Ready |
| 13 | Frequently Asked Questions | `faqs.md` | 8 drafts ready |
| — | Important internal and official links | `official-links.md` | Verified |

## 1. Popular Menu Items (owner-chosen, fixed)

"Popular" means the owner's selection. No sales or popularity statistics are
claimed. Ratings come only from real visitors (rating lesson, later).

| Item | Price | Calories | Portion | Image |
|---|---|---|---|---|
| Chicken Alfredo | $21.79 | 1,480 (grilled chicken); 1,710 with crispy chicken fritta | Entrée with soup or salad and 2 breadsticks | `public/images/classic-entrees/chicken-alfredo.webp` (needed) |
| Tour of Italy | $23.49 | 1,550 | Chicken Parmigiana, Lasagna Classico, and Fettuccine Alfredo on one plate | `public/images/classic-entrees/tour-of-italy.webp` (needed) |
| Lasagna Classico | $19.99 | 940 | Entrée | `public/images/classic-entrees/lasagna-classico.webp` (needed) |
| Chicken Parmigiana | $21.29 | 1,020 | Two breaded chicken breasts with spaghetti | `public/images/classic-entrees/chicken-parmigiana.webp` (needed) |
| Fettuccine Alfredo (V) | $17.49 | 1,220 | Entrée | `public/images/classic-entrees/fettuccine-alfredo.webp` (needed) |
| Breadsticks (V) | 6 for $4.99; 12 for $7.29 | 140 each (6 = 840, 12 = 1,680, calculated) | Baked or bake-at-home | `public/images/appetizers/breadsticks.webp` (supplied) |

Sources: item pages listed in `research/menu/classic-entrees/prices.md` and
`research/menu/appetizers/prices.md`. Descriptions: reuse the shared
descriptions from `menu-research.json` (no new paragraphs needed).
Other portions of these dishes (lunch, lighter, family pan, catering) stay in
their own category sections; the Popular section shows the regular entrée.

## 2. How to Order Online (official process)

1. Open the official ordering page: https://www.olivegarden.com/order-online
2. Choose **To Go** (individual meals and family-style) or **Catering**
   (large groups); both offer pickup or delivery where available.
3. Pick your restaurant (search by city, state, or ZIP:
   https://www.olivegarden.com/locations/location-search). Menu prices
   appear after a restaurant is selected.
4. Choose items and options (sauces, sizes, toppings, included soup or salad),
   then check out.
5. To change or cancel a To Go order, call the restaurant; the number is in
   the confirmation email (official FAQ).

Millenia Mall details (location page, 2026-11-12): online ordering
11 AM-9:40 PM (Fri-Sat until 10:40 PM); car-side pickup; delivery offered;
catering pickup and delivery with their own hours (`hours.md`). Catering
delivery needs an order of $100 or more and has a delivery fee (`deals.md`).
Official apps (iPhone, Android) are linked from the site footer.

Keep it to these short steps on the homepage; do not copy official wording.

## 3. Content rules applied

- Natural American English; one short paragraph or table per section.
- No H3 headings needed in any supporting section.
- Every number links back to a source file with a date.
- Official facts and calculated values are labeled; there are no estimates.
- Nothing taken from competitor sites.
