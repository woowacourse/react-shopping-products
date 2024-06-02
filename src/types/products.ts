import { CATEGORY_OPTIONS, SORT_OPTIONS } from "../api/__constants__/productQueryParams";

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export type Category = (typeof CATEGORY_OPTIONS)[keyof typeof CATEGORY_OPTIONS];
