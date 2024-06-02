export const PRODUCT_SORT = {
  asc: "낮은 가격순",
  desc: "높은 가격순",
} as const;

export type ProductSort = keyof typeof PRODUCT_SORT;
export const PRODUCT_DEFAULT_SORT = (Object.keys(PRODUCT_SORT) as ProductSort[])[0];

export const PRODUCT_CATEGORY = {
  all: "전체",
  fashion: "패션",
  beverage: "음료",
  electronics: "전자",
  kitchen: "주방용품",
  fitness: "피트니스",
  books: "책",
} as const;

export type ProductCategory = keyof typeof PRODUCT_CATEGORY;
export const PRODUCT_DEFAULT_CATEGORY = (Object.keys(PRODUCT_CATEGORY) as ProductCategory[])[0];
