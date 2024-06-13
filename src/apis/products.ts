import { PRODUCTS_ENDPOINT } from "./config";
import fetchWithAuth from "./fetchWithAuth";
import { Category } from "../interfaces/Product";
import { Sorting } from "../interfaces/Sorting";

interface FetchProductListParams {
  page: number;
  limit: number;
  category?: Category;
  sort?: Sorting;
}

export async function fetchProductList({
  page,
  limit,
  category,
  sort = Sorting.PRICE_ASC,
}: FetchProductListParams) {
  const requiredQuery = `page=${page}&size=${limit}`;
  const categoryQuery = category ? `category=${category}&` : "";
  const sortOptionQuery = sort ? `sort=${sort}` : "";

  const url = `${PRODUCTS_ENDPOINT}?${categoryQuery}${requiredQuery}&${sortOptionQuery}`;
  const response = await fetchWithAuth(url, "GET");

  const data = await response.json();
  return data;
}
