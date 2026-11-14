import type { CategoryPageContent } from "@/lib/types";

/**
 * Written content for category pages (docs/CATEGORY_CONTENT_STANDARDS.md).
 * A category gets a page only when its contentStatus (content/menu/categories.ts)
 * is "preview" or "published" AND it has an entry here.
 *
 * Rules: no invented prices, calories, descriptions, availability, or
 * popularity. Prices and calories in TABLES come from the shared menu data;
 * numbers written into sentences below were taken from the same verified
 * data (online pickup, Orlando - Millenia Mall, checked 2026-11-11/12) and
 * must be re-read whenever that data changes (CATEGORY_DEVELOPMENT_CHECKLIST.md D).
 * Values marked "calculated" are our arithmetic from official values.
 *
 * Internal links: existing category pages use "/<slug>"; categories without
 * a page yet link to their homepage section "/#<slug>" (update when they go live).
 */
const NUTRITION_PDF = { label: "Olive Garden Nutrition Information (U.S. restaurants, PDF)", url: "https://media.olivegarden.com/en_us/pdf/olive_garden_nutrition.pdf" };
const ORDER_ONLINE = { label: "Olive Garden: order online (To Go and Catering)", url: "https://www.olivegarden.com/order-online" };
const REVIEWED = "2026-11-13";
/** Batch 3 pages (Lesson 8.4.5) were written and reviewed on this date. */
const REVIEWED_B3 = "2026-11-14";
/** Batch 4 pages (Lesson 8.4.6) were written and reviewed on this date. */
const REVIEWED_B4 = "2026-11-14";

