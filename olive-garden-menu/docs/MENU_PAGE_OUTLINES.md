# Menu Page Outlines

**Status:** Planning (2026-11-11). All URLs are **provisional**
(see `CONTENT_ARCHITECTURE.md`). No keyword volumes, rankings, or competitor
data are used or implied: intents are judged from the topic itself.

## Rules for every menu page

- Answer first: the opening 1-2 sentences state what the page covers and the
  verified price range (or that prices are not verified yet).
- Price/calorie table near the top, with `PriceNotice` (last checked date + location).
- Only verified facts. Any heading that depends on an unverified fact
  (hours, refills, serving counts, promotions) is **published only after
  verification**; otherwise the section is left out, not guessed.
- Headings are written for each page; do not reuse identical H2s across pages.
- FAQs are answered only with verified information, and only if shown on the
  page (FAQPage schema must match visible text).
- Natural American English; no keyword stuffing; titles ≤ ~60 characters.
- "Not affiliated with Olive Garden" footer disclaimer (already global).
- Pages stay `noindex` until their content is verified and approved.
- Item groupings below (e.g. "Chicken" vs. "Seafood") are **provisional** and
  must match official item descriptions once verified.

---

## Homepage `/` (exists)

- **Primary topic:** Olive Garden menu overview with prices
- **Intent:** Navigational + informational ("what's on the menu, how much")
- **Title:** Olive Garden Menu & Prices: Full Menu Guide
- **H1:** Olive Garden Menu & Prices (existing)
- **Sections (in order):**
  1. Hero: one-sentence answer + "Browse the menu" button (existing)
  2. **Browse the Menu**: grouped category cards (Dine-In, Drinks, Special Diets & Kids, Groups & Takeout); 12 page cards + chips for the 5 sections, so all 17 categories are reachable
  3. **Menu Prices at a Glance**: one row per menu page with verified price range, or "Not verified yet", and last-checked date
  4. **Featured Items**: editor-picked verified items (no "most popular" claims without data)
  5. **Planning Your Visit**: links to future guides (lunch, catering, gluten-sensitive, kids)
  6. **About This Guide / How We Check Prices** (existing)
  7. **FAQ** (general): only verified answers
- **Tables:** "Menu Prices at a Glance" summary table (page, price range, last checked)
- **FAQs (candidates):** How much does a meal at Olive Garden cost? · Do prices vary by location? · Is there a lunch menu? · Does Olive Garden offer catering? · Is there a kids menu?
- **Links:** every menu page; /menu directory; About; Disclaimer

## `/menu` (exists, noindex directory)

- **Purpose:** complete directory of all 17 owner categories, grouped (see `INTERNAL_LINKING.md`)
- **H1:** Olive Garden Menu by Category (existing)
- **H2s:** Dine-In Menu · Drinks · Special Diets & Kids · Groups & Takeout
- No price tables (avoids duplicating category pages).

---

## 1. Family-Style Meals `/menu/family-style-meals`

- **Primary topic:** Family-style meals, bundles, and family-size portions
- **Intent:** Commercial/informational: feeding a group at home, cost per bundle
- **Title:** Olive Garden Family-Style Meals & Bundle Prices
- **H1:** Olive Garden Family-Style Meals
- **H2/H3:**
  - Family-Style Meal Prices and Calories (table)
  - Lasagna Bundles
    - Family-Style Lasagna Bundle · Large Family-Style Lasagna Bundle
  - Family-Size Pasta Entrées
  - Family-Size Chicken and Seafood Entrées
  - Soups, Salad and Breadsticks for the Table
  - What Comes With a Family-Style Meal *(only if verified)*
  - Family-Style Meals vs. Catering
- **Tables:** all 20 items; columns Item · Serves *(if verified)* · Price · Calories (with basis)
- **Related topics:** takeout ordering, group dinners, catering
- **FAQs:** How many people does a family-style meal feed? · What is included in the lasagna bundle? · Can I order family-style meals for delivery?
- **Internal links:** Catering (larger groups), Classic Entrees (individual portions), Soups/Salad/Breadsticks, Desserts

## 2. Appetizers `/menu/appetizers`

- **Primary topic:** Appetizers and starters
- **Intent:** Informational/commercial: what starters exist, price
- **Title:** Olive Garden Appetizers Menu With Prices
- **H1:** Olive Garden Appetizers
- **H2/H3:**
  - Appetizer Prices and Calories (table)
  - Crispy Italian Starters: Fried Mozzarella, Stuffed Ziti Fritta, Lasagna Fritta, Calamari, Shrimp Fritto Misto, Toasted Ravioli *(grouping to confirm)*
  - Dips and Shareables: Spinach-Artichoke Dip, Meatballs Parmigiana
  - Breadsticks and Dipping Sauces
  - Appetizers for a Group
- **Tables:** 10 items
- **Related topics:** sharing plates, breadstick sauces
- **FAQs:** Which appetizers are good for sharing? · What dipping sauces come with breadsticks? · Are appetizers available for catering?
- **Internal links:** Soups/Salad/Breadsticks, Catering (Fried Mozzarella, Spinach-Artichoke Dip, Toasted Beef Ravioli), Sides/Sauces

