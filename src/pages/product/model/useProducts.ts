import { useState, useEffect } from 'react';

import { DEFAULT_CATEGORY, DEFAULT_SORT_ORDER, ALL, Category, Product, SortOrder } from '@/shared';

import useFetchProducts from './useFetchProducts';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: unknown;
  category: typeof ALL | Category;
  sortOrder: SortOrder;
  fetchNextPage: () => void;
  handleChangeCategory: (value: typeof ALL | Category) => void;
  handleChangeSortOrder: (value: SortOrder) => void;
}

export const useProducts = (): UseProductsResult => {
  const {
    products,
    isLoading: loading,
    error,
    totalPage,
    page,
    category,
    sortOrder,
    fetchProductsData,
  } = useFetchProducts();

  useEffect(() => {
    fetchProductsData(0, DEFAULT_CATEGORY, DEFAULT_SORT_ORDER);
  }, []);

  const fetchNextPage = () => {
    if (page < totalPage) fetchProductsData(page + 1, category, sortOrder);
  };

  const handleChangeCategory = (value: typeof ALL | Category) => {
    fetchProductsData(0, value, sortOrder);
  };

  const handleChangeSortOrder = (value: SortOrder) => {
    fetchProductsData(0, category, value);
  };

  return {
    products,
    loading,
    error,
    category,
    sortOrder,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOrder,
  };
};
