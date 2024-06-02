export const PRODUCT_CATEGORY_MAP = {
  all: '전체',
  fashion: '의류',
  beverage: '음료',
  electronics: '전자제품',
  kitchen: '주방용품',
  fitness: '피트니스',
  books: '도서',
} as const;

export const PRODUCT_SORT_MAP = {
  asc: '낮은 가격순',
  desc: '높은 가격순',
} as const;

export const PRODUCT_MAP = {
  sort: PRODUCT_SORT_MAP,
  category: PRODUCT_CATEGORY_MAP,
} as const;
