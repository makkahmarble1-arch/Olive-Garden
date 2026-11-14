import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/metadata";
import {
  getCategoryPageContent,
  getMenuCategoriesWithPages,
  getMenuCategory,
  menuCategoryPath,
} from "@/lib/content";
import CategoryPageLayout from "@/components/category/CategoryPageLayout";

/**
 * Category pages at the approved root-level URLs (e.g. /appetizers).
 * Only categories with contentStatus "preview" or "published" get a page;
 * every other path shows the 404 page. "preview" pages stay noindex.
 * Layout and content rules: docs/CATEGORY_PAGE_ARCHITECTURE.md.
 */
export function generateStaticParams() {
  return getMenuCategoriesWithPages().map((c) => ({ category: c.slug }));
}

/** Category + its written content, or undefined if it has no page. */
function loadCategory(slug: string) {
  const category = getMenuCategory(slug);
  if (!category || category.contentStatus === "placeholder") return undefined;
  const content = getCategoryPageContent(category.id);
  if (!content) return undefined;
  return { category, content };
}

export async function generateMetadata({ params }: PageProps<"/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const data = loadCategory(slug);
  if (!data) return {};
  const { category, content } = data;

  // Self-canonical; indexable only when "published" (and the site-wide indexing switch is on).
  return pageMetadata({
    title: content.metaTitle,
    description: content.metaDescription,
    path: menuCategoryPath(category.slug),
    // Approved category titles are complete (no " | site name" suffix).
    absoluteTitle: true,
    indexable: category.contentStatus === "published",
  });
}

export default async function CategoryPage({ params }: PageProps<"/[category]">) {
  const { category: slug } = await params;
  const data = loadCategory(slug);
  if (!data) notFound();
  return <CategoryPageLayout category={data.category} content={data.content} />;
}
