import { useState } from 'react';

const useProductFilters = () => {
  const [sort, setSort] = useState('asc');
  const [category, setCategory] = useState('');

  return {
    sort,
    category,
    handleSortChange: setSort,
    handleCategoryChange: setCategory,
  };
};

export default useProductFilters;
