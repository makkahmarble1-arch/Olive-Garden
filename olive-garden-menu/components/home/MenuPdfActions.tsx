"use client";

import { useEffect, useRef, useState } from "react";

const btnBase =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-5 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

function Svg({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/**
 * Buttons of the homepage Menu PDF section (Improvement 8):
 * - Download: the real static PDF file (download attribute, same origin).
 * - View online: opens the PDF in the browser's own viewer (new tab); works on phones.
 * - Print: prints the PDF itself (hidden frame + the PDF viewer's print), never
 *   the web page. On touch devices, where frames cannot print PDFs, it opens
 *   the PDF so the visitor can use the browser's Print or Share option.
 * - Preview: an embedded viewer that loads only when asked (desktop and tablets).
 */
export default function MenuPdfActions({ href, filename }: { href: string; filename: string }) {
  const [preview, setPreview] = useState(false);
  const [note, setNote] = useState("");
  const frame = useRef<HTMLIFrameElement | null>(null);

  useEffect(
    () => () => {
      frame.current?.remove();
    },
    [],
  );

  function openPdf(message: string) {
    window.open(href, "_blank", "noopener");
    setNote(message);
  }

  function print() {
    if (window.matchMedia("(pointer: coarse)").matches) {
      openPdf("The menu PDF opened in a new tab. Use your browser’s Print or Share option to print it.");
      return;
    }
    frame.current?.remove();
    const f = document.createElement("iframe");
    f.title = "Menu PDF for printing";
    f.setAttribute("aria-hidden", "true");
    f.tabIndex = -1;
    f.style.cssText = "position:fixed;right:0;bottom:0;width:1px;height:1px;border:0;opacity:0;pointer-events:none";
    f.src = href;
    f.onload = () => {
      try {
        f.contentWindow?.focus();
        f.contentWindow?.print();
        setNote("Your browser’s print window shows the menu PDF.");
      } catch {
        openPdf("The menu PDF opened in a new tab. Use your browser’s Print option there.");
      }
    };
    frame.current = f;
    document.body.appendChild(f);
    setNote("Preparing the menu PDF for printing…");
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        <a href={href} download={filename} className={`${btnBase} bg-brand-dark text-white shadow-sm hover:bg-brand-darker`}>
          <Svg d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" />
          Download PDF
        </a>
        <a href={href} target="_blank" rel="noopener" className={`${btnBase} border border-brand-dark bg-white text-brand-dark hover:bg-brand-tint`}>
          <Svg d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          View online
          <span className="sr-only"> (opens the PDF in a new tab)</span>
        </a>
        <button type="button" onClick={print} className={`${btnBase} border border-brand-dark bg-white text-brand-dark hover:bg-brand-tint`}>
          <Svg d="M7 9V4h10v5M7 17H5a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2M7 14h10v6H7z" />
          Print menu
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-muted">
        {note}
      </p>

      <div className="mt-2 hidden md:block">
        {!preview ? (
          <button
            type="button"
            onClick={() => setPreview(true)}
            className="inline-flex min-h-11 items-center gap-2 rounded-xl px-1 font-semibold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-brand-dark"
            aria-expanded="false"
            aria-controls="menu-pdf-preview"
          >
            <Svg d="M4 4h16v16H4zM4 9h16M9 9v11" />
            Preview the PDF on this page
          </button>
        ) : (
          <div id="menu-pdf-preview">
            <iframe
              src={`${href}#view=FitH`}
              title="Olive Garden menu PDF preview"
              loading="lazy"
              className="h-[42rem] w-full rounded-2xl border border-card-border bg-white shadow-[0_18px_40px_-30px_rgba(40,55,15,0.6)]"
            />
            <p className="mt-2 text-sm text-muted">
              No preview?{" "}
              <a href={href} target="_blank" rel="noopener" className="font-semibold text-brand-dark underline underline-offset-4">
                Open the PDF in a new tab
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
