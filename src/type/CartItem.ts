import { ProductItem } from './ProductItem';

export interface CartItems {
  id: number;
  quantity: number;
  product: ProductItem;
}
