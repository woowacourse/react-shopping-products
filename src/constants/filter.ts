import { SortType, Category } from '@/types';

export type DropdownItem<T> = {
  option: string;
  value: T;
};

export const CATEGORY_OPTION_LIST: DropdownItem<Category>[] = [
  { option: '전체', value: 'all' },
  { option: '패션', value: 'fashion' },
  { option: '음료', value: 'beverage' },
  { option: '전자제품', value: 'electronics' },
  { option: '주방', value: 'kitchen' },
  { option: '운동', value: 'fitness' },
  { option: '도서', value: 'books' },
];

export const FILTER_OPTION_LIST: DropdownItem<SortType>[] = [
  { option: '낮은 가격순', value: 'asc' },
  { option: '높은 가격순', value: 'desc' },
];
