import { useCallback, useEffect, useState } from 'react';
import { SortOrder, SortType } from '../../api/types';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
} from '../../constants/paginationRules';
import { Category, Product } from '../../types';
import useFetchProducts from './products/useFetchProducts';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: Error | null;
  page: number;
  isLastPage: boolean;
  fetchNextPage: () => void;

  setSort: (newPriceOrder: SortOrder) => void;
  setCategory: (newCategory: Category) => void;
}

export default function useProducts(): UseProductsResult {
  const { error, loading, fetchProducts } = useFetchProducts();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<SortType>({ price: 'asc', id: 'asc' });
  const [category, setCategory] = useState('');

  const getProducts = useCallback(async () => {
    fetchProducts({
      page,
      category,
      sort,
      size: page === INITIAL_PAGE_NUMBER ? INITIAL_PAGE_SIZE : PAGE_SIZE,
    }).then((response) => {
      if (!response) return;
      const { last, content } = response;

      setIsLastPage(last);
      setProducts((prevProducts) =>
        page === INITIAL_PAGE_NUMBER ? content : [...prevProducts, ...content]
      );
    });
  }, [page, sort, category, fetchProducts]);

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
    setCategory: (newCategory: Category) => {
      setCategory(() => newCategory);
    },
    setSort: (newPriceOrder: SortOrder) => {
      setSort((prev) => ({ ...prev, price: newPriceOrder }));
    },
    isLastPage,
  };
}
