import { useState } from 'react';

import { Category, Product, SortOrder } from '@/entities/product';
import { ALL } from '@/features/product';
import { fetchProducts } from '@/shared';

import { EXTRA_FETCH_COUNT, FIRST_FETCH_COUNT, SECONDARY_REQUEST_PAGE_GAP } from '../config/fetchProduct';

interface UseFetchProductsResult {
  products: Product[];
  isLoading: boolean;
  error: unknown;
  totalPage: number;
  fetchProductsData: (page: number, category: typeof ALL | Category, sortOrder: SortOrder) => void;
}

export default function useFetchProducts(): UseFetchProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);
  const [totalPage, setTotalPage] = useState(0);

  const fetchProductsData = async (page: number, category: typeof ALL | Category, sortOrder: SortOrder) => {
    const size = page === 0 ? FIRST_FETCH_COUNT : EXTRA_FETCH_COUNT;
    const requestPage = page === 0 ? 0 : page + SECONDARY_REQUEST_PAGE_GAP;

    try {
      setIsLoading(true);
      const { totalPages, content } = await fetchProducts({
        page: requestPage,
        size,
        category,
        sort: sortOrder,
      });

      setError(null);
      setTotalPage(totalPages);
      setProducts((prev) => (page === 0 ? content : [...prev, ...content]));
    } catch (error: unknown) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { products, isLoading, error, totalPage, fetchProductsData };
}
