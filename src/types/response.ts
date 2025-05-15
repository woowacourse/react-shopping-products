import { CartItem, Product } from './common';

export type ProductListResponse = {
  content: Product[];
};

export interface CartResponse {
  content: CartItem[];
}
