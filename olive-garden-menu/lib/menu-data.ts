/**
 * Helper used by the files in content/menu/offerings/.
 * It fills every unknown field with a safe default (null / "unknown" /
 * "needs-verification"), so data files only list what is actually known.
 */
import { menuCategories } from "@/content/menu/categories";
import type { MenuCategoryId, MenuOffering } from "./types";

/** Fields that are set automatically and cannot be overridden. */
type AutoFields = "id" | "categoryId" | "inventoryOrder";

export type OfferingInput = Pick<MenuOffering, "inventoryName" | "displayName" | "productId"> & {
  /** Size/format variant inside the same category, e.g. "large". Becomes part of the id. */
  variant?: string;
} & Partial<Omit<MenuOffering, AutoFields | "inventoryName" | "displayName" | "productId">>;

export function offeringId(categoryId: MenuCategoryId, productId: string, variant?: string): string {
  return `${categoryId}--${productId}${variant ? `--${variant}` : ""}`;
}

/** Turns a list of inventory entries (in inventory order) into full offerings. */
export function defineOfferings(
  categoryId: MenuCategoryId,
  entries: OfferingInput[],
): MenuOffering[] {
  const category = menuCategories.find((c) => c.id === categoryId);
  if (!category) throw new Error(`Unknown menu category: ${categoryId}`);

  return entries.map(({ variant, ...entry }, index) => ({
    id: offeringId(categoryId, entry.productId, variant),
    categoryId,
    inventoryOrder: index + 1,
    description: null,
    portionType: category.defaultPortionType,
    servingSize: null,
    prices: [],
    calories: null,
    caloriesMax: null,
    caloriesBasis: null,
    caloriesSourceUrl: null,
    availability: "unknown",
    image: null,
    status: "needs-verification",
    verifiedAt: null,
    notes: null,
    ...entry,
  }));
}
