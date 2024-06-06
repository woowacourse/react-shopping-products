import { useState } from 'react';

const useProductFilters = () => {
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState('');

  const handleSortChange = (newSort: string) => {
    if (sort === newSort) {
      return;
    }
    setSort(newSort);
  };

  const handleCategoryChange = (newCategory: string) => {
    if (category === newCategory) {
      return;
    }
    setCategory(newCategory);
  };

  return {
    sort,
    category,
    handleSortChange,
    handleCategoryChange,
  };
};

export default useProductFilters;
