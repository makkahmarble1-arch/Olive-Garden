# Appetizers Research Log

**Date of attempt:** 2026-11-11
**Result:** No price or calorie value is verified. Nothing from this log may
be entered into `content/menu/` as verified data.

## Update 2026-11-11 (entered into the site)

Owner asked to complete the Appetizers page from this research. Entered:
the Millenia location (`content/menu/locations.ts`), 10 prices and 9
calorie values (`content/menu/offerings/appetizers.ts`). Catering values
were not entered.

Owner decisions (same day): Dipping Sauces calories use the official PDF
per-sauce values (regular 70-490, sauce only; `nutrition.md` §2), and the
page is published (`contentStatus: "published"`, indexed).

## Update 2026-11-11 (Claude in Chrome connected)

The official site opened normally in Chrome. Findings are now in
`prices.md`, `nutrition.md`, and `sources.md` in this folder; they replace
the "Not verified" table below. Still not entered into `content/menu/`
(owner approval pending).

## Update 2026-11-11 (after owner approval)

- Owner approved the Millenia Mall restaurant as the reference location and
  research method "Claude researches independently".
- Access re-tested the same day: the official location page still returns
  HTTP 403. No browser integration is connected to this session, and the
  Claude in Chrome extension is not installed in any local Chrome profile.
- Still nothing verified. Next step: connect a browser integration, re-test.

## 1. Tool access

| Tool | Status |
|---|---|
| Web search | Works. Returns result titles, URLs, and short text extracts from a search index. |
| Webpage retrieval (WebFetch) | Works in general, but **every olivegarden.com and media.olivegarden.com URL returned HTTP 403 Forbidden**. |
| Plain `curl` download of the nutrition PDF | HTTP 403 Forbidden. |
| Browser automation (real browser) | Not available in this session. |

Bot protection was not bypassed (no fake browser headers). Search-index
extracts are second-hand and are **not** treated as a verified source,
because the page itself could not be opened and the extract date is unknown.

## 2. Official URLs attempted (all 403)

- https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614
- https://www.olivegarden.com/menu/appetizers
- https://www.olivegarden.com/nutrition
- https://media.olivegarden.com/images/site/pdf/olive_garden_nutrition.pdf
- https://media.olivegarden.com/images/site/pdf/D2-26-052625_v2.pdf

## 3. Proposed reference restaurant (not approved yet)

| Field | Value | Status |
|---|---|---|
| Name | Olive Garden, Orlando - Millenia Mall | From the official URL slug and search-index title |
| Address | 4101 Conroy Rd, Orlando, FL 32839 | From the search-index extract of the official page; page not opened directly |
| Phone | (407) 345-8331 | Same as above |
| Official URL | https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614 | URL exists in the index; returned 403 to us |

## 4. Appetizers: status of each item

| # | Item | 2026 price (Millenia) | Calories | Availability |
|---|---|---|---|---|
| 1 | Breadsticks | Not verified | Not verified | Unknown |
| 2 | Fried Mozzarella | Not verified | Not verified (lead below) | Unknown |
| 3 | Stuffed Ziti Fritta | Not verified | Not verified (lead below) | Unknown |
| 4 | Dipping Sauces with Breadsticks | Not verified | Not verified | Unknown |
| 5 | Calamari | Not verified | Not verified (lead below) | Unknown |
| 6 | Meatballs Parmigiana | Not verified | Not verified | Unknown |
| 7 | Spinach-Artichoke Dip | Not verified | Not verified (lead below) | Unknown |
| 8 | Lasagna Fritta | Not verified | Not verified (lead below) | Unknown |
| 9 | Shrimp Fritto Misto | Not verified | Not verified (lead below) | Unknown |
| 10 | Toasted Ravioli | Not verified | Not verified (lead below) | Unknown |

"Not currently listed" (owner decision) will be used only after the
Millenia menu is actually checked and the item is missing from it.

## 5. Unverified leads (for cross-checking only, never for publishing)

Search-index extracts of **older official menu PDFs** (media.olivegarden.com).
These are national menu flyers from 2021-2025, not the current nutrition
guide, and could not be opened:

| Item | Extract says | PDF (date from filename) |
|---|---|---|
| Fried Mozzarella | 800 cal; marinara 45 cal | MR-15-011121 (Jan 2021) |
| Calamari | 670 cal; marinara 45 cal; spicy ranch 250 cal | MR-15-011121 (Jan 2021) |
| Spinach-Artichoke Dip | 1100 cal (2021); 1160 cal (later PDF) | conflicting versions |
| Toasted Ravioli | 650 cal; marinara 45 cal | MR-15-011121 (Jan 2021) |
| Stuffed Ziti Fritta | 500 cal; alfredo 220 cal; marinara 45 cal | MR-15-011121 (Jan 2021) |
| Lasagna Fritta | 1130 cal | 2021 PDF and D2-26-052625 (May 2025) |
| Shrimp Fritto Misto | "140 cal each" (per piece, no per-order total) | menu PDF |

Third-party "menu price" websites were found but are not used: they
disagree with each other, are not location-specific, and are not official.

## 6. What is needed to verify

Someone must open these two official pages in a normal browser:
1. The Millenia location's online ordering menu (Appetizers section), with prices.
2. The current nutrition PDF: `olive_garden_nutrition.pdf` (above).

Saved copies (screenshots with the visible URL and date, and the PDF) go in
this folder, and values are then entered from them.
