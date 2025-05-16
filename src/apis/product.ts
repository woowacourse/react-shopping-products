import { GetProductResponse } from "@/types/response/product";
import BaseApi from "./BaseApi";

interface GetProductParams {
  page?: number;
  size?: number;
  sort?: "asc" | "desc";
}
export const getProducts = async ({
  page = 0,
  size = 20,
  sort = "asc",
}: GetProductParams = {}): Promise<GetProductResponse> => {
  const searchParams = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort,
  });

  const response = await BaseApi.get(`/products?${searchParams.toString()}`);
  return response;
};
