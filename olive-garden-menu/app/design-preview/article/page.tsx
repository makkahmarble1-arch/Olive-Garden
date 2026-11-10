import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleLayout from "@/components/content/ArticleLayout";
import { sampleArticle, sampleRelatedCards } from "../_sample-data";

/**
 * DEV-ONLY article layout preview (http://localhost:3000/design-preview/article).
 * Returns 404 in production builds, and is noindex.
 */
export const metadata: Metadata = {
  title: "Article Layout Preview",
  robots: { index: false, follow: false },
};

export default function ArticlePreviewPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return (
    <ArticleLayout
      article={sampleArticle}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Component Preview", href: "/design-preview" },
        { label: sampleArticle.title },
      ]}
      related={sampleRelatedCards}
    />
  );
}
