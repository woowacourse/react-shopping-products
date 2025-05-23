import { useCallback, useEffect, useState } from 'react';
import { getProduct } from '../api/fetchProduct';
import { filterProductList } from '../utils/filterCategory';
import {
  CATEGORY,
  SORT_PRICE,
  SORT_PRICE_MAP,
} from '../constants/productConfig';
import { ErrorType, ProductElement, SortKeyType } from '../types/type';
import { ERROR_MESSAGE } from '../constants/errorMessage';

export const useProductList = () => {
  const [productList, setProductList] = useState<ProductElement[]>([]);
  const [category, setCategory] = useState<string>(CATEGORY[0]);
  const [sortBy, setSortBy] = useState<SortKeyType>(SORT_PRICE[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({
    isError: false,
    errorMessage: '',
  });

  const fetchData = useCallback(async () => {
    const mappedSortType = SORT_PRICE_MAP[sortBy];

    setIsLoading(true);
    setError({ isError: false, errorMessage: '' });
    try {
      const data = await getProduct({
        page: 0,
        size: 20,
        sortBy: mappedSortType ? mappedSortType : 'asc',
      });

      const filteredCategory = filterProductList(data.content, category);

      setProductList(filteredCategory);
    } catch (error) {
      console.error(error);
      setError({
        isError: true,
        errorMessage: ERROR_MESSAGE.PRODUCT_FETCH_FAIL,
      });
    } finally {
      setIsLoading(false);
    }
  }, [category, sortBy]);

  useEffect(() => {
    fetchData();
  }, [category, sortBy]);

  // const handleSortPrice = async (value: string) => {
  //   // const { value } = e.target;

  //   if (SORT_PRICE.includes(value as SortKeyType)) {
  //     setSortBy(value as SortKeyType);
  //     // await fetchProductData(value);
  //   }
  // };

  return {
    productList,
    isLoading,
    error,
    fetchData,
    category,
    setCategory,
    sortBy,
    // setSortBy,
    // handleSortPrice,
  };
};
