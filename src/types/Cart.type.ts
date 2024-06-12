import { Product } from './Product.type';

export interface Cart {
  id: number;
  quantity: number;
  product: Product;
}
