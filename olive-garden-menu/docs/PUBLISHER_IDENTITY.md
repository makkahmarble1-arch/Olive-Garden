# Publisher Identity

**Status:** 2026-11-14 (Lesson 9.5). Data file: `content/site/publisher.ts`. The site name is set in `lib/site.ts`.

## 1. Approved by the owner

| Item | Value | Where |
|---|---|---|
| Website name | **Olive Garden Menu Prices** (was "Olive Garden Menu & Prices") | `siteConfig.name`: header, footer, title template, Open Graph `site_name`, structured data |
| Domain | https://olivegardenmenuprices.us (never hardcoded; `NEXT_PUBLIC_SITE_URL`) | Vercel |
| Publisher structure | A real founder plus the **"Olive Garden Menu Prices Editorial Desk"** (renamed from "Editorial Team" in Lesson 9.5.4) | `publisher.editorialTeam` |
| Audience and language | United States, American English | whole site |
| Contact method | Contact form + professional email address | `/contact-us` |
| Contact email | contact@olivegardenmenuprices.us: **verified 2026-11-14** (the owner confirmed inbox receipt of the end-to-end test) and shown on `/contact-us` | `publisher.contactEmail` (`verified: true`) |
| Monetization goal | Google AdSense (not set up yet; no approval is claimed anywhere) | — |

## 2. Missing (owner must supply; nothing is invented)

| Missing | Effect now | To publish |
|---|---|---|
| Founder's exact public name | About Us "Meet Our Founder" says "The founder's profile will be published here soon." The page stays a preview (`noindex`, not in the sitemap) | Fill `publisher.founder = { name, role, bio: [...] }` with owner-approved text only (no invented credentials, experience, or photo) |
| Founder's role and biography | (same) | (same) |
| Founder photo (optional) | none shown | Only an owner-supplied photo, with permission |
| Size of the editorial team | Text says "published by its founder and the Olive Garden Menu Prices Editorial Desk"; no team members are named or counted | If the founder works alone, the owner may prefer "edited by our founder" wording. Owner decision |
| Contact inbox confirmation | **Done** (Lesson 9.5.4) | — |

## 3. Rules

- No fake people, credentials, addresses, phone numbers, or reviews.
- No `Person` structured data until the founder's details are approved. Even then, add only what is shown on the page.
- The `Organization` in the structured data is this website (the publisher), never Olive Garden.
- Never claim Google or AdSense approval or any partnership.

## 4. Proposed founder (Lesson 9.5.4): NOT published

- The owner proposed the name **Katherine Salom**, with the role **Founder & Editor**.
- They are recorded here only. They do **not** appear on the site, in the code, or in structured data.
- Before publishing, the owner must confirm in writing:
  1. That Katherine Salom is a real person who has authorized the use of her name (and any photo) on this website.
  2. That "Founder & Editor" is accurate.
  3. The exact public biography, in sentences she approves. No invented credentials, experience, or team members.
- Then set `publisher.founder = { name, role, bio }` and change About Us to `published`.
- Until then, About Us shows "The founder's profile will be published here soon." and stays a preview.
