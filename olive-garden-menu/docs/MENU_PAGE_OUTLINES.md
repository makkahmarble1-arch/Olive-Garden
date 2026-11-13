# Menu Page Outlines

**Status:** Approved structure (2026-11-11), homepage and architecture
finalized by the owner on 2026-11-12: the homepage is the primary indexable
full-menu page, the 17 category pages give detailed category information,
and `/menu` stays noindex (redirect to `/` reviewed before launch).
Built so far: `/appetizers` (published). The homepage still shows the
Lesson 5 version until it is rebuilt to the spec below. No keyword volumes
or rankings are used or implied: intents are judged from the topic itself.
Competitor pages were reviewed only for structure
(`research/homepage/competitor-analysis.md`).

## Rules for every menu page

- **One intent per page.** Overlapping pages answer different questions
  (`CONTENT_ARCHITECTURE.md` §4). Do not copy descriptive paragraphs between
  pages; mention the other page and link to it.
- **Answer first:** the opening 1-2 sentences say what the page covers and
  the price range.
- Price/calorie table near the top, with `PriceNotice` (last checked date +
  location, e.g. "Orlando, FL").
- **Menu values** (price, calories) follow `MENU_RESEARCH_PLAN.md` §1-2:
  official, calculated (labeled), or estimated (labeled), or a meaningful
  note. **Other facts** (hours, refills, serving counts, promotion terms)
  are published only from official sources; otherwise the section is left
  out or says so, never guessed.
- Item groupings below (e.g. "Chicken" vs. "Seafood") are provisional and
  must match official item descriptions once verified.
- FAQs only with verified answers, and only if visible on the page
  (FAQPage schema must match visible text).
- One `h1`; `h2` for main sections; `h3` inside them. Do not reuse
  identical H2s across pages.
- Natural American English; titles ≤ ~60 characters; descriptions ~140-160.
  No keyword stuffing, no near-duplicate keyword variations.
- Every page: unique title + description, self-canonical (`/{slug}`),
  Open Graph, breadcrumbs `Home > Menu > {Category}` (+ BreadcrumbList JSON-LD).
- Category pages stay `noindex` ("preview") until their content is
  complete and the owner approves; then they are indexed ("published").
- **Category page images (Option B):** complete menu table without images,
  plus a "Popular {Category}" section with 3-5 selected owner photos,
  reusing the homepage item images where possible (`IMAGE_MANIFEST.md`).
- Each category page: detailed category-specific information, the menu
  table, nutrition information, useful FAQs, relevant internal links, and
  visitor ratings from the shared rating data (once the rating system exists).
- Global footer disclaimer: not affiliated with Olive Garden.

---

## Homepage `/` (final owner-approved spec, 2026-11-12)

> **Supersedes** the Lesson 5 homepage (intro + 6 featured categories +
> link to `/menu`, "no full menu on the homepage") and the first 2026-11-12
> draft. **Built in Lesson 7.2 (2026-11-12)**: `app/page.tsx` with
> `components/home/` and `components/menu/MenuItemCard.tsx` (card design
> Option C); supporting text in `content/home/homepage.ts`. Ratings are not
> shown yet (rating lesson 7.4); food photos are added in Lesson 7.3.

- **Purpose:** the complete Olive Garden menu on one page, with prices,
  calories, ratings, and helpful planning information.
- **Intent:** "Olive Garden menu with prices and calories". This is the
  **only indexable full-menu page**; `/menu` stays noindex.
- **H1:** Olive Garden Menu with Prices & Calories 2026 (the year changes
  only when the menu data is re-checked for the new year).
- **Title/description:** written when the content is approved.

### Content (approved order)

