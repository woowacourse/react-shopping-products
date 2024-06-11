import { useState } from 'react';
import { fetchProducts } from '../api/index';
import {
  INITIAL_DATA_LOAD_COUNT,
  JUMP_NEXT_PAGE_IN_ZERO,
  SUBSEQUENT_DATA_LOAD_COUNT,
} from '../constants';
import { CategoryType, SortType } from '../type';
import { ProductItem } from '../type/ProductItem';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';

interface UseProductsResult {
  products: ProductItem[];
  isLoading: boolean;
  error: unknown;
  isFetching: boolean;
  fetchNextPage: () => void;
  changeCategory: (dropboxOption: CategoryType) => void;
  changeSorting: (dropboxOption: SortType) => void;
}

export default function useProducts(): UseProductsResult {
  const [category, setCategory] = useState<CategoryType>('all');
  const [sorting, setSorting] = useState<SortType>('price_name_asc');
  const changeCategory = (category: CategoryType) => {
    setCategory(category);
  };

  const changeSorting = (sort: SortType) => {
    setSorting(sort);
  };
  const fetchProductsData = async ({
    pageParam = 0,
  }: {
    pageParam?: number;
  }) => {
    const limit =
      pageParam === 0 ? INITIAL_DATA_LOAD_COUNT : SUBSEQUENT_DATA_LOAD_COUNT;
    const data = await fetchProducts(pageParam, limit, category, sorting);
    return data;
  };

  const { data, error, isLoading, isFetching, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [QUERY_KEYS.PRODUCTS, category, sorting],
      queryFn: fetchProductsData,
      initialPageParam: 0,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage, allPages) => {
        if (allPages.length === 1 && !lastPage.last) {
          return JUMP_NEXT_PAGE_IN_ZERO;
        }
        if (lastPage.last) {
          return undefined;
        }
        return allPages.length + 4;
      },
      select: (data) => {
        return data.pages.flatMap((page) => page.data);
      },
    });

  return {
    products: data || [],
    isLoading,
    error,
    isFetching,
    fetchNextPage,
    changeCategory,
    changeSorting,
  };
}
