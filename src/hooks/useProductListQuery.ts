import { FETCH_SIZE } from '@/constants/productList';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getProductList } from '@/api/product';
import { useState } from 'react';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

const useProductListQuery = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<string>('asc');
  const [category, setCategory] = useState('');

  const { data, isSuccess, isLoading, error, fetchNextPage, hasNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        { size: FETCH_SIZE.firstPageItemCount, category, order },
      ],
      queryFn: ({ pageParam }) => {
        const size =
          pageParam === 0
            ? FETCH_SIZE.firstPageItemCount
            : FETCH_SIZE.moreLoadItemCount;
        return getProductList({ page: pageParam, size, category, order });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.last) return undefined;

        if (allPages.length === 1)
          return FETCH_SIZE.firstPageItemCount / FETCH_SIZE.moreLoadItemCount;

        return allPages.length + 1;
      },
    });

  const handleChangeOrder = (newOrder: string) => {
    if (order === newOrder) return;
    setOrder(newOrder);
    setPage(0);
  };

  const handleChangeCategory = (newCategory: string) => {
    if (category === newCategory) return;
    setCategory(newCategory);
    setPage(0);
  };

  return {
    page,
    products: data?.pages,
    isSuccess,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
    handleChangeCategory,
  };
};

export default useProductListQuery;
