export const CATEGORIES = ["전체", "식료품", "패션잡화"] as const;
export const ALL_CATEGORY = CATEGORIES[0];

export const PRICE_SORTS = {
  "price,asc": "낮은 가격순",
  "price,desc": "높은 가격순",
} as const;

export const PRICE_SORTS_KEYS = Object.keys(
  PRICE_SORTS
) as (keyof typeof PRICE_SORTS)[];

export const LOW_PRICE_SORT_KEY = PRICE_SORTS_KEYS[0];
