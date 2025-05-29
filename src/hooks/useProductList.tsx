// src/hooks/useProductList.ts
import { useEffect } from "react";
import getProducts from "../api/getProducts";
import { useAPI } from "../domain/contexts/APIContext";
import {
  CategoryValue,
  SortValue,
} from "../Component/Product/ProductListContainer";
import {
  CATEGORY_OPTIONS,
  PRICE_OPTIONS,
} from "../Component/Product/ProductListContainer";

export function useProductList(category: CategoryValue, price: SortValue) {
  const categoryParam = CATEGORY_OPTIONS.find(
    (o) => o.value === category
  )!.param;
  const sortParam = PRICE_OPTIONS.find((o) => o.value === price)!.param;

  const {
    data: products,
    status,
    refetch,
  } = useAPI({
    name: "products",
    fetcher: () =>
      getProducts(categoryParam, {
        page: 0,
        size: 20,
        sort: sortParam,
      }),
  });

  useEffect(() => {
    refetch();
  }, [category, price, refetch]);

  return { products, status };
}
