import { API_URL } from "./__constants__/apiUrl";
import { SmartURLSearchParams } from "../utils/SmartURLSearchParams";
import { cartClient } from "./clients/cartClient";
import { adjustProductQueryParams } from "./__utils__/adjustProductQueryParams";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductResponse {
  content: Product[];
}

export const getProducts = async (queryParams?: SmartURLSearchParams): Promise<Product[]> => {
  const adjustedParams = queryParams ? adjustProductQueryParams(queryParams) : undefined;

  const data = await cartClient.get<ProductResponse>(API_URL.products, adjustedParams);

  return data.content;
};
