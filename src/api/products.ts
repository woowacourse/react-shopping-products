import { CATEGORY_LIST, Category } from "../constants/category";
import { SORT_LIST, Sort } from "../constants/sort";

import { ERROR_MESSAGE } from "../constants/message";
import { PRODUCTS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

interface GetProductsParams {
  page: number;
  size: number;
  category: Category;
  sort: Sort;
}

export async function getProducts({
  page,
  size,
  category,
  sort,
}: GetProductsParams) {
  let url = `${PRODUCTS_ENDPOINT}?page=${page}&size=${size}`;
  if (category !== CATEGORY_LIST[0]) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  if (sort !== SORT_LIST[0]) {
    url += `&sort=price%2C${encodeURIComponent(sort)}`;
  }

  const data = await fetchWithToken({
    url,
    errorMessage: ERROR_MESSAGE.getProducts,
  });

  return data;
}
