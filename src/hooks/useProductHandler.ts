import { useState, useEffect } from 'react';
import { getProducts } from '../services/productServices';
import tryApiCall from '../util/tryApiCall';
import { CATEGORY_OPTIONS, SORT_OPTIONS, SELECT_SORT_OPTIONS } from '../constants/systemConstants';
import { ProductItemType } from '../types/data';

interface ProductListProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useProductHandler = ({ handleErrorMessage }: ProductListProps) => {
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState(SELECT_SORT_OPTIONS[0]);

  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const productsData = await tryApiCall(
        () => getProducts(categoryOption, SORT_OPTIONS.get(sortOption)),
        handleErrorMessage,
      );
      if (productsData) {
        setProducts(productsData);
      }
      setIsLoading(false);
    })();
  }, [categoryOption, sortOption]);

  const handleCategoryOption = (value: string) => {
    setCategoryOption(value);
  };

  const handleSortOption = (value: string) => {
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
