import { PaginatedResponse } from "./pagination";
import { BaseProduct } from "./products";

export interface CartItemContent {
  id: number;
  quantity: number;
  product: BaseProduct;
}

export type CartItems = PaginatedResponse<CartItemContent>;
