import { CartItem } from "../../types/product.type";
import fetchShoppingCart from "./fetchShoppingCart";
import { ShoppingCartResponse } from "./types";

async function addShoppingCart({
  endpoint,
  requestBody,
}: ShoppingCartResponse): Promise<CartItem[]> {
  return fetchShoppingCart({ method: "POST", endpoint, requestBody });
}

export default addShoppingCart;
