import type { GuidePageContent } from "@/lib/types";

/**
 * /christmas-hours: "Is Olive Garden Open on Christmas 2026?" (2026-11-25).
 * Fact log: research/seo/christmas-hours/FACT_VERIFICATION.md. Keywords and
 * intent: research/seo/christmas-hours/KEYWORD_RESEARCH.md.
 *
 * Rules (same as /hours):
 * - Only Olive Garden's official statements are facts: closed on Christmas Day;
 *   open on Christmas Eve but restaurants may close early, the time set by each
 *   restaurant. Olive Garden publishes no Christmas Eve closing time, so none
 *   is shown. Never copy third-party times ("closes at 6 PM").
 * - No "open now", no visitor location, no LocalBusiness/OpeningHours schema.
 * - SEASONAL UPDATE: the dates are for 2026. Before Christmas 2027, re-check
 *   the FAQ, then change the year, dates, weekdays, and the fact log.
 */

const REVIEWED = "2026-11-25";
const NOT_ANNOUNCED = { text: "Not announced", note: true } as const;
const CLOSED_DAY = { text: "None (restaurants closed)", note: true } as const;

export const christmasHoursGuide: GuidePageContent = {
  slug: "christmas-hours",
  name: "Christmas Hours",
  status: "published",
  primaryKeyword: "is olive garden open on christmas",
  secondaryKeywords: [
    "olive garden christmas hours",
    "olive garden christmas hours 2026",
    "is olive garden open on christmas day",
    "is olive garden open on christmas eve",
    "olive garden christmas eve hours",
    "what time does olive garden close on christmas eve",
    "is olive garden open christmas 2026",
    "olive garden open day after christmas",
    "olive garden christmas delivery",
    "christmas",
    "christmas eve",
  ],
  searchIntent: "Find out whether Olive Garden is open on Christmas Day and Christmas Eve 2026, and what that means for dine-in, To Go, delivery, and catering.",
  menuTitle: "Olive Garden Christmas Hours 2026",
  metaTitle: "Olive Garden Christmas Hours 2026: Open or Closed?",
  metaDescription:
    "Is Olive Garden open on Christmas 2026? Closed on Christmas Day, open on Christmas Eve with possible early closing. To Go, delivery, and catering explained.",
  h1: "Is Olive Garden Open on Christmas 2026?",
  intro: [
    "No. Olive Garden restaurants are closed on Christmas Day, Friday, December 25, 2026. On Christmas Eve, Thursday, December 24, they are open, but each restaurant may close early, and Olive Garden publishes no set closing time.",
    "This guide explains what Olive Garden has said about both days, how holiday closing times are set, and what that means for To Go, delivery, and catering orders.",
  ],
  contentReviewedAt: REVIEWED,
  verifiedAt: "2026-11-25",
  heroFacts: [{ label: "Hours", value: "holiday policy from Olive Garden’s official FAQ; closing times set by each restaurant, USA" }],
  jumpLabel: "Jump to the Christmas schedule",
  breadcrumbParent: { label: "Hours", href: "/hours" },
  holiday: {
    theme: "christmas",
    eyebrow: "Christmas 2026",
    statusHeading: "Quick Answer: Christmas 2026",
    days: [
      {
        label: "Christmas Eve",
        date: "2026-12-24",
        status: "open-early",
        title: "Open, may close early",
        text: "Restaurants open as usual, but each one may close early, depending on how busy the day is. Olive Garden publishes no closing time.",
        confirmed: true,
      },
      {
        label: "Christmas Day",
        date: "2026-12-25",
        status: "closed",
        title: "Closed",
        text: "Olive Garden restaurants close for the day so their teams can spend it with family and friends. No dine-in, To Go, or delivery.",
        confirmed: true,
      },
      {
        label: "Day after Christmas",
        date: "2026-12-26",
        status: "open",
        title: "Open",
        text: "Restaurants are open again on Saturday. No special hours are announced, and the dinner menu is served all day on weekends.",
        confirmed: false,
      },
    ],
    note: "Based on Olive Garden’s official FAQ, checked November 2026. Holiday hours in Hawaii, Puerto Rico, and Guam may differ, according to Olive Garden.",
  },
  tableAnchor: "christmas-schedule",
  tableHeading: "Olive Garden Christmas 2026 Schedule",
  tableIntro: [
    "What is open on each day, by service. “Not announced” means Olive Garden has published nothing for it, so it can differ by restaurant.",
  ],
  mainStaticTableId: "christmas-services",
  sections: [
    {
      id: "christmas-day",
      heading: "Is Olive Garden Open on Christmas Day 2026?",
      blocks: [
        {
          type: "paragraph",
          text: "No. Olive Garden restaurants are closed on Christmas Day, which falls on Friday, December 25, in 2026. Olive Garden’s FAQ says the restaurants close on Christmas Day so team members can spend time with their family and friends.",
        },
        {
          type: "paragraph",
          text: [
            "The only other holiday closure Olive Garden lists is Thanksgiving Day. See our ",
            { text: "Olive Garden Thanksgiving hours", href: "/thanksgiving-hours" },
            " guide for that week.",
          ],
        },
        {
          type: "paragraph",
          text: "Restaurants are open again on Saturday, December 26. Olive Garden has announced no special hours for that day. On Saturdays the dinner menu is served all day, and every official restaurant listing we checked opened at 11 AM.",
        },
        {
          type: "note",
          text: "Hawaii, Puerto Rico, and Guam: Olive Garden says holiday hours there may vary by location.",
        },
      ],
    },
    {
      id: "christmas-eve",
      heading: "Olive Garden Christmas Eve Hours 2026",
      blocks: [
        {
          type: "paragraph",
          text: "Olive Garden is open on Christmas Eve, Thursday, December 24, 2026. Its FAQ says that, depending on how busy the day is, restaurants may close early on Christmas Eve, and that each restaurant sets its own closing time for the day.",
        },
        {
          type: "paragraph",
          text: "Olive Garden has not published a Christmas Eve closing time, so we don’t list one. Christmas Eve closing times quoted elsewhere online are not from Olive Garden.",
        },
        {
          type: "paragraph",
          text: "For comparison, on a regular Thursday the official restaurant listings we checked opened at 11 AM and closed at 10 PM or 11 PM. On Christmas Eve a restaurant can close earlier than that.",
        },
      ],
    },
    {
      id: "local-holiday-hours",
      heading: "How Local Christmas Hours Work",
      blocks: [
        {
          type: "list",
          items: [
            "Each Olive Garden restaurant sets its own hours, including its closing time on Christmas Eve.",
            "There is no national Christmas Eve schedule. According to Olive Garden’s FAQ, the scheduled closing time comes from each restaurant.",
            "The official restaurant pages we checked showed regular weekly hours and no separate holiday schedule.",
            "We don’t show an “open now” status, because closing times differ by restaurant and time zone.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "Regular opening and closing times for every day of the week, and the other holidays of the year, are in our ",
            { text: "Olive Garden hours", href: "/hours" },
            " guide.",
          ],
        },
      ],
    },
    {
      id: "christmas-takeout-delivery",
      heading: "Christmas Takeout, Delivery and Catering",
      blocks: [
        {
          type: "paragraph",
          text: "On Christmas Day there is no Olive Garden pickup, delivery, or catering, because the restaurants are closed. On Christmas Eve you can still order To Go online for pickup, and for delivery where your restaurant offers it.",
        },
        {
          type: "list",
          items: [
            "Online To Go: at the restaurant we checked, online orders were taken until 20 minutes before closing. If a restaurant closes early on Christmas Eve, its last online order time moves earlier too.",
            "Catering delivery: Olive Garden’s usual rule is to order by 5 PM for next-day lunch delivery. For a Christmas Eve lunch delivery, that means ordering by 5 PM on Wednesday, December 23.",
            "Catering notice: pasta stations for delivery need 24 hours’ notice, and lasagna pans about 2 hours.",
            "Holiday cutoffs: Olive Garden has announced no special Christmas cutoffs for online, delivery, or catering orders.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "Pans, packages, and prices per person are on our ",
            { text: "Olive Garden catering menu", href: "/catering" },
            ".",
          ],
        },
      ],
    },
    {
      id: "christmas-tips",
      heading: "Tips for Christmas Eve at Olive Garden",
      blocks: [
        {
          type: "list",
          items: [
            "Go earlier in the evening. Restaurants may close early, so late evening is the least certain time on Christmas Eve.",
            "Order To Go earlier in the day, for the same reason.",
            [
              "Feeding the family at home? ",
              { text: "Olive Garden family style meals", href: "/family-style-meals" },
              " come in pans and bundles sized for a household.",
            ],
            [
              "Want a holiday dessert? Whole and half cakes are on our ",
              { text: "Olive Garden dessert menu", href: "/desserts" },
              ".",
            ],
            [
              "Planning the budget? Dinner prices by menu section are on our ",
              { text: "Olive Garden dinner menu", href: "/dinner-menu" },
              " guide.",
            ],
          ],
        },
      ],
    },
  ],
  staticTables: [
    {
      id: "christmas-services",
      caption: "Olive Garden on Christmas Eve and Christmas Day 2026",
      firstHeader: "Service",
      headers: ["Christmas Eve (Thu, Dec 24)", "Christmas Day (Fri, Dec 25)"],
      rows: [
        { label: "Dine-in", cells: ["Open; may close early", "Closed"] },
        { label: "Closing time", cells: [{ text: "Set by each restaurant", note: true }, "Closed all day"] },
        { label: "Online To Go (pickup)", cells: [{ text: "Open; holiday cutoff not announced", note: true }, CLOSED_DAY] },
        { label: "Delivery (where offered)", cells: [{ text: "Varies by location", note: true }, CLOSED_DAY] },
        { label: "Catering", cells: [NOT_ANNOUNCED, CLOSED_DAY] },
      ],
      notes: [
        "“Open; may close early” and “Closed” are stated in Olive Garden’s official FAQ. Olive Garden publishes no Christmas Eve closing time and no holiday cutoffs for online, delivery, or catering orders.",
        "Holiday hours in Hawaii, Puerto Rico, and Guam may differ, according to Olive Garden.",
      ],
    },
  ],
  sources: [
    { label: "Olive Garden FAQs (official): closed on Christmas Day; may close early on Christmas Eve depending on business; closing time from each restaurant; Hawaii, Puerto Rico, Guam may vary", url: "https://www.olivegarden.com/faqs" },
    { label: "Olive Garden Careers, Benefits (official): closed on Thanksgiving and Christmas", url: "https://jobs.olivegarden.com/benefits" },
    { label: "Olive Garden catering (official): order by 5 PM for next-day delivery, notice times", url: "https://www.olivegarden.com/catering" },
    { label: "Olive Garden Find a Location (official restaurant locator)", url: "https://www.olivegarden.com/locations/location-search" },
    { label: "Reference restaurant (official location page): weekly hours, online ordering until 20 minutes before closing", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
  ],
  sourceSummary:
    "Holiday information is based on Olive Garden’s official FAQ and restaurant pages. Each restaurant sets its own hours, which may vary by location across the USA.",
  searchKind: "Guide",
  navGroup: "hours",
  navLabel: "Christmas Hours",
  faqs: [
    {
      question: "Is Olive Garden open on Christmas Day 2026?",
      answer:
        "No. Olive Garden restaurants are closed on Christmas Day, Friday, December 25, 2026. They are open again on Saturday, December 26.",
    },
    {
      question: "Is Olive Garden open on Christmas Eve 2026?",
      answer:
        "Yes. Olive Garden is open on Christmas Eve, Thursday, December 24, 2026, but restaurants may close early depending on how busy they are.",
    },
    {
      question: "What time does Olive Garden close on Christmas Eve?",
      answer:
        "Olive Garden does not publish a Christmas Eve closing time. Each restaurant sets its own, and it may be earlier than usual. On a regular Thursday, the restaurants we checked closed at 10 PM or 11 PM.",
    },
    {
      question: "Can I order Olive Garden To Go or delivery on Christmas Day?",
      answer:
        "No. The restaurants are closed on Christmas Day, so there is no pickup, delivery, or catering from Olive Garden that day. On Christmas Eve, online To Go orders are taken while your restaurant is open.",
    },
    {
      question: "Is Olive Garden open the day after Christmas?",
      answer:
        "Yes. Restaurants are open on Saturday, December 26, 2026. Olive Garden has announced no special hours for that day, and the dinner menu is served all day on Saturdays.",
    },
    {
      question: "Why is Olive Garden closed on Christmas?",
      answer:
        "Olive Garden says its restaurants close on Christmas Day, and on Thanksgiving Day, so team members can spend time with their family and friends.",
    },
  ],
  related: [
    { guide: "hours", text: "Opening and closing times for every day, and the full holiday calendar." },
    { guide: "thanksgiving-hours", text: "Closed on Thanksgiving Day, and what to know about the day before." },
    { categoryId: "family-style-meals", text: "Pans and bundles to feed the whole family at home." },
    { categoryId: "catering", text: "Trays and packages for holiday parties, with ordering times." },
  ],
};
