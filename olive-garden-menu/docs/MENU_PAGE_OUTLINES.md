# Menu Page Outlines

**Status:** Approved structure (2026-11-11): homepage, `/menu` hub, and 17
category pages at root-level URLs (see `CONTENT_ARCHITECTURE.md` §2).
Pages are **not built yet**. No keyword volumes, rankings, or competitor data
are used or implied: intents are judged from the topic itself.

## Rules for every menu page

- **One intent per page.** Overlapping pages answer different questions
  (`CONTENT_ARCHITECTURE.md` §4). Do not copy descriptive paragraphs between
  pages; mention the other page and link to it.
- **Answer first:** the opening 1-2 sentences say what the page covers and
  the verified price range (or that prices are not verified yet).
- Price/calorie table near the top, with `PriceNotice` (last checked date +
  location, e.g. "Orlando, FL").
- **Only verified facts.** A heading that depends on an unverified fact
  (hours, refills, serving counts, promotion terms) is published only after
  verification; otherwise the section is left out, not guessed.
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
- Pages stay `noindex` until their content is verified and approved.
- Global footer disclaimer: not affiliated with Olive Garden.

---

## Homepage `/` (exists)

- **Purpose:** introduce this independent guide and help people get started.
- **Intent:** navigational: "where do I start, what does this site offer".
  It does **not** try to be the full menu (that is `/menu`).
- **Title:** brand-led, e.g. "Olive Garden Menu & Prices: Independent Guide"
  (final wording when content is approved)
- **H1:** Olive Garden Menu & Prices (existing)
- **Sections (implemented, Lesson 5):**
  1. Hero: independence badge, H1, short intro, primary button
     "View the Full Menu" → `/menu`, "Inside this guide" panel (CSS only)
  2. **Start With a Menu Category** (H2): 6 featured cards + "See All 17 Categories" → `/menu`
  3. **Helpful Guides** (H2): shown automatically only when published articles exist
  4. **About This Guide** (H2, `#about-this-guide`): 3 short points (H3)
  5. Short general FAQ (only verified answers), later
- **Not on the homepage:** the full 17-category list, price tables, or the
  `/menu` hub text.

## `/menu` main menu hub (exists, noindex placeholder)

- **Purpose:** comprehensive menu overview; the one place that lists all
  17 categories.
- **Intent:** "Olive Garden menu" (full menu overview by category).
- **Title:** e.g. "Olive Garden Menu: All Categories With Prices"
- **H1:** Olive Garden Menu by Category (existing)
- **Layout (implemented, Lesson 5):** all 17 categories in the approved
  order (1-17). H2 "Jump to a Category" (in-page anchor links to each card),
  H2 "All 17 Menu Categories" (cards, `h3`; each card shows its group name
  as a small label), H2 "How Prices Will Appear".
- **Later (verified only):** a short intro per group; a "Prices at a Glance"
  table with one row per category (verified price range or "Not verified
  yet", last-checked date). No full item tables (those live on category pages).
- **Indexing:** becomes indexable when the hub has its final, verified,
  helpful content and the owner approves.

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
