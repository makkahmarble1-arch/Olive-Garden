# Hours: content outline (as built)

**URL:** `/hours` · **Content:** `content/guides/hours.ts` · **Layout:** `components/guide/GuidePageLayout.tsx` (guide page, same components as the category pages)

| Element | Value |
|---|---|
| Title | Olive Garden Hours 2026 – Opening & Closing Times |
| H1 | Olive Garden Hours 2026 |
| Meta description | Olive Garden hours by day, lunch and dinner times, holiday closures, online ordering cutoffs, and how to check your local restaurant's exact hours. |
| Canonical | `/hours` (self) |
| Schema | `WebPage`, `BreadcrumbList`, `FAQPage` (visible FAQ). **No** `LocalBusiness`, `Restaurant`, or `OpeningHoursSpecification`: this is an independent site, not the restaurant |
| Breadcrumb | Home > Menu > Hours |
| Images | None. No owner-approved hours images exist, and no food images were added |

## Outline
1. **H1 + intro:** the common pattern (opens 11 AM, closes 10 or 11 PM), the two closures, and that hours vary by restaurant. Facts bar: last verified (month and year), how hours are set, jump link.
2. **H2 Olive Garden Weekly Hours:** table Day / Opening time / Closing time, with an evidence note and a "may vary" note.
3. **H2 Olive Garden Hours Today:** how to read today's hours; why there is no "open now".
4. **H2 Olive Garden Lunch Hours:** table of lunch and dinner menu times by day; link to `/lunch-menu`.
5. **H2 Olive Garden Dinner Hours:** short; link to `/dinner-menu`.
6. **H2 Olive Garden Weekend Hours:** Saturday, Sunday, Friday; no weekend lunch.
7. **H2 Olive Garden Holiday Hours:** 15-row table (date rule, hours, confirmed by Olive Garden?).
8. **H2 Olive Garden Takeout and Delivery Hours:** To Go and catering cutoffs (one official listing); link to `/catering`.
9. **H2 How to Check Your Local Olive Garden Hours:** 4 steps with the official Find a Location link; link to the full menu.
10. **H2 FAQ:** 8 questions.
11. **Sources:** Olive Garden website + Find a Location; month and year.
12. **Related Menus (4):** Dinner Menu, Lunch Menu, Catering, Lighter Portions.

## Changes from the brief
- **Weekly table cells:** Sunday to Thursday say "10 PM or 11 PM", not one time. The official listings show both, so a single time would claim more than we know.
- **"Weekend Hours"** also covers Friday, because the later closing time starts on Friday.
- **Holiday dates use rules** ("Fourth Thursday in November") instead of 2026 dates: most 2026 holidays have passed, and rules stay correct every year.
- **Lunch and dinner sections are short** and link to `/lunch-menu` and `/dinner-menu`, which own those topics.
- **No dedicated holiday articles** were created. The navigation is ready for them: a published guide with `navGroup: "hours"` joins the Hours dropdown automatically.
