import { BaseProduct, PaginatedResponse } from "./common";

export interface CartItemContent {
  id: number;
  quantity: number;
  product: BaseProduct;
}

export type CartItems = PaginatedResponse<CartItemContent>;
