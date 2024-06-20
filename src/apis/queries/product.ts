import { SortValue } from '@/constants/filter';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { Category } from '@/types/filter.type';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { requestProductList } from '../request/product';
import { TIME } from '@/constants/time';

export const PAGE = {
  START: 0,
  START_SIZE: 20,
  SIZE: 4,
};

export const useInfiniteProductList = (category: Category, sortType: SortValue) => {
  return useSuspenseInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCT, category, sortType],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      requestProductList({
        page: pageParam,
        size: pageParam === 0 ? PAGE.START_SIZE : PAGE.SIZE,
        category,
        sortType,
      }),
    select: (data) => (data.pages ?? []).flatMap(({ content }) => content),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.nextCursor : null),
    staleTime: TIME.HOUR,
    networkMode: 'always',
  });
};
