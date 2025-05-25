import { CartItems } from "../../../entities/cartItem/model/types/response";
import { Products } from "../../../entities/product/model/types/response";

export type ApiDataKey = "products" | "cartItems";

export interface ApiDataTypeMap {
  products: Products;
  cartItems: CartItems;
}
