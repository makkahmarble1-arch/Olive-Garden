# Content Architecture

**Status:** Approved by the owner (2026-11-11). Data model implemented in
`content/menu/` (all 210 inventory entries imported, no prices or calories yet).
**Source of scope:** `docs/MENU_INVENTORY.md` (owner-approved content scope:
17 categories, 210 category-item placements). The inventory is **not** verified
2026 menu data. No prices, calories, or availability are confirmed.

> **Research update (2026-11-12, owner Decisions 1-4):** `research/menu/`
> holds verified data for all 17 categories: the 210 inventory entries plus
> 21 new official items (owner-approved; 231 offerings, 146 products), 23
> Create Your Own Pasta option records, and decisions for alias cases A1-A17
> (`research/menu/ALIAS_MAPPING.md`). The counts and code described below are
> the current `content/menu/` data (210 / 130); they change only when the
> owner approves integrating the research.

Related docs: `MENU_PAGE_OUTLINES.md`, `MENU_RESEARCH_PLAN.md`,
`INTERNAL_LINKING.md`, `IMAGE_REQUIREMENTS.md`, `SEO_ARCHITECTURE.md`.

> **Superseded:** the earlier proposal (12 pages under `/menu/...` + 5 sections,
> and `/menu` as a noindex-only directory) was replaced by the owner's
> decisions below.

---

## 1. Approved decisions

1. **17 dedicated category pages.** Every inventory category gets its own
   page. No category is merged into another or turned into a section.
2. **Root-level URLs** with the exact approved slugs (§2). Category pages are
   **not** placed under `/menu/`.
3. **`/menu` is not a second full-menu page** (final owner decision,
   2026-11-12). It keeps its category cards, stays noindex during
   development, and a redirect `/menu` → `/` is reviewed before launch.
   *(Earlier plan, superseded: "/menu is the main hub and becomes indexable".)*
4. **Every inventory entry is preserved** as its own data record (an
   "offering"), linked to a canonical product. Nothing is deleted or merged.
5. **Possible aliases stay unresolved** (17 cases, §7) until the owner
   approves them with evidence.
6. **New domain.** The site launches on a new domain (not decided yet). No
   existing website is migrated, redirected, or changed.
7. **Price benchmark: Olive Garden Orlando - Millenia Mall**, 4101 Conroy
   Road, Orlando, FL 32839 (approved 2026-11-11), **online pickup** prices
   (`MENU_RESEARCH_PLAN.md` §3).
8. **No individual pages per menu item** (unchanged).
9. **Homepage = primary indexable full-menu page** (owner decision,
   2026-11-12): all 17 categories and every offering, using one shared
   structured data source with the category pages
   (`MENU_PAGE_OUTLINES.md` "Homepage").
10. **Category pages** give detailed category information (table,
    nutrition, FAQs, links, 3-5 images) and are indexed when complete.
11. **Visitor ratings** (owner decision, 2026-11-12) are one shared data
    set for homepage and category pages; designed in the rating lesson.

---

## 2. Category → URL mapping (approved)

