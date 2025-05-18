import { CategoryType, SelectedSortType, SortType } from '../types/data';

export const PRODUCT_LIST_ITEM_COUNT = 20;

export const CATEGORY_OPTIONS: CategoryType[] = ['전체', '식료품', '패션잡화'];

export const SELECT_SORT_OPTIONS: SelectedSortType[] = ['높은 가격순', '낮은 가격순'];

export const SORT_OPTIONS = new Map<SelectedSortType, SortType>([
  ['높은 가격순', 'desc'],
  ['낮은 가격순', 'asc'],
]);
