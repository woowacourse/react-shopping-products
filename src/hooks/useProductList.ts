import { useInfiniteQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SortType, Category } from '@/types';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import { queryClient } from '../App';
import ERROR_MESSAGE from '@/constants/errorMessage';
import toast from '@/services/toast';
import { getProductList } from '@/api';

const DEFAULT_TOAST_DURATION = 1000;

const isValidCategory = (value: any): value is Category => {
  return CATEGORY_OPTION_LIST.some((categoryItem) => categoryItem.value === value);
};

const isValidSortType = (value: any): value is SortType => {
  return FILTER_OPTION_LIST.some((filterOption) => filterOption.value === value);
};

const useProductList = () => {
  const [sortType, setSortType] = useState<SortType>('asc');
  const [category, setCategory] = useState<Category>('all');

  const { data, fetchNextPage, hasNextPage, isLoading, isError, error, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['products', category, sortType],
      queryFn: ({ pageParam }) => getProductList({ page: pageParam, sortType, category }),
      getNextPageParam: (lastPage) => {
        return lastPage.last ? 0 : lastPage.number + 1;
      },
      initialPageParam: 0,
    });

  const productList = data?.pages.flatMap((page) => page.content) ?? [];

  const handleNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const reMountPage = () => {
    queryClient.invalidateQueries({ queryKey: ['products'] });
  };

  const handleCategory = (value: string) => {
    if (!isValidCategory(value)) {
      toast.error(ERROR_MESSAGE.WRONG_CATEGORY, DEFAULT_TOAST_DURATION);
      return;
    }
    setCategory(value);
    reMountPage();
  };

  const handleSortType = (value: string) => {
    if (!isValidSortType(value)) {
      toast.error(ERROR_MESSAGE.WRONG_SORT_TYPE, DEFAULT_TOAST_DURATION);
      return;
    }
    setSortType(value);
    reMountPage();
  };

  return {
    productList,
    handleNextPage,
    isLoading,
    handleCategory,
    handleSortType,
    hasNextPage,
    error,
    isError,
    isFetchingNextPage,
  };
};
export default useProductList;
