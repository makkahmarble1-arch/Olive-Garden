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

## 7. Dinner Menu guide vs homepage, Lunch Menu, Classic Entrees, Lighter Portions (2026-11-15)
- **`/dinner-menu`:**
  - Primary keyword: **olive garden dinner menu**.
  - Job: **the dinner-time guide**: when the dinner menu applies (weekdays from 3 PM, all day on weekends and holidays), price ranges for each section, the dinner-only smaller plate (lighter portions), calculated dinner-for-two orders, dinner specials, and a short lunch-vs-dinner summary.
- **Homepage:** keeps "olive garden menu with prices" and every item. The dinner page shows no full item list and uses no homepage paragraphs. Its five photo cards reuse the homepage's popular dishes, framed as dinner picks.
- **`/classic-entrees`:** keeps "olive garden classic entrees" and "olive garden dinner entrees" (its secondary keyword): the full list of 27 entrées and what each includes. The dinner page shows only an 11-row price ladder and links to it.
- **`/lunch-menu`:** keeps "olive garden lunch vs dinner menu" with the dish-by-dish table. The dinner page has a short list under a different heading ("Lunch vs Dinner: What Changes at 3 PM") and links to the table.
- **`/lighter-portions`:** keeps the regular vs lighter vs lunch table. The dinner page gives three examples and links to it.
- **FAQs:** no question is repeated word for word from the homepage or the lunch page:
  - "How much does dinner cost?" is dinner-specific, while the homepage asks about a meal in general.
  - "What time does Olive Garden start serving dinner?" differs from the lunch questions.
- **Navigation:** the header "Hours" dropdown keeps pointing to the homepage hours section. A future Hours article must not target "dinner hours" as its primary keyword; it should link to `/dinner-menu#dinner-hours`.

## 8. Hours guide vs homepage, Lunch Menu, Dinner Menu (2026-11-15)
- **`/hours`:**
  - Primary keyword: **olive garden hours**.
  - Job: **when restaurants are open**: opening and closing times, weekend and holiday hours, To Go cutoffs, how to check a local restaurant.
- **Homepage:** keeps its short "Opening & Closing Hours" and "Holiday Hours" sections, which show one restaurant's week. `/hours` now owns the topic:
  - The header Hours dropdown and the site search point to `/hours`.
  - The homepage sections link to `/hours` (owner approval 2026-11-15). Trimming the homepage holiday FAQ remains optional for later.
- **`/lunch-menu`:** keeps "lunch hours" in depth (lunch items, prices, weekend answer). `/hours` gives one table row and a link.
- **`/dinner-menu`:** keeps "dinner hours" with its menu context. `/hours` gives one paragraph and a link; the dinner page links back to `/hours`.
- **FAQs:**
  - Hours questions ("What time does Olive Garden open / close", "open on Sundays", "Thanksgiving", "Christmas Day", "other holidays", "check local hours") live on `/hours`.
  - "What time does Olive Garden stop serving lunch?" (`/hours`) is a short pointer. The full lunch timing questions stay on `/lunch-menu`, and "when does dinner start" on `/dinner-menu`.
- **Holiday articles:** see §9 (2026-11-25).

## 9. Holiday-hours articles vs `/hours` and the homepage (2026-11-25)
- **`/thanksgiving-hours`:** primary keyword **is olive garden open on thanksgiving**. Job: Thanksgiving week only (the day before, Thanksgiving Day, Black Friday), plus To Go, delivery, and catering for those days.
- **`/christmas-hours`:** primary keyword **is olive garden open on christmas**. Job: Christmas Eve, Christmas Day, and December 26, plus To Go, delivery, and catering.
- **`/hours`:**
  - Keeps **olive garden hours** and **olive garden holiday hours**: the whole-year holiday table and one short FAQ answer per holiday.
  - Its secondary keywords "is olive garden open on thanksgiving / christmas" moved to the articles.
  - Its holiday section links to both articles.
- **Homepage:** keeps its short Holiday Hours section and links to `/hours#holiday-hours` and both articles. No new homepage section.
- **Search:** "thanksgiving", "black friday", "christmas", and "christmas eve" rank the articles first. The `/hours#holiday-hours` entry keeps "holiday", "easter", "new year", "july 4".
- **No overlap between the two articles:** each mentions the other closure in one sentence with a link.
- **Future holiday articles** (e.g. New Year's Eve) need owner approval, their own intent, a fact log, and `navGroup: "hours"`.
