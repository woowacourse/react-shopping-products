import { CartItem } from "./cartContents";
import { ProductWithQuantity } from "./product";
import { CartItemResponse, ProductWithQuantityResponse } from "./response";

// data-types.ts
export interface DataPoolMap {
  products: ProductWithQuantity[];
  "cart-items": CartItem[];
}

export type DataResponseMap = {
  products: ProductWithQuantityResponse;
  "cart-items": CartItemResponse;
};
export type DataKey = keyof DataPoolMap;
