import { Product } from '../products/types';
import { PageableObject, SortObject } from '../types';

export type CartItem = {
  id: number;
  quantity: number;
  product: Product[];
};

export type CartItemsResponse = {
  totalPages: number;
  totalElements: number;
  sort: SortObject;
  first: boolean;
  last: boolean;
  pageable: PageableObject;
  number: number;
  numberOfElements: number;
  size: number;
  content: CartItem[];
  empty: boolean;
};
