# Homepage Research: Findings and Requirements

**Created:** 2026-11-12. **Corrected:** 2026-11-12 (owner review).
**Updated:** 2026-11-12 with the owner's final decisions 1-6 (Part B).
**Based on:** `competitor-analysis.md` and `research/appetizers/`.

This file has three separate parts:

- **Part A:** what we **observed** on competitor sites (facts from the research).
- **Part B:** the **owner-approved homepage requirements** (the plan to follow).
- **Part C:** how the findings can help inside the approved plan (ideas only,
  no new major feature without owner approval).

> **Correction note:** the first version of this file said the homepage must
> not contain the full menu, price tables, hours, or deals. That was based on
> the older Lesson 5 plan and is **withdrawn**. Part B is the current plan.
> Source of truth for the homepage spec: `docs/MENU_PAGE_OUTLINES.md` "Homepage".
>
> Part A and `competitor-analysis.md` are kept exactly as observed on
> 2026-11-12. Statements there such as "nothing from these sites is used as
> a source" and "Ratings: not allowed" describe the plan *at that time*;
> decisions 5 and 6 below replace them.

---

## Part A: Observed competitor findings (unchanged facts)

Details and per-site notes: `competitor-analysis.md`.

### A1. Information no reviewed competitor provides

1. **Which restaurant** the prices come from (all use "national average"
   or vague wording).
2. **When each price was checked** (per item or per category).
3. **Which source** each price or calorie value came from.
4. **What a calorie number includes** (e.g. sauces counted separately:
   Calamari 670 cal + marinara 35 + spicy ranch 240).
5. **Which portion** a price is for: regular vs. size options vs. catering pan.
6. **Online pickup vs. dine-in** price basis.
7. **How to report a wrong price.**

### A2. Problems observed

- Conflicting prices for the same item on one page.
- Conflicting "updated" dates (title vs. body vs. share text).
- "Verified" badges with no method, date, or source.
- Family-pan calories equal to single-entree calories; same item with
  different values in two sections.
- Unlabeled calorie ranges; unclear whether sauces are included.
- Item counts that do not match the listed items.
- Deals and limited-time offers without start/end dates.
- The same price data repeated in tables, cards, FAQ, and calculators.
- Star ratings with very few votes; one site has no not-official disclaimer.

### A3. What competitors do that diners find useful

- Full menu on one page with category jump links.
- Short "at a glance" summary near the top.
- Hours, lunch information, deals, and an FAQ on the same page.
- Visible "updated" date (when it is honest).

---

## Part B: Owner-approved requirements (final, 2026-11-12)

### B1. Decision 1: website architecture

- Homepage `/` = **primary indexable** Olive Garden Menu & Prices page
  (single full-menu page, as seen on competitor sites).
- All **17** categories and **every** approved item on the homepage. Each
  item: food image, name, price, calories, rating, short description, size
  and portion options where they apply.
- `/menu`: no second indexable full-menu page; noindex during development;
  redirect to `/` reviewed before launch.
- All **17 dedicated category pages** stay: detailed category information,
  menu tables, nutrition, useful FAQs, internal links; indexed when ready.
- One **shared structured data source** for the whole site.

### B2. Decision 2: food images

- Homepage: a food image for every approved item.
- Category pages: Option B (complete table + 3-5 selected images, reusing
  homepage images).
- Owner provides all food images; organized in `docs/IMAGE_MANIFEST.md`.
  Nothing generated or downloaded.

### B3. Decision 3: Popular Menu Items

Chicken Alfredo · Tour of Italy · Lasagna Classico · Chicken Parmigiana ·
Fettuccine Alfredo · Breadsticks. Shown with image, price, calories, and
genuine visitor rating from the shared data. No invented popularity
statistics or sales rankings.

### B4. Decision 4: social media links

Footer links only with URLs supplied by the owner. None invented.

### B5. Decision 5: prices and calories

- Reference: Olive Garden Orlando - Millenia Mall, 4101 Conroy Road,
  Orlando, FL 32839; location-specific **online pickup** prices.
