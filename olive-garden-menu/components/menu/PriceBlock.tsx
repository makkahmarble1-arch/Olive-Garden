import { calorieUnitNote, type DisplayValues } from "@/lib/menu-display";

type PriceBlockProps = {
  values: DisplayValues;
  /** Small label before the price when it is not a regular price, e.g. "Add-on". */
  priceTag?: string | null;
};

/** Small flame for the calorie pill (decorative). */
function Flame() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-3.5 shrink-0" fill="currentColor">
      <path d="M8.6 1.2c.3 2.1-.6 3.3-1.6 4.4-.9 1-1.9 2-1.9 3.8 0 .9.4 1.6.9 2.1-.1-.3-.1-.6-.1-.9 0-1.3.9-2.2 1.7-3 .4 1.1 1.5 1.6 1.5 3 0 .4-.1.7-.2 1 .9-.4 1.6-1.4 1.6-2.7 0-1.4-.7-2.3-1.2-3.1 1.4.4 2.9 1.9 2.9 4.3C12.2 13 10.3 15 8 15s-4.2-2-4.2-4.6c0-3.4 2.6-4.7 3.6-6.6.4-.8.6-1.6.4-2.6.3 0 .6 0 .8 0Z" />
    </svg>
  );
}

/**
 * Price + calories line of a menu card: "$68.99  [flame 6,700 Cal]" (amber
 * calorie pill, premium card design), with the calorie unit or calculation
 * underneath only when it adds information. No hooks, so it also works
 * inside the client option picker.
 */
export default function PriceBlock({ values, priceTag }: PriceBlockProps) {
  const unit = calorieUnitNote(values.caloriesUnit);
  // When neither value exists (e.g. not on the menu), the price note explains both.
  const showCalories = !(values.priceIsNote && values.caloriesIsNote);

  return (
    <div className="space-y-1">
      <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        {priceTag && !values.priceIsNote && (
          <span className="rounded bg-brand-dark px-1.5 py-0.5 text-[0.7rem] font-semibold tracking-wide text-white uppercase">
            {priceTag}
          </span>
        )}
        {values.priceIsNote ? (
          <span className="text-sm leading-5 text-muted">{values.price}</span>
        ) : (
          <span className="text-xl leading-7 font-bold text-brand-dark tabular-nums">
            <span className="sr-only">Price: </span>
            {values.price}
          </span>
        )}
        {!showCalories ? null : values.caloriesIsNote ? (
          <span className="text-xs leading-5 text-muted">
            <span className="sr-only">Calories: </span>
            {values.calories}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-kcal-bg px-2 py-0.5 text-xs font-semibold whitespace-nowrap text-kcal-text tabular-nums">
            <Flame />
            <span className="sr-only">Calories: </span>
            {values.calories}
          </span>
        )}
      </p>
      {(values.calculatedFrom || unit) && (
        <p className="text-xs leading-5 text-muted">
          {unit}
          {values.calculatedFrom && unit && " · "}
          {values.calculatedFrom && (
            <>
              <span className="font-semibold text-ink">Calculated:</span> {values.calculatedFrom}
            </>
          )}
        </p>
      )}
    </div>
  );
}
