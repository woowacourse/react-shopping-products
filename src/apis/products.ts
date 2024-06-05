import { cartClient } from "@apis/clients/cartClient";
import { API_URL } from "@apis/__constants__/apiUrl";
import { adjustProductQueryParams } from "@apis/__utils__/adjustProductQueryParams";
import { QueryFunction } from "@tanstack/react-query";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductsWithNextPage {
  data: Product[];
  nextPage: number;
}

export type ProductQueryParams = {
  page?: number;
  category?: string;
  sort?: string;
};

export interface ProductResponse {
  content: Product[];
}

export const getProductsQuery: QueryFunction<
  ProductsWithNextPage,
  [string, ProductQueryParams],
  number
> = async ({ queryKey, pageParam }) => {
  const [, queryParams] = queryKey;

  const adjustedParams = queryParams
    ? adjustProductQueryParams({ page: pageParam, ...queryParams })
    : undefined;

  const data = await cartClient.get<ProductResponse>(API_URL.products, adjustedParams);

  return {
    data: data.content,
    nextPage: pageParam + 1,
  };
};
