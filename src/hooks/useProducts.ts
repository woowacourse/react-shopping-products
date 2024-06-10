import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { QUERY_KEYS } from "../constants/queryKeys";
import usePagination from "./usePagination";

interface UseProductsResult {
  products: Product[];
  isLastPage: boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  fetchNextPage: () => void;
  categoryState: {
    currentCategory: string;
    changeCategory: (value: string) => void;
  };
  sortOptionState: {
    currentSortOption: string;
    changeSortOption: (value: string) => void;
  };
  isSuccess: boolean;
}

const sortOptionsMap: Record<string, string> = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

const useProducts = (): UseProductsResult => {
  const [sortOption, setSortOption] = useState<string>("price,asc");
  const [category, setCategory] = useState<string>("전체");
  const { isLastPage } = usePagination();

  const { data, isFetching, fetchNextPage, isLoading, isError, error, isSuccess } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.PRODUCTS, { category, sort: `price,${sortOption}` }],
      queryFn: ({ pageParam = 0 }) => fetchProducts({ page: pageParam, category, sortOption }),
      initialPageParam: 0,
      // getNextPageParam: (lastPage) => (lastPage.isLast ? null : lastPage.page + 1),
      getNextPageParam: (data) => {
        if (data.isLast) return null;
        if (data.page === 0) return 5;
        return data.page + 1;
      },
    });

  const products = data ? data.pages.flatMap((page) => page.content) : [];

  const changeCategory = (value: string) => {
    // resetPage();
    setCategory(value);
  };

  const changeSortOption = (value: string) => {
    // resetPage();
    setSortOption(sortOptionsMap[value]);
  };

  return {
    products,
    isLastPage,
    isLoading: isLoading || isFetching,
    isError,
    error,
    isSuccess,
    fetchNextPage,
    categoryState: { currentCategory: category, changeCategory },
    sortOptionState: { currentSortOption: sortOption, changeSortOption },
  };
};

export default useProducts;
