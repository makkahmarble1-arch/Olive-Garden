import Link from "next/link";
import type { ArticleCardData } from "@/lib/types";
import { formatDate } from "@/lib/format";

/** Card linking to one article. The whole card is clickable. */
export default function ArticleCard({ article }: { article: ArticleCardData }) {
  return (
    <article className="relative flex h-full flex-col gap-2 rounded-lg border border-line bg-white p-5 transition-shadow hover:shadow-md">
      <h3 className="font-display text-lg font-bold text-ink">
        <Link
          href={article.href}
          className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-2 focus-visible:outline-brand-dark"
        >
          {article.title}
        </Link>
      </h3>
      <p className="text-muted">{article.description}</p>
      {article.date && (
        <p className="mt-auto pt-2 text-sm text-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </p>
      )}
    </article>
  );
}
