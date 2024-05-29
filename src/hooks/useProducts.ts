import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { fetchProducts } from '../api';
import { ProductType } from '../types';
import { useToast } from './useToast';
import { AFTER_FETCH_SIZE, FIRST_FETCH_PAGE, FIRST_FETCH_SIZE } from '../constant/products';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface UseProductsResult {
  products: Product[];
  setPage: Dispatch<SetStateAction<number>>;
  hasMore: boolean;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const setFetchedProducts = async () => {
      try {
        const size = page === FIRST_FETCH_PAGE ? FIRST_FETCH_SIZE : AFTER_FETCH_SIZE;
        const queryPage =
          page === FIRST_FETCH_PAGE
            ? FIRST_FETCH_PAGE
            : FIRST_FETCH_SIZE / AFTER_FETCH_SIZE - 1 + page;
        const newProducts = await fetchProducts({ page: queryPage, size });
        setProducts((prev) => [...prev, ...newProducts]);
        setHasMore(newProducts.length > 0);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          showToast('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        }
      }
    };

    setFetchedProducts();
  }, [page]);

  return { products, setPage, hasMore };
}
