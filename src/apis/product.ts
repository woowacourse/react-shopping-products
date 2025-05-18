import { GetProductResponse } from "../types/product";
import baseFetch from "./baseFetch";

interface GetProductParams {
  page: number;
  size: number;
  sort?: "asc" | "desc";
}

export const getProducts = async ({ page, size, sort = "asc" }: GetProductParams): Promise<GetProductResponse> => {
  return baseFetch(`/products?page=${page}&size=${size}&sort=${sort}`);
};
