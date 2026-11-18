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
| Header | See 4.4 (two-row premium header, 2026-11-15) |
| Footer | See 4.5 (four-column dark olive footer, 2026-11-15) |
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
| Related Menus | H2 "Related Menus"; exactly 4 white cards: 4 columns in one row from `lg`, 2 x 2 from `sm`, stacked on phones (owner decision 2026-11-15); card title = the linked page's article title (`menuTitle`, display font, `brand-dark`), one-line reason in `muted` |
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
| Detail link (2026-11-15) | Only when the item has a live page (`productDetailHref`): photo and name link to `/menu/{slug}`, plus "View details →" under the description. Otherwise the card is unchanged |
| Implementation | `components/menu/MenuItemCard.tsx` with `PriceBlock` and `OptionPicker` (same shared data, nothing duplicated). Server-rendered; only the size selector and the rating run in the browser; no new dependencies |
| Card | `card-bg` #fafbf5, 1px `card-border` #dce5ba, 16px radius, soft olive-tinted shadow; hover: border `brand-dark`/45 and a slightly deeper shadow (no movement) |
| Photo | Full width, 4:3, top corners rounded by the card, same `next/image` sizes and lazy loading; "Photo coming soon" placeholder when no image. Short serving badges (up to 21 characters, e.g. "Serves 4–6", "One gallon, serves 12") sit on the top-left of the photo: `brand-dark`, white text, 6px radius. Longer serving descriptions (e.g. "Two chicken breasts + side of spaghetti") appear under the title as a small `brand-tint` pill so they never cover the food |
| Title | Exact product name, `font-display`, `hero-deep` #28370f, left aligned |
| Price row | Price in `brand-dark`; calorie pill `kcal-bg` #fff3e0 with `kcal-text` #9a5700 (5.2:1) and a small flame icon; wraps to two lines on narrow cards. Price basis ("per bundle (total)") below in small muted text |
| Description | Exact wording, line height 1.6, `card-text` #525b48 (6.9:1) |
| Typography (owner correction 2026-11-14) | **Font sizes are identical to the default card** (title 16px phone / 16.8px desktop, price 20px, calories 12px, price basis 12px, description 14px, badge 11.2px, rating text 12px). Weights: title 700, price 700, calories 600, description 400, price basis 400; the badge (500) and the rating text (400) keep the default weights |
| Rating | Existing `RatingSummary` (18px gold stars, real votes only), centered, with a 1px `card-border` divider above it. Touch area (Lesson 8.6.1): every star button is 44 px tall. Its width follows the card's free space (container query on `.og-rating-box`): 24 px on narrow cards, 27-32 px on 2-column phones and wide desktop cards, at most 36 px, so the row stays compact. The visible star stays 18 px, buttons never overlap, and the keyboard focus ring sits on the button. Table rating cells keep 24 px |
| Limitation | Cards in a grid row share the tallest card's height (existing grid behavior), so a short card has space above its rating row |

### 4.3 Information pages (About Us, Contact Us; Lesson 9.5)

| Part | Rule |
|---|---|
| Component | `components/info/InfoPageLayout.tsx` (+ `InfoSection`, `InfoLink`); server-rendered |
| Heading band | `card-bg` cream background with a `card-border` line under it. It contains: the breadcrumb `Home / <Page>`; a small uppercase site name in `brand-dark`; the H1 in `font-display`, `hero-deep` (30 / 36 / 44 px); the intro in `card-text` (18 px, line height 2rem); and a "Preview" note in warning colors while the page is not published |
| Legal pages (Lesson 9.6) | "Effective date" and "Last updated" as complete dates under the intro (`showUpdated`; legal pages only). An "On this page" box (`toc`: `card-bg`, `card-border`, numbered links in 2 columns from `sm`). H3 sub-headings in `font-display` 20 px `hero-deep` (`InfoSubheading`). Tables scroll inside their own box on phones |
| Content | One column, max 60rem (960 px), no sidebar. H2 per section in `font-display` 24-28 px, separated by a thin `line` border. Body 17 px, line height 2rem, `ink`/85. Links `brand-dark`, underlined |
| Contact form | Card like the menu cards (`card-bg`, `card-border`, 16 px radius, soft olive shadow). Fields white, 1 px `line` border, 12 px radius, at least 48 px tall; visible labels with "(required)"; error text in red-800 under the field with `aria-invalid`; primary button `brand-dark` with white text, 48 px tall |

