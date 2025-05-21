import type { CartItemResponse, ProductWithQuantityResponse } from "./response";

// data-types.ts
export interface DataPoolMap {
  products: ProductWithQuantityResponse;
  "cart-items": CartItemResponse;
}

export type DataKey = keyof DataPoolMap;
