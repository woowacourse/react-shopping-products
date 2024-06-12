import { PRICE_SORT, CATEGORY_LIST } from '@/constants/productList';

export type PriceSortKey = (typeof PRICE_SORT)[number]['key'];
export type CategoryListKey = (typeof CATEGORY_LIST)[number]['key'];

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductFilterOptions {
  sort: PriceSortKey;
  category: CategoryListKey;
}
