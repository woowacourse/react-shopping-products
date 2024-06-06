import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/index';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
} from '../constants';
import { useToast } from './useToast';
import { CategoryType, SortType } from '../type';
import { ProductItem } from '../type/ProductItem';
import { useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';

interface UseProductsResult {
  products: ProductItem[];
  isLoading: boolean;
  error: unknown;
  fetchNextPage: () => void;
  changeCategory: (dropboxOption: CategoryType) => void;
  changeSorting: (dropboxOption: SortType) => void;
}

export default function useProducts(): UseProductsResult {
  const [category, setCategory] = useState<CategoryType>('all');
  const [sorting, setSorting] = useState<SortType>('price_name_asc');
  const { createToast } = useToast();

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

  const { data, error, isLoading, fetchNextPage } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, category, sorting],
    queryFn: fetchProductsData,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (allPages.length === 1 && !lastPage.last) {
        return 5;
      }
      if (lastPage.last) {
        return undefined;
      }
      return allPages.length;
    },
    select: (data) => {
      return data.pages.flatMap((page) => page.data);
    },
  });

  useEffect(() => {
    if (error) {
      if (error instanceof Error) {
        createToast(
          '⛔️ 상품 목록을 가져오는데 실패했습니다. 다시 시도해 주세요.',
        );
      }
    }
  }, [error, createToast]);

  return {
    products: data || [],
    isLoading,
    error,
    fetchNextPage,
    changeCategory,
    changeSorting,
  };
}
