import type { ReactNode } from "react";

/**
 * Small decorative line icons for the menu item pages (24 px grid, drawn
 * here, no icon library). Always aria-hidden: the text next to them carries
 * the meaning, so nothing relies on the icon or its color alone.
 */
export type IconName =
  | "tag"
  | "flame"
  | "cup"
  | "plate"
  | "folder"
  | "users"
  | "alert"
  | "leaf"
  | "info"
  | "check"
  | "list"
  | "spark"
  | "link";

const PATHS: Record<IconName, ReactNode> = {
  tag: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  flame: <path d="M12 3c.5 3.5-2.5 5-2.5 8a2.5 2.5 0 0 0 5 0c0-1-.4-1.8-.9-2.6C16 9.5 18 12 18 15a6 6 0 0 1-12 0c0-5 5-7 6-12Z" />,
  cup: (
    <>
      <path d="M5 9h12l-1.5 10a2 2 0 0 1-2 1.7h-5a2 2 0 0 1-2-1.7L5 9Z" />
      <path d="M8 9V7a3 3 0 0 1 6 0v2" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  folder: <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />,
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20a6 6 0 0 1 12 0" />
      <path d="M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4M12 17h.01" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 15-14-1 10-6 15-14 15" />
      <path d="M5 19 13 11" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  check: <path d="m5 12 4.5 4.5L19 7" />,
  list: <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />,
  link: (
    <>
      <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
      <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
    </>
  ),
};

export default function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
