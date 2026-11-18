# Product Development Plan (individual menu item pages)

> **Status (2026-11-18): all 77 item pages are PUBLISHED** after the owner's visual approval (indexing off until launch).
>
> **Progress (2026-11-18, item-page phase complete):** 77 item pages (latest count; the lines below describe the Phase 4 state). Final batch added: Chicken Tortelloni Alfredo and Chicken & Shrimp Carbonara (version selector), 4 sides/sauces, 9 drinks. Coverage and reasons: `PRODUCT_INVENTORY.md`.
>
> Phase 4 state: 62 item pages.
> - **Published (1):** Fried Mozzarella.
> - **Preview (61),** waiting for owner review:
>   - Every eligible single-row item, the house salad and 6 sides with search demand.
>   - The 6 Phase 4 dishes with the version selector: Chicken Alfredo, Calabrian Bucatini, Spaghetti & Meatballs, Cheese Ravioli, Lunch Spaghetti (`/menu/lunch-spaghetti`), Chicken Parmigiana Sandwich.
>   - Grilled Chicken Parmigiana (gluten-sensitive), with a placeholder instead of a misleading photo.
> - **No eligible product is left unbuilt.** Open points: `research/products/PENDING.md`.

**Prepared:** 2026-11-18, after the owner approved and published the Fried
Mozzarella sample. Data basis: `PRODUCT_ELIGIBILITY_REPORT.md` (official
U.S. guides US_101926). **No other page has been created.** Each page still
needs gates 2, 4, 6, 7 of `PRODUCT_CONTENT_CHECKLIST.md`, its own fact log,
and owner approval before `published`.

## Rules for every page

- One page per **product** (not per offering). The home category = the
  primary offering below; other placements (lunch, lighter portions, catering,
  family-style) appear in the page's sizes table and link to their category pages.
- Use the approved Fried Mozzarella layout (`components/product/`), premium
  design standard, official rows only, editorial pairings labeled.
- Before each page: re-check the price on the official site (or keep the last
  verified month and say nothing more), confirm the photo matches the dish, write
  original copy, 3+ FAQs, exactly 4 Related Menus.
- Build in small batches (3-5 pages), owner review per batch.

## Summary

| Group | Products |
|---|---:|
| Published | 1 (Fried Mozzarella) |
| Data-ready (single official row) | 60 |
| Official rows per version (needs version-aware layout) | 6 |
| Total candidates | 67 |

Not candidates: bundles, combinations, wines/beers (generic rows only),
multi-flavor drinks, catering-only items, items without verified price,
calories or photo (see the eligibility report).

## Phase 1: Appetizers (finish the category of the approved sample) (9)

Same layout as Fried Mozzarella, single-row official data, strong item searches (calamari, toasted ravioli, breadsticks).

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Breadsticks (`breadsticks`) | `appetizers--breadsticks` | family-style-meals, soups-salad-and-breadsticks, catering | **Preview, batch 1 (2026-11-18)**: /menu/breadsticks. Per-breadstick nutrition; also sold by 6/12 and on catering. |
| Fried Mozzarella (`fried-mozzarella`) | `appetizers--fried-mozzarella` | catering | **Published** /menu/fried-mozzarella |
| Stuffed Ziti Fritta (`stuffed-ziti-fritta`) | `appetizers--stuffed-ziti-fritta` | — | **Preview, batch 1 (2026-11-18)**: /menu/stuffed-ziti-fritta |
| Calamari (`calamari`) | `appetizers--calamari` | — | **Preview, batch 1 (2026-11-18)**: /menu/calamari |
| Meatballs Parmigiana (`meatballs-parmigiana`) | `appetizers--meatballs-parmigiana` | — | Ready |
| Spinach-Artichoke Dip (`spinach-artichoke-dip`) | `appetizers--spinach-artichoke-dip` | catering | Ready |
| Lasagna Fritta (`lasagna-fritta`) | `appetizers--lasagna-fritta` | — | Ready |
| Shrimp Fritto Misto (`shrimp-fritto-misto`) | `appetizers--shrimp-fritto-misto` | — | Ready |
| Toasted Ravioli (`toasted-ravioli`) | `appetizers--toasted-ravioli` | — | **Preview, batch 1 (2026-11-18)**: /menu/toasted-ravioli |

