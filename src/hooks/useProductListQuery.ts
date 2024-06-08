import { FETCH_SIZE } from '@/constants/productList';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { getProductList } from '@/api/product';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

const useProductListQuery = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<string>('asc');
  const [category, setCategory] = useState('');

  const { data, isSuccess, isFetching, error, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: [
        QUERY_KEYS.PRODUCTS,
        { size: FETCH_SIZE.firstPageItemCount, category, order },
      ],
      queryFn: ({ pageParam }) => {
        const size =
          pageParam === 0
            ? FETCH_SIZE.firstPageItemCount
            : FETCH_SIZE.moreLoadItemCount;
        setPage(pageParam);

        return getProductList({ page: pageParam, size, category, order });
      },
      initialPageParam: 0,
      getNextPageParam: (lastPageData) => {
        if (lastPageData.last) return undefined;

        const page = lastPageData.pageable.pageNumber;

        if (page === 0)
          return FETCH_SIZE.firstPageItemCount / FETCH_SIZE.moreLoadItemCount;

        return page + 1;
      },
    });

  const handleChangeOrder = (newOrder: string) => {
    if (order === newOrder) return;
    setOrder(newOrder);
  };

  const handleChangeCategory = (newCategory: string) => {
    if (category === newCategory) return;
    setCategory(newCategory);
  };

  return {
    products: data?.pages.flatMap((page) => page.content) || [],
    page,
    isSuccess,
    isFetching,
    error,
    fetchNextPage,
    hasNextPage,
    handleChangeOrder,
    handleChangeCategory,
  };
};

export default useProductListQuery;
