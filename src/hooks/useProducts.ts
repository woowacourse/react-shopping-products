import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products";
import { QUERY_KEYS } from "../constants/queryKeys";
import usePagination from "./usePagination";
import useCategoryState from "./useCategoryState";
import useSortOptionState from "./useSortOptionState";

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

const useProducts = (): UseProductsResult => {
  const { isLastPage } = usePagination();
  const { currentCategory, changeCategory } = useCategoryState();
  const { currentSortOption, changeSortOption } = useSortOptionState();

  const { data, isFetching, fetchNextPage, isLoading, isError, error, isSuccess } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.PRODUCTS, { currentCategory, sort: `price,${currentSortOption}` }],
      queryFn: ({ pageParam = 0 }) =>
        fetchProducts({
          page: pageParam,
          category: currentCategory,
          sortOption: currentSortOption,
        }),
      initialPageParam: 0,
      // getNextPageParam: (lastPage) => (lastPage.isLast ? null : lastPage.page + 1),
      getNextPageParam: (data) => {
        if (data.isLast) return null;
        if (data.page === 0) return 5;
        return data.page + 1;
      },
    });

  const products = data ? data.pages.flatMap((page) => page.content) : [];

  return {
    products,
    isLastPage,
    isLoading: isLoading || isFetching,
    isError,
    error,
    isSuccess,
    fetchNextPage,
    categoryState: { currentCategory, changeCategory },
    sortOptionState: { currentSortOption, changeSortOption },
  };
};

export default useProducts;
