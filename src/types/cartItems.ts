import { Product } from "./products";

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}

export interface AddCartRequest {
  productId: number;
  quantity: number;
}
