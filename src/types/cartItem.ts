import { Product } from "./products";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartItems {
  cartItems: CartItem[];
  totalElements: number;
}

export interface CartItemsServerResponse {
  content: CartItem[];
  totalElements: number;
}
