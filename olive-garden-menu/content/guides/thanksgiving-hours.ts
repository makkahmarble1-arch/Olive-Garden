import type { GuidePageContent } from "@/lib/types";

/**
 * /thanksgiving-hours: "Is Olive Garden Open on Thanksgiving 2026?" (2026-11-25).
 * Fact log: research/seo/thanksgiving-hours/FACT_VERIFICATION.md. Keywords and
 * intent: research/seo/thanksgiving-hours/KEYWORD_RESEARCH.md.
 *
 * Rules (same as /hours):
 * - Only Olive Garden's official statements are facts: closed on Thanksgiving
 *   Day; open the day before but restaurants may close early, the time set by
 *   each restaurant. No closing time is published, so none is shown.
 * - No Thanksgiving meal, turkey, or holiday catering claims (none verified).
 * - No "open now", no visitor location, no LocalBusiness/OpeningHours schema.
 * - SEASONAL UPDATE: the dates are for 2026 (fourth Thursday of November).
 *   Before Thanksgiving 2027, re-check the FAQ, then change the year, dates,
 *   weekdays, and the fact log.
 */

const REVIEWED = "2026-11-25";
const NOT_ANNOUNCED = { text: "Not announced", note: true } as const;
const CLOSED_DAY = { text: "None (restaurants closed)", note: true } as const;

