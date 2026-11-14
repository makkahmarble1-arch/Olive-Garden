# Google Publisher Policy Audit (Lesson 9.8)

**Date:** 2026-11-14 · **Build:** local production build (`next build` + `next start`). Nothing is deployed.

**Status values:**
- PASS
- NEEDS CORRECTION
- PENDING DEPLOYMENT
- PENDING ADSENSE ACTIVATION
- NOT VERIFIED
- NOT APPLICABLE

**This audit is not a legal opinion, and it does not guarantee AdSense approval.**

## 1. Official sources reviewed (2026-11-14)

| Source | Accessed | Key points used |
|---|---|---|
| AdSense eligibility, https://support.google.com/adsense/answer/9724 | Yes | Own content; comply with the Program policies (https://support.google.com/adsense/answer/48182); age 18+. No traffic, page-count, or domain-age rule is stated there, and none is assumed here |
| Publisher Policies, https://support.google.com/publisherpolicies/answer/10502938 | Yes | Misrepresentation (do not conceal publisher information; do not falsely imply affiliation, e.g. by misusing logos); deceptive claims; copyright and trademark; no ads on low-value, empty, or under-construction screens; more content than ads; accurate ads.txt declarations; privacy policy required |
| Privacy disclosures, https://support.google.com/publisherpolicies/answer/10437486 | Yes | Have and follow a privacy policy disclosing data collection, sharing, and use; tell users that third parties may place and read cookies; link to "How Google uses data when you use our partners' sites or apps"; comply with the EU user consent policy |
| EU user consent policy, https://www.google.com/about/company/user-consent-policy/ | Yes | EEA/UK/CH: legally valid consent for cookies and personalized ads where required; keep records; revocation; identify the parties |
| CMP requirement, https://support.google.com/adsense/answer/13554116 | Yes (Lesson 9.6) | A Google-certified CMP (IAB TCF) is required for personalized ads in the EEA and UK since 16 Jan 2024, and in Switzerland since 31 Jul 2024 |
| Ads and cookies, https://policies.google.com/technologies/ads | Yes | Ad cookie domains; user controls (My Ad Center, aboutads.info, youronlinechoices) |
| Search Essentials, https://developers.google.com/search/docs/essentials | Yes (overview only) | Technical requirements, spam policies, helpful people-first content. The fetched overview did not list the individual technical requirements, so they are taken from general knowledge (crawlable, 200, indexable). **NOT VERIFIED in detail** |
| Spam policies, https://developers.google.com/search/docs/essentials/spam-policies | Yes | Scaled content abuse applies "no matter how it's created"; keyword stuffing; doorway abuse; thin affiliation; misleading functionality; scraping |

**Not fetched / verify manually before applying:**
- the full AdSense "Privacy and security" Program policy text
- the current list of Google-certified CMPs
- Restricted Data Processing (US states)
- the COPPA settings page

## 2. Findings

