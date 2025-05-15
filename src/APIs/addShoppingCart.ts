import { CartItem, ShoppingCartResponse } from "../types/product.type";
import getShoppingCart from "./getShoppingCart";

async function addShoppingCart({
  endpoint,
  requestBody,
}: ShoppingCartResponse): Promise<CartItem[]> {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify(requestBody),
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

export default addShoppingCart;
