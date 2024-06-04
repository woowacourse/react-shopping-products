import { Category, OptionItem, SortProperty, SortOrder } from '@/types/filter.type';

export const CATEGORY_OPTION_LIST: OptionItem<Category>[] = [
  { name: '전체', value: 'all' },
  { name: '패션', value: 'fashion' },
  { name: '음료', value: 'beverage' },
  { name: '전자제품', value: 'electronics' },
  { name: '주방', value: 'kitchen' },
  { name: '운동', value: 'fitness' },
  { name: '도서', value: 'books' },
];

export const SortDivider = ',';
export type SortValue = `${SortProperty}${typeof SortDivider}${SortOrder}`;
export const FILTER_OPTION_LIST: OptionItem<SortValue>[] = [
  { name: '낮은 가격순', value: 'price,asc' },
  { name: '높은 가격순', value: 'price,desc' },
];
