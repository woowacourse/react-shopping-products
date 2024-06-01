import { useCallback, useEffect, useState } from 'react';
import { PRODUCTS_ENDPOINT } from '../../api/endpoints';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
} from '../../constants/paginationRules';
import { Product } from '../../types';
import useFetch from './useFetch';

export type SortType = 'desc' | 'asc';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  page: number;
  isLastPage: boolean;
  fetchNextPage: () => void;

  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSort: React.Dispatch<React.SetStateAction<SortType>>;
}

interface FetchProductsResponse {
  last: boolean;
  content: Product[];
}

export default function useProducts(): UseProductsResult {
  const { error, loading, fetchData } = useFetch<FetchProductsResponse>({
    url: PRODUCTS_ENDPOINT,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortType>('asc');
  const [category, setCategory] = useState('');

  const getProducts = useCallback(async () => {
    fetchData({
      page,
      category,
      sort: `price,${sort}`,
      size: page === INITIAL_PAGE_NUMBER ? INITIAL_PAGE_SIZE : PAGE_SIZE,
    }).then((response) => {
      if (!response) return;
      const { last, content } = response;

      setIsLastPage(last);
      setProducts((prevProducts) =>
        page === INITIAL_PAGE_NUMBER ? content : [...prevProducts, ...content]
      );
    });
  }, [page, sort, category, fetchData]);

  useEffect(() => {
    if (!isLastPage) {
      getProducts();
    }
  }, [page]);

  useEffect(() => {
    setIsLastPage(false);
    setPage(INITIAL_PAGE_NUMBER);
  }, [category, sort]);

  const fetchNextPage = () => {
    if (isLastPage) return;

    setPage((prevPage) =>
      prevPage !== INITIAL_PAGE_NUMBER
        ? prevPage + 1
        : prevPage + INITIAL_PAGE_SIZE / PAGE_SIZE
    );
  };

  return {
    products,
    loading,
    error,
    page,
    fetchNextPage,
    setCategory,
    setSort,
    isLastPage,
  };
}
