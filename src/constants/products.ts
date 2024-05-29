export const PRODUCTS_SIZE = {
  initial: 20,
  perRequest: 4,
} as const;

export const PRODUCT_CATEGORIES = {
  전체: 'all',
  패션: 'fashion',
  주방용품: 'kitchen',
  음료: 'beverage',
  전자제품: 'electronics',
  운동용품: 'fitness',
  도서: 'books',
} as const;

export const PRODUCT_SORT_OPTIONS = {
  '낮은 가격순': 'asc',
  '높은 가격순': 'desc',
} as const;

export type CategoryKeys = keyof typeof PRODUCT_CATEGORIES;
export type CategoryQueryString = (typeof PRODUCT_CATEGORIES)[keyof typeof PRODUCT_CATEGORIES];

export type SortOptionsKeys = keyof typeof PRODUCT_SORT_OPTIONS;
export type SortOptionQueryString =
  (typeof PRODUCT_SORT_OPTIONS)[keyof typeof PRODUCT_SORT_OPTIONS];
