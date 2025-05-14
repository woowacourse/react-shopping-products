import { GetProductResponse } from "../types/product";

interface GetProductParams {
  page: number;
  size: number;
  sort?: "asc" | "desc";
}

export const getProducts = async ({ page, size, sort = "asc" }: GetProductParams): Promise<GetProductResponse> => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/products?page=${page}&size=${size}&sort=${sort}`);
  const data = await response.json();

  return data;
};
