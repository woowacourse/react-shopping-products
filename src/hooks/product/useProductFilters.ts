import { useState } from 'react';
import { PriceSortKey, CategoryListKey } from '@/types/product.type';

const useProductFilters = () => {
  const [sort, setSort] = useState<PriceSortKey>('asc');
  const [category, setCategory] = useState<CategoryListKey>('');

  return {
    sort,
    category,
    handleSortChange: setSort,
    handleCategoryChange: setCategory,
  };
};

export default useProductFilters;
