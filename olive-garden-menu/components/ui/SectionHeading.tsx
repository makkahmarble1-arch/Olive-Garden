type SectionHeadingProps = {
  id?: string;
  title: string;
  intro?: string;
};

/** Consistent h2 + intro text for page sections. */
export default function SectionHeading({ id, title, intro }: SectionHeadingProps) {
  return (
    <div className="max-w-prose">
      <h2 id={id} className="font-display text-2xl font-bold text-ink sm:text-3xl">
        {title}
      </h2>
      {intro && <p className="mt-3 text-lg leading-8 text-muted">{intro}</p>}
    </div>
  );
}
