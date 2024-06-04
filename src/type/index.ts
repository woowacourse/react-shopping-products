import { CATEGORY, SORT } from '../constants';

export type CategoryType = keyof typeof CATEGORY;

export function isCategoryType(value: string): value is CategoryType {
  return Object.keys(CATEGORY).includes(value);
}
export type SortType = keyof typeof SORT;

export function isSortType(value: string): value is SortType {
  return Object.keys(SORT).includes(value);
}
