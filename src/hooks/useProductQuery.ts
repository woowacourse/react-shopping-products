import { useMemo } from "react";
import { URLS } from "../constants/url";
import { OrderByOptionType } from "../types/categoryOption";
const defaultSearchParams = {
  page: "0",
  size: "50",
};
const sortParams: Record<OrderByOptionType, string> = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

export function useProductQuery(orderBy: OrderByOptionType) {
  return useMemo(() => {
    const url = new URL(URLS.PRODUCTS);
    const params = new URLSearchParams({
      ...defaultSearchParams,
      sort: sortParams[orderBy],
    });
    url.search = params.toString();
    return url;
  }, [orderBy]);
}
