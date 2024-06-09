import { Category, SortOrder } from './types';

export const CATEGORIES: Category[] = ['fashion', 'beverage', 'electronics', 'kitchen', 'fitness', 'books'] as const;

export const CATEGORIES_KR: Record<Category, string> = {
  fashion: '패션',
  beverage: '음료',
  electronics: '전자제품',
  kitchen: '리빙',
  fitness: '헬스',
  books: '도서',
};

export const SORT_ORDERS: SortOrder[] = ['price,id,asc', 'price,id,desc'] as const;

export const SORT_ORDERS_KR: Record<SortOrder, string> = {
  'price,id,asc': '낮은가격순',
  'price,id,desc': '높은가격순',
};

export const ALL = 'all' as const;
export const ALL_KR = '전체';

export const CATEGORY_OPTIONS = CATEGORIES.map((category) => ({
  value: category,
  label: CATEGORIES_KR[category],
}));

export const SORT_ORDER_OPTIONS = SORT_ORDERS.map((order) => ({
  value: order,
  label: SORT_ORDERS_KR[order],
}));

export const DEFAULT_CATEGORY = ALL;
export const DEFAULT_SORT_ORDER = SORT_ORDERS[0];