| # | Block | Heading |
|---:|---|---|
| 1 | Header and navigation | none (site header) |
| 2 | Olive Garden Menu with Prices & Calories 2026 | **H1** |
| 3 | Short helpful introduction (2-3 sentences) | none |
| 4 | Pricing location and verification information: reference restaurant (Orlando - Millenia Mall), "online pickup prices", real last-checked date, what "Calculated" and "Estimated" mean, "prices vary by location" | none (notice box) |
| 5 | Category navigation (jump links to the 17 sections) and instant menu search | none (labelled `nav` / search) |
| 6 | All 17 complete menu categories with every approved item, in the approved order (`CONTENT_ARCHITECTURE.md` §2) | **17 H2s**, one per category |
| 7 | Olive Garden Popular Menu Items | H2 |
| 8 | Olive Garden Lunch Specials & Deals | H2 |
| 9 | Olive Garden Hours — Opening & Closing Times | H2 |
| 10 | Olive Garden Holiday Hours | H2 |
| 11 | Olive Garden Nutrition & Dietary Options | H2 |
| 12 | How to Order Olive Garden Online | H2 |
| 13 | Frequently Asked Questions | H2 |
| 14 | Important internal links and official resources | none (labelled `nav`) |
| 15 | Sources, disclaimer, footer, and social media links | none (sources list + site footer) |

Headings: exactly one H1; 17 category H2s + 7 supporting H2s (rows 7-13);
H3 only when genuinely necessary (e.g. a sub-group inside a large
category). Concise, accurate, no repetition, no keyword stuffing.

### Each category section (row 6)

- Every approved offering of that category (`content/menu/offerings/`),
  in inventory order, with the owner's inventory names. Items listed in
  several categories appear in each of them (210 placements, 231 once the
  21 approved new official items are integrated), each with its
  own price, calories, and portion.
- Per item: **food image, name, price, calories, rating** (average + vote
  count, or "Not rated yet"), **short helpful description**, and **size and
  portion options** where they exist (e.g. 6 / 12 breadsticks, regular /
  large sauce). Catering and family-style portions stay separate.
- Values follow `MENU_RESEARCH_PLAN.md` §1: official, "Calculated", or
  "Estimated", or a meaningful note. No empty cells.
- Missing photo: labelled placeholder until the owner supplies one.
- A link to the category's dedicated page ("More about {category}") once
  that page is in preview or published (never a link to a 404).
- A helpful table may be used where it suits the category (e.g. drinks).

### Supporting sections (rows 7-13)

| Section | Shows | Source rule |
|---|---|---|
| Olive Garden Popular Menu Items | The 6 owner-chosen items: Chicken Alfredo, Tour of Italy, Lasagna Classico, Chicken Parmigiana, Fettuccine Alfredo, Breadsticks. Image, price, calories, visitor rating | Shared menu data and shared rating data. "Popular" = owner's selection; no popularity statistics or sales rankings |
| Olive Garden Lunch Specials & Deals | Current lunch specials and deals | Official site, with terms and dates; expired offers removed |
| Olive Garden Hours — Opening & Closing Times | Reference restaurant hours (dining, online ordering) | Official location page, with check date; "hours vary by location" |
| Olive Garden Holiday Hours | Holiday hours of the reference restaurant | Official source only; otherwise says hours are not published and to check with the restaurant |
| Olive Garden Nutrition & Dietary Options | Where calories come from; gluten-sensitive and vegetarian information | Official nutrition/allergen documents, official wording |
| How to Order Olive Garden Online | Neutral steps + link to the official ordering site | Official site; no affiliate links |
| Frequently Asked Questions | Short Q&As | Accurate answers only; FAQPage JSON-LD matches the visible text |

Popular items use the regular portion (Classic Entrees for the five
entrees, Appetizers for Breadsticks) unless the owner chooses otherwise.

### Rows 14-15

- **Important internal links and official resources:** the dedicated
  category pages, About/Contact/Disclaimer when they exist, and official
  Olive Garden pages (ordering, nutrition PDF, reference restaurant page).
- **Sources:** official sources with real check dates; third-party sources
  for any "Estimated" values (rel="nofollow").
