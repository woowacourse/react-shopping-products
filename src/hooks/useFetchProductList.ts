import { useInfiniteQuery } from '@tanstack/react-query';

import { Category, Sort } from '../types/type';
import { QUERY_KEYS } from '../apis/config';
import { fetchProductList } from '../apis/products';

interface UseFetchProductListProps {
  category?: Category;
  sort?: Sort;
}

export default function useFetchProductList({
  category,
  sort,
}: UseFetchProductListProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sort],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductList({
        page: pageParam,
        limit: pageParam === 0 ? 20 : 4,
        category,
        sort,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 4;
      return lastPage.content.length ? nextPage : undefined;
    },
  });
}
