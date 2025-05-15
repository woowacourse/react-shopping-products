import { FetchProductsRequest, CartItem } from "../types/product.type";

async function getShoppingCart({
  endpoint,
}: FetchProductsRequest): Promise<CartItem[]> {
  const username = import.meta.env.VITE_USERNAME;
  const password = import.meta.env.VITE_PASSWORD;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const credentials = btoa(`${username}:${password}`);

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default getShoppingCart;
