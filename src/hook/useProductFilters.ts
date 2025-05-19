import { useState } from 'react';
import { CategoryOption, SortOption } from '../types/common';

const useProductFilters = () => {
  const [sortOption, setSortOption] = useState<SortOption>('낮은 가격순');
  const [categoryOption, setCategoryOption] = useState<CategoryOption>('전체');

  const handleSortChange = (option: string) => {
    setSortOption(option as SortOption);
  };

  const handleCategoryChange = (category: string) => {
    setCategoryOption(category as CategoryOption);
  };

  return {
    sortOption,
    categoryOption,
    handleSortChange,
    handleCategoryChange,
  };
};

export default useProductFilters;
