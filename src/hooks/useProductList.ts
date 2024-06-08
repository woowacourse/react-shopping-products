import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { SortType, Category } from '@/types';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import { queryClient } from '../App';
import ERROR_MESSAGE from '@/constants/errorMessage';
import toast from '@/services/toast';
import { getProductList } from '@/api/productAPI';
import { PRODUCT_KEYS } from '../queries/keys';

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

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: PRODUCT_KEYS.ALL(category, sortType),
      queryFn: ({ pageParam }) => getProductList({ page: pageParam, sortType, category }),
      getNextPageParam: (lastPage) => {
        return lastPage.last ? null : lastPage.number + 1;
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
    queryClient.invalidateQueries({ queryKey: PRODUCT_KEYS.ALL(category, sortType) });
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
    isFetchingNextPage,
  };
};
export default useProductList;
