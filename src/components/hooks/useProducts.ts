import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../api/products';
import {
  INITIAL_PAGING_SIZE,
  PAGING_SIZE,
  START_PAGE_NUMBER,
} from '../../constants/api';

export type SortType = 'desc' | 'asc';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

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

// TODO: 리팩토링!! 책임 분리!!
export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortType>('asc');
  const [category, setCategory] = useState<string>('');
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const getProducts = useCallback(
    async (reset = false) => {
      try {
        setLoading(true);

        const { last, content } = await fetchProducts({
          page: reset ? START_PAGE_NUMBER : page,
          size: page === START_PAGE_NUMBER ? INITIAL_PAGING_SIZE : PAGING_SIZE,
          sort,
          category,
        });

        if (reset) {
          setProducts(content);
        } else {
          setProducts((prevProducts) => [...prevProducts, ...content]);
        }

        setIsLastPage(last);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [page, sort, category]
  );

  useEffect(() => {
    if (!isLastPage) {
      getProducts();
    }
  }, [page]);

  useEffect(() => {
    setPage(START_PAGE_NUMBER);
    setIsLastPage(false);
    getProducts(true);
  }, [category, sort]);

  const fetchNextPage = () => {
    if (!isLastPage) {
      if (page === START_PAGE_NUMBER)
        setPage(page + INITIAL_PAGING_SIZE / PAGING_SIZE);
      else setPage(page + 1);
    }
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
