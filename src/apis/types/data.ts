import { CartItems, Products } from "./response";

export type ApiDataKey = "products" | "cartItems";

export interface ApiDataTypeMap {
  products: Products;
  cartItems: CartItems;
}
