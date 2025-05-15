import { ProductItemType } from "@/types/product";
import { httpClient } from "../httpClient";
import {
  FilterOption,
  SortOption,
} from "@/components/Product/Content/ProductContent.type";

interface GetProductsParams {
  filterOption: FilterOption;
  sortOption: SortOption;
}

const sortMap = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

const ERROR_MESSAGE = "상품 목록을 가져오는 데 실패했습니다.";

export const getProducts = async ({
  filterOption,
  sortOption,
}: GetProductsParams): Promise<ProductItemType[]> => {
  const url = new URLSearchParams({
    category: filterOption,
    page: "0",
    size: "20",
    sort: sortMap[sortOption],
  });

  if (filterOption === "전체") {
    url.delete("category");
  }

  const response = await httpClient.get(`/products?${url.toString()}`);
  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }

  const data = await response.json();
  return data.content;
};
