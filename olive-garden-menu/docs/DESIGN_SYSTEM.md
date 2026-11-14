# Design System

Clean, modern food-blog look. White background, dark readable text, green
accents. Mobile-first. Accessible (WCAG 2.2 AA).

## 1. Colors

Defined once as CSS variables / Tailwind theme tokens in `app/globals.css`
(Tailwind v4 `@theme`). Components use token names, never raw hex values.

| Token | Hex | Use |
|---|---|---|
| `brand` | `#a1b626` | Accent **backgrounds** and decoration only: buttons with dark text, badges, highlights, borders, underlines |
| `brand-dark` | `#556b12` | Links, text accents, buttons with white text, active nav item |
| `brand-darker` | `#3f500d` | Hover/pressed state for `brand-dark` |
| `brand-tint` | `#f6f8e8` | Soft section backgrounds, table header rows, callouts |
| `ink` | `#1c1917` | Main body text and headings |
| `muted` | `#57534e` | Secondary text (dates, captions) |
| `border` | `#e7e5e4` | Dividers, table borders, card borders |
| `background` | `#ffffff` | Page background |
| `warning-bg` / `warning-text` | `#fef3c7` / `#78350f` | "Not verified yet" badges and price notices (check contrast when added) |

### Measured contrast ratios (WCAG AA needs 4.5:1 for normal text)

| Pair | Ratio | Result |
|---|---|---|
| `#a1b626` text on white | 2.27 | **Fail**: never use `brand` for text on white |
| `#556b12` text on white | 6.00 | Pass AA |
| `#1c1917` text on `#a1b626` | 7.69 | Pass: dark text on accent buttons/badges |
| `#556b12` text on `#f6f8e8` | 5.58 | Pass AA |
| White text on `#3f500d` | 8.88 | Pass AAA |
| `#1c1917` text on white | 17.49 | Pass AAA |
| `#57534e` text on white | 7.63 | Pass AAA |
| `#556b12` text on `#a1b626` | 2.64 | **Fail**: do not combine the two greens for text |

Light mode only at launch (the starter's dark-mode CSS will be removed when
the design system is implemented).

## 2. Typography

Loaded with `next/font/google` (self-hosted at build, no extra npm package).

| Role | Font | Notes |
|---|---|---|
| Body + UI | Geist Sans (already in the project) | Clean, highly readable |
| Headings (optional) | One serif display font, e.g. Fraunces | Adds warmth for a food blog; decide in Phase 1 |

| Element | Mobile | Desktop | Weight |
|---|---|---|---|
| `h1` | 30px | 40px | 700 |
| `h2` | 24px | 30px | 700 |
| `h3` | 20px | 22px | 600 |
| Body | 17px | 18px | 400, line-height 1.7 |
| Small / meta | 14px | 14px | 400 |

- Article text width max ~70 characters (`max-w-prose`).
- Never put body text below 16px.

## 3. Spacing and layout

- Tailwind default 4px spacing scale.
- Page container: `max-w-6xl mx-auto px-4 sm:px-6`.
- Article content: `max-w-3xl`.
- Section spacing: `py-10` mobile, `py-16` desktop.
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280).
  Write mobile styles first, then add `md:` / `lg:` overrides.
- Radius: `rounded-lg` (cards), `rounded-full` (pills/badges).
- Shadows: subtle only (`shadow-sm`), prefer borders.

## 4. Components (visual rules)

