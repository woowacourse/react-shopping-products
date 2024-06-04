import { Category, SortOption } from '@/types/product';

export const SORT_OPTIONS: SortOption[] = [
  { value: 'asc', label: '낮은 가격순' },
  { value: 'desc', label: '높은 가격순' },
];

export const CATEGORY: Category[] = [
  { value: 'all', label: '전체' },
  { value: 'fashion', label: '패션' },
  { value: 'beverage', label: '음료' },
  { value: 'electronics', label: '전자기기' },
  { value: 'kitchen', label: '주방제품' },
  { value: 'fitness', label: '운동기구' },
  { value: 'books', label: '책/도서' },
];
