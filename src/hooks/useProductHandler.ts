import { useState, useEffect } from 'react';
import { getProducts } from '../services/productServices';
import tryApiCall from '../util/tryApiCall';
import { CATEGORY_OPTIONS, SORT_OPTIONS, SELECT_SORT_OPTIONS } from '../constants/systemConstants';
import type { ProductItemType } from '../types/data';

interface ProductListProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useProductHandler = ({ handleErrorMessage }: ProductListProps) => {
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState(SELECT_SORT_OPTIONS[0]);

  const [products, setProducts] = useState<ProductItemType[]>([]);

  type LoadingStateType = 'loadingInitial' | 'loadingFilter' | 'success';
  const [loadingState, setLoadingState] = useState<LoadingStateType>('loadingInitial');

  const fetchProducts = async ({
    category,
    sort,
    loadingType,
  }: {
    category: string;
    sort: string;
    loadingType: LoadingStateType;
  }) => {
    setLoadingState(loadingType);

    const productsData = await tryApiCall(
      () => getProducts(category, SORT_OPTIONS.get(sort)),
      handleErrorMessage,
    );

    if (productsData) {
      setProducts(productsData);
    }
    setLoadingState('success');
  };

  useEffect(() => {
    fetchProducts({
      category: categoryOption,
      sort: sortOption,
      loadingType: 'loadingInitial',
    });
  }, []);

  const handleCategoryOption = (value: string) => {
    setCategoryOption(value);
    fetchProducts({
      category: value,
      sort: sortOption,
      loadingType: 'loadingFilter',
    });
  };

  const handleSortOption = (value: string) => {
    setSortOption(value);
    fetchProducts({
      category: categoryOption,
      sort: value,
      loadingType: 'loadingFilter',
    });
  };

  return {
    categoryOption,
    handleCategoryOption,
    sortOption,
    handleSortOption,
    products,
    loadingState,
  };
};

export default useProductHandler;
