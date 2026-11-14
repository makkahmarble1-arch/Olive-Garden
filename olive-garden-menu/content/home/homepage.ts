import type { FaqItem, ImageRef, MenuCategoryId } from "@/lib/types";

/**
 * Written content for the homepage supporting sections (Lesson 7.2).
 * Facts come from research/homepage/ (checked 2026-11-12) and the shared
 * menu data. Wording is our own. Update the check dates when re-checked.
 *
 * Menu prices and calories are NOT repeated here: sections that show them
 * read the shared menu data (content/menu/) through lib/content.ts.
 */

export type LinkItem = { label: string; href: string };

/** Official Olive Garden pages (research/homepage/official-links.md, all opened 2026-11-12). */
export const officialLinks = {
  website: "https://www.olivegarden.com/",
  menu: "https://www.olivegarden.com/menu",
  orderOnline: "https://www.olivegarden.com/order-online",
  locator: "https://www.olivegarden.com/locations/location-search",
  referenceRestaurant: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614",
  specials: "https://www.olivegarden.com/specials",
  takeHomeOffer: "https://www.olivegarden.com/specials/take-home-offer",
  soupSaladDeal: "https://www.olivegarden.com/specials/never-ending-soup-salad-and-breadsticks",
  pastaBowl: "https://www.olivegarden.com/specials/never-ending-pasta-bowl",
  nutrition: "https://www.olivegarden.com/nutrition",
  nutritionPdf: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf",
  allergens: "https://www.olivegarden.com/nutrition/food-allergies",
  allergenPdf: "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf",
  glutenSensitive: "https://www.olivegarden.com/nutrition/gluten-sensitive-diet",
  vegetarianPdf: "https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf",
  catering: "https://www.olivegarden.com/catering",
  faqs: "https://www.olivegarden.com/faqs",
} as const;

/* ---------- Hero ---------- */

export const heroIntro =
  "Plan your order before you go: the full Olive Garden menu, all 17 sections from family-style meals to catering, with a price and calorie count for every item we could confirm. Jump to a category or search for a dish.";

/** Owner-supplied photo (image-staging/Catering/Create your own pasta.webp), 1200 x 800 WebP. */
export const heroImage: ImageRef = {
  src: "/images/home/olive-garden-menu-spread.webp",
  alt: "A table spread of pasta, a basket of breadsticks, a bowl of salad, iced tea, and small bowls of sauces and toppings",
  width: 1200,
  height: 800,
  credit: "Site owner",
  license: "Owner-provided",
};

/** How prices and calories are checked (shown in the Sources section). */
export const methodNotes = [
  "Prices are online pickup prices from Olive Garden's official ordering menu, checked for one U.S. restaurant. Dine-in prices were not checked and may differ. Prices may vary by location across the USA.",
  "Calories come from the same official menu and were cross-checked against Olive Garden's nutrition guide. Where the two differ, the nutrition guide is used for the same portion.",
  "“Calculated” marks a total we added up from official values; the parts are shown next to it. “Estimated” would mark a value from a third-party site; none are used on this page.",
  "Prices, items, and availability vary by location and can change at any time. Always confirm with your restaurant.",
  "Food photos are supplied by the site owner and are not official Olive Garden photos; the actual restaurant presentation may vary.",
];

/* ---------- Short notes shown at the top of a category section ---------- */

/** One or two sentences of context per category (only where it helps). */
export const categoryNotes: Partial<Record<MenuCategoryId, string>> = {
  "family-style-meals":
    "Bundles feed about 4 to 6 people (the large lasagna bundle up to 12) and come with a jumbo house salad and breadsticks. Calories are totals for the whole pan or bundle, not per person.",
  appetizers:
    "Dipping sauce calories are extra unless the item says otherwise. The Dipping Sauces with Breadsticks totals are our calculation from official values.",
  "classic-entrees":
    "Entrées come with soup or salad and 2 breadsticks. Those calories are extra: the house salad with dressing is 150, soups are 110 to 230 per serving, and each breadstick is 140.",
  "buy-one-take-one":
    "Olive Garden currently runs this deal as “$6 Take Home Entrées”: buy any entrée and add a chilled take-home entrée for $6. Only three dishes are part of the offer. The other entries are kept for reference and are not part of it.",
  "amazing-alfredos":
    "These are full dinner portions. Lunch and lighter portions of the alfredo dishes are listed in their own sections.",
  "soups-salad-and-breadsticks":
    "The $9.99 weekday lunch price is a limited-time deal, Monday to Friday until 3 PM; the same meal is $13.49 at other times. Refills are for dine-in only.",
  "lighter-portions":
    "Lighter portions are served Monday to Friday after 3 PM and all day Saturday and Sunday, with soup or salad and 2 breadsticks.",
  "create-your-own-pasta":
    "Pick a pasta and a sauce for one price, then add toppings if you like. Soup or salad and 2 breadsticks are included.",
  "lunch-menu":
    "Lunch is served Monday to Friday, 11 AM to 3 PM. Lunch plates include soup or salad and 2 breadsticks; sandwiches come with french fries.",
  "drink-menu":
    "These are the drinks sold for to-go and online orders. Gallon prices depend on the flavor.",
  "non-alcoholic-beverages":
    "Gallon drinks are priced by flavor. Calories are per drink or per container as listed.",
  "wine-and-beer-to-go":
    "You must be 21 or older to buy alcohol. Bottle and can sizes are not listed on the online menu, so calories are per bottle or per beer as shown there.",
  "gluten-sensitive":
    "These dishes are made without gluten-containing ingredients, but they are not certified gluten-free and there is no separate fryer. Three of the entries are kids meals.",
  "kids-meal":
    "Calories are for the main dish; the side and drink are counted separately.",
  catering:
    "Catering is available for pickup or delivery. Delivery needs an order of $100 or more and has a delivery fee. Values are for the whole pan, tray, or container.",
};

