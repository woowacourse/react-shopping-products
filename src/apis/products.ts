import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";
import { PRODUCTS_SIZE } from "../constants/products";

import { Products, ProductsRequestUrlOptions, ProductsServerResponse } from "../types/products";
import { fetchClient } from "./fetchClient";

export default function createProductItemsRequestUrl({
  page,
  category,
  sort,
}: ProductsRequestUrlOptions) {
  const params = new URLSearchParams();

  params.append("page", String(page));
  params.append("size", String(page === 0 ? 20 : PRODUCTS_SIZE.perRequest));
  params.append("sort", `price,${sort}`);

  if (category && category !== "all") params.append("category", category);

  return `${ENDPOINT.PRODUCT}?${params.toString()}`;
}

export async function getProducts({
  page,
  category = "all",
  sort = "asc",
}: ProductsRequestUrlOptions): Promise<Products> {
  const url = createProductItemsRequestUrl({ page, category, sort });

  const response = (await fetchClient<ProductsServerResponse>({
    url,
    method: "GET",
    errorMessage: PRODUCTS_ERROR_MESSAGES.fetchingProducts,
  })) as ProductsServerResponse;

  return {
    products: response?.content,
    currentPage: response?.pageable.pageNumber,
    isLastPage: response?.last,
  };
}
