import type { TocItem } from "@/lib/types";

type TableOfContentsProps = {
  items: TocItem[];
  title?: string;
};

/**
 * "On this page" links. Uses <details> so it can be collapsed on mobile
 * without any JavaScript.
 */
export default function TableOfContents({
  items,
  title = "On this page",
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="rounded-lg border border-line bg-white">
      <details open className="group">
        <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-2 rounded-lg px-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand-dark">
          {title}
          <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-180">
            &#9662;
          </span>
        </summary>
        <ol className="space-y-1 border-t border-line px-4 py-3 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className="inline-flex min-h-9 items-center text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
