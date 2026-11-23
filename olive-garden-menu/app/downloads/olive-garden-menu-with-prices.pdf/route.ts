import { getMenuPdf } from "@/lib/menu-pdf";
import { MENU_PDF_FILENAME } from "@/lib/menu-pdf-info";
import { siteConfig } from "@/lib/site";

/**
 * GET /downloads/olive-garden-menu-with-prices.pdf: the printable menu PDF
 * (Improvement 8, docs/tools/MENU_PDF_ARCHITECTURE.md). Built only with
 * synchronous work from the shared menu data, so Next.js prerenders it at
 * build time: every deployment ships a fresh, static PDF that matches the
 * homepage. Always `noindex` (the homepage is the page that should rank for
 * the menu), with a canonical link to the homepage.
 */
export function GET() {
  const pdf = getMenuPdf();
  return new Response(new Uint8Array(pdf.bytes) as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(pdf.sizeBytes),
      "Content-Disposition": `inline; filename="${MENU_PDF_FILENAME}"`,
      "X-Robots-Tag": "noindex",
      Link: `<${siteConfig.url}/>; rel="canonical"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
