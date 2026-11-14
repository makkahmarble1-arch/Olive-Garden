import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryPageLayout from "@/components/category/CategoryPageLayout";
import { getMenuCategory } from "@/lib/content";
import type { CategoryPageContent } from "@/lib/types";

/**
 * DEV-ONLY preview of the reusable category page layout
 * (http://localhost:3000/design-preview/category). 404 in production, noindex.
 *
 * The TEXT below is placeholder copy for checking the design only; it is
 * never used on a real page. Prices, calories, servings, images, and ratings
 * come from the shared menu data, exactly as on real category pages.
 */
export const metadata: Metadata = {
  title: "Category Layout Preview",
  robots: { index: false, follow: false },
};

const sample: CategoryPageContent = {
  categoryId: "family-style-meals",
  primaryKeyword: "sample keyword (design preview)",
  menuTitle: "Olive Garden Sample Menu (design preview)",
  metaTitle: "Category Layout Preview",
  metaDescription: "Design preview of the reusable category page layout. Placeholder text only; not a real page.",
  h1: "[Sample H1] Category Page Layout Preview",
  intro: [
    "[Sample intro] This preview shows every building block of a category page. The text is placeholder copy; all prices, calories, images, and ratings come from the shared menu data.",
  ],
  contentReviewedAt: "2026-11-13",
  featuredOfferingIds: [
    "family-style-meals--family-style-lasagna-bundle",
    "family-style-meals--family-style-chicken-alfredo-bundle",
    "family-style-meals--family-style-chicken-parmigiana-bundle",
    "family-style-meals--family-style-five-cheese-ziti-al-forno-bundle",
  ],
  featuredHeading: "[Sample] Selected items with photos",
  tableCaption: "[Sample] Prices and Calories",
  priceNotes: ["[Sample price note] Online pickup prices; prices may vary by location across the USA."],
  comparisons: [
    {
      id: "bundle-cost",
      caption: "[Sample] Family bundles: price per serving",
      columns: [
        { kind: "serving", label: "What it serves" },
        { kind: "price" },
        { kind: "pricePerServing", label: "Price per serving" },
        { kind: "calories", label: "Calories (whole bundle)" },
        { kind: "priceDifference", label: "vs Lasagna bundle", baseRow: 0 },
      ],
      rows: [
        { offeringId: "family-style-meals--family-style-lasagna-bundle", servings: 6 },
        { offeringId: "family-style-meals--family-style-chicken-alfredo-bundle", servings: 6 },
        { offeringId: "family-style-meals--family-style-chicken-parmigiana-bundle", servings: 6 },
        { offeringId: "family-style-meals--family-style-lasagna-bundle--large", label: "Lasagna bundle (large)", servings: 12 },
      ],
      notes: ["[Sample note] Servings use the upper number of the official “serves” range."],
    },
  ],
  sections: [
    {
      id: "sample-section",
      heading: "[Sample] Category-Specific Section",
      blocks: [
        { type: "paragraph", text: ["[Sample paragraph] Sections hold original text, lists, notes, and comparison tables. Links work too, for example the ", { text: "full menu", href: "/#full-menu" }, "."] },
        { type: "comparison", id: "bundle-cost" },
        { type: "subheading", text: "[Sample] An H3 inside a section" },
        { type: "list", items: ["[Sample] First point", "[Sample] Second point"] },
        { type: "note", text: "[Sample note] Callouts use the light olive background." },
      ],
    },
  ],
  nutritionNotes: ["[Sample] Calories are totals for the whole bundle, not per person."],
  sources: [{ label: "Olive Garden Family Bundles (official)", url: "https://www.olivegarden.com/menu/family-style-meals/family-bundles" }],
  faqs: [
    { question: "[Sample] How does the FAQ accordion look?", answer: "[Sample answer] Each question opens and closes with a click, Enter, or Space." },
    { question: "[Sample] Is the answer in the page HTML?", answer: "[Sample answer] Yes. Native details/summary keeps the text in the HTML for search engines and screen readers." },
  ],
  related: [
    { categoryId: "catering", text: "[Sample] Planning an event? See the catering menu." },
    { categoryId: "appetizers", text: "[Sample] Add starters to your order." },
  ],
};

export default function CategoryLayoutPreview() {
  if (process.env.NODE_ENV === "production") notFound();
  const category = getMenuCategory(sample.categoryId);
  if (!category) notFound();
  return <CategoryPageLayout category={category} content={sample} />;
}
