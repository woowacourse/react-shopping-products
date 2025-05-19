import { CartItem } from "../../types/product.type";
import { baseUrl, credentials } from "./apiConfig";

interface FetchShopingCartRequest {
  endpoint: string;
}

async function getShoppingCart({
  endpoint,
}: FetchShopingCartRequest): Promise<CartItem[]> {
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
