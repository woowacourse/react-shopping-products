import { useState } from 'react';
import { CATEGORY_OPTIONS, SELECT_SORT_OPTIONS } from '../constants/systemConstants';
import type { ProductItemType, DataResourceType } from '../types/data';

interface ProductListProps {
  dataResource: DataResourceType<ProductItemType[], [string, string]>;
  handleErrorMessage: (errorMessage: string) => void;
}

const useProductHandler = ({ dataResource, handleErrorMessage }: ProductListProps) => {
  const [categoryOption, setCategoryOption] = useState(CATEGORY_OPTIONS[0]);
  const [sortOption, setSortOption] = useState(SELECT_SORT_OPTIONS[0]);

  const handleCategoryOption = async (value: string) => {
    setCategoryOption(value);
    await dataResource.refetch(value, sortOption);
    if (dataResource.error) {
      handleErrorMessage(dataResource.error.message);
    }
  };

  const handleSortOption = async (value: string) => {
    setSortOption(value);
    await dataResource.refetch(categoryOption, value);
    if (dataResource.error) {
      handleErrorMessage(dataResource.error.message);
    }
  };

  return {
    categoryOption,
    sortOption,
    handleCategoryOption,
    handleSortOption,
    loadingState: dataResource.loadingState,
  };
};

export default useProductHandler;
