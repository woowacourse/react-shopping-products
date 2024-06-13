import { useState } from 'react';
import { fetchProducts } from '../api';
import { QUERY_KEYS } from '../constant/queryKeys';
import { useInfiniteQuery } from '@tanstack/react-query';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';

type SortConditionKey = 'priceDesc' | 'priceAsc';

export function useProductFetch() {
  const [selectBarCondition, setSelectBarCondition] = useState({
    category: 'all',
    sort: 'price,asc',
  });
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, { selectBarCondition }],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => {
      const size = pageParam === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
      return fetchProducts({
        page: pageParam,
        size,
        ...selectBarCondition,
      });
    },
    getNextPageParam: (data) => {
      if (!data || data.last) return null;
      if (data.number === 0) return AFTER_FETCH_SIZE + 1;
      return data.number + 1;
    },
  });

  const handleSelectBarCondition = (filter: string, condition: string) => {
    const sortConditions = {
      priceDesc: 'price,desc',
      priceAsc: 'price,asc',
    };

    const newCondition = {
      ...selectBarCondition,
      [filter]:
        filter === 'sort' ? sortConditions[condition as SortConditionKey] || condition : condition,
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
