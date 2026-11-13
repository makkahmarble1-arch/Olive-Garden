import Image from "next/image";
import type { CreateYourOwnPasta, CustomizationOption } from "@/lib/types";
import { formatNumber, formatPrice } from "@/lib/format";
import { formatCalorieRange, searchText } from "@/lib/menu-display";

const GROUPS: { id: CustomizationOption["group"]; label: string }[] = [
  { id: "pasta", label: "1. Pasta (choose one, included)" },
  { id: "sauce", label: "2. Sauce (choose one, included)" },
  { id: "topping", label: "3. Toppings (optional, extra charge)" },
  { id: "first-course", label: "Included: soup or salad (choose one) and 2 breadsticks" },
];

function priceText(option: CustomizationOption): string {
  return option.priceType === "included" ? "Included" : `+${formatPrice(option.price)}`;
}

function caloriesText(option: CustomizationOption): string {
  if (option.calories === null) return option.caloriesNote ?? "Not listed";
  return `${formatNumber(option.calories)} cal${option.caloriesUnit ? ` ${option.caloriesUnit}` : ""}`;
}

/**
 * Create Your Own Pasta: base price + the 23 official build options in one
 * accessible table (the category has no standalone inventory entries).
 */
export default function CreateYourOwnPastaTable({ data }: { data: CreateYourOwnPasta }) {
  return (
    <div className="space-y-4">
      <div
        data-menu-item=""
        data-search={searchText("Create Your Own Pasta")}
        className="overflow-hidden rounded-xl border border-line bg-white shadow-sm sm:flex"
      >
        {data.image && (
          <div className="aspect-[4/3] sm:w-64 sm:shrink-0">
            <Image
              src={data.image.src}
              alt={data.image.alt}
              width={data.image.width}
              height={data.image.height}
              sizes="(min-width: 640px) 256px, 92vw"
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-4 sm:p-5">
          <p className="font-display text-lg font-bold text-ink">Create Your Own Pasta</p>
          <dl className="mt-2 grid gap-3 sm:grid-cols-3">
            <div>
              <dt className="text-[0.7rem] font-semibold tracking-wide text-muted uppercase">Price</dt>
              <dd className="text-lg font-bold text-brand-dark tabular-nums">{formatPrice(data.basePrice)}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-semibold tracking-wide text-muted uppercase">Calories</dt>
              <dd className="font-semibold text-ink tabular-nums">
                {formatCalorieRange(data.caloriesMin, data.caloriesMax)} cal
              </dd>
              <dd className="text-xs text-muted">{data.caloriesUnit}</dd>
            </div>
            <div>
              <dt className="text-[0.7rem] font-semibold tracking-wide text-muted uppercase">Includes</dt>
              <dd className="text-sm leading-6 text-ink">{data.includes}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div
        role="region"
        aria-label="Create Your Own Pasta options"
        tabIndex={0}
        className="overflow-x-auto rounded-xl border border-line bg-white focus-visible:outline-2 focus-visible:outline-brand-dark"
      >
        <table className="w-full min-w-[20rem] border-collapse text-left text-sm">
          <caption className="px-4 pt-3 pb-2 text-left text-sm text-muted">
            Build options with prices and calories. (V) = vegetarian, as labeled by Olive Garden.
          </caption>
          <thead className="bg-brand-tint text-ink">
            <tr>
              <th scope="col" className="px-4 py-2 font-semibold">Option</th>
              <th scope="col" className="px-4 py-2 text-right font-semibold">Price</th>
              <th scope="col" className="px-4 py-2 text-right font-semibold">Calories</th>
            </tr>
          </thead>
          {GROUPS.map((group) => (
            <tbody key={group.id} data-menu-group="">
              <tr className="border-t border-line bg-white">
                <th scope="colgroup" colSpan={3} className="px-4 pt-3 pb-1 font-semibold text-brand-dark">
                  {group.label}
                </th>
              </tr>
              {data.options
                .filter((option) => option.group === group.id)
                .map((option) => (
                  <tr
                    key={option.id}
                    data-menu-item=""
                    data-search={searchText(option.name)}
                    className="border-t border-line/70"
                  >
                    <th scope="row" className="px-4 py-2 font-medium text-ink">
                      {option.name}
                      {option.vegetarian && <span className="ml-1 text-xs font-normal text-muted">(V)</span>}
                    </th>
                    <td className="px-4 py-2 text-right whitespace-nowrap text-ink tabular-nums">{priceText(option)}</td>
                    <td className="px-4 py-2 text-right whitespace-nowrap text-ink tabular-nums">{caloriesText(option)}</td>
                  </tr>
                ))}
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
