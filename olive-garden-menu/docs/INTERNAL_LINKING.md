# Internal Linking Plan

**Status:** Approved structure (2026-11-11), finalized 2026-11-12: the
homepage is the full-menu page and links to the 17 category pages at
root-level URLs (`CONTENT_ARCHITECTURE.md` §2); `/menu` stays a noindex
directory (redirect to `/` reviewed before launch). Links to a
page are added only after that page is published, so the site never links
to a 404 (`CategoryCard` already links only published categories).

## 1. Site structure

```
Homepage (/)  ← primary full-menu page: 17 category sections
 ├── 17 category pages (/family-style-meals, /appetizers, … /catering)
 ├── /menu  (noindex category directory; redirect to / reviewed before launch)
 ├── Informational guides (/blog/…)
 └── Supporting pages (/about, /contact, /disclaimer, /privacy-policy)
```

## 2. Navigation

### Header (desktop, max 5 items)
| Label | Target | Status |
|---|---|---|
| Home | `/` | Live |
| Menu | `/menu` | **Live** (main hub) |
| About This Guide | `/#about-this-guide` | Live (replaced by `/about` later) |
| Blog | `/blog` | Once articles exist |
| About | `/about` | Once the page exists |

Optional later: one or two high-need category links (e.g. Lunch Menu,
Catering) once those pages are published.

### Mobile menu
Same items. Later, an expandable "Menu Categories" list (`<details>`, no
extra JavaScript) with the published category pages grouped as on `/menu`.

### `/menu` hub

Cards are listed in the approved order (1-17) with a "Jump to a Category"
anchor list. Groups (`menuCategoryGroups` in `content/menu/categories.ts`)
appear as a small label on each card:

| Group (card label) | Categories |
|---|---|
| Entrees and Pasta | Classic Entrees · Amazing Alfredos · Create Your Own Pasta · Buy One Take One |
| Starters, Soups and Sides | Appetizers · Soups, Salad and Breadsticks · Sides, Sauces and Extras |
| Lunch and Lighter Options | Lunch Menu · Lighter Portions |
| Desserts and Drinks | Desserts · Drink Menu · Non-Alcoholic Beverages · Wine & Beer To Go |
| Special Diets and Kids | Gluten Sensitive · Kids Meal |
| Groups and Takeout | Family-Style Meals · Catering |

All 17 categories are reachable within 2 clicks from any page (header →
homepage category section → category page; today also via `/menu`).

### Homepage (updated 2026-11-12)
The homepage shows the full menu (spec: `MENU_PAGE_OUTLINES.md` "Homepage"):
- Category navigation: jump links to all 17 category sections (`#{slug}`),
  plus menu search.
- Each category section links to its dedicated page ("More about
  {category}") once that page is published or in preview.
- "Important internal and official links" block: key internal pages
  (About, Contact, Disclaimer when they exist) and official Olive Garden
  pages (online ordering, nutrition, the reference restaurant's location page).
- Popular Menu Items link to the item's category section or page.
- Official resources: ordering, nutrition PDF, reference restaurant page.
- Footer: social media links only with owner-supplied URLs.
- Link to `/menu`: kept as today during development; header and breadcrumb
  links to `/menu` are reviewed together with the redirect before launch.

*Superseded:* "featured categories only; the homepage never repeats the full hub".

### Category pages ↔ homepage
Each category page links to 2-5 related category pages (§4) and to the
full menu on the homepage. Exact link placement is decided when the
homepage is rebuilt.

### Footer (later)
`/menu`, the published category pages (or the 6 group headings linking to
`/menu`), legal pages, About/Contact.

## 3. Breadcrumbs

- Category pages: `Home > Menu > {Category}`. The URL is root-level
  (`/desserts`), but the breadcrumb shows the hub as the logical parent.
  BreadcrumbList JSON-LD uses the same trail (`/` → `/menu` → `/desserts`).
- `/menu`: `Home > Menu`
- Articles: `Home > Blog > {Article}`

## 4. Contextual links between category pages

Overlapping pages link to each other instead of repeating content.

| From | To | Example anchor text |
|---|---|---|
| Classic Entrees | Amazing Alfredos | "compare all the Alfredo dishes" |
| Classic Entrees | Create Your Own Pasta | "build your own pasta" |
| Classic Entrees | Lighter Portions / Lunch Menu | "smaller portions of these dishes" |
| Classic Entrees | Family-Style Meals | "family-size versions for the table" |
| Amazing Alfredos | Classic Entrees | "the full entree menu" |
| Buy One Take One | Classic Entrees | "regular entree prices" |
| Lighter Portions | Lunch Menu | "the complete lunch menu" |
| Lunch Menu | Lighter Portions | "lighter portions" |
| Lunch Menu | Soups, Salad and Breadsticks | "the soup, salad and breadsticks combo" |
| Soups, Salad and Breadsticks | Gluten Sensitive | "house salad without croutons" |
| Appetizers | Soups, Salad and Breadsticks | "breadsticks and dipping sauces" |
| Family-Style Meals | Catering | "feeding a bigger group" |
| Catering | Family-Style Meals | "smaller gatherings at home" |
| Drink Menu | Non-Alcoholic Beverages | "lemonades, teas, and coffee compared" |
| Non-Alcoholic Beverages | Drink Menu | "drinks to go by the gallon" |
| Drink Menu | Wine & Beer To Go | "wine and beer to go" |
| Desserts | Non-Alcoholic Beverages | "cappuccino or espresso" |
| Kids Meal ↔ Gluten Sensitive | each other | "gluten-sensitive rotini for kids" |
| Sides, Sauces and Extras | Amazing Alfredos / Catering | "Alfredo sauce to take home", "catering dipping sauces" |

Rules:
- 2-5 contextual links per page, where they help the reader.
- Descriptive, varied anchor text; never "click here"; no exact-match repetition.
- Shared items say where other formats are listed ("Chicken Parmigiana is
  also offered as a lunch portion") instead of repeating descriptions.
  `getOfferingsForProduct()` in `lib/content.ts` finds those other formats.

## 5. Articles ↔ menu pages (later)

- Each article links to 1-3 relevant category pages in the body.
- Each category page may show 1-2 relevant guides in a "Helpful Guides" block.
- `RelatedArticles` shows related articles at the end of each article.
- An article never targets a category page's intent.

## 6. Link maintenance

- Build links only with helpers in `lib/content.ts`: `menuPath`,
  `menuCategoryPath(slug)` (→ `/{slug}`), `articlePath(slug)`. Never hand-type URLs.
- Link only to pages with `contentStatus: "published"`.
- Before launch: build + manual click-through for broken links.
