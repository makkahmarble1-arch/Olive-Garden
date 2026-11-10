/**
 * SAMPLE DATA FOR THE DEV-ONLY DESIGN PREVIEW.
 * Not real menu items, prices, calories, or articles. Never import this
 * into public pages.
 */
import type { Article, ArticleCardData, MenuItem } from "@/lib/types";

export const sampleMenuItems: MenuItem[] = [
  {
    name: "Sample Item A (verified format test)",
    description: "Sample description to test the optional description line.",
    price: 0,
    calories: 0,
    status: "verified",
    source: "Sample data",
    location: null,
    lastChecked: null,
  },
  {
    name: "Sample Item B (not verified)",
    description: null,
    price: null,
    calories: null,
    status: "needs-verification",
    source: null,
    location: null,
    lastChecked: null,
  },
  {
    name: "Sample Item C (value present but unverified, so hidden)",
    description: "Unverified values are never shown.",
    price: 0,
    calories: 0,
    status: "needs-verification",
    source: null,
    location: null,
    lastChecked: null,
  },
];

export const sampleArticle: Article = {
  slug: "sample-article",
  title: "Sample Article Title for Layout Testing",
  description: "Sample description.",
  intro: [
    "This is sample text to preview the article layout. It contains an ",
    { text: "internal link to the menu page", href: "/menu" },
    ".",
  ],
  featuredImage: { src: null, alt: "Sample featured image" },
  publishedAt: "2026-01-01",
  updatedAt: "2026-01-15",
  author: null,
  contentStatus: "draft",
  sections: [
    {
      id: "sample-section-one",
      heading: "Sample Section One",
      blocks: [
        { type: "paragraph", text: "Sample paragraph text. Lorem ipsum style filler for layout only." },
        { type: "subheading", text: "Sample Subheading" },
        { type: "list", items: ["Sample list item one", "Sample list item two"] },
      ],
    },
    {
      id: "sample-section-two",
      heading: "Sample Section Two",
      blocks: [
        { type: "note", text: "Sample note block." },
        { type: "list", ordered: true, items: ["First step", "Second step"] },
      ],
    },
    {
      id: "sample-section-three",
      heading: "Sample Section Three",
      blocks: [{ type: "paragraph", text: "Sample paragraph text." }],
    },
  ],
  relatedSlugs: [],
};

export const sampleRelatedCards: ArticleCardData[] = [
  { title: "Sample Related Article One", description: "Sample description.", href: "#", date: "2026-01-01" },
  { title: "Sample Related Article Two", description: "Sample description.", href: "#", date: null },
  { title: "Sample Related Article Three", description: "Sample description.", href: "#", date: "2026-01-10" },
];
