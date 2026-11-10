import type { ContentBlock } from "@/lib/types";
import RichText from "./RichText";

/** Renders the blocks of one article section. */
export default function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-[1.0625rem] leading-8 text-ink md:text-lg">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index}>
                <RichText value={block.text} />
              </p>
            );
          case "subheading":
            return (
              <h3 key={index} id={block.id} className="pt-2 font-display text-xl font-semibold md:text-[1.375rem]">
                {block.text}
              </h3>
            );
          case "list": {
            const ListTag = block.ordered ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`space-y-2 pl-6 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-brand-dark`}
              >
                {block.items.map((item, i) => (
                  <li key={i}>
                    <RichText value={item} />
                  </li>
                ))}
              </ListTag>
            );
          }
          case "note":
            return (
              <div key={index} role="note" className="rounded-lg border-l-4 border-brand bg-brand-tint px-4 py-3">
                <RichText value={block.text} />
              </div>
            );
        }
      })}
    </div>
  );
}
