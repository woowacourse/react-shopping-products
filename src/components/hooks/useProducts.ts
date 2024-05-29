import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../../api/products';

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
          page: reset ? 0 : page,
          size: page === 0 ? 20 : 4,
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
    setPage(0);
    setIsLastPage(false);
    getProducts(true);
  }, [category, sort]);

  const fetchNextPage = () => {
    if (!isLastPage) {
      if (page === 0) setPage((prevPage) => prevPage + 5);
      else setPage((prevPage) => prevPage + 1);
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
