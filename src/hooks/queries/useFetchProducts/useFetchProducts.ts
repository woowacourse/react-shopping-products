import { useEffect, useContext } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../../api/product';
import { ToastContext } from '../../../context/ToastProvider';
import { Option } from '../../../types/Option.type';
import { SIZE } from '../../../constants/api';

const useFetchProducts = (category: Option, sort: Option) => {
  const { showToast } = useContext(ToastContext);

  const { data, isFetching, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', category, sort],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts(category.key, pageParam, SIZE.ADDITIONAL, sort.key),
    getNextPageParam: (lastPage, allPages) => (lastPage.isLast ? undefined : allPages.length),
  });

  useEffect(() => {
    if (error) showToast(error.message);
  }, [error, showToast]);

  return {
    products: data?.pages.flatMap((page) => page.data) ?? [],
    isFetching,
    error,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export default useFetchProducts;
