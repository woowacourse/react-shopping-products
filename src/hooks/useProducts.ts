import { useState } from 'react';
import { SortOrder, SortType } from '../api/types';
import { Category, Product } from '../types';
import { productQueries } from './queries/product';

export interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  isLastPage: boolean;
  fetchNextPage: () => void;
  setSort: (value: string) => void;
  setCategory: (value: string) => void;
}

export default function useProducts(): UseProductsResult {
  const [sort, setSort] = useState<SortType>({ price: 'asc', id: 'asc' });
  const [category, setCategory] = useState<Category | ''>('');

  const {
    data: { pages: products },
    error,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = productQueries.useGetProducts({
    category,
    sort: Object.entries(sort).map(([field, order]) => `${field},${order}`),
  });

  return {
    products,
    error,
    isLoading: isFetching,
    isLastPage: !hasNextPage,
    fetchNextPage: () => {
      if (hasNextPage) fetchNextPage();
    },
    setCategory: (value: string) => {
      setCategory(value as Category);
    },
    setSort: (value: string) => {
      setSort((prev) => ({ ...prev, price: value as SortOrder }));
    },
  };
}
