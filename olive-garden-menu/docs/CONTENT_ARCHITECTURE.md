# Content Architecture

**Status:** Planning (2026-11-11). All URLs below are **provisional** until
the owner approves them.
**Source of scope:** `docs/MENU_INVENTORY.md` (owner-approved content scope:
17 categories, 210 category-item placements). The inventory is **not** verified
2026 menu data. No prices, calories, or availability are confirmed.

Related docs: `MENU_PAGE_OUTLINES.md`, `MENU_RESEARCH_PLAN.md`,
`INTERNAL_LINKING.md`, `IMAGE_REQUIREMENTS.md`, `SEO_ARCHITECTURE.md`.

---

## 1. Key decisions (proposed)

1. **All 17 categories are kept.** None is removed or renamed in the data.
2. **17 categories → 12 menu pages + 5 sections.** Five categories overlap
   so heavily with another category that a separate URL would be a thin
   duplicate. They become clearly labeled, linkable **sections** (`#anchor`)
   on a related page. Each can be promoted to its own page later if verified
   content justifies it.
3. **Every category-item placement is preserved** as its own data record
   (an "offering"), linked to a shared canonical product record.
4. **Shared products are never assumed identical** across categories.
   Price, portion, calories, and availability are stored per offering.
5. **No individual pages per menu item** (unchanged rule from `SEO_ARCHITECTURE.md`).

---

## 2. Category → page mapping