| # | Category (public name) | Inventory name | Entries | URL |
|---:|---|---|---:|---|
| 1 | Family-Style Meals | Family-style Meals | 20 | `/family-style-meals` |
| 2 | Appetizers | Appetizers | 10 | `/appetizers` |
| 3 | Classic Entrees | Classic Entrees | 27 | `/classic-entrees` |
| 4 | Buy One Take One | Buy One Take One | 7 | `/buy-one-take-one` |
| 5 | Amazing Alfredos | Amazing Alfredos | 5 | `/amazing-alfredos` |
| 6 | Soups, Salad and Breadsticks | Soups, salad and breadsticks | 6 | `/soups-salad-and-breadsticks` |
| 7 | Lighter Portions | Lighter portions | 7 | `/lighter-portions` |
| 8 | Create Your Own Pasta | Create your own pasta | 0 | `/create-your-own-pasta` |
| 9 | Lunch Menu | Lunch menu | 10 | `/lunch-menu` |
| 10 | Desserts | Desserts | 6 | `/desserts` |
| 11 | Drink Menu | Drink menu | 12 | `/drink-menu` |
| 12 | Sides, Sauces and Extras | Sides, sauces and extras | 9 | `/sides-sauces-and-extras` |
| 13 | Non-Alcoholic Beverages | Non- alcoholic beverages | 13 | `/non-alcoholic-beverages` |
| 14 | Wine & Beer To Go | Wine & beer to go | 19 | `/wine-and-beer-to-go` |
| 15 | Gluten Sensitive | Gluten sensitive | 10 | `/gluten-sensitive` |
| 16 | Kids Meal | Kids meal | 11 | `/kids-meal` |
| 17 | Catering | Catering | 38 | `/catering` |
| | **Total** | | **210** | |

In code: `content/menu/categories.ts` (`id` = `slug` = the values above).
Links are always built with `menuCategoryPath(slug)` from `lib/content.ts`,
which returns `/{slug}`.

### 2.1 Routing plan (not built yet)

- Category pages will be served by one dynamic route at the root,
  `app/[category]/page.tsx`, with `generateStaticParams` (published
  categories only) and `dynamicParams = false`, so any other root path
  returns 404.
- Fixed routes (`/menu`, `/blog`, `/about`, …) always win over the dynamic
  route. Validation blocks a category slug that equals a reserved route.
- Pages are not created until the owner approves their content (Lesson 5+).

---

## 3. URL inventory

| URL | Status | Indexing |
|---|---|---|
| `/` | Exists (Lesson 5 version; to be rebuilt as the full-menu homepage) | index |
| `/menu` | Exists (category cards) | noindex, follow; redirect to `/` reviewed before launch |
| `/design-preview`, `/design-preview/article` | Exist (dev only, 404 in production) | noindex |
| `/appetizers` | Built, published 2026-11-11 | index |
| Other 16 category URLs (§2) | Recorded, not built yet | noindex ("preview") until complete and approved |

---

## 4. Distinct intent for overlapping categories

All 17 pages stay separate, so overlapping pages must each answer a
different question. Never copy descriptive paragraphs between pages; mention
the other page and link to it instead. Full outlines: `MENU_PAGE_OUTLINES.md`.

| Page | Overlaps with | Its own angle (what makes it useful on its own) |
|---|---|---|
| Classic Entrees | many | The complete full-size entree list; comparing entrees by type (pasta, chicken, seafood, steak) |
| Amazing Alfredos | Classic Entrees (5/5 items) | Alfredo-only comparison: the 5 Alfredo dishes side by side (protein, price, calories) |
| Buy One Take One | Classic Entrees (5/7) | How the promotion works: eligible dishes, rules, dates, dine-in/to-go terms. Only if verified current |
| Create Your Own Pasta | Catering pasta station | How to build a pasta: verified pasta, sauce, and topping options |
| Lighter Portions | Lunch Menu (7/7) | Smaller portions: what is available, how portions compare, when offered |
| Lunch Menu | Lighter Portions, Classic | Lunch timing, lunch pricing, lunch-only offers |
| Family-Style Meals | Classic (12+2), Catering (16+1) | Feeding a household at home: bundles, family-size portions, cost per bundle |
| Catering | Family-Style (16+1) | Events and large groups: pans, combinations, serving counts, ordering terms |
| Drink Menu | Non-Alcoholic Beverages (12/12) | The drinks list as a menu section, including to-go sizes (gallons, 2-liter, fountain) |
| Non-Alcoholic Beverages | Drink Menu (12/13) | Choosing a non-alcoholic drink: lemonades vs. limonatas vs. teas, coffee and espresso, caffeine/sugar facts if official |
| Wine & Beer To Go | — | Alcohol to go: list, availability by state/location, 21+ rules |
| Gluten Sensitive | Kids, Classic | Ordering with gluten sensitivity, using official allergen wording only |
| Kids Meal | Gluten Sensitive | Kids options, age limits, what a kids meal includes |
| Soups, Salad and Breadsticks | Lunch, Family-Style | The soups, the salad, breadsticks, refills and the combo |
| Sides, Sauces and Extras | Catering sauces | Add-ons and large sauces for home |
| Appetizers, Desserts | Catering | The dine-in starters/desserts list |

