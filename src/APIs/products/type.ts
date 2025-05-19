import { Product } from "../../types/product.type";

interface FetchProductsRequest {
  endpoint: string;
}

interface FetchProductsResponse {
  content: Product[];
  totalPages: number;
}

export type { FetchProductsRequest, FetchProductsResponse };
