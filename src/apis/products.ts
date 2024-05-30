import { Category } from "../interfaces/Product";
import { Sorting } from "../interfaces/Sorting";
import { PRODUCTS_ENDPOINT, token } from "./config";

export async function fetchProductList(
  page: number,
  limit: number,
  category?: Category,
  sortOption: Sorting = "price%2Casc" as Sorting
) {
  const requiredQuery = `page=${page}&size=${limit}`;

  const categoryQuery = category ? `category=${category}&` : "";

  const sortOptionQuery = sortOption ? `sort=${sortOption}` : "";

  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}${requiredQuery}&${sortOptionQuery}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
