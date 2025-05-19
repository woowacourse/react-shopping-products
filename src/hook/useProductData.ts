import { useCallback, useEffect, useState } from 'react';
import { CategoryOption, Product, SortOption } from '../types/common';
import { ProductListResponse } from '../types/response';
import { apiRequest } from '../api';

const useProductData = (
  sortOption: SortOption,
  categoryOption: CategoryOption
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getRequestUrl = useCallback(() => {
    const categoryParam =
      categoryOption === '전체' ? '' : `&category=${categoryOption}`;
    const sortParam =
      sortOption === '높은 가격순' ? '&sort=price,desc' : '&sort=price,asc';
    return `/products?page=0&size=20${categoryParam}${sortParam}`;
  }, [categoryOption, sortOption]);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiRequest<ProductListResponse>(getRequestUrl());
      setProducts(response.content);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setError(
        new Error('상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.')
      );
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  }, [getRequestUrl]);

  useEffect(() => {
    fetchProducts();
  }, [categoryOption, sortOption, fetchProducts]);

  const retryFetch = () => {
    fetchProducts();
  };

  return {
    products,
    error,
    isLoading,
    retryFetch,
  };
};

export default useProductData;
