import { useEffect, useState } from 'react';

import useCategory from './useCategory';
import useSort from './useSort';

import { Product } from '../types/common';
import { productApi } from '../api/product';

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
        const response = await productApi.getProductList({
          sortType,
          category,
        });

        setData(response);
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
