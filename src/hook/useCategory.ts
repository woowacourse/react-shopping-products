import { useState, useCallback } from 'react';
import { CategoryOption } from '../types/common';

const useCategory = () => {
  const [category, setCategory] = useState<CategoryOption>('전체');

  const selectCategory = useCallback(
    (category: CategoryOption) => {
      setCategory(category);
    },
    [setCategory]
  );

  const resetCategory = useCallback(() => {
    setCategory('전체');
  }, [setCategory]);

  return {
    category,
    selectCategory,
    resetCategory,
  };
};

export default useCategory;
