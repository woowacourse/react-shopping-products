import { categoryType, sortType } from "../types/index.types";

export function getQueryString(category: categoryType, sort: sortType) {
  const baseQuery = {
    page: "0",
    size: "20",
    sort: sort === "낮은 가격순" ? "price,asc" : "price,desc",
  };
  const queryObj = category === "전체" ? baseQuery : { category, ...baseQuery };
  return new URLSearchParams(queryObj).toString();
}
