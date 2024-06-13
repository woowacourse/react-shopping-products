import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { getProducts } from "../../apis/products";

import { QUERY_KEYS } from "../../constants/queries";
import { ProductOption } from "../../constants/products";
import { Product, Products } from "../../types/products";

interface UseFetchProductsResult {
  products: Product[];
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined,
  ) => Promise<InfiniteQueryObserverResult<InfiniteData<Products, unknown>, Error>>;
  isLoading: boolean;
  error: unknown;
}

export default function useFetchProducts({
  category,
  sort,
}: ProductOption): UseFetchProductsResult {
  const { data, isFetchingNextPage, error, fetchNextPage } = useSuspenseInfiniteQuery({
    networkMode: "always",
    queryKey: [QUERY_KEYS.products, { category, sort }],
    queryFn: ({ pageParam }) => getProducts({ page: pageParam, category, sort }),
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (!data || data.isLastPage) return null;
      if (data.currentPage === 0) return 5;
      return data.currentPage + 1;
    },
  });

  return {
    products: data?.pages.map((page) => page.products).flat() ?? [],
    fetchNextPage,
    isLoading: isFetchingNextPage,
    error,
  };
}
