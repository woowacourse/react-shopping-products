import { ProductItemType } from "@/apis/products/product.type";
import { httpClient } from "../httpClient";
import {
  FilterOption,
  SortOption,
} from "@/components/Product/Content/ProductContent.type";

interface GetProductsParams {
  filterOption: FilterOption;
  sortOption: SortOption;
}

const ERROR_MESSAGE = "상품 목록을 가져오는 데 실패했습니다.";

export const getProducts = async ({
  filterOption,
  sortOption,
}: GetProductsParams): Promise<ProductItemType[]> => {
  const url = new URLSearchParams({
    category: filterOption.value,
    page: "0",
    size: "20",
    sort: sortOption.value,
  });

  if (filterOption.value === "전체") {
    url.delete("category");
  }

  const response = await httpClient.get(`/products?${url.toString()}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.content;
};
