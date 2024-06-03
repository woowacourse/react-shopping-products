import { cartClient } from "@apis/clients/cartClient";
import { API_URL } from "@apis/__constants__/apiUrl";
import { adjustProductQueryParams } from "@apis/__utils__/adjustProductQueryParams";
import { SmartURLSearchParams } from "@utils/SmartURLSearchParams";

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
