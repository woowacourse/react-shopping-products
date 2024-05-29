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

export const SORT_ORDERS: SortOrder[] = ['ascByPrice', 'descByPrice'] as const;

export const SORT_ORDERS_KR: Record<SortOrder, string> = {
  ascByPrice: '낮은가격순',
  descByPrice: '높은가격순',
};