## Phase 2: Classic Entrées and Alfredos (single-version dishes) (20)

Highest item-level search interest; lunch / lighter / catering versions of the same dish go into each page's sizes table, not separate pages.

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Chicken Parmigiana (`chicken-parmigiana`) | `classic-entrees--chicken-parmigiana` | family-style-meals, buy-one-take-one, lighter-portions, lunch-menu, catering | Ready |
| Fettuccine Alfredo (`fettuccine-alfredo`) | `classic-entrees--fettuccine-alfredo` | family-style-meals, buy-one-take-one, amazing-alfredos, lighter-portions, lunch-menu, catering | Ready |
| Shrimp Alfredo (`shrimp-alfredo`) | `classic-entrees--shrimp-alfredo` | family-style-meals, amazing-alfredos, catering | Ready |
| Five Cheese Ziti al Forno (`five-cheese-ziti-al-forno`) | `classic-entrees--five-cheese-ziti-al-forno` | family-style-meals, buy-one-take-one, lighter-portions, lunch-menu, catering | Ready |
| Spaghetti with Meat Sauce (`spaghetti-with-meat-sauce`) | `classic-entrees--spaghetti-with-meat-sauce` | family-style-meals, buy-one-take-one, catering | Ready |
| Lasagna Classico (`lasagna-classico`) | `classic-entrees--lasagna-classico` | family-style-meals, buy-one-take-one, lighter-portions, lunch-menu, catering | Ready |
| Chicken Scampi (`chicken-scampi`) | `classic-entrees--chicken-scampi` | family-style-meals, catering | Ready |
| Shrimp Scampi (`shrimp-scampi`) | `classic-entrees--shrimp-scampi` | family-style-meals, lunch-menu, catering | Ready |
| Shrimp Carbonara (`shrimp-carbonara`) | `classic-entrees--shrimp-carbonara` | — | Ready |
| Tour of Italy (`tour-of-italy`) | `classic-entrees--tour-of-italy` | — | Ready |
| Ravioli Carbonara (`ravioli-carbonara`) | `classic-entrees--ravioli-carbonara` | — | Ready |
| Spaghetti with Marinara (`spaghetti-with-marinara`) | `classic-entrees--spaghetti-with-marinara` | — | Ready |
| Stuffed Chicken Marsala (`stuffed-chicken-marsala`) | `classic-entrees--stuffed-chicken-marsala` | — | Ready |
| Steak Gorgonzola Alfredo (`steak-gorgonzola-alfredo`) | `classic-entrees--steak-gorgonzola-alfredo` | — | Ready |
| Seafood Alfredo (`seafood-alfredo`) | `classic-entrees--seafood-alfredo` | amazing-alfredos | Ready |
| Eggplant Parmigiana (`eggplant-parmigiana`) | `classic-entrees--eggplant-parmigiana` | lighter-portions, lunch-menu | Ready |
| Grilled Chicken Margherita (`grilled-chicken-margherita`) | `classic-entrees--grilled-chicken-margherita` | — | Ready |
| Herb-Grilled Salmon (`herb-grilled-salmon`) | `classic-entrees--herb-grilled-salmon` | gluten-sensitive | Ready |
| 6 oz. Sirloin (`6-oz-sirloin`) | `classic-entrees--6-oz-sirloin` | gluten-sensitive | Ready |
| Spicy Alfredo Fettuccine (`spicy-alfredo-fettuccine`) | `classic-entrees--spicy-alfredo-fettuccine` | lighter-portions, lunch-menu | Ready. Limited time: build only if still on the menu. |

## Phase 3: Desserts (7)