/* ---------- Popular Menu Items (owner-chosen, fixed) ---------- */

/** Regular portions of the six owner-chosen dishes (MENU_PAGE_OUTLINES.md). */
export const popularOfferingIds = [
  "classic-entrees--chicken-alfredo",
  "classic-entrees--tour-of-italy",
  "classic-entrees--lasagna-classico",
  "classic-entrees--chicken-parmigiana",
  "classic-entrees--fettuccine-alfredo",
  "appetizers--breadsticks",
] as const;

export const popularIntro =
  "Six well-known Olive Garden dishes, picked by this guide as a quick starting point. This is our selection, not a sales ranking. Prices are for the regular dinner portion.";

/* ---------- Lunch Specials & Deals (research/homepage/deals.md) ---------- */

export const dealsCheckedAt = "2026-11-12";

export type DealRow = {
  name: string;
  price: string;
  when: string;
  details: string;
  sourceUrl: string;
};

export const deals: DealRow[] = [
  {
    name: "Never-Ending Soup, Salad & Breadsticks (lunch)",
    price: "$9.99",
    when: "Mon–Fri until 3 PM, limited time",
    details: "Choice of four soups with house salad and breadsticks. Refills for dine-in only. $13.49 at other times.",
    sourceUrl: officialLinks.soupSaladDeal,
  },
  {
    name: "$6 Take Home Entrées",
    price: "$6.00 add-on",
    when: "Current offer, no end date posted",
    details:
      "Buy any entrée, then add a chilled Fettuccine Alfredo, Five Cheese Ziti al Forno, or Spaghetti with Meat Sauce to heat later. No soup, salad, or breadsticks; one per entrée to go, up to five per entrée when dining in; no substitutions.",
    sourceUrl: officialLinks.takeHomeOffer,
  },
  {
    name: "Lunch-size entrées",
    price: "$11.49–$12.49",
    when: "Mon–Fri, 11 AM–3 PM",
    details: "Smaller plates of favorites like Lasagna Classico, with soup or salad and breadsticks.",
    sourceUrl: "https://www.olivegarden.com/menu/lunch-sized-favorites",
  },
  {
    name: "Lunch sandwiches & flatbreads",
    price: "$9.99–$11.99",
    when: "Mon–Fri, 11 AM–3 PM, where available",
    details: "New lunch-only sandwiches (served with fries) and flatbreads.",
    sourceUrl: "https://www.olivegarden.com/menu/lunch-sandwiches-flatbreads",
  },
  {
    name: "Never-Ending Pasta Bowl",
    price: "From $14.99",
    when: "Limited time",
    details: "Pasta and sauce with refills for dine-in only. Protein toppings cost extra; you pay once and can switch on refills.",
    sourceUrl: officialLinks.pastaBowl,
  },
  {
    name: "Lighter Portions",
    price: "$13.49–$14.49",
    when: "Mon–Fri after 3 PM, all day Sat–Sun",
    details: "Smaller dinner portions with soup or salad included.",
    sourceUrl: "https://www.olivegarden.com/menu/lighter-portions",
  },
  {
    name: "Family-style bundles",
    price: "$66.49–$99.99",
    when: "Pickup or delivery",
    details: "Serve 4–6 people (the large lasagna bundle up to 12), with salad and breadsticks.",
    sourceUrl: "https://www.olivegarden.com/menu/family-style-meals/family-bundles",
  },
];

