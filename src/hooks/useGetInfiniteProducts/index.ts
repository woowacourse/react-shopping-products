import { getProducts } from "../../api/products";
import { QUERY_KEY } from "../../constants/queryKeys";
import { SortOption } from "../../types/sortOption";
import { SORT_OPTIONS, CATEGORY_OPTIONS } from "../../constants/products";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

// NOTE: 첫 페이지(0)는 데이터 20개, 이후에는 4개씩 불러옴
const INITIAL_PAGE_SIZE = 20;
const PAGE_SIZE = 4;

// NOTE: 첫 번째 페이지부터 4번째 페이지까지 데이터가 겹치므로 첫 번째 페이지 fetch 이후 5번째 페이지로 이동
const PAGE_JUMP_COUNT_AT_SECOND_LOAD = 5;

const useGetInfiniteProducts = () => {
  const [categoryFilter, setCategoryFilter] = useState<string>(
    CATEGORY_OPTIONS.all
  );
  const [priceSort, setPriceSort] = useState<SortOption>(SORT_OPTIONS.asc);

  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEY.products, categoryFilter, priceSort],
    queryFn: ({ pageParam = 0 }) =>
      getProducts(
        pageParam,
        pageParam === 0 ? INITIAL_PAGE_SIZE : PAGE_SIZE,
        categoryFilter,
        priceSort
      ),
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (data.isLastPage) return null;

      // NOTE: 첫 번째 페이지인 경우 5로 이동
      return data.page === 0 ? PAGE_JUMP_COUNT_AT_SECOND_LOAD : data.page + 1;
    },
  });

  const products = data?.pages.flatMap((page) => page.data) || [];
  const errorMessage = error ? error.message : "";

  return {
    products,
    isLoading,
    errorMessage,
    fetchNextPage,
    setCategoryFilter,
    setPriceSort,
  };
};

export default useGetInfiniteProducts;
