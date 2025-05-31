import { SORT_PRICE_MAP } from '../constants/productConfig';

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity?: number;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
    quantity: number;
  };
}

export interface ErrorType {
  isError: boolean;
  errorMessage: string;
}

export interface CartResponse {
  content: CartItem[];
  totalElements: number;
}

export type SortKeyType = keyof typeof SORT_PRICE_MAP;

export type CategoryType = '전체' | '식료품' | '패션잡화';
