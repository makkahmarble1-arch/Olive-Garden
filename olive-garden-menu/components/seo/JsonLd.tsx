type JsonLdProps = {
  data: Record<string, unknown>;
};

/**
 * Structured data for search engines. Allowed types are listed in CLAUDE.md.
 * "<" is escaped to prevent script injection (per Next.js docs).
 */
export default function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
