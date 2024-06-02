import { CATEGORY_OPTIONS, SORT_OPTIONS } from "@src/apis/__constants__/productQueryParams";
import { Category, SortOption } from "@src/types/products";
import { isIncludedInList } from "@src/utils/isIncludedInList";

export const isCategory = (value: unknown): value is Category => {
  return isIncludedInList<Category>(value, Object.values(CATEGORY_OPTIONS));
};

export const isSortOption = (value: unknown): value is SortOption => {
  return isIncludedInList<SortOption>(value, Object.values(SORT_OPTIONS));
};
