import { useEffect } from "react";
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import useToasts from "../useToasts";

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
  isError: boolean;
}

export default function useFetchProducts({
  category,
  sort,
}: ProductOption): UseFetchProductsResult {
  const { addToast } = useToasts();

  const { data, isFetchingNextPage, isError, error, fetchNextPage } = useSuspenseInfiniteQuery({
    networkMode: "always", // TODO : 왜 networkMode를 always로 설정했는지, 브콜에게 설명
    queryKey: [QUERY_KEYS.products, { category, sort }], // TODO : 1queryKey, 1 fetching result
    queryFn: ({ pageParam }) => getProducts({ page: pageParam, category, sort }),
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (!data || data.isLastPage) return null;
      if (data.currentPage === 0) return 5; // TODO : 왜 page === 0 인 경우, 5를 반환해야 하는지 브콜에게 설명하기
      return data.currentPage + 1;
    },
  });

  useEffect(() => {
    if (error && error instanceof Error) {
      addToast(error.message);
    }
  }, [error, addToast]);

  return {
    products: data?.pages.map((page) => page.products).flat() ?? [],
    fetchNextPage,
    isLoading: isFetchingNextPage,
    isError,
  };
}
