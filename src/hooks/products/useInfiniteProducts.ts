import { getProductList } from '@/api/product';
import {
  INITIAL_DATA_LOAD_COUNT,
  INITIAL_PAGE,
  SUBSEQUENT_DATA_LOAD_COUNT,
} from '@/constants/pagination';
import { QUERY_KEYS } from '@/constants/index';
import { SortType, CategoryType } from '@/types/index';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function useInfiniteProducts() {
  const [category, setCategory] = useState<CategoryType>('');
  const [sort, setSort] = useState<SortType>('');

  const changeCategory = (selectedCategory: CategoryType) => {
    setCategory(selectedCategory);
  };

  const changeSorting = (selectedSort: SortType) => {
    setSort(selectedSort);
  };

  const {
    data,
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sort],
    queryFn: ({ pageParam = INITIAL_PAGE }) => {
      const page = pageParam;
      const size =
        pageParam === INITIAL_PAGE
          ? INITIAL_DATA_LOAD_COUNT
          : SUBSEQUENT_DATA_LOAD_COUNT;
      return getProductList({ page, size, category, order: sort });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = lastPage.content.length
        ? allPages.length + SUBSEQUENT_DATA_LOAD_COUNT
        : undefined;

      return nextPage;
    },
  });

  return {
    products: data?.pages.flatMap((page) => page.content) || [],
    status,
    error,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    changeCategory,
    changeSorting,
  };
}
