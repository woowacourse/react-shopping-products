import { Product } from "../../types/product.type";
import { apiClient } from "../APIClient";
import { baseUrl } from "../apiConfig";
import { FetchProductsRequest, FetchProductsResponse } from "./type";

async function getProducts({
  endpoint,
}: FetchProductsRequest): Promise<Product[]> {
  try {
    const url = `${baseUrl}${endpoint}`;
    const data = await apiClient<FetchProductsResponse>("GET", url);
    return data.content;
  } catch (error) {
    throw new Error("getProducts error: 상품을 불러오지 못했습니다.");
  }
}

export default getProducts;
