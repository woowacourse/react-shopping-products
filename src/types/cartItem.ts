import { Product } from "./products";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface UpdateCartItemQuantityProps {
  cartItemId: number;
  quantity: number;
}
