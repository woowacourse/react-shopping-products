import { useState, useEffect, useCallback } from 'react';
import { getProducts } from '../services/productServices';
import { CATEGORY_OPTIONS, SELECT_SORT_OPTIONS, SORT_OPTIONS } from '../constants/systemConstants';
import { CategoryType, ProductItemType, SelectedSortType } from '../types/data';
import useFetchData from './useFetchData';
import { DEFAULT_ERROR_MESSAGE } from '../constants/errorMessages';

interface ProductListProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useProductHandler = ({ handleErrorMessage }: ProductListProps) => {
  const {
    data: products,
    setDataMap,
    fetchData: fetchProducts,
    isLoading,
  } = useFetchData<ProductItemType[]>({
    dataName: 'products',
  });
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState(SELECT_SORT_OPTIONS[0]);

  const fetchTotalProducts = useCallback(async () => {
    await fetchProducts({
      apiCall: () => getProducts(categoryOption, SORT_OPTIONS.get(sortOption)),
      onSuccess: (newData) => {
        if (newData) {
          setDataMap((prev) => new Map(prev).set('products', newData));
        }
      },
      onError: (error) => {
        const message = error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE;
        handleErrorMessage(message);
      },
    });
  }, [fetchProducts, handleErrorMessage, setDataMap, categoryOption, sortOption]);

  useEffect(() => {
    fetchTotalProducts();
  }, [fetchTotalProducts]);

  const handleCategoryOption = (value: CategoryType) => {
    setCategoryOption(value);
  };

  const handleSortOption = (value: SelectedSortType) => {
    setSortOption(value);
  };

  return {
    categoryOption,
    handleCategoryOption,
    sortOption,
    handleSortOption,
    products,
    isLoading,
  };
};

export default useProductHandler;