If verified research shows a page cannot offer distinct, helpful content
(e.g. a promotion has ended), the owner decides what to do: keep it as a
clearly dated page, keep it noindex, or retire it with a redirect.
Nothing is removed automatically.

---

## 5. Overlap analysis

### 5.1 Category-level overlaps

| Overlap | Finding |
|---|---|
| Drink Menu ⊂ Non-Alcoholic Beverages | All 12 Drink Menu items appear in Non-Alcoholic Beverages; NA adds Lavazza Espresso |
| Lighter Portions ⊂ Lunch Menu | All 7 Lighter Portions items appear in Lunch Menu |
| Amazing Alfredos ⊂ Classic Entrees | All 5 appear in Classic Entrees |
| Family-Style Meals ≈ Classic Entrees | 12 names match exactly (incl. Family-Style Lasagna Bundle) + 2 close variants (spaghetti with marinara, cheese ravioli) |
| Family-Style Meals ≈ Catering | 16 names match exactly + 1 close variant (cheese ravioli) |
| Buy One Take One ∩ Classic Entrees | 5 of 7 shared; Rigatoni alla Vodka and Four-Cheese Manicotti with Marinara appear **only** in Buy One Take One |
| Gluten Sensitive ∩ Kids Meal | Rotini-based options appear in both (adult vs. kids versions not confirmed) |

### 5.2 Products appearing in several categories

| Product | Categories |
|---|---|
| Fettuccine Alfredo | Family-Style · Classic · Buy One Take One · Amazing Alfredos · Lighter · Lunch · Catering (7) |
| Chicken Parmigiana | Family-Style · Classic · Buy One Take One · Lighter · Lunch · Catering (6) |
| Five Cheese Ziti al Forno | Family-Style · Classic · Buy One Take One · Lighter · Lunch · Catering (6) |
| Lasagna Classico | Family-Style · Classic · Buy One Take One · Lighter · Lunch · Catering (6) |
| Chicken Alfredo, Shrimp Alfredo, Chicken Tortelloni Alfredo | Family-Style · Classic · Amazing Alfredos · Catering (4 each) |
| Spaghetti with Meat Sauce | Family-Style · Classic · Buy One Take One · Catering (4) |
| Shrimp Scampi | Family-Style · Classic · Lunch · Catering (4) |
| Breadsticks | Family-Style · Appetizers · Soups/Salad/Breadsticks · Catering (4) |
| Cheese Ravioli | Classic · Lighter · Lunch (3) (sauce-variant names are separate, see A8) |
| Our Famous Jumbo House Salad, Homemade Soups | Family-Style · Soups/Salad/Breadsticks · Catering (3 each) |
| Spaghetti & Meatballs, Eggplant Parmigiana | Classic · Lighter · Lunch (3 each) |
| Chicken Scampi, Chicken and Shrimp Carbonara | Family-Style · Classic · Catering (3 each) |
| 2-Liter Soda, Gallon Iced Teas & Raspberry Lemonade | Drink Menu · Non-Alcoholic · Catering (3 each) |
| Other shared items | 2 categories each (see `content/menu/offerings/`) |

The data has **130 canonical products** for the 210 offerings.

---

## 6. Menu data architecture (implemented)

### 6.1 Concepts

