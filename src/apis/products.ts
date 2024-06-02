import { Category } from "../interfaces/Product";
import { Sorting } from "../interfaces/Sorting";

import { PRODUCTS_ENDPOINT } from "./config";
import response from "./response";

export async function fetchProductList(
  page: number,
  limit: number,
  category?: Category,
  sortOption: Sorting = "price%2Casc" as Sorting,
) {
  const requiredQuery = `page=${page}&size=${limit}`;

  const categoryQuery = category ? `category=${category}&` : "";

  const sortOptionQuery = sortOption ? `sort=${sortOption}` : "";

  const data = await response({
    url: `${PRODUCTS_ENDPOINT}?${categoryQuery}${requiredQuery}&${sortOptionQuery}`,
    method: "GET",
    errorMessage: "상품목록을 불러오는데 실패했어요..",
  });

  return data;
}
