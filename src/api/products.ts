import { PRODUCT_DEFAULT_CATEGORY, PRODUCT_DEFAULT_SORT, ProductCategory, ProductSort } from "../constants/mall";
import { ERROR_MESSAGE } from "../constants/message";

import { PRODUCTS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

interface GetProductsParams {
  page: number;
  size: number;
  category: ProductCategory;
  sort: ProductSort;
}
export async function getProducts({ page, size, category, sort }: GetProductsParams) {
  let url = `${PRODUCTS_ENDPOINT}?page=${page}&size=${size}`;

  if (category !== PRODUCT_DEFAULT_CATEGORY) {
    url += `&category=${encodeURIComponent(category)}`;
  }

  if (sort !== PRODUCT_DEFAULT_SORT) {
    url += `&sort=price%2C${encodeURIComponent(sort)}`;
  }

  const data = await fetchWithToken({
    url,
    errorMessage: ERROR_MESSAGE.getProducts,
  });

  return data;
}
