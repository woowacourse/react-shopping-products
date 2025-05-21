import { CartItem } from "../../types/product.type";
import { apiClient } from "../APIClient";
import { baseUrl } from "../apiConfig";
import { ShoppingCartResponse } from "./types";

interface FetchShoppingCartRequest {
  endpoint: string;
}

async function getShoppingCart({
  endpoint,
}: FetchShoppingCartRequest): Promise<CartItem[]> {
  try {
    const url = `${baseUrl}${endpoint}`;
    const data = await apiClient<ShoppingCartResponse>("GET", url);
    if (!data) throw new Error("Error fetching products");
    return data.content;
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default getShoppingCart;