| Concept | Meaning | Example |
|---|---|---|
| **Category** (`MenuCategoryDef`) | One of the 17 categories = one page | `lighter-portions` → `/lighter-portions` |
| **Product** (`MenuProduct`) | One canonical dish/drink, shared across categories | `chicken-parmigiana` |
| **Offering** (`MenuOffering`) | One inventory entry: a product in one category, with its own price, calories, size, availability | `lunch-menu--chicken-parmigiana` |
| **Reference location** (`ReferenceLocation`) | An owner-approved restaurant used as the price benchmark | (none yet; Orlando, FL market) |
| **Alias case** (`AliasCase`) | A possible duplicate name, unresolved until approved | `A1` |

Example: Chicken Alfredo has four offerings: Classic Entrees and Amazing
Alfredos (portion type `regular`), Family-Style Meals (`family-style`), and
Catering (`catering`).
Each can have a different price, calories, and serving size.

### 6.2 Files

```
content/menu/
├── categories.ts        17 MenuCategoryDef + /menu groups + inventory totals (17 / 210)
├── products.ts          130 canonical MenuProduct records
├── offerings/
│   ├── <category-id>.ts One file per category, entries in inventory order (17 files)
│   └── index.ts         Combines all offerings (210)
├── locations.ts         Reference market (Orlando, FL) + approved restaurants (empty)
├── aliases.ts           17 unresolved alias cases (A1–A17)
└── _template.ts         Example of a verified offering entry (not imported)
lib/
├── types.ts             All menu types
├── menu-data.ts         defineOfferings(): fills unknown fields with safe defaults
├── menu-validation.ts   validateMenuData(): data checks
└── content.ts           Runs validation; read helpers + URL helpers
```

### 6.3 Offering fields

| Requirement | Field |
|---|---|
| Unique ID | `id` = `<categoryId>--<productId>` (+ `--<variant>` for size variants, e.g. `--large`) |
| Original item name | `inventoryName` (exact inventory text, never edited) |
| Display name | `displayName` (capitalization/spelling corrected) |
| Category | `categoryId` (+ `inventoryOrder` inside the category) |
| Description | `description` (null until written from verified facts) |
| Price | `prices: PriceObservation[]` (empty = "Not verified yet" while research is unfinished) |
| Value basis (planned, Lesson 7) | official / calculated / estimated per value, plus a display note when no credible value exists (`MENU_RESEARCH_PLAN.md` §1). Needs a data model + validation update before estimated values are entered |
| Rating (planned) | Visitor ratings, stored outside `content/menu/` (rating lesson) |
| Reference location | `prices[].locationId` → `content/menu/locations.ts` |
| Source URL | `prices[].sourceUrl` (or `sourceNote` for in-store evidence), `caloriesSourceUrl` |
| Verification date | `prices[].checkedAt`, `verifiedAt` |
| Calories / range | `calories`, `caloriesMax` (range), `caloriesBasis` |
| Serving size | `servingSize` |
| Portion type | `portionType` (default from the category; confirm in research) |
| Availability | `availability` (`unknown` until checked) |
| Image path | `image: ImageRef \| null` (product image can be shared via `MenuProduct.image`) |
| Verification status | `status`: `verified` / `needs-verification` / `not-verified` |
| Uncertainty | `notes` (internal) |

Prices are **location-specific**: several `PriceObservation`s can exist for one
offering (different locations or dates).

### 6.4 Naming rules used in the import

- Product ids are lowercase-hyphenated from the display name (`&` → `and`).
- Offerings with the **same name** (after fixing case/spelling) share a product.
- Clear **size variants** of the same name share a product with a variant id:
  `Large Family-Style Lasagna Bundle` (`--large`), `Homemade Soups (Large)` (`--large`).
