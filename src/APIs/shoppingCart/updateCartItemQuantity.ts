import { CartItem } from "../../types/product.type";
import { baseUrl } from "../apiConfig";
import { apiClient } from "../APIClient";
import getShoppingCart from "./getShoppingCart";
import { ShoppingCartProps, ShoppingCartResponse } from "./types";

async function updateCartItemQuantity({
  endpoint,
  requestBody,
}: ShoppingCartProps): Promise<CartItem[]> {
  try {
    const url = `${baseUrl}${endpoint}`;
    await apiClient<ShoppingCartResponse>("PATCH", url, requestBody);

    const params = {
      page: "0",
      size: "50",
    };

    const query = new URLSearchParams(params).toString();

    const responseDate = await getShoppingCart({
      endpoint: `/cart-items?${query}`,
    });

    return responseDate;
  } catch (error) {
    throw new Error("Error updating cart item quantity:" + error);
  }
}

export default updateCartItemQuantity;
