import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { Product } from "../../types";
import { CategoryQueryString, SortOptionQueryString, QUERY_KEYS } from "../../constants";
import { fetchProducts } from "./quaries";

interface UseProductResult {
  products: Product[];
  error: unknown;
  isLoading: boolean;
  handleChangeCategory: (selectedCategory: CategoryQueryString) => void;
  handleChangeSortOption: (selectedSortOption: SortOptionQueryString) => void;
  fetchNextPage: () => void;
}

interface ProductsQueryProps {
  category: CategoryQueryString;
  sortOption: SortOptionQueryString;
}

export default function useProducts(): UseProductResult {
  const [category, setCategory] = useState<CategoryQueryString>("all");
  const [sortOption, setSortOption] = useState<SortOptionQueryString>("asc");

  const { data, isFetching, isFetchingNextPage, fetchNextPage, error } = useInfiniteQuery({
    queryKey: getProductsQueryKey({ category, sortOption }),
    queryFn: getProductsQueryFn({ category, sortOption }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageNumber,
  });

  const handleChangeCategory = (value: CategoryQueryString) => {
    if (category === value) return;
    setCategory(value);
  };

  const handleChangeSortOption = (selectedSortOption: SortOptionQueryString) => {
    if (sortOption === selectedSortOption) return;
    setSortOption(selectedSortOption);
  };

  return {
    products: data?.pages.flatMap((page) => page.content) ?? [],
    error,
    isLoading: isFetching || isFetchingNextPage,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOption,
  };
}

function getProductsQueryKey({ category, sortOption }: ProductsQueryProps) {
  return [QUERY_KEYS.PRODUCTS, { category, sort: `price,${sortOption}` }];
}

function getProductsQueryFn({ category, sortOption }: ProductsQueryProps) {
  return ({ pageParam }: { pageParam: number }) =>
    fetchProducts({ page: pageParam, category, sortOption });
}
