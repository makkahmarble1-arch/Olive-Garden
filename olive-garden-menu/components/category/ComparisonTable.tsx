import RichText from "@/components/content/RichText";
import type { ResolvedComparison } from "@/lib/category-data";
import {
  tableCaptionClass,
  tableCellClass,
  tableClass,
  tableHeadCellClass,
  tableHeadClass,
  tableRowClass,
  tableWrapClass,
} from "@/components/menu/table-styles";

/**
 * Comparison table built from the shared menu data (lib/category-data.ts).
 * Same olive design as the price table. Calculated cells carry a visible
 * "Calc." marker and the formula (also for screen readers); a note under
 * the table explains that calculated values are ours, from official values.
 */
export default function ComparisonTable({ table }: { table: ResolvedComparison }) {
  // Readable columns: the table keeps a minimum width and scrolls sideways on phones.
  const minWidthRem = Math.max(22, (table.headers.length + 1) * 8.5);
  return (
    <div className="space-y-3">
      {table.headers.length > 2 && (
        <p className="text-xs text-muted sm:hidden">Scroll sideways to see all columns.</p>
      )}
      <div role="region" aria-label={table.caption} tabIndex={0} className={tableWrapClass}>
        <table className={tableClass} style={{ minWidth: `${minWidthRem}rem` }}>
          <caption className={tableCaptionClass}>{table.caption}</caption>
          <thead className={tableHeadClass}>
            <tr>
              <th scope="col" className={tableHeadCellClass}>
                {table.firstHeader ?? "Item"}
              </th>
              {table.headers.map((header) => (
                <th key={header} scope="col" className={tableHeadCellClass}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row) => (
              <tr key={row.label} className={tableRowClass}>
                <th scope="row" className={`${tableCellClass} font-medium text-ink`}>
                  {row.label}
                </th>
                {row.cells.map((cell, i) => (
                  <td
                    key={i}
                    className={`${tableCellClass} tabular-nums ${cell.isNote ? "text-sm text-muted" : "text-ink"} ${cell.text.length <= 12 ? "whitespace-nowrap" : ""}`}
                  >
                    {cell.text}
                    {cell.calculated && (
                      <span className="mt-0.5 block text-xs text-muted">
                        <span className="font-semibold text-ink">Calc.</span> {cell.calculated}
                      </span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(table.hasCalculated || (table.notes && table.notes.length > 0)) && (
        <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-muted marker:text-brand-dark">
          {table.hasCalculated && (
            <li>
              <strong className="font-semibold text-ink">Calc.</strong> = our calculation from Olive Garden’s{" "}
              {table.calcBasis ?? "official prices and serving sizes"}, not an official figure.
            </li>
          )}
          {table.notes?.map((note, i) => (
            <li key={i}>
              <RichText value={note} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
