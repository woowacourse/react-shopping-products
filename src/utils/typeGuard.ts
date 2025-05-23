import { Category, SortOption } from '../types/product.type';

const isCategory = (
  TYPE: readonly Category[],
  value: string
): value is Category => TYPE.includes(value as Category);

const isSortOption = (
  TYPE: readonly SortOption[],
  value: string
): value is SortOption => TYPE.includes(value as SortOption);

export { isCategory, isSortOption };
