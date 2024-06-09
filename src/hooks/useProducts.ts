import { useState } from "react";
import { getProducts } from "../api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../constants/queryKeys";

export default function useProducts() {
  const { category, sort, handleCategory, handleSort } = useProductSelect();

  const {
    data,
    status,
    isFetching,
    isPending,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProductsInfiniteQuery(category, sort);

  return {
    data,
    isFetching,
    isFetchingNextPage,
    isPending,
    status,
    hasNextPage,
    fetchNextPage,
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
  return useInfiniteQuery({
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
};