- **Disclaimer** (not affiliated with Olive Garden or Darden) and **footer**.
- **Social media links:** only the URLs the owner supplies; none until then.

### Shared data rule

Homepage and the 17 category pages read the **same** data
(`content/menu/`, via `lib/content.ts`) and the same rating data. A value
is changed once and appears everywhere. Category pages add expanded,
category-specific content (their outlines below); they do not copy
homepage paragraphs.

## `/menu` (exists, noindex)

> **Owner decision (2026-11-12):** `/menu` is **not** a second indexable
> full-menu page. It stays as it is now (category cards, noindex, follow)
> during development. Redirecting `/menu` to the homepage is reviewed
> before the final launch. The earlier plan to give `/menu` its own
> indexable content ("Prices at a Glance", group intros) is **withdrawn**.

- **H1:** Olive Garden Menu by Category (existing, Lesson 5 layout).
- **Indexing:** noindex, follow. Never added to the sitemap.

---

## 1. Family-Style Meals `/family-style-meals`
- **Intent:** feeding a household at home: bundles, family-size portions, cost per bundle
- **Title:** Olive Garden Family-Style Meals & Bundle Prices · **H1:** Olive Garden Family-Style Meals
- **H2/H3:** Family-Style Meal Prices and Calories (table, 20) · Lasagna Bundles (Family-Style, Large) · Family-Size Pasta Entrees · Family-Size Chicken and Seafood · Soups, Salad and Breadsticks for the Table · What Comes With a Family-Style Meal *(verified only)* · Family-Style Meals vs. Catering
- **Table columns:** Item · Serves *(if verified)* · Price · Calories (with basis)
- **FAQs:** How many people does a family-style meal feed? · What is in the lasagna bundle?
- **Links:** Catering, Classic Entrees, Soups/Salad/Breadsticks, Desserts

## 2. Appetizers `/appetizers`
- **Intent:** which starters exist and what they cost
- **Title:** Olive Garden Appetizers Menu With Prices · **H1:** Olive Garden Appetizers
- **H2/H3:** Appetizer Prices and Calories (table, 10) · Fried and Crispy Starters *(grouping to confirm)* · Dips and Shareables · Breadsticks and Dipping Sauces · Appetizers for a Group
- **FAQs:** Which appetizers are good for sharing? · What dipping sauces come with breadsticks?
- **Links:** Soups/Salad/Breadsticks, Catering, Sides/Sauces/Extras

## 3. Classic Entrees `/classic-entrees`
- **Intent:** the complete full-size entree list and how entrees compare
- **Title:** Olive Garden Classic Entrees: Menu & Prices · **H1:** Olive Garden Classic Entrees
- **H2/H3:** Classic Entree Prices and Calories (table, 27) · Pasta Classics · Chicken Entrees · Seafood Entrees · Steak Entrees · Tour of Italy *(if verified)* · Build Your Own Pasta (1-2 sentences + link)
- **FAQs:** What comes with an entree? · What is on the Tour of Italy?
- **Links:** Amazing Alfredos, Create Your Own Pasta, Lunch Menu, Lighter Portions, Family-Style Meals, Gluten Sensitive, Sides

## 4. Buy One Take One `/buy-one-take-one`
- **Intent:** how the promotion works and which dishes qualify
- **Title:** Olive Garden Buy One Take One: How It Works · **H1:** Olive Garden Buy One Take One
- **H2/H3:** Is Buy One Take One Available Now? *(verified status + date)* · Eligible Dishes and Prices (table, 7) · How the Offer Works *(rules, dine-in/to-go, verified only)* · Dishes Only Offered in This Deal (Rigatoni alla Vodka, Four-Cheese Manicotti)
- **Special:** time-sensitive; show "last verified" date prominently. If the offer ended, owner decides (dated page, noindex, or redirect).
- **Links:** Classic Entrees, Lunch Menu

