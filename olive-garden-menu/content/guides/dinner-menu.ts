import type { GuidePageContent } from "@/lib/types";

/**
 * /dinner-menu: "Olive Garden Dinner Menu" guide (2026-11-15).
 * Research: research/seo/dinner-menu/ (keywords, SERP, outline, fact log).
 *
 * Olive Garden has no separate dinner-only menu: its regular menu is the
 * dinner menu (weekdays from 3 PM, all day on weekends and holidays). This
 * guide therefore reads the existing shared data (no new products, prices,
 * or ratings) and adds the dinner-time angle: hours, price ranges by section,
 * the dinner-only lighter portions, calculated example orders, and the
 * lunch-vs-dinner rules. Full item lists stay on the category pages
 * (research/seo/KEYWORD_CANNIBALIZATION.md §7).
 *
 * Prose prices must match the shared data (checked in testing). Prices:
 * online pickup at the reference restaurant, never named publicly.
 */

const REVIEWED = "2026-11-15";

export const dinnerMenuGuide: GuidePageContent = {
  slug: "dinner-menu",
  name: "Dinner Menu",
  status: "published",
  primaryKeyword: "olive garden dinner menu",
  secondaryKeywords: [
    "olive garden dinner menu with prices",
    "olive garden dinner prices",
    "olive garden dinner hours",
    "olive garden dinner menu time",
    "when does olive garden start serving dinner",
    "olive garden lunch vs dinner",
    "olive garden dinner specials",
    "olive garden dinner for two",
    "olive garden dinner menu to go",
  ],
  searchIntent:
    "Find out what Olive Garden serves at dinner, when dinner starts, what dinner costs, and how it differs from weekday lunch.",
  menuTitle: "Olive Garden Dinner Menu",
  metaTitle: "Olive Garden Dinner Menu with Prices 2026",
  metaDescription:
    "See Olive Garden dinner prices by menu section, when dinner starts, lighter portions, dinner-for-two costs, and how dinner compares with weekday lunch.",
  h1: "Olive Garden Dinner Menu with Prices 2026",
  intro: [
    "Olive Garden does not have a separate dinner-only menu. Its dinner menu is the regular menu, served from 3 PM on weekdays and all day on Saturdays, Sundays, and holidays. In our November 2026 check, dinner entrées cost $13.99 to $27.29 for online pickup, and each one came with soup or salad and breadsticks.",
    "This guide covers what changes at dinner time: the hours, a price range for each part of the menu, the smaller lighter portions, what a dinner for two costs, and how dinner compares with weekday lunch.",
  ],
  contentReviewedAt: REVIEWED,
  checkedCategoryIds: ["appetizers", "soups-salad-and-breadsticks", "classic-entrees", "amazing-alfredos", "lighter-portions", "desserts", "drink-menu"],
  countLabel: "menu sections",
  tableHeading: "Olive Garden Dinner Prices at a Glance",
  tableIntro: [
    "Here is what each part of the dinner menu cost when we checked, with the number of items and their calorie range. Price ranges include every size and version Olive Garden lists, such as 12 breadsticks instead of 6 or shrimp instead of chicken; calorie ranges are for each item’s standard serving.",
  ],
  overview: {
    id: "dinner-overview",
    caption: "Olive Garden dinner menu: prices and calories by section",
    rows: [
      { categoryId: "appetizers", when: "No time limit listed" },
      {
        categoryId: "soups-salad-and-breadsticks",
        label: "Soup, Salad & Breadsticks (meal)",
        offeringIds: ["soups-salad-and-breadsticks--soup-salad-and-breadsticks"],
        when: "No time limit listed (the $9.99 lunch price ends at 3 PM on weekdays)",
      },
      {
        categoryId: "classic-entrees",
        label: "Classic Entrées",
        offeringIds: [
          "classic-entrees--chicken-alfredo",
          "classic-entrees--chicken-parmigiana",
          "classic-entrees--fettuccine-alfredo",
          "classic-entrees--shrimp-alfredo",
          "classic-entrees--five-cheese-ziti-al-forno",
          "classic-entrees--spaghetti-with-meat-sauce",
          "classic-entrees--chicken-tortelloni-alfredo",
          "classic-entrees--lasagna-classico",
          "classic-entrees--chicken-scampi",
          "classic-entrees--chicken-and-shrimp-carbonara",
          "classic-entrees--shrimp-scampi",
          "classic-entrees--calabrian-steak-and-shrimp-bucatini",
          "classic-entrees--shrimp-carbonara",
          "classic-entrees--tour-of-italy",
          "classic-entrees--ravioli-carbonara",
          "classic-entrees--spaghetti-and-meatballs",
          "classic-entrees--spaghetti-with-marinara",
          "classic-entrees--stuffed-chicken-marsala",
          "classic-entrees--steak-gorgonzola-alfredo",
          "classic-entrees--seafood-alfredo",
          "classic-entrees--cheese-ravioli",
          "classic-entrees--eggplant-parmigiana",
          "classic-entrees--grilled-chicken-margherita",
          "classic-entrees--herb-grilled-salmon",
          "classic-entrees--6-oz-sirloin",
          "classic-entrees--create-your-own-pasta",
          "classic-entrees--spicy-alfredo-fettuccine",
        ],
        when: "No time limit listed",
      },
      { categoryId: "amazing-alfredos", label: "Alfredo dishes (also entrées)", when: "No time limit listed" },
      { categoryId: "lighter-portions", when: "Mon–Fri after 3 PM, all day Sat–Sun" },
      { categoryId: "desserts", when: "No time limit listed" },
      { categoryId: "drink-menu", label: "Drinks to go", when: "No time limit listed" },
    ],
    notes: [
      "Online pickup prices, checked in November 2026. Prices may vary by location across the USA, and dine-in prices were not checked. Classic Entrées exclude the Family-Style Lasagna Bundle, a take-home meal for 4 to 6.",
      "“No time limit listed” means Olive Garden’s online menu shows no lunch-only or dinner-only label for that section.",
    ],
  },
  featuredOfferingIds: [
    "classic-entrees--chicken-alfredo",
    "classic-entrees--tour-of-italy",
    "classic-entrees--lasagna-classico",
    "classic-entrees--chicken-parmigiana",
    "classic-entrees--fettuccine-alfredo",
  ],
  featuredHeading: "Dinner Picks with Photos",
  featuredIntro:
    "These five dinner entrées are our picks as a starting point, the same dishes we highlight on the homepage. They are not a sales ranking. Star ratings come from visitors to this site.",
  sections: [
    {
      id: "dinner-hours",
      heading: "Olive Garden Dinner Hours",
      blocks: [
        {
          type: "paragraph",
          text: "Dinner starts when lunch ends. On weekdays, Olive Garden serves lunch until 3 PM and the dinner menu from 3 PM until closing. On Saturdays, Sundays, and holidays there is no lunch menu: the dinner menu is served all day, from opening to closing.",
        },
        {
          type: "list",
          items: [
            "Monday to Friday: dinner from 3 PM to closing.",
            "Saturday and Sunday: dinner menu all day.",
            [
              "Holidays: dinner menu all day. Restaurants close on Thanksgiving Day and Christmas Day, and may close early the day before each (see our ",
              { text: "Thanksgiving hours", href: "/thanksgiving-hours" },
              " and ",
              { text: "Christmas hours", href: "/christmas-hours" },
              " guides).",
            ],
            "Closing time: set by each restaurant. The one we checked closed at 10 PM Sunday to Thursday and 11 PM on Friday and Saturday.",
            "Online ordering for pickup or delivery: at the restaurant we checked, it closed 20 minutes before the restaurant did.",
          ],
        },
        {
          type: "note",
          text: [
            "Olive Garden’s FAQ says some regional variations apply. Opening times and holiday hours are on our ",
            { text: "Olive Garden hours", href: "/hours" },
            " guide.",
          ],
        },
      ],
    },
    {
      id: "dinner-appetizers",
      heading: "Dinner Appetizers",
      blocks: [
        {
          type: "paragraph",
          text: "Olive Garden lists 10 appetizers, from an order of breadsticks at $4.99 to Shrimp Fritto Misto at $14.29. Most cost $9.79 to $13.29, including Fried Mozzarella ($9.79), Toasted Ravioli ($10.29), and Calamari ($13.29).",
        },
        {
          type: "paragraph",
          text: "Remember that every entrée already comes with breadsticks, so an appetizer is an extra for sharing rather than a must. Appetizers are rich: most have 500 to 1,280 calories per order.",
        },
        {
          type: "paragraph",
          text: [
            "Every appetizer with its price, calories, and serving size is on our ",
            { text: "Olive Garden appetizers menu", href: "/appetizers" },
            ".",
          ],
        },
      ],
    },
    {
      id: "dinner-entrees",
      heading: "Classic Dinner Entrées",
      blocks: [
        {
          type: "paragraph",
          text: "The classic entrées are the heart of the dinner menu: 27 pasta, chicken, seafood, and steak plates from $13.99 to $27.29. Each comes with your choice of soup or the Famous House Salad and two breadsticks. The table below shows the price ladder from the lowest-priced plates to the most expensive.",
        },
        { type: "comparison", id: "dinner-entree-ladder" },
        {
          type: "list",
          items: [
            "Lowest price: Spaghetti with Marinara, Spaghetti with Meat Sauce, and the base Create Your Own Pasta, all $13.99.",
            "Highest price: the Calabrian Steak Bucatini at $27.29, followed by Shrimp Tortelloni Alfredo at $25.79 and the other two Calabrian Bucatini versions at $25.29.",
            "Lowest calories: Shrimp Scampi and Spaghetti with Marinara, 490 calories each before soup or salad and breadsticks.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "All 27 entrées, what each plate includes, and the vegetarian choices are on our ",
            { text: "Olive Garden classic entrées", href: "/classic-entrees" },
            " page. To build your own plate, see ",
            { text: "Create Your Own Pasta", href: "/create-your-own-pasta" },
            ".",
          ],
        },
      ],
    },
    {
      id: "alfredo-dinner",
      heading: "Alfredo Dishes at Dinner",
      blocks: [
        {
          type: "paragraph",
          text: "Five Alfredo dishes are on the dinner menu: Fettuccine Alfredo ($17.49), Chicken Alfredo ($21.79), Shrimp Alfredo ($22.49), Seafood Alfredo ($23.49), and Chicken Tortelloni Alfredo ($23.99, or $25.79 with shrimp). Spicy Alfredo Fettuccine, a limited-time version with Calabrian peppers, costs the same as Fettuccine Alfredo.",
        },
        {
          type: "paragraph",
          text: [
            "Alfredo is one of the heaviest choices at dinner: 1,220 to 1,980 calories per plate for these five. For a smaller plate at dinner time, the lighter Fettuccine Alfredo has 920 calories and costs $13.49. Every Alfredo dish and size is compared on our ",
            { text: "Olive Garden Alfredo menu", href: "/amazing-alfredos" },
            ".",
          ],
        },
      ],
    },
    {
      id: "soup-salad-dinner",
      heading: "Soup, Salad and Breadsticks at Dinner",
      blocks: [
        {
          type: "paragraph",
          text: "Every dinner entrée and every lighter portion includes a first course: a bowl of homemade soup or the Famous House Salad, plus breadsticks. You can also order soup, salad, and breadsticks as a meal on its own. At dinner it costs the regular price, because the $9.99 offer is a weekday lunch deal.",
        },
        { type: "comparison", id: "dinner-soup-salad" },
        {
          type: "paragraph",
          text: [
            "Soup choices, refill rules, and the calories of each soup are on our ",
            { text: "soup, salad and breadsticks", href: "/soups-salad-and-breadsticks" },
            " page.",
          ],
        },
      ],
    },
    {
      id: "lighter-portions-dinner",
      heading: "Smaller Plates at Dinner: Lighter Portions",
      blocks: [
        {
          type: "paragraph",
          text: "Lunch-size plates end at 3 PM, so the smaller plate at dinner is a lighter portion. Olive Garden serves its eight lighter portions on weekdays after 3 PM and all day on Saturday and Sunday, for $13.49 to $14.49 with soup or salad included.",
        },
        {
          type: "list",
          items: [
            "Lighter Chicken Parmigiana: $14.49 and 630 calories, compared with $21.29 and 1,020 calories for the regular dinner plate.",
            "Lighter Lasagna Classico: $14.49 and 500 calories, compared with $19.99 and 940 calories.",
            "Lighter Fettuccine Alfredo: $13.49 and 920 calories, compared with $17.49 and 1,220 calories.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "The full regular vs lighter vs lunch comparison for all eight dishes is on our ",
            { text: "Olive Garden lighter portions menu", href: "/lighter-portions" },
            ".",
          ],
        },
      ],
    },
    {
      id: "dinner-desserts-drinks",
      heading: "Dinner Desserts and Drinks",
      blocks: [
        {
          type: "paragraph",
          text: "Seven desserts were on the menu, priced from $8.99 for Warm Italian Doughnuts to $10.29 for Black Tie Mousse Cake. Tiramisu (470 calories) is the lightest; Chocolate Lasagna (980 calories) is the richest. The Pumpkin Cookie Butter Cheesecake is a limited-time dessert.",
        },
        {
          type: "list",
          items: [
            "Birthday: Olive Garden offers a free dessert on your birthday when you dine in.",
            "Drinks to go: a single drink or 2-liter soda costs $3.69 to $5.49, and a gallon of iced tea or lemonade $8.49 to $10.49.",
            "Wine, beer, and cocktails: Italian-inspired cocktails are served in the restaurant, and their prices are not published online. Select restaurants also sell wine by the bottle and beer to go where the law allows, to guests 21 and older.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "See the ",
            { text: "Olive Garden dessert menu", href: "/desserts" },
            ", the ",
            { text: "Olive Garden drink menu", href: "/drink-menu" },
            ", and ",
            { text: "wine and beer to go", href: "/wine-and-beer-to-go" },
            " for every item.",
          ],
        },
      ],
    },
    {
      id: "lunch-vs-dinner",
      heading: "Lunch vs Dinner: What Changes at 3 PM",
      blocks: [
        {
          type: "paragraph",
          text: "Most dishes are the same at lunch and dinner. What changes is the portion, the price, and a few items that are only offered at one time of day.",
        },
        {
          type: "list",
          items: [
            "When: lunch is Monday to Friday, 11 AM to 3 PM. Dinner is weekdays from 3 PM and all day on weekends and holidays.",
            "Price: lunch-size plates cost $2.50 to $9.30 less than the dinner plate of the same dish in our check.",
            "Portion: lunch plates are smaller. For example, dinner Spaghetti & Meatballs has three meatballs and the lunch plate two.",
            "Only at lunch: the lunch sandwiches and flatbreads (where available) and the $9.99 soup, salad and breadsticks offer.",
            "Only at dinner time: lighter portions, the smaller plate after 3 PM and on weekends.",
            "The same at both: entrée plates come with soup or salad and breadsticks.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "The dish-by-dish lunch vs dinner price table is on our ",
            { text: "Olive Garden lunch menu", href: "/lunch-menu" },
            ".",
          ],
        },
      ],
    },
    {
      id: "save-money-dinner",
      heading: "How to Save Money at Dinner",
      blocks: [
        {
          type: "paragraph",
          text: "Dinner costs more than weekday lunch, but you can still keep the bill down. These example orders are calculated from the online pickup prices we checked; drinks, tax, delivery fees, and tip are not included.",
        },
        { type: "mealExamples", id: "dinner-examples" },
        {
          type: "list",
          items: [
            "Choose a lighter portion ($13.49 to $14.49) instead of the regular plate. It still includes soup or salad.",
            "The lowest-priced full dinner plates are $13.99: Spaghetti with Marinara, Spaghetti with Meat Sauce, and the base Create Your Own Pasta.",
            "Add a $6 Take Home entrée to any entrée for a second meal later: Fettuccine Alfredo, Five Cheese Ziti al Forno, or Spaghetti with Meat Sauce, chilled, without soup, salad, or breadsticks.",
            "The Never-Ending Pasta Bowl, a limited-time special from $14.99 with refills for dine-in guests, was running when we checked.",
            "Olive Garden has no rewards program. Its email club sends offers for your local restaurant.",
          ],
        },
        {
          type: "paragraph",
          text: [
            "How the take-home offer works is explained on our ",
            { text: "Olive Garden Buy One Take One", href: "/buy-one-take-one" },
            " page.",
          ],
        },
      ],
    },
  ],
  comparisons: [
    {
      id: "dinner-entree-ladder",
      caption: "Olive Garden dinner entrées from the lowest to the highest price",
      columns: [{ kind: "serving", label: "What you get" }, { kind: "price" }, { kind: "calories" }],
      rows: [
        { offeringId: "classic-entrees--spaghetti-with-marinara" },
        { offeringId: "classic-entrees--spaghetti-with-meat-sauce" },
        { offeringId: "classic-entrees--create-your-own-pasta", label: "Create Your Own Pasta (base price)" },
        { offeringId: "classic-entrees--fettuccine-alfredo" },
        { offeringId: "classic-entrees--lasagna-classico" },
        { offeringId: "classic-entrees--chicken-parmigiana" },
        { offeringId: "classic-entrees--chicken-alfredo" },
        { offeringId: "classic-entrees--tour-of-italy" },
        { offeringId: "classic-entrees--shrimp-carbonara" },
        { offeringId: "classic-entrees--chicken-tortelloni-alfredo", label: "Shrimp Tortelloni Alfredo", option: "Shrimp Tortelloni Alfredo" },
        {
          offeringId: "classic-entrees--calabrian-steak-and-shrimp-bucatini",
          label: "Calabrian Steak Bucatini",
          option: "Calabrian Steak Bucatini",
        },
      ],
      notes: [
        "Entrée calories do not include the soup or salad and breadsticks that come with the plate. Create Your Own Pasta calories depend on the pasta and sauce you choose.",
      ],
    },
    {
      id: "dinner-soup-salad",
      caption: "Soup, salad and breadsticks: dinner price vs weekday lunch offer",
      columns: [{ kind: "text", label: "When", key: "when" }, { kind: "price" }, { kind: "calories" }],
      rows: [
        {
          offeringId: "soups-salad-and-breadsticks--soup-salad-and-breadsticks",
          label: "Soup, salad and breadsticks (regular price)",
          text: { when: "Dinner, weekends, and any time the lunch offer is not available" },
        },
        {
          offeringId: "soups-salad-and-breadsticks--weekday-lunch-special",
          label: "Weekday lunch offer",
          text: { when: "Monday to Friday until 3 PM, limited time" },
        },
      ],
      notes: ["Calories cover the house salad with dressing, one bowl of soup, and one breadstick, as Olive Garden lists them."],
    },
  ],
  mealExamples: [
    {
      id: "dinner-examples",
      caption: "What an Olive Garden dinner costs: example orders",
      examples: [
        { label: "Lowest-priced dinner plate", people: 1, items: [{ offeringId: "classic-entrees--spaghetti-with-marinara" }] },
        { label: "Budget dinner for two", people: 2, items: [{ offeringId: "classic-entrees--spaghetti-with-meat-sauce", quantity: 2 }] },
        {
          label: "Lighter dinner for two",
          people: 2,
          items: [{ offeringId: "lighter-portions--lasagna-classico" }, { offeringId: "lighter-portions--fettuccine-alfredo" }],
        },
        {
          label: "Classic dinner for two with an appetizer",
          people: 2,
          items: [
            { offeringId: "classic-entrees--chicken-alfredo" },
            { offeringId: "classic-entrees--lasagna-classico" },
            { offeringId: "appetizers--fried-mozzarella" },
          ],
        },
        {
          label: "Dinner for two with a shared dessert",
          people: 2,
          items: [
            { offeringId: "classic-entrees--chicken-parmigiana" },
            { offeringId: "classic-entrees--tour-of-italy" },
            { offeringId: "desserts--tiramisu" },
          ],
        },
        {
          label: "Dinner plus a $6 Take Home meal",
          people: 1,
          items: [{ offeringId: "classic-entrees--fettuccine-alfredo" }, { offeringId: "buy-one-take-one--fettuccine-alfredo", label: "$6 Take Home Fettuccine Alfredo" }],
        },
      ],
      notes: [
        "Each entrée and lighter portion includes soup or salad and breadsticks; the $6 Take Home entrée does not. Lighter portions are served on weekdays after 3 PM and all day on weekends.",
      ],
    },
  ],
  sources: [
    { label: "Olive Garden FAQs (official): lunch until 3 PM, dinner menu all day on weekends and holidays", url: "https://www.olivegarden.com/faqs" },
    { label: "Olive Garden Orlando – Millenia Mall (official location page: lunch, dinner, and online ordering hours)", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
    { label: "Olive Garden Classic Entrées (official online menu)", url: "https://www.olivegarden.com/menu/classic-entrees" },
    { label: "Olive Garden Lighter Portions (official online menu)", url: "https://www.olivegarden.com/menu/lighter-portions" },
    { label: "Olive Garden Never-Ending Soup, Salad & Breadsticks (official specials page)", url: "https://www.olivegarden.com/specials/never-ending-soup-salad-and-breadsticks" },
    { label: "Olive Garden $6 Take Home offer (official specials page)", url: "https://www.olivegarden.com/specials/take-home-offer" },
    { label: "Olive Garden Never-Ending Pasta Bowl (official specials page)", url: "https://www.olivegarden.com/specials/never-ending-pasta-bowl" },
    { label: "Olive Garden Nutrition Information (official PDF)", url: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf" },
  ],
  extraSource: { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
  faqs: [
    {
      question: "What time does Olive Garden start serving dinner?",
      answer:
        "On weekdays, dinner starts at 3 PM, when the lunch menu ends. On Saturdays, Sundays, and holidays, Olive Garden serves its dinner menu all day, from opening. Times can vary by restaurant.",
    },
    {
      question: "Is the Olive Garden dinner menu available all day?",
      answer:
        "On weekends and holidays, yes. On weekdays, the dinner menu takes over from the lunch menu at 3 PM and runs until closing. Olive Garden notes some regional variations.",
    },
    {
      question: "Is there a separate Olive Garden dinner menu?",
      answer:
        "No. The dinner menu is Olive Garden’s regular menu: appetizers, soups and salad, classic entrées, Alfredo dishes, desserts, and drinks. Lunch-size plates, sandwiches, and flatbreads are weekday lunch extras, and lighter portions are the smaller plate at dinner time.",
    },
    {
      question: "How much does dinner cost at Olive Garden?",
      answer:
        "In our November 2026 check of online pickup prices, dinner entrées cost $13.99 to $27.29, each with soup or salad and breadsticks. Two entrées and one appetizer came to $51.57 in our example, before drinks, tax, and tip. Prices may vary by location across the USA.",
    },
    {
      question: "Does Olive Garden have dinner specials?",
      answer:
        "We found no dinner-only special on Olive Garden’s official pages in November 2026. Offers you can use at dinner were the $6 Take Home entrées, added to any entrée, and the limited-time Never-Ending Pasta Bowl from $14.99. The $9.99 soup, salad and breadsticks offer is for weekday lunch only.",
    },
    {
      question: "Are soup, salad and breadsticks included with dinner?",
      answer:
        "Yes. Every dinner entrée and lighter portion comes with a choice of soup or the Famous House Salad, plus breadsticks. Kids meals and $6 Take Home entrées do not include them.",
    },
    {
      question: "What is the difference between Olive Garden lunch and dinner?",
      answer:
        "Lunch runs Monday to Friday until 3 PM with smaller plates that cost $2.50 to $9.30 less than the dinner version of the same dish, plus lunch-only sandwiches and flatbreads. Dinner has the full-size plates and the lighter portions, and is served all day on weekends.",
    },
    {
      question: "Can I order the Olive Garden dinner menu to go?",
      answer:
        "Yes. Olive Garden takes online orders for pickup, and delivery where offered. At the restaurant we checked, online orders were taken until 20 minutes before closing. Prices appear once you choose a restaurant.",
    },
  ],
  related: [
    { categoryId: "classic-entrees", text: "All 27 dinner entrées with prices, calories, and what each plate includes." },
    { categoryId: "lunch-menu", text: "Weekday lunch until 3 PM, with smaller plates at lower prices." },
    { categoryId: "lighter-portions", text: "Smaller dinner plates on weekday evenings and weekends." },
    { categoryId: "amazing-alfredos", text: "Every Alfredo dish compared by price and calories." },
  ],
};
