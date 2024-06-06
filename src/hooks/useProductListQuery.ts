import { useInfiniteQuery } from '@tanstack/react-query';

import useNetworkStatus from './useNetworkStatus';

import { fetchProductList } from '@/api/product';
import { PAGE_SIZE } from '@/constants/config';
import { ProductCategory, SortValue } from '@/types/product';

interface FetchProductListProps {
  category?: ProductCategory;
  sortOptions?: SortValue;
}

const useProductListQuery = ({ category, sortOptions }: FetchProductListProps) => {
  useNetworkStatus();

  return useInfiniteQuery({
    queryKey: ['projects', category, sortOptions],
    queryFn: ({ pageParam }) => {
      const size = pageParam === 0 ? PAGE_SIZE.firstItemSize : PAGE_SIZE.nextItemSize;

      return fetchProductList({ category, size, page: pageParam, sortOptions });
    },
    staleTime: 20 * 1000,
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.last) {
        return null;
      }
      // 서버 로직으로 인해 4개씩 불러올 시 초기 20개 이후 인덱스부터 시작해야함.
      // 0부터 4까지 4*5=20개 이으로 다음 페이지를 5로 설정.
      if (lastPageParam === 0) {
        return PAGE_SIZE.firstPageUnit;
      }

      return lastPageParam + PAGE_SIZE.nextPageUnit;
    },
  });
};

export default useProductListQuery;
