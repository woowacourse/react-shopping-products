import { useCallback, useEffect, useState } from 'react';

import { CategoryQueryString, SortOptionQueryString } from '../constants/products';

import useFetch from './useFetch';
import { Product } from '../types/products';
import usePagination from './usePagination';
import createUrl from '../utils/createUrl';

interface UseProductResult {
  products: Product[];
  error: unknown;
  isLoading: boolean;
  page: number;
  handleChangeCategory: (selectedCategory: CategoryQueryString) => void;
  handleChangeSortOption: (selectedSortOption: SortOptionQueryString) => void;
  fetchNextPage: () => void;
}

interface ProductRequestResult {
  content: Product[];
  last: boolean;
}

export default function useProducts(): UseProductResult {
  const { page, setNextPage, resetPage, isLastPage, handleLastPage } = usePagination();

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<CategoryQueryString>('all');
  const [sortOption, setSortOption] = useState<SortOptionQueryString>('asc');

  const url = createUrl({ page, category, sortOption });
  const { data, error, isLoading } = useFetch<ProductRequestResult>({ url, method: 'GET' });

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.content]);
      handleLastPage(data.last);
    }
  }, [data, handleLastPage]);

  const fetchNextPage = useCallback(() => {
    if (isLastPage) return;

    setNextPage();
  }, [isLastPage, setNextPage]);
  const handleChangeCategory = (value: CategoryQueryString) => {
    if (category === value) return;

    setProducts([]);
    resetPage();
    setCategory(value);
  };

  const handleChangeSortOption = (selectedSortOption: SortOptionQueryString) => {
    if (sortOption === selectedSortOption) return;

    setProducts([]);
    resetPage();
    setSortOption(selectedSortOption);
  };

  return {
    products,
    error,
    isLoading,
    page,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOption,
  };
}
