import { apiClient } from "../APIClient";
import { baseUrl } from "../apiConfig";
import { FetchProductsRequest, FetchProductsResponse } from "./type";

async function getProducts({
  endpoint,
}: FetchProductsRequest): Promise<FetchProductsResponse> {
  try {
    const url = `${baseUrl}${endpoint}`;
    const data = await apiClient<FetchProductsResponse>("GET", url);
    if (!data) throw new Error("Error fetching data");
    return { content: data.content, totalPages: data.totalPages };
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default getProducts;
