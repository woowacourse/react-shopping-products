import { Category, Product } from "../interfaces/Product";
import { PRODUCTS_ENDPOINT, token } from "./config";

export type SortProperty = "asc" | "desc";

export type SortOption = [keyof Product, SortProperty];

export async function fetchProductList(
  page: number,
  limit: number,
  category?: Category,
  sortOptionList?: SortOption[]
) {
  const requiredQuery = `&page=${page}&limit=${limit}`;

  const categoryQuery = category ? `category=${category}` : "";

  const sortOptionListQuery = sortOptionList
    ? sortOptionList.reduce(
        (query, sortOption) =>
          `${query}&sort=${sortOption[0]},${sortOption[1]}`,
        ""
      )
    : "";
  console.log(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}&${requiredQuery}&${sortOptionListQuery}`
  );
  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}&${requiredQuery}&${sortOptionListQuery}`,
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
