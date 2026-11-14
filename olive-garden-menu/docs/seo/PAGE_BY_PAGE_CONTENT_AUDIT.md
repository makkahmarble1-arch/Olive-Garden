# Page-by-Page Content Audit (Lesson 8.5)

**Audit date:** 2026-11-14.
**What this covers:** the rendered production build and `content/menu/category-pages.ts`. Inbound links are counted from the 18 audited pages.
**Status values:**
- **Pass**: ready, apart from minor optional items
- **Needs Improvement**: a real gap or an unverified time-sensitive fact
- **Critical Issue**: wrong or harmful content (none found)

**Checks common to every page.** These passed on all 18 pages unless a page says otherwise:
- Metadata: unique title, description and H1; self-canonical; `noindex, follow`; Open Graph and Twitter tags.
- Structure: one H1; correct heading order; FAQ JSON-LD that matches the visible FAQs; breadcrumb on category pages.
- Images: alt text on every image.
- Owner standards:
  - the USA notice
  - month-and-year dates only
  - no "AI" text
  - Sources box and Related Menus (category pages)
- Data: prices and calories come from the shared data.

Missing exact keyword phrases in a meta description are listed only for information. The descriptions read naturally, and adding exact phrases is optional.

---

## `/` Homepage
- **Primary keyword:** olive garden menu with prices (full-menu intent). **Intent:** see the whole menu, prices and calories in one place.
- **Content:** this is the only full-menu page. It has:
  - all 17 category sections and Popular Menu Items
  - Lunch Specials & Deals, Hours, Holiday Hours, Nutrition & Dietary, How to Order
  - 8 FAQs
  - about 15,700 rendered words, mostly menu cards
- **Missing information:** none required.
- **Issues:**
  - 6 cards show the "Photo coming soon" placeholder (4 products whose incorrect photos were removed).
  - FAQ "Does Olive Garden have gluten-free food?" overlaps the `/gluten-sensitive` FAQ (P2, see the cannibalization audit).
- **Status: Pass**

## `/family-style-meals` (published)
- **Primary keyword:** olive garden family style meals. **Intent:** compare bundles and pans for a group; serving size and cost per person.
- **Content:** about 4,800 words. Bundle and pan tables, cost-per-serving calculations, serving planner, 5 FAQs.
- **Inbound links:** 9 pages. **Status: Pass**

## `/appetizers` (published)
- **Primary keyword:** olive garden appetizers menu. **Intent:** prices and calories of starters; which to share.
- **Content:** about 2,600 words. Table, calorie comparison, 5 FAQs.
- **Issue:** only 2 pages link here (`/`, `/catering`). Published pages that could link here (Family-Style Meals, Classic Entrees) do not (P2, internal linking audit).
- **Status: Pass**

## `/classic-entrees` (published)
- **Primary keyword:** olive garden classic entrees. **Intent:** prices, calories, and what comes with an entree.
- **Content:** about 4,500 words. The most-linked category page (12 inbound links).
- **Image issue:** 3 entree photos were removed (Grilled Chicken Parmigiana GS, 6 oz Sirloin, Herb-Grilled Salmon). Placeholders are shown until the owner supplies photos (`MISSING_IMAGES.md`).
- **Status: Pass**

## `/buy-one-take-one` (published)
- **Primary keyword:** olive garden buy one take one. **Intent:** is the deal running, how it works, the price, and the $6 Take Home add-on.
- **Content:** about 1,800 words, the shortest page. That length suits a single-offer page.
- **Accuracy:** the promotion's availability was checked in November 2026. Promotions change often, so it must be re-checked just before launch and then regularly (P1).
- **Status: Needs Improvement** (time-sensitive offer)

## `/amazing-alfredos` (published)
- **Primary keyword:** olive garden alfredo menu. **Intent:** compare Alfredo dishes; price and calories.
- **Content:** about 2,300 words. Option tables, 5 FAQs.
- **Status: Pass**

## `/soups-salad-and-breadsticks` (preview)
- **Primary keyword:** olive garden soup salad and breadsticks. **Intent:** the unlimited soup, salad and breadsticks lunch offer, the 4 soups, and their calories.
- **Content:** about 3,200 words, 6 FAQs.
- **Accuracy:** the price of the limited-time lunch combo and its lunch-hours wording must be re-checked before launch (P1).
- **Image issues:**
  - The Zuppa Toscana photo shows bacon pieces.
  - The Chicken & Gnocchi photo looks thicker than the real soup.

  The owner may replace these photos (P3).
- **Status: Needs Improvement**

