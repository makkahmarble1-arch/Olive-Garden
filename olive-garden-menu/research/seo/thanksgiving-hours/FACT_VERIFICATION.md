# Thanksgiving Hours: fact verification

**Checked:** 2026-11-25. Page: `/thanksgiving-hours` (`content/guides/thanksgiving-hours.ts`). Public date shown: "November 2026" (month and year only).

**Rule:** only Olive Garden's own statements are facts. No opening or closing time is shown unless Olive Garden published it. The reference restaurant is used internally only.

## Access note (2026-11-25)

- olivegarden.com returned a bare "Not found" in Chrome on 2026-11-25. It was tried once and not bypassed.
- Official pages were read through the search tool's index of olivegarden.com, the same method as `research/seo/hours/FACT_VERIFICATION.md`.
- **Note:** this check was made on the day before Thanksgiving 2026. The page may go live after the holiday; it stays correct because it is written for the 2026 dates.

## 1. Verified (official)

| Statement on the page | Source and text | Status |
|---|---|---|
| Closed on Thanksgiving Day | olivegarden.com/faqs: "Olive Garden restaurants are closed on Thanksgiving Day and Christmas Day to allow our team members to spend time with their family and friends."; jobs.olivegarden.com/benefits: "Closed on Thanksgiving & Christmas" | Verified 2026-11-25 (also 2026-11-15) |
| Open the day before, may close early depending on business; closing time from each restaurant | FAQ: "Depending on the amount of business on the day before these holidays, the restaurants may close early. Please contact the restaurant directly for the scheduled closing time the day before Thanksgiving or Christmas Eve." | Verified |
| Hawaii, Puerto Rico, Guam may differ | FAQ: "Hawaii, Puerto Rico, Guam and International holiday hours may vary by location." | Verified |
| Regular Wednesday and Friday times used for comparison (opens 11 AM; Wed closes 10 PM or 11 PM; Fri 11 AM-11 PM) | `research/seo/hours/FACT_VERIFICATION.md` §2 | Verified 2026-11-15 |
| Online To Go until 20 minutes before closing at the restaurant we checked | Reference restaurant page | Verified 2026-11-12 |
| Catering: order by 5 PM for next-day lunch delivery; pasta station 24 hours; lasagna pans about 2 hours | olivegarden.com/catering (as on `/catering`) | Verified |

### Supporting evidence (not used as the page's basis)

- Search-indexed copies of several official location pages show a notice that the restaurant is **closed Thursday, November 26 and reopens Friday, November 27**. Pages seen in the index: San Diego Carmel Mountain, NYC Times Square, Tucson Irvington, Albuquerque Juan Tabo Blvd and San Mateo Blvd, Los Angeles Midtown, and Colorado Springs Chapel Hills Mall.
- These dates match 2026, but they also match 2020, and the index showed old capture ages for some pages. They could not be opened directly, so they support the page's statements but are not quoted on it.
- A news roundup for 2026 (WJLA, Washington DC area: "What's open and closed on Thanksgiving 2026") lists Olive Garden as closed. This is third-party and recorded only.

## 2. Derived (stated on the page)

- **2026 dates:** Thanksgiving Day is Thursday, November 26 (the fourth Thursday); the day before is Wednesday, November 25; Black Friday is November 27 (calendar).
- **No pickup, delivery, or catering on Thanksgiving Day,** because the restaurants are closed. Food for a Thanksgiving gathering therefore has to be picked up by Wednesday.
- **Open again on Friday, November 27:** the FAQ names only Thanksgiving Day as the closure. No special hours are announced.
- **Earlier last online order if a restaurant closes early:** the cutoff is 20 minutes before closing.
- **Wednesday lunch catering delivery ordered by 5 PM on Tuesday, November 24:** the usual next-day rule. No holiday cutoff is announced.

## 3. Not published by Olive Garden (shown as "Not announced" or left out)

- The closing time on the day before Thanksgiving. Third-party sites claim "regular hours" or "reduced hours"; neither is from Olive Garden.
- Black Friday special hours.
- Holiday cutoffs for To Go, delivery, and catering.
- Any Thanksgiving meal, turkey dinner, or holiday catering package. Nothing was verified, so nothing is claimed (task restriction).
- Whether the lunch menu runs on the Wednesday before Thanksgiving or on Black Friday. Left out.

## 4. Seasonal updates required

- **Before Thanksgiving 2027:**
  - Re-check the FAQ.
  - Thanksgiving 2027 is Thursday, November 25; the day before is Wednesday, November 24; Black Friday is November 26.
  - Change the year and dates everywhere on the page (H1, title, description, intro, cards, table headers, FAQs, catering example), plus `verifiedAt`, `contentReviewedAt`, and this file.
- **If Olive Garden publishes a closing time for the day before,** add it with its source.
- **If the closure policy changes,** also update `/hours`, the homepage holiday section, `/dinner-menu`, and `/catering`.