| # | Requirement (type) | Reference | Current implementation | Evidence | Status | Recommended correction | Owner approval |
|---|---|---|---|---|---|---|---|
| 1 | Original, valuable content; no scaled or low-value pages (mandatory for ads) | Publisher Policies; Spam policies | 25 pages, each with distinct intent; category pages 1,636-7,300 words with tables and calculations; information pages 453-1,942 words; no doorway pages, no affiliate links | `audit98.py`: 25 × 200, no duplicate titles or descriptions | PASS | — | — |
| 2 | No under-construction screens where ads appear (mandatory once ads run) | Publisher Policies ("valuable inventory") | About Us shows a "Preview" note and "The founder's profile will be published here soon." | Rendered text of `/about-us` | NEEDS CORRECTION | Before launch: publish the authorized founder profile, **or** reword the section without a placeholder (for example describe the Editorial Desk only). Do not place ads on About, Contact, or legal pages | Yes |
| 3 | Do not misrepresent the publisher or imply affiliation (mandatory) | Misrepresentation | Independent disclosure in every footer, in the About Us "Independence" section, and in the Disclaimer; no Olive Garden logo or official photos; structured data `Organization` = this website | Footer text on 25 pages; `og:site_name` "Olive Garden Menu Prices" | PASS | — | — |
| 4 | Brand/domain impression (risk review) | Misrepresentation; trademark | The domain `olivegardenmenuprices.us` and the site name contain the "Olive Garden" trademark; the logo is plain text | Domain, `siteConfig.name` | NOT VERIFIED | Owner and lawyer review of the trademark risk of the domain and name (nominative use, Darden's policies). No legal conclusion is drawn here | Yes |
| 5 | Accurate information; no deceptive claims (mandatory) | Deceptive practices | Prices from official sources with month-year dates; promotions labeled with a "checked" date; "Not on the current online menu" notes; 0 estimated values | Data validation; `/how-we-check-prices` | PASS (time-sensitive facts **PENDING** manual re-check before launch) | Re-check BOGO, $6 Take Home, lunch combo, lunch hours, catering, and kids age wording (`LAUNCH_CHECKLIST.md` §2) | — |
| 6 | Images must not mislead (deceptive practices) | Deceptive practices | 4 owner photos in use differ from the dish. The **gluten-sensitive Grilled Chicken Parmigiana photo shows spaghetti** (not gluten-free). The Disclaimer discloses illustrative and AI images that may not match | `MISSING_IMAGES.md`; `/disclaimer` | NEEDS CORRECTION | Replace the GS Grilled Chicken Parmigiana photo (rotini) before launch; optionally replace the others | Yes (photos) |
| 7 | Copyright: no copied content or images | Copyrighted material | Text written from official facts in our own words; images supplied by the owner (photos + AI illustrations); no competitor images or text used | Project rules and history | NOT VERIFIED | No automated plagiarism scan was run; optional check with a plagiarism tool before applying | — |
| 8 | Fake credentials, reviews, authors (prohibited) | Misrepresentation | No `Person`, no named author, no reviews; ratings are genuine visitor votes (3 votes: 2 dev tests + 1 unknown) | `audit98.py`: `person_ld` false, no "Katherine" on any page | PASS (the dev test votes **PENDING** removal: owner SQL) | Run the vote cleanup SQL before launch | — |
| 9 | Privacy policy disclosing data use and cookies (mandatory) | Privacy disclosures | `/privacy-policy` matches the code (`PRIVACY_DATA_INVENTORY.md`); third-party cookie and Google disclosures included as "planned" | Lesson 9.6 review + this audit | PASS | — | — |
| 10 | Third-party ad cookie disclosure + partner-sites link (mandatory with ads) | Privacy disclosures | Present, worded as future | `/privacy-policy#advertising` | PENDING ADSENSE ACTIVATION | Change "planned" to "active" when ads start | Yes |
| 11 | EU user consent / certified CMP (EEA/UK/CH, with personalized ads) | EU consent policy; CMP page | Not installed (no ads yet). Plan: Google "Privacy & messaging" | `GOOGLE_ADSENSE_COMPLIANCE_CHECKLIST.md` | PENDING ADSENSE ACTIVATION | Verify the CMP's certification, then configure it before ads | Yes |
| 12 | US state privacy (depends on law and thresholds) | AdSense RDP options | No ads, no sale or sharing of data | — | NOT APPLICABLE now / PENDING ADSENSE ACTIVATION | Decide on Restricted Data Processing and any opt-out link when ads start; legal review | Yes |
| 13 | Children (COPPA) | Publisher Policies (COPPA) | General audience; the kids page is for parents; no age data collected | `/privacy-policy#childrens-privacy` | PASS (AdSense COPPA setting **PENDING ADSENSE ACTIVATION**) | Keep "not directed to children" in the AdSense settings | — |
| 14 | Accessible, crawlable site (Search) | Search Essentials | 25 × 200, valid metadata, canonicals, JSON-LD; `noindex` while pre-launch | Audit + Lighthouse SEO (only `is-crawlable` fails, by design) | PENDING DEPLOYMENT | Set `SITE_INDEXING=true` at launch | Yes |
| 15 | ads.txt (when ads run) | Publisher Policies (authorized inventory) | None (`/ads.txt` → 404) | HTTP test | PENDING ADSENSE ACTIVATION | Add `public/ads.txt` with the real publisher id from the account; never invent one | — |
| 16 | Contact method / transparency (best practice) | — (not a stated policy rule) | Working form (tested end to end) + verified email | Lesson 9.5.4 | PASS | — | — |

## 3. Follow-up (2026-11-14, owner decisions after the audit)

| # | Finding | New status | Change |
|---|---|---|---|
| 2 | About Us placeholder | **PASS** | Founder section removed; "Our Editorial Desk" added; About Us published |
| 4 | Brand/domain trademark risk | **NOT VERIFIED** (review declined by the owner) | Safeguards documented in `PUBLISHER_IDENTITY.md`; no legal clearance is claimed |
| 6 | GS photo showed spaghetti | **PASS** (minor: chicken looks breaded) | New owner photo with rotini |
| 8 | Fake authors | **PASS** | No personal author published; `Organization` has `publishingPrinciples` + `ContactPoint` (real pages) |
