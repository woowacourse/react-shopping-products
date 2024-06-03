import { CATEGORIES, CATEGORIES_KR, SORT_ORDERS, SORT_ORDERS_KR } from '@/entities/product';

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
