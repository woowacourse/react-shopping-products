import { GetProductResponse } from "../types/product";
import { baseHeaders } from "./base";
import { baseURL } from "./base";

interface GetProductParams {
  page: number;
  size: number;
  sort?: "asc" | "desc";
}

export const getProducts = async ({ page, size, sort = "asc" }: GetProductParams): Promise<GetProductResponse> => {
  const response = await fetch(`${baseURL}/products?page=${page}&size=${size}&sort=${sort}`, {
    headers: baseHeaders,
  });
  if (!response.ok) {
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
  const data = await response.json();

  return data;
};
