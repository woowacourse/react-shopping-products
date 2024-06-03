import { useState, useEffect } from 'react';

import { Category, Product, SortOrder } from '@/entities/product';
import { ALL, DEFAULT_CATEGORY, DEFAULT_SORT_ORDER } from '@/features/product';

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
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState<typeof ALL | Category>(DEFAULT_CATEGORY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);
  const { products, isLoading: loading, error, totalPage, fetchProductsData } = useFetchProducts();

  useEffect(() => {
    fetchProductsData(page, category, sortOrder);
  }, [page, category, sortOrder]);

  const fetchNextPage = () => {
    if (page < totalPage) setPage((prevPage) => prevPage + 1);
  };

  const handleChangeCategory = (value: typeof ALL | Category) => {
    setCategory(value);
    setPage(0);
  };

  const handleChangeSortOrder = (value: SortOrder) => {
    setSortOrder(value);
    setPage(0);
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
