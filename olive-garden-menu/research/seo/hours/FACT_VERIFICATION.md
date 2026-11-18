# Hours: fact verification

**Checked:** 2026-11-15. **Rule:** hours come only from official Olive Garden sources. The reference restaurant is used internally only; on the page it is "the restaurant we checked". No time is presented as guaranteed nationwide.

**Access note:** olivegarden.com returns HTTP 403 to automated page requests, and this was not bypassed. Two kinds of sources were used:
1. Our full official check of the reference restaurant page on 2026-11-12 (`research/homepage/hours.md`, `holiday-hours.md`).
2. Official olivegarden.com pages as indexed by the search tool on 2026-11-15. The snippets show each page's hours text, such as "Friday 11:00 AM - 11:00 PM Lunch 11:00 AM - 3:00 PM Dinner 3:00 PM - 11:00 PM".

The search tool reported these snippets as captured on different, earlier dates in 2026, so the "today" day is not always known.

## 1. Official policy (Olive Garden FAQ, olivegarden.com/faqs; jobs.olivegarden.com/benefits)
| Statement on the page | Source text (snippet, 2026-11-15) | Status |
|---|---|---|
| Closed on Thanksgiving Day and Christmas Day | "Olive Garden restaurants are closed on Thanksgiving Day and Christmas Day"; careers page "Closed on Thanksgiving & Christmas" | Verified |
| May close early the day before Thanksgiving and on Christmas Eve; call the restaurant | "Depending on the amount of business on the day before these holidays, the restaurants may close early. Please contact the restaurant directly for the scheduled closing time" | Verified |
| Hawaii, Puerto Rico, Guam holiday hours may differ | "Hawaii, Puerto Rico, Guam and International holiday hours may vary by location" | Verified (international not mentioned: USA-only site) |
| Lunch Monday-Friday until 3 PM; dinner menu all day on Saturdays, Sundays, and holidays; some regional variations | "Lunch is served Monday through Friday until 3pm. Our practice is to serve our dinner menu all day on Saturdays, Sundays, and holidays." | Verified |
| No other announced holiday closures, and no published holiday times | The FAQ names only the two closures. The restaurant page checked 2026-11-12 showed no holiday schedule | Verified (absence) |

## 2. Official restaurant listings (opening and closing times)
| Restaurant (official page) | State | What the listing showed |
|---|---|---|
| Reference restaurant (full week, 2026-11-12) | FL | Mon-Thu 11 AM-10 PM; Fri-Sat 11 AM-11 PM; Sun 11 AM-10 PM. Lunch 11-3 Mon-Fri; dinner 3 PM-close Mon-Fri, all day Sat-Sun. Online ordering until 20 min before close; catering delivery until 9 PM (10 PM Fri-Sat) |
| Los Angeles - Midtown (/locations/ca/los-angeles/los-angeles-midtown/6415) | CA | Friday 11 AM-11 PM; lunch 11 AM-3 PM; dinner 3 PM-11 PM |
| Cincinnati - Oakley (/locations/oh/cincinnati/cincinnati-oakley/4496) | OH | Friday 11 AM-11 PM; lunch 11-3; dinner 3-11 |
| Las Vegas - Cheyenne Ave (/locations/nv/las-vegas/las-vegas-cheyenne-ave/1363) | NV | Friday 11 AM-11 PM; lunch 11-3; dinner 3-11 |
| Montebello (/locations/ca/montebello/montebello/4453) | CA | Saturday 11 AM-11 PM; dinner 11 AM-11 PM |
| San Jose (/locations/ca/san-jose/san-jose/1184) | CA | 11 AM-10 PM (day not shown) |
| Austin - South Lamar Blvd (/locations/tx/austin/austin-south-lamar-blvd/1046) | TX | 11 AM-10 PM (day not shown) |
| Elmhurst (/locations/ny/elmhurst/elmhurst/4443) | NY | 11 AM-11 PM (day not shown) |
| Myrtle Beach - Downtown (/locations/sc/myrtle-beach/myrtle-beach-downtown/1326) | SC | 11 AM-11 PM (day not shown) |
| Sevierville (/locations/tn/sevierville/sevierville/1662) | TN | 11 AM-11 PM (day not shown) |
| San Antonio - Military Drive (/locations/tx/san-antonio/san-antonio-military-drive/6416) | TX | 11 AM-11 PM (day not shown) |
| Stockton, Houston - Richey Rd, Austin - Lakeline Mall, Albuquerque - Juan Tabo Blvd, two more Florida restaurants | CA, TX, NM, FL | 11 AM-11 PM (day not shown) |

**Conclusions used on the page:**
- Every listing opened at 11 AM.
- Every listing with a known Friday or Saturday closed at 11 PM.
- Closing times overall were 10 PM or 11 PM.
- States covered: CA, TX, NY, SC, FL, TN, NV, OH, NM (nine).
- The Sunday-Thursday table cells say "10 PM or 11 PM", because days were not visible for most 11 PM listings.

## 3. Not published (not verified)
- Exact holiday opening or closing times, including the early-closing times on the day before Thanksgiving and on Christmas Eve.
- Whether online ordering, delivery, or catering run on holidays.
- Third-party claims such as "July 4: 11 AM-9 PM" or "open 363 days a year".
- Live "open now" status, visitor location, and time zones.
- Hours of any named city or restaurant.
- Delivery hours by third-party apps.

## 4. Re-check before launch
Open the FAQ and two or three restaurant pages in a normal browser to confirm the times and the holiday policy. If anything changed, update `content/guides/hours.ts` and this file.
