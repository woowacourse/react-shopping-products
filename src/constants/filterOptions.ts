import { ProductCategory } from "../types/ProductCategory";
import { PriceSort } from "../types/Sort";

export const CATEGORIES = ["전체", "식료품", "패션잡화"] as const;
export const ALL_CATEGORY: ProductCategory = "전체";

export const PRICE_SORTS = {
  "price,asc": "낮은 가격순",
  "price,desc": "높은 가격순",
} as const;

export const PRICE_SORTS_KEYS = Object.keys(PRICE_SORTS) as PriceSort[];

export const LOW_PRICE_SORT_KEY: PriceSort = "price,asc";
export const HIGH_PRICE_SORT_KEY: PriceSort = "price,desc";
