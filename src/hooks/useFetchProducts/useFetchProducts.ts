import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchProducts } from '../../api/products';
import { SortingParam } from '../../types/sort';
import { DEFAULT_SORTING_PARAM, SIZE } from '../../constants/page';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchProducts = (
  sortings: SortingParam[] = [DEFAULT_SORTING_PARAM],
  filter: string | '' = '',
) => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    isError,

    ...result
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.product, sortings, filter],
    queryFn: ({ pageParam = 0 }) =>
      fetchProducts(
        pageParam,
        pageParam === 0 ? SIZE.DEFAULT : SIZE.INTERVAL,
        sortings,
        filter,
      ),
    initialPageParam: 0,
    getNextPageParam: (data) => {
      if (data.last) return null;
      if (data.pageable.pageNumber === 0) return 5;
      return data.pageable.pageNumber + 1;
    },
    select: (data) => (data.pages ?? []).flatMap((page) => page.content),
  });
  return {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    products: data ?? [],
    isError,
    ...result,
  };
};

export default useFetchProducts;
