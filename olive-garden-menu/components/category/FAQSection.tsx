import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import type { FaqItem } from "@/lib/types";

/**
 * Compact FAQ accordion (native <details>/<summary>: keyboard and screen
 * reader friendly, works without JavaScript, answers are in the HTML) plus
 * FAQPage JSON-LD with exactly the visible text.
 */
export default function FAQSection({ faqs, id = "faqs", title = "Frequently Asked Questions" }: { faqs: FaqItem[]; id?: string; title?: string }) {
  if (faqs.length === 0) return null;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section aria-labelledby={id} className="mt-14 max-w-3xl">
      <SectionHeading id={id} title={title} />
      <div className="mt-6 divide-y divide-line rounded-lg border border-line bg-white">
        {faqs.map((faq) => (
          <details key={faq.question} className="group px-4 py-1 sm:px-5">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-2 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-brand-dark [&::-webkit-details-marker]:hidden">
              <h3 className="text-base leading-6">{faq.question}</h3>
              <span
                aria-hidden="true"
                className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-tint text-lg leading-none text-brand-dark transition-transform group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            <p className="pb-4 leading-7 text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
      <JsonLd data={jsonLd} />
    </section>
  );
}
