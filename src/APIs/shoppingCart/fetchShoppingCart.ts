import { CartItem } from "../../types/product.type";
import { baseUrl, credentials } from "./apiConfig";
import getShoppingCart from "./getShoppingCart";
import { ShoppingCartResponse } from "./types";

async function fetchShoppingCart({
  method,
  endpoint,
  cartItemId,
  requestBody,
}: ShoppingCartResponse): Promise<CartItem[]> {
  const url = `${baseUrl}${endpoint}${cartItemId ? `/${cartItemId}` : ""}`;

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      ...(requestBody ? { body: JSON.stringify(requestBody) } : {}),
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
    throw new Error("Error fetching products: " + error);
  }
}

export default fetchShoppingCart;
