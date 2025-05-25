import { CartItems } from "../../../entities/cartItem/response";
import { Products } from "../../../entities/product/response";

export type ApiDataKey = "products" | "cartItems";

export interface ApiDataTypeMap {
  products: Products;
  cartItems: CartItems;
}
