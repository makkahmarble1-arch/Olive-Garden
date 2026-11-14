# Important Pages Plan

Pages about the website itself (trust, contact, legal). Status file: `content/site/info-pages.ts`. Shared layout: `components/info/InfoPageLayout.tsx` (`DESIGN_SYSTEM.md` 4.3).

| Page | URL | Status (2026-11-14) | Missing before "published" |
|---|---|---|---|
| About Us | `/about-us` | **Preview** (built, linked in the footer, `noindex`, not in the sitemap) | Founder name, role, and biography approved by the owner (`PUBLISHER_IDENTITY.md`) |
| Contact Us | `/contact-us` | **Published** (Lesson 9.5.4: Resend set up, inbox and Reply-To confirmed) | Add the Resend variables in Vercel before deploying (`CONTACT_FORM_SETUP.md`) |
| Privacy Policy | `/privacy-policy` | **Published** (Lesson 9.6; `noindex` until launch) | Owner review items in `LEGAL_PAGES_REVIEW.md`; update before ads or analytics |
| Terms and Conditions | `/terms-and-conditions` | **Published** (Lesson 9.6) | Owner review items (no governing law supplied) |
| Disclaimer | `/disclaimer` | **Published** (Lesson 9.6) | — |
| Editorial Policy | `/editorial-policy` | **Published** (Lesson 9.7) | — |
| How We Check Menu Prices | `/how-we-check-prices` | **Published** (Lesson 9.7) | — |

## Rules

- Link a page in the header or footer only once its route exists (no broken links). Footer: `siteConfig.infoLinks` in `lib/site.ts`.
- Status `preview` = `noindex` + a "Preview" note on the page + not in the sitemap. `published` = indexable once `SITE_INDEXING=true` (owner approval). The sitemap adds published info pages automatically.
- Each page: unique title (`"<Title> | Olive Garden Menu Prices"` via the title template), unique description, self-canonical, one H1, breadcrumb `Home > <Page>`, `AboutPage`/`ContactPage` (or `WebPage`) structured data. No `Person` data without approved founder details.
- These pages are not presented as a requirement of any program. They exist for transparency and for readers.
- New top-level page folders need no proxy change: `next.config.ts` finds folders with a `page.tsx` automatically.

## About Us outline (approved)

Who We Are · Our Mission · What We Cover · How We Research Menu Information · Meet Our Founder · Our Editorial Standards · Independence and Transparency · Get in Touch.

**Facts used:**
- `MENU_RESEARCH_PLAN.md` and the homepage method notes: online pickup prices from one U.S. restaurant, prices vary by location, nutrition-guide cross-check, Calculated and Estimated labels, month-year dates, owner-supplied photos.
- The live data counts: 231 menu listings in 17 categories.

## Contact Us sections (approved)

Send Us a Message (form) · Menu and Price Corrections · General Questions and Website Feedback · Advertising and Business Inquiries · Orders, Reservations, and Refunds (→ official Olive Garden website) · An Independent Website.

## Lesson 9.6 / 9.5.4 status (2026-11-14)

- Contact Us: **published** (Lesson 9.5.4; form working, email verified).
- About Us: preview (founder authorization pending).
- Legal pages: published, with "Last updated: November 2026", an "On this page" list, and `WebPage` + `BreadcrumbList` JSON-LD. They are linked in the footer (`siteConfig.infoLinks`), and the Privacy Policy is also linked from the contact form's privacy notice.

## Lesson 9.7 (2026-11-14)

- **`/editorial-policy`** (9 H2s): source priority (official menu → nutrition documents → calculation → labeled estimate, none in use), writing standards, fact-checking (nutrition-guide cross-check, shared data, build validation), update and correction rules, independence (no paid changes; future ads cannot influence content), images and ratings (→ Disclaimer), and contact. No staff, credentials, firsthand dining, or update schedule is claimed.
- **`/how-we-check-prices`** (7 H2s):
  - reference online pickup prices from one checked U.S. restaurant (public location "USA" only)
  - not a nationwide survey and not live monitoring
  - labels for notes, limited-time items, and "Not verified yet"
  - nutrition-PDF cross-check
  - the calculation methods (per person, totals, round-up group planning, differences)
  - why prices vary, and how to report

  The "Menu prices last verified" month comes from the menu data.
- **Internal links:**
  - Homepage hero bar "How we check prices" → `/how-we-check-prices` (was `#sources`)
  - About Us → How We Check Prices + Editorial Policy
  - Contact Us → How We Check Prices
  - Disclaimer → How We Check Prices
  - The new pages link to Contact, About, and Disclaimer
- **Footer** (`siteConfig.infoLinks`): About Us, Contact Us, Editorial Policy, How We Check Prices, Privacy Policy, Terms and Conditions, Disclaimer.
