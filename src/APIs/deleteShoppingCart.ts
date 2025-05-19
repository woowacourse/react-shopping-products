import { CartItem, ShoppingCartResponse } from "../types/product.type";
import { baseUrl, credentials } from "./apiConfig";
import getShoppingCart from "./getShoppingCart";

async function deleteShoppingCart({
  endpoint,
  cartItemId,
}: ShoppingCartResponse): Promise<CartItem[]> {
  try {
    const response = await fetch(`${baseUrl}${endpoint}/${cartItemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

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
