import { useEffect, useState } from 'react';
import { SortOrder, SortType } from '../../api/types';
import {
  INITIAL_PAGE_NUMBER,
  INITIAL_PAGE_SIZE,
  PAGE_SIZE,
} from '../../constants/paginationRules';
import { Category, Product } from '../../types';
import { productQueries } from './queries/product';

export interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  isLastPage: boolean;
  page: number;
  fetchNextPage: () => void;
  setSort: (value: string) => void;
  setCategory: (value: string) => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLastPage, setIsLastPage] = useState(false);

  const [page, setPage] = useState(INITIAL_PAGE_NUMBER);
  const [sort, setSort] = useState<SortType>({ price: 'asc', id: 'asc' });
  const [category, setCategory] = useState<Category | ''>('');

  const {
    query: getProducts,
    data: productsResponse,
    isLoading,
    error,
  } = productQueries.useGetProducts({
    page,
    category,
    sort: Object.entries(sort).map(([field, order]) => `${field},${order}`),
    size: page === INITIAL_PAGE_NUMBER ? INITIAL_PAGE_SIZE : PAGE_SIZE,
  });

  useEffect(() => {
    if (!isLastPage) {
      getProducts();
    }
  }, [page, sort, category, isLastPage]);

  useEffect(() => {
    setIsLastPage(false);
    setPage(INITIAL_PAGE_NUMBER);
  }, [category, sort]);

  useEffect(() => {
    if (productsResponse) {
      const { last, content } = productsResponse;
      setIsLastPage(last);
      setProducts((prevProducts) =>
        page === INITIAL_PAGE_NUMBER ? content : [...prevProducts, ...content]
      );
    }
  }, [productsResponse]);

  const fetchNextPage = () => {
    if (isLastPage) return;

    // 서버의 page size가 4로 고정되어
    // page: 0, size: 20 요청 이후엔
    // page: 5, size: 4 로 요청해야 함
    setPage((prevPage) =>
      prevPage !== INITIAL_PAGE_NUMBER
        ? prevPage + 1
        : prevPage + INITIAL_PAGE_SIZE / PAGE_SIZE
    );
  };

  return {
    products: products ?? [],
    isLoading,
    error,
    page,
    fetchNextPage,
    setCategory: (value: string) => {
      setCategory(value as Category);
    },
    setSort: (value: string) => {
      setSort((prev) => ({ ...prev, price: value as SortOrder }));
    },
    isLastPage,
  };
}
