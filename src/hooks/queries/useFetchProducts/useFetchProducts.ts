import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../../api/product';
import { Option } from '../../../types/Option.type';
import { SIZE } from '../../../constants/api';

const useFetchProducts = (category: Option, sort: Option) => {
  const { data, isError, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', category, sort],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts(category.key, pageParam, SIZE.ADDITIONAL, sort.key),
    getNextPageParam: (lastPage, allPages) => (lastPage.isLast ? undefined : allPages.length),
  });

  return {
    products: data?.pages.flatMap((page) => page.data) ?? [],
    isFetching,
    isError,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export default useFetchProducts;
