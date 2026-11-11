import Image from "next/image";
import type { ImageRef } from "@/lib/types";

type CategoryVisualProps = {
  /** Category position (1-17), shown as a large number in the CSS version. */
  number: number;
  /** Owner-approved image. `null`/missing = clean CSS design (no fake image path). */
  image?: ImageRef | null;
};

/**
 * Top area of a category card.
 * - With an approved image: optimized `next/image` (4:3, see IMAGE_REQUIREMENTS.md).
 * - Without one: a decorative CSS block, hidden from screen readers.
 */
export default function CategoryVisual({ number, image }: CategoryVisualProps) {
  if (image) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line bg-brand-tint">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="relative h-24 w-full overflow-hidden border-b border-line bg-brand-tint"
    >
      <span className="absolute -top-8 -right-6 size-28 rounded-full border-[10px] border-brand/35" />
      <span className="absolute right-16 -bottom-8 size-16 rounded-full bg-brand/25" />
      <span className="absolute bottom-3 left-5 font-display text-4xl leading-none font-bold text-brand-dark">
        {String(number).padStart(2, "0")}
      </span>
    </div>
  );
}
