import { Product } from "./products";

export interface CartItemType {
  id: number;
  product: Product;
  quantity: number;
}

export interface AddCartRequest {
  productId: number;
  quantity: number;
}
