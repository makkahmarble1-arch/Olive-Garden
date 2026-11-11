import type { MenuOffering } from "@/lib/types";
import { familyStyleMealsOfferings } from "./family-style-meals";
import { appetizersOfferings } from "./appetizers";
import { classicEntreesOfferings } from "./classic-entrees";
import { buyOneTakeOneOfferings } from "./buy-one-take-one";
import { amazingAlfredosOfferings } from "./amazing-alfredos";
import { soupsSaladAndBreadsticksOfferings } from "./soups-salad-and-breadsticks";
import { lighterPortionsOfferings } from "./lighter-portions";
import { createYourOwnPastaOfferings } from "./create-your-own-pasta";
import { lunchMenuOfferings } from "./lunch-menu";
import { dessertsOfferings } from "./desserts";
import { drinkMenuOfferings } from "./drink-menu";
import { sidesSaucesAndExtrasOfferings } from "./sides-sauces-and-extras";
import { nonAlcoholicBeveragesOfferings } from "./non-alcoholic-beverages";
import { wineAndBeerToGoOfferings } from "./wine-and-beer-to-go";
import { glutenSensitiveOfferings } from "./gluten-sensitive";
import { kidsMealOfferings } from "./kids-meal";
import { cateringOfferings } from "./catering";

/** All offerings, in inventory order (category 1-17, then item order). */
export const menuOfferings: MenuOffering[] = [
  ...familyStyleMealsOfferings,
  ...appetizersOfferings,
  ...classicEntreesOfferings,
  ...buyOneTakeOneOfferings,
  ...amazingAlfredosOfferings,
  ...soupsSaladAndBreadsticksOfferings,
  ...lighterPortionsOfferings,
  ...createYourOwnPastaOfferings,
  ...lunchMenuOfferings,
  ...dessertsOfferings,
  ...drinkMenuOfferings,
  ...sidesSaucesAndExtrasOfferings,
  ...nonAlcoholicBeveragesOfferings,
  ...wineAndBeerToGoOfferings,
  ...glutenSensitiveOfferings,
  ...kidsMealOfferings,
  ...cateringOfferings,
];
