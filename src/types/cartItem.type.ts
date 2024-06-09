import { Product } from '@/types/product.type';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}
