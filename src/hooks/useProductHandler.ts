import { useState, useEffect, useRef } from 'react';
import { getProducts } from '../services/productServices';
import tryApiCall from '../util/tryApiCall';
import { CATEGORY_OPTIONS, SORT_OPTIONS, SELECT_SORT_OPTIONS } from '../constants/systemConstants';
import { CategoryType, ProductItemType, SelectedSortType } from '../types/data';

interface ProductListProps {
  handleErrorMessage: (errorMessage: string) => void;
}

const useProductHandler = ({ handleErrorMessage }: ProductListProps) => {
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState(SELECT_SORT_OPTIONS[0]);

  const [products, setProducts] = useState<ProductItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    setIsLoading(true);

    (async () => {
      try {
        const productsData = await tryApiCall(
          () => getProducts(categoryOption, SORT_OPTIONS.get(sortOption)),
          handleErrorMessage,
        );

        if (productsData && isMountedRef.current) {
          setProducts(productsData);
        }
      } finally {
        setIsLoading(false);
      }

      return () => {
        isMountedRef.current = false;
      };
    })();
  }, [categoryOption, sortOption]);

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
