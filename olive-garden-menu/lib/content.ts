/**
 * Helper functions to read content. Pages, navigation, and (later) the
 * sitemap use these instead of importing content files directly.
 */
import { menuCategories } from "@/content/menu/categories";
import { articles } from "@/content/articles";
import type { Article, ArticleCardData, MenuCategory } from "./types";

/* ---------- URLs (one place, so links never get out of sync) ---------- */

export const menuPath = "/menu";

export function menuCategoryPath(slug: string): string {
  return `${menuPath}/${slug}`;
}

export function articlePath(slug: string): string {
  return `/blog/${slug}`;
}

/* ---------- Menu ---------- */

/** All categories, including placeholders (for design previews). */
export function getAllMenuCategories(): MenuCategory[] {
  return menuCategories;
}

/** Only categories with approved content and their own page. */
export function getPublishedMenuCategories(): MenuCategory[] {
  return menuCategories.filter((c) => c.contentStatus === "published");
}

export function getMenuCategory(slug: string): MenuCategory | undefined {
  return menuCategories.find((c) => c.slug === slug);
}

/* ---------- Articles ---------- */

export function getPublishedArticles(): Article[] {
  return articles
    .filter((a) => a.contentStatus === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function toArticleCard(article: Article): ArticleCardData {
  return {
    title: article.title,
    description: article.description,
    href: articlePath(article.slug),
    date: article.updatedAt ?? article.publishedAt,
  };
}

/** Published articles listed in `relatedSlugs`, as card data. */
export function getRelatedArticleCards(article: Article): ArticleCardData[] {
  return article.relatedSlugs
    .map((slug) => getArticle(slug))
    .filter((a): a is Article => a?.contentStatus === "published")
    .map(toArticleCard);
}
