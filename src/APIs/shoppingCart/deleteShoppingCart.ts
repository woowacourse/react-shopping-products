import { CartItem } from "../../types/product.type";
import { apiClient } from "../APIClient";
import { baseUrl } from "../apiConfig";
import getShoppingCart from "./getShoppingCart";
import { ShoppingCartProps, ShoppingCartResponse } from "./types";

async function deleteShoppingCart({
  endpoint,
  cartItemId,
}: ShoppingCartProps): Promise<CartItem[]> {
  try {
    const url = `${baseUrl}${endpoint}/${cartItemId}`;
    await apiClient<ShoppingCartResponse>("DELETE", url);

    const params = {
      page: "0",
      size: "50",
    };

    const query = new URLSearchParams(params).toString();

    const responseDate = await getShoppingCart({
      endpoint: `${endpoint}?${query}`,
    });

    return responseDate;
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default deleteShoppingCart;
