import { GetProductResponse } from "../types/product";
import baseFetch from "./baseFetch";

interface GetProductParams {
  category: string;
  page: number;
  size: number;
  sort?: "asc" | "desc";
}
export const getProducts = async ({
  category = "",
  page,
  size,
  sort,
}: GetProductParams): Promise<GetProductResponse> => {
  return baseFetch(`/products?${category && `category=${category}`}&page=${page}&size=${size}&sort=price,${sort}`);
};
