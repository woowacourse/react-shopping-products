import { GetProductResponse } from "@/types/response/product";
import BaseApi from "./BaseApi";

interface GetProductParams {
  page: number;
  size: number;
  sort?: "asc" | "desc";
}

export const getProducts = async ({ page, size, sort = "asc" }: GetProductParams): Promise<GetProductResponse> => {
  const response = await BaseApi.get(`/products?page=${page}&size=${size}&sort=${sort}`);
  return response;
};
