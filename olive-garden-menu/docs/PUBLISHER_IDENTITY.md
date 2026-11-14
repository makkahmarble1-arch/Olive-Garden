# Publisher Identity

**Status:** 2026-11-14 (Lesson 9.5). Data file: `content/site/publisher.ts`. The site name is set in `lib/site.ts`.

## 1. Approved by the owner

| Item | Value | Where |
|---|---|---|
| Website name | **Olive Garden Menu Prices** (was "Olive Garden Menu & Prices") | `siteConfig.name`: header, footer, title template, Open Graph `site_name`, structured data |
| Domain | https://olivegardenmenuprices.us (never hardcoded; `NEXT_PUBLIC_SITE_URL`) | Vercel |
| Publisher | **"Olive Garden Menu Prices Editorial Desk"** only (owner decision 2026-11-14: no personal founder profile) | `publisher.editorialTeam`; `founder: null` (not rendered) |
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

## 5. Final decision (2026-11-14, after Lesson 9.8)

- The **founder section was removed** from About Us and replaced by "Our Editorial Desk", which describes the real research and correction process.
- **Katherine Salom's name, biography, photo, and credentials are not published** anywhere: site, code, structured data, or metadata. Section 4 above is kept only as history.
- About Us is now **published** (no placeholder).
- The JSON-LD `Organization` (homepage) adds `publishingPrinciples` → `/editorial-policy` and a `ContactPoint` ("website inquiries") → `/contact-us`. No `Person`, logo, address, or phone.

## Trademark and brand safety (owner decision 2026-11-14)

The owner has decided **not to hire a lawyer at this stage**. A professional trademark review of the domain `olivegardenmenuprices.us` and the site name "Olive Garden Menu Prices" has been **declined for now**. This does **not** mean the trademark risk has been removed, and the domain has **no** legal clearance. The project keeps these safeguards instead (check them on every change):

| Safeguard | How it is kept (verified 2026-11-14) |
|---|---|
| Clearly independent branding | Text-only site name with the tagline "Independent menu & price guide"; homepage badge "Independent Menu Guide · Not the official Olive Garden website" |
| No official logo | No Olive Garden logo or official photos anywhere (`public/images` contains only owner food photos, illustrations, and the owner's OG image) |
| No imitation of the official site | Own design system (olive/cream palette, own typography and layout), not the official site's styling |
| Visible disclosures | Footer disclaimer on every page; About "Independence and Transparency"; Disclaimer "Independent Website Disclosure" and "Trademark Notice"; Terms "Intellectual Property and Trademarks" |
| No claims of affiliation, sponsorship, or endorsement | Metadata, titles, descriptions, and JSON-LD checked: no "official", "authorized", "endorsed", or "partner" claims. The JSON-LD `Organization` is this website, with "Not affiliated with Olive Garden or Darden Restaurants, Inc." |
| Name used only to identify | "Olive Garden" appears as the restaurant and menu being described |
| No orders or reservations | The site sells nothing; Terms and Contact send these requests to Olive Garden |
| Original content, sourced images | Own text from official facts; owner-supplied photos and illustrations (AI disclosed on the Disclaimer) |
| Transparent publisher | "Olive Garden Menu Prices Editorial Desk", About Us, Editorial Policy, a working contact form, and a verified email |

If Olive Garden or Darden ever raises a concern, respond promptly and reconsider the name or domain. Record any such contact here.