- Priority: official menu/ordering pages → official nutrition documents →
  calculations from verified parts → credible competitor sites (fallback).
- No empty cells. Third-party values cross-checked, matched to the exact
  item and portion, labeled **Estimated**, sources and dates recorded.
  Official values are never overwritten; estimates are never shown as
  official; no unsupported numbers. If nothing credible exists, a
  meaningful availability note is shown.
- Dipping Sauces with Breadsticks: calculated totals from official
  breadstick + sauce values, labeled "Calculated", regular and large kept
  separate.
- Inventory names preserved; official name differences recorded separately;
  nothing removed or merged without permission.
- Full rules: `docs/MENU_RESEARCH_PLAN.md` §1-2.

### B6. Decision 6: visitor rating system

Genuine 1-5 star ratings per item; average and vote count shown; "Not rated
yet" when there are no votes; shared between homepage and category pages;
basic duplicate-vote and spam protection; persistent storage; never fake.
Architecture and database are decided in the rating-system lesson.

### B7. Final homepage structure

1. Header and navigation
2. H1: **Olive Garden Menu with Prices & Calories 2026**
3. Short helpful introduction
4. Pricing location and verification information
5. Category navigation and instant menu search
6. All 17 complete menu categories and every approved menu item
7. Olive Garden Popular Menu Items
8. Olive Garden Lunch Specials & Deals
9. Olive Garden Hours — Opening & Closing Times
10. Olive Garden Holiday Hours
11. Olive Garden Nutrition & Dietary Options
12. How to Order Olive Garden Online
13. Frequently Asked Questions
14. Important internal links and official resources
15. Sources, disclaimer, footer, and social media links

Heading and content rules: one H1; an H2 for each of the 17 categories;
seven supporting H2s (7-13); H3 only where genuinely necessary; concise,
accurate, no repetition or keyword stuffing; natural American English;
detailed category information stays on the category pages; helpful tables
where appropriate; real verification dates and official source links;
mobile-friendly, accessible, fast.

---

## Part C: How the findings support the approved plan

Each idea fits inside an approved block from B2; none adds a new section.

| Finding (Part A) | Where it helps (Part B block) | How |
|---|---|---|
| A1.1, A1.2, A1.6: no location, date, or price basis | 4. Pricing location and verification | Name the Millenia restaurant, say "online pickup prices", show the real check date |
| A1.3: no sources | 4 and 14. Official links | Link the official location page, ordering menu, and nutrition PDF |
| A1.4, A2: unclear calories | 6. Category sections | Show sauces as separate values (e.g. "670 cal; marinara 35 cal"); label calculated totals "Calculated" and estimates "Estimated" |
| A1.5, A2: mixed portions | 6. Category sections | Size options listed under the item; catering/family-style kept in their own categories |
| A2: conflicting dates | 4 and 6 | One date per check, taken from the research files; never a generic "updated this month" |
| A2: expired deals | 8. Lunch Specials & Deals | Only official, dated offers; remove when expired |
| A2: repeated data | 6 vs. 7 | "Popular Menu Items" shows the 6 owner-chosen items only, not a second full list |
| A2: fake-looking ratings | 6 and 7 | Only genuine visitor votes, with the vote count always shown; "Not rated yet" instead of a seeded score; no "most ordered" claims |
| A2: unexplained "Verified" badges | 4 and 6 | Every value shows its basis (official / calculated / estimated) and the page explains what each label means |
| A1.7: no way to report errors | 14. Important links | "Report a wrong price" link once the Contact page and email exist (owner pending) |

---

## Owner items: status (2026-11-12)

1. ~~`/menu` future role~~ → decided: noindex now, redirect to `/` reviewed before launch.
2. ~~Images per item / Option B on category pages~~ → decided (decision 2).
3. ~~Dipping Sauces calories~~ → decided: calculated totals, regular and large.
   Official vs. inventory names → inventory names kept, differences recorded.
4. Social media accounts → decided to add owner-supplied URLs; **URLs still
   to be supplied**.
5. ~~Popular Menu Items~~ → decided (decision 3).
