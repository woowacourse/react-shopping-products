import { useState } from 'react';
import { fetchProducts } from '../api';
import { QUERY_KEYS } from '../constant/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useProductFetch() {
  const [selectBarCondition, setSelectBarCondition] = useState({
    category: 'all',
    sort: 'price,asc',
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, { selectBarCondition }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      const size = pageParam === 0 ? 20 : 4;
      return fetchProducts({
        page: pageParam,
        size,
        ...selectBarCondition,
      });
    },
    getNextPageParam: (data) => {
      if (!data || data.last) return null;
      if (data.number === 0) return 5;
      return data.number + 1;
    },
  });

  const handleSelectBarCondition = (filter: string, condition: string) => {
    const newCondition = {
      ...selectBarCondition,
      [filter]:
        filter === 'sort' && condition === 'priceDesc'
          ? 'price,desc'
          : filter === 'sort' && condition === 'priceAsc'
          ? 'price,asc'
          : condition,
    };

    setSelectBarCondition(newCondition);
  };

  return {
    products: data?.pages.flatMap((page) => page.content) ?? [],
    fetchNextPage,
    isLoading: isFetchingNextPage,
    handleSelectBarCondition,
    selectBarCondition,
  };
}
