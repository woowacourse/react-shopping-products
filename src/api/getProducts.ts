import { Category, PriceOrder, Product } from "../types/productType";
import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { FetchError } from "../types/\bfetchType";

export type GetProductsProps = {
  category?: Category;
  priceOrder?: PriceOrder;
};

export type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ProductsResponse = {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  numberOfElements: number;
  size: number;
  sort: Sort;
  first: boolean;
  empty: boolean;
};

const priceOrderQueryString = {
  "낮은 가격순": "price%2Casc",
  "높은 가격순": "price%2Cdesc",
};

const getProducts = async ({
  category = "전체",
  priceOrder = "낮은 가격순",
}: GetProductsProps = {}): Promise<{
  data: ProductsResponse;
  error: FetchError | null;
}> => {
  const searchParams = new URLSearchParams();
  searchParams.toString();

  if (category !== "전체") searchParams.append("category", category);
  if (priceOrder)
    searchParams.append("sort", priceOrderQueryString[priceOrder]);

  const queryString = searchParams.toString();
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const { data, error } = await fetchWithErrorHandling(
    `products?${queryString}`,
    options
  );

  return { data, error };
};

export default getProducts;
