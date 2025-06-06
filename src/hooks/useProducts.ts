import { useMemo } from 'react';
import { getProducts } from '../api/products';
import { CategoryType, ProductType, SortKeyType } from '../types/product';
import { useData } from './useData';

interface ProductsResponse {
  content: ProductType[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export function useProducts(sortType: SortKeyType, category: CategoryType = '전체') {
  const key = useMemo(() => `products-${sortType}-${category}`, [sortType, category]);

  const fetcher = async () => {
    const response = await getProducts(sortType, category);
    return response as ProductsResponse;
  };

  const { data, error, isLoading, refetch } = useData<ProductsResponse>(key, fetcher, {
    cacheTime: 5 * 60 * 1000, // 5분
    refetchOnMount: false, // 캐시가 있으면 재요청하지 않음
  });

  return {
    products: data?.content || [],
    isLoading,
    isError: !!error,
    error,
    fetchProduct: refetch,
  };
}