| Component | Style |
|---|---|
| Header | White, bottom border, sticky; logo/site name left, nav right; mobile menu button (min 44x44px) |
| Footer | `ink` background or `brand-tint`; category links, legal links, disclaimer text |
| Primary button | `brand-dark` bg, white text, hover `brand-darker` |
| Accent button | `brand` bg, `ink` text |
| Links in text | `brand-dark`, underlined, visible focus ring |
| Category card | White, `border`, image on top, title + price range |
| Price table | Header row `brand-dark` (olive) with white text; alternating white / `brand-tint` rows; columns: Item, Price, Calories (+ Visitor rating); price right-aligned; horizontally scrollable on mobile. Shared classes: `components/menu/table-styles.ts` (also used by comparison tables) |
| "Not verified yet" badge | Warning colors, small pill (only while research is unfinished) |
| "Calculated" / "Estimated" labels | Small text label next to the value, not color alone; style designed when the homepage is rebuilt (owner decision 5, 2026-11-12) |
| Star rating | 1-5 stars + average + vote count as text ("4.3 · 120 votes"); "Not rated yet" when empty; keyboard-accessible, 44px touch targets; designed in the rating lesson (decision 6) |
| Menu item (homepage) | Image (or labelled placeholder), name, price, calories, rating, short description, size options; designed when the homepage is rebuilt |
| Price notice callout | `brand-tint` box with "Prices last verified: {Month Year}" + "Prices may vary by location across the USA." (no reference restaurant, no day) |
| Sources box (category pages) | Compact `brand-tint` box, H2 "Sources": one sentence, "Official source:" link (+ at most one "Also see:" link), "Last verified: {Month Year}", small disclaimer |
| Related Menus | H2 "Related Menus"; white cards in a 1/2/3-column grid; card title = the linked page's article title (`menuTitle`, display font, `brand-dark`), one-line reason in `muted` |
| Breadcrumbs | Small, `muted` text, `/` separators, current page not linked |
| Table of contents | Box with `border`; collapsible on mobile (`<details>`) |
| FAQ | `<details>`/`<summary>` accordion, no JavaScript needed |
| Related articles | 3 cards in a responsive grid |

### 4.1 Homepage hero (premium design, owner-approved 2026-11-14)

Only the homepage hero is dark; the rest of the site keeps the light theme. Component: `components/home/Hero.tsx` (server component, no client JavaScript, no background images).

| Part | Rule |
|---|---|
| Background | `linear-gradient(135deg, #28370f → #556b12)` (darker under the text), plus two soft CSS radial glows (gold `#d4af37` ~18%, light olive `#d5e78a` ~12%) and a 1px gold hairline at the bottom. No patterns or image assets |
| Tokens (`app/globals.css`) | `hero-deep` #28370f, `brand-dark` #556b12, `hero-highlight` #d5e78a, `hero-cta` #c4d95d, `hero-soft` #e5e9da, `gold` #d4af37. The light hero colors are only for use on the dark hero, never as text on white; `gold` is decorative only |
| Badge | Small pill: info icon + "Independent Menu Guide · Not the official Olive Garden website", translucent white background, white/25 border, 12px text. Two lines on phones. The full disclaimer stays in the footer and Sources |
| H1 | Text unchanged ("Olive Garden Menu with Prices & Calories 2026"), one `<h1>`; `font-display` (Fraunces, already loaded: no extra font request), semibold, white; "Menu with Prices" in `hero-highlight`. 48px desktop, ~42px tablet, ~31px mobile; `text-balance` |
| Intro | Wording unchanged; `hero-soft`, 16-17px, line height ~1.75, max width ~40rem desktop |
| Buttons | Same size (44px tall, 12px radius). Primary "Explore Full Menu ↓" → `#full-menu`: `hero-cta` fill, `hero-deep` text (8:1), hover `hero-highlight`. Secondary "Lunch Specials" → `#lunch-specials-deals`: transparent, white text, white/45 border, hover white/10. White focus outline |
| Photo | Existing hero image, `next/image` with `preload`; 3:2 (no crop), 20px radius, white/20 border, soft dark shadow, thin gold frame behind it (≥640px). Desktop column ~0.75fr; tablet max width 34rem |
| Layout | Desktop two columns (text 1.25fr, photo 0.75fr), `py-8`: hero height 378px at 1280px wide (was 445px, about 15% smaller). Tablet and mobile stacked |
| Verification bar | White bar under the hero with small olive line icons: "USA · online pickup prices", "Last verified: {Month Year}" (from the data), "Prices may vary by location across the USA.", "How we check prices" link (`#sources`). Dividers on desktop, 2 columns on tablet, stacked on phones |

### 4.2 Menu card (premium design, owner-approved for all cards 2026-11-14)

