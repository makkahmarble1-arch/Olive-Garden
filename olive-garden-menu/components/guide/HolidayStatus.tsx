import type { HolidayDayStatus, HolidaySpec } from "@/lib/types";

/**
 * Holiday-hours articles (/christmas-hours, /thanksgiving-hours; 2026-11-25):
 * the seasonal eyebrow above the H1 and the quick-answer panel under the hero.
 * One card per day around the holiday. Statuses come from the guide data and
 * its fact log; no opening or closing time is shown unless Olive Garden
 * published it. Server component, no images, no JavaScript.
 */

const THEMES = {
  christmas: {
    panel: "bg-xmas-deep bg-[linear-gradient(135deg,var(--color-xmas-deep)_0%,#1f4a2c_55%,var(--color-hero-deep)_100%)]",
    stripe: "bg-[linear-gradient(90deg,var(--color-xmas-red),var(--color-gold),#4f8a5b,var(--color-xmas-red))]",
    eyebrow: "bg-xmas-bg text-xmas-text ring-xmas-red/30",
    closed: { pill: "bg-xmas-bg text-xmas-text", bar: "border-t-xmas-red", icon: "text-xmas-text" },
  },
  thanksgiving: {
    panel: "bg-fall-deep bg-[linear-gradient(135deg,var(--color-fall-deep)_0%,#5e3618_55%,var(--color-hero-deep)_100%)]",
    stripe: "bg-[linear-gradient(90deg,var(--color-fall-orange),var(--color-gold),#b5651d,var(--color-fall-orange))]",
    eyebrow: "bg-fall-bg text-fall-text ring-fall-orange/30",
    closed: { pill: "bg-fall-bg text-fall-text", bar: "border-t-fall-orange", icon: "text-fall-text" },
  },
} as const;

const OTHER_STATUS = {
  "open-early": { pill: "bg-warning-bg text-warning-text", bar: "border-t-gold", icon: "text-warning-text" },
  open: { pill: "bg-open-bg text-open-text", bar: "border-t-brand", icon: "text-open-text" },
} as const;

function statusStyle(theme: HolidaySpec["theme"], status: HolidayDayStatus) {
  return status === "closed" ? THEMES[theme].closed : OTHER_STATUS[status];
}

/** "2026-12-24" -> "Thursday, December 24, 2026" (calendar date, no time zone shift). */
function formatDay(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function StatusIcon({ status }: { status: HolidayDayStatus }) {
  const common = { "aria-hidden": true, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", className: "size-5" } as const;
  if (status === "closed")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M5.6 5.6l12.8 12.8" />
      </svg>
    );
  if (status === "open-early")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.5 2.5L16 9.5" />
    </svg>
  );
}

function SeasonIcon({ theme }: { theme: HolidaySpec["theme"] }) {
  return theme === "christmas" ? (
    // Simple evergreen tree
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M12 2l4 5h-2l4 5h-2.5l4 5H13v3h-2v-3H4.5l4-5H6l4-5H8z" />
    </svg>
  ) : (
    // Simple autumn leaf
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M20 4c-7 0-13 3-14.5 9.5C5 16 6 18 6 18l-2 2 1.4 1.4 2-2s2 1 4.5.5C18.5 18.5 20 12 20 4zm-8.6 12.6L10 15.2c2.5-2.5 4.6-4.2 7-5.7-1.7 2.6-3.4 4.8-5.6 7.1z" />
    </svg>
  );
}

/** Small seasonal label above the H1. */
export function HolidayEyebrow({ holiday }: { holiday: HolidaySpec }) {
  return (
    <p
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${THEMES[holiday.theme].eyebrow}`}
    >
      <SeasonIcon theme={holiday.theme} />
      {holiday.eyebrow}
    </p>
  );
}

/** Quick-answer panel: one status card per day (closed, open but may close early, open). */
export default function HolidayStatus({ holiday }: { holiday: HolidaySpec }) {
  const theme = THEMES[holiday.theme];
  return (
    <section
      aria-labelledby="quick-answer"
      className={`relative mt-8 scroll-mt-24 overflow-hidden rounded-3xl text-white shadow-[0_22px_48px_-24px_rgba(40,55,15,0.6)] ${theme.panel}`}
    >
      <div aria-hidden="true" className={`h-1.5 ${theme.stripe}`} />
      <div className="p-5 sm:p-8">
        <h2 id="quick-answer" className="flex items-center gap-2 font-display text-2xl font-bold text-hero-highlight sm:text-3xl">
          <SeasonIcon theme={holiday.theme} />
          {holiday.statusHeading}
        </h2>
        <ul className="mt-5 grid gap-4 md:grid-cols-3">
          {holiday.days.map((day) => {
            const style = statusStyle(holiday.theme, day.status);
            return (
              <li key={day.date} className={`flex flex-col rounded-2xl border-t-4 bg-white p-5 text-ink shadow-sm ${style.bar}`}>
                <p className="text-sm font-semibold tracking-wide text-muted uppercase">{day.label}</p>
                <p className="mt-0.5 text-sm text-muted">
                  <time dateTime={day.date}>{formatDay(day.date)}</time>
                </p>
                <p className={`mt-3 inline-flex items-center gap-2 self-start rounded-xl px-3 py-1.5 font-display text-xl font-bold ${style.pill}`}>
                  <StatusIcon status={day.status} />
                  {day.title}
                </p>
                <p className="mt-3 text-[0.95rem] leading-6 text-card-text">{day.text}</p>
                <p className="mt-auto pt-4 text-xs font-semibold text-muted">
                  {day.confirmed ? (
                    <span className="inline-flex items-center gap-1 text-open-text">
                      <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">
                        <path d="M8.2 13.6L4.6 10l-1.2 1.2 4.8 4.8 9-9-1.2-1.2z" />
                      </svg>
                      Stated by Olive Garden
                    </span>
                  ) : (
                    "No special hours announced by Olive Garden"
                  )}
                </p>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-hero-soft">{holiday.note}</p>
      </div>
    </section>
  );
}
