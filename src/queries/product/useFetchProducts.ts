import { useInfiniteQuery } from '@tanstack/react-query';

import { getProductList } from '@/api/product';
import { FETCH_SIZE } from '@/constants/productList';

import QUERY_KEYS from '@/constants/queryKeys';
import { ProductFilterOptions } from '@/types/product.type';

const useFetchProducts = ({ sort, category }: ProductFilterOptions) => {
  const loadNextPage = (isFirstPage: boolean, page: number) => {
    if (isFirstPage) {
      return FETCH_SIZE.firstPageItemCount / FETCH_SIZE.moreLoadItemCount + 1;
    } else {
      return page + 1;
    }
  };

  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.getProducts, category, sort],
      queryFn: ({ pageParam }) =>
        getProductList({
          page: pageParam as number,
          size:
            pageParam === 0
              ? FETCH_SIZE.firstPageItemCount
              : FETCH_SIZE.moreLoadItemCount,
          category,
          sort,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPage) => {
        if (!lastPage.last) {
          return loadNextPage(lastPage.first, allPage.length);
        }
        return undefined;
      },
      retry: 1,
    });

  return {
    products: data?.pages.flatMap((page) => page.content) ?? [],
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
  };
};

export default useFetchProducts;
