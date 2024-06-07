import { ProductItem } from './ProductItem';

export interface CartItems {
  id: number;
  quantity: number;
  product: ProductItem;
}

export interface fetchCartItem {
  orderId: number;
  productId: number;
  quantity: number;
}
