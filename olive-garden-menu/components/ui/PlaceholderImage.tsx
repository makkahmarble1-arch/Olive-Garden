type PlaceholderImageProps = {
  /** What the real image will show, e.g. "Appetizers photo". */
  label: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/3]". */
  aspect?: string;
  className?: string;
};

/**
 * Clearly labeled stand-in until the owner provides approved images.
 * Replace with next/image when real images are available.
 */
export default function PlaceholderImage({
  label,
  aspect = "aspect-[4/3]",
  className = "",
}: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={`Placeholder image: ${label}`}
      className={`flex ${aspect} w-full flex-col items-center justify-center gap-1 border-2 border-dashed border-brand/60 bg-brand-tint p-4 text-center ${className}`}
    >
      <span className="text-xs font-semibold tracking-wide text-brand-dark uppercase">
        Placeholder image
      </span>
      <span className="text-sm text-muted">{label}</span>
    </div>
  );
}
