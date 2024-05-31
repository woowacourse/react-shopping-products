import { CATEGORY_OPTIONS } from "./../constants/products";
import { SORT_OPTIONS } from "../constants/products";

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export type Category = (typeof CATEGORY_OPTIONS)[keyof typeof CATEGORY_OPTIONS];