## 5. Amazing Alfredos `/amazing-alfredos`
- **Intent:** compare the Alfredo dishes side by side
- **Title:** Olive Garden Alfredo Dishes: Prices & Calories · **H1:** Olive Garden Amazing Alfredos
- **H2/H3:** Alfredo Dish Prices and Calories (table, 5) · Comparing the Alfredos (protein, price, calories) · Alfredo Sauce To Go (link to Sides)
- **Links:** Classic Entrees, Sides/Sauces/Extras, Family-Style Meals

## 6. Soups, Salad and Breadsticks `/soups-salad-and-breadsticks`
- **Intent:** which soups exist, the salad, breadsticks, combo price and refill rules
- **Title:** Olive Garden Soups, Salad & Breadsticks Prices · **H1:** Olive Garden Soups, Salad and Breadsticks
- **H2/H3:** Prices (table, 6) · Homemade Soups *(current soups, verified)* · Our Famous House Salad · Breadsticks and Dipping Sauces · The Soup, Salad and Breadsticks Combo · Weekday Lunch Special *(terms, verified)*
- **FAQs:** What soups are available? · Are soup, salad and breadsticks unlimited? *(verify)*
- **Links:** Lunch Menu, Gluten Sensitive, Family-Style Meals, Appetizers

## 7. Lighter Portions `/lighter-portions`
- **Intent:** smaller portions: what is offered and how they compare
- **Title:** Olive Garden Lighter Portions Menu & Prices · **H1:** Olive Garden Lighter Portions
- **H2/H3:** Lighter Portion Prices and Calories (table, 7) · When Lighter Portions Are Available *(verified)* · Lighter Portions vs. Full-Size Entrees *(only with verified portion/calorie data)*
- **Links:** Lunch Menu, Classic Entrees

## 8. Create Your Own Pasta `/create-your-own-pasta`
- **Intent:** how to build a pasta: pasta, sauce, and topping options
- **Title:** Olive Garden Create Your Own Pasta: Options & Prices · **H1:** Create Your Own Pasta at Olive Garden
- **H2/H3:** How It Works · Pasta Choices · Sauce Choices · Toppings and Proteins · Prices and Calories
- **Special:** no items supplied yet. Built only after official options are verified; never invent combinations.
- **Links:** Classic Entrees, Catering (pasta station), Gluten Sensitive

## 9. Lunch Menu `/lunch-menu`
- **Intent:** lunch prices, lunch timing, lunch-only offers
- **Title:** Olive Garden Lunch Menu & Prices · **H1:** Olive Garden Lunch Menu
- **H2/H3:** Lunch Prices and Calories (table, 10) · Lunch Hours *(verified)* · Soup, Salad and Breadsticks at Lunch · Lunch vs. Dinner Portions *(verified)*
- **FAQs:** What time does lunch end? · Are lunch portions smaller?
- **Links:** Lighter Portions, Classic Entrees, Soups/Salad/Breadsticks

## 10. Desserts `/desserts`
- **Intent:** dessert options and prices
- **Title:** Olive Garden Desserts Menu With Prices · **H1:** Olive Garden Desserts
- **H2/H3:** Dessert Prices and Calories (table, 6) · Cakes and Layered Desserts · Tiramisu and Cheesecake · Warm Italian Doughnuts · Desserts for Groups
- **Links:** Catering, Non-Alcoholic Beverages (coffee and espresso)

## 11. Drink Menu `/drink-menu`
- **Intent:** the drinks list with prices, including to-go sizes
- **Title:** Olive Garden Drink Menu & Prices · **H1:** Olive Garden Drink Menu
- **H2/H3:** Drink Prices (table, 12) · Drinks To Go: Gallons, 2-Liter Soda and Fountain Drinks · Lemonades and Iced Teas (short list + link)
- **Special:** Calories column hidden unless official data exists.
- **Links:** Non-Alcoholic Beverages, Wine & Beer To Go, Catering

