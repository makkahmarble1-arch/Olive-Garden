"use client";

import { useId, useState } from "react";
import type { DisplayOption } from "@/lib/menu-display";
import PriceBlock from "./PriceBlock";

type OptionPickerProps = {
  /** Item name, used in the accessible label of the select. */
  itemName: string;
  priceTag?: string | null;
  options: DisplayOption[];
};

/**
 * Size / variant selector of a menu card. The first option is rendered on
 * the server; choosing another option updates the price and calories.
 * Option prices are part of each <option> text, so they are in the HTML.
 */
export default function OptionPicker({ itemName, priceTag, options }: OptionPickerProps) {
  const [index, setIndex] = useState(0);
  const id = useId();
  const selected = options[index] ?? options[0];

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="sr-only">
        Choose a size or option for {itemName}
      </label>
      <select
        id={id}
        value={index}
        onChange={(event) => setIndex(Number(event.target.value))}
        className="block min-h-11 w-full rounded-lg border border-brand/50 bg-brand-tint/50 px-2 text-sm text-ink focus-visible:outline-2 focus-visible:outline-brand-dark"
      >
        {options.map((option, i) => (
          <option key={i} value={i}>
            {option.label}
            {option.priceIsNote ? "" : ` – ${option.price}`}
            {option.unavailable ? " (currently unavailable)" : ""}
          </option>
        ))}
      </select>
      <div aria-live="polite">
        <PriceBlock values={selected} priceTag={priceTag} />
        {selected.unavailable && (
          <p className="mt-1 text-xs font-semibold text-warning-text">Currently unavailable</p>
        )}
      </div>
    </div>
  );
}
