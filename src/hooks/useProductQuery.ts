import { useMemo } from "react";
import { URLS } from "../constants/url";
import { CategoryOptionType, OrderByOptionType } from "../types/categoryOption";
const defaultSearchParams = {
  page: "0",
  size: "50",
};
const sortParams: Record<OrderByOptionType, string> = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

export function useProductQuery(
  orderBy: OrderByOptionType,
  category: CategoryOptionType
) {
  return useMemo(() => {
    if (!orderBy) {
      return URLS.PRODUCTS;
    }

    // 상대 경로인 경우 현재 origin을 사용하여 완전한 URL 생성
    const baseUrl = URLS.PRODUCTS.startsWith("/")
      ? `${window.location.origin}${URLS.PRODUCTS}`
      : URLS.PRODUCTS;

    const url = new URL(baseUrl);

    const params = new URLSearchParams({
      ...defaultSearchParams,
      sort: sortParams[orderBy],
      category: category === "전체" ? "" : category,
    });

    url.search = params.toString();
    return url;
  }, [orderBy, category]);
}
