import { SORT_PRICE_MAP } from '../constants/productConfig';

export interface ProductElement {
  id: number;
  name: string;
  price: number;
  category: string;
  imageUrl: string;
  quantity?: number;
}

// export interface mockProductElement {
//   id: number;
//   name: string;
//   price: number;
//   category: string;
//   imageUrl: string;
//   quantity: number;
// }

// export interface ProductWithCartInfo extends ProductElement {
//   cartId?: number;
//   isInCart: boolean;
// }

// export interface CartType {
//   totalElements: number;
// }

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

// export enum SortOrder {
//   'asc' = '낮은 가격 순',
//   'desc' = '높은 가격 순',
// }

// export type SortType = '낮은 가격 순' | '높은 가격 순';
// type SortDirection = 'asc' | 'desc';

export type SortKeyType = keyof typeof SORT_PRICE_MAP;

export type CategoryType = '전체' | '식료품' | '패션잡화';

// export const directionMap: Record<SortType, SortDirection> = {
//   '낮은 가격 순': 'asc',
//   '높은 가격 순': 'desc',
// };

// type SortBy = keyof typeof SORT_PRICE_MAP;
