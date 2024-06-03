import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from "@src/apis/__constants__/productQueryParams";
import { isIncludedInList } from "@src/utils/isIncludedInList";
import { Category, PriceSort } from "@src/types/products";

export const isCategory = (value: unknown): value is Category => {
  return isIncludedInList<Category>(value, Object.values(CATEGORY_OPTIONS));
};

export const isPriceSort = (value: unknown): value is PriceSort => {
  return isIncludedInList<PriceSort>(value, Object.values(PRICE_SORT_OPTIONS));
};
