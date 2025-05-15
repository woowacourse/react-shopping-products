import {
  FetchProductsRequest,
  FetchProductsResponse,
} from "../types/product.type";

async function fetchProducts({
  endpoint,
}: FetchProductsRequest): Promise<FetchProductsResponse> {
  try {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const response = await fetch(`${baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return { content: data.content, totalPages: data.totalPages };
  } catch (error) {
    throw new Error("Error fetching products:" + error);
  }
}

export default fetchProducts;
