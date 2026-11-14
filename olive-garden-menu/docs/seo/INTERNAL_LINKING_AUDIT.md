# Internal Linking Audit (Lesson 8.5)

**Audit date:** 2026-11-14.
**Method:**
- every `<a href>` was collected from the rendered HTML of the 18 pages (production build)
- each internal target was requested
- every `#anchor` was checked against element ids on the target page

## 1. Health

| Check | Result |
|---|---|
| Internal targets | 18 unique pages, all HTTP 200 |
| Broken links / missing anchors | 0 |
| Links to `/menu` | 0 (internal links use `/#full-menu`; `/menu` → `/` 308 is kept for old links) |
| Links to placeholder or 404 routes | 0 |
| Self-links in Related Menus | 0 |
| Orphan pages | 0. The homepage links to all 17 category pages (section links and footer) |
| Anchor text | Descriptive: Related Menus cards use the target's real title (`menuTitle`), and inline links use natural phrases. No "click here" |

## 2. Inbound links per category page

Count of other audited pages that link to each page (the homepage included).

| Page | Status | Inbound pages | Notes |
|---|---|---|---|
| `/classic-entrees` | published | 12 | Strong |
| `/family-style-meals` | published | 9 | Strong |
| `/amazing-alfredos` | published | 8 | Strong |
| `/catering` | preview | 5 | OK |
| `/desserts` | preview | 5 | OK |
| `/non-alcoholic-beverages` | preview | 5 | OK |
| `/buy-one-take-one` | published | 4 | OK |
| `/soups-salad-and-breadsticks` | preview | 4 | OK |
| `/create-your-own-pasta` | preview | 4 | OK |
| `/drink-menu` | preview | 4 | OK |
| `/wine-and-beer-to-go` | preview | 4 | OK |
| `/lunch-menu` | preview | 3 | Weak (`/`, `/lighter-portions`, `/soups-salad-and-breadsticks`) |
| `/sides-sauces-and-extras` | preview | 3 | Weak |
| `/gluten-sensitive` | preview | 3 | Weak |
| `/kids-meal` | preview | 3 | Weak |
| `/appetizers` | published | 2 | Weak (`/`, `/catering`) |
| `/lighter-portions` | preview | 2 | Weakest (`/`, `/lunch-menu`) |

**Why preview pages are weak:**
- Published pages may only link to published pages (owner standard 4; `getRelatedMenus`).
- So today a preview page is linked only from the homepage and other preview pages.
- When the owner publishes a page, its planned Related Menus links on published pages appear automatically. No code change is needed.

## 3. Recommendations

| # | Recommendation | Priority | Approval |
|---|---|---|---|
| 1 | When publishing preview pages, update the Batch 1 inline text links that point to homepage sections. Change `/#lunch-menu` → `/lunch-menu`, `/#lighter-portions` → `/lighter-portions`, and the same for `/#catering`, `/#sides-sauces-and-extras`, `/#gluten-sensitive` and `/#kids-meal` | P2 | Done together with the publish decision |
| 2 | `/appetizers` gets few links. Add it to the Related Menus of `/family-style-meals` (sharing starters for a group) and `/classic-entrees` (starter + entree). Both are published, so this works today | P2 | Owner |
| 3 | `/lighter-portions`: after publishing, add it to the Related Menus of `/gluten-sensitive` or `/kids-meal` only if the reason is genuine. Otherwise rely on Classic Entrees, Alfredos and Lunch | P3 | Owner |
| 4 | Homepage FAQ "Does Olive Garden have gluten-free food?": link the answer to `/gluten-sensitive` after it is published | P2 | Owner |
| 5 | Breadcrumb JSON-LD: the middle item "Menu" points to `/#full-menu` (a homepage section). Search engines usually treat this as the homepage. This is acceptable, and it follows the approved `Home > Menu > {Category}` design. No change needed | P3 (info) | — |

## 3a. Update (Lesson 8.5.1, 2026-11-14)

- Recommendations 1, 2 and 4 are done.
- All 17 pages are published, so every planned Related Menus link now shows.
- Inbound pages after the changes:
  - `/appetizers` 4
  - `/lighter-portions` 4
  - `/lunch-menu` 6
  - `/kids-meal` 3 (lowest)
- 0 broken links, 0 orphans.
- Recommendation 3 was not applied: no genuine reason was found, so no forced links.

## 4. Navigation

- The header and footer link to the homepage, full-menu anchor and categories; the "Skip to main content" link is present.
- Breadcrumbs appear on every category page and match the JSON-LD.
- The table of contents uses in-page anchors, and all of them resolve.
