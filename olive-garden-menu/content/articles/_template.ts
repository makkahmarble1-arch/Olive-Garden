import type { Article } from "@/lib/types";

/**
 * TEMPLATE ONLY. Not imported anywhere and never shown on the site.
 * Copy this file to start a new article, then register it in index.ts.
 */
export const articleTemplate: Article = {
  slug: "replace-with-article-slug",
  title: "Replace With the Article Title",
  description: "Replace with a natural 140-160 character summary for search results and cards.",
  intro: "Replace with a short introduction that answers the main question first.",
  featuredImage: null, // { src: "/images/your-image.jpg", alt: "Describe the image" }
  publishedAt: "2026-01-01",
  updatedAt: null,
  author: null, // Real author name only, once provided by the owner
  contentStatus: "draft", // Change to "published" only after review
  sections: [
    {
      id: "first-section",
      heading: "First Section Heading",
      blocks: [
        { type: "paragraph", text: "Paragraph text." },
        {
          type: "paragraph",
          text: ["Text with an ", { text: "internal link", href: "/menu" }, "."],
        },
        { type: "subheading", text: "Optional Subheading" },
        { type: "list", items: ["First point", "Second point"] },
        { type: "note", text: "Optional highlighted note." },
      ],
    },
  ],
  relatedSlugs: [],
};
