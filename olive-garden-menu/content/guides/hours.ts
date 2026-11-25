import type { GuidePageContent } from "@/lib/types";

/**
 * /hours: "Olive Garden Hours" guide (2026-11-15).
 * Research and fact log: research/seo/hours/ (FACT_VERIFICATION.md lists the
 * official listing for every time shown here).
 *
 * Rules:
 * - Hours are set by each restaurant. Times come from official Olive Garden
 *   restaurant pages and the official FAQ only. They are never presented as
 *   guaranteed nationwide, and there is no "open now" status (no visitor
 *   location, no time-zone logic).
 * - The reference restaurant is never named; it is "the restaurant we checked".
 * - Holidays: only the closures and early-closing notes the official FAQ
 *   confirms are stated as fact; everything else is "Not announced".
 * - Lunch and dinner details stay on /lunch-menu and /dinner-menu (this page
 *   gives the times and links; research/seo/KEYWORD_CANNIBALIZATION.md §8).
 */

const REVIEWED = "2026-11-15";
const LOCATOR = "https://www.olivegarden.com/locations/location-search";
const VARIES = { text: "Varies by location", note: true } as const;
const NOT_ANNOUNCED = { text: "Not announced", note: true } as const;

export const hoursGuide: GuidePageContent = {
  slug: "hours",
  name: "Hours",
  status: "published",
  primaryKeyword: "olive garden hours",
  secondaryKeywords: [
    "olive garden hours today",
    "olive garden opening hours",
    "olive garden closing time",
    "what time does olive garden open",
    "what time does olive garden close",
    "olive garden sunday hours",
    "olive garden saturday hours",
    "olive garden holiday hours",
    // "is olive garden open on thanksgiving / christmas" moved to /thanksgiving-hours and /christmas-hours (2026-11-25).
    "olive garden hours near me",
    "olive garden hours of operation",
    "takeout olive garden hours",
  ],
  searchIntent: "Find out when Olive Garden opens and closes, when lunch and dinner are served, and on which holidays it is closed.",
  menuTitle: "Olive Garden Hours",
  metaTitle: "Olive Garden Hours 2026 – Opening & Closing Times",
  metaDescription:
    "Olive Garden hours by day, lunch and dinner menu times, weekend hours, holiday closures, and the cutoffs for online takeout and catering orders.",
  h1: "Olive Garden Hours 2026",
  intro: [
    "Most Olive Garden restaurants open at 11 AM and close at 10 PM or 11 PM. Every official restaurant listing we reviewed opened at 11 AM, and the Friday and Saturday listings closed at 11 PM. Olive Garden closes on Thanksgiving Day and Christmas Day.",
    "Each restaurant sets its own hours, so the times below show what Olive Garden restaurants usually keep. This page covers the weekly hours, lunch and dinner times, weekends, holidays, and online ordering.",
  ],
  contentReviewedAt: REVIEWED,
  verifiedAt: "2026-11-15",
  heroFacts: [
    { label: "Hours", value: "set by each restaurant; times from official Olive Garden listings, USA" },
  ],
  jumpLabel: "Jump to the weekly hours",
  tableAnchor: "weekly-hours",
  tableHeading: "Olive Garden Weekly Hours",
  tableIntro: [
    "These are the opening and closing times we found on official Olive Garden restaurant pages. Your restaurant may open or close at a different time.",
  ],
  mainStaticTableId: "weekly-hours",
  sections: [
    {
      id: "hours-today",
      heading: "Olive Garden Hours Today",
      blocks: [
        {
          type: "paragraph",
          text: "Today’s hours depend on the restaurant and the day of the week. On a weekday or a weekend, the restaurants we checked opened at 11 AM. They closed at 10 PM or 11 PM, and at 11 PM on Fridays and Saturdays.",
        },
        {
          type: "paragraph",
          text: "We don’t show an “open now” status, because closing times differ by restaurant and time zone.",
        },
      ],
    },
    {
      id: "lunch-hours",
      heading: "Olive Garden Lunch Hours",
      blocks: [
        {
          type: "paragraph",
          text: "Olive Garden serves lunch Monday to Friday from opening until 3 PM. There is no lunch menu on Saturdays, Sundays, or holidays.",
        },
        { type: "staticTable", id: "menu-times" },
        {
          type: "paragraph",
          text: [
            "Lunch prices, the weekday lunch specials, and the full lunch lineup are on our ",
            { text: "Olive Garden lunch menu", href: "/lunch-menu" },
            ".",
          ],
        },
      ],
    },
    {
      id: "dinner-hours",
      heading: "Olive Garden Dinner Hours",
      blocks: [
        {
          type: "paragraph",
          text: [
            "The dinner menu starts at 3 PM on weekdays and runs until closing. On weekends and holidays it is served all day. Dinner prices, lighter portions, and what a dinner for two costs are on our ",
            { text: "Olive Garden dinner menu", href: "/dinner-menu" },
            " guide.",
          ],
        },
      ],
    },
    {
      id: "weekend-hours",
      heading: "Olive Garden Weekend Hours",
      blocks: [
        {
          type: "list",
          items: [
            "Friday: the restaurants we checked closed at 11 PM, an hour later than Sunday to Thursday at the restaurant we checked.",
            "Saturday: the official listings we reviewed showed 11 AM to 11 PM, with the dinner menu all day.",
            "Sunday: Olive Garden is open on Sundays. The restaurant we checked was open 11 AM to 10 PM, with the dinner menu all day.",
          ],
        },
        {
          type: "note",
          text: "Weekend lunch: there is none. Lunch prices and lunch-only items are for Monday to Friday until 3 PM.",
        },
      ],
    },
    {
      id: "holiday-hours",
      heading: "Olive Garden Holiday Hours",
      blocks: [
        {
          type: "paragraph",
          text: "Olive Garden’s only announced closures are Thanksgiving Day and Christmas Day. On the day before each of them, restaurants may close early. On other holidays Olive Garden serves its dinner menu all day, but it does not publish holiday opening and closing times.",
        },
        {
          type: "paragraph",
          text: [
            "The week of each closure has its own guide: ",
            { text: "Olive Garden Thanksgiving hours", href: "/thanksgiving-hours" },
            " and ",
            { text: "Olive Garden Christmas hours", href: "/christmas-hours" },
            ".",
          ],
        },
        { type: "staticTable", id: "holiday-hours-table" },
        {
          type: "note",
          text: "“Not announced” means Olive Garden has published no special hours for that day, so restaurants may keep their regular hours or change them. Holiday hours in Hawaii, Puerto Rico, and Guam may differ, according to Olive Garden.",
        },
      ],
    },
    {
      id: "takeout-delivery-hours",
      heading: "Olive Garden Takeout and Delivery Hours",
      blocks: [
        {
          type: "paragraph",
          text: "You can order To Go online for pickup, and delivery where it is offered. At the restaurant we checked, online orders were taken from opening until 20 minutes before closing.",
        },
        { type: "staticTable", id: "to-go-hours" },
        {
          type: "paragraph",
          text: [
            "Ordering for a group? Catering delivery has its own cutoff, so plan ahead with our ",
            { text: "Olive Garden catering menu", href: "/catering" },
            ".",
          ],
        },
      ],
    },
  ],
  staticTables: [
    {
      id: "weekly-hours",
      caption: "Olive Garden hours by day (official restaurant listings)",
      compact: true,
      firstHeader: "Day",
      headers: ["Opening time", "Closing time"],
      rows: [
        { label: "Monday", cells: ["11 AM", "10 PM or 11 PM"] },
        { label: "Tuesday", cells: ["11 AM", "10 PM or 11 PM"] },
        { label: "Wednesday", cells: ["11 AM", "10 PM or 11 PM"] },
        { label: "Thursday", cells: ["11 AM", "10 PM or 11 PM"] },
        { label: "Friday", cells: ["11 AM", "11 PM"] },
        { label: "Saturday", cells: ["11 AM", "11 PM"] },
        { label: "Sunday", cells: ["11 AM", "10 PM or 11 PM"] },
      ],
      notes: [
        "Based on official Olive Garden restaurant pages in nine states, checked in 2026. Every listing opened at 11 AM. The restaurant whose full week we checked in November 2026 closed at 10 PM Sunday to Thursday and 11 PM on Friday and Saturday. Listings for other restaurants showed closing times of 10 PM or 11 PM.",
        "Individual restaurant hours may vary."
      ],
    },
    {
      id: "menu-times",
      caption: "When Olive Garden serves lunch and dinner",
      compact: true,
      firstHeader: "Day",
      headers: ["Lunch menu", "Dinner menu"],
      rows: [
        { label: "Monday to Friday", cells: ["Opening to 3 PM", "3 PM to closing"] },
        { label: "Saturday and Sunday", cells: [{ text: "No lunch menu", note: true }, "All day"] },
        { label: "Holidays (when open)", cells: [{ text: "No lunch menu", note: true }, "All day"] },
      ],
      notes: ["From Olive Garden’s FAQ and restaurant pages. Olive Garden notes some regional variations."],
    },
    {
      id: "holiday-hours-table",
      caption: "Olive Garden holiday hours",
      firstHeader: "Holiday",
      headers: ["Date", "Olive Garden hours", "Confirmed by Olive Garden?"],
      rows: [
        { label: "New Year’s Day", cells: ["January 1", VARIES, NOT_ANNOUNCED] },
        { label: "Martin Luther King Jr. Day", cells: ["Third Monday in January", VARIES, NOT_ANNOUNCED] },
        { label: "Valentine’s Day", cells: ["February 14", VARIES, NOT_ANNOUNCED] },
        { label: "Presidents’ Day", cells: ["Third Monday in February", VARIES, NOT_ANNOUNCED] },
        { label: "Easter Sunday", cells: ["March or April", VARIES, NOT_ANNOUNCED] },
        { label: "Memorial Day", cells: ["Last Monday in May", VARIES, NOT_ANNOUNCED] },
        { label: "Independence Day", cells: ["July 4", VARIES, NOT_ANNOUNCED] },
        { label: "Labor Day", cells: ["First Monday in September", VARIES, NOT_ANNOUNCED] },
        { label: "Halloween", cells: ["October 31", VARIES, NOT_ANNOUNCED] },
        { label: "Veterans Day", cells: ["November 11", VARIES, NOT_ANNOUNCED] },
        { label: "Day before Thanksgiving", cells: ["Wednesday before Thanksgiving", "Open; may close early", "Yes"] },
        { label: "Thanksgiving Day", cells: ["Fourth Thursday in November", "Closed", "Yes"] },
        { label: "Christmas Eve", cells: ["December 24", "Open; may close early", "Yes"] },
        { label: "Christmas Day", cells: ["December 25", "Closed", "Yes"] },
        { label: "New Year’s Eve", cells: ["December 31", VARIES, NOT_ANNOUNCED] },
      ],
      notes: [
        "“Yes” = stated in Olive Garden’s official FAQ. Olive Garden publishes no special hours for the other days; the restaurant pages we checked showed no holiday schedule.",
      ],
    },
    {
      id: "to-go-hours",
      caption: "To Go and catering hours at the restaurant we checked",
      compact: true,
      firstHeader: "Service",
      headers: ["Hours"],
      rows: [
        { label: "Online To Go orders (pickup or delivery)", cells: ["From opening until 20 minutes before closing"] },
        { label: "Catering pickup", cells: ["Same as online ordering"] },
        { label: "Catering delivery", cells: ["Until 9 PM (10 PM on Friday and Saturday)"] },
      ],
      notes: ["One restaurant’s official listing, November 2026. Delivery is offered where available, and times can differ at your restaurant."],
    },
  ],
  sources: [
    { label: "Olive Garden FAQs (official): holiday closures, early closing, lunch until 3 PM, dinner menu on weekends and holidays", url: "https://www.olivegarden.com/faqs" },
    { label: "Olive Garden Find a Location (official restaurant locator)", url: LOCATOR },
    { label: "Olive Garden Orlando – Millenia Mall (official location page, full weekly, To Go, and catering hours)", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
    { label: "Olive Garden Los Angeles – Midtown (official location page)", url: "https://www.olivegarden.com/locations/ca/los-angeles/los-angeles-midtown/6415" },
    { label: "Olive Garden Cincinnati – Oakley (official location page)", url: "https://www.olivegarden.com/locations/oh/cincinnati/cincinnati-oakley/4496" },
    { label: "Olive Garden Las Vegas – Cheyenne Ave (official location page)", url: "https://www.olivegarden.com/locations/nv/las-vegas/las-vegas-cheyenne-ave/1363" },
    { label: "Olive Garden Careers, Benefits (official): closed on Thanksgiving and Christmas", url: "https://jobs.olivegarden.com/benefits" },
  ],
  sourceSummary:
    "Hours are based on official Olive Garden restaurant pages and Olive Garden’s FAQ. Each restaurant sets its own hours, which may vary by location across the USA.",
  searchKind: "Guide",
  navGroup: "hours",
  navLabel: "Olive Garden Hours",
  faqs: [
    {
      question: "What time does Olive Garden open?",
      answer:
        "Every official Olive Garden restaurant listing we reviewed opened at 11 AM. Each location sets its own hours, so a few may differ.",
    },
    {
      question: "What time does Olive Garden close?",
      answer:
        "In the official listings we reviewed, restaurants closed at 10 PM or 11 PM. On Friday and Saturday they closed at 11 PM, and the restaurant whose full week we checked closed at 10 PM Sunday to Thursday.",
    },
    {
      question: "Is Olive Garden open on Sundays?",
      answer:
        "Yes. Olive Garden is open on Sundays and serves its dinner menu all day. The restaurant we checked was open from 11 AM to 10 PM on Sunday.",
    },
    {
      question: "What time does Olive Garden stop serving lunch?",
      answer: "At 3 PM, Monday to Friday. There is no lunch menu on weekends or holidays, when the dinner menu is served all day.",
    },
    {
      question: "Is Olive Garden open on Thanksgiving?",
      answer:
        "No. Olive Garden restaurants close on Thanksgiving Day. On the day before Thanksgiving they may close early.",
    },
    {
      question: "Is Olive Garden open on Christmas Day?",
      answer:
        "No. Olive Garden restaurants close on Christmas Day. On Christmas Eve they are open but may close early.",
    },
    {
      question: "Is Olive Garden open on other holidays?",
      answer:
        "Olive Garden lists no other holiday closures, and it serves the dinner menu all day on holidays. It does not publish special opening and closing times for those days.",
    },
  ],
  related: [
    { guide: "dinner-menu", text: "When dinner starts and what dinner costs, from appetizers to dessert." },
    { categoryId: "lunch-menu", text: "Weekday lunch until 3 PM, with smaller plates at lower prices." },
    { categoryId: "catering", text: "Catering for groups, with order and delivery times to plan around." },
    { categoryId: "lighter-portions", text: "Smaller plates served after 3 PM on weekdays and all day on weekends." },
  ],
};
