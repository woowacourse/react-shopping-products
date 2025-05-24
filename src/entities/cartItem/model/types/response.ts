import {
  BaseProduct,
  PaginatedResponse,
} from "../../../../shared/api/types/response";

export interface CartItemContent {
  id: number;
  quantity: number;
  product: BaseProduct;
}

export type CartItems = PaginatedResponse<CartItemContent>;