- Names in an **alias case** are **separate products** until approved.
- Corrections applied to display names only (original kept in `inventoryName`):
  capitalization throughout; `lced` → `Iced`; `6 oz.sirloin` → `6 oz. Sirloin`;
  `Tour of italy` → `Tour of Italy`; `Non- alcoholic` → `Non-Alcoholic`;
  `Soup, salad and breadsticks | Lunch` → `Soup, Salad and Breadsticks (Lunch)`;
  `Homemade soups large` → `Homemade Soups (Large)`; `(1 liter bottle)` → `(1-Liter Bottle)`.
  `Desert Pear Limonata` kept as written (likely correct; confirm).

### 6.5 Validation (`lib/menu-validation.ts`)

Runs every time `lib/content.ts` loads, so `npm run dev` and `npm run build`
fail with a clear list of problems. Checks:

- 17 categories; unique ids, slugs, and order; slugs lowercase-hyphenated and
  not a reserved route (`menu`, `blog`, `about`, …); every category in one `/menu` group.
- 210 offerings in total; each category has exactly its inventory count;
  unique offering ids; every `productId` and `categoryId` exists.
- Every product is used; every alias case points to existing offerings.
- **Accuracy guards:** a price or calorie value can only be stored with
  `status: "verified"`; verified offerings need `verifiedAt`; each price needs
  an approved `locationId`, a date, and a source; calories need an official
  `caloriesSourceUrl`; `caloriesMax ≥ calories`; image paths start with `/images/`.

### 6.6 Display rules

- A price shows only if `status === "verified"` and `prices` is not empty.
  One observation → "$X.XX" with location and date; several → range + "varies by location".
- Calories show only if verified; ranges as "X–Y".
- `availability` other than `available` shows a visible note
  ("Limited time", "Not available at all locations", "Availability not confirmed").
- `toMenuTableItem()` (`lib/content.ts`) converts an offering into a
  `MenuTable` row. Still to add when pages are built: price-range display,
  calorie ranges, optional hidden Calories column (wine/beer).

---

## 7. Possible aliases (unresolved; do not merge)

Stored in `content/menu/aliases.ts` with the exact offering ids.

| # | Names | Question |
|---:|---|---|
| A1 | `Rotini Pasta with Marinara` / `Rotini with Marinara` (both Gluten Sensitive) | Same item twice, or adult vs. kids version? |
| A2 | `Rotini Pasta with Meat Sauce` / `Rotini with Meat Sauce` | Same as A1 |
| A3 | `Grilled Chicken with Rotini Pasta & Marinara` (GS) / `Kids Grilled Chicken…` (Kids) | Adult vs. kids, or the same item? |
| A4 | `Our famous Jumbo house salad` / `Large Salad` (Family-Style) | Same product? |
| A5 | `Famous House Salad without croutons` (GS) | Variant of the house salad (kept as its own offering) |
| A6 | `Toasted Ravioli` / `Toasted Beef Ravioli` (Catering) | Same product? |
| A7 | `Sicilian cheesecake with strawberry topping` / `Sicilian Cheesecake` (Catering) | Same product, different topping/format? |
| A8 | `Cheese Ravioli` / `…with meat or marinara sauce` / `…with Marinara or Meat Sauce` | One product with sauce choice? |
| A9 | `Spaghetti with marinara sauce` / `Spaghetti with Marinara` / `Spaghetti` (Lunch) | Which sauce is the lunch Spaghetti? |
| A10 | `Soup, salad & breadsticks` / `…\| Lunch` / `Weekday lunch special` | Same offer at different times? |
| A11 | `Side of Meatballs` / `Italian Meatballs` / `Meatballs Parmigiana` | Related but likely distinct |
| A12 | `Side of grilled chicken` / `Grilled Chicken Breasts` | Same product, different portion? |
| A13 | `Side of broccoli` / `Broccoli` | Same product, different portion? |
| A14 | `Side of … sauce (large)` / `… Dipping Sauce` (4 sauces) | Same sauce, different container size? |
| A15 | `Kids Chicken Fingers` / `Chicken Fingers` | Same product, different portion? |
| A16 | `Kids Tomato Sauce Pasta` vs. `Kids Rotini with Marinara`; `Kids Meat Sauce Pasta` vs. `Kids Rotini with Meat Sauce` | Regular vs. gluten-sensitive pasta? |
| A17 | `Zuppa Toscana` / `Homemade Soups` | Is Zuppa Toscana one of the homemade soups? |

