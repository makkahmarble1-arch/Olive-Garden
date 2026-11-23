import Image from "next/image";
import Container from "@/components/layout/Container";
import { heroImage } from "@/content/home/homepage";
import { formatMonthYear, formatNumber } from "@/lib/format";
import { formatFileSize, getMenuPdf } from "@/lib/menu-pdf";
import { MENU_PDF_FILENAME, MENU_PDF_PATH, MENU_PDF_SECTION_ID } from "@/lib/menu-pdf-info";
import { siteConfig } from "@/lib/site";
import MenuPdfActions from "./MenuPdfActions";

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * Homepage section "Olive Garden Menu PDF with Prices" (Improvement 8,
 * docs/tools/MENU_PDF_ARCHITECTURE.md). Server-rendered: an HTML preview of
 * the PDF cover (owner photos, lazy), the real page count and file size of the
 * generated PDF, and the actions. The PDF itself loads only on request.
 */
export default function MenuPdfSection() {
  const pdf = getMenuPdf();
  const checked = pdf.lastChecked ? formatMonthYear(pdf.lastChecked) : null;
  const facts = [
    { label: "Pages", value: `${pdf.pages} pages`, d: "M7 3h7l5 5v13H7zM14 3v5h5" },
    { label: "File size", value: `${formatFileSize(pdf.sizeBytes)} PDF`, d: "M12 4v11m0 0-4-4m4 4 4-4M5 20h14" },
    { label: "Coverage", value: `${pdf.categories} categories`, d: "M4 6h16M4 12h16M4 18h10" },
    { label: "Last checked", value: checked ?? "See notes", d: "M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12H3V8a2 2 0 0 1 2-2Z" },
  ];

  return (
    <section id={MENU_PDF_SECTION_ID} aria-labelledby={`${MENU_PDF_SECTION_ID}-heading`} className="scroll-mt-4 border-t border-line py-10 md:py-14">
      <Container>
        <h2 id={`${MENU_PDF_SECTION_ID}-heading`} className="max-w-3xl font-display text-2xl font-bold text-ink sm:text-3xl">
          Olive Garden Menu PDF with Prices
        </h2>

        <div className="mt-6 grid gap-6 rounded-3xl border border-card-border bg-header-cream p-4 shadow-[0_1px_2px_rgba(40,55,15,0.05),0_18px_40px_-28px_rgba(40,55,15,0.45)] sm:p-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start lg:gap-10 lg:p-8">
          {/* Cover preview: the same design as page 1 of the PDF */}
          <figure className="mx-auto w-full max-w-xs md:max-w-none">
            <div className="relative aspect-[8.5/11] overflow-hidden rounded-2xl bg-hero-deep shadow-[0_18px_40px_-20px_rgba(40,55,15,0.7)] ring-1 ring-card-border">
              <div className="relative h-1/2">
                <Image src={heroImage.src} alt="" fill sizes="(min-width: 768px) 360px, 320px" className="object-cover" />
              </div>
              <div className="h-1 bg-gold" />
              <div className="flex flex-col gap-2 p-4 sm:p-5">
                <div className="flex items-center gap-2.5">
                  <span className="grid size-10 place-items-center rounded-lg bg-white">
                    <Image src="/images/brand/logo-icon.webp" alt="" width={34} height={24} />
                  </span>
                  <span className="text-xs leading-4 font-semibold text-white">
                    {siteConfig.name}
                    <span className="block font-normal text-hero-highlight">Independent menu & price guide</span>
                  </span>
                </div>
                <p className="font-display text-xl leading-tight font-bold text-white sm:text-2xl">
                  Olive Garden Menu
                  <span className="block text-base text-hero-highlight sm:text-lg">with Prices & Calories 2026</span>
                </p>
                <p className="flex flex-wrap gap-1.5" aria-hidden="true">
                  {[`${pdf.categories} categories`, `${formatNumber(pdf.entries)} entries`, ...(checked ? [checked] : [])].map((chip) => (
                    <span key={chip} className="rounded-full bg-white/10 px-2 py-0.5 text-[0.65rem] font-semibold text-white ring-1 ring-white/20">
                      {chip}
                    </span>
                  ))}
                </p>
                <p className="text-[0.65rem] leading-4 text-hero-soft">Independent guide · not an official Olive Garden menu</p>
              </div>
              <span className="absolute top-3 right-3 rounded-md bg-hero-deep/90 px-2 py-0.5 text-[0.7rem] font-bold tracking-wide text-hero-highlight">PDF</span>
            </div>
            <figcaption className="mt-2 text-center text-xs text-muted">Cover preview. Photo supplied by the site owner for illustration.</figcaption>
          </figure>

          <div className="flex min-w-0 flex-col gap-5">
            <p className="text-[1.0625rem] leading-8 text-ink">
              Want the menu on paper or offline? Download the complete Olive Garden menu as a free PDF: all {pdf.categories} menu categories and{" "}
              {formatNumber(pdf.entries)} menu entries with the prices and calories we verified, plus sizes and versions, on US Letter pages. It is made
              from the same data as this page, so the numbers always match.
            </p>

            <ul className="grid grid-cols-2 gap-3" aria-label="About the PDF">
              {facts.map((f) => (
                <li key={f.label} className="flex items-center gap-2.5 rounded-2xl border border-card-border bg-white p-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-dark text-white">
                    <Icon d={f.d} />
                  </span>
                  <span className="min-w-0 leading-5">
                    <span className="block text-[0.7rem] font-semibold tracking-wide text-muted uppercase">{f.label}</span>
                    <span className="block font-semibold text-hero-deep">
                      {f.label === "Last checked" && pdf.lastChecked ? <time dateTime={pdf.lastChecked}>{f.value}</time> : f.value}
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            <MenuPdfActions href={MENU_PDF_PATH} filename={MENU_PDF_FILENAME} />

            <p className="flex items-start gap-2 rounded-2xl bg-brand-tint p-3 text-sm leading-6 text-ink">
              <span className="mt-0.5 text-brand-dark">
                <Icon d="M12 8v5m0 3h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
              </span>
              <span>
                {siteConfig.locationNotice} The PDF lists the online pickup prices we verified; taxes, tips and fees are not included. It is an
                independent guide, not an official Olive Garden menu.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
