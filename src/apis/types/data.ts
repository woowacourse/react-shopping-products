import { Product, CartItem } from "./response";

export type ApiDataKey = "products" | "cartItems";

export interface ApiDataTypeMap {
  products: Product[];
  cartItems: CartItem[];
}
