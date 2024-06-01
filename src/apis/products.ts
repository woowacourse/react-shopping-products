import { PRODUCTS_ENDPOINT } from "./config";
import fetchWithAuth from "./fetchWithAuth";
import { Category } from "../interfaces/Product";
import { Sorting } from "../interfaces/Sorting";

export async function fetchProductList(
  page: number,
  limit: number,
  category?: Category,
  sortOption: Sorting = Sorting.PRICE_ASC
) {
  const requiredQuery = `page=${page}&size=${limit}`;
  const categoryQuery = category ? `category=${category}&` : "";
  const sortOptionQuery = sortOption ? `sort=${sortOption}` : "";

  const url = `${PRODUCTS_ENDPOINT}?${categoryQuery}${requiredQuery}&${sortOptionQuery}`;
  const response = await fetchWithAuth(url, "GET");

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
