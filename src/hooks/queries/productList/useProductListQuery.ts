import {
  InfiniteData,
  QueryKey,
  UseInfiniteQueryOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';

import { PRODUCT_KEYS } from './queryKeys';
import useNetworkStatus from '../../useNetworkStatus';

import { fetchProductList } from '@/api/product';
import { PAGE_SIZE } from '@/constants/config';
import { ProductCategory, ProductResponse, SortValue } from '@/types/product';

type infinityQueryOptions = Omit<
  UseInfiniteQueryOptions<
    ProductResponse,
    Error,
    InfiniteData<ProductResponse, unknown>,
    ProductResponse,
    QueryKey,
    number
  >,
  'queryKey' | 'queryFn'
>;

interface FetchProductListProps {
  category?: ProductCategory;
  sortOptions?: SortValue;
  queryOptions?: infinityQueryOptions;
}

const useProductListQuery = ({ category, sortOptions, queryOptions }: FetchProductListProps) => {
  useNetworkStatus();

  return useInfiniteQuery({
    queryKey: PRODUCT_KEYS.filter([category, sortOptions]),
    queryFn: ({ pageParam }) => {
      const size = pageParam === 0 ? PAGE_SIZE.firstItemSize : PAGE_SIZE.nextItemSize;

      return fetchProductList({ category, size, page: pageParam, sortOptions });
    },
    staleTime: Infinity,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      // FIXME: 마지막 페이지 도착 후 다른 카테고리 이동 시 다음 페이지가 없는 것으로 인식하여 fetch X
      if (lastPage.last) {
        return null;
      }

      // 서버 로직으로 인해 4개씩 불러올 시 초기 20개 이후 인덱스부터 시작해야함.
      // 0부터 4까지 4*5=20개 이으로 다음 페이지를 5로 설정.
      return lastPageParam === 0 ? PAGE_SIZE.firstPageUnit : lastPageParam + PAGE_SIZE.nextPageUnit;
    },
    ...queryOptions,
  });
};

export default useProductListQuery;
