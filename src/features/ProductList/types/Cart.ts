import { Product } from './Product';

export type CartResponse = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: CartItem[];
  number: number;
  sort: object;
  pageable: object;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};
