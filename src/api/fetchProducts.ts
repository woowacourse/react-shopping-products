import { ProductPageResponse } from "../hooks/useFetchProducts/index.types";
import { CategoryType, SortType } from "../types/index.types";
import request from "../utils/request";

interface FetchProductsProps {
  category: CategoryType;
  sort: SortType;
}

const SORT_TYPE = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

export default async function fetchProducts({
  category,
  sort,
}: FetchProductsProps) {
  const queryString = createQueryString(category, sort);

  const data: ProductPageResponse = await request({
    method: "GET",
    url: `/products?${queryString}`,
  });

  return data.content;
}

function createQueryString(category: CategoryType, sort: SortType) {
  const query = {
    ...(category !== "전체" && { category }),
    page: "0",
    size: "20",
    sort: SORT_TYPE[sort],
  };

  const queryString = new URLSearchParams(query).toString();

  return queryString;
}