export const thanksgivingHoursGuide: GuidePageContent = {
  slug: "thanksgiving-hours",
  name: "Thanksgiving Hours",
  status: "published",
  primaryKeyword: "is olive garden open on thanksgiving",
  secondaryKeywords: [
    "olive garden thanksgiving hours",
    "olive garden thanksgiving hours 2026",
    "is olive garden open on thanksgiving day",
    "is olive garden open thanksgiving 2026",
    "olive garden thanksgiving eve hours",
    "olive garden hours day before thanksgiving",
    "is olive garden open on black friday",
    "olive garden thanksgiving delivery",
    "olive garden thanksgiving to go",
    "thanksgiving",
    "black friday",
  ],
  searchIntent: "Find out whether Olive Garden is open on Thanksgiving Day 2026 and the day before, and what that means for dine-in, To Go, delivery, and catering.",
  menuTitle: "Olive Garden Thanksgiving Hours 2026",
  metaTitle: "Olive Garden Thanksgiving Hours 2026: Open or Closed?",
  metaDescription:
    "Is Olive Garden open on Thanksgiving 2026? Closed on Thanksgiving Day, open the day before with possible early closing. To Go, delivery, and Black Friday.",
  h1: "Is Olive Garden Open on Thanksgiving 2026?",
  intro: [
    "No. Olive Garden restaurants are closed on Thanksgiving Day, Thursday, November 26, 2026. On the day before, Wednesday, November 25, they are open, but each restaurant may close early, and Olive Garden publishes no set closing time.",
    "This guide explains what Olive Garden has said about Thanksgiving week, how local closing times are set, and what that means for To Go, delivery, and catering orders.",
  ],
  contentReviewedAt: REVIEWED,
  verifiedAt: "2026-11-25",
  heroFacts: [{ label: "Hours", value: "holiday policy from Olive Garden’s official FAQ; closing times set by each restaurant, USA" }],
  jumpLabel: "Jump to the Thanksgiving schedule",
  breadcrumbParent: { label: "Hours", href: "/hours" },
  holiday: {
    theme: "thanksgiving",
    eyebrow: "Thanksgiving 2026",
    statusHeading: "Quick Answer: Thanksgiving 2026",
    days: [
      {
        label: "Day before Thanksgiving",
        date: "2026-11-25",
        status: "open-early",
        title: "Open, may close early",
        text: "Restaurants open as usual, but each one may close early, depending on how busy the day is. Olive Garden publishes no closing time.",
        confirmed: true,
      },
      {
        label: "Thanksgiving Day",
        date: "2026-11-26",
        status: "closed",
        title: "Closed",
        text: "Olive Garden restaurants close for the day so their teams can spend it with family and friends. No dine-in, To Go, or delivery.",
        confirmed: true,
      },
      {
        label: "Black Friday",
        date: "2026-11-27",
        status: "open",
        title: "Open",
        text: "Restaurants are open again on Friday. Olive Garden has announced no special hours for the day after Thanksgiving.",
        confirmed: false,
      },
    ],
    note: "Based on Olive Garden’s official FAQ, checked November 2026. Holiday hours in Hawaii, Puerto Rico, and Guam may differ, according to Olive Garden.",
  },
  tableAnchor: "thanksgiving-schedule",
  tableHeading: "Olive Garden Thanksgiving 2026 Schedule",
  tableIntro: [
    "What is open on each day, by service. “Not announced” means Olive Garden has published nothing for it, so it can differ by restaurant.",
  ],
  mainStaticTableId: "thanksgiving-services",
  sections: [
    {
      id: "thanksgiving-day",
      heading: "Is Olive Garden Open on Thanksgiving Day 2026?",
      blocks: [
        {
          type: "paragraph",
          text: "No. Olive Garden restaurants are closed on Thanksgiving Day, which falls on Thursday, November 26, in 2026. Olive Garden’s FAQ says the restaurants close on Thanksgiving Day so team members can spend time with their family and friends.",
        },
        {
          type: "paragraph",
          text: "The closure applies to the whole day, so there is no dine-in, pickup, or delivery from Olive Garden on Thanksgiving. If you want Olive Garden food for a Thanksgiving gathering, it has to be picked up by Wednesday.",
        },
        {
          type: "paragraph",
          text: [
            "The only other holiday closure Olive Garden lists is Christmas Day. See our ",
            { text: "Olive Garden Christmas hours", href: "/christmas-hours" },
            " guide for Christmas Eve and Christmas Day.",
          ],
        },
        {
          type: "note",
          text: "Hawaii, Puerto Rico, and Guam: Olive Garden says holiday hours there may vary by location.",
        },
      ],
    },
    {
      id: "thanksgiving-eve",
      heading: "Olive Garden Hours the Day Before Thanksgiving",
      blocks: [
        {
          type: "paragraph",
          text: "Olive Garden is open on the day before Thanksgiving, Wednesday, November 25, 2026. Its FAQ says that, depending on how busy the day is, restaurants may close early, and that each restaurant sets its own closing time for the day.",
        },
        {
          type: "paragraph",
          text: "Olive Garden has not published a closing time for Thanksgiving Eve, so we don’t list one. Thanksgiving Eve closing times quoted elsewhere online are not from Olive Garden.",
        },
        {
          type: "paragraph",
          text: "For comparison, on a regular Wednesday the official restaurant listings we checked opened at 11 AM and closed at 10 PM or 11 PM. On Thanksgiving Eve a restaurant can close earlier than that.",
        },
      ],
    },
    {
      id: "black-friday",
      heading: "Is Olive Garden Open on Black Friday?",
      blocks: [
        {
          type: "paragraph",
          text: "Yes. Restaurants are open again on Friday, November 27, 2026. Olive Garden has announced no special hours for the day after Thanksgiving. On a regular Friday, the official restaurant listings we checked were open from 11 AM to 11 PM.",
        },
      ],
    },
    {
      id: "local-holiday-hours",
      heading: "How Local Thanksgiving Hours Work",
      blocks: [
        {
          type: "list",
          items: [
            "Each Olive Garden restaurant sets its own hours, including its closing time on the day before Thanksgiving.",
            "There is no national early-closing schedule. According to Olive Garden’s FAQ, the scheduled closing time comes from each restaurant.",
            "The closure on Thanksgiving Day itself is an Olive Garden policy, not a local decision.",
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
      id: "thanksgiving-takeout-delivery",
      heading: "Thanksgiving Takeout, Delivery and Catering",
      blocks: [
        {
          type: "paragraph",
          text: "On Thanksgiving Day there is no Olive Garden pickup, delivery, or catering, because the restaurants are closed. On the day before, you can still order To Go online for pickup, and for delivery where your restaurant offers it.",
        },
        {
          type: "list",
          items: [
            "Online To Go: at the restaurant we checked, online orders were taken until 20 minutes before closing. If a restaurant closes early on Thanksgiving Eve, its last online order time moves earlier too.",
            "Catering delivery: Olive Garden’s usual rule is to order by 5 PM for next-day lunch delivery. For a Wednesday lunch delivery, that means ordering by 5 PM on Tuesday, November 24.",
            "Catering notice: pasta stations for delivery need 24 hours’ notice, and lasagna pans about 2 hours.",
            "Holiday cutoffs: Olive Garden has announced no special Thanksgiving cutoffs for online, delivery, or catering orders.",
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
      id: "thanksgiving-tips",
      heading: "Tips for Thanksgiving Week at Olive Garden",
      blocks: [
        {
          type: "list",
          items: [
            "Eat out earlier on Wednesday. Restaurants may close early, so late evening is the least certain time the day before Thanksgiving.",
            "Order To Go earlier in the day, for the same reason.",
            [
              "Feeding a crowd on Wednesday or Friday? ",
              { text: "Olive Garden family style meals", href: "/family-style-meals" },
              " come in pans and bundles sized for a household.",
            ],
            [
              "Want dessert for the holiday table? Whole and half cakes are on our ",
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
      id: "thanksgiving-services",
      caption: "Olive Garden on the day before Thanksgiving and Thanksgiving Day 2026",
      firstHeader: "Service",
      headers: ["Day before (Wed, Nov 25)", "Thanksgiving (Thu, Nov 26)"],
      rows: [
        { label: "Dine-in", cells: ["Open; may close early", "Closed"] },
        { label: "Closing time", cells: [{ text: "Set by each restaurant", note: true }, "Closed all day"] },
        { label: "Online To Go (pickup)", cells: [{ text: "Open; holiday cutoff not announced", note: true }, CLOSED_DAY] },
        { label: "Delivery (where offered)", cells: [{ text: "Varies by location", note: true }, CLOSED_DAY] },
        { label: "Catering", cells: [NOT_ANNOUNCED, CLOSED_DAY] },
      ],
      notes: [
        "“Open; may close early” and “Closed” are stated in Olive Garden’s official FAQ. Olive Garden publishes no closing time for the day before Thanksgiving and no holiday cutoffs for online, delivery, or catering orders.",
        "Holiday hours in Hawaii, Puerto Rico, and Guam may differ, according to Olive Garden.",
      ],
    },
  ],
  sources: [
    { label: "Olive Garden FAQs (official): closed on Thanksgiving Day; may close early the day before depending on business; closing time from each restaurant; Hawaii, Puerto Rico, Guam may vary", url: "https://www.olivegarden.com/faqs" },
    { label: "Olive Garden Careers, Benefits (official): closed on Thanksgiving and Christmas", url: "https://jobs.olivegarden.com/benefits" },
    { label: "Olive Garden catering (official): order by 5 PM for next-day delivery, notice times", url: "https://www.olivegarden.com/catering" },
    { label: "Olive Garden Find a Location (official restaurant locator)", url: "https://www.olivegarden.com/locations/location-search" },
    { label: "Reference restaurant (official location page): weekly hours, online ordering until 20 minutes before closing", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
  ],
  sourceSummary:
    "Holiday information is based on Olive Garden’s official FAQ and restaurant pages. Each restaurant sets its own hours, which may vary by location across the USA.",
  searchKind: "Guide",
  navGroup: "hours",
  navLabel: "Thanksgiving Hours",
  faqs: [
    {
      question: "Is Olive Garden open on Thanksgiving Day 2026?",
      answer:
        "No. Olive Garden restaurants are closed on Thanksgiving Day, Thursday, November 26, 2026. They are open again on Friday, November 27.",
    },
    {
      question: "Is Olive Garden open the day before Thanksgiving?",
      answer:
        "Yes. Olive Garden is open on Wednesday, November 25, 2026, but restaurants may close early depending on how busy they are.",
    },
    {
      question: "What time does Olive Garden close on Thanksgiving Eve?",
      answer:
        "Olive Garden does not publish a closing time for the day before Thanksgiving. Each restaurant sets its own, and it may be earlier than usual. On a regular Wednesday, the restaurants we checked closed at 10 PM or 11 PM.",
    },
    {
      question: "Can I order Olive Garden To Go or delivery on Thanksgiving?",
      answer:
        "No. The restaurants are closed on Thanksgiving Day, so there is no pickup, delivery, or catering from Olive Garden that day. On the day before, online To Go orders are taken while your restaurant is open.",
    },
    {
      question: "Is Olive Garden open on Black Friday?",
      answer:
        "Yes. Restaurants are open on Friday, November 27, 2026. Olive Garden has announced no special hours for that day.",
    },
    {
      question: "Why is Olive Garden closed on Thanksgiving?",
      answer:
        "Olive Garden says its restaurants close on Thanksgiving Day, and on Christmas Day, so team members can spend time with their family and friends.",
    },
  ],
  related: [
    { guide: "hours", text: "Opening and closing times for every day, and the full holiday calendar." },
    { guide: "christmas-hours", text: "Closed on Christmas Day, and what to know about Christmas Eve." },
    { categoryId: "family-style-meals", text: "Pans and bundles to feed the whole family at home." },
    { categoryId: "catering", text: "Trays and packages for groups, with ordering times." },
  ],
};
