import type { ArticleCardData } from "@/lib/types";
import ArticleCard from "./ArticleCard";

type RelatedArticlesProps = {
  articles: ArticleCardData[];
  title?: string;
};

/** Grid of related article cards. Renders nothing if the list is empty. */
export default function RelatedArticles({
  articles,
  title = "Related Articles",
}: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="related-articles" className="border-t border-line pt-10">
      <h2 id="related-articles" className="font-display text-2xl font-bold text-ink sm:text-3xl">
        {title}
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.href}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
