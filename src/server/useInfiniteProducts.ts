import {
  Product,
  ProductQueryParams,
  ProductsWithNextPage,
  getProductsQuery,
} from "@src/apis/products";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./__constants__/queryKeys";
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from "@src/apis/__constants__/productQueryParams";
import { Category, PriceSort } from "@src/types/products";
import { useState } from "react";

interface UseInfiniteProductsReturn {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
  fetchNextPage: () => void;
  updateCategoryFilter: (category: Category) => void;
  updatePriceSort: (sort: PriceSort) => void;
}

export const useInfiniteProducts = (): UseInfiniteProductsReturn => {
  const [categoryFilter, setCategoryFilter] = useState<Category>(CATEGORY_OPTIONS.all);
  const [priceSort, setPriceSort] = useState<PriceSort>(PRICE_SORT_OPTIONS.asc);

  const { data, isFetching, error, fetchNextPage } = useInfiniteQuery<
    ProductsWithNextPage,
    Error,
    InfiniteData<ProductsWithNextPage, ProductQueryParams>,
    [string, ProductQueryParams],
    number
  >({
    queryKey: [QUERY_KEYS.products, { category: categoryFilter, sort: priceSort }],
    queryFn: getProductsQuery,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
    refetchOnWindowFocus: false,
  });

  const updateCategoryFilter = (category: Category) => {
    setCategoryFilter(category);
  };

  const updatePriceSort = (sort: PriceSort) => {
    setPriceSort(sort);
  };

  return {
    data: flattenInfiniteData(data),
    isLoading: isFetching,
    error,
    fetchNextPage,
    updateCategoryFilter,
    updatePriceSort,
  };
};

const flattenInfiniteData = (
  data: InfiniteData<ProductsWithNextPage, ProductQueryParams> | undefined
) => {
  return data?.pages?.flatMap(({ data }) => data) ?? [];
};
