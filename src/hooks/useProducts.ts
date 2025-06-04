import { useMemo, useEffect } from 'react';
import { getProducts } from '../api/products';
import { CategoryType, ProductType, SortKeyType } from '../types/product';
import { useData } from './useData';
import { useToast } from '../context/ToastContext';
import { ERROR_MESSAGES } from '../constants/errorMessages';

interface ProductsResponse {
  content: ProductType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export function useProducts(sortType: SortKeyType, category: CategoryType = '전체') {
  const { showToast } = useToast();
  const key = useMemo(() => `products-${sortType}-${category}`, [sortType, category]);

  const fetcher = async () => {
    const response = await getProducts(sortType, category);
    return response as ProductsResponse;
  };

  const { data, error, isLoading, refetch } = useData<ProductsResponse>(key, fetcher, {
    cacheTime: 5 * 60 * 1000, // 5분
    refetchOnMount: false, // 캐시가 있으면 재요청하지 않음
  });

  useEffect(() => {
    if (error) {
      showToast(ERROR_MESSAGES.productsFetchError);
    }
  }, [error, showToast]);

  return {
    products: data?.content || [],
    isLoading,
    isError: !!error,
    fetchProduct: refetch,
  };
}