| # | Owner category | Items | Treatment | Page (provisional) | Anchor |
|---:|---|---:|---|---|---|
| 1 | Family-style Meals | 20 | **Own page** | `/menu/family-style-meals` | — |
| 2 | Appetizers | 10 | **Own page** | `/menu/appetizers` | — |
| 3 | Classic Entrees | 27 | **Own page** | `/menu/classic-entrees` | — |
| 4 | Buy One Take One | 7 | Section (promo, availability unverified) | `/menu/classic-entrees` | `#buy-one-take-one` |
| 5 | Amazing Alfredos | 5 | Section (all 5 items also in Classic Entrees) | `/menu/classic-entrees` | `#amazing-alfredos` |
| 6 | Soups, salad and breadsticks | 6 | **Own page** | `/menu/soups-salad-breadsticks` | — |
| 7 | Lighter portions | 7 | Section (all 7 items also in Lunch menu) | `/menu/lunch` | `#lighter-portions` |
| 8 | Create your own pasta | 0 | Section (no items supplied yet) | `/menu/classic-entrees` | `#create-your-own-pasta` |
| 9 | Lunch menu | 10 | **Own page** | `/menu/lunch` | — |
| 10 | Desserts | 6 | **Own page** | `/menu/desserts` | — |
| 11 | Drink menu | 12 | **Own page (merged with #13)** | `/menu/drinks` | — |
| 12 | Sides, sauces and extras | 9 | **Own page** | `/menu/sides-sauces-extras` | — |
| 13 | Non-alcoholic beverages | 13 | Section on the Drinks page | `/menu/drinks` | `#non-alcoholic-beverages` |
| 14 | Wine & beer to go | 19 | **Own page** (availability/legal check) | `/menu/wine-and-beer-to-go` | — |
| 15 | Gluten sensitive | 10 | **Own page** (allergen caution) | `/menu/gluten-sensitive` | — |
| 16 | Kids meal | 11 | **Own page** | `/menu/kids-menu` | — |
| 17 | Catering | 38 | **Own page** | `/menu/catering` | — |

**Why sections, not pages:**
- *Amazing Alfredos*: 5 of 5 items are also in Classic Entrees.
- *Lighter Portions*: 7 of 7 items are also in the Lunch menu.
- *Buy One Take One*: time-sensitive promotion; 5 of 7 items are also in
  Classic Entrees. A standalone deal page would go stale quickly. If the
  offer is verified as current and ongoing, it can become a guide later.
- *Create Your Own Pasta*: no items supplied. Becomes a page only if the
  official build options (pastas, sauces, proteins) are verified and give
  enough unique content.
- *Non-alcoholic beverages*: 12 of 13 items are identical to the Drink menu
  (only addition: Lavazza espresso). One Drinks page avoids two thin
  near-duplicates.

**Promotion rule:** a section can become its own URL only with owner approval,
verified content that is clearly distinct, and no change to any URL that is
already published (the section anchor can then link to the new page).

---

## 3. Provisional URL inventory

| URL | Status | Indexing |
|---|---|---|
| `/` | **Exists** | index |
| `/menu` | **Exists** (placeholder directory) | noindex, follow (see §8) |
| `/design-preview`, `/design-preview/article` | **Exist** (dev only, 404 in production) | noindex |
| `/menu/family-style-meals` | Provisional | noindex until verified content |
| `/menu/appetizers` | Provisional | same |
| `/menu/classic-entrees` | Provisional | same |
| `/menu/soups-salad-breadsticks` | Provisional | same |
| `/menu/lunch` | Provisional | same |
| `/menu/desserts` | Provisional | same |
| `/menu/drinks` | Provisional | same |
| `/menu/wine-and-beer-to-go` | Provisional | same |
| `/menu/sides-sauces-extras` | Provisional | same |
| `/menu/kids-menu` | Provisional | same |
| `/menu/gluten-sensitive` | Provisional | same |
| `/menu/catering` | Provisional | same |

Existing code has 6 **placeholder** categories in `content/menu/categories.ts`
(`appetizers`, `soups-salad-breadsticks`, `classic-entrees`, `chicken-seafood`,
`kids-menu`, `desserts`). `chicken-seafood` is **not** in the owner's
inventory and will be replaced when the data architecture is implemented.

---

## 4. Navigation groups (all 17 reachable)

| Group | Pages | Sections inside |
|---|---|---|
| **Dine-In Menu** | Appetizers · Soups, Salad & Breadsticks · Classic Entrees · Lunch · Desserts · Sides, Sauces & Extras | Amazing Alfredos · Create Your Own Pasta · Buy One Take One (Classic Entrees) · Lighter Portions (Lunch) |
| **Drinks** | Drinks · Wine & Beer To Go | Non-Alcoholic Beverages (Drinks) |
| **Special Diets & Kids** | Kids Menu · Gluten-Sensitive | — |
| **Groups & Takeout** | Family-Style Meals · Catering | — |

12 pages + 5 section links = all 17 owner categories. Details in `INTERNAL_LINKING.md`.

---

## 5. Overlap analysis

### 5.1 Category-level overlaps

| Overlap | Finding |
|---|---|
| Drink menu ⊂ Non-alcoholic beverages | All 12 Drink menu items appear in Non-alcoholic beverages; NA adds Lavazza espresso |
| Lighter portions ⊂ Lunch menu | All 7 Lighter portions items appear in Lunch menu |
| Amazing Alfredos ⊂ Classic Entrees | All 5 appear in Classic Entrees |
| Family-style Meals ≈ Classic Entrees | 12 names match exactly (incl. Family-style Lasagna Bundle) + 2 close variants (spaghetti with marinara, cheese ravioli); Family-style adds the large bundle, soups, salads, breadsticks |
| Family-style Meals ≈ Catering | 16 names match exactly + 1 close variant (cheese ravioli); catering adds combinations, pasta station, dipping sauces, appetizers, desserts, bottled water |
| Buy One Take One ∩ Classic Entrees | 5 of 7 shared; Rigatoni alla Vodka and Four-Cheese Manicotti with Marinara appear **only** in Buy One Take One |
| Gluten sensitive ∩ Kids meal | Rotini-based options appear in both (adult vs. kids versions not yet confirmed) |

### 5.2 Products appearing in several categories

Names normalized for comparison only; the owner's exact spelling is kept in data.

| Product (canonical, provisional) | Categories |
|---|---|
| Fettuccine Alfredo | Family-style · Classic · Buy One Take One · Amazing Alfredos · Lighter · Lunch · Catering (7) |
| Chicken Parmigiana | Family-style · Classic · Buy One Take One · Lighter · Lunch · Catering (6) |
| Five Cheese Ziti al Forno | Family-style · Classic · Buy One Take One · Lighter · Lunch · Catering (6) |
| Lasagna Classico | Family-style · Classic · Buy One Take One · Lighter · Lunch · Catering (6) |
| Cheese Ravioli (sauce variants) | Family-style · Classic · Lighter · Lunch · Catering (5) |
| Chicken Alfredo | Family-style · Classic · Amazing Alfredos · Catering (4) |
| Shrimp Alfredo | Family-style · Classic · Amazing Alfredos · Catering (4) |
| Chicken Tortelloni Alfredo | Family-style · Classic · Amazing Alfredos · Catering (4) |
| Spaghetti with Meat Sauce | Family-style · Classic · Buy One Take One · Catering (4) |
| Shrimp Scampi | Family-style · Classic · Lunch · Catering (4) |
| Breadsticks | Family-style · Appetizers · Soups/Salad/Breadsticks · Catering (4) |
| Spaghetti with Marinara (Sauce) | Family-style · Classic · Catering (3) |
| Chicken Scampi | Family-style · Classic · Catering (3) |
| Chicken and Shrimp Carbonara | Family-style · Classic · Catering (3) |
| Spaghetti & Meatballs | Classic · Lighter · Lunch (3) |
| Eggplant Parmigiana | Classic · Lighter · Lunch (3) |
| Our Famous Jumbo House Salad | Family-style · Soups/Salad/Breadsticks · Catering (3) |
| Homemade Soups | Family-style · Soups/Salad/Breadsticks · Catering (3) |
| 2-Liter Soda | Drink menu · Non-alcoholic · Catering (3) |
| Gallon Iced Teas & Raspberry Lemonade | Drink menu · Non-alcoholic · Catering (3) |
| Homemade Soups Large | Family-style · Catering (2) |
| Family-style Lasagna Bundle | Family-style · Classic (2) |
| Seafood Alfredo | Classic · Amazing Alfredos (2) |
| Herb-Grilled Salmon | Classic · Gluten sensitive (2) |
| 6 oz Sirloin | Classic · Gluten sensitive (2) |
| Dipping Sauces with Breadsticks | Appetizers · Soups/Salad/Breadsticks (2) |
| Fried Mozzarella | Appetizers · Catering (2) |
| Spinach-Artichoke Dip | Appetizers · Catering (2) |
| Black Tie Mousse Cake | Desserts · Catering (2) |
| Tiramisu | Desserts · Catering (2) |
| All other Drink menu items (10) | Drink menu · Non-alcoholic (2 each) |

---

## 6. Possible aliases and naming issues (flag for owner review, do not merge)

| # | Names | Question |
|---:|---|---|
| A1 | `Rotini Pasta with Marinara` / `Rotini with Marinara` (both in Gluten sensitive) | Same item listed twice, or adult vs. kids version? |
| A2 | `Rotini Pasta with Meat Sauce` / `Rotini with Meat Sauce` (Gluten sensitive) | Same as A1 |
| A3 | `Grilled Chicken with Rotini Pasta & Marinara` (GS) / `Kids Grilled Chicken with Rotini Pasta & Marinara` (Kids) | Adult vs. kids, or the same kids item? |
| A4 | `Our famous Jumbo house salad` / `Large Salad` (both in Family-style) | Same product? |
| A5 | `Famous House Salad without croutons` (GS) | Variant of the house salad (keep as its own offering) |
| A6 | `Toasted Ravioli` (Appetizers) / `Toasted Beef Ravioli` (Catering) | Same product? |
| A7 | `Sicilian cheesecake with strawberry topping` (Desserts) / `Sicilian Cheesecake` (Catering) | Same product, different topping/format? |
| A8 | `Cheese Ravioli` / `…with meat or marinara sauce` / `…with Marinara or Meat Sauce` | One product with sauce choice? |
| A9 | `Spaghetti with marinara sauce` / `Spaghetti with Marinara` / `Spaghetti` (Lunch) | Which sauce is the Lunch "Spaghetti"? |
| A10 | `Soup, salad & breadsticks` / `Soup, salad and breadsticks \| Lunch` / `Weekday lunch special` | Are these the same offer at different times? |
| A11 | `Side of Meatballs` / `Italian Meatballs` (Catering) / `Meatballs Parmigiana` (Appetizer) | Related but likely distinct products |
| A12 | `Side of grilled chicken` / `Grilled Chicken Breasts` (Catering) | Same product, different portion? |
| A13 | `Side of broccoli` / `Broccoli` (Catering) | Same product, different portion? |
| A14 | `Side of … sauce (large)` / `… Dipping Sauce` (Catering) for alfredo, marinara, meat, five cheese marinara | Same sauce, different container size? |
| A15 | `Kids Chicken Fingers` / `Chicken Fingers` (Catering) | Same product, different portion? |
| A16 | `Kids Tomato Sauce Pasta` vs. `Kids Rotini with Marinara`; `Kids Meat Sauce Pasta` vs. `Kids Rotini with Meat Sauce` | Regular vs. gluten-sensitive pasta? |
| A17 | `Zuppa Toscana` (GS) / `Homemade Soups` | Zuppa Toscana is likely one of the homemade soups; which soups are offered? |

**Spelling/casing to confirm:** `Mango-passion fruit lced tea` → "Iced";
`6 oz.sirloin` → "6 oz. Sirloin"; `Non- alcoholic` → "Non-alcoholic";
`Tour of italy` → "Tour of Italy". `Desert pear limonata` is **probably
correct** ("desert pear"), not "dessert"; confirm.

**Other questions:**
- `Cheese Grater` (Sides): a product for sale, or a table service? Needs confirmation before publishing.
- `Family-style lasagna Bundle` is also listed under Classic Entrees. Keep as requested; confirm it is sold there.
- `Steak Gorgonzola Alfredo` is in Classic Entrees but not Amazing Alfredos. Kept as listed; owner may decide.
- `Create your own pasta` (Classic Entrees item and category 8) vs. `Create Your Own Pasta Station` (Catering): treated as **different** products.
- `Chicken Parmigiana Combination` and `Lasagna Combination` (Catering) are catering-only products.

---

## 7. Missing information by category

| Category | Missing (beyond prices/calories for every item) |
|---|---|
| Family-style Meals | Serving counts per bundle, what each bundle includes, which entrées are available family-size |
| Appetizers | Official descriptions; which dipping sauces come with breadsticks |
| Classic Entrees | Tour of Italy components; steak/salmon portion details |
| Buy One Take One | Is the offer current? Dates, rules, eligible items, dine-in only? |
| Amazing Alfredos | Whether this is a current official menu grouping |
| Soups, salad and breadsticks | Which homemade soups; whether refills are included; lunch special terms |
| Lighter portions | Current availability, hours, how portions differ |
| Create your own pasta | **All options** (pastas, sauces, proteins, toppings) and their nutrition |
| Lunch menu | Lunch hours/days; differences from dinner portions |
| Desserts | Official descriptions |
| Drink menu / Non-alcoholic | Sizes (gallon, 2-liter), refill policy, soda brands |
| Sides, sauces and extras | Portion sizes ("large"); what "Cheese Grater" is |
| Wine & beer to go | States/locations where alcohol to go is allowed; bottle sizes; vintages; age/ID rules |
| Gluten sensitive | Official allergen statement and cross-contact warning |
| Kids meal | Age limit; included sides/drink; kids pizza details |
| Catering | Serving sizes (half/full pan, people served), minimums, lead time, delivery availability |

---

## 8. `/menu` vs. homepage (decision needed)

Both currently relate to "Olive Garden menu". Proposed:

- **Option A (recommended):** Homepage owns the main topic (full menu
  overview with prices). `/menu` stays a **noindex, follow** directory of all
  17 categories, used for navigation and breadcrumbs. No cannibalization,
  no URL change.
- **Option B:** Index `/menu` as the full category hub and refocus the
  homepage on guides and site intro. Requires changing homepage content.

---

## 9. Menu data architecture

### 9.1 Concepts

| Concept | Meaning | Example |
|---|---|---|
| **Product** | One canonical dish/drink, shared across categories | `chicken-parmigiana` |
| **Offering** | One placement of a product in one owner category, with its own price/portion/calories/availability | `lunch-menu--chicken-parmigiana` |
| **Category** | One of the 17 owner categories, mapped to a page and optional section | `lighter-portions` → `/menu/lunch#lighter-portions` |
| **Page** | One of the 12 menu URLs, showing one or more categories | `/menu/drinks` shows `drink-menu` + `non-alcoholic-beverages` |

210 offerings (one per inventory line) → fewer products. Aliases (§6) stay
**separate products** until the owner confirms they are the same.

### 9.2 Proposed TypeScript shapes (to implement in a later phase)

```ts
type VerificationStatus =
  | "verified"            // checked against an official source
  | "needs-verification"  // not researched yet
  | "not-verified";       // researched, but no authoritative source found

type AvailabilityStatus =
  | "unknown" | "available" | "limited-time" | "location-dependent" | "unavailable";

type PriceContext =
  | "regular" | "lunch" | "lighter-portion" | "family-style" | "bundle"
  | "catering" | "kids" | "to-go" | "side" | "promotion";

type PriceObservation = {
  amount: number;              // USD
  unit: string | null;         // e.g. "per half pan", "per gallon"
  location: string;            // e.g. "Orlando, FL (store #...)"
  sourceUrl: string;
  checkedAt: string;           // ISO date
};

type ImageRef = {
  src: string;                 // only real files in /public
  alt: string;
  width: number;
  height: number;
  credit: string | null;
  license: string;             // e.g. "Owner photo", "Licensed: <source>"
};

type MenuProduct = {
  id: string;                  // "chicken-parmigiana"
  name: string;                // canonical display name
  aliases: string[];           // other confirmed names
  description: string | null;  // original wording, verified facts only
  image: ImageRef | null;
};

type MenuOffering = {
  id: string;                  // "<category-id>--<product-id>[--<variant>]"
  productId: string;
  categoryId: string;          // one of the 17 category ids
  inventoryName: string;       // exact text from MENU_INVENTORY.md
  displayName: string;         // cleaned public name
  description: string | null;
  priceContext: PriceContext;
  prices: PriceObservation[];  // empty = "Not verified yet"
  calories: number | null;     // or lower bound of a range
  caloriesMax: number | null;  // upper bound if official value is a range
  caloriesBasis: string | null;// e.g. "per entree", "per serving, serves 4"
  servingSize: string | null;  // verified serving context
  availability: AvailabilityStatus;
  locationScope: "unknown" | "national" | "market" | "single-location";
  sourceUrls: string[];        // nutrition, menu, allergen sources
  verifiedAt: string | null;   // ISO date of last full check
  status: VerificationStatus;
  image: ImageRef | null;      // overrides product image (e.g. catering pan)
  notes: string | null;        // uncertainty, caveats
};

type MenuCategoryDef = {
  id: string;                  // "lighter-portions"
  inventoryName: string;       // "Lighter portions"
  displayName: string;         // "Lighter Portions"
  inventoryOrder: number;      // 1-17
  pagePath: string;            // "/menu/lunch"
  sectionId: string | null;    // "lighter-portions" or null for main category
};
```

### 9.3 Category ids (stable, do not change once used)

`family-style-meals`, `appetizers`, `classic-entrees`, `buy-one-take-one`,
`amazing-alfredos`, `soups-salad-breadsticks`, `lighter-portions`,
`create-your-own-pasta`, `lunch-menu`, `desserts`, `drink-menu`,
`sides-sauces-extras`, `non-alcoholic-beverages`, `wine-beer-to-go`,
`gluten-sensitive`, `kids-meal`, `catering`.

### 9.4 File layout (planned)

```
content/menu/
├── categories.ts           17 MenuCategoryDef records (+ page mapping)
├── products.ts             Canonical MenuProduct records
└── offerings/
    ├── family-style-meals.ts   One file per category, items in inventory order
    ├── appetizers.ts
    └── ...                     (17 files; create-your-own-pasta.ts starts empty)
```

### 9.5 Display rules

- A price shows only if `status === "verified"` and `prices` is not empty.
  One observation → "$X.XX"; several → "$X.XX–$Y.YY" + "varies by location".
- Calories show only if verified; show the range when `caloriesMax` is set.
- `availability` other than `available` shows a visible note
  ("Limited time", "Not available at all locations", "Availability not confirmed").
- Every table shows the latest `verifiedAt` and location via `PriceNotice`.
- Existing `MenuTable` / `MenuItem` will be adapted (offering → table row);
  the component may need an option to hide the Calories column (e.g. beer
  and wine) and a price-range display.

### 9.6 Validation (later, no new packages)

A small TypeScript check (run at build time) can confirm: every offering's
`productId` and `categoryId` exist; ids are unique; no verified record lacks
`sourceUrls` or `verifiedAt`; every image `src` file exists.

---

## 10. Existing URL protection

- Current routes (`/`, `/menu`, dev-only `/design-preview`) stay unchanged.
- **Unknown:** does this site replace an existing website or domain?
  If yes, the owner must supply the old URL list (old sitemap, Search
  Console "Pages" export, or analytics export). No old URL is dropped until
  an approved redirect map exists.
- Once a menu URL is published and indexed, it is never renamed without a
  301 redirect plan.

---

## 11. Decisions needed from the owner

1. Approve the 12-page / 5-section structure (§2).
2. Approve provisional slugs (§3), especially `/menu/lunch`, `/menu/drinks`,
   `/menu/wine-and-beer-to-go`, `/menu/kids-menu`.
3. `/menu` Option A or B (§8).
4. Answer alias questions A1–A17 and spelling items (§6).
5. Is the site replacing an existing website? (§10)
6. Reference location(s)/market(s) for prices (see `MENU_RESEARCH_PLAN.md`).
