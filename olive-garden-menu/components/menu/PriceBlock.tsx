import { calorieUnitNote, type DisplayValues } from "@/lib/menu-display";

type PriceBlockProps = {
  values: DisplayValues;
  /** Small label before the price when it is not a regular price, e.g. "Add-on". */
  priceTag?: string | null;
};

/**
 * Compact price + calories line of a menu card: "$68.99  [6,700 Cal]",
 * with the calorie unit or calculation underneath only when it adds
 * information. No hooks, so it also works inside the client option picker.
 */
export default function PriceBlock({ values, priceTag }: PriceBlockProps) {
  const unit = calorieUnitNote(values.caloriesUnit);
  // When neither value exists (e.g. not on the menu), the price note explains both.
  const showCalories = !(values.priceIsNote && values.caloriesIsNote);

  return (
    <div className="space-y-1">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
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
          <span className="inline-flex items-center rounded-full bg-brand-tint px-2 py-0.5 text-xs font-semibold text-ink ring-1 ring-brand/40 tabular-nums">
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
