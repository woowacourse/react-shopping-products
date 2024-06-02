import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from "@apis/__constants__/productQueryParams";

export type PriceSort = (typeof PRICE_SORT_OPTIONS)[keyof typeof PRICE_SORT_OPTIONS];

export type Category = (typeof CATEGORY_OPTIONS)[keyof typeof CATEGORY_OPTIONS];
