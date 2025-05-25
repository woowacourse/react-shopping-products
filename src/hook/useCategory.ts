import { useState } from 'react';
import { CategoryOption } from '../types/common';

const useCategory = () => {
  const [category, setCategory] = useState<CategoryOption>('전체');

  const selectCategory = (category: CategoryOption) => {
    setCategory(category);
  };

  const resetCategory = () => {
    setCategory('전체');
  };

  return {
    category,
    selectCategory,
    resetCategory,
  };
};

export default useCategory;