export const savingsTips = [
  "Lunch is the cheapest time to eat: at the prices we verified, lunch-size plates cost $2.50 to $9.30 less than the dinner portion of the same dish.",
  "Olive Garden offers a free dessert on your birthday when you dine in, and email club members get offers for their local restaurant.",
  "There is no rewards program and no group discount, and we found no coupon codes on official pages.",
];

/* ---------- Hours (research/homepage/hours.md) ---------- */

export const hoursCheckedAt = "2026-11-12";
export const referencePhone = "(407) 345-8331";

export type HoursRow = {
  day: string;
  open: string;
  lunch: string;
  online: string;
};

export const weeklyHours: HoursRow[] = [
  { day: "Monday", open: "11 AM – 10 PM", lunch: "11 AM – 3 PM", online: "11 AM – 9:40 PM" },
  { day: "Tuesday", open: "11 AM – 10 PM", lunch: "11 AM – 3 PM", online: "11 AM – 9:40 PM" },
  { day: "Wednesday", open: "11 AM – 10 PM", lunch: "11 AM – 3 PM", online: "11 AM – 9:40 PM" },
  { day: "Thursday", open: "11 AM – 10 PM", lunch: "11 AM – 3 PM", online: "11 AM – 9:40 PM" },
  { day: "Friday", open: "11 AM – 11 PM", lunch: "11 AM – 3 PM", online: "11 AM – 10:40 PM" },
  { day: "Saturday", open: "11 AM – 11 PM", lunch: "Dinner menu all day", online: "11 AM – 10:40 PM" },
  { day: "Sunday", open: "11 AM – 10 PM", lunch: "Dinner menu all day", online: "11 AM – 9:40 PM" },
];

export const hoursNotes = [
  "Online ordering closes 20 minutes before the restaurant does. Catering pickup follows the online ordering hours; catering delivery runs until 9 PM (10 PM on Friday and Saturday).",
  "Hours are set by each restaurant, so yours may open or close at a different time. Check your restaurant's page on the official site before you go.",
];

/* ---------- Holiday hours (research/homepage/holiday-hours.md) ---------- */

export type HolidayRow = {
  holiday: string;
  date: string;
  status: string;
  /** true = confirmed by Olive Garden's official FAQ. */
  confirmed: boolean;
};

export const holidayRows: HolidayRow[] = [
  { holiday: "Day before Thanksgiving", date: "Wed, Nov 25, 2026", status: "Open; may close early", confirmed: true },
  { holiday: "Thanksgiving Day", date: "Thu, Nov 26, 2026", status: "Closed", confirmed: true },
  { holiday: "Christmas Eve", date: "Thu, Dec 24, 2026", status: "Open; may close early", confirmed: true },
  { holiday: "Christmas Day", date: "Fri, Dec 25, 2026", status: "Closed", confirmed: true },
  { holiday: "New Year's Eve", date: "Thu, Dec 31, 2026", status: "Not announced", confirmed: false },
  { holiday: "New Year's Day", date: "Fri, Jan 1, 2027", status: "Not announced; dinner menu all day", confirmed: false },
];

export const holidayIntro =
  "Olive Garden restaurants close on Thanksgiving Day and Christmas Day. On the day before Thanksgiving and on Christmas Eve, the manager may close early, so call ahead for that day's closing time. On other holidays the dinner menu is served all day.";

export const holidayNote =
  "No holiday opening or closing times were posted for the restaurant we checked. “Not announced” means exactly that: please confirm with your restaurant.";

/* ---------- Nutrition (research/homepage/nutrition-guide.md) ---------- */

export const nutritionParagraphs = [
  "Calories on this page come from Olive Garden's online menu and were cross-checked against its official nutrition guide. Entrée calories do not include the soup or salad and breadsticks that come with them, so add those if you eat them.",
  "Olive Garden's gluten-sensitive dishes are made without gluten-containing ingredients, but the company does not call them gluten-free. Kitchens are shared and there is no separate fryer. The gluten-free rotini pasta itself meets the FDA gluten-free definition.",
  "Items marked vegetarian contain no meat, meat stock, gelatin, or animal rennet. Many pastas, the Minestrone soup, and all desserts carry that label. For allergies, use the official allergen guide and tell your server, who will flag your order for the kitchen.",
];

/** Offering ids for the lower-calorie table (values come from the shared data). */
export const lowerCalorieOfferingIds = [
  "gluten-sensitive--famous-house-salad-without-croutons",
  "lunch-menu--spaghetti",
  "lunch-menu--shrimp-scampi",
  "gluten-sensitive--6-oz-sirloin",
  "classic-entrees--shrimp-scampi",
  "classic-entrees--spaghetti-with-marinara",
  "lighter-portions--lasagna-classico",
  "lunch-menu--five-cheese-flatbread",
  "classic-entrees--herb-grilled-salmon",
  "classic-entrees--grilled-chicken-margherita",
] as const;