Single rows, clear allergens, catering cake sizes shown in the sizes table.

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Chocolate Lasagna (`chocolate-lasagna`) | `desserts--chocolate-lasagna` | — | Ready |
| Black Tie Mousse Cake (`black-tie-mousse-cake`) | `desserts--black-tie-mousse-cake` | catering | Ready |
| Tiramisu (`tiramisu`) | `desserts--tiramisu` | catering | Ready |
| Strawberry Cream Cake (`strawberry-cream-cake`) | `desserts--strawberry-cream-cake` | — | Ready |
| Warm Italian Doughnuts (`warm-italian-doughnuts`) | `desserts--warm-italian-doughnuts` | — | Ready |
| Sicilian Cheesecake with Strawberry Topping (`sicilian-cheesecake-with-strawberry-topping`) | `desserts--sicilian-cheesecake-with-strawberry-topping` | — | Ready |
| Pumpkin Cookie Butter Cheesecake (`pumpkin-cookie-butter-cheesecake`) | `desserts--pumpkin-cookie-butter-cheesecake` | catering | Ready. Limited time: build only if still on the menu. |

## Phase 4: Multi-version entrées (needs a version-aware layout first) (6)

Each version has its own official nutrition and allergen row. **Layout approved and built 2026-11-18** (version selector, `PRODUCT_PAGE_ARCHITECTURE.md` §5b).

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Chicken Alfredo (`chicken-alfredo`) | `classic-entrees--chicken-alfredo` | family-style-meals, amazing-alfredos, catering | Version-aware layout. Two versions (grilled chicken vs crispy chicken fritta); highest search interest among entrées. |
| Calabrian Steak & Shrimp Bucatini (`calabrian-steak-and-shrimp-bucatini`) | `classic-entrees--calabrian-steak-and-shrimp-bucatini` | — | Version-aware layout. Three protein versions. |
| Spaghetti & Meatballs (`spaghetti-and-meatballs`) | `classic-entrees--spaghetti-and-meatballs` | lighter-portions, lunch-menu | Version-aware layout. Marinara vs meat sauce versions; image: white version pending. |
| Cheese Ravioli (`cheese-ravioli`) | `classic-entrees--cheese-ravioli` | lighter-portions, lunch-menu | Version-aware layout. Marinara vs meat sauce versions. |
| Spaghetti (`spaghetti`) | `lunch-menu--spaghetti` | — | Version-aware layout. Overlaps Spaghetti with Marinara / Meat Sauce; decide one canonical page (cannibalization). |
| Chicken Parmigiana Sandwich (`chicken-parmigiana-sandwich`) | `lunch-menu--chicken-parmigiana-sandwich` | — | Version-aware layout. Two versions (crispy fritta vs grilled chicken). |

## Phase 5: Lunch sandwiches and flatbreads (5)

Weekday-lunch items with their own rows; check photo accuracy first.

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Eggplant Parmigiana Sandwich (`eggplant-parmigiana-sandwich`) | `lunch-menu--eggplant-parmigiana-sandwich` | — | Ready |
| Italian Grilled Chicken Sandwich (`italian-grilled-chicken-sandwich`) | `lunch-menu--italian-grilled-chicken-sandwich` | — | Ready. Photo differs from the official dish (IMAGE_MANIFEST): new photo needed first. |
| Chicken Alfredo Flatbread (`chicken-alfredo-flatbread`) | `lunch-menu--chicken-alfredo-flatbread` | — | Ready |
| Five Cheese Flatbread (`five-cheese-flatbread`) | `lunch-menu--five-cheese-flatbread` | — | Ready |
| Classic Pepperoni Flatbread (`classic-pepperoni-flatbread`) | `lunch-menu--classic-pepperoni-flatbread` | — | Ready |

## Phase 6: Soups, Salad and Breadsticks (1)

Only the house salad has a single product row. Individual soups are options of one product (Homemade Soups); per-soup pages would need new product records (owner decision).

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Our Famous Jumbo House Salad (`famous-house-salad`) | `soups-salad-and-breadsticks--famous-house-salad` | family-style-meals, catering | Ready. Coordinate with the gluten-sensitive 'without croutons' row; one page. |

