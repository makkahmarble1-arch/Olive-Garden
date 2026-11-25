# Christmas Hours: fact verification

**Checked:** 2026-11-25. Page: `/christmas-hours` (`content/guides/christmas-hours.ts`). Public date shown: "November 2026" (month and year only).

**Rule:** only Olive Garden's own statements are facts. No opening or closing time is shown unless Olive Garden published it. The reference restaurant is used internally only; on the page it is "the restaurant we checked".

## Access note (2026-11-25)

- olivegarden.com returned a bare "Not found" in Chrome on 2026-11-25 (the block seen 2026-11-15 to 2026-11-18 is back). It was tried once and not bypassed.
- The official pages were read through the search tool's index of olivegarden.com (`allowed_domains: olivegarden.com, jobs.olivegarden.com`), the same method as `research/seo/hours/FACT_VERIFICATION.md`.
- The FAQ wording below matches the 2026-11-15 check word for word.
- **Owner action:** open https://www.olivegarden.com/faqs in a normal browser before Christmas and confirm the holiday answer is unchanged.

## 1. Verified (official)

| Statement on the page | Source and text | Status |
|---|---|---|
| Closed on Christmas Day | olivegarden.com/faqs: "Olive Garden restaurants are closed on Thanksgiving Day and Christmas Day to allow our team members to spend time with their family and friends." Also jobs.olivegarden.com/benefits: "Closed on Thanksgiving & Christmas" | Verified 2026-11-25 (also 2026-11-15) |
| Reason: team members spend time with family and friends | Same FAQ sentence | Verified |
| Open on Christmas Eve, may close early depending on business; each restaurant sets the closing time | FAQ: "Depending on the amount of business on the day before these holidays, the restaurants may close early. Please contact the restaurant directly for the scheduled closing time the day before Thanksgiving or Christmas Eve." | Verified |
| Hawaii, Puerto Rico, Guam may differ | FAQ: "Hawaii, Puerto Rico, Guam and International holiday hours may vary by location." (International not mentioned: USA-only site) | Verified |
| Dinner menu all day on Saturdays (Dec 26 is a Saturday) | FAQ: "Our practice is to serve our dinner menu all day on Saturdays, Sundays, and holidays." | Verified |
| Regular Thursday and Saturday times used for comparison (opens 11 AM; closes 10 PM or 11 PM; Saturday 11 AM-11 PM) | `research/seo/hours/FACT_VERIFICATION.md` §2 (official restaurant listings, 9 states) | Verified 2026-11-15 |
| Online To Go orders until 20 minutes before closing at the restaurant we checked | Reference restaurant page, `research/seo/hours/FACT_VERIFICATION.md` §2 | Verified 2026-11-12 |
| Catering: order by 5 PM for next-day lunch delivery; pasta stations 24 hours' notice; lasagna pans about 2 hours | olivegarden.com/catering (as on `/catering`, `content/menu/category-pages.ts`) | Verified (catering page research) |

## 2. Derived (stated on the page, follows from the verified facts)

- **2026 dates:** Christmas Eve is Thursday, December 24; Christmas Day is Friday, December 25; December 26 is a Saturday (calendar).
- **No pickup, delivery, or catering on Christmas Day:** the restaurants are closed.
- **Restaurants open again on December 26:** the FAQ names only Christmas Day as the closure. No special hours are announced, so the card says "No special hours announced".
- **Earlier last online order on an early-closing day:** the cutoff is 20 minutes before closing at the restaurant we checked.
- **Christmas Eve lunch catering delivery ordered by 5 PM on December 23:** the usual next-day rule applied to the date. No holiday cutoff is announced, and the page says so.

## 3. Not published by Olive Garden (shown as "Not announced" or left out)

- The Christmas Eve closing time, nationally or for any restaurant. Third-party sites quote 6 PM, 8 PM, or 9 PM; none comes from Olive Garden, so none is used.
- Whether the lunch menu runs on Christmas Eve (a Thursday). Left out.
- Holiday cutoffs for online To Go, delivery, and catering on Christmas Eve.
- A 2026-specific Christmas announcement. The FAQ is a standing yearly policy, and the page says "Olive Garden's FAQ", not "2026 announcement".
- Delivery through third-party apps.
- No holiday menu, special offers, or gift-card promotions are mentioned (none verified; out of scope).

## 4. Seasonal updates required

- **Before Christmas 2027:**
  - Re-check the FAQ.
  - Change the year in the H1, title, description, intro, cards, table headers, FAQs and `menuTitle`.
  - Update the dates and weekdays: 2027-12-24 is a Friday, 2027-12-25 a Saturday, and 2027-12-26 a Sunday.
  - Update `verifiedAt`, `contentReviewedAt`, and this file.
- **If Olive Garden publishes a Christmas Eve closing time,** add it with its source. Never estimate one.
- **If the FAQ changes** (for example, restaurants open on Christmas Day), update `/christmas-hours`, `/hours` (holiday table and FAQ), the homepage holiday section, and `/dinner-menu`.