## 12. Sides, Sauces and Extras `/sides-sauces-and-extras`
- **Intent:** add-on and large sauce prices
- **Title:** Olive Garden Sides, Sauces & Extras Prices · **H1:** Olive Garden Sides, Sauces and Extras
- **H2/H3:** Prices (table, 9) · Protein Add-Ons · Vegetable and Potato Sides · Large Sauces To Go · Extras *(Cheese Grater, once confirmed)*
- **Links:** Classic Entrees, Catering, Amazing Alfredos

## 13. Non-Alcoholic Beverages `/non-alcoholic-beverages`
- **Intent:** choosing a non-alcoholic drink (flavors, coffee, espresso)
- **Title:** Olive Garden Non-Alcoholic Drinks: Teas, Lemonades & Coffee · **H1:** Olive Garden Non-Alcoholic Beverages
- **H2/H3:** Prices (table, 13) · Lemonades vs. Limonatas · Iced Teas · Coffee and Espresso · Sugar and Caffeine *(official data only)*
- **Links:** Drink Menu, Desserts, Kids Meal

## 14. Wine & Beer To Go `/wine-and-beer-to-go`
- **Intent:** what wine and beer can be bought to go, prices, where allowed
- **Title:** Olive Garden Wine & Beer To Go: List & Prices · **H1:** Olive Garden Wine and Beer To Go
- **H2/H3:** Availability and Age Rules (21+, state/local law) · Wine To Go (Sweet and Moscato · White · Red) · Beer To Go
- **Special:** visible 21+ note; availability depends on state and location (check for Florida/the reference restaurant); no encouragement of drinking. No calorie column unless official.
- **Links:** Drink Menu, Family-Style Meals

## 15. Gluten Sensitive `/gluten-sensitive`
- **Intent:** ordering with gluten sensitivity (health-related: extra care)
- **Title:** Olive Garden Gluten-Sensitive Menu Options · **H1:** Olive Garden Gluten-Sensitive Menu
- **H2/H3:** Gluten-Sensitive Does Not Mean Gluten-Free *(official wording + link)* · Prices and Calories (table, 10) · Rotini Pasta Options · Grilled Entrees · Soup and Salad Options · Options for Kids
- **Rules:** no medical advice; only official allergen statements, date-stamped; advise checking with the restaurant.
- **Links:** Kids Meal, Classic Entrees, Soups/Salad/Breadsticks

## 16. Kids Meal `/kids-meal`
- **Intent:** kids options, prices, age limit, what is included
- **Title:** Olive Garden Kids Menu With Prices · **H1:** Olive Garden Kids Meals
- **H2/H3:** Kids Meal Prices and Calories (table, 11) · Pasta Choices · Chicken Fingers and Pizza · Rotini Options *(link to Gluten Sensitive)* · What Comes With a Kids Meal *(verified)*
- **FAQs:** What age is the kids menu for? · Does a kids meal include a drink?
- **Links:** Gluten Sensitive, Desserts, Family-Style Meals

## 17. Catering `/catering`
- **Intent:** events and large groups: pans, combinations, serving counts, ordering
- **Title:** Olive Garden Catering Menu & Prices · **H1:** Olive Garden Catering Menu
- **H2/H3:** Catering Prices and Serving Sizes (table, 38, grouped rows) · Entrees · Combinations · Create Your Own Pasta Station · Soups, Salad and Breadsticks · Appetizers and Sides · Dipping Sauces · Desserts · Beverages · How Catering Orders Work *(verified)*
- **FAQs:** How many people does a catering pan serve? · How far ahead should I order?
- **Links:** Family-Style Meals, Desserts, Drink Menu, Appetizers

---

## Future informational articles (`/blog/[slug]`)

- Topics come from the owner. Each must answer a question no menu page
  answers (e.g. a how-to or comparison guide), never a menu page's own intent.
- `ArticleLayout`, TOC from H2s, author (owner-provided only), dates,
  `BlogPosting` + `BreadcrumbList` JSON-LD, 1-3 links to menu pages.
