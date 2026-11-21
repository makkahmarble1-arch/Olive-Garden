import type { FaqItem, RelatedMenuRef, RichText } from "@/lib/types";
import { isProductionDeployment } from "@/content/menu/product-pages/registry";

/**
 * /nutrition-calculator: Nutrition & Meal Price Calculator (Improvement 7).
 * docs/tools/NUTRITION_CALCULATOR_ARCHITECTURE.md.
 *
 * Status, same rule as the menu item pages:
 * - "preview"   = reachable and linked (navigation, footer, search) only in local
 *   development, local `next start` and Vercel preview deployments; HTTP 404 and
 *   unlinked on the production deployment. Waiting for the owner's review.
 * - "published" = live everywhere and in the sitemap (indexed only when
 *   SITE_INDEXING=true). Needs the owner's approval date in `ownerApprovedAt`.
 */
export type ToolPageContent = {
  slug: string;
  /** Breadcrumb and navigation label. */
  name: string;
  status: "preview" | "published";
  ownerApprovedAt: string | null;
  /** ISO date the text was last reviewed. */
  contentReviewedAt: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  /** Short explanation cards below the calculator. */
  guide: { id: string; heading: string; icon: "list" | "spark" | "tag" | "info" | "alert"; paragraphs: RichText[] }[];
  faqs: FaqItem[];
  related: RelatedMenuRef[];
};

export const nutritionCalculatorPage: ToolPageContent = {
  slug: "nutrition-calculator",
  name: "Nutrition Calculator",
  // Owner approval 2026-11-20 ("approve ha"): design, data rules, text, Download PDF / Print.
  status: "published",
  ownerApprovedAt: "2026-11-20",
  contentReviewedAt: "2026-11-20",
  primaryKeyword: "olive garden nutrition calculator",
  secondaryKeywords: ["olive garden calorie calculator", "olive garden meal calculator", "olive garden meal price calculator", "olive garden macros"],
  metaTitle: "Olive Garden Nutrition Calculator: Meal Calories & Price",
  metaDescription:
    "Build an Olive Garden meal and see its estimated price, calories, protein, carbs, fat and sodium from official values. Missing values are clearly flagged.",
  h1: "Olive Garden Nutrition & Meal Price Calculator",
  intro:
    "Pick dishes, drinks and desserts, choose the portion or version, and set how many you want. The calculator adds up the prices we verified and Olive Garden’s official nutrition values, and tells you plainly when a value is missing.",
  guide: [
    {
      id: "how-to-use",
      heading: "How to use the calculator",
      icon: "list",
      paragraphs: [
        "Search for a dish or pick a menu category. If a dish comes in several versions (lunch, lighter portion, family-style pan, a different sauce or protein), choose the one you plan to order, then press Add.",
        "In Your Meal, change the quantity with the minus and plus buttons or remove an item. Reset clears the whole meal. Nothing is saved or sent anywhere: the meal stays in this browser tab only.",
      ],
    },
    {
      id: "how-nutrition-is-calculated",
      heading: "How the nutrition totals are calculated",
      icon: "spark",
      paragraphs: [
        "Each total is the official per-serving value of the version you chose, multiplied by the quantity, then added up. Protein, carbs, fat and sodium come only from the row of Olive Garden’s U.S. nutrition guide that describes exactly that version. We never borrow a value from another size or version.",
        "When a selected item has no official value for a nutrient, that item is left out of the total, the total is marked “Incomplete”, and the item is named. A missing value is never counted as zero. Values the guide prints as “less than” are counted at their upper limit and the total is marked with “≤”.",
        "Bundles and combinations count once, with Olive Garden’s own listed total; their salad, breadsticks and pans are not added again. Calories shown as a range (for example, a soup or sauce choice) stay a range in the total. Values marked “Calc.” are our calculations from official values.",
      ],
    },
    {
      id: "how-prices-are-estimated",
      heading: "How meal prices are estimated",
      icon: "tag",
      paragraphs: [
        "The subtotal adds the online pickup prices we verified for each version, multiplied by the quantity. Prices vary by location. Estimated totals exclude taxes, tips, delivery fees, and other charges.",
        "The calculator does not apply coupons, promotions or the $6 Take Home offer, because their terms depend on what else you order.",
      ],
    },
    {
      id: "why-values-vary",
      heading: "Why your real meal may differ",
      icon: "info",
      paragraphs: [
        "Restaurants set their own prices, and recipes, portions and suppliers can change. Extra sauce, dressing, cheese, a swapped side or a refill changes the nutrition, and soup, salad and breadsticks that come with an entrée are not part of the entrée’s values unless the menu includes them.",
        "Treat the totals as a planning estimate, not an exact measurement. This calculator is for general information and is not medical or dietary advice.",
      ],
    },
    {
      id: "allergens",
      heading: "Checking allergens",
      icon: "alert",
      paragraphs: [
        [
          "This calculator does not check allergens and never marks a meal as safe. Before ordering, read ",
          { text: "Olive Garden’s official allergen guide", href: "https://media.olivegarden.com/en_us/pdf/allergen_guide.pdf" },
          " and tell your server about any allergy. Each dish’s item page also lists the allergens the guide marks for it.",
        ],
      ],
    },
  ],
  faqs: [
    {
      question: "Where do the calorie and nutrition values come from?",
      answer:
        "From Olive Garden’s official U.S. nutrition information (version US_101926) and the calories on its online menu. Each value belongs to the exact version you select; values marked Calc. are our own calculations from official values.",
    },
    {
      question: "Why does a total say Incomplete?",
      answer:
        "At least one item in your meal has no official value for that nutrient or no verified price. The total shows only the items with known values and names the missing ones, so it is never presented as complete.",
    },
    {
      question: "Does the price include tax and tip?",
      answer:
        "No. Prices vary by location. Estimated totals exclude taxes, tips, delivery fees, and other charges. The prices are online pickup prices we verified, so your restaurant may charge a different amount.",
    },
    {
      question: "Can I use the calculator to avoid an allergen?",
      answer:
        "No. The calculator only adds up prices and nutrition. Use Olive Garden’s official allergen guide and ask your server, because recipes and kitchen practices can change and cross-contact is possible.",
    },
    {
      question: "Why are some dishes or offers missing?",
      answer:
        "The calculator lists only items with a verified price or calories. Promotions with conditional prices (such as the $6 Take Home add-on), items no longer on the online menu, and items marked unavailable are left out.",
    },
  ],
  related: [
    { categoryId: "lighter-portions", text: "Smaller entrées with lower prices and fewer calories than the full plates." },
    { categoryId: "gluten-sensitive", text: "Dishes Olive Garden prepares for guests avoiding gluten, with their own values." },
    { categoryId: "kids-meal", text: "Kids meals with prices and calories for planning a family order." },
    { categoryId: "family-style-meals", text: "Pans and bundles that serve a group, with total calories per pan." },
  ],
};

/** Same visibility rule as the menu item pages (content/menu/product-pages/registry.ts). */
export function isToolPageLive(page: Pick<ToolPageContent, "status">): boolean {
  return page.status === "published" || (page.status === "preview" && !isProductionDeployment);
}

export function toolPath(page: Pick<ToolPageContent, "slug">): string {
  return `/${page.slug}`;
}
