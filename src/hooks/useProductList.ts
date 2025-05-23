import { useCallback, useEffect, useState } from 'react';
import { getProduct } from '../api/fetchProduct';
import { filterProductList } from '../utils/filterCategory';
import {
  CATEGORY,
  SORT_PRICE,
  SORT_PRICE_MAP,
} from '../constants/productConfig';
import {
  CategoryType,
  ErrorType,
  ProductElement,
  SortKeyType,
} from '../types/type';
import { useToastContext } from '../context/ToastContext';

export const useProductList = () => {
  const [productList, setProductList] = useState<ProductElement[]>([]);
  const [category, setCategory] = useState<string>(CATEGORY[0]);
  const [sortBy, setSortBy] = useState<SortKeyType>(SORT_PRICE[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({
    isError: false,
    errorMessage: '',
  });
  const { showToast } = useToastContext();

  const fetchData = useCallback(async () => {
    const mappedSortType = SORT_PRICE_MAP[sortBy];

    setIsLoading(true);
    setError({ isError: false, errorMessage: '' });
    try {
      const data = await getProduct({
        page: 0,
        size: 50,
        sortBy: mappedSortType ? mappedSortType : 'asc',
      });

      const filteredCategory = filterProductList(data.content, category);

      setProductList(filteredCategory);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        showToast(error.message);
        // setError({
        //   isError: true,
        //   errorMessage: error.message,
        // });
      }
    } finally {
      setIsLoading(false);
    }
  }, [category, sortBy]);

  useEffect(() => {
    fetchData();
  }, [category, sortBy]);

  const handleFilterCategory = async (value: string) => {
    if (CATEGORY.includes(value as CategoryType)) {
      setCategory(value as CategoryType);
    }
  };

  const handleSortPrice = async (value: string) => {
    if (SORT_PRICE.includes(value as SortKeyType)) {
      setSortBy(value as SortKeyType);
    }
  };

  return {
    productList,
    isLoading,
    error,
    fetchData,
    category,
    sortBy,
    handleSortPrice,
    handleFilterCategory,
  };
};
