import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../api';
import { formattedKey } from './useProducts.util';
import { QUERY_KEY } from '../constant/queryKey';

interface Props {
  selectBarCondition: Record<string, string>;
}

const useProductQuery = ({ selectBarCondition }: Props) => {
  const params = {
    category: selectBarCondition.category,
    sort: formattedKey(selectBarCondition.sort),
  };
  const { data, isError, isSuccess, fetchNextPage, isFetching } = useInfiniteQuery({
    queryKey: [QUERY_KEY.PRODUCT_ITEMS, params],
    queryFn: ({ pageParam }) => {
      const size = pageParam === 0 ? 20 : 4;
      return fetchProducts({ ...params, size, page: pageParam });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return null;
      if (lastPage.number === 0) return 5;
      return lastPage.number + 1;
    },
  });
  return {
    products: data?.pages.map((page) => page.content).flat(),
    isError,
    isSuccess,
    fetchNextPage,
    isFetching,
  };
};

export default useProductQuery;