**Other open questions** (also stored as `notes` on the offerings):
- `Cheese Grater` (Sides): product for sale or table service?
- `Family-Style Lasagna Bundle` listed under Classic Entrees: confirm it is sold there.
- `Steak Gorgonzola Alfredo` is in Classic Entrees but not Amazing Alfredos (kept as listed).
- `Create Your Own Pasta` (dine-in) vs. `Create Your Own Pasta Station` (Catering): different products.
- `Chicken Parmigiana Combination`, `Lasagna Combination`: catering-only products.

**How to resolve a case:** set its `status`; if confirmed the same, point
the offerings to one `productId`. Never delete an offering.

---

## 8. Missing information by category

| Category | Missing (beyond prices/calories for every item) |
|---|---|
| Family-Style Meals | Serving counts per bundle, what each bundle includes |
| Appetizers | Official descriptions; which dipping sauces come with breadsticks |
| Classic Entrees | Tour of Italy components; steak/salmon portion details |
| Buy One Take One | Is the offer current? Dates, rules, eligible items, dine-in only? |
| Amazing Alfredos | Whether this is a current official menu grouping |
| Soups, Salad and Breadsticks | Which soups; whether refills are included; lunch special terms |
| Lighter Portions | Current availability, hours, how portions differ |
| Create Your Own Pasta | **All options** (pastas, sauces, proteins, toppings) and their nutrition |
| Lunch Menu | Lunch hours/days; differences from dinner portions |
| Desserts | Official descriptions |
| Drink Menu / Non-Alcoholic Beverages | Sizes (gallon, 2-liter), refill policy, soda brands |
| Sides, Sauces and Extras | Portion sizes ("large"); what "Cheese Grater" is |
| Wine & Beer To Go | Whether allowed in Florida/Orlando; bottle sizes; ID rules |
| Gluten Sensitive | Official allergen statement and cross-contact warning |
| Kids Meal | Age limit; included sides/drink; kids pizza details |
| Catering | Serving sizes, minimums, lead time, delivery availability |

---

## 9. Domain and URL protection

- The site launches on a **new domain** (not decided). It does not replace
  any existing website: no migration, no redirects, no changes to the
  owner's other sites. The domain is never hardcoded (`NEXT_PUBLIC_SITE_URL`).
- Current routes (`/`, `/menu`, dev-only `/design-preview`) are kept;
  `/menu` → `/` redirect reviewed before launch (owner decision 2026-11-12).
- Once a URL is published and indexed, it is never renamed without a 301
  redirect plan.

---

## 10. Still open (owner)

1. ~~Alias cases A1–A17 and the open questions in §7~~ (decided 2026-11-12:
   `research/menu/ALIAS_MAPPING.md`. A4 "Large Salad" kept separate: no
   official listing to match. Cheese Grater is a product for sale; Family-Style
   Lasagna Bundle is officially listed in Classic Entrées; Buy One Take One is
   now the official "$6 Take Home Entrées" offer, 3 of 7 items eligible).
   Applying the decisions to `content/menu/aliases.ts` waits for integration approval.
2. ~~Approve the exact Orlando restaurant~~ (done: Orlando - Millenia Mall, 2026-11-11).
3. ~~Which category page first~~ (done: Appetizers, published 2026-11-11).
4. ~~Homepage featured categories~~ (superseded 2026-11-12: the homepage
   shows all 17 categories; `featuredOnHomepage` is no longer the homepage
   rule and may be removed or reused when the homepage is rebuilt).
5. ~~Future role of `/menu`~~ (decided 2026-11-12: noindex now, redirect
   to `/` reviewed before launch).
