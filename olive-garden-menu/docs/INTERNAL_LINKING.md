# Internal Linking Plan

**Status:** Planning (2026-11-11). Page URLs are provisional
(see `CONTENT_ARCHITECTURE.md`). Links to a page are added only after that
page exists, so the site never links to a 404.

## 1. Navigation

### Header (desktop, max 5 items)
| Label | Target | Notes |
|---|---|---|
| Menu | `/menu` | Directory of all 17 categories (later: dropdown with the 12 pages) |
| Lunch | `/menu/lunch` | Common time-based need |
| Catering | `/menu/catering` | Distinct group-ordering need |
| Blog | `/blog` | Once articles exist |
| About | `/about` | Trust; once the page exists |

Current header (Home · Menu Categories · About This Guide) stays until
these pages exist.

### Mobile menu
Same items, plus an expandable "Menu Categories" list (no JavaScript beyond
the existing toggle; can use `<details>`) showing the 12 menu pages grouped
as below.

### `/menu` directory and homepage "Browse the Menu" groups

| Group | Links |
|---|---|
| Dine-In Menu | Appetizers · Soups, Salad & Breadsticks · Classic Entrees (+ Amazing Alfredos, Create Your Own Pasta, Buy One Take One) · Lunch (+ Lighter Portions) · Desserts · Sides, Sauces & Extras |
| Drinks | Drinks (+ Non-Alcoholic Beverages) · Wine & Beer To Go |
| Special Diets & Kids | Kids Menu · Gluten-Sensitive |
| Groups & Takeout | Family-Style Meals · Catering |

Section links use anchors, e.g. `/menu/lunch#lighter-portions`.
Result: all 17 owner categories are reachable within 2 clicks from any page.

### Footer
All 12 menu pages + legal pages (Disclaimer, Privacy Policy) + About/Contact.

## 2. Breadcrumbs

- Menu pages: `Home > Menu > {Page}`
- Sections are not breadcrumb levels (they are anchors on the page).
- Articles: `Home > Blog > {Article}`

## 3. Contextual links between menu pages

| From | To | Reason (example anchor text) |
|---|---|---|
| Classic Entrees | Lunch `#lighter-portions` | "smaller lunch portions of these dishes" |
| Classic Entrees | Family-Style Meals | "family-size versions for the table" |
| Classic Entrees | Gluten-Sensitive | "gluten-sensitive versions of salmon and sirloin" |
| Classic Entrees | Sides, Sauces & Extras | "add a side of grilled chicken or meatballs" |
| Lunch | Classic Entrees | "full-size dinner entrées" |
| Lunch | Soups, Salad & Breadsticks | "the soup, salad and breadsticks combo" |
| Soups, Salad & Breadsticks | Lunch | "weekday lunch special" |
| Soups, Salad & Breadsticks | Gluten-Sensitive | "house salad without croutons" |
| Appetizers | Soups, Salad & Breadsticks | "breadsticks and dipping sauces" |
| Appetizers | Catering | "appetizers for large groups" |
| Family-Style Meals | Catering | "feeding a bigger group" |
| Catering | Family-Style Meals | "smaller gatherings" |
| Catering | Desserts / Drinks | "dessert and beverage options" |
| Desserts | Drinks `#non-alcoholic-beverages` | "cappuccino or espresso" |
| Drinks | Wine & Beer To Go | "wine and beer to go" |
| Wine & Beer To Go | Drinks | "non-alcoholic drinks" |
| Kids Menu | Gluten-Sensitive | "gluten-sensitive rotini for kids" |
| Gluten-Sensitive | Kids Menu | "kids gluten-sensitive options" |
| Sides, Sauces & Extras | Catering | "catering dipping sauces" |

Rules:
- 2-5 contextual links per page, placed where they help the reader.
- Descriptive, varied anchor text; never "click here"; no exact-match repetition.
- Shared items mention where other formats are listed (e.g. "Chicken
  Parmigiana is also available as a lunch portion") instead of repeating
  full descriptions.

## 4. Articles ↔ menu pages (later)

- Each article links to 1-3 relevant menu pages in the body.
- Each menu page may link to 1-2 relevant guides in a "Helpful Guides" block.
- `RelatedArticles` shows 3 related articles at the end of each article.
- Article topics must not duplicate a menu page's intent.

## 5. Link maintenance

- Build links with path helpers in `lib/content.ts` (`menuCategoryPath`,
  `articlePath`), never hand-typed strings.
- Navigation lists only pages with `contentStatus: "published"` (existing
  `CategoryCard` already avoids linking placeholders).
- Before launch, check for broken links (build + manual click-through).
