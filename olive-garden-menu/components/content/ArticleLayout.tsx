import type { Article, ArticleCardData, BreadcrumbItem } from "@/lib/types";
import { formatDate } from "@/lib/format";
import Container from "@/components/layout/Container";
import Breadcrumbs from "@/components/navigation/Breadcrumbs";
import TableOfContents from "@/components/navigation/TableOfContents";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import ContentBlocks from "./ContentBlocks";
import RelatedArticles from "./RelatedArticles";
import RichText from "./RichText";

type ArticleLayoutProps = {
  article: Article;
  breadcrumbs: BreadcrumbItem[];
  related?: ArticleCardData[];
};

/**
 * Reusable article page template: breadcrumbs, title (the page's only h1),
 * intro, dates, featured image, table of contents, sections, related articles.
 */
export default function ArticleLayout({
  article,
  breadcrumbs,
  related = [],
}: ArticleLayoutProps) {
  const tocItems = article.sections.map((s) => ({ id: s.id, label: s.heading }));

  return (
    <article className="py-8 md:py-12">
      <Container>
        <Breadcrumbs items={breadcrumbs} />

        <header className="mt-6 max-w-3xl">
          <h1 className="font-display text-3xl leading-tight font-bold text-ink sm:text-4xl lg:text-[2.5rem]">
            {article.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted">
            <RichText value={article.intro} />
          </p>
          <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
            {article.author && <span>By {article.author}</span>}
            <span>
              Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </span>
            {article.updatedAt && (
              <span>
                Updated <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
              </span>
            )}
          </p>
        </header>

        {article.featuredImage && (
          // Images are not integrated yet: always a labeled placeholder for now.
          // Later: use next/image when featuredImage.src is provided.
          <PlaceholderImage
            label={article.featuredImage.alt}
            aspect="aspect-video"
            className="mt-8 max-w-3xl rounded-xl"
          />
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-12">
          {/* Table of contents: first on mobile, right sidebar on large screens. */}
          <aside className="lg:col-start-2 lg:row-start-1">
            <div className="lg:sticky lg:top-24">
              <TableOfContents items={tocItems} />
            </div>
          </aside>

          <div className="max-w-3xl space-y-12 lg:col-start-1 lg:row-start-1">
            {article.sections.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <h2
                  id={section.id}
                  className="mb-4 font-display text-2xl font-bold text-ink sm:text-3xl"
                >
                  {section.heading}
                </h2>
                <ContentBlocks blocks={section.blocks} />
              </section>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <RelatedArticles articles={related} />
        </div>
      </Container>
    </article>
  );
}
