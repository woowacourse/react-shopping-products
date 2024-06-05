import { Category, SortType } from '@pages/ProductPage/Product.types';

import ERROR_MESSAGE from '@constants/errorMessage';
import HTTPError from '@errors/HTTPError';
import QUERY_KEYS from '@hooks/queryKeys';
import { fetchPaginatedProducts } from '@apis/ProductFetchers';
import { useInfiniteQuery } from 'react-query';

interface usePaginatedProductsProps {
  category: Category;
  sortType: SortType;
  errorHandler: (err: unknown) => void;
}
export default function useInfinityProducts({
  category,
  sortType,
  errorHandler,
}: usePaginatedProductsProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.products, category, sortType],
    queryFn: async ({
      pageParam = { page: 0, size: 20, category, sortType },
    }) => {
      return fetchPaginatedProducts(pageParam).catch(error => {
        if (!(error instanceof HTTPError))
          throw new Error(ERROR_MESSAGE.clientNetwork);
        if (500 <= error.statusCode) throw new Error(ERROR_MESSAGE.server);
      });
    },

    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 0)
        return { page: 0, size: 20, category, sortType };
      // @ts-expect-error: lastPage is not void
      if (lastPage.last) return;
      return { page: allPages.length + 4, size: 4, category, sortType };
    },
    staleTime: 5 * 60 * 1000,
    onError: errorHandler,
  });
}
