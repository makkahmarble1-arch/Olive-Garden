# Menu Item Page Design (permanent requirements)

Owner requirement 2026-11-15, **permanent** for every menu item page and for
future website improvements: pages must be visually attractive, colorful,
professional, premium, informative, easy to navigate, mobile-friendly and
genuinely useful. **No plain, text-heavy article layouts.** Use product heroes,
real food photos, information cards, prominent price badges, colorful calorie
badges, elegant tables, icons, distinct sections, rounded corners, subtle
shadows, balanced whitespace and a clear hierarchy, while keeping
accessibility, readability and performance first.

## 1. Palette (tokens in `app/globals.css`)

| Role | Token | Hex |
|---|---|---|
| Primary olive (fills, never text on white) | `brand` | #a1b626 |
| Dark olive (headings, hero panels) | `hero-deep` | #28370f |
| Secondary green (links, price badge, table headers) | `brand-dark` | #556b12 |
| Light lime (chips, icon tiles) | `hero-highlight` | #d5e78a |
| Warm cream (hero, cards) | `header-cream` | #fffcf5 |
| White | `white` | #ffffff |
| Calories (amber) | `kcal-bg` / `kcal-text` / `kcal-bar` | #fff3e0 / #9a5700 / #f59e0b (bar graphic only) |
| Allergen warnings | `allergen-bg` / `allergen-border` / `allergen-text` | #fdecea / #f5c2bd / #9b1c1c (6.9:1) |
| Ratings | existing golden stars (`og-star`) | — |

No heavy gradients, no animations beyond existing hover states.

## 2. Hero

Cream panel (`rounded-3xl`, thin olive border, soft shadow), two columns from
`md`: left a 4:3 photo in a white rounded frame with a category badge and a
"supplied by the site owner" caption; right a lime category chip (link), the
serif H1, the shared rating stars, an olive **price badge** and an amber
**calorie badge**, the basis note (online pickup, USA, may vary), summary,
serving line, pill links to sections (44 px targets), and "Last verified:
Month Year". Phones: photo first, then text. No order/cart buttons. The photo
is the page's only `priority` image.

## 3. Quick facts

2 / 3 / 6 column grid of white cards, each with a colored icon tile, small
uppercase label, serif value and a short note. Verified values only.

## 3a. Versions (Phase 4, owner approval 2026-11-18)

Only for dishes with genuinely different, officially listed versions (`versions` in the page file); `components/product/VersionSection.tsx` + `VersionSelector.tsx` (the only client component on the page besides the rating stars).

- **H2:** "{Item} Versions", placed right after the quick facts. The hero section links get a "Versions" pill.
- **Selector card:** cream card with a dark olive gradient header ("Choose a version").
  - Pill tabs show the short name, price and calories. The active pill uses `hero-cta`.
  - Tabs wrap on phones, so no tab is hidden.
  - Each tab is at least 44 px tall.
  - Accessibility: `role="tablist"`, arrow keys, Home and End.
- **Panel per version:**
  - Version name and a one-sentence description.
  - Olive price card and amber calorie card (Calc. share of 2,000 Cal).
  - Four macro tiles and a compact list of the other nutrients.
  - Red allergen chips with fried/grilled marks.
  - The official source line (page and row of both guides).
  - A version without a nutrition row shows calories plus a note, never estimated values.
- **"All versions at a glance" table** (server-rendered, so every value is in the HTML without JavaScript): price, calories, protein, sodium, allergens. The first (default) version is highlighted.
- **Default version:** the first one. It drives the hero, quick facts, nutrition section and allergen card (the allergen card says which version it shows).
- **Pack-size options** of the offering are not repeated in the Sizes section on version pages.

## 4. About

Readable prose column (max ~65ch) plus a dark olive "Good to know" panel.

## 5. Nutrition

Amber calorie spotlight (large number, bar showing the share of a
2,000-calorie day, labeled Calc.; sauce calories and a calculated total), an
olive-header table with alternating rows and an "Official"/"Calc." basis
column, macro cards (only when verified), a lime-tint note naming nutrients
that are not verified, and a comparison table with inline bars (current item
highlighted amber and labeled "This item" in text). Tables fit 320 px where
possible; wider tables scroll inside their own focusable region.

## 6. Ingredients and allergens

Three cards: ingredients (check icons, "Partial list" note), allergen card
(light red, warning icons, status chip in words, official links), dietary
notes (label + value). Then an allergy safety notice. Meaning never relies on
color alone (icons + text).

## 7. Serving and sizes

Cards for "What comes with it" (calorie pill), "Customization" (plain note
when nothing is verified) and "Want more sauce?", then a sizes table with
labeled per-piece / per-guest calculations.

## 8. Pairings

Four photo cards with a type badge, price, calorie pill, reason and a link.
A lime chip states "Editor's suggestions, not an official Olive Garden meal combo".

## 9. Similar items

The approved premium `MenuItemCard` grid (unchanged design) with shared ratings.

## 10. Accessibility checklist

One H1, logical H2/H3 order, `th scope`, table captions, focus outlines,
44 px touch targets for standalone links, decorative icons `aria-hidden`,
contrast ≥ 4.5:1 for text, `sr-only` labels for prices/calories.

## 11. Menu card link (approved card, minimal change)

When an item's page is live, the card's photo and name link to it and a small
"View details →" link appears under the description. The rating stays outside
any link (no nested interactive elements). Items without a live page are
unchanged.
