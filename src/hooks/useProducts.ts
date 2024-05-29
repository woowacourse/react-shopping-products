import { useEffect, useState } from 'react';

import { CategoryQueryString, PRODUCTS_SIZE, SortOptionQueryString } from '../constants/products';
import { PRODUCTS_ENDPOINT } from '../constants/apis';

import useFetch from './useFetch';
import { Product } from '../types/products';
import usePagination from './usePagination';

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

  const pageNumberForRequest = page === 0 ? page : page + PRODUCTS_SIZE.perRequest;
  const url = `${PRODUCTS_ENDPOINT}?page=${pageNumberForRequest}&size=${PRODUCTS_SIZE.perRequest}&category=${category}&sort=${sortOption}`;

  const { data, error, isLoading } = useFetch<ProductRequestResult>({ url, method: 'GET' });

  useEffect(() => {
    if (data) {
      setProducts((prevProducts) => [...prevProducts, ...data.content]);
      handleLastPage(data.last);
    }
  }, [data, handleLastPage]);

  const fetchNextPage = () => {
    if (isLastPage) return;
    setNextPage();
  };

  const handleChangeCategory = (selectedCategory: CategoryQueryString) => {
    if (category === selectedCategory) return;

    setProducts([]);
    resetPage();
    setCategory(selectedCategory);
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
