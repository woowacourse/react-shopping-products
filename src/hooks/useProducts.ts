import { useState } from "react";
import { getProducts } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";
import useInfiniteScroll from "./useInfiniteScroll";
import { QUERY_KEYS } from "../constants/queryKeys";

export default function useProducts() {
  const { category, sort, handleCategory, handleSort } = useProductSelect();

  const { data, isFetching, hasNextPage, fetchNextPage } =
    useProductsInfiniteQuery(category, sort);

  const { lastElementRef: lastProductElementRef } = useInfiniteScroll({
    hasMore: hasNextPage,
    loading: isFetching,
    nextPage: fetchNextPage,
  });

  return {
    data,
    isFetching,
    lastProductElementRef,
    handleCategory,
    handleSort,
  };
}

const useProductSelect = () => {
  const [category, setCategory] = useState<Category | "all">("all");
  const [sort, setSort] = useState<Sort>("asc");

  const handleCategory = (category: Category | "all") => {
    setCategory(category);
  };

  const handleSort = (sort: Sort) => {
    setSort(sort);
  };

  return { category, sort, handleCategory, handleSort };
};

const useProductsInfiniteQuery = (category: Category | "all", sort: Sort) => {
  const { isFetching, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.getProducts, category, sort],
    queryFn: ({ pageParam }) =>
      getProducts({
        category: category === "all" ? undefined : category,
        sort,
        page: pageParam,
        size: pageParam === 0 ? 20 : 4,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.first) return 5;
      return lastPage.pageable.pageNumber + 1;
    },
  });

  return {
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
  };
};
