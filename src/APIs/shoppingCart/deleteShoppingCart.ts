import { CartItem } from "../../types/product.type";
import fetchShoppingCart from "./fetchShoppingCart";
import { ShoppingCartResponse } from "./types";

async function deleteShoppingCart({
  endpoint,
  cartItemId,
}: ShoppingCartResponse): Promise<CartItem[]> {
  return fetchShoppingCart({ method: "DELETE", endpoint, cartItemId });
}

export default deleteShoppingCart;
