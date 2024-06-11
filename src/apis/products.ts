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
  nextPage: number | undefined;
}

export type ProductQueryParams = {
  page?: number;
  category?: string;
  sort?: string;
};

export interface ProductResponse {
  content: Product[];
  last: boolean;
}

export const getProducts: QueryFunction<
  ProductsWithNextPage,
  [string, ProductQueryParams],
  number
> = async ({ queryKey, pageParam }) => {
  const [, queryParams] = queryKey;

  const adjustedParams = queryParams
    ? adjustProductQueryParams({ page: pageParam, ...queryParams })
    : undefined;

  try {
    const data = await cartClient.get<ProductResponse>(API_URL.products, adjustedParams);

    return {
      data: data.content,
      nextPage: data.last ? undefined : pageParam + 1,
    };
  } catch {
    throw new Error("상품을 불러오는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
};