export const categoryPages: CategoryPageContent[] = [
  /* =====================================================================
   * 1. FAMILY STYLE MEALS  (preview)
   * ===================================================================== */
  {
    categoryId: "family-style-meals",
    primaryKeyword: "olive garden family style meals",
    menuTitle: "Olive Garden Family Style Meals",
    secondaryKeywords: [
      "olive garden family meals with prices",
      "olive garden family bundles",
      "olive garden family meals to go",
      "olive garden family size pans",
      "olive garden family meal for 4",
      "olive garden family meal cost per person",
    ],
    searchIntent: "Choose and price a take-home Olive Garden dinner for a household of 4 to 12 people.",
    metaTitle: "Olive Garden Family Style Meals with Prices (2026)",
    metaDescription:
      "Explore Olive Garden family-style meals, family bundles, prices, calories, serving sizes, and cost per person to plan your next family dinner.",
    h1: "Olive Garden Family Style Meals with Prices 2026",
    intro: [
      "Olive Garden sells family-style meals two ways: family bundles, which are complete take-home dinners with a pan, a jumbo house salad, and 12 breadsticks, and family-size pans that you put together yourself. Most of them feed 4 to 6 people, and one lasagna bundle feeds up to 12.",
      "The bundles start at $66.49 and the pans at $47.99 for online pickup. Below you will find every item with its price, servings, and calories, plus our cost-per-person math so you can compare options for your household.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Olive Garden Family Style Meals Menu",
    tableCaption: "Olive Garden Family Style Meals: Prices, Servings, and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in and delivery prices were not checked, and Olive Garden notes that bundle prices are different in New York, Alaska, and California.",
      "Pans can be rounded out with add-ons: Our Famous Jumbo House Salad with 12 breadsticks ($25.49), a homemade soup that serves 6 ($20.49), or 6 or 12 breadsticks ($4.99 or $7.29).",
      "“Large Salad” is listed for completeness: no item with that name was on the online menu in November 2026. The family-size salad on the menu is Our Famous Jumbo House Salad.",
    ],
    nutritionNotes: [
      "Calories are totals for the whole bundle, pan, or container, not per person. Breadsticks are 140 calories each.",
    ],
    featuredOfferingIds: [
      "family-style-meals--family-style-lasagna-bundle",
      "family-style-meals--family-style-chicken-alfredo-bundle",
      "family-style-meals--family-style-chicken-parmigiana-bundle",
      "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle",
      "family-style-meals--family-style-lasagna-bundle--large",
    ],
    featuredHeading: "Family Bundles with Photos",
    comparisons: [
      {
        id: "family-servings",
        caption: "How many people each family meal serves",
        columns: [{ kind: "serving", label: "Official serving size" }, { kind: "price" }],
        rows: [
          { offeringId: "family-style-meals--family-style-lasagna-bundle", label: "Lasagna Bundle" },
          { offeringId: "family-style-meals--family-style-chicken-alfredo-bundle", label: "Chicken Alfredo Bundle" },
          { offeringId: "family-style-meals--family-style-chicken-parmigiana-bundle", label: "Chicken Parmigiana Bundle" },
          { offeringId: "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle", label: "Five Cheese Ziti al Forno Bundle" },
          { offeringId: "family-style-meals--family-style-lasagna-bundle--large", label: "Large Lasagna Bundle" },
          { offeringId: "family-style-meals--lasagna-classico", label: "Lasagna Classico pan" },
          { offeringId: "family-style-meals--fettuccine-alfredo", label: "Fettuccine Alfredo pan", option: "Pan" },
          { offeringId: "family-style-meals--famous-house-salad", label: "Jumbo House Salad" },
          { offeringId: "family-style-meals--homemade-soups", label: "Homemade Soup" },
          { offeringId: "family-style-meals--homemade-soups--large", label: "Homemade Soup (large)" },
        ],
        notes: ["Every other family-size pan on this page is listed as “Serves 4-6”."],
      },
      {
        id: "family-bundle-cost",
        caption: "Family bundles: cost per person",
        columns: [
          { kind: "price", label: "Bundle price" },
          { kind: "pricePerServing", label: "Per person, smallest group", use: "min" },
          { kind: "pricePerServing", label: "Per person, largest group" },
          { kind: "calories", label: "Calories (whole bundle)" },
        ],
        rows: [
          { offeringId: "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle", label: "Five Cheese Ziti al Forno Bundle (serves 4-6)", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--family-style-lasagna-bundle", label: "Lasagna Bundle (serves 4-6)", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--family-style-chicken-parmigiana-bundle", label: "Chicken Parmigiana Bundle (serves 4-6)", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--family-style-chicken-alfredo-bundle", label: "Chicken Alfredo Bundle (serves 4-6)", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--family-style-lasagna-bundle--large", label: "Large Lasagna Bundle (serves up to 12)", servings: 12 },
        ],
        notes: [
          "Per-person prices divide the bundle price by the lowest and highest number of people in Olive Garden’s official “serves” range. The large bundle has no lower number, so only the 12-person value is shown.",
          "Tax, tips, delivery fees, and drinks are not included.",
        ],
      },
      {
        id: "family-pan-cost",
        caption: "Family-size pans from lowest to highest price",
        columns: [
          { kind: "price", label: "Pan price" },
          { kind: "pricePerServing", label: "Per person (6 people)" },
          { kind: "pricePerServing", label: "Per person (4 people)", use: "min" },
          { kind: "calories", label: "Calories (whole pan)" },
        ],
        rows: [
          { offeringId: "family-style-meals--spaghetti-with-marinara-sauce", label: "Spaghetti with Marinara Sauce", option: "Pan", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--spaghetti-with-meat-sauce", label: "Spaghetti with Meat Sauce", option: "Pan", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--fettuccine-alfredo", label: "Fettuccine Alfredo", option: "Pan", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--five-cheese-ziti-al-forno", label: "Five Cheese Ziti al Forno", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--cheese-ravioli-with-meat-or-marinara-sauce", label: "Cheese Ravioli", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--lasagna-classico", label: "Lasagna Classico (serves up to 6)", servings: 6 },
          { offeringId: "family-style-meals--chicken-parmigiana", label: "Chicken Parmigiana (with spaghetti)", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--chicken-scampi", label: "Chicken Scampi", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--shrimp-scampi", label: "Shrimp Scampi", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--chicken-alfredo", label: "Chicken Alfredo", option: "Pan, grilled chicken alfredo", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--shrimp-alfredo", label: "Shrimp Alfredo", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--chicken-tortelloni-alfredo", label: "Chicken Tortelloni Alfredo", servingsMin: 4, servings: 6 },
          { offeringId: "family-style-meals--chicken-and-shrimp-carbonara", label: "Chicken and Shrimp Carbonara", servingsMin: 4, servings: 6 },
        ],
        notes: [
          "Pans do not include salad or breadsticks. Prices shown are for the plain pan; broccoli, meatballs, or Italian sausage cost extra where offered.",
        ],
      },
    ],
    sections: [
      {
        id: "bundles-vs-pans",
        heading: "Family Bundles vs Family Size Pans",
        blocks: [
          {
            type: "paragraph",
            text: "A family bundle is a complete dinner: one pan of the main dish, a jumbo Famous House Salad with dressing and croutons, and 12 breadsticks. A family-size pan is just the main dish, so you choose the extras yourself.",
          },
          {
            type: "list",
            items: [
              "Bundles: Lasagna Classico, Chicken Alfredo, Chicken Parmigiana (with a pan of spaghetti in marinara), and Five Cheese Ziti al Forno for 4-6 people, plus a large Lasagna Classico bundle with two jumbo salads and 24 breadsticks for up to 12.",
              "The Chicken Alfredo bundle also comes with alfredo sauce on the side.",
              "Pans: 13 pasta and entrée choices, from spaghetti to shrimp alfredo, each listed as serving 4-6 (Lasagna Classico: up to 6).",
            ],
          },
          {
            type: "paragraph",
            text: "For the dishes sold both ways, the bundle usually costs less than building the same meal from a pan and the jumbo salad with 12 breadsticks. For example, the Five Cheese Ziti al Forno pan ($50.99) plus the salad and breadsticks ($25.49) comes to $76.48, while the bundle is $66.49, a difference of $9.99. For lasagna, the pan ($53.99) plus the salad set comes to $79.48 against $68.99 for the bundle, a difference of $10.49. These totals are our calculation from the listed prices.",
          },
          {
            type: "note",
            text: "A pan makes more sense when you only need the main dish, or when you want a dish that has no bundle, such as Shrimp Scampi or Chicken Tortelloni Alfredo.",
          },
        ],
      },
      {
        id: "how-many-people",
        heading: "How Many People Do Olive Garden Family Meals Serve?",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden lists most family meals as serving 4 to 6 people. The large lasagna bundle serves up to 12, the soups come in sizes for 6 or 12, and the jumbo house salad serves 6. These are Olive Garden’s own serving sizes; how far a pan goes still depends on your group’s appetites.",
          },
          { type: "comparison", id: "family-servings" },
        ],
      },
      {
        id: "cost-per-person",
        heading: "Family Meal Cost Per Person",
        blocks: [
          {
            type: "paragraph",
            text: "To compare value, we divided each bundle price by the number of people in Olive Garden’s serving range. For a family meal for 4, use the “smallest group” column; for 6, use the “largest group” column.",
          },
          { type: "comparison", id: "family-bundle-cost" },
          {
            type: "paragraph",
            text: "Among the 4-6 person bundles, Five Cheese Ziti al Forno has the lowest price, and the large lasagna bundle has the lowest cost per person when it feeds the full 12.",
          },
        ],
      },
      {
        id: "budget-options",
        heading: "Budget-Friendly Family Meal Options",
        blocks: [
          {
            type: "paragraph",
            text: "If price matters most, the spaghetti pans with marinara or meat sauce are the lowest-priced family-size dishes at $47.99. Fettuccine Alfredo and Five Cheese Ziti al Forno follow at $50.99. Keep in mind that pans come without salad or breadsticks, which a bundle includes.",
          },
          { type: "comparison", id: "family-pan-cost" },
          {
            type: "list",
            items: [
              "Want the complete dinner for the least money? The Five Cheese Ziti al Forno bundle ($66.49) is the lowest-priced bundle.",
              "Feeding a big group at home? Compare the large lasagna bundle with two smaller bundles before you order.",
              "Breadsticks can be ordered unbaked to bake at home, in packs of 6 or 12.",
            ],
          },
        ],
      },
      {
        id: "order-to-go",
        heading: "How to Order Family Meals To Go",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              ["Open Olive Garden’s ", { text: "online ordering page", href: "https://www.olivegarden.com/order-online" }, " and choose To Go."],
              "Pick your restaurant, then choose pickup or delivery where your restaurant offers it.",
              "Add a bundle, or a pan plus the salad, soup, or breadsticks you want, and check the price shown for your location.",
            ],
          },
          {
            type: "paragraph",
            text: "Olive Garden asks for 2 hours’ notice on lasagna pans and the lasagna bundle. At the restaurant we checked, online ordering closed 20 minutes before closing time.",
          },
          {
            type: "note",
            text: [
              "Planning an office lunch, party, or event instead of a family dinner? Olive Garden has a separate catering menu with larger combinations and delivery terms. See the ",
              { text: "catering section of our full menu", href: "/#catering" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Family Bundles (official menu)", url: "https://www.olivegarden.com/menu/family-style-meals/family-bundles" },
      { label: "Olive Garden Family-Size Pans (official menu)", url: "https://www.olivegarden.com/menu/family-style-meals/family-size-pans-serves-4-6" },
      ORDER_ONLINE,
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "How many people does an Olive Garden family meal feed?",
        answer:
          "Most family bundles and family-size pans are listed as serving 4 to 6 people. The large lasagna bundle serves up to 12, the Lasagna Classico pan up to 6, and homemade soups come in sizes for 6 or 12.",
      },
      {
        question: "What comes with Olive Garden family bundles?",
        answer:
          "Each bundle has one pan of the main dish, a jumbo Famous House Salad with dressing and croutons, and 12 breadsticks. The Chicken Parmigiana bundle adds a pan of spaghetti in marinara, and the Chicken Alfredo bundle adds alfredo sauce on the side. The large lasagna bundle has two salads and 24 breadsticks.",
      },
      {
        question: "Can you order Olive Garden family meals to go?",
        answer:
          "Yes. Family bundles and pans are To Go items: order them online for pickup, or for delivery where your restaurant offers it. Lasagna pans and the lasagna bundle need about 2 hours’ notice.",
      },
      {
        question: "What is the most affordable family meal option?",
        answer:
          "In our November 2026 price check, the cheapest bundle was the Five Cheese Ziti al Forno bundle at $66.49, and the cheapest pans were spaghetti with marinara or meat sauce at $47.99 (online pickup). Prices may vary by location across the USA.",
      },
      {
        question: "What is the difference between family meals and catering?",
        answer:
          "Family-style meals are To Go dinners for a household, usually 4 to 6 people. Olive Garden’s catering menu is built for events, with combinations that serve 8 to 14 and pasta stations for larger groups. Some family-size pans appear on both menus.",
      },
    ],
    related: [
      { categoryId: "catering", text: "Feeding a party or office group instead? The catering menu is planned by headcount." },
      { categoryId: "classic-entrees", text: "Compare the single-plate dinner versions of these dishes." },
      { categoryId: "amazing-alfredos", text: "All Alfredo dishes side by side, from one plate to a family pan." },
    ],
  },

  /* =====================================================================
   * 2. APPETIZERS  (published)
   * ===================================================================== */
  {
    categoryId: "appetizers",
    primaryKeyword: "olive garden appetizers menu",
    menuTitle: "Olive Garden Appetizers Menu",
    secondaryKeywords: [
      "olive garden appetizers with prices",
      "olive garden appetizers calories",
      "olive garden starter menu",
      "best olive garden appetizers",
      "olive garden calamari",
      "olive garden fried mozzarella",
      "olive garden dipping sauces",
    ],
    searchIntent: "Compare every Olive Garden starter by price, calories, dipping sauce, and sharing size before ordering.",
    metaTitle: "Olive Garden Appetizers Menu with Prices & Calories 2026",
    metaDescription:
      "Explore Olive Garden appetizers with prices, calories, dipping sauces, vegetarian choices, and sharing options.",
    h1: "Olive Garden Appetizers Menu with Prices 2026",
    intro: [
      "Olive Garden’s online menu lists 10 appetizers, from breadsticks at $4.99 to Shrimp Fritto Misto at $14.29. Among the fried and baked starters, calories range from 500 for an order of Stuffed Ziti Fritta to 1,280 for Shrimp Fritto Misto, before dipping sauce.",
      "The table below compares every starter on Olive Garden’s current online menu. The sections after it show which sauces come with each appetizer, which items Olive Garden marks vegetarian, and which ones are listed as serving a group.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Olive Garden Appetizers Prices and Calories",
    tableCaption: "Olive Garden Appetizer Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Breadsticks: the price shown is for 6 breadsticks; 12 breadsticks were $7.29 (baked, or unbaked to bake at home).",
      "Dipping Sauces with Breadsticks: the price shown is for the regular size with 4 breadsticks; the large size with 8 breadsticks and an 8 oz sauce was $7.29.",
    ],
    nutritionNotes: [
      "Calories are for the full order as served, without dipping sauces unless the table says otherwise. Breadsticks are listed per breadstick.",
      "Dipping Sauces with Breadsticks shows a calculated total: 4 breadsticks (140 each) plus one regular sauce of 70 to 490 calories. The large order comes to 1,270 to 2,100 calories. These totals are our calculation from Olive Garden’s official values.",
    ],
    featuredOfferingIds: [
      "appetizers--fried-mozzarella",
      "appetizers--calamari",
      "appetizers--toasted-ravioli",
      "appetizers--stuffed-ziti-fritta",
      "appetizers--spinach-artichoke-dip",
    ],
    featuredHeading: "Appetizers with Photos",
    comparisons: [
      {
        id: "appetizer-sauces",
        caption: "Which dipping sauces come with each appetizer",
        columns: [
          { kind: "price" },
          { kind: "calories", label: "Calories (order)" },
          { kind: "text", label: "Served with", key: "sauce" },
          { kind: "text", label: "Sauce calories", key: "sauceCal" },
        ],
        rows: [
          { offeringId: "appetizers--fried-mozzarella", text: { sauce: "Marinara", sauceCal: "+35" } },
          { offeringId: "appetizers--stuffed-ziti-fritta", text: { sauce: "Alfredo and marinara", sauceCal: "+220 alfredo, +35 marinara" } },
          { offeringId: "appetizers--calamari", text: { sauce: "Marinara and spicy ranch", sauceCal: "+35 marinara, +240 spicy ranch" } },
          { offeringId: "appetizers--shrimp-fritto-misto", text: { sauce: "Marinara and spicy ranch", sauceCal: "+35 marinara, +240 spicy ranch" } },
          { offeringId: "appetizers--toasted-ravioli", text: { sauce: "Marinara", sauceCal: "+35" } },
          { offeringId: "appetizers--lasagna-fritta", text: { sauce: "Meat sauce on top, alfredo", sauceCal: "Not listed separately" } },
          { offeringId: "appetizers--meatballs-parmigiana", text: { sauce: "Baked in marinara", sauceCal: "Included" } },
          { offeringId: "appetizers--spinach-artichoke-dip", text: { sauce: "Flatbread crisps for dipping", sauceCal: "Included" } },
          { offeringId: "appetizers--dipping-sauces-with-breadsticks", text: { sauce: "Your choice of one sauce", sauceCal: "Included (70-490)" } },
        ],
        notes: [
          "Sauce calories are from Olive Garden’s nutrition guide, where these dipping sauces are listed separately from the appetizer.",
        ],
      },
      {
        id: "appetizer-calories",
        caption: "Appetizers from fewest to most calories per order",
        columns: [{ kind: "calories", label: "Calories" }, { kind: "price" }],
        rows: [
          { offeringId: "appetizers--breadsticks", label: "Breadsticks (one breadstick)" },
          { offeringId: "appetizers--stuffed-ziti-fritta" },
          { offeringId: "appetizers--dipping-sauces-with-breadsticks", label: "Dipping Sauces with Breadsticks (regular, calculated)" },
          { offeringId: "appetizers--toasted-ravioli" },
          { offeringId: "appetizers--calamari" },
          { offeringId: "appetizers--fried-mozzarella" },
          { offeringId: "appetizers--meatballs-parmigiana" },
          { offeringId: "appetizers--lasagna-fritta" },
          { offeringId: "appetizers--spinach-artichoke-dip" },
          { offeringId: "appetizers--shrimp-fritto-misto" },
        ],
        notes: ["Order calories do not include the dipping sauces listed in the table above."],
      },
      {
        id: "appetizer-restaurant-vs-catering",
        caption: "Restaurant appetizers vs catering trays",
        columns: [{ kind: "category", label: "Menu" }, { kind: "serving", label: "Size" }, { kind: "price" }, { kind: "calories", label: "Calories (total)" }],
        rows: [
          { offeringId: "appetizers--fried-mozzarella", label: "Fried Mozzarella" },
          { offeringId: "catering--fried-mozzarella", label: "Fried Mozzarella tray" },
          { offeringId: "appetizers--spinach-artichoke-dip", label: "Spinach-Artichoke Dip" },
          { offeringId: "catering--spinach-artichoke-dip", label: "Spinach-Artichoke Dip pan" },
          { offeringId: "appetizers--toasted-ravioli", label: "Toasted Ravioli" },
          { offeringId: "catering--toasted-beef-ravioli", label: "Toasted Beef Ravioli pan" },
        ],
        notes: ["Catering trays are ordered from Olive Garden’s catering menu, not the appetizer menu."],
      },
    ],
    sections: [
      {
        id: "dipping-sauces",
        heading: "Olive Garden Appetizers and Dipping Sauces",
        blocks: [
          {
            type: "paragraph",
            text: "Most fried appetizers come with marinara for dipping, and Calamari and Shrimp Fritto Misto add a spicy ranch. Olive Garden lists these sauces separately in its nutrition guide, so the calories in the main table are for the appetizer alone.",
          },
          { type: "comparison", id: "appetizer-sauces" },
          {
            type: "paragraph",
            text: "Dipping Sauces with Breadsticks lets you pick the sauce. The menu describes marinara, alfredo, and five cheese marinara; the nutrition guide also lists a spicy alfredo sauce. Extra large sauces are sold on the sides menu.",
          },
        ],
      },
      {
        id: "vegetarian-appetizers",
        heading: "Vegetarian Appetizer Options",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden marks vegetarian dishes with (V) on its online menu. Among the appetizers, Breadsticks (V) and Dipping Sauces with Breadsticks (V) carry that mark.",
          },
          {
            type: "paragraph",
            text: [
              "Fried Mozzarella, Stuffed Ziti Fritta, and Spinach-Artichoke Dip do not list meat in their descriptions, but they are not marked (V) on the online menu we checked, so we do not call them vegetarian. For ingredient details, see Olive Garden’s ",
              { text: "vegetarian and vegan menu (PDF)", href: "https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf" },
              " or ask your server.",
            ],
          },
        ],
      },
      {
        id: "lower-calorie-appetizers",
        heading: "Lower-Calorie Appetizers",
        blocks: [
          {
            type: "paragraph",
            text: "If you are watching calories, a single breadstick has 140, and Stuffed Ziti Fritta has the fewest calories of the fried and baked starters at 500 per order. Toasted Ravioli (650) and Calamari (670) are next. Remember to add the dipping sauces.",
          },
          { type: "comparison", id: "appetizer-calories" },
        ],
      },
      {
        id: "sharing-appetizers",
        heading: "Appetizers for Sharing",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden gives a serving size for only a few appetizers, so here is what the menu actually states:",
          },
          {
            type: "list",
            items: [
              "Dipping Sauces with Breadsticks: the regular size (4 breadsticks) serves 2, the large size (8 breadsticks and an 8 oz sauce) serves 4.",
              "Breadsticks: sold by the half dozen ($4.99) or dozen ($7.29).",
              "Meatballs Parmigiana: 5 meatballs per order.",
              "Shrimp Fritto Misto: more than half a pound of shrimp with onions and bell peppers.",
              "The other appetizers are sold as one order, and Olive Garden does not state a piece count or a number of people.",
            ],
          },
        ],
      },
      {
        id: "restaurant-vs-catering",
        heading: "Restaurant vs Catering Appetizers",
        blocks: [
          {
            type: "paragraph",
            text: "Three appetizers also come in catering sizes for 4 to 6 guests. The catering Fried Mozzarella tray has 30 pieces, and the catering ravioli is named Toasted Beef Ravioli.",
          },
          { type: "comparison", id: "appetizer-restaurant-vs-catering" },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden appetizers (official online menu)", url: "https://www.olivegarden.com/menu/appetizers" },
      { label: "Olive Garden vegetarian and vegan menu (PDF)", url: "https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "What appetizers does Olive Garden serve?",
        answer:
          "The online menu listed 10: Breadsticks, Fried Mozzarella, Stuffed Ziti Fritta, Dipping Sauces with Breadsticks, Calamari, Meatballs Parmigiana, Spinach-Artichoke Dip, Lasagna Fritta, Shrimp Fritto Misto, and Toasted Ravioli (November 2026).",
      },
      {
        question: "How much is fried mozzarella at Olive Garden?",
        answer:
          "Fried Mozzarella was $9.79 for online pickup when we checked in November 2026. It has 800 calories per order, plus 35 for the marinara. Prices vary by location.",
      },
      {
        question: "What dipping sauces come with Olive Garden appetizers?",
        answer:
          "Fried Mozzarella and Toasted Ravioli come with marinara, Stuffed Ziti Fritta with alfredo and marinara, and Calamari and Shrimp Fritto Misto with marinara and spicy ranch. Dipping Sauces with Breadsticks lets you choose the sauce.",
      },
      {
        question: "Which appetizers have fewer calories?",
        answer:
          "Stuffed Ziti Fritta has the fewest calories of the fried and baked starters at 500 per order, followed by Toasted Ravioli (650) and Calamari (670), before sauces. One breadstick has 140 calories.",
      },
      {
        question: "Can you order Olive Garden appetizers for catering?",
        answer:
          "Yes, a few. The catering menu offers Fried Mozzarella (30 pieces), Spinach-Artichoke Dip, and Toasted Beef Ravioli for 4 to 6 guests, plus breadsticks and dipping sauces that serve 8.",
      },
    ],
    related: [
      { categoryId: "catering", text: "Need appetizers for a group? See the catering trays and sauces." },
      { categoryId: "sides-sauces-and-extras", text: "Extra dipping sauce or a side for the table." },
      { categoryId: "classic-entrees", text: "Choose a dinner entrée to follow your starter." },
      { categoryId: "family-style-meals", text: "Feeding a group at home? Family bundles come with salad and breadsticks." },
      { categoryId: "soups-salad-and-breadsticks", text: "Soups, the house salad, and breadsticks as a meal." },
    ],
  },

  /* =====================================================================
   * 3. CLASSIC ENTREES  (preview)
   * ===================================================================== */
  {
    categoryId: "classic-entrees",
    primaryKeyword: "olive garden classic entrees",
    menuTitle: "Olive Garden Classic Entrees",
    secondaryKeywords: [
      "olive garden entrees menu",
      "olive garden dinner entrees",
      "olive garden entrees with prices",
      "olive garden chicken parmigiana",
      "olive garden vegetarian entrees",
      "what comes with olive garden entrees",
    ],
    searchIntent: "See every regular dinner entrée with price, calories, and what is included, then find the right portion size.",
    metaTitle: "Olive Garden Classic Entrees Menu with Prices (2026)",
    metaDescription:
      "Compare Olive Garden classic entrees, dinner prices, calories, chicken, seafood and pasta dishes, plus available portion sizes.",
    h1: "Olive Garden Classic Entrees Menu with Prices 2026",
    intro: [
      "Olive Garden’s classic entrées are its regular dinner plates. They cost $13.99 to $26.49 for online pickup, and each one comes with soup or salad and two breadsticks.",
      "The table lists all 28 items in this section, including Create Your Own Pasta and the family lasagna bundle that Olive Garden places here. Below it you will find what each plate includes, the vegetarian choices, and how dinner portions compare with the smaller lighter and lunch versions.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Classic Entrees Prices and Calories",
    tableCaption: "Olive Garden Classic Entrees: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Calabrian Steak & Shrimp Bucatini: the item page showed $24.49 (steak and shrimp or shrimp only) and $26.49 (steak only); the menu card showed $25.29 that day, so check the price at your restaurant.",
      "Spicy Alfredo Fettuccine is a limited-time item.",
    ],
    nutritionNotes: [
      "Calories are per entrée as served, without the soup or salad and breadsticks. A breadstick has 140 calories and the house salad 150.",
    ],
    featuredOfferingIds: [
      "classic-entrees--chicken-parmigiana",
      "classic-entrees--tour-of-italy",
      "classic-entrees--lasagna-classico",
      "classic-entrees--shrimp-scampi",
      "classic-entrees--stuffed-chicken-marsala",
    ],
    featuredHeading: "Classic Entrees with Photos",
    comparisons: [
      {
        id: "entree-types",
        caption: "Chicken, seafood, steak, and pasta entrées",
        columns: [{ kind: "text", label: "Type", key: "type" }, { kind: "price" }, { kind: "calories", label: "Calories" }],
        rows: [
          { offeringId: "classic-entrees--chicken-parmigiana", text: { type: "Chicken" } },
          { offeringId: "classic-entrees--chicken-alfredo", text: { type: "Chicken" } },
          { offeringId: "classic-entrees--chicken-scampi", text: { type: "Chicken" } },
          { offeringId: "classic-entrees--stuffed-chicken-marsala", text: { type: "Chicken" } },
          { offeringId: "classic-entrees--grilled-chicken-margherita", text: { type: "Chicken" } },
          { offeringId: "classic-entrees--chicken-tortelloni-alfredo", label: "Chicken Tortelloni Alfredo", option: "Chicken Tortelloni Alfredo", text: { type: "Chicken" } },
          { offeringId: "classic-entrees--chicken-and-shrimp-carbonara", label: "Chicken & Shrimp Carbonara", option: "Chicken & Shrimp Carbonara", text: { type: "Chicken and seafood" } },
          { offeringId: "classic-entrees--shrimp-scampi", text: { type: "Seafood" } },
          { offeringId: "classic-entrees--shrimp-alfredo", text: { type: "Seafood" } },
          { offeringId: "classic-entrees--seafood-alfredo", text: { type: "Seafood" } },
          { offeringId: "classic-entrees--shrimp-carbonara", text: { type: "Seafood" } },
          { offeringId: "classic-entrees--herb-grilled-salmon", text: { type: "Seafood" } },
          { offeringId: "classic-entrees--6-oz-sirloin", text: { type: "Steak" } },
          { offeringId: "classic-entrees--steak-gorgonzola-alfredo", text: { type: "Steak" } },
          { offeringId: "classic-entrees--calabrian-steak-and-shrimp-bucatini", label: "Calabrian Steak & Shrimp Bucatini", option: "Calabrian Steak & Shrimp Bucatini", text: { type: "Steak and seafood" } },
          { offeringId: "classic-entrees--lasagna-classico", text: { type: "Pasta with meat" } },
          { offeringId: "classic-entrees--spaghetti-and-meatballs", label: "Spaghetti & Meatballs", option: "Spaghetti with Marinara & Meatballs", text: { type: "Pasta with meat" } },
          { offeringId: "classic-entrees--spaghetti-with-meat-sauce", text: { type: "Pasta with meat" } },
          { offeringId: "classic-entrees--ravioli-carbonara", text: { type: "Pasta with bacon" } },
          { offeringId: "classic-entrees--tour-of-italy", text: { type: "Combination plate" } },
        ],
        notes: ["Meatless pastas are listed under the vegetarian section below."],
      },
      {
        id: "entree-portions-chicken-parm",
        caption: "Chicken Parmigiana: dinner vs lighter vs lunch portion",
        columns: [
          { kind: "category", label: "Menu" },
          { kind: "price" },
          { kind: "priceDifference", label: "Price vs dinner", baseRow: 0 },
          { kind: "calories" },
          { kind: "caloriesDifference", label: "Calories vs dinner", baseRow: 0 },
        ],
        rows: [
          { offeringId: "classic-entrees--chicken-parmigiana", label: "Dinner (classic entrée)" },
          { offeringId: "lighter-portions--chicken-parmigiana", label: "Lighter portion" },
          { offeringId: "lunch-menu--chicken-parmigiana", label: "Lunch portion" },
        ],
      },
      {
        id: "entree-portions-lasagna",
        caption: "Lasagna Classico: dinner vs lighter vs lunch portion",
        columns: [
          { kind: "category", label: "Menu" },
          { kind: "price" },
          { kind: "priceDifference", label: "Price vs dinner", baseRow: 0 },
          { kind: "calories" },
          { kind: "caloriesDifference", label: "Calories vs dinner", baseRow: 0 },
        ],
        rows: [
          { offeringId: "classic-entrees--lasagna-classico", label: "Dinner (classic entrée)" },
          { offeringId: "lighter-portions--lasagna-classico", label: "Lighter portion" },
          { offeringId: "lunch-menu--lasagna-classico", label: "Lunch portion" },
        ],
      },
      {
        id: "entree-budget",
        caption: "Lowest-priced classic entrées",
        columns: [{ kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "classic-entrees--spaghetti-with-marinara" },
          { offeringId: "classic-entrees--spaghetti-with-meat-sauce" },
          { offeringId: "classic-entrees--create-your-own-pasta" },
          { offeringId: "classic-entrees--fettuccine-alfredo" },
          { offeringId: "classic-entrees--spicy-alfredo-fettuccine" },
          { offeringId: "classic-entrees--cheese-ravioli" },
          { offeringId: "classic-entrees--spaghetti-and-meatballs", label: "Spaghetti & Meatballs", option: "Spaghetti with Marinara & Meatballs" },
          { offeringId: "classic-entrees--eggplant-parmigiana" },
          { offeringId: "classic-entrees--ravioli-carbonara" },
        ],
        notes: ["Create Your Own Pasta starts at $13.99 for a pasta and a sauce; toppings cost extra."],
      },
    ],
    sections: [
      {
        id: "what-comes-with-entrees",
        heading: "What Comes with Olive Garden Entrees?",
        blocks: [
          {
            type: "paragraph",
            text: "Every classic entrée on the dine-in and pickup menu includes your choice of soup or Olive Garden’s house salad, plus two breadsticks. The plates themselves differ in their sides:",
          },
          {
            type: "list",
            items: [
              "Chicken Parmigiana and Eggplant Parmigiana come with a side of spaghetti; you can swap it for fettuccine alfredo for $3.79.",
              "Grilled Chicken Margherita and Herb-Grilled Salmon come with parmesan garlic broccoli.",
              "The 6 oz. Sirloin comes with fettuccine alfredo, and Stuffed Chicken Marsala with mashed potatoes.",
              "Tour of Italy puts Chicken Parmigiana, Lasagna Classico, and Fettuccine Alfredo on one plate.",
              "The Family-Style Lasagna Bundle in this section is a take-home dinner for 4-6 with a jumbo salad and 12 breadsticks.",
            ],
          },
          {
            type: "note",
            text: [
              "The $6 take-home entrées you can add to a meal do not come with soup, salad, or breadsticks. See ",
              { text: "Buy One Take One and $6 Take Home", href: "/buy-one-take-one" },
              ".",
            ],
          },
        ],
      },
      {
        id: "chicken-seafood-pasta",
        heading: "Chicken, Seafood and Pasta Entrees",
        blocks: [
          {
            type: "paragraph",
            text: "Chicken dishes make up the largest group, from the breaded Chicken Parmigiana to the grilled Chicken Margherita. On the seafood side, Shrimp Scampi has 490 calories, tied with Spaghetti with Marinara for the fewest of any classic entrée. The highest-priced plates were the Calabrian bucatini ($24.49 to $26.49), Shrimp Tortelloni Alfredo ($25.79), and Shrimp Carbonara ($24.99).",
          },
          { type: "comparison", id: "entree-types" },
          {
            type: "paragraph",
            text: [
              "Comparing the Alfredo dishes? They have their own page: ",
              { text: "Olive Garden Alfredo menu", href: "/amazing-alfredos" },
              ".",
            ],
          },
        ],
      },
      {
        id: "vegetarian-entrees",
        heading: "Vegetarian Entree Options",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden marks three classic entrées with (V) for vegetarian: Fettuccine Alfredo, Spaghetti with Marinara, and Eggplant Parmigiana. Two more can be ordered vegetarian:",
          },
          {
            type: "list",
            items: [
              "Cheese Ravioli with marinara: the marinara is marked (V); the meat sauce option is not vegetarian.",
              "Create Your Own Pasta with a sauce marked (V), such as marinara, five cheese marinara, or creamy mushroom, and no meat toppings.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "Dishes without the (V) mark are not listed as vegetarian here. For full ingredient details, see Olive Garden’s ",
              { text: "vegetarian and vegan menu (PDF)", href: "https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf" },
              ".",
            ],
          },
        ],
      },
      {
        id: "portion-sizes",
        heading: "Regular vs Lighter vs Lunch Portions",
        blocks: [
          {
            type: "paragraph",
            text: "Several classic entrées also come in smaller sizes. Lunch portions are served Monday to Friday from 11 AM to 3 PM. Lighter portions are served on weekdays after 3 PM and all day on weekends. Both are limited-time menus, and in our data the lighter and lunch versions of a dish have the same calories, with lunch costing $2 less.",
          },
          { type: "comparison", id: "entree-portions-chicken-parm" },
          { type: "comparison", id: "entree-portions-lasagna" },
          {
            type: "paragraph",
            text: [
              "The full three-way comparison for every dish is on the ",
              { text: "lighter portions section", href: "/#lighter-portions" },
              ", and all lunch plates are in the ",
              { text: "lunch menu section", href: "/#lunch-menu" },
              ".",
            ],
          },
        ],
      },
      {
        id: "budget-entrees",
        heading: "Budget-Friendly Dinner Entrees",
        blocks: [
          {
            type: "paragraph",
            text: "The lowest-priced classic entrées were Spaghetti with Marinara, Spaghetti with Meat Sauce, and Create Your Own Pasta at $13.99 each, and every one still includes soup or salad and two breadsticks. Toppings and add-ons raise the price, for example two Italian sausages for $4.49.",
          },
          { type: "comparison", id: "entree-budget" },
          {
            type: "paragraph",
            text: [
              "Feeding several people? A family-size pan can cost less per person. Compare them on ",
              { text: "family style meals", href: "/family-style-meals" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden classic entrées (official online menu)", url: "https://www.olivegarden.com/menu/classic-entrees" },
      { label: "Olive Garden vegetarian and vegan menu (PDF)", url: "https://media.olivegarden.com/en_us/pdf/olive-garden-veg-vegan.pdf" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "What comes with an Olive Garden entree?",
        answer:
          "Each classic entrée includes your choice of soup or house salad and two breadsticks. Some plates add their own side, such as spaghetti with Chicken Parmigiana or parmesan garlic broccoli with the salmon.",
      },
      {
        question: "Does every entree include soup or salad?",
        answer:
          "Every classic entrée we checked on the dine-in and pickup menu lists soup or salad and two breadsticks. The $6 take-home entrées do not include them, and the family lasagna bundle comes with a jumbo salad instead.",
      },
      {
        question: "Which Olive Garden entrees are vegetarian?",
        answer:
          "Olive Garden marks Fettuccine Alfredo, Spaghetti with Marinara, and Eggplant Parmigiana with (V). Cheese Ravioli with marinara and Create Your Own Pasta with a (V) sauce can also be ordered vegetarian.",
      },
      {
        question: "What types of dishes are included in Olive Garden's Classic Entrees menu?",
        answer:
          "Most of the 28 items are pasta: Alfredo dishes, spaghetti, lasagna, baked ziti, ravioli, carbonara, scampi, and Create Your Own Pasta. The section also has chicken plates such as Chicken Parmigiana and Stuffed Chicken Marsala, seafood such as Herb-Grilled Salmon, steak dishes such as the 6 oz. Sirloin, the vegetarian Eggplant Parmigiana, the Tour of Italy combination plate, and the Family-Style Lasagna Bundle.",
      },
      {
        question: "Which classic entrees are the most affordable?",
        answer:
          "Spaghetti with Marinara, Spaghetti with Meat Sauce, and Create Your Own Pasta were $13.99 each for online pickup when we checked in November 2026. Prices vary by location.",
      },
    ],
    related: [
      { categoryId: "lunch-menu", text: "Smaller plates at lunch prices, Monday to Friday until 3 PM." },
      { categoryId: "lighter-portions", text: "Smaller dinner plates on weekday evenings and weekends." },
      { categoryId: "amazing-alfredos", text: "Every Alfredo dish compared in one place." },
      { categoryId: "family-style-meals", text: "Pans and bundles that feed 4 to 12 at home." },
    ],
  },

  /* =====================================================================
   * 4. BUY ONE TAKE ONE  (preview, promotion page: no ratings or photo cards)
   * ===================================================================== */
  {
    categoryId: "buy-one-take-one",
    primaryKeyword: "olive garden buy one take one",
    menuTitle: "Olive Garden Buy One Take One",
    secondaryKeywords: [
      "olive garden buy one take one deal",
      "olive garden buy one get one",
      "olive garden $6 take home entrees",
      "olive garden take home meals",
      "does olive garden still offer buy one take one",
    ],
    searchIntent: "Find out whether Buy One Take One is available today and how the current $6 Take Home offer works.",
    metaTitle: "Olive Garden Buy One Take One Deal & $6 Take Home 2026",
    metaDescription:
      "Find out whether Olive Garden Buy One Take One is available, how the deal works, and what to know about $6 Take Home entrees.",
    h1: "Olive Garden Buy One Take One Deal 2026",
    intro: [
      "Short answer: no. When we checked Olive Garden’s official Buy One Take One page in November 2026, it said the promotion is not currently available.",
      "The take-home offer listed now is called $6 Take Home: buy any entrée and add a chilled Fettuccine Alfredo, Five Cheese Ziti al Forno, or Spaghetti with Meat Sauce to take home for $6. Below is how the old deal worked, the current rules, and which dishes qualify.",
    ],
    contentReviewedAt: REVIEWED,
    showRatings: false,
    featuredOfferingIds: [],
    tableHeading: "Is Olive Garden Buy One Take One Available Now?",
    tableIntro: [
      "Not as of November 2026. Olive Garden’s Buy One Take One page still exists, but it shows a notice that the promotion is not currently available. The table shows the dishes from that promotion and their status in our latest check: three are part of the current $6 Take Home offer, and four are not offered as take-home dishes now.",
    ],
    tableCaption: "Buy One Take One dishes: current take-home status",
    priceNotes: [
      "$6 is the add-on price for a take-home entrée when you buy any entrée (online pickup, checked in November 2026). Olive Garden notes that prices vary by location.",
      "Chicken Parmigiana and Lasagna Classico are still on the regular menu as classic entrées, just not as $6 take-home dishes. Rigatoni alla Vodka and Four-Cheese Manicotti were not on the online menu we checked.",
    ],
    nutritionNotes: ["Olive Garden does not publish calories for the take-home portions."],
    comparisons: [
      {
        id: "take-home-vs-regular",
        caption: "$6 Take Home dishes vs the same dishes as regular entrées",
        columns: [{ kind: "category", label: "How it is sold" }, { kind: "price" }, { kind: "serving", label: "What you get" }],
        rows: [
          { offeringId: "buy-one-take-one--fettuccine-alfredo", label: "Fettuccine Alfredo (take home)" },
          { offeringId: "classic-entrees--fettuccine-alfredo", label: "Fettuccine Alfredo (entrée)" },
          { offeringId: "buy-one-take-one--five-cheese-ziti-al-forno", label: "Five Cheese Ziti al Forno (take home)" },
          { offeringId: "classic-entrees--five-cheese-ziti-al-forno", label: "Five Cheese Ziti al Forno (entrée)" },
          { offeringId: "buy-one-take-one--spaghetti-with-meat-sauce", label: "Spaghetti with Meat Sauce (take home)" },
          { offeringId: "classic-entrees--spaghetti-with-meat-sauce", label: "Spaghetti with Meat Sauce (entrée)" },
        ],
        notes: [
          "Regular entrées include soup or salad and two breadsticks; take-home dishes do not. Olive Garden does not state the size of a take-home portion.",
        ],
      },
    ],
    sections: [
      {
        id: "how-it-worked",
        heading: "How the Buy One Take One Deal Works",
        blocks: [
          {
            type: "paragraph",
            text: "Buy One Take One was a limited-time promotion. The official page we checked still shows its old layout: you ordered an entrée to eat now with soup or salad and breadsticks, and chose a second entrée to take home for later. The dishes shown included Rigatoni alla Vodka and Four-Cheese Manicotti with Marinara.",
          },
          {
            type: "note",
            text: [
              "Prices quoted for Buy One Take One on other websites (for example “from $14.99”) come from earlier campaigns and are not current offers. If the promotion returns, Olive Garden announces it on its ",
              { text: "specials page", href: "https://www.olivegarden.com/specials" },
              ".",
            ],
          },
        ],
      },
      {
        id: "six-dollar-take-home",
        heading: "Olive Garden $6 Take Home Entrees",
        blocks: [
          {
            type: "paragraph",
            text: "The current offer works as an add-on. These are the rules as listed on Olive Garden’s take-home offer page:",
          },
          {
            type: "list",
            items: [
              "Buy any entrée online, by phone, or in the restaurant, then add a take-home entrée for $6.",
              "The take-home dish is freshly prepared and chilled, so you heat it later.",
              "It comes without soup, salad, or breadsticks, and substitutions are not allowed.",
              "To go: one take-home entrée per entrée purchased. Dine-in: up to five per entrée.",
              "Offered at participating restaurants in the continental U.S. (not Times Square) and Canada. Prices vary by location.",
            ],
          },
        ],
      },
      {
        id: "eligible-items",
        heading: "Eligible Take Home Menu Items",
        blocks: [
          {
            type: "paragraph",
            text: "Three dishes qualified in our check: Fettuccine Alfredo, Five Cheese Ziti al Forno, and Spaghetti with Meat Sauce. As regular entrées they cost $13.99 to $19.29 and include soup or salad, so the $6 take-home version is a smaller add-on rather than the same meal.",
          },
          { type: "comparison", id: "take-home-vs-regular" },
        ],
      },
      {
        id: "boto-vs-take-home",
        heading: "Buy One Take One vs $6 Take Home",
        blocks: [
          {
            type: "list",
            items: [
              "Status: Buy One Take One is not currently available; $6 Take Home was listed as a current offer with no end date posted (November 2026).",
              "How you pay: Buy One Take One was promoted as one combined offer; $6 Take Home is a $6 add-on to an entrée you buy.",
              "Choices: Buy One Take One showed its own list of dishes; $6 Take Home is limited to the three dishes above.",
              "What comes with it: the old page showed soup or salad and breadsticks with the entrée you eat at the restaurant; the $6 take-home dish itself comes chilled, without soup, salad, or breadsticks.",
            ],
          },
        ],
      },
      {
        id: "save-money",
        heading: "How to Save Money at Olive Garden",
        blocks: [
          {
            type: "paragraph",
            text: "These lower-priced options were listed on Olive Garden’s official menu and specials pages in our November 2026 check:",
          },
          {
            type: "list",
            items: [
              ["Weekday lunch: smaller plates from $11.49, Monday to Friday until 3 PM. See the ", { text: "lunch menu section", href: "/#lunch-menu" }, "."],
              "Soup, salad, and breadsticks at a weekday lunch price of $9.99 instead of $13.49 at dinner.",
              "Lighter portions from $13.49 on weekday evenings and weekends.",
              "Never-Ending Pasta Bowl, listed as a limited-time special from $14.99.",
              ["The lowest-priced dinner entrées at $13.99, listed on ", { text: "classic entrées", href: "/classic-entrees" }, "."],
            ],
          },
          {
            type: "paragraph",
            text: "We do not list coupon codes, because we could not verify them with an official source.",
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Buy One Take One page (official)", url: "https://www.olivegarden.com/specials/buy-one-take-one" },
      { label: "Olive Garden $6 Take Home offer (official)", url: "https://www.olivegarden.com/specials/take-home-offer" },
      { label: "Olive Garden specials (official)", url: "https://www.olivegarden.com/specials" },
    ],
    extraSource: { label: "Olive Garden $6 Take Home offer (official)", url: "https://www.olivegarden.com/specials/take-home-offer" },
    faqs: [
      {
        question: "Does Olive Garden still have Buy One Take One?",
        answer:
          "Not as of November 2026. Olive Garden’s official Buy One Take One page says the promotion is not currently available. The current take-home offer is $6 Take Home.",
      },
      {
        question: "How does Olive Garden's $6 Take Home offer work?",
        answer:
          "Buy any entrée and add a chilled take-home entrée for $6. You can add one per entrée to go, or up to five per entrée when dining in. The take-home dish has no soup, salad, or breadsticks.",
      },
      {
        question: "Can you order a $6 Take Home entree by itself?",
        answer:
          "No. Olive Garden describes it as an add-on: you have to buy an entrée to get the $6 take-home price.",
      },
      {
        question: "Which entrees qualify for the offer?",
        answer:
          "Fettuccine Alfredo, Five Cheese Ziti al Forno, and Spaghetti with Meat Sauce were the eligible take-home dishes in November 2026. No substitutions are allowed.",
      },
      {
        question: "Is Buy One Take One the same as $6 Take Home?",
        answer:
          "No. Buy One Take One was an earlier promotion that is not available now. $6 Take Home is the current add-on offer with three eligible dishes.",
      },
    ],
    related: [
      { categoryId: "classic-entrees", text: "Regular prices of the dishes you can add a take-home entrée to." },
      { categoryId: "lunch-menu", text: "Lower weekday lunch prices, Monday to Friday until 3 PM." },
      { categoryId: "amazing-alfredos", text: "Fettuccine Alfredo, one of the take-home dishes, in every size." },
      { categoryId: "family-style-meals", text: "Take-home pans and bundles for 4 to 12 people." },
    ],
  },

  /* =====================================================================
   * 5. AMAZING ALFREDOS  (preview)
   * ===================================================================== */
  {
    categoryId: "amazing-alfredos",
    primaryKeyword: "olive garden alfredo menu",
    menuTitle: "Olive Garden Alfredo Menu",
    secondaryKeywords: [
      "olive garden alfredo prices",
      "olive garden chicken alfredo",
      "olive garden shrimp alfredo",
      "olive garden fettuccine alfredo",
      "olive garden spicy alfredo",
      "olive garden alfredo calories",
      "olive garden extra alfredo sauce",
    ],
    searchIntent: "Compare every Olive Garden Alfredo dish by protein, price, calories, and size, including extra sauce.",
    metaTitle: "Olive Garden Alfredo Menu with Prices & Calories 2026",
    metaDescription:
      "Compare Olive Garden Alfredo dishes, including chicken, shrimp and fettuccine Alfredo, with prices, calories and portion options.",
    h1: "Olive Garden Alfredo Menu with Prices 2026",
    intro: [
      "Olive Garden’s Amazing Alfredos section has five dishes, from Fettuccine Alfredo at $17.49 to Chicken Tortelloni Alfredo at $23.99 for online pickup. Chicken Alfredo was $21.79.",
      "All of them use Olive Garden’s alfredo sauce of parmesan, cream, garlic, and butter. This page compares the dishes, explains the limited-time Spicy Alfredo, and shows Alfredo in every size, from lunch plates to family pans and extra sauce.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Amazing Alfredos Menu Prices and Calories",
    tableCaption: "Olive Garden Amazing Alfredos: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Chicken Tortelloni Alfredo can also be ordered with shrimp ($25.79, 1,870 calories).",
      "Every Alfredo entrée includes soup or salad and two breadsticks.",
    ],
    nutritionNotes: [
      "Chicken Alfredo is listed at 1,480 calories with grilled chicken and 1,710 with crispy chicken fritta.",
    ],
    featuredOfferingIds: [
      "amazing-alfredos--chicken-alfredo",
      "amazing-alfredos--fettuccine-alfredo",
      "amazing-alfredos--shrimp-alfredo",
      "amazing-alfredos--seafood-alfredo",
      "amazing-alfredos--chicken-tortelloni-alfredo",
    ],
    featuredHeading: "Alfredo Dishes with Photos",
    comparisons: [
      {
        id: "alfredo-dishes",
        caption: "Olive Garden Alfredo dishes compared",
        columns: [
          { kind: "text", label: "Pasta", key: "pasta" },
          { kind: "text", label: "Topped with", key: "protein" },
          { kind: "price" },
          { kind: "priceDifference", label: "Price vs Fettuccine Alfredo", baseRow: 0 },
          { kind: "calories" },
        ],
        rows: [
          { offeringId: "amazing-alfredos--fettuccine-alfredo", text: { pasta: "Fettuccine", protein: "No meat (V)" } },
          { offeringId: "amazing-alfredos--chicken-alfredo", text: { pasta: "Fettuccine", protein: "Sliced grilled chicken" } },
          { offeringId: "amazing-alfredos--shrimp-alfredo", text: { pasta: "Fettuccine", protein: "Sautéed shrimp" } },
          { offeringId: "amazing-alfredos--seafood-alfredo", text: { pasta: "Fettuccine", protein: "Sautéed shrimp and scallops" } },
          { offeringId: "amazing-alfredos--chicken-tortelloni-alfredo", label: "Chicken Tortelloni Alfredo", option: "Chicken Tortelloni Alfredo", text: { pasta: "Asiago-filled tortelloni, baked", protein: "Sliced grilled chicken" } },
          { offeringId: "amazing-alfredos--chicken-tortelloni-alfredo", label: "Shrimp Tortelloni Alfredo", option: "Shrimp Tortelloni Alfredo", text: { pasta: "Asiago-filled tortelloni, baked", protein: "Shrimp" } },
          { offeringId: "classic-entrees--spicy-alfredo-fettuccine", label: "Spicy Alfredo Fettuccine (limited time)", text: { pasta: "Fettuccine", protein: "No meat" } },
          { offeringId: "classic-entrees--steak-gorgonzola-alfredo", label: "Steak Gorgonzola Alfredo", text: { pasta: "Fettuccine", protein: "Grilled sirloin tips, gorgonzola, spinach" } },
        ],
        notes: [
          "Spicy Alfredo Fettuccine and Steak Gorgonzola Alfredo are listed in Olive Garden’s Classic Entrées section, not under Amazing Alfredos.",
        ],
      },
      {
        id: "alfredo-spicy-vs-regular",
        caption: "Spicy Alfredo vs regular Fettuccine Alfredo (dinner)",
        columns: [{ kind: "price" }, { kind: "calories" }, { kind: "caloriesDifference", label: "Calories vs regular", baseRow: 0 }],
        rows: [
          { offeringId: "classic-entrees--fettuccine-alfredo", label: "Fettuccine Alfredo" },
          { offeringId: "classic-entrees--spicy-alfredo-fettuccine", label: "Spicy Alfredo Fettuccine" },
        ],
      },
      {
        id: "alfredo-portions",
        caption: "Alfredo in dinner, lighter, and lunch sizes",
        columns: [{ kind: "category", label: "Menu" }, { kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "classic-entrees--fettuccine-alfredo", label: "Fettuccine Alfredo, dinner" },
          { offeringId: "lighter-portions--fettuccine-alfredo", label: "Fettuccine Alfredo, lighter" },
          { offeringId: "lunch-menu--fettuccine-alfredo", label: "Fettuccine Alfredo, lunch" },
          { offeringId: "classic-entrees--spicy-alfredo-fettuccine", label: "Spicy Alfredo, dinner" },
          { offeringId: "lighter-portions--spicy-alfredo-fettuccine", label: "Spicy Alfredo, lighter" },
          { offeringId: "lunch-menu--spicy-alfredo-fettuccine", label: "Spicy Alfredo, lunch" },
        ],
      },
      {
        id: "alfredo-family",
        caption: "Family-size Alfredo pans and bundle",
        columns: [
          { kind: "serving", label: "Serves" },
          { kind: "price" },
          { kind: "pricePerServing", label: "Per person (6 people)" },
          { kind: "calories", label: "Calories (whole pan)" },
        ],
        rows: [
          { offeringId: "family-style-meals--fettuccine-alfredo", label: "Fettuccine Alfredo pan", option: "Pan", servings: 6 },
          { offeringId: "family-style-meals--fettuccine-alfredo", label: "Fettuccine Alfredo pan with broccoli", option: "Pan with broccoli", servings: 6 },
          { offeringId: "family-style-meals--chicken-alfredo", label: "Chicken Alfredo pan", option: "Pan, grilled chicken alfredo", servings: 6 },
          { offeringId: "family-style-meals--shrimp-alfredo", label: "Shrimp Alfredo pan", servings: 6 },
          { offeringId: "family-style-meals--chicken-tortelloni-alfredo", label: "Chicken Tortelloni Alfredo pan", servings: 6 },
          { offeringId: "family-style-meals--family-style-chicken-alfredo-bundle", label: "Chicken Alfredo bundle (with salad and 12 breadsticks)", servings: 6 },
        ],
        notes: ["Per-person prices use the upper number of the official “serves 4-6” range."],
      },
      {
        id: "alfredo-sauce",
        caption: "Extra Alfredo sauce",
        columns: [{ kind: "category", label: "Menu" }, { kind: "serving", label: "Size" }, { kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "sides-sauces-and-extras--side-of-alfredo-sauce--large", label: "Side of Alfredo Sauce (Large)" },
          { offeringId: "catering--alfredo-dipping-sauce", label: "Alfredo Dipping Sauce (catering)" },
          { offeringId: "appetizers--dipping-sauces-with-breadsticks", label: "Dipping Sauces with Breadsticks (regular)", option: "Regular sauce with 4 breadsticks (serves 2)" },
        ],
        notes: [
          "Dipping Sauces with Breadsticks lets you choose alfredo or another sauce; its calories are a calculated range for all sauces (regular alfredo sauce: 440 calories).",
        ],
      },
    ],
    sections: [
      {
        id: "alfredo-dishes-compared",
        heading: "Olive Garden Alfredo Dishes Compared",
        blocks: [
          {
            type: "paragraph",
            text: "The main difference between the Alfredo dishes is what goes on top of the fettuccine. Adding grilled chicken to Fettuccine Alfredo costs $4.30 more as a menu item, and shrimp $5.00 more (our calculation from the listed prices). Chicken Tortelloni Alfredo is different: the tortelloni are filled with asiago and baked in alfredo under Italian cheeses and breadcrumbs, which makes it the highest-calorie dish in this group at 1,980.",
          },
          { type: "comparison", id: "alfredo-dishes" },
        ],
      },
      {
        id: "spicy-vs-regular",
        heading: "Spicy Alfredo vs Regular Alfredo",
        blocks: [
          {
            type: "paragraph",
            text: "Spicy Alfredo is a limited-time sauce: Olive Garden’s classic alfredo of parmesan, cream, butter, and garlic, warmed up with Calabrian peppers. Spicy Alfredo Fettuccine costs the same as regular Fettuccine Alfredo at dinner ($17.49) and has 110 more calories (calculated).",
          },
          { type: "comparison", id: "alfredo-spicy-vs-regular" },
          {
            type: "list",
            items: [
              "Chicken Alfredo can be ordered with the spicy alfredo sauce instead of the regular one.",
              "Olive Garden marks Spicy Alfredo as “last chance” on its Never-Ending Pasta Bowl page, so it may not be available for long.",
              "Fettuccine Alfredo is marked (V) for vegetarian; the spicy version is not marked (V) on the menu we checked.",
            ],
          },
        ],
      },
      {
        id: "alfredo-portions",
        heading: "Alfredo Lunch and Lighter Portions",
        blocks: [
          {
            type: "paragraph",
            text: "Fettuccine Alfredo and Spicy Alfredo Fettuccine also come as smaller plates. The lunch and lighter versions have the same calories; lunch is $2 less but is served only Monday to Friday until 3 PM, while lighter portions are served on weekday evenings and all day on weekends. Chicken Alfredo, Shrimp Alfredo, and Seafood Alfredo were not on the lunch or lighter menus we checked.",
          },
          { type: "comparison", id: "alfredo-portions" },
        ],
      },
      {
        id: "family-alfredo",
        heading: "Family Size Alfredo Meals",
        blocks: [
          {
            type: "paragraph",
            text: [
              "For a group, Alfredo comes in family-size pans for 4 to 6 people and in the Chicken Alfredo bundle, which adds a jumbo house salad, 12 breadsticks, and alfredo sauce on the side. Other family dishes are compared on ",
              { text: "family style meals", href: "/family-style-meals" },
              ".",
            ],
          },
          { type: "comparison", id: "alfredo-family" },
        ],
      },
      {
        id: "alfredo-sauce-add-ons",
        heading: "Alfredo Sauce and Extra Add-Ons",
        blocks: [
          {
            type: "paragraph",
            text: "Want more sauce? The large Side of Alfredo Sauce (V) is one pint for $11.29 and does not include breadsticks. The catering Alfredo Dipping Sauce is the same price and is listed as serving 8.",
          },
          { type: "comparison", id: "alfredo-sauce" },
          {
            type: "list",
            items: [
              "Chicken Alfredo add-ons listed on the menu include broccoli ($3.79) and grilled shrimp ($5.29).",
              "On Chicken Parmigiana and Eggplant Parmigiana, you can swap the spaghetti for fettuccine alfredo for $3.79.",
              "Cheese Ravioli can be topped with alfredo instead of marinara or meat sauce for $2.79.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Amazing Alfredos (official online menu)", url: "https://www.olivegarden.com/menu/amazing-alfredos" },
      { label: "Olive Garden Never-Ending Pasta Bowl (official)", url: "https://www.olivegarden.com/specials/never-ending-pasta-bowl" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "How much is Chicken Alfredo at Olive Garden?",
        answer:
          "Chicken Alfredo was $21.79 for online pickup when we checked in November 2026, with soup or salad and two breadsticks. A family-size pan for 4 to 6 was $66.99. Prices vary by location.",
      },
      {
        question: "What Alfredo dishes does Olive Garden serve?",
        answer:
          "The Amazing Alfredos section lists Fettuccine Alfredo, Chicken Alfredo, Shrimp Alfredo, Seafood Alfredo, and Chicken Tortelloni Alfredo (also with shrimp). Spicy Alfredo Fettuccine (limited time) and Steak Gorgonzola Alfredo are on the classic entrée menu.",
      },
      {
        question: "What is the difference between regular and spicy Alfredo?",
        answer:
          "Spicy Alfredo is the classic parmesan, cream, butter, and garlic sauce with Calabrian peppers added. At dinner, Spicy Alfredo Fettuccine costs the same as Fettuccine Alfredo and has 1,330 calories instead of 1,220. It is a limited-time item.",
      },
      {
        question: "Does Olive Garden offer smaller Alfredo portions?",
        answer:
          "Yes. Fettuccine Alfredo and Spicy Alfredo come as lunch plates ($11.49, weekdays until 3 PM) and lighter portions ($13.49, weekday evenings and weekends), each with 920 or 1,000 calories.",
      },
      {
        question: "Can you order extra Alfredo sauce?",
        answer:
          "Yes. A large Side of Alfredo Sauce (one pint) was $11.29 with 1,750 calories, and the catering Alfredo Dipping Sauce for about 8 people costs the same.",
      },
    ],
    related: [
      { categoryId: "family-style-meals", text: "Alfredo pans and the Chicken Alfredo bundle for 4 to 6." },
      { categoryId: "lunch-menu", text: "Lunch-size Alfredo plates, Monday to Friday until 3 PM." },
      { categoryId: "lighter-portions", text: "Smaller Alfredo plates for evenings and weekends." },
      { categoryId: "sides-sauces-and-extras", text: "Large alfredo sauce and other extras." },
      { categoryId: "classic-entrees", text: "Every regular dinner entrée with prices and calories." },
      { categoryId: "create-your-own-pasta", text: "Build your own pasta plate with your choice of sauce." },
    ],
  },
  /* =====================================================================
   * 6. SOUPS, SALAD AND BREADSTICKS  (Batch 2, preview)
   * ===================================================================== */
  {
    categoryId: "soups-salad-and-breadsticks",
    primaryKeyword: "olive garden soup salad and breadsticks",
    menuTitle: "Olive Garden Soup, Salad and Breadsticks",
    secondaryKeywords: [
      "olive garden unlimited soup salad and breadsticks",
      "olive garden soup and salad price",
      "olive garden soup and salad lunch",
      "olive garden soup menu",
      "olive garden breadsticks calories",
      "olive garden soup and salad on weekends",
      "olive garden zuppa toscana",
      "olive garden chicken and gnocchi soup",
      "olive garden minestrone",
      "olive garden pasta e fagioli",
    ],
    searchIntent: "Find the current soup, salad and breadsticks price, the four soups, their calories, and when the unlimited weekday offer and refills apply.",
    metaTitle: "Olive Garden Soup Salad and Breadsticks Prices 2026",
    metaDescription:
      "Explore Olive Garden soup, salad and breadsticks prices, soup choices, calories, unlimited meal options and lunch availability.",
    h1: "Olive Garden Soup Salad and Breadsticks Prices 2026",
    intro: [
      "Olive Garden’s soup, salad and breadsticks meal was $13.49 for online pickup when we checked in November 2026. On weekdays until 3 PM, the same meal is sold as a limited-time Never-Ending Soup, Salad & Breadsticks offer for $9.99, and refills on that offer are for dine-in guests only.",
      "You pick one of four homemade soups: Chicken & Gnocchi, Pasta e Fagioli, Minestrone, or Zuppa Toscana. Below are both prices, every soup with its calories, and the rules for refills, weekends, and to-go orders.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Olive Garden Soup Salad and Breadsticks Menu Prices",
    tableIntro: [
      "Olive Garden’s Soups, Salad & Breadsticks section lists the full meal, its weekday lunch version, and the parts on their own: a bowl of soup, a house salad, breadsticks, and breadsticks with a dipping sauce.",
    ],
    tableCaption: "Olive Garden Soups, Salad and Breadsticks: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "The Weekday Lunch Special ($9.99) is a limited-time offer, Monday to Friday until 3 PM. At other times the meal is $13.49.",
      "Our Famous House Salad ($9.29) comes with two breadsticks. Breadsticks are sold by 6 ($4.99) or 12 ($7.29), baked or ready to bake at home.",
      "Dipping Sauces with Breadsticks is $5.29 for a regular sauce with 4 breadsticks or $7.29 for a large 8 oz sauce with 8 breadsticks.",
    ],
    nutritionNotes: [
      "The meal’s official 400–520 calories count the house salad with dressing (150), one bowl of soup (110–230), and one breadstick (140). Each extra breadstick adds 140 calories.",
      "Calories for 6 or 12 breadsticks and for breadsticks with sauce are our calculations from the official per-breadstick and per-sauce values.",
    ],
    featuredOfferingIds: [
      "soups-salad-and-breadsticks--soup-salad-and-breadsticks",
      "soups-salad-and-breadsticks--homemade-soups",
      "soups-salad-and-breadsticks--famous-house-salad",
      "soups-salad-and-breadsticks--breadsticks",
      "soups-salad-and-breadsticks--dipping-sauces-with-breadsticks",
    ],
    featuredHeading: "Soups, Salad and Breadsticks with Photos",
    comparisons: [
      {
        id: "soup-salad-lunch-vs-regular",
        caption: "Soup, salad and breadsticks: weekday lunch price vs regular price",
        columns: [
          { kind: "price" },
          { kind: "refDifference", measure: "price", label: "Lunch vs regular", baseRef: "regular", percent: true },
          { kind: "calories" },
          { kind: "text", label: "When", key: "when" },
        ],
        rows: [
          {
            offeringId: "soups-salad-and-breadsticks--weekday-lunch-special",
            label: "Never-Ending Soup, Salad & Breadsticks (weekday lunch)",
            refs: { regular: { offeringId: "soups-salad-and-breadsticks--soup-salad-and-breadsticks" } },
            text: { when: "Mon–Fri until 3 PM, limited time" },
          },
          {
            offeringId: "soups-salad-and-breadsticks--soup-salad-and-breadsticks",
            label: "Soup, Salad & Breadsticks (regular)",
            text: { when: "Listed without a time limit" },
          },
        ],
        notes: [
          "Both versions include the house salad, a choice of four soups, and breadsticks. The calorie range is the same because the meal is the same; only the price and the time window differ.",
        ],
      },
      {
        id: "soup-sizes",
        caption: "Soup and salad sizes: one bowl, family containers, and the jumbo salad",
        columns: [
          { kind: "serving", label: "Size" },
          { kind: "price" },
          { kind: "pricePerServing", label: "Per serving" },
          { kind: "calories", label: "Calories (whole order)" },
        ],
        rows: [
          { offeringId: "soups-salad-and-breadsticks--homemade-soups", label: "Homemade Soups (one bowl)", servings: 1 },
          { offeringId: "family-style-meals--homemade-soups", label: "Homemade Soups, half gallon", servings: 6 },
          { offeringId: "family-style-meals--homemade-soups--large", label: "Homemade Soups, one gallon", servings: 12 },
          { offeringId: "family-style-meals--famous-house-salad", label: "Our Famous Jumbo House Salad with 12 breadsticks", servings: 6 },
        ],
        notes: [
          "Per-serving prices divide the price by Olive Garden’s own serving count (one bowl, serves 6, or serves 12). The family containers are listed on both the Family Style and the Catering menus at the same prices.",
          "You choose one soup per container, so the calorie range depends on the soup.",
        ],
      },
    ],
    optionTables: [
      {
        id: "soups-compared",
        caption: "Olive Garden’s four homemade soups compared",
        rows: [
          {
            optionId: "create-your-own-pasta--option--first-course--minestrone-soup",
            label: "Minestrone (V)",
            text: { inside: "Vegetables, beans, and pasta in a tomato broth", style: "Brothy, vegetarian" },
          },
          {
            optionId: "create-your-own-pasta--option--first-course--pasta-e-fagioli-soup",
            label: "Pasta e Fagioli",
            text: { inside: "White and red beans, ground beef, tomatoes, and small tubetti pasta", style: "Brothy, with beef" },
          },
          {
            optionId: "create-your-own-pasta--option--first-course--zuppa-toscana-soup",
            label: "Zuppa Toscana",
            text: { inside: "Spicy Italian sausage, kale, and russet potatoes", style: "Creamy; made without gluten-containing ingredients" },
          },
          {
            optionId: "create-your-own-pasta--option--first-course--chicken-gnocchi-soup",
            label: "Chicken & Gnocchi",
            text: { inside: "Roasted chicken, gnocchi, and spinach", style: "Creamy" },
          },
        ],
        columns: [
          { kind: "text", label: "What’s in it", key: "inside" },
          { kind: "text", label: "Style", key: "style" },
          { kind: "calories", label: "Calories (one bowl)" },
          {
            kind: "caloriesPlus",
            label: "Meal with salad and 1 breadstick",
            add: [
              { optionId: "create-your-own-pasta--option--first-course--famous-house-salad" },
              { optionId: "create-your-own-pasta--option--first-course--2-breadsticks", count: 1 },
            ],
          },
        ],
        notes: [
          "Soup calories are Olive Garden’s per-bowl values from its nutrition panel. The meal column adds the house salad with dressing (150) and one breadstick (140), the same parts Olive Garden uses for its 400–520 meal range.",
          "Ingredients are summarized from Olive Garden’s menu descriptions. Check the official allergen information if you have a food allergy.",
        ],
      },
    ],
    sections: [
      {
        id: "unlimited-soup-salad-breadsticks",
        heading: "Unlimited Soup Salad and Breadsticks",
        blocks: [
          {
            type: "paragraph",
            text: "The unlimited version is Olive Garden’s Never-Ending Soup, Salad & Breadsticks. On the official specials page we checked, it cost $9.99, ran Monday to Friday until 3 PM, was marked as a limited-time offer, and allowed refills for dine-in guests only.",
          },
          {
            type: "list",
            items: [
              "What you get: Olive Garden’s Famous House Salad, a bowl of one of the four homemade soups, and warm breadsticks.",
              "Refills: dine-in only for the $9.99 offer. A pickup or delivery order does not come with refills.",
              "Add-on: the weekday lunch listing also offers a $6 Take Home entrée to take home chilled.",
              "Outside the weekday lunch window, the meal is listed at $13.49. The pages we checked do not say whether refills are included at that price, so ask your server before you order.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "Want the take-home add-on? The rules and eligible dishes are on our ",
              { text: "Buy One Take One and $6 Take Home page", href: "/buy-one-take-one" },
              ".",
            ],
          },
        ],
      },
      {
        id: "lunch-vs-regular-price",
        heading: "Lunch Price vs Regular Price",
        blocks: [
          {
            type: "paragraph",
            text: "The lunch offer and the regular meal are the same food at two prices. Ordering on a weekday before 3 PM saves $3.50 compared with the $13.49 price, about 26% (our calculation from the listed prices).",
          },
          { type: "comparison", id: "soup-salad-lunch-vs-regular" },
          {
            type: "note",
            text: "One official listing for the weekday lunch special shows 11 AM to 2:30 PM. Olive Garden’s specials page, the lunch menu listing, and the restaurant lunch hours we checked all say until 3 PM, so we use 3 PM. Ask your restaurant if you plan to arrive close to that time.",
          },
          {
            type: "paragraph",
            text: [
              "If you want a lunch plate instead of soup and salad, the ",
              { text: "Olive Garden lunch menu", href: "/lunch-menu" },
              " lists lunch-size entrées from $11.49 that also come with soup or salad and breadsticks.",
            ],
          },
        ],
      },
      {
        id: "soups-compared",
        heading: "Olive Garden Soups Compared",
        blocks: [
          {
            type: "paragraph",
            text: "Two of the soups are brothy and two are creamy. Minestrone is the only vegetarian one and the lowest in calories at 110 per bowl. Zuppa Toscana is made without gluten-containing ingredients, and Chicken & Gnocchi has the most calories at 230.",
          },
          {
            type: "gallery",
            label: "Photos of the four homemade soups",
            images: [
              { src: "/images/soups-salad-and-breadsticks/minestrone.webp", alt: "A bowl of minestrone with beans, small pasta, vegetables, and tomatoes in a tomato broth, topped with grated cheese", width: 600, height: 450, credit: "Site owner", license: "AI-generated illustration supplied by the site owner", aiGenerated: true, caption: "Minestrone (V)" },
              { src: "/images/soups-salad-and-breadsticks/pasta-e-fagioli.webp", alt: "A bowl of pasta e fagioli with white beans, ground beef, small tube pasta, and tomatoes, topped with grated cheese", width: 600, height: 450, credit: "Site owner", license: "AI-generated illustration supplied by the site owner", aiGenerated: true, caption: "Pasta e Fagioli" },
              { src: "/images/soups-salad-and-breadsticks/zuppa-toscana-soup.webp", alt: "A bowl of creamy Zuppa Toscana with sausage, kale, potatoes, and bacon pieces, topped with grated cheese", width: 600, height: 450, credit: "Site owner", license: "AI-generated illustration supplied by the site owner", aiGenerated: true, caption: "Zuppa Toscana" },
              { src: "/images/soups-salad-and-breadsticks/chicken-and-gnocchi-soup.webp", alt: "A bowl of creamy chicken and gnocchi with sliced chicken, spinach, and carrots, topped with grated cheese", width: 600, height: 450, credit: "Site owner", license: "AI-generated illustration supplied by the site owner", aiGenerated: true, caption: "Chicken & Gnocchi" },
            ],
          },
          { type: "optionTable", id: "soups-compared" },
          {
            type: "paragraph",
            text: "A single bowl of soup on its own is $9.29. For a group, every soup also comes in a half-gallon container that serves 6 and a one-gallon container that serves 12.",
          },
          { type: "comparison", id: "soup-sizes" },
          {
            type: "paragraph",
            text: [
              "Planning food for a group or an office? Full trays, pasta stations, and combinations are on the ",
              { text: "catering menu", href: "/#catering" },
              ".",
            ],
          },
        ],
      },
      {
        id: "salad-breadsticks-calories",
        heading: "Salad and Breadsticks Calories",
        blocks: [
          {
            type: "paragraph",
            text: "Breadsticks add up quickly: each one has 140 calories, more than a bowl of Minestrone. Olive Garden’s official meal range counts only one breadstick, so add 140 calories for each additional one.",
          },
          {
            type: "list",
            items: [
              "House salad with dressing, as part of the meal: 150 calories.",
              "Our Famous House Salad ordered on its own ($9.29): 290 calories with dressing, plus two breadsticks.",
              "Famous House Salad without croutons, on the gluten-sensitive menu: 110 calories.",
              "Breadsticks: 140 each, 840 for six, and 1,680 for twelve (calculated from 140 each).",
              "A dipping sauce with breadsticks adds the sauce: regular marinara is 70 calories and regular alfredo 440.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "Extra sauces and other add-ons are listed under ",
              { text: "sides, sauces and extras", href: "/#sides-sauces-and-extras" },
              ". For a full calorie overview of every dish, see the ",
              { text: "full Olive Garden menu", href: "/#full-menu" },
              ".",
            ],
          },
        ],
      },
      {
        id: "refill-rules-weekends",
        heading: "Refill Rules and Weekend Availability",
        blocks: [
          { type: "subheading", text: "Refills" },
          {
            type: "list",
            items: [
              "The $9.99 Never-Ending offer: refills are for dine-in guests only (official specials page).",
              "To-go and pickup orders: both the $9.99 and $13.49 meals were on the online ordering menu for pickup, but a to-go order does not include refills.",
              "The $13.49 meal: the listings we checked do not state a refill policy. Ask your server.",
            ],
          },
          { type: "subheading", text: "Weekends and holidays" },
          {
            type: "paragraph",
            text: "The $9.99 offer is a weekday lunch deal, so it is not available on Saturday or Sunday. Olive Garden says it serves the dinner menu all day on Saturdays, Sundays, and holidays. The regular $13.49 meal was listed with no day or time limit on the online menu we checked, so that is the price to expect on weekends.",
          },
          {
            type: "note",
            text: "Limited-time offers, hours, and prices can change and vary by restaurant. We last checked the offer in November 2026.",
          },
          {
            type: "paragraph",
            text: [
              "Need a gluten-sensitive option? Where available, Olive Garden offers Zuppa Toscana or a house salad without croutons with its ",
              { text: "gluten-sensitive dishes", href: "/#gluten-sensitive" },
              ", and leaves the breadsticks off unless you ask for them.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Never-Ending Soup, Salad & Breadsticks (official specials page)", url: "https://www.olivegarden.com/specials/never-ending-soup-salad-and-breadsticks" },
      { label: "Olive Garden Soups, Salad & Breadsticks (official online menu)", url: "https://www.olivegarden.com/menu/soups-salad-breadsticks" },
      { label: "Soup AND Salad AND Breadsticks (official item page)", url: "https://www.olivegarden.com/menu/soup-and-salad-and-breadsticks/prod7290092" },
      { label: "Homemade Soups (official item page)", url: "https://www.olivegarden.com/menu/homemade-soups/prod81927" },
      { label: "Olive Garden Orlando – Millenia Mall (official location page and hours)", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
      { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden Never-Ending Soup, Salad & Breadsticks (official specials page)", url: "https://www.olivegarden.com/specials/never-ending-soup-salad-and-breadsticks" },
    faqs: [
      {
        question: "How much is unlimited soup, salad and breadsticks at Olive Garden?",
        answer:
          "The Never-Ending Soup, Salad & Breadsticks offer was $9.99 when we checked in November 2026, Monday to Friday until 3 PM, with refills for dine-in guests only. Outside that window, the same meal was $13.49. It is a limited-time offer and prices vary by location.",
      },
      {
        question: "What soups does Olive Garden serve?",
        answer:
          "Four homemade soups: Chicken & Gnocchi, Pasta e Fagioli, Minestrone (vegetarian), and Zuppa Toscana. A single bowl was $9.29, and each soup also comes in a half gallon for 6 ($20.49) or a gallon for 12 ($32.49).",
      },
      {
        question: "Which Olive Garden soup has the fewest calories?",
        answer:
          "Minestrone, at 110 calories per bowl. Pasta e Fagioli has 150, Zuppa Toscana 220, and Chicken & Gnocchi 230, according to Olive Garden’s nutrition information.",
      },
      {
        question: "Is unlimited soup and salad available on weekends?",
        answer:
          "The $9.99 Never-Ending offer is weekdays only, until 3 PM. On Saturdays and Sundays Olive Garden serves its dinner menu all day, and the regular meal was listed at $13.49 with no day or time limit. The pages we checked do not say whether that price includes refills, so ask your server.",
      },
      {
        question: "Are breadsticks included with soup and salad?",
        answer:
          "Yes. Breadsticks are part of the soup, salad and breadsticks meal at both prices. Olive Garden’s 400–520 calorie range for the meal counts one breadstick at 140 calories.",
      },
      {
        question: "Can you order soup, salad and breadsticks to go?",
        answer:
          "Yes. Both the $9.99 weekday version and the $13.49 meal were on the online ordering menu for pickup. Refills on the Never-Ending offer are for dine-in guests only, so a to-go order does not include them.",
      },
    ],
    related: [
      { categoryId: "lunch-menu", text: "Lunch-size plates and sandwiches, Monday to Friday until 3 PM." },
      { categoryId: "classic-entrees", text: "Full dinner entrées, each with soup or salad and breadsticks." },
      { categoryId: "sides-sauces-and-extras", text: "Extra sauces, sides, and add-ons for your meal." },
      { categoryId: "catering", text: "Soups, salads, and breadsticks for groups and events." },
      { categoryId: "family-style-meals", text: "Soup by the half gallon or gallon, plus the jumbo salad." },
    ],
  },

  /* =====================================================================
   * 7. LIGHTER PORTIONS  (Batch 2, preview)
   * ===================================================================== */
  {
    categoryId: "lighter-portions",
    primaryKeyword: "olive garden lighter portions menu",
    menuTitle: "Olive Garden Lighter Portions Menu",
    secondaryKeywords: [
      "olive garden lighter portions prices",
      "olive garden smaller portions",
      "olive garden lighter portions calories",
      "olive garden lighter portions vs regular",
      "olive garden lighter portions vs lunch",
      "olive garden smaller dinner entrees",
      "olive garden lighter portion chicken alfredo",
    ],
    searchIntent: "Compare Olive Garden’s smaller evening and weekend plates with regular and lunch portions by price, calories, and availability.",
    metaTitle: "Olive Garden Lighter Portions Menu with Prices 2026",
    metaDescription:
      "Compare Olive Garden lighter portions with regular and lunch portions, including menu prices, calories and potential savings.",
    h1: "Olive Garden Lighter Portions Menu with Prices 2026",
    intro: [
      "Olive Garden’s Lighter Portions are smaller versions of eight classic dishes, priced at $13.49 or $14.49 for online pickup. They are served on weekdays after 3 PM and all day on Saturday and Sunday, and each one comes with soup or salad and two breadsticks.",
      "Compared with the regular entrée, a lighter portion costs $3.99 to $6.80 less. It has the same calories as the weekday lunch plate, which is $2 cheaper but ends at 3 PM. Here are all three sizes side by side.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Olive Garden Lighter Portions Prices and Calories",
    tableCaption: "Olive Garden Lighter Portions: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Every lighter portion includes soup or salad and two breadsticks.",
      "Spaghetti & Meatballs comes with two meatballs or one Italian sausage, in meat sauce or marinara, at the same price.",
      "Spicy Alfredo Fettuccine is a limited-time dish.",
    ],
    nutritionNotes: [
      "Calories are for the plate only. The included soup or salad and breadsticks are extra: 110–230 for a bowl of soup, 150 for the house salad with dressing, and 140 per breadstick.",
    ],
    featuredOfferingIds: [
      "lighter-portions--chicken-parmigiana",
      "lighter-portions--lasagna-classico",
      "lighter-portions--fettuccine-alfredo",
      "lighter-portions--eggplant-parmigiana",
      "lighter-portions--five-cheese-ziti-al-forno",
    ],
    featuredHeading: "Lighter Portions with Photos",
    comparisons: [
      {
        id: "lighter-three-way",
        caption: "Regular, lighter, and lunch portions of the same dishes",
        columns: [
          { kind: "price", label: "Regular price", ref: "regular" },
          { kind: "calories", label: "Regular calories", ref: "regular" },
          { kind: "price", label: "Lighter price" },
          { kind: "calories", label: "Lighter calories" },
          { kind: "price", label: "Lunch price", ref: "lunch", missing: "Not on the lunch menu" },
          { kind: "calories", label: "Lunch calories", ref: "lunch", missing: "Not on the lunch menu" },
        ],
        rows: [
          {
            offeringId: "lighter-portions--chicken-parmigiana",
            refs: { regular: { offeringId: "classic-entrees--chicken-parmigiana" }, lunch: { offeringId: "lunch-menu--chicken-parmigiana" } },
          },
          {
            offeringId: "lighter-portions--lasagna-classico",
            refs: { regular: { offeringId: "classic-entrees--lasagna-classico" }, lunch: { offeringId: "lunch-menu--lasagna-classico" } },
          },
          {
            offeringId: "lighter-portions--fettuccine-alfredo",
            refs: { regular: { offeringId: "classic-entrees--fettuccine-alfredo" }, lunch: { offeringId: "lunch-menu--fettuccine-alfredo" } },
          },
          {
            offeringId: "lighter-portions--five-cheese-ziti-al-forno",
            refs: { regular: { offeringId: "classic-entrees--five-cheese-ziti-al-forno" }, lunch: { offeringId: "lunch-menu--five-cheese-ziti-al-forno" } },
          },
          {
            offeringId: "lighter-portions--eggplant-parmigiana",
            refs: { regular: { offeringId: "classic-entrees--eggplant-parmigiana" }, lunch: { offeringId: "lunch-menu--eggplant-parmigiana" } },
          },
          {
            offeringId: "lighter-portions--cheese-ravioli",
            refs: { regular: { offeringId: "classic-entrees--cheese-ravioli" }, lunch: { offeringId: "lunch-menu--cheese-ravioli" } },
          },
          {
            offeringId: "lighter-portions--spaghetti-and-meatballs",
            label: "Spaghetti & Meatballs, marinara",
            option: "Marinara & meatballs",
            refs: {
              regular: { offeringId: "classic-entrees--spaghetti-and-meatballs", option: "Spaghetti with Marinara & Meatballs" },
              lunch: { offeringId: "lunch-menu--spaghetti-and-meatballs", option: "Marinara & meatballs" },
            },
          },
          {
            offeringId: "lighter-portions--spaghetti-and-meatballs",
            label: "Spaghetti & Meatballs, meat sauce",
            option: "Meat sauce & meatballs",
            refs: {
              regular: { offeringId: "classic-entrees--spaghetti-and-meatballs", option: "Spaghetti with Meat Sauce & Meatballs" },
              lunch: { offeringId: "lunch-menu--spaghetti-and-meatballs", option: "Meat sauce & meatballs" },
            },
          },
          {
            offeringId: "lighter-portions--spicy-alfredo-fettuccine",
            label: "Spicy Alfredo Fettuccine (limited time)",
            refs: { regular: { offeringId: "classic-entrees--spicy-alfredo-fettuccine" }, lunch: { offeringId: "lunch-menu--spicy-alfredo-fettuccine" } },
          },
        ],
        notes: [
          "Regular = the dinner entrée on Olive Garden’s Classic Entrées menu. Regular Spaghetti & Meatballs has three meatballs; the lighter and lunch versions have two.",
        ],
      },
      {
        id: "lighter-vs-regular-calories",
        caption: "Lighter portion vs regular entrée: calories",
        columns: [
          { kind: "calories", label: "Regular", ref: "regular" },
          { kind: "calories", label: "Lighter" },
          { kind: "refDifference", measure: "calories", label: "Difference", baseRef: "regular", percent: true },
        ],
        rows: [
          { offeringId: "lighter-portions--lasagna-classico", refs: { regular: { offeringId: "classic-entrees--lasagna-classico" } } },
          { offeringId: "lighter-portions--five-cheese-ziti-al-forno", refs: { regular: { offeringId: "classic-entrees--five-cheese-ziti-al-forno" } } },
          { offeringId: "lighter-portions--eggplant-parmigiana", refs: { regular: { offeringId: "classic-entrees--eggplant-parmigiana" } } },
          { offeringId: "lighter-portions--chicken-parmigiana", refs: { regular: { offeringId: "classic-entrees--chicken-parmigiana" } } },
          {
            offeringId: "lighter-portions--spaghetti-and-meatballs",
            label: "Spaghetti & Meatballs, marinara",
            option: "Marinara & meatballs",
            refs: { regular: { offeringId: "classic-entrees--spaghetti-and-meatballs", option: "Spaghetti with Marinara & Meatballs" } },
          },
          { offeringId: "lighter-portions--fettuccine-alfredo", refs: { regular: { offeringId: "classic-entrees--fettuccine-alfredo" } } },
          {
            offeringId: "lighter-portions--spicy-alfredo-fettuccine",
            label: "Spicy Alfredo Fettuccine",
            refs: { regular: { offeringId: "classic-entrees--spicy-alfredo-fettuccine" } },
          },
          { offeringId: "lighter-portions--cheese-ravioli", refs: { regular: { offeringId: "classic-entrees--cheese-ravioli" } } },
        ],
        notes: ["Cheese Ravioli is listed as a calorie range (marinara or meat sauce), so no single difference is shown."],
      },
      {
        id: "lighter-vs-lunch",
        caption: "Lighter portion vs lunch plate",
        columns: [
          { kind: "price", label: "Lighter price" },
          { kind: "price", label: "Lunch price", ref: "lunch" },
          { kind: "refDifference", measure: "price", label: "Lunch vs lighter", ref: "lunch", baseRef: "main" },
          { kind: "refDifference", measure: "calories", label: "Calories", ref: "lunch", baseRef: "main" },
        ],
        rows: [
          { offeringId: "lighter-portions--chicken-parmigiana", refs: { lunch: { offeringId: "lunch-menu--chicken-parmigiana" } } },
          { offeringId: "lighter-portions--lasagna-classico", refs: { lunch: { offeringId: "lunch-menu--lasagna-classico" } } },
          { offeringId: "lighter-portions--fettuccine-alfredo", refs: { lunch: { offeringId: "lunch-menu--fettuccine-alfredo" } } },
          { offeringId: "lighter-portions--five-cheese-ziti-al-forno", refs: { lunch: { offeringId: "lunch-menu--five-cheese-ziti-al-forno" } } },
          { offeringId: "lighter-portions--eggplant-parmigiana", refs: { lunch: { offeringId: "lunch-menu--eggplant-parmigiana" } } },
          { offeringId: "lighter-portions--cheese-ravioli", refs: { lunch: { offeringId: "lunch-menu--cheese-ravioli" } } },
          {
            offeringId: "lighter-portions--spaghetti-and-meatballs",
            label: "Spaghetti & Meatballs, marinara",
            option: "Marinara & meatballs",
            refs: { lunch: { offeringId: "lunch-menu--spaghetti-and-meatballs", option: "Marinara & meatballs" } },
          },
          {
            offeringId: "lighter-portions--spicy-alfredo-fettuccine",
            label: "Spicy Alfredo Fettuccine",
            refs: { lunch: { offeringId: "lunch-menu--spicy-alfredo-fettuccine" } },
          },
        ],
      },
      {
        id: "lighter-savings",
        caption: "How much less you pay than for the regular entrée",
        columns: [
          { kind: "price", label: "Regular", ref: "regular" },
          { kind: "price", label: "Lighter" },
          { kind: "refDifference", measure: "price", label: "Lighter vs regular", baseRef: "regular", percent: true },
          { kind: "price", label: "Lunch", ref: "lunch" },
          { kind: "refDifference", measure: "price", label: "Lunch vs regular", ref: "lunch", baseRef: "regular", percent: true },
        ],
        rows: [
          {
            offeringId: "lighter-portions--chicken-parmigiana",
            refs: { regular: { offeringId: "classic-entrees--chicken-parmigiana" }, lunch: { offeringId: "lunch-menu--chicken-parmigiana" } },
          },
          {
            offeringId: "lighter-portions--five-cheese-ziti-al-forno",
            refs: { regular: { offeringId: "classic-entrees--five-cheese-ziti-al-forno" }, lunch: { offeringId: "lunch-menu--five-cheese-ziti-al-forno" } },
          },
          {
            offeringId: "lighter-portions--lasagna-classico",
            refs: { regular: { offeringId: "classic-entrees--lasagna-classico" }, lunch: { offeringId: "lunch-menu--lasagna-classico" } },
          },
          {
            offeringId: "lighter-portions--eggplant-parmigiana",
            refs: { regular: { offeringId: "classic-entrees--eggplant-parmigiana" }, lunch: { offeringId: "lunch-menu--eggplant-parmigiana" } },
          },
          {
            offeringId: "lighter-portions--cheese-ravioli",
            refs: { regular: { offeringId: "classic-entrees--cheese-ravioli" }, lunch: { offeringId: "lunch-menu--cheese-ravioli" } },
          },
          {
            offeringId: "lighter-portions--fettuccine-alfredo",
            refs: { regular: { offeringId: "classic-entrees--fettuccine-alfredo" }, lunch: { offeringId: "lunch-menu--fettuccine-alfredo" } },
          },
          {
            offeringId: "lighter-portions--spicy-alfredo-fettuccine",
            label: "Spicy Alfredo Fettuccine",
            refs: { regular: { offeringId: "classic-entrees--spicy-alfredo-fettuccine" }, lunch: { offeringId: "lunch-menu--spicy-alfredo-fettuccine" } },
          },
          {
            offeringId: "lighter-portions--spaghetti-and-meatballs",
            label: "Spaghetti & Meatballs",
            option: "Marinara & meatballs",
            refs: {
              regular: { offeringId: "classic-entrees--spaghetti-and-meatballs", option: "Spaghetti with Marinara & Meatballs" },
              lunch: { offeringId: "lunch-menu--spaghetti-and-meatballs", option: "Marinara & meatballs" },
            },
          },
        ],
        notes: [
          "Percentages are the saving as a share of the regular price. Spaghetti & Meatballs costs the same with marinara or meat sauce in every size.",
        ],
      },
    ],
    sections: [
      {
        id: "what-are-lighter-portions",
        heading: "What Are Olive Garden Lighter Portions?",
        blocks: [
          {
            type: "paragraph",
            text: "Lighter Portions is a section of Olive Garden’s menu with smaller plates of familiar dishes: Chicken Parmigiana, Lasagna Classico, Fettuccine Alfredo, Five Cheese Ziti al Forno, Spaghetti & Meatballs, Cheese Ravioli, Eggplant Parmigiana, and the limited-time Spicy Alfredo Fettuccine.",
          },
          {
            type: "list",
            items: [
              "Price: $13.49 for most dishes; $14.49 for Chicken Parmigiana, Lasagna Classico, and Spaghetti & Meatballs.",
              "Included: soup or salad and two breadsticks, the same as a regular entrée.",
              "When: weekdays after 3 PM and all day on Saturday and Sunday, according to Olive Garden’s online menu.",
              "Extras: you can swap the spaghetti on Chicken Parmigiana for fettuccine alfredo ($3.79), switch Cheese Ravioli to alfredo sauce ($2.79), or add broccoli ($2.49).",
            ],
          },
          {
            type: "paragraph",
            text: "Olive Garden does not publish portion weights. What it does publish are calories, and those show how much smaller each plate is.",
          },
          { type: "comparison", id: "lighter-three-way" },
        ],
      },
      {
        id: "lighter-vs-regular",
        heading: "Lighter Portions vs Regular Portions",
        blocks: [
          {
            type: "paragraph",
            text: "A lighter portion has about 25% to 47% fewer calories than the regular entrée (our calculation from Olive Garden’s values). Lasagna Classico drops the most by share, from 940 to 500 calories, and Five Cheese Ziti al Forno the most in calories, from 1,170 to 630. The Alfredo dishes drop the least, by about a quarter.",
          },
          { type: "comparison", id: "lighter-vs-regular-calories" },
          { type: "subheading", text: "Smaller is not the same as low-calorie" },
          {
            type: "paragraph",
            text: "A lighter plate is smaller, but some lighter dishes still have more calories than regular entrées. The lighter Spicy Alfredo Fettuccine (1,000 calories) and Fettuccine Alfredo (920) both have more than the regular Shrimp Scampi or Spaghetti with Marinara (490 each). Sauce matters more than size: cream-based Alfredo plates stay high even in the smaller version.",
          },
          {
            type: "paragraph",
            text: [
              "Want the full-size plate instead? Every regular entrée is compared on our ",
              { text: "classic entrées page", href: "/classic-entrees" },
              ", and every Alfredo dish, in every size, on the ",
              { text: "Olive Garden Alfredo menu", href: "/amazing-alfredos" },
              ".",
            ],
          },
        ],
      },
      {
        id: "lighter-vs-lunch",
        heading: "Lighter Portions vs Lunch Menu",
        blocks: [
          {
            type: "paragraph",
            text: "All eight lighter dishes are also on the weekday lunch menu, and in every case the lunch plate has exactly the same calories. Matching calories suggest the same portion, but Olive Garden does not say so directly. The difference is when you can order and what you pay: lunch is $2.00 less for every dish (calculated), but it is served only Monday to Friday until 3 PM.",
          },
          { type: "comparison", id: "lighter-vs-lunch" },
          {
            type: "list",
            items: [
              "Weekday before 3 PM: order from the lunch menu; it is the cheaper way to get the same size.",
              "Weekday after 3 PM, or any time on the weekend: lighter portions are the smaller-plate choice.",
              "Only on the lunch menu: Shrimp Scampi, plain Spaghetti, sandwiches, and flatbreads.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "See every lunch dish, the sandwiches, and the lunch hours on the ",
              { text: "Olive Garden lunch menu", href: "/lunch-menu" },
              ".",
            ],
          },
        ],
      },
      {
        id: "lighter-savings",
        heading: "How Much Money Can You Save?",
        blocks: [
          {
            type: "paragraph",
            text: "Choosing the lighter portion instead of the regular entrée saves $3.99 to $6.80 per plate at the prices we verified. Chicken Parmigiana saves the most, $6.80 or about 32%. Spaghetti & Meatballs saves the least, $3.99, but the regular plate also has one more meatball.",
          },
          { type: "comparison", id: "lighter-savings" },
          {
            type: "paragraph",
            text: "Two of the lowest-priced regular entrées, Spaghetti with Marinara and Spaghetti with Meat Sauce, cost $13.99, only 50 cents more than a $13.49 lighter portion. If price matters more than portion size, compare both before you order.",
          },
        ],
      },
      {
        id: "lighter-availability-hours",
        heading: "Lighter Portions Availability and Hours",
        blocks: [
          {
            type: "list",
            items: [
              "Monday to Friday: from 3 PM, when the lunch menu ends, until closing.",
              "Saturday and Sunday: all day.",
              "Holidays: Olive Garden serves its dinner menu all day on holidays, but the pages we checked do not say whether lighter portions are included. Ask your restaurant.",
              "Online ordering: lighter portions were on the online pickup menu. At the restaurant we checked, online orders closed 20 minutes before closing time.",
            ],
          },
          {
            type: "note",
            text: "Times were checked in November 2026. Hours, prices, and menus can differ by restaurant across the USA, so check your own location before you go.",
          },
          {
            type: "paragraph",
            text: [
              "Browse all 17 menu sections on the ",
              { text: "full Olive Garden menu", href: "/#full-menu" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Lighter Portions (official online menu)", url: "https://www.olivegarden.com/menu/lighter-portions" },
      { label: "Olive Garden Lunch-Sized Favorites (official online menu)", url: "https://www.olivegarden.com/menu/lunch-sized-favorites" },
      { label: "Olive Garden Orlando – Millenia Mall (official location page and hours)", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
      { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "What are lighter portions at Olive Garden?",
        answer:
          "They are smaller plates of eight dishes, such as Chicken Parmigiana, Lasagna Classico, and Fettuccine Alfredo, for $13.49 or $14.49 for online pickup. Each comes with soup or salad and two breadsticks.",
      },
      {
        question: "Are Olive Garden lighter portions cheaper?",
        answer:
          "Yes. A lighter portion was $3.99 to $6.80 less than the same regular entrée in November 2026, for example $14.49 instead of $21.29 for Chicken Parmigiana. The lunch plate is $2 less again, but only on weekdays until 3 PM.",
      },
      {
        question: "What is the difference between lighter and regular portions?",
        answer:
          "Size, price, and calories. A lighter plate has about 25% to 47% fewer calories than the regular entrée and costs less. Both include soup or salad and two breadsticks. Olive Garden does not publish portion weights.",
      },
      {
        question: "Are lighter portions the same as lunch portions?",
        answer:
          "They have the same calories for all eight dishes, which suggests the same size. Lunch plates cost $2 less but are served only Monday to Friday until 3 PM; lighter portions are served after 3 PM on weekdays and all day on weekends.",
      },
      {
        question: "Can you order lighter portions at dinner?",
        answer:
          "Yes. Lighter portions are a dinner-time option: weekdays after 3 PM and all day on Saturday and Sunday. Times can vary by location.",
      },
      {
        question: "Which lighter portion meals have fewer calories?",
        answer:
          "Cheese Ravioli (440–500 calories) and Lasagna Classico (500) are the lowest. Spicy Alfredo Fettuccine (1,000) and Fettuccine Alfredo (920) are the highest. Soup or salad and breadsticks are not included in these numbers.",
      },
    ],
    related: [
      { categoryId: "classic-entrees", text: "The full-size dinner versions of these dishes." },
      { categoryId: "lunch-menu", text: "The same plate sizes for $2 less, weekdays until 3 PM." },
      { categoryId: "amazing-alfredos", text: "Every Alfredo dish compared, from lunch plates to family pans." },
    ],
  },

  /* =====================================================================
   * 8. CREATE YOUR OWN PASTA  (Batch 2, preview)
   * The category has no standalone offerings: the dish is listed under
   * Classic Entrées (shared rating), and the 23 build options come from
   * content/menu/create-your-own-pasta.ts.
   * ===================================================================== */
  {
    categoryId: "create-your-own-pasta",
    primaryKeyword: "olive garden create your own pasta",
    menuTitle: "Olive Garden Create Your Own Pasta",
    secondaryKeywords: [
      "olive garden build your own pasta",
      "olive garden create your own pasta price",
      "olive garden pasta choices",
      "olive garden pasta sauces",
      "olive garden pasta toppings",
      "olive garden create your own pasta calories",
      "olive garden pasta combinations",
      "olive garden gluten-sensitive pasta",
    ],
    searchIntent: "Understand every Create Your Own Pasta choice, which ones cost extra, and what a finished order costs in dollars and calories.",
    metaTitle: "Olive Garden Create Your Own Pasta Menu & Prices 2026",
    metaDescription:
      "Build your own Olive Garden pasta with available pasta choices, sauces, protein toppings, prices, calories and meal combinations.",
    h1: "Olive Garden Create Your Own Pasta Menu 2026",
    intro: [
      "Create Your Own Pasta was $13.99 for online pickup when we checked in November 2026. That price covers one pasta, one sauce, soup or salad, and two breadsticks. Protein and broccoli toppings cost $3.79 to $6.79 extra.",
      "This page lists all 23 options with their prices and calories in separate tables, then adds them up for you in example orders.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Create Your Own Pasta Menu and Base Price",
    tableIntro: [
      "You build the plate in three steps: choose a pasta, choose a sauce, and add toppings if you want them. The pasta and the sauce are included in the base price; every topping is a paid add-on. A first course of soup or salad and two breadsticks is included, just as with Olive Garden’s other entrées.",
    ],
    tableOfferingIds: ["classic-entrees--create-your-own-pasta"],
    tableCaption: "Olive Garden Create Your Own Pasta: Base Price and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "The base price includes one pasta, one sauce, soup or salad, and two breadsticks. Toppings are extra and listed below.",
      "Create Your Own Pasta is listed in Olive Garden’s Classic Entrées section; its visitor rating is shared with that listing.",
    ],
    nutritionNotes: [
      "The official 530–1,300 calorie range covers the pasta and the sauce only. Toppings, soup or salad, and breadsticks are listed separately.",
    ],
    featuredOfferingIds: ["classic-entrees--create-your-own-pasta"],
    featuredHeading: "Create Your Own Pasta Photo",
    optionTables: [
      {
        id: "pasta-choices",
        caption: "Step 1: pasta choices (choose one, included)",
        rows: [
          { optionId: "create-your-own-pasta--option--pasta--spaghetti", text: { note: "Lowest-calorie pasta choice" } },
          { optionId: "create-your-own-pasta--option--pasta--angel-hair", text: { note: "Also used in Shrimp Scampi and Chicken Scampi" } },
          {
            optionId: "create-your-own-pasta--option--pasta--gluten-free-rotini",
            text: { note: "Made with brown rice flour; meets the FDA gluten-free definition" },
          },
          { optionId: "create-your-own-pasta--option--pasta--bucatini", text: { note: "Also used in the Calabrian Steak & Shrimp Bucatini" } },
          { optionId: "create-your-own-pasta--option--pasta--rigatoni", text: { note: "Highest-calorie pasta choice" } },
        ],
        columns: [{ kind: "price" }, { kind: "calories" }, { kind: "text", label: "Good to know", key: "note" }],
        notes: ["Olive Garden labels all five pastas vegetarian (V). Calories are for the pasta alone, without sauce."],
      },
      {
        id: "sauce-choices",
        caption: "Step 2: sauce choices (choose one, included)",
        rows: [
          { optionId: "create-your-own-pasta--option--sauce--marinara", text: { labels: "(G) (V)", note: "Lowest-calorie sauce" } },
          { optionId: "create-your-own-pasta--option--sauce--meat-sauce", text: { labels: "(G)", note: "Made with pan-seared beef and Italian sausage" } },
          { optionId: "create-your-own-pasta--option--sauce--five-cheese-marinara", text: { labels: "(V)" } },
          { optionId: "create-your-own-pasta--option--sauce--creamy-mushroom", text: { labels: "(V)", note: "Highest-calorie sauce" } },
          { optionId: "create-your-own-pasta--option--sauce--no-sauce", text: { note: "Plain pasta" } },
        ],
        columns: [
          { kind: "price" },
          { kind: "calories" },
          { kind: "text", label: "Labels", key: "labels" },
          { kind: "text", label: "Good to know", key: "note" },
        ],
        notes: [
          "(G) = made without gluten-containing ingredients and (V) = vegetarian, as labeled by Olive Garden on the Create Your Own Pasta listing.",
          "Alfredo was not one of the sauce choices on the online menu we checked. It is a choice on the separate Never-Ending Pasta Bowl promotion.",
        ],
      },
      {
        id: "topping-choices",
        caption: "Step 3: toppings (optional, extra charge)",
        rows: [
          { optionId: "create-your-own-pasta--option--topping--broccoli", text: { labels: "(V)" } },
          { optionId: "create-your-own-pasta--option--topping--three-meatballs" },
          { optionId: "create-your-own-pasta--option--topping--two-italian-sausage", text: { labels: "(G)" } },
          { optionId: "create-your-own-pasta--option--topping--one-crispy-chicken-fritta" },
          { optionId: "create-your-own-pasta--option--topping--one-grilled-chicken", text: { labels: "(G)" } },
          { optionId: "create-your-own-pasta--option--topping--16-saut-ed-shrimp", text: { labels: "(G)" } },
          { optionId: "create-your-own-pasta--option--topping--16-crispy-shrimp-fritta" },
        ],
        columns: [{ kind: "price", label: "Extra charge" }, { kind: "calories" }, { kind: "text", label: "Labels", key: "labels" }],
        notes: [
          "Crispy Shrimp Fritta is marked “last chance” on Olive Garden’s Never-Ending Pasta Bowl page, so it may not stay on the menu.",
        ],
      },
      {
        id: "first-course-choices",
        caption: "Included first course: soup or salad, plus breadsticks",
        rows: [
          { optionId: "create-your-own-pasta--option--first-course--minestrone-soup", label: "Minestrone soup" },
          { optionId: "create-your-own-pasta--option--first-course--famous-house-salad", label: "Famous House Salad (with dressing)" },
          { optionId: "create-your-own-pasta--option--first-course--pasta-e-fagioli-soup", label: "Pasta e Fagioli soup" },
          { optionId: "create-your-own-pasta--option--first-course--zuppa-toscana-soup", label: "Zuppa Toscana soup" },
          { optionId: "create-your-own-pasta--option--first-course--chicken-gnocchi-soup", label: "Chicken & Gnocchi soup" },
          { optionId: "create-your-own-pasta--option--first-course--2-breadsticks", label: "Breadsticks (2 included)" },
        ],
        columns: [{ kind: "price" }, { kind: "calories" }],
        notes: ["Choose one soup or the salad. Breadstick calories are per breadstick."],
      },
    ],
    pastaBuilds: [
      {
        id: "meal-examples",
        caption: "Create Your Own Pasta meal examples (calculated)",
        builds: [
          {
            label: "Classic marinara",
            pasta: "create-your-own-pasta--option--pasta--spaghetti",
            sauce: "create-your-own-pasta--option--sauce--marinara",
            firstCourse: "create-your-own-pasta--option--first-course--famous-house-salad",
            breadsticks: 2,
          },
          {
            label: "Meat sauce and meatballs",
            pasta: "create-your-own-pasta--option--pasta--spaghetti",
            sauce: "create-your-own-pasta--option--sauce--meat-sauce",
            toppings: ["create-your-own-pasta--option--topping--three-meatballs"],
            firstCourse: "create-your-own-pasta--option--first-course--famous-house-salad",
            breadsticks: 2,
          },
          {
            label: "Five cheese with grilled chicken",
            pasta: "create-your-own-pasta--option--pasta--rigatoni",
            sauce: "create-your-own-pasta--option--sauce--five-cheese-marinara",
            toppings: ["create-your-own-pasta--option--topping--one-grilled-chicken"],
            firstCourse: "create-your-own-pasta--option--first-course--zuppa-toscana-soup",
            breadsticks: 2,
          },
          {
            label: "Shrimp and angel hair",
            pasta: "create-your-own-pasta--option--pasta--angel-hair",
            sauce: "create-your-own-pasta--option--sauce--marinara",
            toppings: ["create-your-own-pasta--option--topping--16-saut-ed-shrimp"],
            firstCourse: "create-your-own-pasta--option--first-course--minestrone-soup",
            breadsticks: 2,
          },
          {
            label: "Creamy mushroom with crispy chicken",
            pasta: "create-your-own-pasta--option--pasta--bucatini",
            sauce: "create-your-own-pasta--option--sauce--creamy-mushroom",
            toppings: ["create-your-own-pasta--option--topping--one-crispy-chicken-fritta"],
            firstCourse: "create-your-own-pasta--option--first-course--chicken-gnocchi-soup",
            breadsticks: 2,
          },
          {
            label: "Two toppings",
            pasta: "create-your-own-pasta--option--pasta--rigatoni",
            sauce: "create-your-own-pasta--option--sauce--meat-sauce",
            toppings: ["create-your-own-pasta--option--topping--two-italian-sausage", "create-your-own-pasta--option--topping--broccoli"],
            firstCourse: "create-your-own-pasta--option--first-course--pasta-e-fagioli-soup",
            breadsticks: 2,
          },
        ],
        notes: [
          "Price = the $13.99 base price plus each topping. Plate calories = pasta + sauce + toppings. Full meal adds the soup or salad and the breadsticks shown.",
          "The base meal calories are not added on top of the pasta and sauce, because the official 530–1,300 range is the pasta and sauce itself.",
        ],
      },
      {
        id: "lower-calorie-builds",
        caption: "Lower-calorie Create Your Own Pasta combinations (calculated)",
        builds: [
          {
            label: "Lightest plate",
            pasta: "create-your-own-pasta--option--pasta--spaghetti",
            sauce: "create-your-own-pasta--option--sauce--marinara",
            firstCourse: "create-your-own-pasta--option--first-course--minestrone-soup",
            breadsticks: 0,
          },
          {
            label: "With grilled chicken",
            pasta: "create-your-own-pasta--option--pasta--angel-hair",
            sauce: "create-your-own-pasta--option--sauce--marinara",
            toppings: ["create-your-own-pasta--option--topping--one-grilled-chicken"],
            firstCourse: "create-your-own-pasta--option--first-course--famous-house-salad",
            breadsticks: 1,
          },
          {
            label: "With sautéed shrimp",
            pasta: "create-your-own-pasta--option--pasta--spaghetti",
            sauce: "create-your-own-pasta--option--sauce--marinara",
            toppings: ["create-your-own-pasta--option--topping--16-saut-ed-shrimp"],
            firstCourse: "create-your-own-pasta--option--first-course--pasta-e-fagioli-soup",
            breadsticks: 1,
          },
          {
            label: "Vegetarian with broccoli",
            pasta: "create-your-own-pasta--option--pasta--spaghetti",
            sauce: "create-your-own-pasta--option--sauce--marinara",
            toppings: ["create-your-own-pasta--option--topping--broccoli"],
            firstCourse: "create-your-own-pasta--option--first-course--minestrone-soup",
            breadsticks: 1,
          },
          {
            label: "For contrast: heaviest one-topping plate",
            pasta: "create-your-own-pasta--option--pasta--rigatoni",
            sauce: "create-your-own-pasta--option--sauce--creamy-mushroom",
            toppings: ["create-your-own-pasta--option--topping--three-meatballs"],
            firstCourse: "create-your-own-pasta--option--first-course--chicken-gnocchi-soup",
            breadsticks: 2,
          },
        ],
        notes: [
          "Spaghetti with marinara adds up to 490 calories from the component values, a little below the 530 at the bottom of the official menu range. We show both as published; ask Olive Garden if you need an exact figure.",
          "Lower-calorie does not mean low-calorie or healthy. These are comparisons of Olive Garden’s published numbers, not dietary advice.",
        ],
      },
    ],
    comparisons: [
      {
        id: "cyop-vs-station",
        caption: "Create Your Own Pasta vs the catering Create Your Own Pasta Station",
        columns: [
          { kind: "category", label: "Menu" },
          { kind: "serving", label: "What you get" },
          { kind: "price" },
          { kind: "pricePerServing", label: "Per person" },
          { kind: "calories", label: "Calories (whole order)" },
        ],
        rows: [
          { offeringId: "classic-entrees--create-your-own-pasta", label: "Create Your Own Pasta (one plate)", servings: 1 },
          { offeringId: "catering--create-your-own-pasta-station", label: "Create Your Own Pasta Station", servings: 10 },
        ],
        notes: ["The station is listed as serving 10 people; its per-person price divides the station price by 10."],
      },
    ],
    sections: [
      {
        id: "pasta-choices",
        heading: "Available Pasta Choices",
        blocks: [
          {
            type: "paragraph",
            text: "There are five pastas to choose from, and none of them costs extra. They differ by up to 100 calories before any sauce: spaghetti is the lowest at 340 and rigatoni the highest at 440.",
          },
          { type: "optionTable", id: "pasta-choices" },
          { type: "subheading", text: "Gluten-free rotini and gluten-sensitive choices" },
          {
            type: "paragraph",
            text: "Gluten-free rotini is the pasta to choose if you avoid gluten. Olive Garden says it is made with brown rice flour, meets the FDA definition of gluten-free, and is cooked separately. Marinara and meat sauce are labeled (G), as are the Italian sausage, grilled chicken, and sautéed shrimp toppings.",
          },
          {
            type: "list",
            items: [
              "Olive Garden’s “gluten sensitive” label means made without gluten-containing ingredients. Those dishes are not tested to the FDA’s gluten-free limit, and the kitchen has no separate fryer.",
              "The breaded and fried toppings (crispy chicken fritta, crispy shrimp fritta) and the meatballs are not labeled (G).",
              "Gluten-sensitive meals come with a house salad without croutons or, where available, Zuppa Toscana, and breadsticks are left off unless you ask for them.",
              "The gluten-sensitive menu lists Rotini Pasta with Marinara (530 calories) and with Meat Sauce (680) at $13.99. Those totals match gluten-free rotini plus the sauce in the tables on this page.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "More gluten-sensitive dishes are listed in the ",
              { text: "gluten-sensitive section of our full menu", href: "/#gluten-sensitive" },
              ".",
            ],
          },
        ],
      },
      {
        id: "pasta-sauce-options",
        heading: "Olive Garden Pasta Sauce Options",
        blocks: [
          {
            type: "paragraph",
            text: "The sauce makes the biggest calorie difference in the whole build. Marinara has 150 calories and Creamy Mushroom 860, so switching from one to the other adds more calories than any single topping. All five sauce choices, including no sauce, are included in the price.",
          },
          { type: "optionTable", id: "sauce-choices" },
          {
            type: "paragraph",
            text: [
              "Want more sauce on the side, or alfredo to take home? Large containers of marinara, meat sauce, five cheese marinara, and alfredo are listed under ",
              { text: "sides, sauces and extras", href: "/#sides-sauces-and-extras" },
              ".",
            ],
          },
        ],
      },
      {
        id: "protein-toppings",
        heading: "Protein Toppings and Extra Prices",
        blocks: [
          {
            type: "paragraph",
            text: "Toppings are the only part of Create Your Own Pasta that costs extra. Broccoli is the cheapest at $3.79, meatballs, sausage, and crispy chicken are $4.49, grilled chicken is $4.99, and either shrimp topping is $6.79.",
          },
          { type: "optionTable", id: "topping-choices" },
          {
            type: "list",
            items: [
              "Lowest-calorie proteins: grilled chicken (130) and sautéed shrimp (170).",
              "Highest-calorie toppings: three meatballs (480) and two Italian sausages (470).",
              "Sautéed and crispy shrimp cost the same, but the crispy version has about twice the calories (350 vs 170).",
            ],
          },
        ],
      },
      {
        id: "meal-examples",
        heading: "Create Your Own Pasta Meal Examples",
        blocks: [
          {
            type: "paragraph",
            text: "Here is what some typical orders add up to. Each total is our calculation from Olive Garden’s official option prices and calories, not an official meal total.",
          },
          { type: "pastaBuilds", id: "meal-examples" },
          {
            type: "paragraph",
            text: "Spaghetti with meat sauce and three meatballs comes to $18.48 and 1,120 plate calories, exactly the price and calories of Olive Garden’s regular Spaghetti & Meatballs with meat sauce. Building it yourself costs the same and lets you swap the pasta.",
          },
          {
            type: "paragraph",
            text: [
              "Alfredo sauce is not one of the Create Your Own Pasta choices. For Alfredo dishes, see the ",
              { text: "Olive Garden Alfredo menu", href: "/amazing-alfredos" },
              " instead.",
            ],
          },
        ],
      },
      {
        id: "lower-calorie-pasta",
        heading: "Lower-Calorie Pasta Combinations",
        blocks: [
          {
            type: "paragraph",
            text: "Three choices keep the total down: marinara instead of a cream or cheese sauce, grilled chicken or sautéed shrimp instead of meatballs or sausage, and Minestrone as the first course. Skipping a breadstick saves another 140 calories.",
          },
          { type: "pastaBuilds", id: "lower-calorie-builds" },
          { type: "optionTable", id: "first-course-choices" },
        ],
      },
      {
        id: "cyop-vs-catering-station",
        heading: "Create Your Own Pasta vs Catering Pasta Station",
        blocks: [
          {
            type: "paragraph",
            text: "The catering Create Your Own Pasta Station is a different product for groups. Each station serves 10 people and includes spaghetti and fettuccine, alfredo, meat sauce, and marinara, grilled chicken, meatballs, and Italian sausage, plus salad and breadsticks.",
          },
          { type: "comparison", id: "cyop-vs-station" },
          {
            type: "list",
            items: [
              "Online pickup: up to 3 stations (30 people). Delivery: up to 8 stations, with 24 hours’ notice.",
              "Online pickup orders over $350 are placed by phone.",
              "The station’s 17,280 calories are for all 10 servings together.",
            ],
          },
          { type: "subheading", text: "Is Create Your Own Pasta unlimited?" },
          {
            type: "paragraph",
            text: "No. Create Your Own Pasta is one plate. Olive Garden’s Never-Ending Pasta Bowl is a separate, limited-time promotion: in November 2026, it started at $14.99, refills were for dine-in guests only, and its sauce list included Alfredo. Check Olive Garden’s specials page to see whether it is running now.",
          },
          {
            type: "paragraph",
            text: [
              "Planning for a group? Pans, trays, and combinations are on the ",
              { text: "catering menu", href: "/#catering" },
              ", and every dish is on the ",
              { text: "full Olive Garden menu", href: "/#full-menu" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Create Your Own Pasta (official item page with options and nutrition)", url: "https://www.olivegarden.com/menu/create-your-own-pasta/prod80412" },
      { label: "Create Your Own Pasta Station (official catering item page)", url: "https://www.olivegarden.com/menu/create-your-own-pasta-station/prod82663" },
      { label: "Olive Garden Never-Ending Pasta Bowl (official specials page)", url: "https://www.olivegarden.com/specials/never-ending-pasta-bowl" },
      { label: "Olive Garden gluten-sensitive dining (official)", url: "https://www.olivegarden.com/nutrition/gluten-sensitive-diet" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden gluten-sensitive dining (official)", url: "https://www.olivegarden.com/nutrition/gluten-sensitive-diet" },
    faqs: [
      {
        question: "How much is Create Your Own Pasta at Olive Garden?",
        answer:
          "It was $13.99 for online pickup when we checked in November 2026, including your pasta, sauce, soup or salad, and two breadsticks. Toppings add $3.79 to $6.79 each. Prices vary by location.",
      },
      {
        question: "What pasta choices are available?",
        answer:
          "Five: spaghetti, angel hair, rigatoni, bucatini, and gluten-free rotini. All are included in the base price and range from 340 to 440 calories before sauce.",
      },
      {
        question: "What sauces can you choose?",
        answer:
          "Marinara, meat sauce, five cheese marinara, creamy mushroom, or no sauce, all included in the price. Alfredo was not a Create Your Own Pasta sauce on the online menu we checked.",
      },
      {
        question: "How much do extra protein toppings cost?",
        answer:
          "Three meatballs, two Italian sausages, or crispy chicken fritta cost $4.49, grilled chicken $4.99, and 16 sautéed or crispy shrimp $6.79. Broccoli is $3.79.",
      },
      {
        question: "Can you create your own gluten-sensitive pasta?",
        answer:
          "Yes. Choose gluten-free rotini with marinara or meat sauce, both labeled (G), and add grilled chicken, Italian sausage, or sautéed shrimp. Olive Garden’s kitchens are not gluten-free and have no separate fryer, so cross-contact is possible.",
      },
      {
        question: "Is Create Your Own Pasta unlimited?",
        answer:
          "No, it is a single plate. The Never-Ending Pasta Bowl is a separate limited-time promotion with dine-in refills, which started at $14.99 when we checked in November 2026.",
      },
    ],
    related: [
      { categoryId: "gluten-sensitive", text: "Dishes made without gluten-containing ingredients." },
      { categoryId: "sides-sauces-and-extras", text: "Extra sauces, toppings, and sides." },
      { categoryId: "amazing-alfredos", text: "Alfredo dishes, which are not part of the pasta builder." },
      { categoryId: "catering", text: "The Create Your Own Pasta Station for groups of 10 or more." },
      { categoryId: "classic-entrees", text: "Regular entrées, including Spaghetti & Meatballs." },
      { categoryId: "family-style-meals", text: "Pasta pans for 4 to 6 people." },
    ],
  },

  /* =====================================================================
   * 9. LUNCH MENU  (Batch 2, preview)
   * ===================================================================== */
  {
    categoryId: "lunch-menu",
    primaryKeyword: "olive garden lunch menu",
    menuTitle: "Olive Garden Lunch Menu",
    secondaryKeywords: [
      "olive garden lunch menu with prices",
      "olive garden lunch specials",
      "olive garden lunch hours",
      "olive garden weekday lunch menu",
      "olive garden lunch menu calories",
      "olive garden lunch menu on weekends",
      "olive garden lunch sandwiches",
      "olive garden lunch flatbreads",
      "olive garden lunch vs dinner menu",
      "olive garden affordable lunch options",
    ],
    searchIntent: "Find what Olive Garden serves at weekday lunch, what it costs, when lunch starts and ends, and the cheapest and lower-calorie choices.",
    metaTitle: "Olive Garden Lunch Menu with Prices & Hours 2026",
    metaDescription:
      "Explore Olive Garden lunch menu prices, calories, lunch specials, sandwiches, flatbreads, weekday hours and affordable meal choices.",
    h1: "Olive Garden Lunch Menu with Prices 2026",
    intro: [
      "Olive Garden serves its lunch menu Monday to Friday from 11 AM to 3 PM. In our November 2026 check, lunch prices ran from $9.99 to $12.49 for online pickup, for 17 items: lunch-size pasta plates, sandwiches, flatbreads, and soup, salad and breadsticks.",
      "Lunch plates come with soup or salad and two breadsticks and cost $2.50 to $9.30 less than the dinner version of the same dish. Lunch is not served on weekends.",
    ],
    contentReviewedAt: REVIEWED,
    tableHeading: "Olive Garden Lunch Menu Prices and Calories",
    tableCaption: "Olive Garden Lunch Menu: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Lunch-size plates include soup or salad and two breadsticks. The sandwiches are served with french fries.",
      "Spaghetti comes with marinara or meat sauce, and Spaghetti & Meatballs with two meatballs, at the same price either way.",
      "The Chicken Parmigiana Sandwich can be ordered with crispy chicken fritta (960 calories) or grilled chicken (840) for the same price.",
      "Spicy Alfredo Fettuccine and the $9.99 soup, salad and breadsticks offer are limited-time items.",
    ],
    nutritionNotes: [
      "Plate calories do not include the soup or salad and breadsticks that come with them: 110–230 for a bowl of soup, 150 for the house salad with dressing, and 140 per breadstick.",
    ],
    featuredOfferingIds: [
      "lunch-menu--lasagna-classico",
      "lunch-menu--shrimp-scampi",
      "lunch-menu--chicken-parmigiana-sandwich",
      "lunch-menu--chicken-alfredo-flatbread",
      "lunch-menu--soup-salad-and-breadsticks-lunch",
    ],
    featuredHeading: "Lunch Favorites with Photos",
    comparisons: [
      {
        id: "lunch-sandwiches-flatbreads",
        caption: "Olive Garden lunch sandwiches and flatbreads",
        columns: [
          { kind: "text", label: "What’s on it", key: "toppings" },
          { kind: "serving", label: "Served as" },
          { kind: "price" },
          { kind: "calories" },
        ],
        rows: [
          {
            offeringId: "lunch-menu--chicken-parmigiana-sandwich",
            label: "Chicken Parmigiana Sandwich, crispy",
            option: "Chicken Parmigiana Sandwich (crispy chicken fritta)",
            text: { toppings: "Crispy chicken fritta, mozzarella, and marinara on a toasted garlic knot bun" },
          },
          {
            offeringId: "lunch-menu--chicken-parmigiana-sandwich",
            label: "Chicken Parmigiana Sandwich, grilled",
            option: "Grilled Chicken Parmigiana Sandwich",
            text: { toppings: "Grilled chicken, mozzarella, and marinara on a toasted garlic knot bun" },
          },
          {
            offeringId: "lunch-menu--italian-grilled-chicken-sandwich",
            text: { toppings: "Grilled chicken, mozzarella, tomatoes, pepperoncini, lettuce, and signature dressing" },
          },
          {
            offeringId: "lunch-menu--eggplant-parmigiana-sandwich",
            text: { toppings: "Hand-breaded fried eggplant, mozzarella, and marinara on a garlic knot bun" },
          },
          {
            offeringId: "lunch-menu--chicken-alfredo-flatbread",
            text: { toppings: "Alfredo sauce, chicken, roasted red peppers, and mozzarella" },
          },
          {
            offeringId: "lunch-menu--classic-pepperoni-flatbread",
            text: { toppings: "Marinara, mozzarella, and pepperoni" },
          },
          {
            offeringId: "lunch-menu--five-cheese-flatbread",
            text: { toppings: "Five cheese marinara and mozzarella" },
          },
        ],
        notes: [
          "Olive Garden lists the sandwiches and flatbreads for weekday lunch “where available”, so not every restaurant may have them. Sandwich calories include the french fries.",
        ],
      },
      {
        id: "lunch-vs-dinner",
        caption: "Lunch vs dinner: the same dishes compared",
        columns: [
          { kind: "price", label: "Lunch price" },
          { kind: "price", label: "Dinner price", ref: "dinner" },
          { kind: "refDifference", measure: "price", label: "Lunch vs dinner", baseRef: "dinner", percent: true },
          { kind: "calories", label: "Lunch calories" },
          { kind: "calories", label: "Dinner calories", ref: "dinner" },
          { kind: "refDifference", measure: "calories", label: "Calorie difference", baseRef: "dinner" },
        ],
        rows: [
          { offeringId: "lunch-menu--shrimp-scampi", refs: { dinner: { offeringId: "classic-entrees--shrimp-scampi" } } },
          { offeringId: "lunch-menu--chicken-parmigiana", refs: { dinner: { offeringId: "classic-entrees--chicken-parmigiana" } } },
          { offeringId: "lunch-menu--five-cheese-ziti-al-forno", refs: { dinner: { offeringId: "classic-entrees--five-cheese-ziti-al-forno" } } },
          { offeringId: "lunch-menu--lasagna-classico", refs: { dinner: { offeringId: "classic-entrees--lasagna-classico" } } },
          { offeringId: "lunch-menu--eggplant-parmigiana", refs: { dinner: { offeringId: "classic-entrees--eggplant-parmigiana" } } },
          { offeringId: "lunch-menu--cheese-ravioli", refs: { dinner: { offeringId: "classic-entrees--cheese-ravioli" } } },
          { offeringId: "lunch-menu--fettuccine-alfredo", refs: { dinner: { offeringId: "classic-entrees--fettuccine-alfredo" } } },
          {
            offeringId: "lunch-menu--spicy-alfredo-fettuccine",
            label: "Spicy Alfredo Fettuccine",
            refs: { dinner: { offeringId: "classic-entrees--spicy-alfredo-fettuccine" } },
          },
          {
            offeringId: "lunch-menu--spaghetti-and-meatballs",
            label: "Spaghetti & Meatballs, marinara",
            option: "Marinara & meatballs",
            refs: { dinner: { offeringId: "classic-entrees--spaghetti-and-meatballs", option: "Spaghetti with Marinara & Meatballs" } },
          },
          {
            offeringId: "lunch-menu--spaghetti",
            label: "Spaghetti with Meat Sauce",
            option: "Lunch Spaghetti with Meat Sauce",
            refs: { dinner: { offeringId: "classic-entrees--spaghetti-with-meat-sauce" } },
          },
          {
            offeringId: "lunch-menu--spaghetti",
            label: "Spaghetti with Marinara",
            option: "Lunch Spaghetti with Marinara",
            refs: { dinner: { offeringId: "classic-entrees--spaghetti-with-marinara" } },
          },
          {
            offeringId: "lunch-menu--soup-salad-and-breadsticks-lunch",
            label: "Soup, Salad and Breadsticks",
            refs: { dinner: { offeringId: "soups-salad-and-breadsticks--soup-salad-and-breadsticks" } },
          },
        ],
        notes: [
          "Dinner = the regular entrée from Olive Garden’s Classic Entrées menu; for soup, salad and breadsticks, the regular $13.49 meal. Dinner Spaghetti & Meatballs has three meatballs, the lunch plate two.",
          "Cheese Ravioli is listed as a calorie range (marinara or meat sauce), so no single difference is shown.",
        ],
      },
      {
        id: "lunch-budget",
        caption: "Olive Garden lunch items under $11",
        columns: [{ kind: "price" }, { kind: "calories" }, { kind: "serving", label: "Served as" }],
        rows: [
          { offeringId: "lunch-menu--soup-salad-and-breadsticks-lunch", label: "Soup, Salad and Breadsticks (limited time)" },
          { offeringId: "lunch-menu--five-cheese-flatbread" },
          { offeringId: "lunch-menu--classic-pepperoni-flatbread" },
          { offeringId: "lunch-menu--eggplant-parmigiana-sandwich" },
          { offeringId: "lunch-menu--chicken-alfredo-flatbread" },
        ],
      },
      {
        id: "lunch-lower-calorie",
        caption: "Lower-calorie lunch plates and flatbreads",
        columns: [{ kind: "calories" }, { kind: "price" }],
        rows: [
          { offeringId: "lunch-menu--spaghetti", label: "Spaghetti with Marinara", option: "Lunch Spaghetti with Marinara" },
          { offeringId: "lunch-menu--cheese-ravioli" },
          { offeringId: "lunch-menu--shrimp-scampi" },
          { offeringId: "lunch-menu--spaghetti", label: "Spaghetti with Meat Sauce", option: "Lunch Spaghetti with Meat Sauce" },
          { offeringId: "lunch-menu--lasagna-classico" },
          { offeringId: "lunch-menu--five-cheese-flatbread" },
          { offeringId: "lunch-menu--classic-pepperoni-flatbread" },
        ],
        notes: ["Plate calories only; the included soup or salad and breadsticks are extra."],
      },
    ],
    sections: [
      {
        id: "lunch-specials",
        heading: "Olive Garden Lunch Specials",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden’s weekday lunch has three parts on the current online menu. We did not see the older “Lunch Duos” format that some websites still describe.",
          },
          {
            type: "list",
            items: [
              "Lunch-Sized Favorites: smaller plates of ten pasta dishes for $11.49 or $12.49, each with soup or salad and two breadsticks.",
              "Lunch Sandwiches & Flatbreads: three sandwiches with fries and three flatbreads, $9.99 to $11.99, at restaurants where they are offered.",
              [
                "Never-Ending Soup, Salad & Breadsticks: $9.99, a limited-time weekday offer with dine-in refills. Details are on our ",
                { text: "soup, salad and breadsticks page", href: "/soups-salad-and-breadsticks" },
                ".",
              ],
            ],
          },
          {
            type: "paragraph",
            text: [
              "With the soup, salad and breadsticks lunch, Olive Garden also offers a $6 Take Home entrée to take home chilled. The rules are explained on our ",
              { text: "Buy One Take One and $6 Take Home page", href: "/buy-one-take-one" },
              ".",
            ],
          },
        ],
      },
      {
        id: "sandwiches-flatbreads",
        heading: "Lunch Sandwiches and Flatbreads",
        blocks: [
          {
            type: "paragraph",
            text: "Sandwiches and flatbreads are lunch-only items. Each sandwich is served on a toasted garlic knot bun with french fries. The flatbreads are $9.99 or $10.99, and the Five Cheese Flatbread is the lowest-calorie item in this group at 510.",
          },
          { type: "comparison", id: "lunch-sandwiches-flatbreads" },
          {
            type: "paragraph",
            text: "The listings we checked do not say whether sandwiches and flatbreads include soup or salad, as the lunch pasta plates do. Ask your server when you order.",
          },
        ],
      },
      {
        id: "lunch-hours",
        heading: "Olive Garden Lunch Hours",
        blocks: [
          {
            type: "paragraph",
            text: "Lunch starts when the restaurant opens at 11 AM and ends at 3 PM, Monday to Friday. Olive Garden’s FAQ, the lunch menu, and the restaurant hours we checked all agree on 3 PM. After 3 PM, the dinner menu takes over.",
          },
          {
            type: "list",
            items: [
              "Lunch menu: Monday–Friday, 11 AM–3 PM.",
              "Restaurant hours: set by each location. The restaurant we checked opened at 11 AM every day and closed at 10 PM (11 PM on Friday and Saturday).",
              "Online ordering: closes 20 minutes before the restaurant closes.",
              "Exception: one listing for the $9.99 soup, salad and breadsticks special shows 11 AM–2:30 PM, while Olive Garden’s specials page says until 3 PM.",
            ],
          },
          {
            type: "note",
            text: "Restaurant hours and lunch hours are not the same thing: the restaurant stays open until night, but lunch prices end at 3 PM. Hours are set by each restaurant, so check your location’s page before you go.",
          },
        ],
      },
      {
        id: "lunch-weekends",
        heading: "Is Lunch Available on Saturday and Sunday?",
        blocks: [
          {
            type: "paragraph",
            text: "No. Olive Garden serves lunch Monday to Friday only. On Saturdays, Sundays, and holidays it serves the dinner menu all day, so lunch prices, lunch sandwiches, and the $9.99 soup, salad and breadsticks offer are not available.",
          },
          {
            type: "paragraph",
            text: [
              "For a smaller plate on the weekend, order a lighter portion. All eight lighter dishes have the same calories as the lunch plate and cost $2 more. Compare them on our ",
              { text: "lighter portions page", href: "/lighter-portions" },
              ".",
            ],
          },
        ],
      },
      {
        id: "lunch-vs-dinner",
        heading: "Olive Garden Lunch vs Dinner Menu",
        blocks: [
          {
            type: "paragraph",
            text: "A lunch plate is a smaller, cheaper version of the dinner entrée, with the same soup or salad and breadsticks. Lunch saves $2.50 on plain spaghetti and up to $9.30 on the other plates (our calculation). The biggest saving is on Shrimp Scampi: $9.30 less at lunch, even though the lunch plate has only 30 fewer calories.",
          },
          { type: "comparison", id: "lunch-vs-dinner" },
          {
            type: "paragraph",
            text: [
              "The full-size dinner plates, including dishes that have no lunch version, are on our ",
              { text: "classic entrées page", href: "/classic-entrees" },
              ". Lunch-size Fettuccine Alfredo and Spicy Alfredo are also compared with every other Alfredo dish on the ",
              { text: "Olive Garden Alfredo menu", href: "/amazing-alfredos" },
              ".",
            ],
          },
        ],
      },
      {
        id: "budget-lunch",
        heading: "Budget-Friendly Lunch Options",
        blocks: [
          {
            type: "paragraph",
            text: "Four lunch items cost $9.99, the lowest lunch price we found: soup, salad and breadsticks, the Five Cheese and Classic Pepperoni flatbreads, and the Eggplant Parmigiana Sandwich.",
          },
          { type: "comparison", id: "lunch-budget" },
          {
            type: "list",
            items: [
              "The only lunch item with refills: the $9.99 soup, salad and breadsticks, for dine-in guests.",
              "Cheapest pasta plates with soup or salad and breadsticks: $11.49 for Fettuccine Alfredo, Five Cheese Ziti al Forno, Cheese Ravioli, Eggplant Parmigiana, Spaghetti, and Spicy Alfredo Fettuccine.",
              "The $12.49 plates are Chicken Parmigiana, Lasagna Classico, Shrimp Scampi, and Spaghetti & Meatballs.",
            ],
          },
        ],
      },
      {
        id: "lower-calorie-lunch",
        heading: "Lower-Calorie Lunch Choices",
        blocks: [
          {
            type: "paragraph",
            text: "Lunch Spaghetti with Marinara is the lowest-calorie lunch plate at 370 calories, and Cheese Ravioli, Shrimp Scampi, Spaghetti with Meat Sauce, and Lasagna Classico all stay at or below 500. The highest are Spicy Alfredo Fettuccine (1,000), the Eggplant Parmigiana Sandwich (980), and the crispy Chicken Parmigiana Sandwich (960).",
          },
          { type: "comparison", id: "lunch-lower-calorie" },
          {
            type: "list",
            items: [
              "Choose Minestrone (110 calories) as your soup, the lowest of the four.",
              "Each breadstick adds 140 calories.",
              "Choose the grilled Chicken Parmigiana Sandwich instead of crispy to save 120 calories at the same price.",
            ],
          },
          {
            type: "note",
            text: "These are comparisons of Olive Garden’s published calorie numbers, not dietary advice.",
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Lunch-Sized Favorites (official online menu)", url: "https://www.olivegarden.com/menu/lunch-sized-favorites" },
      { label: "Olive Garden Lunch Sandwiches & Flatbreads (official online menu)", url: "https://www.olivegarden.com/menu/lunch-sandwiches-flatbreads" },
      { label: "Olive Garden Never-Ending Soup, Salad & Breadsticks (official specials page)", url: "https://www.olivegarden.com/specials/never-ending-soup-salad-and-breadsticks" },
      { label: "Olive Garden Orlando – Millenia Mall (official location page and hours)", url: "https://www.olivegarden.com/locations/fl/orlando/orlando-millenia-mall/1614" },
      { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
    faqs: [
      {
        question: "What time does Olive Garden lunch start?",
        answer:
          "Lunch starts when the restaurant opens, at 11 AM Monday to Friday at the restaurant we checked. Opening times can vary by location.",
      },
      {
        question: "What time does Olive Garden lunch end?",
        answer:
          "At 3 PM, Monday to Friday. After that, the dinner menu and lighter portions are served. One listing for the $9.99 soup, salad and breadsticks special says 2:30 PM, so ask if you arrive late.",
      },
      {
        question: "Does Olive Garden serve lunch specials on weekends?",
        answer:
          "No. Lunch is weekdays only. Olive Garden serves its dinner menu all day on Saturdays, Sundays, and holidays. Lighter portions are the smaller-plate option on weekends.",
      },
      {
        question: "What is the cheapest lunch meal at Olive Garden?",
        answer:
          "Four items were $9.99 when we checked in November 2026: soup, salad and breadsticks (limited time, with dine-in refills), the Five Cheese and Classic Pepperoni flatbreads, and the Eggplant Parmigiana Sandwich.",
      },
      {
        question: "What is the difference between lunch and dinner portions?",
        answer:
          "Lunch plates are smaller and cheaper. For example, lunch Lasagna Classico has 500 calories and cost $12.49, while the dinner plate has 940 and cost $19.99. Olive Garden does not publish portion weights.",
      },
      {
        question: "Does Olive Garden lunch include soup, salad and breadsticks?",
        answer:
          "Lunch-size pasta plates include soup or salad and two breadsticks. The $9.99 soup, salad and breadsticks meal includes all three. Sandwiches come with fries; we could not confirm whether they include soup or salad.",
      },
    ],
    related: [
      { categoryId: "lighter-portions", text: "The same plate sizes after 3 PM and on weekends." },
      { categoryId: "soups-salad-and-breadsticks", text: "The $9.99 weekday soup and salad offer and its refill rules." },
      { categoryId: "classic-entrees", text: "Full-size dinner plates and their prices." },
      { categoryId: "amazing-alfredos", text: "Every Alfredo dish, including lunch-size plates." },
    ],
  },
  /* =====================================================================
   * 10. DESSERTS  (Batch 3, preview)
   * ===================================================================== */
  {
    categoryId: "desserts",
    primaryKeyword: "olive garden dessert menu",
    menuTitle: "Olive Garden Dessert Menu",
    secondaryKeywords: [
      "olive garden desserts with prices",
      "olive garden desserts with pictures",
      "olive garden dessert calories",
      "olive garden tiramisu",
      "olive garden cheesecake",
      "olive garden chocolate desserts",
      "olive garden birthday dessert",
      "olive garden catering desserts",
      "best olive garden desserts",
    ],
    searchIntent: "See every current Olive Garden dessert with price, calories, and what is in it, plus seasonal, birthday, and catering-size facts.",
    metaTitle: "Olive Garden Dessert Menu with Prices & Calories 2026",
    metaDescription:
      "Explore Olive Garden desserts with prices, pictures, calories, cheesecake, tiramisu, seasonal choices and birthday dessert information.",
    h1: "Olive Garden Dessert Menu with Prices 2026",
    intro: [
      "Olive Garden’s dessert menu has seven desserts, from Warm Italian Doughnuts at $8.99 to Black Tie Mousse Cake at $10.29 for online pickup when we checked in November 2026. Calories range from 470 for Tiramisu to 980 for Chocolate Lasagna.",
      "One of the seven, the Pumpkin Cookie Butter Cheesecake, is a limited-time dessert. Below you will find every dessert with its price, calories, and main ingredients, plus the birthday dessert and the half and whole cakes on the catering menu.",
    ],
    contentReviewedAt: REVIEWED_B3,
    tableHeading: "Olive Garden Dessert Menu Prices and Calories",
    tableCaption: "Olive Garden Desserts: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "The Pumpkin Cookie Butter Cheesecake is labeled limited time. The other six desserts are labeled vegetarian (V) on the online menu.",
    ],
    nutritionNotes: [
      "Calories are for one dessert. For allergens, use Olive Garden’s official allergen guide and tell your server.",
    ],
    featuredOfferingIds: [
      "desserts--tiramisu",
      "desserts--chocolate-lasagna",
      "desserts--black-tie-mousse-cake",
      "desserts--sicilian-cheesecake-with-strawberry-topping",
      "desserts--strawberry-cream-cake",
    ],
    featuredHeading: "Olive Garden Desserts with Photos",
    comparisons: [
      {
        id: "desserts-compared",
        caption: "Olive Garden desserts compared",
        columns: [
          { kind: "text", label: "What it is", key: "what" },
          { kind: "text", label: "Flavor", key: "flavor" },
          { kind: "price" },
          { kind: "calories" },
          { kind: "caloriesDifference", label: "Calories vs Tiramisu", baseRow: 0 },
        ],
        rows: [
          { offeringId: "desserts--tiramisu", text: { what: "Espresso-soaked ladyfingers under a layer of custard", flavor: "Coffee, creamy" } },
          { offeringId: "desserts--strawberry-cream-cake", text: { what: "Vanilla sponge cake, vanilla cream, fresh strawberries", flavor: "Fruity" } },
          { offeringId: "desserts--pumpkin-cookie-butter-cheesecake", label: "Pumpkin Cookie Butter Cheesecake (limited time)", text: { what: "Pumpkin and classic cheesecake with a cookie butter swirl, graham crust, caramel, whipped cream", flavor: "Seasonal, spiced" } },
          { offeringId: "desserts--sicilian-cheesecake-with-strawberry-topping", text: { what: "Ricotta cheesecake on a shortbread crust with strawberry sauce", flavor: "Cheesecake, fruity" } },
          { offeringId: "desserts--black-tie-mousse-cake", text: { what: "Chocolate cake, dark chocolate cheesecake, custard mousse", flavor: "Chocolate" } },
          { offeringId: "desserts--warm-italian-doughnuts", text: { what: "Fried doughnuts in vanilla sugar with raspberry or chocolate sauce", flavor: "Served warm" } },
          { offeringId: "desserts--chocolate-lasagna", text: { what: "Chocolate cake, chocolate mousse, crushed wafers, chocolate sauce", flavor: "Chocolate" } },
        ],
        notes: ["Ingredients are summarized from Olive Garden’s menu descriptions. Rows are sorted by calories, lowest first."],
      },
      {
        id: "desserts-individual-vs-catering",
        caption: "Individual desserts vs catering half and whole cakes",
        columns: [
          { kind: "category", label: "Menu" },
          { kind: "price" },
          { kind: "pricePerServing", label: "Per serving" },
          { kind: "calories", label: "Calories per slice" },
        ],
        rows: [
          { offeringId: "desserts--tiramisu", label: "Tiramisu, one dessert", servings: 1 },
          { offeringId: "catering--tiramisu", label: "Tiramisu, half", option: "Half (serves 6)", servings: 6 },
          { offeringId: "catering--tiramisu", label: "Tiramisu, whole", option: "Whole (serves 12)", servings: 12 },
          { offeringId: "desserts--black-tie-mousse-cake", label: "Black Tie Mousse Cake, one dessert", servings: 1 },
          { offeringId: "catering--black-tie-mousse-cake", label: "Black Tie Mousse Cake, half", option: "Half cake (serves 6)", servings: 6 },
          { offeringId: "catering--black-tie-mousse-cake", label: "Black Tie Mousse Cake, whole", option: "Whole cake (serves 12)", servings: 12 },
          { offeringId: "desserts--sicilian-cheesecake-with-strawberry-topping", label: "Sicilian Cheesecake, one dessert", servings: 1 },
          { offeringId: "catering--sicilian-cheesecake", label: "Sicilian Cheesecake, half", option: "Half (serves 6)", servings: 6 },
          { offeringId: "catering--sicilian-cheesecake", label: "Sicilian Cheesecake, whole", option: "Whole (serves 12)", servings: 12 },
          { offeringId: "catering--pumpkin-cookie-butter-cheesecake", label: "Pumpkin Cookie Butter Cheesecake, half (limited time)", option: "Half cake (serves 5)", servings: 5 },
          { offeringId: "catering--pumpkin-cookie-butter-cheesecake", label: "Pumpkin Cookie Butter Cheesecake, whole (limited time)", option: "Whole cake (serves 10)", servings: 10 },
        ],
        notes: [
          "Per-serving prices divide the price by Olive Garden’s own serving count. The catering Sicilian Cheesecake is listed at 700 calories per slice; the restaurant dessert at 730.",
        ],
      },
    ],
    sections: [
      {
        id: "desserts-compared",
        heading: "Olive Garden Desserts Compared",
        blocks: [
          {
            type: "paragraph",
            text: "The seven desserts cost within $1.30 of each other, so calories and flavor are the bigger differences. Tiramisu has the fewest calories at 470, and Chocolate Lasagna has the most at 980, more than double (our calculation).",
          },
          { type: "comparison", id: "desserts-compared" },
          {
            type: "list",
            items: [
              "Lowest in calories: Tiramisu (470), then Strawberry Cream Cake (540).",
              "Served warm: Warm Italian Doughnuts, the only dessert with a dipping sauce (raspberry or chocolate).",
              "For coffee lovers: Tiramisu is the only dessert made with espresso.",
              "Fruit-topped: Strawberry Cream Cake and Sicilian Cheesecake both come with strawberries.",
            ],
          },
        ],
      },
      {
        id: "chocolate-cheesecake-italian",
        heading: "Chocolate, Cheesecake and Classic Italian Desserts",
        blocks: [
          { type: "subheading", text: "Chocolate desserts" },
          {
            type: "paragraph",
            text: "Chocolate Lasagna ($9.99, 980 calories) stacks chocolate cake and chocolate mousse with crushed wafers and chocolate sauce. Black Tie Mousse Cake ($10.29, 750 calories) layers chocolate cake with dark chocolate cheesecake and custard mousse. It has 230 fewer calories than the Chocolate Lasagna (calculated).",
          },
          { type: "subheading", text: "Cheesecakes" },
          {
            type: "paragraph",
            text: "The Sicilian Cheesecake ($9.79, 730 calories) is a ricotta cheesecake on a shortbread crust with strawberry sauce. The limited-time Pumpkin Cookie Butter Cheesecake ($9.79, 620 calories) combines pumpkin and classic cheesecake with a cookie butter swirl on a graham crust.",
          },
          { type: "subheading", text: "Classic Italian desserts" },
          {
            type: "paragraph",
            text: "Tiramisu ($9.79) is espresso-soaked ladyfingers under a layer of custard, served by the slice. Warm Italian Doughnuts ($8.99) are fried, tossed in vanilla sugar, and served with raspberry or chocolate sauce; they are the lowest-priced dessert on the menu.",
          },
        ],
      },
      {
        id: "seasonal-desserts",
        heading: "Seasonal and Limited-Time Desserts",
        blocks: [
          {
            type: "paragraph",
            text: "The Pumpkin Cookie Butter Cheesecake is the only dessert Olive Garden labeled limited time when we checked in November 2026. It is also sold as a half or whole cake on the catering menu. Olive Garden did not post an end date, so check the menu before you plan around it.",
          },
          {
            type: "note",
            text: "We list only desserts that were on Olive Garden’s online menu when we checked. Desserts from older menus are not shown, because we could not confirm that they are still sold.",
          },
        ],
      },
      {
        id: "birthday-dessert",
        heading: "Olive Garden Birthday Dessert",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden’s official FAQ says guests get a complimentary dessert on their birthday when they dine in. The FAQ does not list which desserts qualify or what proof is needed, so ask your server when you arrive.",
          },
          {
            type: "list",
            items: [
              "Dine-in only: the FAQ ties the birthday dessert to dining in, not to to-go orders.",
              "No rewards program: Olive Garden says it does not have one, so there is nothing to sign up for to get the birthday dessert.",
            ],
          },
        ],
      },
      {
        id: "individual-vs-catering-desserts",
        heading: "Individual Desserts vs Catering Desserts",
        blocks: [
          {
            type: "paragraph",
            text: "Four desserts also come as half and whole cakes on the catering menu: Tiramisu, Black Tie Mousse Cake, Sicilian Cheesecake, and the limited-time Pumpkin Cookie Butter Cheesecake. A half costs $40.49 and a whole $73.99. For a group, that works out to about $6.17 to $8.10 per serving instead of $9.79 to $10.29 for a single dessert (our calculation).",
          },
          { type: "comparison", id: "desserts-individual-vs-catering" },
          {
            type: "paragraph",
            text: [
              "Chocolate Lasagna, Strawberry Cream Cake, and Warm Italian Doughnuts were not on the catering menu we checked. Full catering trays and combinations are in the ",
              { text: "catering section of our full menu", href: "/#catering" },
              ", and take-home pans are on our ",
              { text: "Olive Garden family style meals", href: "/family-style-meals" },
              " page.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Desserts (official online menu)", url: "https://www.olivegarden.com/menu/desserts" },
      { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
      { label: "Olive Garden catering (official)", url: "https://www.olivegarden.com/catering" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
    faqs: [
      {
        question: "What desserts does Olive Garden serve?",
        answer:
          "Seven desserts were on the online menu in November 2026: Chocolate Lasagna, Black Tie Mousse Cake, Tiramisu, Strawberry Cream Cake, Warm Italian Doughnuts, Sicilian Cheesecake with Strawberry Topping, and the limited-time Pumpkin Cookie Butter Cheesecake.",
      },
      {
        question: "How much is tiramisu at Olive Garden?",
        answer:
          "Tiramisu was $9.79 for online pickup when we checked in November 2026, with 470 calories. A half tray for 6 was $40.49 and a whole tray for 12 was $73.99 on the catering menu. Prices may vary by location.",
      },
      {
        question: "Which Olive Garden dessert has the fewest calories?",
        answer:
          "Tiramisu, with 470 calories. Strawberry Cream Cake has 540, and Chocolate Lasagna has the most at 980.",
      },
      {
        question: "Does Olive Garden offer a free birthday dessert?",
        answer:
          "Yes. Olive Garden’s FAQ says guests get a complimentary dessert on their birthday when dining in. It does not say which desserts qualify, so ask your server.",
      },
      {
        question: "Can you order Olive Garden desserts to go?",
        answer:
          "Yes. All seven desserts were on the online ordering menu for pickup. The prices on this page are those online pickup prices.",
      },
      {
        question: "Does Olive Garden offer catering desserts?",
        answer:
          "Yes. Tiramisu, Black Tie Mousse Cake, Sicilian Cheesecake, and the limited-time Pumpkin Cookie Butter Cheesecake come as half cakes ($40.49) and whole cakes ($73.99) that serve 5 to 12 people.",
      },
    ],
    related: [
      { categoryId: "catering", text: "Half and whole cakes alongside trays and combinations for groups." },
      { categoryId: "drink-menu", text: "Coffee, lemonade, and other drinks to go with dessert." },
      { categoryId: "family-style-meals", text: "Take-home dinners for 4 to 12 people." },
      { categoryId: "wine-and-beer-to-go", text: "Sweet wines such as Moscato and Roscato by the bottle." },
    ],
  },

  /* =====================================================================
   * 11. DRINK MENU  (Batch 3, preview) — the hub for every drink type
   * ===================================================================== */
  {
    categoryId: "drink-menu",
    primaryKeyword: "olive garden drink menu",
    menuTitle: "Olive Garden Drink Menu",
    secondaryKeywords: [
      "olive garden drinks with prices",
      "olive garden drinks menu",
      "olive garden alcoholic drinks",
      "olive garden cocktails",
      "olive garden margarita",
      "olive garden sangria",
      "olive garden beverage menu",
      "olive garden specialty drinks",
      "olive garden wine menu",
    ],
    searchIntent: "Get an overview of every Olive Garden drink type, alcoholic and alcohol-free, with the prices that can be verified.",
    metaTitle: "Olive Garden Drink Menu with Prices 2026",
    metaDescription:
      "Explore Olive Garden drinks, including cocktails, margaritas, wine, beer, lemonade, iced tea and other beverages with available prices.",
    h1: "Olive Garden Drink Menu with Prices 2026",
    intro: [
      "Olive Garden’s drinks fall into three groups: alcohol-free drinks such as lemonade, iced tea, soda, and coffee; wine and beer, which select restaurants also sell to go; and Italian-inspired cocktails served in the restaurant.",
      "The to-go drinks below cost $3.69 to $5.49 for a single drink or 2-liter soda, and $8.49 to $10.49 for a gallon, for online pickup in November 2026. Cocktail prices are not published online, so we list the cocktails without prices.",
    ],
    contentReviewedAt: REVIEWED_B3,
    tableHeading: "Olive Garden Drink Menu Prices",
    tableIntro: [
      "These are the drinks on Olive Garden’s online to-go menu. Wine and beer have their own section, linked below.",
    ],
    tableCaption: "Olive Garden To-Go Drinks: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in drink prices were not checked.",
      "Gallon prices depend on the flavor: $8.49 for sweet tea, unsweet tea, or half tea and half lemonade; $10.49 for the fruit teas and raspberry lemonade.",
      "Mango-Passion Fruit Iced Tea was listed as currently unavailable when we checked.",
      "“Desert Pear Limonata” is listed on the official menu as Sweet Pear Limonata.",
    ],
    nutritionNotes: [
      "Calories are per drink, per 2-liter bottle, or per gallon, as labeled. Fountain drink and 2-liter calories depend on the soda you choose.",
    ],
    featuredOfferingIds: [
      "drink-menu--raspberry-lemonade",
      "drink-menu--strawberry-passion-fruit-limonata",
      "drink-menu--desert-pear-limonata",
      "drink-menu--bellini-peach-raspberry-iced-tea",
      "drink-menu--gallon-iced-teas-and-raspberry-lemonade",
    ],
    featuredHeading: "Olive Garden Drinks with Photos",
    comparisons: [
      {
        id: "drink-types",
        caption: "Olive Garden drink types at a glance",
        columns: [
          { kind: "text", label: "Alcohol", key: "alcohol" },
          { kind: "text", label: "Where", key: "where" },
          { kind: "text", label: "Prices", key: "prices" },
        ],
        rows: [
          { offeringId: "drink-menu--classic-lemonade", label: "Lemonades and limonatas", text: { alcohol: "No", where: "Restaurant and to go", prices: "Listed online ($3.69–$4.79)" } },
          { offeringId: "drink-menu--fresh-brewed-sweet-iced-tea", label: "Iced teas", text: { alcohol: "No", where: "Restaurant and to go", prices: "Listed online ($3.99–$4.29)" } },
          { offeringId: "drink-menu--to-go-fountain-drinks", label: "Soda (fountain and 2-liter)", text: { alcohol: "No", where: "Restaurant and to go", prices: "Listed online ($3.99, 2-liter $5.49)" } },
          { offeringId: "drink-menu--cappuccino", label: "Coffee (cappuccino, espresso)", text: { alcohol: "No", where: "Restaurant and to go", prices: "Listed online ($3.99–$4.99)" } },
          { offeringId: "wine-and-beer-to-go--sweet-red-roscato-rosso-dolce", label: "Wine by the bottle", text: { alcohol: "Yes, 21+", where: "To go at select locations", prices: "Listed online ($25.50–$34.50)" } },
          { offeringId: "wine-and-beer-to-go--budweiser", label: "Beer", text: { alcohol: "Yes, 21+ (Heineken 0.0 has none)", where: "To go at select locations", prices: "Listed online ($6.29–$6.79)" } },
          { offeringId: "drink-menu--classic-lemonade", label: "Italian-inspired cocktails", text: { alcohol: "Yes, 21+", where: "In the restaurant", prices: "Not listed online" } },
        ],
        notes: ["Price ranges are from the online to-go menu we checked; cocktails, wine by the glass, and draft beer are not priced online."],
      },
      {
        id: "drink-sizes",
        caption: "Drink sizes for one person and for groups",
        columns: [{ kind: "serving", label: "Size" }, { kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "drink-menu--to-go-fountain-drinks" },
          { offeringId: "drink-menu--2-liter-soda" },
          { offeringId: "drink-menu--fresh-brewed-sweet-iced-tea", label: "Sweet iced tea, one drink" },
          { offeringId: "drink-menu--gallon-iced-teas-and-raspberry-lemonade", label: "Sweet tea, one gallon", option: "Gallon Sweet Tea" },
          { offeringId: "drink-menu--raspberry-lemonade", label: "Raspberry lemonade, one drink" },
          { offeringId: "drink-menu--gallon-iced-teas-and-raspberry-lemonade", label: "Raspberry lemonade, one gallon", option: "Gallon Raspberry Lemonade" },
          { offeringId: "catering--san-pellegrino-sparkling-1-liter-bottle", label: "San Pellegrino sparkling water, 1 liter (catering)" },
          { offeringId: "catering--acqua-panna-spring-1-liter-bottle", label: "Acqua Panna spring water, 1 liter (catering)" },
        ],
        notes: ["Olive Garden does not state how many glasses a gallon holds, so we do not calculate a price per glass."],
      },
    ],
    sections: [
      {
        id: "non-alcoholic-drinks-overview",
        heading: "Non-Alcoholic Beverages",
        blocks: [
          {
            type: "paragraph",
            text: "Most of the drink menu is alcohol-free: two lemonades, two sparkling limonatas, half iced tea and half lemonade, four iced teas, fountain soda, and coffee. A single drink costs $3.69 to $4.99, and calories run from 0 for unsweet iced tea to 240 for the Sweet Pear Limonata.",
          },
          { type: "comparison", id: "drink-types" },
          {
            type: "paragraph",
            text: [
              "Every lemonade flavor, the lower-calorie choices, and the gallon sizes are compared in detail on our ",
              { text: "Olive Garden non-alcoholic drinks", href: "/non-alcoholic-beverages" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "cocktails-specialty-drinks",
        heading: "Olive Garden Cocktails and Specialty Drinks",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden’s Italian-inspired cocktails page, which we checked in November 2026, listed eight cocktails. They are served in the restaurant, and Olive Garden does not publish their prices online.",
          },
          {
            type: "list",
            items: [
              "Margaritas: Italian Margarita, Strawberry Limoncello Margarita, and Coconut Pineapple Margarita.",
              "Other cocktails: Blue Capri, Italian Rum Punch, Sicilian Sunset, OG’s Old Fashioned, and Spiked Strawberry Lemonade.",
            ],
          },
          {
            type: "note",
            text: "Sangria was not on the cocktails page or the to-go menu we checked. Cocktail prices, sizes, and availability are set by each restaurant, so ask your server. Spiked Strawberry Lemonade contains alcohol; the lemonades on the to-go menu do not.",
          },
        ],
      },
      {
        id: "wine-beer-overview",
        heading: "Olive Garden Wine and Beer Options",
        blocks: [
          {
            type: "paragraph",
            text: "Select Olive Garden restaurants sell wine by the bottle and beer to go where the law allows, to guests 21 and older with a valid ID. The online menu we checked listed 14 wines from $25.50 to $34.50 a bottle and six beers at $6.29 or $6.79, including the non-alcoholic Heineken 0.0.",
          },
          {
            type: "paragraph",
            text: "In the restaurant, Olive Garden’s nutrition guide also lists wine by the glass and draft beer, but glass and draft prices are not published online.",
          },
          {
            type: "paragraph",
            text: [
              "Every bottle and beer with its price, calories, and the to-go rules is on our ",
              { text: "Olive Garden wine and beer menu", href: "/wine-and-beer-to-go" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "beverage-sizes",
        heading: "Beverage Sizes for Individuals and Groups",
        blocks: [
          {
            type: "paragraph",
            text: "For a to-go order, drinks come in three sizes: a single drink, a 2-liter bottle of Coke, Diet Coke, or Sprite ($5.49), and a gallon of iced tea or raspberry lemonade ($8.49 or $10.49). The catering menu also lists 1-liter bottles of San Pellegrino and Acqua Panna water.",
          },
          { type: "comparison", id: "drink-sizes" },
          {
            type: "paragraph",
            text: [
              "Pair your drinks with something sweet from the ",
              { text: "Olive Garden dessert menu", href: "/desserts" },
              ", or see every item on the ",
              { text: "full Olive Garden menu", href: "/#full-menu" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Italian-inspired cocktails (official specials page)", url: "https://www.olivegarden.com/specials/italian-inspired-cocktails" },
      { label: "Olive Garden Non-Alcoholic Beverages (official online menu)", url: "https://www.olivegarden.com/menu/non-alcoholic-beverages" },
      { label: "Olive Garden Wine & Beer To Go (official online menu)", url: "https://www.olivegarden.com/menu/wine-beer-to-go/featured-wines" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden Italian-inspired cocktails (official specials page)", url: "https://www.olivegarden.com/specials/italian-inspired-cocktails" },
    faqs: [
      {
        question: "What drinks does Olive Garden serve?",
        answer:
          "Lemonades, sparkling limonatas, iced teas, fountain soda, and coffee; wine and beer, which select restaurants also sell to go; and Italian-inspired cocktails in the restaurant.",
      },
      {
        question: "Does Olive Garden serve alcoholic beverages?",
        answer:
          "Yes. Olive Garden restaurants serve cocktails, wine, and beer where available, and select locations sell wine bottles and beer to go where permitted by law, to guests 21 and older with a valid ID.",
      },
      {
        question: "What cocktails are available at Olive Garden?",
        answer:
          "Olive Garden’s cocktails page listed eight in November 2026, including the Italian Margarita, Strawberry Limoncello Margarita, Blue Capri, and Italian Rum Punch. Prices are not published online and are set by each restaurant.",
      },
      {
        question: "Does Olive Garden have non-alcoholic drinks?",
        answer:
          "Yes. Most of the drink menu is alcohol-free: lemonades, limonatas, iced teas, soda, cappuccino, and espresso. There is also a non-alcoholic beer, Heineken 0.0.",
      },
      {
        question: "Can you order Olive Garden drinks to go?",
        answer:
          "Yes. Single drinks, 2-liter soda, and gallons of iced tea or raspberry lemonade were on the online to-go menu. Wine and beer to go are sold only at select locations where the law allows.",
      },
    ],
    related: [
      { categoryId: "non-alcoholic-beverages", text: "Every alcohol-free drink with calories and sizes." },
      { categoryId: "wine-and-beer-to-go", text: "Wine bottles and beer to go, with prices and rules." },
      { categoryId: "desserts", text: "Desserts to go with your coffee or drink." },
    ],
  },

  /* =====================================================================
   * 12. SIDES, SAUCES AND EXTRAS  (Batch 3, preview)
   * ===================================================================== */
  {
    categoryId: "sides-sauces-and-extras",
    primaryKeyword: "olive garden sides menu",
    menuTitle: "Olive Garden Sides, Sauces and Extras Menu",
    secondaryKeywords: [
      "olive garden sides with prices",
      "olive garden side dishes",
      "olive garden extra sauces",
      "olive garden side of grilled chicken",
      "olive garden side of meatballs",
      "olive garden extra alfredo sauce",
      "olive garden marinara sauce",
      "olive garden protein add-ons",
      "olive garden extras menu",
    ],
    searchIntent: "Find what can be added to an Olive Garden meal (sides, extra sauces, protein portions) and what each add-on costs.",
    metaTitle: "Olive Garden Sides, Sauces & Extras Menu Prices 2026",
    metaDescription:
      "Explore Olive Garden sides, extra sauces, grilled chicken, meatballs, Alfredo sauce and other add-ons with verified prices and calories.",
    h1: "Olive Garden Sides, Sauces and Extras Menu 2026",
    intro: [
      "Olive Garden’s sides menu lists protein sides from $4.49 to $5.29, broccoli and mashed potatoes at $3.79, and large sauces from $9.79 to $11.29 for online pickup in November 2026. The section also sells one non-food item, a cheese grater with Romano cheese.",
      "Use this page to see what each add-on costs, how the large sauces compare, and how sides change the price of your meal.",
    ],
    contentReviewedAt: REVIEWED_B3,
    tableHeading: "Olive Garden Sides and Extras Prices",
    tableCaption: "Olive Garden Sides, Sauces and Extras: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "The Cheese Grater is merchandise, so it has no calories and no visitor rating.",
      "Side of Crispy Shrimp Fritta is a limited-time item; Olive Garden marks crispy shrimp fritta “last chance” on its Never-Ending Pasta Bowl page.",
    ],
    nutritionNotes: [
      "Large sauces are one pint and do not include breadsticks. The Side of Crispy Shrimp Fritta is listed at 200 calories; Olive Garden’s nutrition guide shows other values for shrimp fritta toppings, and the side’s piece count is not stated.",
    ],
    noRatingOfferingIds: ["sides-sauces-and-extras--cheese-grater"],
    featuredOfferingIds: [
      "sides-sauces-and-extras--side-of-grilled-chicken",
      "sides-sauces-and-extras--side-of-broccoli",
      "sides-sauces-and-extras--side-of-mashed-potatoes",
      "sides-sauces-and-extras--side-of-alfredo-sauce--large",
      "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large",
    ],
    featuredHeading: "Olive Garden Sides with Photos",
    comparisons: [
      {
        id: "large-sauces",
        caption: "Olive Garden large sauces compared",
        columns: [{ kind: "price" }, { kind: "calories" }, { kind: "priceDifference", label: "Price vs marinara", baseRow: 0 }],
        rows: [
          { offeringId: "sides-sauces-and-extras--side-of-marinara-sauce--large", label: "Marinara (large)" },
          { offeringId: "sides-sauces-and-extras--side-of-meat-sauce--large", label: "Meat Sauce (large)" },
          { offeringId: "sides-sauces-and-extras--side-of-five-cheese-marinara-sauce--large", label: "Five Cheese Marinara (large)" },
          { offeringId: "sides-sauces-and-extras--side-of-alfredo-sauce--large", label: "Alfredo (large)" },
        ],
        notes: ["Each large sauce is one pint. Calories are for the whole container."],
      },
      {
        id: "protein-sides",
        caption: "Protein sides on the sides menu",
        columns: [{ kind: "serving", label: "Portion" }, { kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "sides-sauces-and-extras--side-of-grilled-chicken" },
          { offeringId: "sides-sauces-and-extras--side-of-crispy-chicken-fritta" },
          { offeringId: "sides-sauces-and-extras--side-of-meatballs" },
          { offeringId: "sides-sauces-and-extras--italian-sausage" },
          { offeringId: "sides-sauces-and-extras--side-of-crispy-shrimp-fritta", label: "Side of Crispy Shrimp Fritta (limited time)" },
        ],
      },
      {
        id: "sauce-sizes",
        caption: "Sauce sizes: dipping cups vs large sides",
        columns: [{ kind: "category", label: "Menu" }, { kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "appetizers--dipping-sauces-with-breadsticks", label: "Dipping sauce, regular, with 4 breadsticks", option: "Regular sauce with 4 breadsticks (serves 2)" },
          { offeringId: "appetizers--dipping-sauces-with-breadsticks", label: "Dipping sauce, large (8 oz), with 8 breadsticks", option: "Large sauce (8 oz) with 8 breadsticks (serves 4)" },
          { offeringId: "sides-sauces-and-extras--side-of-marinara-sauce--large", label: "Large side of marinara (1 pint)" },
          { offeringId: "sides-sauces-and-extras--side-of-alfredo-sauce--large", label: "Large side of alfredo (1 pint)" },
          { offeringId: "catering--alfredo-dipping-sauce", label: "Alfredo Dipping Sauce, catering (serves 8)" },
        ],
        notes: [
          "Dipping sauce calories are a calculated range for the breadsticks plus any of the sauces. On their own, the regular and 8 oz sauces are 70 and 150 calories for marinara, 200 and 400 for five cheese marinara, and 440 and 870 for alfredo, according to Olive Garden’s nutrition guide.",
        ],
      },
    ],
    optionTables: [
      {
        id: "pasta-topping-prices",
        caption: "The same proteins as pasta toppings (Create Your Own Pasta)",
        rows: [
          { optionId: "create-your-own-pasta--option--topping--one-grilled-chicken" },
          { optionId: "create-your-own-pasta--option--topping--one-crispy-chicken-fritta" },
          { optionId: "create-your-own-pasta--option--topping--three-meatballs" },
          { optionId: "create-your-own-pasta--option--topping--two-italian-sausage" },
          { optionId: "create-your-own-pasta--option--topping--16-crispy-shrimp-fritta" },
          { optionId: "create-your-own-pasta--option--topping--broccoli" },
        ],
        columns: [{ kind: "price", label: "Topping price" }, { kind: "calories" }],
        notes: ["Topping prices are from the Create Your Own Pasta listing."],
      },
    ],
    sections: [
      {
        id: "extra-sauce-options",
        heading: "Olive Garden Extra Sauce Options",
        blocks: [
          {
            type: "paragraph",
            text: "Four sauces are sold as large sides: marinara, meat sauce, five cheese marinara, and alfredo. Marinara, meat sauce, and five cheese marinara cost $9.79 each, and alfredo costs $11.29. Calories range from 290 for marinara to 1,750 for alfredo per container.",
          },
          { type: "comparison", id: "large-sauces" },
          {
            type: "paragraph",
            text: "Olive Garden describes the large sauces as extra pasta sauce or a dip for breadsticks, and breadsticks are not included. The online menu does not list a charge for extra sauce on a dine-in plate, so ask your server.",
          },
        ],
      },
      {
        id: "protein-add-ons",
        heading: "Protein Add-Ons and Prices",
        blocks: [
          {
            type: "paragraph",
            text: "Protein sides cost $4.49 to $5.29. Grilled chicken is the lowest-calorie choice at 130 calories for $4.99; three meatballs have the most at 520 calories for $4.49.",
          },
          { type: "comparison", id: "protein-sides" },
          {
            type: "paragraph",
            text: "The same proteins can be added as toppings when you build a pasta. Most cost the same either way, but the calories differ for some because the portions are not identical: the side of meatballs is listed at 520 calories and the three-meatball topping at 480, and the side of Italian sausage comes with marinara.",
          },
          { type: "optionTable", id: "pasta-topping-prices" },
        ],
      },
      {
        id: "sauce-portions",
        heading: "Individual vs Large Sauce Portions",
        blocks: [
          {
            type: "paragraph",
            text: "Sauce comes in three sizes. A regular dipping sauce with 4 breadsticks is $5.29, a large 8 oz sauce with 8 breadsticks is $7.29, and a one-pint large side without breadsticks is $9.79 to $11.29. The catering Alfredo Dipping Sauce is the same pint, price, and calories as the large side and is listed as serving 8.",
          },
          { type: "comparison", id: "sauce-sizes" },
          {
            type: "paragraph",
            text: [
              "Breadsticks themselves are sold by 6 or 12 on our ",
              { text: "Olive Garden soup, salad and breadsticks", href: "/soups-salad-and-breadsticks" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "merchandise",
        heading: "Additional Items and Merchandise",
        blocks: [
          {
            type: "paragraph",
            text: "The Cheese Grater ($19.99) is the only non-food item in this section. It is a take-home grater that comes with a block of Romano cheese. Because it is merchandise, Olive Garden lists no calories for it, and we do not show a visitor rating for it.",
          },
        ],
      },
      {
        id: "customize-your-meal",
        heading: "How to Customize Your Olive Garden Meal",
        blocks: [
          {
            type: "paragraph",
            text: "Adding a side can change your meal more cheaply than you might expect, but sometimes the menu already has the combination for less. These examples use the listed prices (our calculations):",
          },
          {
            type: "list",
            items: [
              "Spaghetti with Marinara ($13.99) plus a Side of Meatballs ($4.49) comes to $18.48, the same price as Spaghetti & Meatballs with marinara. By the listed values that is 1,010 calories, compared with 970 for the entrée.",
              "Fettuccine Alfredo ($17.49) plus a Side of Grilled Chicken ($4.99) comes to $22.48. Chicken Alfredo on the menu costs $21.79, which is $0.69 less.",
              "Entrée extras listed on the menu: broccoli or mushrooms ($3.79), extra cheese on Lasagna Classico ($0.99), alfredo instead of marinara on Cheese Ravioli ($2.79), and fettuccine alfredo instead of spaghetti on Chicken or Eggplant Parmigiana ($3.79).",
              "For a family pan or a party, a one-pint large alfredo sauce ($11.29) adds 1,750 calories to the whole order.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "To choose every part of your pasta, see the ",
              { text: "Olive Garden Create Your Own Pasta", href: "/create-your-own-pasta" },
              " guide. Alfredo plates are compared on the ",
              { text: "Olive Garden Alfredo menu", href: "/amazing-alfredos" },
              ", and regular entrées on the ",
              { text: "Olive Garden classic entrees", href: "/classic-entrees" },
              " page.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Sides, Sauces & Extras (official online menu)", url: "https://www.olivegarden.com/menu/sides-sauces-extras" },
      { label: "Create Your Own Pasta (official item page)", url: "https://www.olivegarden.com/menu/create-your-own-pasta/prod80412" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "What sides does Olive Garden offer?",
        answer:
          "The sides menu lists grilled chicken, crispy chicken fritta, meatballs, Italian sausage, crispy shrimp fritta (limited time), parmesan garlic broccoli, and mashed potatoes, plus four large sauces and a cheese grater.",
      },
      {
        question: "How much is extra Alfredo sauce at Olive Garden?",
        answer:
          "A large Side of Alfredo Sauce (one pint, without breadsticks) was $11.29 with 1,750 calories for online pickup in November 2026. Prices may vary by location.",
      },
      {
        question: "How much is a side of grilled chicken?",
        answer:
          "A Side of Grilled Chicken was $4.99 with 130 calories when we checked in November 2026, the same price as adding grilled chicken as a pasta topping.",
      },
      {
        question: "Can you order meatballs separately?",
        answer:
          "Yes. A Side of Meatballs is three meatballs for $4.49, listed at 520 calories. The catering menu also sells a tray of 10 Italian Meatballs for groups.",
      },
      {
        question: "What extra sauces are available?",
        answer:
          "Marinara, meat sauce, and five cheese marinara ($9.79 each) and alfredo ($11.29), each as a one-pint large side. Smaller sauce cups come with breadsticks as Dipping Sauces with Breadsticks.",
      },
      {
        question: "Can you customize Olive Garden pasta with additional toppings?",
        answer:
          "Yes. Many entrées list paid add-ons such as grilled chicken ($4.99), meatballs or Italian sausage ($4.49), shrimp, and broccoli ($3.79), and Create Your Own Pasta lets you choose the pasta, sauce, and toppings.",
      },
    ],
    related: [
      { categoryId: "create-your-own-pasta", text: "Build a pasta with your choice of sauce and toppings." },
      { categoryId: "amazing-alfredos", text: "Every Alfredo dish, plus extra alfredo sauce." },
      { categoryId: "classic-entrees", text: "Entrées you can add sides and toppings to." },
      { categoryId: "soups-salad-and-breadsticks", text: "Breadsticks, soups, and the house salad." },
    ],
  },

  /* =====================================================================
   * 13. NON-ALCOHOLIC BEVERAGES  (Batch 3, preview)
   * ===================================================================== */
  {
    categoryId: "non-alcoholic-beverages",
    primaryKeyword: "olive garden non alcoholic drinks",
    menuTitle: "Olive Garden Non-Alcoholic Drinks",
    secondaryKeywords: [
      "olive garden non-alcoholic beverages",
      "olive garden lemonade",
      "olive garden lemonade flavors",
      "olive garden lemonade calories",
      "olive garden iced tea",
      "olive garden soda",
      "olive garden mocktails",
      "olive garden alcohol-free drinks",
      "olive garden fountain drinks",
      "olive garden gallon beverages",
    ],
    searchIntent: "Compare every alcohol-free Olive Garden drink by flavor, size, price, and calories, and find the lowest-calorie choices.",
    metaTitle: "Olive Garden Non-Alcoholic Drinks Menu & Prices 2026",
    metaDescription:
      "Explore Olive Garden non-alcoholic drinks, lemonade, iced tea, soft drinks and available beverage sizes with prices and calories.",
    h1: "Olive Garden Non-Alcoholic Drinks Menu 2026",
    intro: [
      "Olive Garden’s non-alcoholic drinks include lemonades, sparkling limonatas, iced teas, fountain soda, cappuccino, and espresso. A single drink cost $3.69 to $4.99 for online pickup in November 2026, and calories range from 0 for unsweet iced tea to 240 for the Sweet Pear Limonata.",
      "This page compares every flavor, shows which drinks have the fewest calories, and explains the 2-liter and gallon sizes for groups.",
    ],
    contentReviewedAt: REVIEWED_B3,
    tableHeading: "Non-Alcoholic Drink Prices and Calories",
    tableCaption: "Olive Garden Non-Alcoholic Drinks: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in drink prices were not checked.",
      "Mango-Passion Fruit Iced Tea was listed as currently unavailable when we checked.",
      "“Desert Pear Limonata” is listed on the official menu as Sweet Pear Limonata.",
    ],
    nutritionNotes: [
      "Calories are per drink unless labeled per 2-liter bottle or per gallon. Fountain drink calories depend on the soda: 0 to 180.",
    ],
    featuredOfferingIds: [
      "non-alcoholic-beverages--classic-lemonade",
      "non-alcoholic-beverages--half-iced-tea-and-half-lemonade",
      "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea",
      "non-alcoholic-beverages--fresh-brewed-sweet-iced-tea",
      "non-alcoholic-beverages--lavazza-espresso",
    ],
    featuredHeading: "Non-Alcoholic Drinks with Photos",
    comparisons: [
      {
        id: "lemonades-compared",
        caption: "Olive Garden lemonades and limonatas compared",
        columns: [
          { kind: "text", label: "Style", key: "style" },
          { kind: "price" },
          { kind: "calories" },
          { kind: "caloriesDifference", label: "Calories vs Classic Lemonade", baseRow: 0 },
        ],
        rows: [
          { offeringId: "non-alcoholic-beverages--classic-lemonade", text: { style: "Still lemonade" } },
          { offeringId: "non-alcoholic-beverages--raspberry-lemonade", text: { style: "Raspberry-flavored lemonade" } },
          { offeringId: "non-alcoholic-beverages--half-iced-tea-and-half-lemonade", text: { style: "Half fresh-brewed iced tea, half lemonade" } },
          { offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata", text: { style: "Strawberry-passion fruit lemonade with sparkling water" } },
          { offeringId: "non-alcoholic-beverages--desert-pear-limonata", label: "Sweet Pear Limonata (listed as Desert Pear Limonata)", text: { style: "Prickly pear lemonade with sparkling water" } },
        ],
      },
      {
        id: "teas-compared",
        caption: "Iced teas and coffee",
        columns: [{ kind: "price" }, { kind: "calories" }],
        rows: [
          { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea" },
          { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea" },
          { offeringId: "non-alcoholic-beverages--fresh-brewed-sweet-iced-tea" },
          { offeringId: "non-alcoholic-beverages--mango-passion-fruit-iced-tea", label: "Mango-Passion Fruit Iced Tea (currently unavailable)" },
          { offeringId: "non-alcoholic-beverages--lavazza-espresso" },
          { offeringId: "non-alcoholic-beverages--cappuccino" },
        ],
      },
      {
        id: "lowest-calorie-drinks",
        caption: "Alcohol-free drinks from fewest to most calories",
        columns: [{ kind: "calories" }, { kind: "price" }],
        rows: [
          { offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea" },
          { offeringId: "catering--san-pellegrino-sparkling-1-liter-bottle", label: "San Pellegrino sparkling water, 1 liter (catering)" },
          { offeringId: "catering--acqua-panna-spring-1-liter-bottle", label: "Acqua Panna spring water, 1 liter (catering)" },
          { offeringId: "non-alcoholic-beverages--to-go-fountain-drinks", label: "Fountain soda (depends on the soda)" },
          { offeringId: "non-alcoholic-beverages--lavazza-espresso" },
          { offeringId: "non-alcoholic-beverages--half-iced-tea-and-half-lemonade" },
          { offeringId: "non-alcoholic-beverages--bellini-peach-raspberry-iced-tea" },
          { offeringId: "non-alcoholic-beverages--fresh-brewed-sweet-iced-tea" },
          { offeringId: "non-alcoholic-beverages--cappuccino" },
          { offeringId: "non-alcoholic-beverages--raspberry-lemonade" },
          { offeringId: "non-alcoholic-beverages--classic-lemonade" },
          { offeringId: "non-alcoholic-beverages--strawberry-passion-fruit-limonata" },
          { offeringId: "non-alcoholic-beverages--desert-pear-limonata", label: "Sweet Pear Limonata" },
        ],
      },
      {
        id: "single-vs-gallon",
        caption: "One drink vs one gallon of the same flavor",
        columns: [
          { kind: "price", label: "One drink" },
          { kind: "price", label: "One gallon", ref: "gallon" },
          { kind: "calories", label: "Calories, one drink" },
          { kind: "calories", label: "Calories, one gallon", ref: "gallon" },
        ],
        rows: [
          {
            offeringId: "non-alcoholic-beverages--fresh-brewed-unsweet-iced-tea",
            label: "Unsweet iced tea",
            refs: { gallon: { offeringId: "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade", option: "Gallon Iced Tea (unsweet)" } },
          },
          {
            offeringId: "non-alcoholic-beverages--fresh-brewed-sweet-iced-tea",
            label: "Sweet iced tea",
            refs: { gallon: { offeringId: "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade", option: "Gallon Sweet Tea" } },
          },
          {
            offeringId: "non-alcoholic-beverages--half-iced-tea-and-half-lemonade",
            label: "Half iced tea, half lemonade",
            refs: { gallon: { offeringId: "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade", option: "Gallon Half Iced Tea + Half Lemonade" } },
          },
          {
            offeringId: "non-alcoholic-beverages--raspberry-lemonade",
            label: "Raspberry lemonade",
            refs: { gallon: { offeringId: "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade", option: "Gallon Raspberry Lemonade" } },
          },
          {
            offeringId: "non-alcoholic-beverages--mango-passion-fruit-iced-tea",
            label: "Mango-passion fruit iced tea (currently unavailable)",
            refs: { gallon: { offeringId: "non-alcoholic-beverages--gallon-iced-teas-and-raspberry-lemonade", option: "Gallon Mango-Passion Fruit Iced Tea" } },
          },
        ],
        notes: [
          "Olive Garden does not say how many glasses a gallon holds, so we do not calculate a price per glass. The gallon menu also has Bellini Peach Tea and Raspberry Tea ($10.49 each).",
        ],
      },
    ],
    sections: [
      {
        id: "lemonade-options",
        heading: "Olive Garden Lemonade Options",
        blocks: [
          {
            type: "paragraph",
            text: "There are five lemonade drinks. Classic Lemonade and Raspberry Lemonade are still; the two limonatas add sparkling water. Half iced tea and half lemonade has the fewest calories at 80, and the Sweet Pear Limonata has the most at 240.",
          },
          { type: "comparison", id: "lemonades-compared" },
          {
            type: "paragraph",
            text: "Raspberry lemonade is the only flavored lemonade sold by the gallon ($10.49); half iced tea and half lemonade also comes by the gallon ($8.49). Classic lemonade is the lemonade in that half-and-half drink.",
          },
        ],
      },
      {
        id: "soft-drinks-iced-tea",
        heading: "Soft Drinks and Iced Tea",
        blocks: [
          {
            type: "paragraph",
            text: "A to-go fountain drink ($3.99) comes with a choice of Coke, Diet Coke, Coke Zero Sugar, Sprite, Dr Pepper, or ginger ale. The 2-liter bottle ($5.49) is Coke, Diet Coke, or Sprite.",
          },
          {
            type: "paragraph",
            text: "The iced teas are fresh-brewed sweet and unsweet tea ($3.99) and two fruit teas ($4.29): Bellini Peach-Raspberry and Mango-Passion Fruit. For something hot, there is Lavazza espresso ($3.99) and cappuccino ($4.99).",
          },
          { type: "comparison", id: "teas-compared" },
        ],
      },
      {
        id: "lower-calorie-drinks",
        heading: "Zero-Calorie and Lower-Calorie Beverage Options",
        blocks: [
          {
            type: "paragraph",
            text: "Fresh-brewed unsweet iced tea has 0 calories, and the 1-liter waters on the catering menu are 0 as well. Fountain soda starts at 0 calories depending on the soda you choose. The other single drinks have 60 to 240 calories.",
          },
          { type: "comparison", id: "lowest-calorie-drinks" },
          {
            type: "note",
            text: "These are Olive Garden’s published calorie values, not health advice. For sugar, caffeine, or allergens, check Olive Garden’s official nutrition and allergen guides.",
          },
        ],
      },
      {
        id: "family-size-drinks",
        heading: "Individual vs Family Size Beverages",
        blocks: [
          {
            type: "paragraph",
            text: "For a group, five flavors can be compared one drink against one gallon. A gallon of sweet tea, unsweet tea, or half tea and half lemonade is $8.49, and a gallon of raspberry lemonade or a fruit tea is $10.49. Calories in the table are for the whole gallon.",
          },
          { type: "comparison", id: "single-vs-gallon" },
          {
            type: "paragraph",
            text: [
              "Planning a party? Gallons, 2-liter soda, and bottled water are also on the ",
              { text: "catering menu", href: "/#catering" },
              ". Kids meals come with a drink choice that includes 1% milk, chocolate milk, raspberry lemonade, and soda; see the ",
              { text: "kids menu section", href: "/#kids-meal" },
              ".",
            ],
          },
        ],
      },
      {
        id: "refills-availability",
        heading: "Drink Refills and Availability",
        blocks: [
          {
            type: "paragraph",
            text: "We could not confirm Olive Garden’s drink refill policy from an official source, so we do not state one. Ask your server whether refills are included at your restaurant.",
          },
          {
            type: "list",
            items: [
              "Mocktails: Olive Garden did not list any drink called a mocktail on the pages we checked. The limonatas are alcohol-free sparkling lemonades.",
              "Non-alcoholic beer: Heineken 0.0 ($6.79, 70 calories) is sold in the wine and beer section.",
              "Not alcohol-free: Spiked Strawberry Lemonade on the cocktail list contains alcohol.",
              "Availability: Mango-Passion Fruit Iced Tea was listed as currently unavailable when we checked in November 2026.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "For an overview of every drink, including cocktails, see the ",
              { text: "Olive Garden drink menu", href: "/drink-menu" },
              ". Wine bottles and beer are on the ",
              { text: "Olive Garden wine and beer menu", href: "/wine-and-beer-to-go" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Non-Alcoholic Beverages (official online menu)", url: "https://www.olivegarden.com/menu/non-alcoholic-beverages" },
      { label: "Olive Garden catering (official)", url: "https://www.olivegarden.com/catering" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "What non-alcoholic drinks does Olive Garden serve?",
        answer:
          "Classic and raspberry lemonade, Sweet Pear and Strawberry-Passion Fruit limonatas, half iced tea and half lemonade, sweet, unsweet, and fruit iced teas, fountain soda, 2-liter soda, cappuccino, and Lavazza espresso.",
      },
      {
        question: "What lemonade flavors are available?",
        answer:
          "Classic Lemonade, Raspberry Lemonade, Sweet Pear Limonata, Strawberry-Passion Fruit Limonata, and half iced tea with half lemonade. The limonatas are mixed with sparkling water.",
      },
      {
        question: "Does Olive Garden have mocktails?",
        answer:
          "Olive Garden did not list a mocktail menu on the pages we checked. Its limonatas are alcohol-free sparkling lemonades, and it sells Heineken 0.0, a non-alcoholic beer.",
      },
      {
        question: "Which Olive Garden drinks have zero calories?",
        answer:
          "Fresh-brewed unsweet iced tea has 0 calories, as do the 1-liter San Pellegrino and Acqua Panna waters on the catering menu. Fountain soda starts at 0 depending on the soda.",
      },
      {
        question: "Does Olive Garden offer free drink refills?",
        answer:
          "We could not confirm a refill policy from an official Olive Garden source. Ask your server at your restaurant.",
      },
      {
        question: "Can you order gallon-size drinks to go?",
        answer:
          "Yes. Gallons of sweet tea, unsweet tea, and half tea and half lemonade were $8.49, and raspberry lemonade and fruit teas $10.49, for online pickup in November 2026. Prices may vary by location.",
      },
    ],
    related: [
      { categoryId: "drink-menu", text: "Every drink type at Olive Garden, including cocktails." },
      { categoryId: "wine-and-beer-to-go", text: "Wine bottles and beer to go, including Heineken 0.0." },
      { categoryId: "kids-meal", text: "Kids meals, each with a drink." },
      { categoryId: "catering", text: "Gallons, sodas, and water for groups." },
    ],
  },

  /* =====================================================================
   * 14. WINE AND BEER TO GO  (Batch 3, preview)
   * ===================================================================== */
  {
    categoryId: "wine-and-beer-to-go",
    primaryKeyword: "olive garden wine and beer menu",
    menuTitle: "Olive Garden Wine and Beer Menu",
    secondaryKeywords: [
      "olive garden wine list",
      "olive garden wine prices",
      "olive garden wine to go",
      "olive garden beer menu",
      "olive garden wine bottle prices",
      "olive garden moscato",
      "olive garden roscato",
      "olive garden red wine",
      "olive garden white wine",
      "olive garden beer prices",
    ],
    searchIntent: "See which wines and beers Olive Garden sells to go, what a bottle or beer costs, calories per serving unit, and the rules for buying alcohol to go.",
    metaTitle: "Olive Garden Wine and Beer Menu with Prices 2026",
    metaDescription:
      "Explore Olive Garden wines, beer, bottle prices, red and white wine options, calories and alcohol to-go ordering information.",
    h1: "Olive Garden Wine and Beer Menu with Prices 2026",
    intro: [
      "Olive Garden’s to-go wine list had 14 bottles from $25.50 to $34.50 and six beers at $6.29 or $6.79 for online pickup in November 2026. Wine and beer to go are sold only at select restaurants where the law allows, to guests 21 and older with a valid ID.",
      "Below you will find every bottle grouped by style, the beers, calories per bottle or beer, and how buying alcohol to go works.",
    ],
    contentReviewedAt: REVIEWED_B3,
    tableHeading: "Olive Garden Wine List and Bottle Prices",
    tableCaption: "Olive Garden Wine and Beer To Go: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Wine by the glass and draft beer prices are not published online.",
      "Wine is priced per bottle and beer per beer. Olive Garden does not state the bottle or container size.",
      "Heineken 0.0 is a non-alcoholic beer sold in this section.",
    ],
    nutritionNotes: [
      "Wine calories are per bottle and beer calories per beer, as listed on Olive Garden’s item pages. The nutrition guide gives general bottle values (630 for white and rosé, 660 for red), so some wines differ slightly.",
    ],
    featuredOfferingIds: [
      "wine-and-beer-to-go--sweet-red-roscato-rosso-dolce",
      "wine-and-beer-to-go--moscato-primo-amore",
      "wine-and-beer-to-go--chianti-classico-rocca-delle-macie",
      "wine-and-beer-to-go--pinot-noir-meiomi",
      "wine-and-beer-to-go--michelob-ultra",
    ],
    featuredHeading: "Olive Garden Wines and Beers with Photos",
    comparisons: [
      {
        id: "beer-menu",
        caption: "Olive Garden beer to go",
        columns: [{ kind: "text", label: "Alcohol", key: "alcohol" }, { kind: "price" }, { kind: "calories", label: "Calories per beer" }],
        rows: [
          { offeringId: "wine-and-beer-to-go--budweiser", text: { alcohol: "Yes" } },
          { offeringId: "wine-and-beer-to-go--bud-light", text: { alcohol: "Yes" } },
          { offeringId: "wine-and-beer-to-go--coors-light", text: { alcohol: "Yes" } },
          { offeringId: "wine-and-beer-to-go--michelob-ultra", text: { alcohol: "Yes" } },
          { offeringId: "wine-and-beer-to-go--miller-lite", text: { alcohol: "Yes" } },
          { offeringId: "wine-and-beer-to-go--heineken-0-0-non-alcoholic", text: { alcohol: "No (non-alcoholic)" } },
        ],
      },
      {
        id: "wine-styles",
        caption: "Olive Garden wines by style",
        columns: [{ kind: "text", label: "Style", key: "style" }, { kind: "price", label: "Price per bottle" }, { kind: "calories", label: "Calories per bottle" }],
        rows: [
          { offeringId: "wine-and-beer-to-go--moscato-primo-amore", text: { style: "Sweet white (Moscato)" } },
          { offeringId: "wine-and-beer-to-go--moscato-castello-del-poggio", text: { style: "Sweet white (Moscato)" } },
          { offeringId: "wine-and-beer-to-go--sweet-pink-moscato-blend-confetti", text: { style: "Sweet pink (Moscato blend)" } },
          { offeringId: "wine-and-beer-to-go--sweet-red-roscato-rosso-dolce", text: { style: "Sweet red" } },
          { offeringId: "wine-and-beer-to-go--white-zinfandel-sutter-home", text: { style: "Pink (White Zinfandel)" } },
          { offeringId: "wine-and-beer-to-go--pinot-grigio-cavit", text: { style: "White" } },
          { offeringId: "wine-and-beer-to-go--riesling-chateau-ste-michelle", text: { style: "White" } },
          { offeringId: "wine-and-beer-to-go--chardonnay-chateau-ste-michelle", text: { style: "White" } },
          { offeringId: "wine-and-beer-to-go--sauvignon-blanc-starborough", text: { style: "White" } },
          { offeringId: "wine-and-beer-to-go--red-blend-porta-vita", text: { style: "Red blend" } },
          { offeringId: "wine-and-beer-to-go--merlot-beringer", text: { style: "Red" } },
          { offeringId: "wine-and-beer-to-go--cabernet-robert-mondavi-private-selection", text: { style: "Red" } },
          { offeringId: "wine-and-beer-to-go--chianti-classico-rocca-delle-macie", text: { style: "Red (Italian Chianti Classico)" } },
          { offeringId: "wine-and-beer-to-go--pinot-noir-meiomi", text: { style: "Red" } },
        ],
        notes: ["Styles follow the wine names on Olive Garden’s menu. We do not add tasting notes or pairing advice."],
      },
    ],
    sections: [
      {
        id: "beer-menu",
        heading: "Olive Garden Beer Menu and Prices",
        blocks: [
          {
            type: "paragraph",
            text: "Five beers cost $6.29 each to go: Budweiser, Bud Light, Coors Light, Michelob Ultra, and Miller Lite. Heineken 0.0, a non-alcoholic beer, costs $6.79. Budweiser has 150 calories, the four light beers 100 each, and Heineken 0.0 has 70.",
          },
          { type: "comparison", id: "beer-menu" },
          {
            type: "paragraph",
            text: "Olive Garden’s nutrition guide also lists draft beer in the restaurant, but draft prices and sizes are not published online.",
          },
        ],
      },
      {
        id: "wine-styles",
        heading: "Red, White and Sweet Wine Options",
        blocks: [
          {
            type: "paragraph",
            text: "Of the 14 wines, four are sweet: two Moscatos, the Confetti sweet pink Moscato blend, and the Roscato Rosso Dolce sweet red. There are four whites, one White Zinfandel, and five reds, including an Italian Chianti Classico.",
          },
          { type: "comparison", id: "wine-styles" },
          {
            type: "list",
            items: [
              "Lowest price: six bottles cost $25.50, including Roscato, Confetti, Primo Amore Moscato, and Cavit Pinot Grigio.",
              "Highest price: Meiomi Pinot Noir at $34.50, $9.00 more than the $25.50 bottles (calculated).",
            ],
          },
        ],
      },
      {
        id: "wine-beer-calories",
        heading: "Wine and Beer Calories",
        blocks: [
          {
            type: "paragraph",
            text: "Each wine bottle is listed at 620 to 660 calories, and each beer at 100 to 150, with 70 for Heineken 0.0. Olive Garden does not give the bottle size, so we do not convert bottle calories into calories per glass.",
          },
          {
            type: "note",
            text: "Calories are Olive Garden’s published values. Please drink responsibly.",
          },
        ],
      },
      {
        id: "alcohol-to-go",
        heading: "How Olive Garden Alcohol To-Go Works",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Choose To Go on Olive Garden’s ordering page and select your restaurant. Wine and beer appear only where that restaurant sells them.",
              "Add your bottles or beers. Some locations require a food purchase with alcohol.",
              "Bring a valid ID when you pick up. The person picking up must be 21 or older.",
            ],
          },
          {
            type: "paragraph",
            text: "In the restaurant, wine by the glass, draft beer, and cocktails are also served. Glass and cocktail prices are not published online; the cocktails are listed on our drink menu page.",
          },
        ],
      },
      {
        id: "age-ordering-restrictions",
        heading: "Age and Ordering Restrictions",
        blocks: [
          {
            type: "list",
            items: [
              "Age: 21 or older, with a valid ID.",
              "Locations: wine and beer to go are offered at select locations only.",
              "Law: alcohol is sold to go only where permitted by law, and the rules differ by state and city.",
              "Food: a food purchase is required at select locations.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "This page is not legal advice; check with your restaurant. For alcohol-free choices, see the ",
              { text: "Olive Garden non-alcoholic drinks", href: "/non-alcoholic-beverages" },
              " page, and for every drink type, the ",
              { text: "Olive Garden drink menu", href: "/drink-menu" },
              ". Sweet wines go well with a look at the ",
              { text: "Olive Garden dessert menu", href: "/desserts" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden Wine & Beer To Go: featured wines (official online menu)", url: "https://www.olivegarden.com/menu/wine-beer-to-go/featured-wines" },
      { label: "Olive Garden Wine & Beer To Go: beer (official online menu)", url: "https://www.olivegarden.com/menu/wine-beer-to-go/beer" },
      NUTRITION_PDF,
    ],
    faqs: [
      {
        question: "What wines does Olive Garden offer?",
        answer:
          "The to-go list had 14 wines: Moscatos, Confetti sweet pink Moscato, Roscato Rosso Dolce, White Zinfandel, Pinot Grigio, Riesling, Chardonnay, Sauvignon Blanc, a Porta Vita red blend, Merlot, Cabernet, Chianti Classico, and Meiomi Pinot Noir.",
      },
      {
        question: "Does Olive Garden sell wine by the bottle?",
        answer:
          "Yes. Select locations sell bottles to go, from $25.50 to $34.50 when we checked in November 2026, to guests 21 and older with a valid ID where permitted by law.",
      },
      {
        question: "How much is Roscato at Olive Garden?",
        answer:
          "A bottle of Roscato Rosso Dolce was $25.50 to go in November 2026, listed at 660 calories per bottle. The glass price is not published online. Prices may vary by location.",
      },
      {
        question: "What types of beer are available?",
        answer:
          "Budweiser, Bud Light, Coors Light, Michelob Ultra, and Miller Lite at $6.29, and the non-alcoholic Heineken 0.0 at $6.79, on the to-go menu we checked.",
      },
      {
        question: "Can you order Olive Garden wine to go?",
        answer:
          "Yes, at select locations where permitted by law. You must be 21 or older with a valid ID, and some locations require a food purchase.",
      },
      {
        question: "Are wine and beer available at every Olive Garden location?",
        answer:
          "No. Olive Garden says wine and beer to go are available at select locations where permitted by law. Choose your restaurant on the ordering page to see whether it sells them.",
      },
    ],
    related: [
      { categoryId: "drink-menu", text: "Every drink type, including dine-in cocktails." },
      { categoryId: "non-alcoholic-beverages", text: "Lemonades, iced teas, soda, and coffee." },
      { categoryId: "desserts", text: "Desserts to enjoy with a sweet wine." },
    ],
  },
  /* =====================================================================
   * 15. GLUTEN-SENSITIVE MENU  (Batch 4, preview)
   * Official wording: "gluten-sensitive" (made without gluten-containing
   * ingredients, not tested to the FDA limit). Only the rotini pasta meets
   * the FDA gluten-free definition. Never a safety guarantee.
   * ===================================================================== */
  {
    categoryId: "gluten-sensitive",
    primaryKeyword: "olive garden gluten free menu",
    menuTitle: "Olive Garden Gluten Free Menu",
    secondaryKeywords: [
      "olive garden gluten-sensitive menu",
      "olive garden gluten-free pasta",
      "olive garden gluten-free rotini",
      "olive garden gluten-free menu with prices",
      "olive garden gluten-free breadsticks",
      "olive garden gluten-free kids menu",
      "olive garden gluten-free alfredo",
      "olive garden gluten-free salad",
      "olive garden celiac options",
      "olive garden allergen menu",
      "olive garden gluten-sensitive entrees",
    ],
    searchIntent: "Find Olive Garden's gluten-sensitive dishes with prices and calories, what the label means, and how to order with the official precautions.",
    metaTitle: "Olive Garden Gluten Free Menu with Prices 2026",
    metaDescription:
      "Explore Olive Garden's gluten-sensitive menu, pasta choices, entree prices, calories, kids meals and important allergen information.",
    h1: "Olive Garden Gluten Free Menu with Prices 2026",
    intro: [
      "Olive Garden does not have a certified gluten-free menu. It has a gluten-sensitive menu: ten dishes made without gluten-containing ingredients, from $7.49 kids meals to Herb-Grilled Salmon at $22.79 for online pickup in November 2026. The only item Olive Garden calls gluten-free is its rotini pasta.",
      "Below are all ten dishes with prices and calories, what changes compared with the regular plates, and Olive Garden’s own cautions about shared kitchens.",
    ],
    contentReviewedAt: REVIEWED_B4,
    tableHeading: "Olive Garden Gluten-Sensitive Menu Prices and Calories",
    tableIntro: [
      "Important: Olive Garden’s kitchens are shared and have no separate fryer, and gluten-sensitive dishes are not tested to the FDA gluten-free limit. These dishes are not guaranteed safe for people with celiac disease or a wheat allergy. Tell your server about your needs and check Olive Garden’s official allergen guide.",
    ],
    tableCaption: "Olive Garden Gluten-Sensitive Menu: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Gluten-sensitive meals come without breadsticks unless you ask for them, with a house salad without croutons or, where available, Zuppa Toscana.",
      "The three kids meals are for children 12 and under and include a side and 1% low-fat milk.",
    ],
    nutritionNotes: [
      "Calories are for the dish as listed. Kids meal calories do not include the side or the milk (1% milk adds 100 calories).",
    ],
    featuredOfferingIds: [
      "gluten-sensitive--rotini-pasta-with-marinara",
      "gluten-sensitive--rotini-pasta-with-meat-sauce",
      "gluten-sensitive--zuppa-toscana",
      "gluten-sensitive--famous-house-salad-without-croutons",
      "gluten-sensitive--grilled-chicken-with-rotini-pasta-and-marinara",
    ],
    featuredHeading: "Gluten-Sensitive Dishes with Photos",
    comparisons: [
      {
        id: "gs-vs-regular",
        caption: "Gluten-sensitive dishes vs the regular versions",
        columns: [
          { kind: "text", label: "What changes", key: "change" },
          { kind: "price", label: "Gluten-sensitive price" },
          { kind: "price", label: "Regular price", ref: "regular" },
          { kind: "calories", label: "Gluten-sensitive calories" },
          { kind: "calories", label: "Regular calories", ref: "regular" },
        ],
        rows: [
          {
            offeringId: "gluten-sensitive--grilled-chicken-parmigiana",
            refs: { regular: { offeringId: "classic-entrees--chicken-parmigiana" } },
            text: { change: "Grilled instead of breaded and fried; gluten-free rotini instead of spaghetti" },
          },
          {
            offeringId: "gluten-sensitive--6-oz-sirloin",
            label: "6 oz. Sirloin",
            refs: { regular: { offeringId: "classic-entrees--6-oz-sirloin" } },
            text: { change: "Parmesan garlic broccoli instead of fettuccine alfredo" },
          },
          {
            offeringId: "gluten-sensitive--herb-grilled-salmon",
            refs: { regular: { offeringId: "classic-entrees--herb-grilled-salmon" } },
            text: { change: "Same plate on both menus" },
          },
          {
            offeringId: "gluten-sensitive--rotini-pasta-with-marinara",
            refs: { regular: { offeringId: "classic-entrees--spaghetti-with-marinara" } },
            text: { change: "Gluten-free rotini instead of spaghetti" },
          },
          {
            offeringId: "gluten-sensitive--rotini-pasta-with-meat-sauce",
            refs: { regular: { offeringId: "classic-entrees--spaghetti-with-meat-sauce" } },
            text: { change: "Gluten-free rotini instead of spaghetti" },
          },
          {
            offeringId: "gluten-sensitive--famous-house-salad-without-croutons",
            refs: { regular: { offeringId: "soups-salad-and-breadsticks--famous-house-salad" } },
            text: { change: "No croutons, and no breadsticks unless requested" },
          },
        ],
        notes: [
          "Regular = the matching dish on the classic entrée or soups and salad menu. Prices are the same on both menus; the calories change with the side or pasta.",
        ],
      },
    ],
    optionTables: [
      {
        id: "gs-pasta-choices",
        caption: "Create Your Own Pasta choices labeled for gluten-sensitive guests",
        rows: [
          { optionId: "create-your-own-pasta--option--pasta--gluten-free-rotini", text: { label: "Gluten-free (meets the FDA definition)" } },
          { optionId: "create-your-own-pasta--option--sauce--marinara", text: { label: "(G)" } },
          { optionId: "create-your-own-pasta--option--sauce--meat-sauce", text: { label: "(G)" } },
          { optionId: "create-your-own-pasta--option--topping--one-grilled-chicken", text: { label: "(G)" } },
          { optionId: "create-your-own-pasta--option--topping--two-italian-sausage", text: { label: "(G)" } },
          { optionId: "create-your-own-pasta--option--topping--16-saut-ed-shrimp", text: { label: "(G)" } },
        ],
        columns: [{ kind: "text", label: "Olive Garden label", key: "label" }, { kind: "price" }, { kind: "calories" }],
        notes: [
          "(G) = made without gluten-containing ingredients, as labeled by Olive Garden on the Create Your Own Pasta listing. Alfredo, five cheese marinara, creamy mushroom, meatballs, and the fried toppings are not labeled (G).",
        ],
      },
    ],
    sections: [
      {
        id: "gluten-free-rotini",
        heading: "Gluten-Free Rotini and Pasta Options",
        blocks: [
          {
            type: "paragraph",
            text: "Gluten-free rotini is the only pasta Olive Garden calls gluten-free. Olive Garden says it is made mainly from brown rice flour, meets the FDA gluten-free definition, and is cooked and held separately from other pasta.",
          },
          {
            type: "list",
            items: [
              "Rotini Pasta with Marinara ($13.99, 530 calories) or with Meat Sauce ($13.99, 680 calories), each from the gluten-sensitive menu.",
              "Grilled chicken can be added for $4.99; Olive Garden also lists shrimp or Italian sausage as add-ons.",
              [
                "In ",
                { text: "Olive Garden Create Your Own Pasta", href: "/create-your-own-pasta" },
                ", you can choose gluten-free rotini with a sauce and toppings labeled (G).",
              ],
            ],
          },
          { type: "optionTable", id: "gs-pasta-choices" },
          {
            type: "paragraph",
            text: "Alfredo sauce is not labeled gluten-sensitive or (G) on the menus we checked, so Olive Garden does not offer a gluten-sensitive Alfredo dish.",
          },
        ],
      },
      {
        id: "gs-entrees-kids",
        heading: "Gluten-Sensitive Entrees and Kids Meals",
        blocks: [
          {
            type: "paragraph",
            text: "Four adult entrées are on the gluten-sensitive menu: Herb-Grilled Salmon, Grilled Chicken Parmigiana, 6 oz. Sirloin, and Rotini Pasta (with marinara or meat sauce). Each costs the same as its regular version, but the side or pasta changes, and so do the calories.",
          },
          { type: "comparison", id: "gs-vs-regular" },
          { type: "subheading", text: "Gluten-sensitive kids meals" },
          {
            type: "paragraph",
            text: [
              "Three kids meals use gluten-free rotini: Grilled Chicken with Rotini Pasta & Marinara ($9.98, 430 calories), Rotini with Marinara ($7.49, 260), and Rotini with Meat Sauce ($7.49, 340). Each comes with grapes or broccoli and 1% low-fat milk. Other kids meals are compared on the ",
              { text: "Olive Garden kids menu", href: "/kids-meal" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "breadsticks-gluten",
        heading: "Are Olive Garden Breadsticks Gluten-Free?",
        blocks: [
          {
            type: "paragraph",
            text: "No gluten-free or gluten-sensitive breadsticks were on the menu we checked. Olive Garden leaves breadsticks off its gluten-sensitive meals to accommodate dietary needs, and serves them only if you ask. The house salad on this menu is served without croutons.",
          },
          {
            type: "list",
            items: [
              "First course: Famous House Salad without croutons (110 calories) or, where available, Zuppa Toscana (220 calories).",
              "Dressing and other salad ingredients are not listed separately on the gluten-sensitive menu; check the allergen guide for details.",
            ],
          },
        ],
      },
      {
        id: "gluten-sensitive-vs-gluten-free",
        heading: "Gluten-Sensitive vs Gluten-Free",
        blocks: [
          {
            type: "paragraph",
            text: "The two labels mean different things at Olive Garden:",
          },
          {
            type: "list",
            items: [
              "Gluten-sensitive: made without gluten-containing ingredients, but not tested to the FDA gluten-free limit of 20 parts per million. This label covers the dishes on this page and the (G) sauces and toppings.",
              "Gluten-free: used only for the rotini pasta, which meets the FDA definition.",
            ],
          },
          {
            type: "paragraph",
            text: "We use Olive Garden’s own labels. We do not mark other dishes as gluten-free based on their ingredients.",
          },
        ],
      },
      {
        id: "cross-contact-allergens",
        heading: "Cross-Contact and Allergen Information",
        blocks: [
          {
            type: "note",
            text: "Olive Garden’s kitchens prepare many dishes with wheat, and there is no separate fryer. Cross-contact can happen even with gluten-sensitive dishes, so they are not a guarantee for people with celiac disease or a wheat allergy. Please make your own decision with Olive Garden’s official allergen guide and, if needed, your doctor.",
          },
          {
            type: "list",
            items: [
              "Olive Garden’s allergen guide is based on information from its suppliers.",
              "When you tell your server about an allergy, Olive Garden says the order is flagged for the kitchen, which follows extra steps such as changing gloves and utensils.",
            ],
          },
        ],
      },
      {
        id: "order-gluten-sensitive",
        heading: "How to Order Gluten-Sensitive Meals",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Choose a dish from the gluten-sensitive menu, or build a pasta with gluten-free rotini and (G) sauces and toppings.",
              "Tell your server that you are avoiding gluten, so the order is flagged for the kitchen.",
              "Ask for no breadsticks and the salad without croutons, or choose Zuppa Toscana where available.",
              "For a to-go order, choose items from the gluten-sensitive section and contact the restaurant if you have an allergy.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "Regular entrées for the rest of the table are on the ",
              { text: "Olive Garden classic entrees", href: "/classic-entrees" },
              " page, and the full Zuppa Toscana details are on ",
              { text: "Olive Garden soup, salad and breadsticks", href: "/soups-salad-and-breadsticks" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden gluten-sensitive dining (official)", url: "https://www.olivegarden.com/nutrition/gluten-sensitive-diet" },
      { label: "Olive Garden gluten-sensitive menu (official)", url: "https://www.olivegarden.com/menu-listing/gluten-sensitive" },
      { label: "Olive Garden allergen guide (official PDF)", url: "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf" },
      { label: "Create Your Own Pasta (official item page)", url: "https://www.olivegarden.com/menu/create-your-own-pasta/prod80412" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden gluten-sensitive dining (official)", url: "https://www.olivegarden.com/nutrition/gluten-sensitive-diet" },
    faqs: [
      {
        question: "Does Olive Garden have a gluten-free menu?",
        answer:
          "Not a certified one. Olive Garden has a gluten-sensitive menu of ten dishes made without gluten-containing ingredients. Only its rotini pasta is called gluten-free.",
      },
      {
        question: "Does Olive Garden offer gluten-free pasta?",
        answer:
          "Yes. The gluten-free rotini, made mainly from brown rice flour, meets the FDA gluten-free definition and is cooked separately. It is served with marinara or meat sauce ($13.99) and in three kids meals.",
      },
      {
        question: "Are Olive Garden breadsticks gluten-free?",
        answer:
          "No gluten-free breadsticks were on the menu we checked. Olive Garden leaves breadsticks off gluten-sensitive meals unless you ask for them.",
      },
      {
        question: "Is Olive Garden gluten-sensitive food suitable for people with celiac disease?",
        answer:
          "Olive Garden does not guarantee it. Its gluten-sensitive dishes are not tested to the FDA gluten-free limit, kitchens are shared, and there is no separate fryer. People with celiac disease should review the official allergen guide and talk to their server.",
      },
      {
        question: "Does Olive Garden have gluten-sensitive kids meals?",
        answer:
          "Yes, three: Grilled Chicken with Rotini Pasta & Marinara ($9.98), Rotini with Marinara ($7.49), and Rotini with Meat Sauce ($7.49), each with gluten-free rotini, a side, and 1% milk.",
      },
      {
        question: "How can I order a gluten-sensitive meal at Olive Garden?",
        answer:
          "Choose from the gluten-sensitive menu, tell your server you are avoiding gluten so the order is flagged, and ask for no breadsticks and no croutons.",
      },
    ],
    related: [
      { categoryId: "create-your-own-pasta", text: "Build a pasta with gluten-free rotini and (G) sauces." },
      { categoryId: "kids-meal", text: "All kids meals, including the gluten-sensitive ones." },
      { categoryId: "classic-entrees", text: "The regular versions of these dishes." },
      { categoryId: "soups-salad-and-breadsticks", text: "Zuppa Toscana and the house salad." },
    ],
  },

  /* =====================================================================
   * 16. KIDS MENU  (Batch 4, preview)
   * ===================================================================== */
  {
    categoryId: "kids-meal",
    primaryKeyword: "olive garden kids menu",
    menuTitle: "Olive Garden Kids Menu",
    secondaryKeywords: [
      "olive garden kids meal prices",
      "olive garden kids menu with prices",
      "olive garden kids menu calories",
      "olive garden children's menu",
      "olive garden kids menu age limit",
      "olive garden kids eat free",
      "olive garden kids pasta",
      "olive garden kids alfredo",
      "olive garden kids pizza",
      "olive garden kids meal sides",
      "olive garden kids drinks",
      "olive garden gluten-sensitive kids meals",
    ],
    searchIntent: "Help parents compare Olive Garden kids meals by price, calories, and what is included, and answer age and kids-eat-free questions honestly.",
    metaTitle: "Olive Garden Kids Menu with Prices & Calories 2026",
    metaDescription:
      "Explore Olive Garden kids meals with prices, calories, pasta, pizza, chicken, available sides, drinks and meal eligibility information.",
    h1: "Olive Garden Kids Menu with Prices 2026",
    intro: [
      "Most Olive Garden kids meals cost $7.49, and the Grilled Chicken with Rotini Pasta & Marinara is $9.98, for online pickup in November 2026. Every kids meal comes with a side and a drink, such as 1% low-fat milk, but not with soup, salad, or breadsticks.",
      "Below are all 11 kids meals with prices and calories, the sides and drinks you can choose, the age rules, and the gluten-sensitive choices.",
    ],
    contentReviewedAt: REVIEWED_B4,
    tableHeading: "Olive Garden Kids Meal Prices and Calories",
    tableCaption: "Olive Garden Kids Meals: Prices and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Dine-in prices were not checked.",
      "Every kids meal includes a side and a drink. Soup, salad, and breadsticks are not included.",
      "The pasta meals let you choose fettuccine, small shells, or spaghetti.",
    ],
    nutritionNotes: [
      "Read the calorie basis under each item. For the pasta meals sold by sauce (meat sauce, tomato sauce, five cheese marinara), the number is the sauce only; the pasta, side, and milk together add 305 to 570 calories. For other meals, the side and the milk are listed separately (1% milk is 100 calories).",
    ],
    featuredOfferingIds: [
      "kids-meal--kids-pizza",
      "kids-meal--kids-macaroni-and-cheese",
      "kids-meal--kids-cheese-ravioli",
      "kids-meal--kids-alfredo-pasta",
      "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara",
    ],
    featuredHeading: "Olive Garden Kids Meals with Photos",
    comparisons: [
      {
        id: "kids-meals-compared",
        caption: "Olive Garden kids meals compared",
        columns: [
          { kind: "text", label: "Type", key: "type" },
          { kind: "price" },
          { kind: "calories" },
          { kind: "text", label: "What the calories cover", key: "covers" },
        ],
        rows: [
          { offeringId: "kids-meal--kids-pizza", text: { type: "Pizza", covers: "Cheese pizza; pepperoni not listed separately" } },
          { offeringId: "kids-meal--kids-chicken-fingers", text: { type: "Chicken", covers: "Chicken fingers; ketchup adds 80" } },
          { offeringId: "kids-meal--kids-grilled-chicken-with-rotini-pasta-and-marinara", label: "Kids Grilled Chicken with Rotini & Marinara", text: { type: "Chicken and pasta", covers: "Main dish" } },
          { offeringId: "kids-meal--kids-macaroni-and-cheese", text: { type: "Pasta", covers: "Main dish" } },
          { offeringId: "kids-meal--kids-cheese-ravioli", text: { type: "Pasta", covers: "Main dish" } },
          { offeringId: "kids-meal--kids-alfredo-pasta", text: { type: "Pasta", covers: "As listed; pasta, side, and milk listed separately" } },
          { offeringId: "kids-meal--kids-rotini-with-marinara", text: { type: "Pasta (gluten-free rotini)", covers: "Main dish" } },
          { offeringId: "kids-meal--kids-rotini-with-meat-sauce", text: { type: "Pasta (gluten-free rotini)", covers: "Main dish" } },
          { offeringId: "kids-meal--kids-meat-sauce-pasta", text: { type: "Pasta", covers: "Sauce only" } },
          { offeringId: "kids-meal--kids-five-cheese-marinara-pasta", text: { type: "Pasta", covers: "Sauce only" } },
          { offeringId: "kids-meal--kids-tomato-sauce-pasta", text: { type: "Pasta", covers: "Sauce only" } },
        ],
        notes: ["The calories are not all measured the same way, so compare them only within the same “What the calories cover” group."],
      },
    ],
    sections: [
      {
        id: "kids-meal-includes",
        heading: "What Comes with Olive Garden Kids Meals?",
        blocks: [
          {
            type: "paragraph",
            text: "A kids meal is one main dish, one side, and one drink. The listings name 1% low-fat milk as the included drink, and the drink list also offers other choices. Kids meals do not come with soup, salad, or breadsticks the way adult entrées do.",
          },
          {
            type: "paragraph",
            text: "Here is what a full meal adds up to with Olive Garden’s published values (our calculations):",
          },
          {
            type: "list",
            items: [
              "Kids Chicken Fingers (300) with ketchup (80), grapes (40), and 1% milk (100): 520 calories.",
              "The same meal with french fries (290) instead of grapes: 770 calories.",
              "Kids Cheese Ravioli (340) with broccoli (150) and 1% milk (100): 590 calories.",
            ],
          },
        ],
      },
      {
        id: "kids-sides-drinks",
        heading: "Olive Garden Kids Meal Sides and Drinks",
        blocks: [
          { type: "subheading", text: "Side choices" },
          {
            type: "list",
            items: [
              "Grapes: 40 calories",
              "Broccoli: 150 calories",
              "Spaghetti with tomato sauce: 180 calories",
              "Mashed potatoes: 200 calories",
              "French fries: 290 calories",
            ],
          },
          {
            type: "paragraph",
            text: "Side calories are from Olive Garden’s nutrition guide; the online menu shows a range of 35 to 250 calories for the sides. The gluten-sensitive kids meals come with grapes or broccoli.",
          },
          { type: "subheading", text: "Drink choices" },
          {
            type: "paragraph",
            text: [
              "The kids drink list includes 1% low-fat milk, 1% chocolate milk, raspberry lemonade, sweet tea, Minute Maid, Coke, Diet Coke, Coke Zero, Sprite, and Dr Pepper. Calories for these drinks are on our ",
              { text: "Olive Garden non-alcoholic drinks", href: "/non-alcoholic-beverages" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "kids-pasta-pizza-chicken",
        heading: "Kids Pasta, Pizza and Chicken Options",
        blocks: [
          {
            type: "paragraph",
            text: "Eight of the 11 kids meals are pasta. Four are named for their sauce (Alfredo, meat sauce, tomato sauce, or five cheese marinara) and let you choose fettuccine, small shells, or spaghetti; the others are set dishes: macaroni and cheese, cheese ravioli with tomato sauce, and two gluten-free rotini meals.",
          },
          { type: "comparison", id: "kids-meals-compared" },
          {
            type: "list",
            items: [
              "Pizza: a cheese or pepperoni kids pizza with marinara and mozzarella.",
              "Chicken: lightly breaded chicken fingers, or a grilled chicken breast with gluten-free rotini and marinara ($9.98).",
              "Adding protein to the pasta meals, such as sautéed shrimp, costs extra.",
            ],
          },
        ],
      },
      {
        id: "kids-age",
        heading: "Olive Garden Kids Menu Age Requirements",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden words the age limit two ways. The kids menu says the meals are for children under 12, while Olive Garden’s FAQ says the kids menu is for ages 12 and under. If your child is exactly 12, ask your restaurant which rule it follows.",
          },
        ],
      },
      {
        id: "kids-eat-free",
        heading: "Do Kids Eat Free at Olive Garden?",
        blocks: [
          {
            type: "paragraph",
            text: "We found no kids-eat-free offer on Olive Garden’s official specials, menu, or FAQ pages when we checked in November 2026. Olive Garden also says it does not have a rewards program. If you see a kids-eat-free deal advertised, confirm it with your restaurant before you go.",
          },
        ],
      },
      {
        id: "gs-kids-meals",
        heading: "Gluten-Sensitive Kids Meal Options",
        blocks: [
          {
            type: "paragraph",
            text: [
              "Three kids meals are on Olive Garden’s gluten-sensitive menu, all made with gluten-free rotini: Grilled Chicken with Rotini Pasta & Marinara, Rotini with Marinara, and Rotini with Meat Sauce. Olive Garden’s kitchens are shared, so read the precautions on our ",
              { text: "Olive Garden gluten free menu", href: "/gluten-sensitive" },
              " page before you order.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "For dessert ideas, see the ",
              { text: "Olive Garden dessert menu", href: "/desserts" },
              ", and for the adults at the table, the ",
              { text: "Olive Garden classic entrees", href: "/classic-entrees" },
              ".",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden kids meals (official online menu)", url: "https://www.olivegarden.com/menu/kids-meals-for-children-under-12" },
      { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
    faqs: [
      {
        question: "How much is a kids meal at Olive Garden?",
        answer:
          "Most kids meals were $7.49 for online pickup in November 2026, and the Grilled Chicken with Rotini Pasta & Marinara was $9.98. Each includes a side and a drink. Prices may vary by location.",
      },
      {
        question: "What comes with an Olive Garden kids meal?",
        answer:
          "A main dish, one side (grapes, broccoli, spaghetti with tomato sauce, mashed potatoes, or french fries), and a drink such as 1% low-fat milk. Soup, salad, and breadsticks are not included.",
      },
      {
        question: "What age is the Olive Garden kids menu for?",
        answer:
          "The kids menu says children under 12, and Olive Garden’s FAQ says ages 12 and under. Ask your restaurant if your child is 12.",
      },
      {
        question: "Do kids eat free at Olive Garden?",
        answer:
          "We found no kids-eat-free offer on Olive Garden’s official pages in November 2026, and Olive Garden has no rewards program. Confirm any advertised deal with your restaurant.",
      },
      {
        question: "What sides come with kids meals?",
        answer:
          "Grapes (40 calories), broccoli (150), spaghetti with tomato sauce (180), mashed potatoes (200), or french fries (290), according to Olive Garden’s nutrition guide.",
      },
      {
        question: "Does Olive Garden offer gluten-sensitive kids meals?",
        answer:
          "Yes. Three kids meals use gluten-free rotini and are on the gluten-sensitive menu. They are not guaranteed gluten-free because the kitchen is shared.",
      },
      {
        question: "Can kids meals be ordered to go?",
        answer:
          "Yes. All 11 kids meals were on the online ordering menu for pickup, and the prices on this page are those online pickup prices.",
      },
    ],
    related: [
      { categoryId: "gluten-sensitive", text: "Gluten-sensitive dishes and Olive Garden’s precautions." },
      { categoryId: "desserts", text: "Desserts to share after the meal." },
      { categoryId: "non-alcoholic-beverages", text: "Lemonades, iced teas, and soda with calories." },
      { categoryId: "classic-entrees", text: "Entrées for the adults at the table." },
    ],
  },

  /* =====================================================================
   * 17. CATERING MENU  (Batch 4, preview)
   * ===================================================================== */
  {
    categoryId: "catering",
    primaryKeyword: "olive garden catering menu",
    menuTitle: "Olive Garden Catering Menu",
    secondaryKeywords: [
      "olive garden catering menu with prices",
      "olive garden catering prices per person",
      "olive garden catering for 10 people",
      "olive garden catering for 20 people",
      "olive garden catering for 50 people",
      "olive garden catering for 100 people",
      "olive garden catering packages",
      "olive garden catering pasta station",
      "olive garden catering delivery",
      "olive garden catering minimum order",
      "olive garden catering family meals",
      "olive garden wedding catering",
      "olive garden catering desserts",
      "olive garden catering trays",
    ],
    searchIntent: "Plan an Olive Garden catering order for a group: packages, serving sizes, cost per person, how much to order, and delivery rules.",
    metaTitle: "Olive Garden Catering Menu with Prices & Packages 2026",
    metaDescription:
      "Explore Olive Garden catering packages, pasta stations, family-size trays, prices per person, serving sizes and catering ideas for groups.",
    h1: "Olive Garden Catering Menu with Prices 2026",
    intro: [
      "Olive Garden catering has three ways to feed a group: meal combinations for 8 to 14 people ($224.00), the Create Your Own Pasta Station for 10 people ($147.50), and individual pans that serve 4 to 6 ($47.99 to $74.99), for online pickup in November 2026.",
      "Below you will find the full catering menu, cost per person, how many packages to order for 10, 20, 50, or 100 guests, and Olive Garden’s delivery rules.",
    ],
    contentReviewedAt: REVIEWED_B4,
    tableHeading: "Olive Garden Catering Menu Prices",
    tableCaption: "Olive Garden Catering Menu: Prices, Servings, and Calories",
    priceNotes: [
      "Prices are online pickup prices from Olive Garden’s official website, checked in November 2026, and may vary by location across the USA. Olive Garden notes that catering prices vary in certain locations.",
      "Calories are for the whole pan, tray, package, or container, not per person.",
      "Pans, soups, the jumbo salad, and breadsticks have the same price and calories on the Family Style menu.",
      "The Pumpkin Cookie Butter Cheesecake is a limited-time dessert.",
    ],
    nutritionNotes: [
      "Meal combinations show a calorie range because you choose the second pan and the cake.",
    ],
    featuredOfferingIds: [
      "catering--chicken-parmigiana-combination",
      "catering--create-your-own-pasta-station",
      "catering--lasagna-classico",
      "catering--grilled-chicken-breasts",
      "catering--tiramisu",
    ],
    featuredHeading: "Olive Garden Catering with Photos",
    comparisons: [
      {
        id: "catering-packages",
        caption: "Olive Garden catering packages and price per person",
        columns: [
          { kind: "serving", label: "What is included" },
          { kind: "price" },
          { kind: "pricePerServing", label: "Per person (largest group)" },
          { kind: "pricePerServing", label: "Per person (smallest group)", use: "min" },
        ],
        rows: [
          { offeringId: "catering--chicken-parmigiana-combination", servings: 14, servingsMin: 8 },
          { offeringId: "catering--lasagna-combination", servings: 14, servingsMin: 8 },
          { offeringId: "catering--create-your-own-pasta-station", servings: 10, servingsMin: 10 },
        ],
        notes: ["Combinations are listed as serving 8-14 people and the station as serving 10."],
      },
      {
        id: "catering-pans",
        caption: "Catering pans (serve 4-6): price per person",
        columns: [
          { kind: "price" },
          { kind: "pricePerServing", label: "Per person (6 people)" },
          { kind: "pricePerServing", label: "Per person (4 people)", use: "min" },
          { kind: "calories", label: "Calories (whole pan)" },
        ],
        rows: [
          { offeringId: "catering--spaghetti-with-marinara-sauce", option: "Pan", label: "Spaghetti with Marinara Sauce", servings: 6, servingsMin: 4 },
          { offeringId: "catering--spaghetti-with-meat-sauce", option: "Pan", label: "Spaghetti with Meat Sauce", servings: 6, servingsMin: 4 },
          { offeringId: "catering--fettuccine-alfredo", option: "Pan", label: "Fettuccine Alfredo", servings: 6, servingsMin: 4 },
          { offeringId: "catering--five-cheese-ziti-al-forno", servings: 6, servingsMin: 4 },
          { offeringId: "catering--cheese-ravioli-with-marinara-or-meat-sauce", servings: 6, servingsMin: 4 },
          { offeringId: "catering--lasagna-classico", option: "Serves up to 6", label: "Lasagna Classico (up to 6)", servings: 6 },
          { offeringId: "catering--chicken-parmigiana", servings: 6, servingsMin: 4 },
          { offeringId: "catering--chicken-scampi", servings: 6, servingsMin: 4 },
          { offeringId: "catering--chicken-alfredo", option: "Pan, grilled chicken alfredo", label: "Chicken Alfredo", servings: 6, servingsMin: 4 },
          { offeringId: "catering--shrimp-scampi", servings: 6, servingsMin: 4 },
          { offeringId: "catering--shrimp-alfredo", servings: 6, servingsMin: 4 },
          { offeringId: "catering--chicken-tortelloni-alfredo", servings: 6, servingsMin: 4 },
          { offeringId: "catering--chicken-and-shrimp-carbonara", servings: 6, servingsMin: 4 },
        ],
        notes: [
          "Lasagna Classico is listed as serving “up to 6” (and up to 12 for the larger $63.99 pan), so no lower number is given. Pans with meatballs, sausage, or broccoli cost more; see the full table above.",
        ],
      },
      {
        id: "catering-extras",
        caption: "Catering appetizers, sides, and drinks",
        columns: [{ kind: "serving", label: "Size" }, { kind: "price" }, { kind: "calories", label: "Calories" }],
        rows: [
          { offeringId: "catering--fried-mozzarella" },
          { offeringId: "catering--spinach-artichoke-dip" },
          { offeringId: "catering--toasted-beef-ravioli" },
          { offeringId: "catering--grilled-chicken-breasts" },
          { offeringId: "catering--chicken-fingers" },
          { offeringId: "catering--italian-meatballs" },
          { offeringId: "catering--italian-sausage" },
          { offeringId: "catering--broccoli" },
          { offeringId: "catering--gallon-iced-teas-and-raspberry-lemonade", label: "Gallon sweet tea", option: "Gallon Sweet Tea" },
          { offeringId: "catering--2-liter-soda" },
        ],
        notes: [
          "Cakes: Tiramisu, Black Tie Mousse Cake, and Sicilian Cheesecake cost $40.49 for a half (serves 6) and $73.99 for a whole (serves 12); the limited-time Pumpkin Cookie Butter Cheesecake costs the same and serves 5 or 10. All catering items are in the full table above.",
        ],
      },
      {
        id: "catering-vs-family",
        caption: "Catering vs Family Style: what each menu offers",
        columns: [
          { kind: "text", label: "Catering menu", key: "catering" },
          { kind: "text", label: "Family Style menu", key: "family" },
        ],
        rows: [
          { offeringId: "catering--chicken-alfredo", label: "Pans for 4-6", text: { catering: "Yes, same price", family: "Yes, same price" } },
          { offeringId: "catering--chicken-parmigiana-combination", label: "Meal combinations for 8-14", text: { catering: "Yes ($224.00)", family: "No" } },
          { offeringId: "catering--create-your-own-pasta-station", label: "Create Your Own Pasta Station", text: { catering: "Yes ($147.50, serves 10)", family: "No" } },
          { offeringId: "family-style-meals--family-style-lasagna-bundle", label: "Family bundles with salad and breadsticks", text: { catering: "No", family: "Yes ($66.49–$99.99)" } },
          { offeringId: "catering--tiramisu", label: "Half and whole cakes", text: { catering: "Yes", family: "No" } },
          { offeringId: "catering--alfredo-dipping-sauce", label: "Dipping sauces by the pint, trays of proteins and appetizers", text: { catering: "Yes", family: "No" } },
        ],
      },
    ],
    servingPlans: [
      {
        id: "plan-10",
        caption: "Olive Garden catering for 10 people",
        guests: 10,
        plans: [
          { label: "Create Your Own Pasta Station (serves 10)", offeringId: "catering--create-your-own-pasta-station", servesPerUnit: 10 },
          { label: "Meal Combination (counted at 8 people each)", offeringId: "catering--chicken-parmigiana-combination", servesPerUnit: 8 },
        ],
      },
      {
        id: "plan-20",
        caption: "Olive Garden catering for 20 people",
        guests: 20,
        plans: [
          { label: "Create Your Own Pasta Station (serves 10)", offeringId: "catering--create-your-own-pasta-station", servesPerUnit: 10 },
          { label: "Meal Combination (counted at 8 people each)", offeringId: "catering--chicken-parmigiana-combination", servesPerUnit: 8 },
        ],
      },
      {
        id: "plan-50",
        caption: "Olive Garden catering for 50 people",
        guests: 50,
        plans: [
          { label: "Create Your Own Pasta Station (serves 10)", offeringId: "catering--create-your-own-pasta-station", servesPerUnit: 10 },
          { label: "Meal Combination (counted at 8 people each)", offeringId: "catering--chicken-parmigiana-combination", servesPerUnit: 8 },
        ],
      },
      {
        id: "plan-100",
        caption: "Olive Garden catering for 100 people",
        guests: 100,
        plans: [
          { label: "Create Your Own Pasta Station (serves 10)", offeringId: "catering--create-your-own-pasta-station", servesPerUnit: 10 },
          { label: "Meal Combination (counted at 8 people each)", offeringId: "catering--chicken-parmigiana-combination", servesPerUnit: 8 },
        ],
      },
    ],
    sections: [
      {
        id: "meal-combinations",
        heading: "Catering Meal Combinations and Packages",
        blocks: [
          {
            type: "paragraph",
            text: "A meal combination is a complete package for 8 to 14 people. Both combinations cost $224.00 and include two jumbo house salads, 24 breadsticks, a gallon of iced tea, a whole cake, and two pans of food:",
          },
          {
            type: "list",
            items: [
              "Chicken Parmigiana Combination: a pan of chicken parmigiana (8 breasts), a pan of spaghetti with marinara, and a pan of Five Cheese Ziti al Forno or Fettuccine Alfredo.",
              "Lasagna Combination: a pan of Lasagna Classico and a pan of Five Cheese Ziti al Forno or Fettuccine Alfredo.",
              "Cake choices: Black Tie Mousse Cake, Sicilian Cheesecake, or Tiramisu.",
            ],
          },
          { type: "comparison", id: "catering-packages" },
          {
            type: "paragraph",
            text: "Individual pans are different: each pan is one dish for 4 to 6 people, with no salad, breadsticks, drink, or dessert. Add those separately if you build your own spread from pans.",
          },
        ],
      },
      {
        id: "pasta-station",
        heading: "Create Your Own Pasta Station",
        blocks: [
          {
            type: "paragraph",
            text: "The Create Your Own Pasta Station ($147.50) serves 10 people. Guests build their own plates from two pastas, three sauces, and three proteins, and the station also includes salad and breadsticks.",
          },
          {
            type: "list",
            items: [
              "Pastas: spaghetti and fettuccine.",
              "Sauces: Alfredo, meat sauce, and marinara.",
              "Proteins: grilled chicken, meatballs, and Italian sausage.",
              "Ordering limits: up to 3 stations (30 people) for online pickup, up to 8 stations for delivery with 24 hours’ notice. Online pickup orders over $350 are placed by phone.",
            ],
          },
          {
            type: "paragraph",
            text: [
              "The station’s 17,280 calories are for all 10 servings together. The single-plate version is explained on our ",
              { text: "Olive Garden Create Your Own Pasta", href: "/create-your-own-pasta" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "catering-price-per-person",
        heading: "Olive Garden Catering Prices Per Person",
        blocks: [
          {
            type: "paragraph",
            text: "Olive Garden’s catering page advertises meal combinations “starting at $13.75 per person” and the pasta station “from $13.50 per person,” and business catering “starting at $12 per person.” Those starting prices depend on conditions such as the time of day and location. At the online pickup prices we checked, our calculation gives:",
          },
          {
            type: "list",
            items: [
              "Pasta station: $14.75 per person ($147.50 ÷ 10).",
              "Meal combination: $16.00 per person at 14 people, $28.00 at 8 people ($224.00 ÷ 14 or 8).",
              "Base pans: from about $8.00 per person (spaghetti, $47.99 ÷ 6) to $18.12 (Chicken Tortelloni Alfredo or Chicken and Shrimp Carbonara, $72.49 ÷ 4), before add-ons such as broccoli or meatballs, salad, breadsticks, drinks, and dessert.",
            ],
          },
          { type: "comparison", id: "catering-pans" },
        ],
      },
      {
        id: "catering-by-headcount",
        heading: "Olive Garden Catering for 10, 20, 50 and 100 People",
        blocks: [
          {
            type: "paragraph",
            text: "These tables show how many stations or combinations to order. To avoid running short, we divide by the smaller official serving number (8 for a combination, 10 for a station) and round up. Totals are food only: tax, delivery fees, and tips are extra.",
          },
          { type: "subheading", text: "Catering for 10 People" },
          { type: "servingPlan", id: "plan-10" },
          {
            type: "paragraph",
            text: "For 10 people, one pasta station covers everyone. One meal combination is listed as serving up to 14, so one may be enough if your guests eat lighter portions; two cover the smaller serving count.",
          },
          { type: "subheading", text: "Catering for 20 People" },
          { type: "servingPlan", id: "plan-20" },
          {
            type: "paragraph",
            text: "Two pasta stations feed 20 and can still be picked up online (up to 3 stations). Based on the upper count of 14 people, two combinations ($448.00) could also be enough.",
          },
          { type: "subheading", text: "Catering for 50 People" },
          { type: "servingPlan", id: "plan-50" },
          {
            type: "paragraph",
            text: "Five stations are more than the 3-station online pickup limit, so order them for delivery (up to 8 stations, 24 hours’ notice) or call the restaurant. Based on the upper count of 14, four combinations ($896.00) would be the minimum.",
          },
          { type: "subheading", text: "Catering for 100 People" },
          { type: "servingPlan", id: "plan-100" },
          {
            type: "paragraph",
            text: "Ten stations are above both online limits, so plan a 100-person order directly with your restaurant. Olive Garden lists the station for groups from 10 to more than 1,000 guests. Based on the upper count of 14, eight combinations ($1,792.00) would be the minimum.",
          },
        ],
      },
      {
        id: "catering-appetizers-desserts-drinks",
        heading: "Catering Appetizers, Desserts and Drinks",
        blocks: [
          {
            type: "paragraph",
            text: "To round out an order, catering also has appetizer trays, protein trays, broccoli, half and whole cakes, dipping sauces by the pint, gallons of iced tea or lemonade, 2-liter soda, and 1-liter bottled water.",
          },
          { type: "comparison", id: "catering-extras" },
          {
            type: "paragraph",
            text: [
              "Appetizers in single-order sizes are on the ",
              { text: "Olive Garden appetizers menu", href: "/appetizers" },
              ", cakes by the slice on the ",
              { text: "Olive Garden dessert menu", href: "/desserts" },
              ", and drink calories on the ",
              { text: "Olive Garden non-alcoholic drinks", href: "/non-alcoholic-beverages" },
              " page.",
            ],
          },
        ],
      },
      {
        id: "delivery-minimum",
        heading: "Catering Delivery Fees and Minimum Order",
        blocks: [
          {
            type: "list",
            items: [
              "Delivery minimum: $100 (Olive Garden catering page). We did not find a minimum for pickup orders.",
              "Delivery fee: the catering page lists 10% up to $500 and 5% after that. Ask your restaurant how it applies to your order.",
              "Timing: order by 5 PM for next-day lunch delivery. Pasta stations for delivery need 24 hours’ notice, and lasagna pans need about 2 hours.",
              "Setup: a chafing kit is available on request.",
            ],
          },
          {
            type: "note",
            text: "Fees, delivery areas, and hours are set by each restaurant. At the restaurant we checked, catering delivery ended at 9 PM (10 PM on Friday and Saturday). Taxes and tips are not included in any of the prices on this page.",
          },
        ],
      },
      {
        id: "catering-vs-family-style",
        heading: "Olive Garden Catering vs Family Style Meals",
        blocks: [
          {
            type: "paragraph",
            text: [
              "The same pans appear on both menus at the same prices. Catering adds packages for larger groups and delivery planning, while Family Style adds take-home bundles for a household. For dinner at home, see ",
              { text: "Olive Garden family style meals", href: "/family-style-meals" },
              ".",
            ],
          },
          { type: "comparison", id: "catering-vs-family" },
        ],
      },
      {
        id: "order-catering",
        heading: "How to Order Olive Garden Catering",
        blocks: [
          {
            type: "list",
            ordered: true,
            items: [
              "Open Olive Garden’s ordering page, choose Catering, and select your restaurant.",
              "Choose pickup or delivery and the date and time.",
              "Add packages, pans, and extras; for pickup orders over $350, call the restaurant.",
              "For weddings, offices, and other events, Olive Garden’s catering page lists business, event, and bridal catering.",
            ],
          },
        ],
      },
    ],
    sources: [
      { label: "Olive Garden catering (official)", url: "https://www.olivegarden.com/catering" },
      { label: "Olive Garden catering pans (official online menu)", url: "https://www.olivegarden.com/menu/catering/catering-pans-serves-4-6" },
      { label: "Create Your Own Pasta Station (official catering item page)", url: "https://www.olivegarden.com/menu/create-your-own-pasta-station/prod82663" },
      { label: "Olive Garden FAQs (official)", url: "https://www.olivegarden.com/faqs" },
      NUTRITION_PDF,
    ],
    extraSource: { label: "Olive Garden catering (official)", url: "https://www.olivegarden.com/catering" },
    faqs: [
      {
        question: "How much does Olive Garden catering cost per person?",
        answer:
          "At the online pickup prices we checked in November 2026, about $14.75 per person for the pasta station and $16.00 to $28.00 for a meal combination (our calculation). Olive Garden advertises starting prices from $13.50 per person, and prices vary by location.",
      },
      {
        question: "How many people does an Olive Garden catering tray serve?",
        answer:
          "Most pans serve 4 to 6 people, meal combinations serve 8 to 14, and the pasta station serves 10. A half cake serves 6 and a whole cake 12.",
      },
      {
        question: "How much does Olive Garden catering cost for 50 people?",
        answer:
          "Five pasta stations come to $737.50 for food, or $14.75 per guest (our calculation). Tax, delivery fees, and tips are extra.",
      },
      {
        question: "Does Olive Garden cater for 100 people?",
        answer:
          "Yes. Olive Garden lists its pasta station for groups from 10 to more than 1,000 guests. A 100-person order is above the online limits, so plan it directly with your restaurant.",
      },
      {
        question: "What comes with the Create Your Own Pasta Station?",
        answer:
          "Spaghetti and fettuccine, Alfredo, meat sauce, and marinara, grilled chicken, meatballs, and Italian sausage, plus salad and breadsticks, for 10 people ($147.50).",
      },
      {
        question: "Does Olive Garden deliver catering orders?",
        answer:
          "Yes. Olive Garden’s catering page lists a $100 delivery minimum and a delivery fee of 10% up to $500, then 5%. Delivery areas and hours depend on the restaurant.",
      },
      {
        question: "What is the minimum catering order?",
        answer:
          "The minimum we found is $100 for delivery. We did not find a minimum for pickup orders on Olive Garden’s pages.",
      },
      {
        question: "How far in advance should I order Olive Garden catering?",
        answer:
          "Order by 5 PM for next-day lunch delivery. Pasta stations for delivery need 24 hours’ notice, and lasagna pans about 2 hours.",
      },
      {
        question: "Can I combine different Olive Garden catering trays for a large event?",
        answer:
          "Yes. Pans, meal combinations, pasta stations, appetizer and protein trays, cakes, and drinks are sold as separate catering items, so one order can mix them. Online pickup is limited to 3 pasta stations and delivery to 8 (with 24 hours’ notice), pickup orders over $350 are placed by phone, and delivery needs a $100 minimum.",
      },
    ],
    related: [
      { categoryId: "family-style-meals", text: "Take-home bundles and pans for a household." },
      { categoryId: "appetizers", text: "Starters in single-order sizes." },
      { categoryId: "desserts", text: "Desserts by the slice." },
      { categoryId: "create-your-own-pasta", text: "The single-plate pasta builder." },
      { categoryId: "non-alcoholic-beverages", text: "Drinks with calories and gallon sizes." },
    ],
  },
];
