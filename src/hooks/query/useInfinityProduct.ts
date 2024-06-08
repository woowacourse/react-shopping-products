import { Category, SortType } from '@pages/ProductPage/Product.types';

import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import { fetchPaginatedProducts } from '@apis/ProductFetchers';
import { useInfiniteQuery } from '@tanstack/react-query';

interface usePaginatedProductsProps {
  category: Category;
  sortType: SortType;
}
export default function useInfinityProducts({
  category,
  sortType,
}: usePaginatedProductsProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.products, category, sortType],
    queryFn: async ({ pageParam }) => {
      return fetchPaginatedProducts(pageParam).catch(error => {
        if (!(error instanceof HTTPError))
          throw new Error(ERROR_MESSAGE.clientNetwork);
        if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
      });
    },

    initialPageParam: { page: 0, size: 20, category, sortType },
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 0)
        return { page: 0, size: 20, category, sortType };
      if (lastPage?.last) return;
      return { page: allPages.length + 4, size: 4, category, sortType };
    },
    staleTime: 5 * 60 * 1000,
  });
}
