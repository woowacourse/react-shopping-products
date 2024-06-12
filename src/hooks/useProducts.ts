import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProducts } from "../api/products";
import { sortOptionsMap } from "../components/ProductHeader/ProductHeader";
import { PAGE, QUERY_KEYS } from "../constants";

export default function useProducts(): UseProductsResult {
  const [sortOption, setSortOption] = useState<SortOrder>("price,asc");
  const [category, setCategory] = useState<string>("전체");

  const fetchProducts = async ({ pageParam = PAGE.FIRST_PAGE }) => {
    const size = pageParam === PAGE.FIRST_PAGE ? PAGE.FIRST_PAGE_LIMIT : PAGE.OTHER_PAGE_LIMIT;
    const data = await getProducts({
      page: pageParam,
      size,
      sort: [sortOption],
      category,
    });
    return data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, refetch } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, sortOption, category],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE.OTHER_PAGE_LIMIT ? null : allPages.length,
    initialPageParam: PAGE.FIRST_PAGE,
  });

  const products = data?.pages.flatMap((page) => page) || [];

  const resetPage = () => {
    refetch();
  };

  return {
    products,
    isLoading: isFetching,
    error: error as Error,
    page: data?.pages.length || 0,
    isLastPage: !hasNextPage,
    fetchNextPage,
    setSortOption,
    setCategory,
    resetPage,
    selectedCategory: category,
    selectedSort: sortOptionsMap[sortOption],
  };
}
