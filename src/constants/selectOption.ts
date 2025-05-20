export const CATEGORY = {
  ALL: "전체",
  GROCERY: "식료품",
  FASHION: "패션잡화",
} as const;

export type CategoryKey = keyof typeof CATEGORY;

export const SORT = {
  NONE: "순서 없음",
  PRICE_LOW: "낮은 가격순",
  PRICE_HIGH: "높은 가격순",
} as const;

export type SortKey = keyof typeof SORT;