## 3. Classic Entrees `/menu/classic-entrees`

- **Primary topic:** Full-size dinner entrées
- **Intent:** Informational/commercial: entrée options and prices
- **Title:** Olive Garden Entrées: Classic Menu Prices
- **H1:** Olive Garden Classic Entrees
- **H2/H3:**
  - Classic Entree Prices and Calories (table, all 27 items)
  - Pasta Classics (lasagna, spaghetti, ravioli, ziti)
  - Chicken Entrées
  - Seafood Entrées
  - Steak Entrées (6 oz. Sirloin, Steak Gorgonzola Alfredo, Calabrian Steak & Shrimp Bucatini)
  - Tour of Italy *(what it includes, if verified)*
  - **Amazing Alfredos** `#amazing-alfredos` (5 items, own small table)
  - **Create Your Own Pasta** `#create-your-own-pasta` (options table once verified; until then a short "options being verified" note)
  - **Buy One Take One** `#buy-one-take-one` (7 items; shown only if the offer is verified current, with dates and rules)
- **Tables:** main table (27) + Amazing Alfredos (5) + Buy One Take One (7) + Create Your Own Pasta (TBD)
- **Related topics:** lunch portions, family-size versions, gluten-sensitive swaps
- **FAQs:** What comes with an entrée? · What is on the Tour of Italy? · Can I build my own pasta? · Is Buy One Take One still available?
- **Internal links:** Lunch (lighter portions of the same dishes), Family-Style Meals, Gluten-Sensitive (salmon, sirloin), Sides (add-on proteins)

## 4. Soups, Salad & Breadsticks `/menu/soups-salad-breadsticks`

- **Primary topic:** Soups, the house salad, and breadsticks
- **Intent:** Informational: what soups exist, combo price, refill rules
- **Title:** Olive Garden Soups, Salad & Breadsticks Prices
- **H1:** Olive Garden Soups, Salad & Breadsticks
- **H2/H3:**
  - Soup, Salad and Breadstick Prices (table)
  - Homemade Soups *(list of current soups once verified)*
  - Our Famous House Salad
  - Breadsticks and Dipping Sauces
  - The Soup, Salad & Breadsticks Combo
  - Weekday Lunch Special *(terms, if verified)*
- **Tables:** 6 items
- **Related topics:** refills, lunch special, gluten-sensitive salad option
- **FAQs:** What soups does Olive Garden have? · Are soup, salad and breadsticks unlimited? · When is the weekday lunch special available?
- **Internal links:** Lunch, Gluten-Sensitive (salad without croutons, Zuppa Toscana), Family-Style (large soups/salad), Appetizers (breadstick sauces)

## 5. Lunch Menu `/menu/lunch`

- **Primary topic:** Lunch menu, lunch portions, and lunch timing
- **Intent:** Informational: lunch prices, hours, portion sizes
- **Title:** Olive Garden Lunch Menu & Prices
- **H1:** Olive Garden Lunch Menu
- **H2/H3:**
  - Lunch Prices and Calories (table, 10 items)
  - **Lighter Portions** `#lighter-portions` (7 items, own table)
  - Soup, Salad and Breadsticks at Lunch
  - Lunch Hours and Availability *(only if verified)*
  - How Lunch Portions Compare to Dinner *(only if verified)*
- **Tables:** Lunch (10) + Lighter Portions (7)
- **Related topics:** weekday lunch special, smaller portions
- **FAQs:** What time does lunch end? · Are lunch portions smaller? · What are lighter portions?
- **Internal links:** Classic Entrees (full-size versions), Soups/Salad/Breadsticks, Desserts

## 6. Desserts `/menu/desserts`

- **Primary topic:** Desserts
- **Intent:** Informational/commercial
- **Title:** Olive Garden Desserts Menu With Prices
- **H1:** Olive Garden Desserts
- **H2/H3:**
  - Dessert Prices and Calories (table)
  - Layered Cakes: Black Tie Mousse Cake, Chocolate Lasagna, Strawberry Cream Cake
  - Tiramisu
  - Sicilian Cheesecake with Strawberry Topping
  - Warm Italian Doughnuts
  - Desserts for Groups and Catering
- **Tables:** 6 items
- **FAQs:** What is the most filling dessert? *(only with calorie data)* · Can I order desserts for catering?
- **Internal links:** Catering (Black Tie Mousse Cake, Tiramisu, Sicilian Cheesecake), Drinks (cappuccino, espresso)

## 7. Drinks `/menu/drinks` (Drink menu + Non-alcoholic beverages)

- **Primary topic:** Non-alcoholic drinks and to-go beverages
- **Intent:** Informational: drink options, sizes, prices
- **Title:** Olive Garden Drinks Menu: Lemonades, Teas & More
- **H1:** Olive Garden Drinks Menu
- **H2/H3:**
  - Drink Prices (table)
  - **Non-Alcoholic Beverages** `#non-alcoholic-beverages` (all 13 items)
    - Lemonades and Limonatas
    - Iced Teas
    - Coffee and Espresso (Cappuccino, Lavazza Espresso)
  - Drinks To Go: Gallons, 2-Liter Soda and Fountain Drinks
  - Wine and Beer (short intro + link)
