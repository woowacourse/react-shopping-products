import { Product } from './product.type';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
