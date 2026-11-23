/**
 * Public addresses of the Menu PDF (client-safe constants; no data).
 * docs/tools/MENU_PDF_ARCHITECTURE.md.
 */
export const MENU_PDF_FILENAME = "olive-garden-menu-with-prices.pdf";
/** Static file built from the shared menu data (app/downloads/.../route.ts). */
export const MENU_PDF_PATH = `/downloads/${MENU_PDF_FILENAME}`;
/** Homepage section (the PDF has no article page of its own). */
export const MENU_PDF_SECTION_ID = "menu-pdf";
export const MENU_PDF_SECTION_HREF = `/#${MENU_PDF_SECTION_ID}`;
