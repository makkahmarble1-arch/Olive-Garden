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
| Price table | Header row `brand-tint`; zebra rows optional; columns: Item, Price, Calories; price right-aligned; horizontally scrollable on mobile |
| "Not verified yet" badge | Warning colors, small pill (only while research is unfinished) |
| "Calculated" / "Estimated" labels | Small text label next to the value, not color alone; style designed when the homepage is rebuilt (owner decision 5, 2026-11-12) |
| Star rating | 1-5 stars + average + vote count as text ("4.3 · 120 votes"); "Not rated yet" when empty; keyboard-accessible, 44px touch targets; designed in the rating lesson (decision 6) |
| Menu item (homepage) | Image (or labelled placeholder), name, price, calories, rating, short description, size options; designed when the homepage is rebuilt |
| Price notice callout | `brand-tint` box with "Prices last checked {date}. Prices vary by location." |
| Breadcrumbs | Small, `muted` text, `/` separators, current page not linked |
| Table of contents | Box with `border`; collapsible on mobile (`<details>`) |
| FAQ | `<details>`/`<summary>` accordion, no JavaScript needed |
| Related articles | 3 cards in a responsive grid |

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
