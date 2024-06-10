import { useInfiniteQuery } from '@tanstack/react-query';

import { Category, Sort } from '../types/type';
import { QUERY_KEYS } from '../apis/config';
import { fetchProductList } from '../apis/products';
import { PRODUCT_LIST } from '../constants/productList';

interface UseFetchProductListProps {
  category?: Category;
  sort?: Sort;
}

export default function useProductList({
  category,
  sort,
}: UseFetchProductListProps) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sort],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductList({
        page: pageParam,
        limit:
          pageParam === 0
            ? PRODUCT_LIST.initialQuantity
            : PRODUCT_LIST.quantityPerPage,
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
