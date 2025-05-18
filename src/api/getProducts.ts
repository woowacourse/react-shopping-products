import { Category } from "../App";
import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { PriceOrder } from "../App";
import { Product } from "../App";

type GetProductsProps = {
  category?: Category;
  priceOrder?: PriceOrder;
};
const priceOrderQueryString = {
  "낮은 가격순": "price%2Casc",
  "높은 가격순": "price%2Cdesc",
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

type ProductsResponse = {
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

const getProducts = async ({
  category = "전체",
  priceOrder = "낮은 가격순",
}: GetProductsProps = {}): Promise<{
  newErrorMessage: string;
  data: ProductsResponse;
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

  let newErrorMessage = "";

  const { data, status } = await fetchWithErrorHandling(
    `products?${queryString}`,
    options
  );

  if (status === 400) {
    newErrorMessage = "상품 목록을 불러오지 못했습니다. 다시 시도해주세요";
  } else if (status === 404) {
    newErrorMessage = "not found";
  } else if (status === 500) {
    newErrorMessage = "서버에 문제가 발생했습니다.";
  }

  return { newErrorMessage, data };
};

export default getProducts;
