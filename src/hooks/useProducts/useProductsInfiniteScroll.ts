import { useInfiniteQuery } from '@tanstack/react-query';
import { Category, Sort } from '../../types/product';
import { queryKeys } from '../../constants/queryKeys';
import { fetchProducts } from '../../api/products';

import * as PRODUCTS from '../../constants/pagination';

const useProductsInfiniteScroll = (category: Category, sort: Sort) => {
  return useInfiniteQuery({
    queryKey: queryKeys.products(category, sort),
    queryFn: ({ pageParam }: { pageParam: number }) => fetchProducts(pageParam, category, sort),
    initialPageParam: PRODUCTS.FIRST_PAGE,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      const nextPage =
        lastPageParam === PRODUCTS.FIRST_PAGE
          ? lastPageParam + PRODUCTS.GAP_WITH_FIRST_PAGE
          : lastPageParam + 1;

      return lastPage.last ? undefined : nextPage;
    },
    select: (data) => ({
      pages: data.pages.flatMap((page) => page.content),
      pageParams: data.pageParams,
    }),
  });
};

export default useProductsInfiniteScroll;