export const nutritionResources: LinkItem[] = [
  { label: "Nutrition guide (PDF)", href: officialLinks.nutritionPdf },
  { label: "Allergen guide (PDF)", href: officialLinks.allergenPdf },
  { label: "Food allergies", href: officialLinks.allergens },
  { label: "Gluten-sensitive dining", href: officialLinks.glutenSensitive },
  { label: "Vegetarian and vegan menu (PDF)", href: officialLinks.vegetarianPdf },
];

/* ---------- How to order online (research/homepage/supporting-content.md §2) ---------- */

export const orderSteps = [
  "Open Olive Garden's official ordering page.",
  "Choose To Go for regular and family-style meals, or Catering for a group.",
  "Pick your restaurant by city, state, or ZIP code. Prices appear once a restaurant is selected.",
  "Add your items and choose the options, such as the sauce, size, toppings, and soup or salad.",
  "Choose pickup or delivery where offered, then check out. To change or cancel a To Go order, call the restaurant.",
];

export const orderNote =
  "At the restaurant we checked, online orders were taken from 11 AM until 20 minutes before closing, with curbside pickup and delivery available. Times vary by location.";

/* ---------- FAQs (research/homepage/faqs.md) ---------- */

export const homepageFaqs: FaqItem[] = [
  {
    question: "How much does a meal at Olive Garden cost?",
    answer:
      "At the online pickup prices we verified, dinner entrées cost $13.99 to $26.49, lunch-size plates $11.49 to $12.49, and kids meals $7.49 to $9.98. Prices may vary by location across the USA.",
  },
  {
    question: "Do entrées come with soup or salad and breadsticks?",
    answer:
      "Yes. Dinner entrées, lunch plates, and lighter portions include soup or the house salad plus breadsticks. Kids meals and $6 Take Home entrées do not.",
    link: { text: "What comes with each classic entrée", href: "/classic-entrees" },
  },
  {
    question: "When is the Olive Garden lunch menu served?",
    answer:
      "Monday through Friday from 11 AM to 3 PM. On weekends and holidays the dinner menu is served all day. Times can vary by restaurant.",
  },
  {
    question: "Is Olive Garden open on Thanksgiving and Christmas?",
    answer:
      "No. Restaurants close on Thanksgiving Day and Christmas Day. They may close early the day before Thanksgiving and on Christmas Eve, so call ahead.",
  },
  {
    question: "What is the $6 Take Home offer?",
    answer:
      "Buy any entrée and add a chilled take-home pasta for $6, without soup, salad, or breadsticks.",
    link: { text: "Eligible dishes, rules, and Buy One Take One status", href: "/buy-one-take-one" },
  },
  {
    question: "Does Olive Garden have gluten-free food?",
    answer:
      "It has a gluten-sensitive menu made without gluten-containing ingredients, but those dishes are not certified gluten-free and there is no separate fryer. The gluten-free rotini pasta meets the FDA gluten-free definition.",
  },
  {
    question: "How many calories are in Olive Garden breadsticks?",
    answer:
      "Each breadstick with garlic topping has 140 calories, so an order of six comes to 840 calories by our calculation.",
  },
  {
    question: "Can I order Olive Garden online for pickup or delivery?",
    answer:
      "Yes. On the official ordering page, choose To Go or Catering, pick your restaurant, and select pickup or delivery where offered. At the restaurant we checked, online ordering closed 20 minutes before closing time.",
  },
];

/* ---------- Sources (row 15) ---------- */

export const homepageSources: (LinkItem & { note: string })[] = [
  {
    label: "Olive Garden online ordering menu (Pickup)",
    href: officialLinks.menu,
    note: "Prices, item names, sizes, and calories; verified November 2026",
  },
  {
    label: "Olive Garden Nutrition Information (U.S. restaurants, PDF)",
    href: officialLinks.nutritionPdf,
    note: "Calorie cross-check for every category; verified November 2026",
  },
  {
    label: "Olive Garden specials",
    href: officialLinks.specials,
    note: "Current deals and offer terms; verified November 2026",
  },
  {
    label: "Olive Garden FAQs",
    href: officialLinks.faqs,
    note: "Holiday closures, lunch hours, and policies; verified November 2026",
  },
];

/* ---------- Important links (row 14) ---------- */

export const officialResourceLinks: LinkItem[] = [
  { label: "Order online", href: officialLinks.orderOnline },
  { label: "Find a restaurant", href: officialLinks.locator },
  { label: "Official menu", href: officialLinks.menu },
  { label: "Nutrition information", href: officialLinks.nutrition },
  { label: "Catering", href: officialLinks.catering },
];