- **Tables:** one table of 13 items, with a "Drink menu" / "To go" label where relevant. Calories column hidden if not published officially.
- **FAQs:** Are refills free? *(verify)* · What sizes are the to-go drinks? · What is a limonata?
- **Internal links:** Wine & Beer To Go, Catering (beverages), Desserts

## 8. Wine & Beer To Go `/menu/wine-and-beer-to-go`

- **Primary topic:** Wine and beer available to go
- **Intent:** Informational: what is offered, price, where allowed
- **Title:** Olive Garden Wine & Beer To Go: List and Prices
- **H1:** Olive Garden Wine and Beer To Go
- **H2/H3:**
  - Wine and Beer Availability *(states/locations, ID 21+, local laws)*
  - Wine To Go Prices
    - Sweet and Moscato Wines
    - White Wines
    - Red Wines
  - Beer To Go Prices
- **Tables:** wine (14) and beer (5); bottle size column if verified; no calorie column unless official data exists
- **Compliance:** visible note that alcohol is for adults 21+, availability depends on state and local law; no encouragement of excessive drinking.
- **FAQs:** Can you buy wine to go at every location? · Do you need ID for alcohol to go?
- **Internal links:** Drinks, Family-Style Meals, Classic Entrees

## 9. Sides, Sauces & Extras `/menu/sides-sauces-extras`

- **Primary topic:** Add-ons, side dishes, and large sauces
- **Intent:** Informational: add-on prices
- **Title:** Olive Garden Sides, Sauces & Extras Prices
- **H1:** Olive Garden Sides, Sauces and Extras
- **H2/H3:**
  - Side and Add-On Prices (table)
  - Protein Add-Ons: Meatballs, Grilled Chicken
  - Vegetable and Potato Sides
  - Large Sauces To Go: Alfredo, Marinara, Meat, Five Cheese Marinara
  - Extras *(Cheese Grater, once confirmed)*
- **Tables:** 9 items, with portion column ("large") if verified
- **FAQs:** Can I buy Olive Garden sauce to take home? · Can I add chicken to any pasta?
- **Internal links:** Classic Entrees, Catering (dipping sauces), Appetizers

## 10. Kids Menu `/menu/kids-menu`

- **Primary topic:** Kids meals
- **Intent:** Informational: kids options, price, age limit
- **Title:** Olive Garden Kids Menu With Prices
- **H1:** Olive Garden Kids Menu
- **H2/H3:**
  - Kids Menu Prices and Calories (table)
  - Pasta Choices for Kids
  - Chicken Fingers and Pizza
  - Gluten-Sensitive Options for Kids (rotini items)
  - What Comes With a Kids Meal *(verify)*
- **Tables:** 11 items
- **FAQs:** What age is the kids menu for? · Does the kids meal include a drink?
- **Internal links:** Gluten-Sensitive, Desserts, Family-Style Meals

## 11. Gluten-Sensitive Menu `/menu/gluten-sensitive`

- **Primary topic:** Gluten-sensitive menu options
- **Intent:** Informational, health-related (handle with extra care)
- **Title:** Olive Garden Gluten-Sensitive Menu Options
- **H1:** Olive Garden Gluten-Sensitive Menu
- **H2/H3:**
  - Gluten-Sensitive Does Not Mean Gluten-Free *(official wording + link to official allergen information)*
  - Gluten-Sensitive Menu Prices and Calories (table)
  - Rotini Pasta Options
  - Grilled Entrées: Salmon, Sirloin, Chicken
  - Soup and Salad Options
  - Gluten-Sensitive Options for Kids
  - Tips for Ordering *(verified official guidance only)*
- **Tables:** 10 items
- **Rules:** no medical advice; no claims beyond official allergen statements; recommend checking with the restaurant; date-stamp the allergen source.
- **FAQs:** Does Olive Garden have gluten-free pasta? · Is the gluten-sensitive menu safe for celiac disease? *(answer only with official statement)*
- **Internal links:** Kids Menu, Classic Entrees (salmon, sirloin), Soups/Salad/Breadsticks

## 12. Catering `/menu/catering`

- **Primary topic:** Catering menu and ordering
- **Intent:** Commercial/informational: event planning, cost per group
- **Title:** Olive Garden Catering Menu & Prices
- **H1:** Olive Garden Catering Menu
- **H2/H3:**
  - Catering Prices and Serving Sizes (table, 38 items)
  - Catering Entrées
  - Combinations: Chicken Parmigiana, Lasagna
  - Create Your Own Pasta Station
  - Soups, Salad and Breadsticks
  - Appetizers and Sides
  - Dipping Sauces
  - Desserts
  - Beverages
  - How Catering Orders Work *(lead time, delivery, minimums, if verified)*
- **Tables:** one main table, grouped rows; "Serves" column if verified
- **FAQs:** How many people does a catering pan serve? · How far in advance should I order? · Does Olive Garden deliver catering?
- **Internal links:** Family-Style Meals (smaller groups), Desserts, Drinks, Appetizers
