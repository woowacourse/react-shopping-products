import { useState, useEffect } from 'react';
import { fetchProducts } from '../api/index';
import {
  INITIAL_DATA_LOAD_COUNT,
  SUBSEQUENT_DATA_LOAD_COUNT,
  CATEGORY,
  SORT,
} from '../constants';
import { useToast } from './useToast';
import { CategoryType, SortType } from '../type';

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
  error: unknown;
  page: number;
  fetchNextPage: () => void;
  changeCategory: (dropboxOption: string) => void;
  changeSorting: (dropboxOption: string) => void;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [category, setCategory] = useState<CategoryType>('all');
  const [sorting, setSorting] = useState<SortType>('priceAsc');
  const { createToast } = useToast();

  const changeCategory = (category: string) => {
    if (Object.keys(CATEGORY).includes(category)) {
      setCategory(category as CategoryType);
      setProducts([]);
      setPage(0);
    }
  };

  const changeSorting = (sort: string) => {
    if (Object.keys(SORT).includes(sort)) {
      setSorting(sort as SortType);
      setProducts([]);
      setPage(0);
    }
  };

  useEffect(() => {
    const getProducts = async () => {
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
          createToast('⛔️ 장바구니 상품을 가져오는데 실. 다시 시도해 주세요.');
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [page, category, sorting, createToast]);

  const fetchNextPage = () => {
    setPage((prevPage) => {
      if (isLast) return prevPage;
      if (page === 0) return prevPage + 5;
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
