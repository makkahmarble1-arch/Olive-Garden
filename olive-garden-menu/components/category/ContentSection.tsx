import ContentBlocks from "@/components/content/ContentBlocks";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import ComparisonTable from "./ComparisonTable";
import type { ResolvedComparison } from "@/lib/category-data";
import type { CategoryBlock, CategorySection, ContentBlock } from "@/lib/types";

type GalleryBlock = Extract<CategoryBlock, { type: "gallery" }>;

/** Photo grid: 2 columns on phones, 4 on wide screens; lazy-loaded below the fold. */
function Gallery({ block }: { block: GalleryBlock }) {
  return (
    <ul aria-label={block.label} className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {block.images.map((image) => (
        <li key={image.src}>
          <figure className="overflow-hidden rounded-lg border border-line bg-white">
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes="(min-width: 1024px) 270px, 46vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
            <figcaption className="px-3 py-2 text-sm font-medium text-ink">{image.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

/** Key of a resolved table in the layout's table map: "<block type>:<id>". */
export const tableKey = (type: "comparison" | "optionTable" | "pastaBuilds" | "servingPlan", id: string) => `${type}:${id}`;

/**
 * One category-specific section: an H2 plus article blocks (paragraphs,
 * lists, notes, H3 subheadings) and, where placed, tables (comparisons,
 * Create Your Own Pasta options, example builds), all in the same table design.
 * Reuses the article ContentBlocks renderer, so the text styles match.
 */
export default function ContentSection({
  section,
  tables,
}: {
  section: CategorySection;
  tables: Map<string, ResolvedComparison>;
}) {
  // Group consecutive text blocks; table blocks break the groups.
  const parts: (
    | { kind: "text"; blocks: ContentBlock[] }
    | { kind: "table"; table: ResolvedComparison }
    | { kind: "gallery"; block: GalleryBlock }
  )[] = [];
  for (const block of section.blocks) {
    if (block.type === "gallery") {
      parts.push({ kind: "gallery", block });
    } else if (block.type === "comparison" || block.type === "optionTable" || block.type === "pastaBuilds" || block.type === "servingPlan") {
      const table = tables.get(tableKey(block.type, block.id));
      if (!table) throw new Error(`Section "${section.id}": unknown ${block.type} "${block.id}".`);
      parts.push({ kind: "table", table });
    } else {
      const last = parts.at(-1);
      if (last?.kind === "text") last.blocks.push(block);
      else parts.push({ kind: "text", blocks: [block] });
    }
  }

  return (
    <section aria-labelledby={section.id} className="mt-14">
      <SectionHeading id={section.id} title={section.heading} />
      <div className="mt-6 space-y-6">
        {parts.map((part, i) =>
          part.kind === "text" ? (
            <div key={i} className="max-w-3xl">
              <ContentBlocks blocks={part.blocks} />
            </div>
          ) : part.kind === "gallery" ? (
            <Gallery key={i} block={part.block} />
          ) : (
            <ComparisonTable key={i} table={part.table} />
          ),
        )}
      </div>
    </section>
  );
}