**Final (owner confirmation, Lesson 8.5.1, 2026-11-14):** this is the permanent design for every menu card, as implemented in commit `63ed27d`. It supersedes the earlier Lesson 8.5 instruction not to roll it out globally. Do not revert, redesign, or resize it.

Keep all of the following:
- approved font sizes and weights (descriptions at normal weight 400)
- cream card background and olive colors
- amber calorie pills
- photo styling
- compact gold star ratings
- the responsive grid

The dark olive homepage hero (4.1) is approved and preserved in the same way.

Every menu card uses this design: the homepage (all 17 category sections and Popular Menu Items) and the photo cards on category pages. It was first tested on the Family-Style Lasagna Bundle card, then approved for all cards. The earlier card design is in git history.

| Part | Rule |
|---|---|
| Implementation | `components/menu/MenuItemCard.tsx` with `PriceBlock` and `OptionPicker` (same shared data, nothing duplicated). Server-rendered; only the size selector and the rating run in the browser; no new dependencies |
| Card | `card-bg` #fafbf5, 1px `card-border` #dce5ba, 16px radius, soft olive-tinted shadow; hover: border `brand-dark`/45 and a slightly deeper shadow (no movement) |
| Photo | Full width, 4:3, top corners rounded by the card, same `next/image` sizes and lazy loading; "Photo coming soon" placeholder when no image. Short serving badges (up to 21 characters, e.g. "Serves 4–6", "One gallon, serves 12") sit on the top-left of the photo: `brand-dark`, white text, 6px radius. Longer serving descriptions (e.g. "Two chicken breasts + side of spaghetti") appear under the title as a small `brand-tint` pill so they never cover the food |
| Title | Exact product name, `font-display`, `hero-deep` #28370f, left aligned |
| Price row | Price in `brand-dark`; calorie pill `kcal-bg` #fff3e0 with `kcal-text` #9a5700 (5.2:1) and a small flame icon; wraps to two lines on narrow cards. Price basis ("per bundle (total)") below in small muted text |
| Description | Exact wording, line height 1.6, `card-text` #525b48 (6.9:1) |
| Typography (owner correction 2026-11-14) | **Font sizes are identical to the default card** (title 16px phone / 16.8px desktop, price 20px, calories 12px, price basis 12px, description 14px, badge 11.2px, rating text 12px). Weights: title 700, price 700, calories 600, description 400, price basis 400; the badge (500) and the rating text (400) keep the default weights |
| Rating | Existing `RatingSummary` (18px gold stars, real votes only), centered, with a 1px `card-border` divider above it. Touch area (Lesson 8.6.1): every star button is 44 px tall. Its width follows the card's free space (container query on `.og-rating-box`): 24 px on narrow cards, 27-32 px on 2-column phones and wide desktop cards, at most 36 px, so the row stays compact. The visible star stays 18 px, buttons never overlap, and the keyboard focus ring sits on the button. Table rating cells keep 24 px |
| Limitation | Cards in a grid row share the tallest card's height (existing grid behavior), so a short card has space above its rating row |

## 5. Accessibility rules

- Semantic HTML: `header`, `nav`, `main`, `article`, `footer`, `table` with `<th scope>`, `<caption>`.
- One `h1` per page; no skipped heading levels.
- "Skip to main content" link at the top.
- Visible focus styles on all interactive elements (`focus-visible:ring-2 ring-brand-dark`).
- Touch targets at least 44x44px.
- All images have meaningful `alt` (or `alt=""` if decorative).
- Do not rely on color alone (e.g. "Not verified yet" uses text, not only color).
- Respect `prefers-reduced-motion`.
- `lang="en"` on `<html>` (already set).

## 6. Imagery

- Only original, licensed, or self-made photos. No Olive Garden official photos or logo.
- Format: let `next/image` serve AVIF/WebP. Store originals in `public/images/`.
- Aspect ratios: 16:9 for article heroes, 4:3 for category cards.
- File names lowercase-hyphenated and descriptive (`chicken-alfredo-plate.jpg`).