## `/lighter-portions` (preview)
- **Primary keyword:** olive garden lighter portions menu. **Intent:** smaller-portion dishes, prices, and calories compared with the full size.
- **Content:** about 3,100 words, 6 FAQs.
- **Issue:** the weakest inbound links (only `/` and `/lunch-menu`). This resolves after publishing (P2).
- **Status: Pass**

## `/create-your-own-pasta` (preview)
- **Primary keyword:** olive garden create your own pasta. **Intent:** how to build a pasta; pasta, sauce and topping options with prices and calories.
- **Content:** about 2,800 words. Pasta builds and an option table, 6 FAQs.
- **Status: Pass**

## `/lunch-menu` (preview)
- **Primary keyword:** olive garden lunch menu. **Intent:** lunch hours, lunch prices, and how lunch differs from dinner.
- **Content:** about 4,100 words, 6 FAQs.
- **Accuracy:** lunch hours and lunch-only prices change by restaurant and over time. Re-check them before launch (P1).
- **Linking:** Batch 1 inline text still links to `/#lunch-menu`. Point it to `/lunch-menu` after publishing (P2).
- **Status: Needs Improvement**

## `/desserts` (preview)
- **Primary keyword:** olive garden dessert menu. **Intent:** dessert prices and calories, to go, and catering desserts.
- **Content:** about 2,500 words, 6 FAQs.
- **Issue:** the to-go FAQ answer uses the same template as the kids to-go answer (similar answer text). Optional rewording (P3).
- **Image issue:** the Doughnuts photo differs from the dish (optional replacement, P3).
- **Status: Pass**

## `/drink-menu` (preview)
- **Primary keyword:** olive garden drink menu. **Intent:** an overview of all drinks (hub for non-alcoholic, wine and beer).
- **Content:** about 2,900 words, 5 FAQs.
- **Image issues:** the Cappuccino and 2-Liter Soda photos differ from the items (optional, P3).
- **Status: Pass**

## `/sides-sauces-and-extras` (preview)
- **Primary keyword:** olive garden sides menu. **Intent:** sides and add-on prices.
- **Keyword:** the primary keyword phrase is not in the title or H1. They say "Sides, Sauces & Extras", the title the owner approved. It is covered in the intro.

  Optional: the owner could add "Sides" wording to the title (P3, owner decision).
- **Image issue:** the Side of Meatballs photo differs (optional, P3).
- **Status: Pass**

## `/non-alcoholic-beverages` (preview)
- **Primary keyword:** olive garden non alcoholic drinks. **Intent:** soft drinks, tea, lemonade, coffee, gallons; prices and calories.
- **Content:** about 3,100 words, 6 FAQs.
- **Accuracy:** the refill policy wording is not verified from an official source. The page states it cautiously; re-check it before launch (P1).
- **Status: Needs Improvement** (refill policy to verify)

## `/wine-and-beer-to-go` (preview)
- **Primary keyword:** olive garden wine and beer menu. **Intent:** wine and beer prices, and the to-go rules (ID, state laws).
- **Content:** about 3,700 words, 6 FAQs.
- **Status: Pass**

## `/gluten-sensitive` (preview)
- **Primary keyword:** olive garden gluten free menu. **Intent:** which dishes are gluten-sensitive, prices, and safety notes.
- **Content:** about 2,900 words. Cross-contact warning above the table, 6 FAQs.
- **Issues:**
  - The FAQ "Does Olive Garden have gluten-sensitive kids meals?" is nearly identical to the kids page FAQ (P2).
  - Grilled Chicken Parmigiana (GS) has no photo; it is the owner's top-priority missing photo.
- **Status: Pass**

## `/kids-meal` (preview)
- **Primary keyword:** olive garden kids menu. **Intent:** kids meal prices, what is included, calories, and age.
- **Content:** about 3,000 words, 7 FAQs.
- **Accuracy:** the kids age wording and the basis for Kids Fettuccine Alfredo's 440 calories need a fresh check (P1).
- **Image issue:** kids photos show carrots (optional, P3).
- **Status: Needs Improvement** (age wording and calorie basis to verify)

## `/catering` (preview)
- **Primary keyword:** olive garden catering menu. **Intent:** trays, packages, per-person cost, ordering, and delivery.
- **Content:** about 7,500 words, the longest category page. Serving planner and combined-tray guidance, 9 FAQs.
- **Accuracy:** "starting at" prices and delivery minimums/rules need a fresh check before launch (P1).
- **Status: Needs Improvement** (catering prices and delivery rules to re-check)
