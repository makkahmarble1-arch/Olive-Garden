# Keyword Cannibalization Check (Lesson 8.1)

**Research date:** 2026-11-13. All 17 approved routes are preserved.

**Rule:** each URL gets one primary keyword and one job. Shared items are shown on several pages from the shared data (`content/menu/`), but each page explains them from its own angle and links to the others instead of repeating paragraphs.

## Overlap matrix (from `research/menu/menu-research.json`)
| Pair | Shared items in our data | Risk | Resolution |
|---|---|---|---|
| Homepage vs all categories | All items | High if category titles use "Olive Garden menu with prices" | Homepage owns "olive garden menu (with prices / calories / pictures)". Category titles start with the category phrase. Category pages add analysis the homepage does not (comparisons, rules, calculators) |
| **Drink Menu vs Non-Alcoholic Beverages** | 13 of 13 Drink Menu entries are also in Non-Alcoholic (Non-Alcoholic adds Lavazza espresso) | **Highest** | See §1 |
| **Family-Style Meals vs Catering** | Family-size pans appear in both at identical prices (e.g. Chicken Parmigiana pan $60.99, Lasagna $53.99); soups, salad, breadsticks in both | High | See §2 |
| **Classic Entrees vs Amazing Alfredos** | All 5 Alfredo dishes are also classic entrées | Medium | See §3 |
| **Lunch Menu vs Lighter Portions** | 7 dishes in both; **same calories**, lunch $2 cheaper; different time windows | High | See §4 |
| **Gluten Sensitive vs regular pages** | GF items are versions of salmon, sirloin, chicken parmigiana, soup, salad, kids rotini | Low | See §5 |
| Buy One Take One vs Classic Entrees | Fettuccine Alfredo, Five Cheese Ziti, Spaghetti with Meat Sauce ($6 take-home versions) | Low | BOTO page is about the promotion and take-home add-on only |
| Soups/Salad/Breadsticks vs Lunch vs Appetizers | $9.99 lunch soup-salad deal; breadsticks | Medium | Soup page owns the deal and refill rules; lunch links to it; appetizers own breadsticks with dipping sauces |
| Create Your Own Pasta vs Catering | Catering "Create Your Own Pasta Station" ranks for "create your own pasta" | Low | CYOP = dine-in builder; catering = station for groups; cross-link once |

## 1. Drink Menu vs Non-Alcoholic Beverages
- **Observed searches:**
  - "olive garden drink menu" suggestions include *wine, sangria, cocktails, margarita, non alcoholic drinks*: a hub intent.
  - "olive garden non alcoholic drinks" PAA asks *which alcohol-free drinks exist* and *what is good*: a specific intent.
- **`/drink-menu`:**
  - Primary keyword: **olive garden drink menu**.
  - Job: a **hub of all drink types**. It shows the to-go drink list in a compact table (prices, sizes) and routes to non-alcoholic details and to wine & beer to go.
  - It is the only page that mentions dine-in Italian-inspired cocktails (names only, "not priced online").
- **`/non-alcoholic-beverages`:**
  - Primary keyword: **olive garden non alcoholic drinks**.
  - Job: the **detailed alcohol-free reference**. Every lemonade, tea, coffee, and soda with sizes, calories, and sugar or caffeine questions; family-friendly.
- **Avoid:**
  - Two identical tables with identical intro text.
  - Drink Menu should not target "lemonade calories".
  - Non-Alcoholic should not target "drink menu".

## 2. Family-Style Meals vs Catering
- **`/family-style-meals`:**
  - Primary keyword: **olive garden family style meals**.
  - Job: **a meal at home for 4-12**. Family bundles (complete meals) vs family-size pans, with calculated cost per person.
- **`/catering`:**
  - Primary keyword: **olive garden catering menu**.
  - Job: **events by headcount** ("catering for 50/100 people"). Meal combinations (serve 8-14), pasta station (multiples of 10), per-person prices, delivery minimum and fees, order cutoff.
- **Shared pans:** list them on both from the shared data, but frame them differently: dinner tonight vs event planning. Each page links to the other once.

## 3. Classic Entrees vs Amazing Alfredos
- **`/classic-entrees`:**
  - Primary keyword: **olive garden classic entrees**.
  - Job: **the whole regular dinner list** and what each entrée includes. Alfredo dishes appear in the table only; there is no Alfredo comparison section.
- **`/amazing-alfredos`:**
  - Primary keyword: **olive garden alfredo menu**.
  - Job: **Alfredo deep dive**. All Alfredo dishes compared (protein, price, calories), Spicy vs regular, Alfredo in every size (lunch, lighter, family pan, large sauce).

## 4. Lunch Menu vs Lighter Portions
- **Observed searches:**
  - "lighter portions vs lunch portions" (autocomplete).
  - A Reddit thread on page 1 asking the same.
- **`/lunch-menu`:**
  - Primary keyword: **olive garden lunch menu**.
  - Job: **the weekday window** (Mon-Fri 11 AM-3 PM): all lunch items, including sandwiches and flatbreads, lunch prices, and the weekend answer.
- **`/lighter-portions`:**
  - Primary keyword: **olive garden lighter portions menu**.
  - Job: **the smaller plate outside lunch hours** (weekdays after 3 PM, all day on weekends). Owns the full **regular vs lighter vs lunch** comparison table.
- Lunch links to this comparison in one sentence instead of repeating the table.

## 5. Gluten Sensitive vs regular menu pages
- **`/gluten-sensitive`:**
  - Primary keyword: **olive garden gluten free menu**.
  - Job: the **ordering guide for gluten-avoiding guests**: official list, price, calories, cautions.
- Regular pages (Classic Entrees, Kids, CYOP) show a small "gluten-sensitive version available" note with a link. They do not target "gluten free".
- **Wording:** "gluten-sensitive" everywhere except the rotini pasta ("gluten-free", per the official site).

## 6. Homepage vs category pages: rules for later outlines
- The homepage keeps the H1 "Olive Garden Menu with Prices & Calories 2026" and short category sections.
- Category pages:
  - Do not reuse homepage paragraphs.
  - Use category-specific H1s.
  - Add depth the homepage lacks (comparisons, rules, calculators, FAQs specific to that category).
- **FAQs:** the same question must not appear on the homepage and on a category page. For example, "lunch hours" belongs to `/lunch-menu`; the homepage keeps only a short answer with a link, or drops it.