### 4.4 Global header (owner-approved redesign, 2026-11-15)

One implementation for every page: `components/layout/Header.tsx` (server), which uses `HeaderShell` (sticky + scroll shadow), `SiteSearch`, `DesktopNav`, and `MobileNav` (client). Navigation data comes from `lib/navigation.ts`, built from the category data and `content/site/info-pages.ts`; no link lists are typed by hand.

| Part | Rule |
|---|---|
| Height | Fixed: 64 px below `lg`, 112 px from `lg` (64 + 48). Stored as `--header-h` in `globals.css`; used by `scroll-padding-top` and the homepage category chip bar (`top-[var(--header-h)]`) |
| Row 1 | `header-cream` #FFFCF5, `card-border` line under it. Logo link on the left; search on the right (`lg` and up, max 28rem) |
| Logo | Owner-approved **icon only**, cut from the owner's logo file: olive branch + open menu book with fork and knife (`public/images/brand/logo-icon.webp`, 138 × 96, 8 KB, transparent; original in `image-staging/logo/`). The owner's script lettering and "Italian Kitchen" tagline were **not** used (they resemble the official Olive Garden logo; owner decision 2026-11-15). Next to it is a 2-line wordmark "Olive Garden / Menu Prices" (Fraunces, `hero-deep` / `brand-dark`). The link is named "Olive Garden Menu Prices home". The old tagline was removed; independence stays visible on the homepage badge and in the footer |
| Row 2 (`lg`+) | `brand-dark` #556B12 bar, white 15 px semibold links, 44 px tall. Hover white/12. **Active page:** `hero-highlight` #D5E78A background with `hero-deep` text. Visible white focus outline |
| Items | Home · Full Menu ▾ · Lunch Menu · Dinner Menu · Specials & Deals ▾ · Hours ▾ · Catering · More ▾. Dinner Menu (added 2026-11-15) links to the `/dinner-menu` guide. Hours ▾ (2026-11-15): Opening & Closing Hours (`/hours`), Holiday Hours (`/hours#holiday-hours`), Lunch Hours, Dinner Hours, plus any published guide with `navGroup: "hours"` |
| Dropdowns | White panel, `card-border`, 16 px radius, soft olive shadow. **Full Menu:** heading "Olive Garden Menu Categories", all category pages in 3 columns (`lg`) or 4 (`xl`), labels = the article title (`menuTitle`) without the leading "Olive Garden", plus "See the full menu with prices →". Open on click, Enter/Space, ArrowDown, or hover. Escape returns focus to the button; arrow keys move through the links; clicks outside and navigation close them |
| Search | Pill input (white, `card-border`, 44 px), search icon, clear button, olive submit button. Placeholder "Search menus, prices, and more..." |
| Mobile/tablet (< `lg`) | Logo, search button, menu button (44 × 44). Search opens a full-width row under the header (autofocus). The menu is a `brand-dark` panel with accordion sections (44 px+ targets), active page in `hero-highlight` |
| Sticky | `position: sticky`; a soft shadow appears after scrolling; no layout shift (CLS 0) |
| Motion | Only color, rotate, and shadow transitions; all off with `prefers-reduced-motion` |
| Favicon | Simplified icon (2026-11-15): an open cream menu book with olive-green text lines and one light-olive leaf on a dark olive (#28370F) rounded square, no text. `app/icon.svg` (vector), `app/favicon.ico` (16/32/48, made from the SVG), `app/apple-icon.png` (180, full-bleed). Clear at 32 px, recognizable at 16 px. The old favicon is in `image-staging/logo/favicon-old.ico` |

### 4.5 Global footer (owner-approved redesign, 2026-11-15)

One footer for every page: `components/layout/Footer.tsx` (server). Its link columns come from `getFooterColumns()` in `lib/navigation.ts`; only `BackToTopButton.tsx` runs in the browser.

| Part | Rule |
|---|---|
| Colors | Background `hero-deep` #28370F; bottom bar `footer-deep` #1D290A; headings `hero-highlight` #D5E78A; links white; body text `footer-text` #E2E8D5; hover `hero-cta` #C4D95D; dividers and borders `brand-dark` #556B12; short accent line under headings `brand` #A1B626 (decorative only, never text) |
| Column 1 | Same logo lockup as the header (icon on a cream tile so the dark icon stays visible, plus the wordmark "Olive Garden / Menu Prices" in white / `hero-highlight`), linking home ("Olive Garden Menu Prices home"). Intro: "An independent menu guide featuring Olive Garden menu prices, calories, specials, and helpful dining information." Then the verified email (`publicContactEmail()`, mailto); if the email is ever unverified, a "Contact us" link replaces it |
| Popular Menus | Full Menu (`/#full-menu`), Lunch Menu, Dinner Menu (the `/dinner-menu` guide, shown while it is published), Kids Menu, Catering Menu, Dessert Menu |
| Explore More | Family Style Meals, Appetizers, Classic Entrees, Amazing Alfredos, Gluten-Sensitive Menu, Drinks Menu, Olive Garden Hours (`/hours`, added 2026-11-15) |
| Important Links | About Us, Contact Us, Privacy Policy, Terms & Conditions, Disclaimer, Editorial Policy, How We Check Prices (only published info pages) |
| Disclaimer | Box with a `brand-dark` border: "Olive Garden Menu Prices is an independent informational website and is not affiliated with or endorsed by Olive Garden or Darden Restaurants." No badge or official-looking seal |
| Bottom bar | "© {year} Olive Garden Menu Prices. All Rights Reserved." (year cached daily) and a "Back to top" pill button: smooth scroll (instant with reduced motion), then focus moves to the header home link |
| Layout | Desktop (`lg`+): 4 columns, thin `brand-dark` dividers between them. Tablet and phones from 360 px: logo column full width, then 2 columns; Important Links spans the full width with its links in 2 columns. Below 360 px: 1 column. No horizontal overflow at 320-1920 px |
| Decoration | One faint olive branch (inline SVG, `aria-hidden`, `brand-dark` at 50%) in the top-right corner |
| Accessibility | `<footer>`, each link column is a `<nav>` labelled by its `<h2>`; every link and the button are at least 44 px tall; focus outline `hero-highlight`; transitions off with `prefers-reduced-motion` |
| Not allowed | Social links without owner-supplied URLs, newsletter forms, links to pages that do not exist, official logos |

### 4.6 Menu item pages (2026-11-15, permanent premium standard)

Full spec: `docs/product-pages/PRODUCT_PAGE_DESIGN.md`. Summary:

- **Permanent owner requirement** for every menu item page and all future website improvements: visually attractive, colorful, professional, premium, informative, easy to navigate, mobile-friendly, genuinely useful. Never a plain text-heavy article layout.
- Use: two-column cream product hero with a large rounded food photo, olive price badge, amber calorie badge, golden rating; icon quick-fact cards; elegant olive-header tables with alternating rows; colored icon tiles; rounded corners (`rounded-2xl`/`rounded-3xl`); subtle olive shadows; balanced whitespace; clear hierarchy.
- Palette: primary olive `#a1b626` (fills only), dark olive `#28370F`, secondary green `#556B12`, light lime `#D5E78A`, warm cream `#FFFCF5`, white. Amber for calories (`kcal-*`), golden stars for ratings, accessible red for allergens (`allergen-*`, 6.9:1). No heavy gradients or animations.
- Meaning never by color alone; text contrast ≥ 4.5:1; 44 px touch targets; no layout shift (fixed image ratios); only the hero photo is `priority`.
- The approved header, footer, homepage hero and menu card stay unchanged. Only addition to the card: when the item's page is live, the photo and name link to it plus a small "View details →" link (rating stays outside the link).

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
