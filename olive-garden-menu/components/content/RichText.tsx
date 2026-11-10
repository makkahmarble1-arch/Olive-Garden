import Link from "next/link";
import type { RichText as RichTextValue } from "@/lib/types";

const linkClass =
  "text-brand-dark underline underline-offset-4 hover:text-brand-darker focus-visible:outline-2 focus-visible:outline-brand-dark";

/** Renders plain text or text mixed with links (see RichText type). */
export default function RichText({ value }: { value: RichTextValue }) {
  if (typeof value === "string") return <>{value}</>;

  return (
    <>
      {value.map((part, index) => {
        if (typeof part === "string") return <span key={index}>{part}</span>;

        const isInternal = part.href.startsWith("/") || part.href.startsWith("#");
        return isInternal ? (
          <Link key={index} href={part.href} className={linkClass}>
            {part.text}
          </Link>
        ) : (
          <a key={index} href={part.href} className={linkClass} rel="noopener noreferrer">
            {part.text}
          </a>
        );
      })}
    </>
  );
}
