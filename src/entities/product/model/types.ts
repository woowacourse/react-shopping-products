import { CATEGORIES, SORT_ORDERS } from "./constants";

export type Category = (typeof CATEGORIES)[number];

export type SortOrder = (typeof SORT_ORDERS)[number];

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: Category;
}
