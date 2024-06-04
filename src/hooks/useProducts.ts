import { useState, useEffect, useCallback } from 'react';
import { fetchProducts } from '../api/index';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
  JUMP_NEXT_PAGE_IN_ZERO,
} from '../constants';
import { useToast } from './useToast';
import { CategoryType, SortType } from '../type';
import { ProductItem } from '../type/ProductItem';

interface UseProductsResult {
  products: ProductItem[];
  loading: boolean;
  error: unknown;
  page: number;
  fetchNextPage: () => void;
  changeCategory: (dropboxOption: CategoryType) => void;
  changeSorting: (dropboxOption: SortType) => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [category, setCategory] = useState<CategoryType>('all');
  const [sorting, setSorting] = useState<SortType>('price_name_asc');
  const { createToast } = useToast();

  const resetPage = () => {
    setProducts([]);
    setPage(0);
  };

  const changeCategory = (category: CategoryType) => {
    setCategory(category);
    resetPage();
  };

  const changeSorting = (sort: SortType) => {
    setSorting(sort);
    resetPage();
  };
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const limit =
        page === 0 ? INITIAL_DATA_LOAD_COUNT : SUBSEQUENT_DATA_LOAD_COUNT;
      const data = await fetchProducts(page, limit, category, sorting);

      if (data.last) {
        setIsLast(true);
      }

      setProducts((prevProducts) => [...prevProducts, ...data.content]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
        createToast(
          '⛔️ 상품 목록을 가져오는데 실패했습니다. 다시 시도해 주세요.',
        );
      }
    } finally {
      setLoading(false);
    }
  }, [category, sorting, page, createToast]);

  useEffect(() => {
    getProducts();
  }, [page, category, sorting, createToast, getProducts]);

  const fetchNextPage = () => {
    setPage((prevPage) => {
      if (isLast) return prevPage;
      if (page === 0) return prevPage + JUMP_NEXT_PAGE_IN_ZERO;
      return prevPage + 1;
    });
  };

  return {
    products,
    loading,
    error,
    page,
    fetchNextPage,
    changeCategory,
    changeSorting,
  };
}