## Phase 7: Gluten-sensitive and Kids items (extra care) (9)

Sensitive audiences: wording rules for 'gluten-sensitive' (never 'gluten-free') and kids portions; consider whether the category pages already answer these intents.

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Zuppa Toscana (`zuppa-toscana`) | `gluten-sensitive--zuppa-toscana` | — | Ready |
| Famous House Salad without Croutons (`famous-house-salad-without-croutons`) | `gluten-sensitive--famous-house-salad-without-croutons` | — | Ready. Better as a section of the house salad page than its own page. |
| Grilled Chicken Parmigiana (`grilled-chicken-parmigiana`) | `gluten-sensitive--grilled-chicken-parmigiana` | — | Ready |
| Rotini Pasta with Marinara (`rotini-pasta-with-marinara`) | `gluten-sensitive--rotini-pasta-with-marinara` | — | Ready |
| Rotini Pasta with Meat Sauce (`rotini-pasta-with-meat-sauce`) | `gluten-sensitive--rotini-pasta-with-meat-sauce` | — | Ready |
| Kids Pizza (`kids-pizza`) | `kids-meal--kids-pizza` | — | Ready |
| Kids Chicken Fingers (`kids-chicken-fingers`) | `kids-meal--kids-chicken-fingers` | — | Ready |
| Kids Macaroni & Cheese (`kids-macaroni-and-cheese`) | `kids-meal--kids-macaroni-and-cheese` | — | Ready |
| Kids Cheese Ravioli (`kids-cheese-ravioli`) | `kids-meal--kids-cheese-ravioli` | — | Ready |

## Not recommended for now: Sides and sauces (10)

Data-ready but low unique search intent; the Sides page answers them. Build only if search data shows demand.

| Product | Primary offering (home) | Also on | Status / note |
|---|---|---|---|
| Side of Meatballs (`side-of-meatballs`) | `sides-sauces-and-extras--side-of-meatballs` | — | Ready. Photo shows four meatballs; the official side has three: new photo needed first. |
| Side of Grilled Chicken (`side-of-grilled-chicken`) | `sides-sauces-and-extras--side-of-grilled-chicken` | — | Ready |
| Side of Mashed Potatoes (`side-of-mashed-potatoes`) | `sides-sauces-and-extras--side-of-mashed-potatoes` | — | Ready |
| Side of Broccoli (`side-of-broccoli`) | `sides-sauces-and-extras--side-of-broccoli` | — | Ready |
| Side of Alfredo Sauce (`side-of-alfredo-sauce`) | `sides-sauces-and-extras--side-of-alfredo-sauce--large` | — | Ready |
| Side of Marinara Sauce (`side-of-marinara-sauce`) | `sides-sauces-and-extras--side-of-marinara-sauce--large` | — | Ready |
| Side of Meat Sauce (`side-of-meat-sauce`) | `sides-sauces-and-extras--side-of-meat-sauce--large` | — | Ready |
| Side of Five Cheese Marinara Sauce (`side-of-five-cheese-marinara-sauce`) | `sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large` | — | Ready |
| Side of Crispy Chicken Fritta (`side-of-crispy-chicken-fritta`) | `sides-sauces-and-extras--side-of-crispy-chicken-fritta` | — | Ready |
| Italian Sausage (`italian-sausage`) | `sides-sauces-and-extras--italian-sausage` | catering | Ready |

## Open owner decisions before or during the phases

1. Side of Crispy Shrimp Fritta calories (200 vs guide 220): serving size not confirmable (see NUTRITION_DATA_REPORT). Not a page candidate now.
2. Version-aware layout for Phase 4 (Chicken Alfredo, Spaghetti & Meatballs, Cheese Ravioli, Calabrian Bucatini, lunch Spaghetti, Chicken Parmigiana Sandwich).
3. Replacement photos: Italian Grilled Chicken Sandwich, Side of Meatballs.
4. Whether to create per-soup products (Phase 6) and sides pages (not recommended).
5. Batch size and order inside each phase (suggested: highest search interest first).
