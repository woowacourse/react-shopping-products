import { useEffect, useState } from 'react';
import { Product } from '../types/common';
import { ProductListResponse } from '../types/response';
import { apiRequest } from '../api/apiRequest';
import useCategory from './useCategory';
import useSort from './useSort';

const useShoppingItemList = () => {
  const { category, selectCategory, resetCategory } = useCategory();
  const { sortType, selectSort, resetSort } = useSort();
  const [data, setData] = useState<Product[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      setError(null);

      try {
        const response = await apiRequest<ProductListResponse>(
          `/products?page=0&size=20${
            category === '전체' ? '' : `&category=${category}`
          }${
            sortType === '높은 가격순' ? '&sort=price,desc' : '&sort=price,asc'
          }`
        );

        setData(response.content);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError(
          new Error('상품 목록을 불러오는데 실패했습니다. 다시 시도해주세요.')
        );
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [category, sortType]);

  const retryFetch = () => {
    resetCategory();
    resetSort();
  };

  return {
    data,
    selectSort,
    selectCategory,
    sortType,
    category,
    error,
    isLoading,
    retryFetch,
  };
};

export default useShoppingItemList;
