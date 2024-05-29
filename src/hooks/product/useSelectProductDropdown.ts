import { Product } from '@appTypes/product';
import { PRODUCT_CATEGORY_MAP } from '@components/product/CategoryDropdown/CategoryDropdown.constant';
import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';
import { useState } from 'react';

const useSelectProductDropdown = (onResetPage: () => void, onResetProducts: () => void) => {
  const [sortType, setSortType] = useState<keyof typeof PRODUCT_SORT_MAP>('asc');
  const [category, setCategory] = useState<Product['category'] | 'all'>('all');

  const onSelectSortTypeOption = (sortType: keyof typeof PRODUCT_SORT_MAP) => {
    setSortType(sortType);
    onResetPage();
    onResetProducts();
  };

  const onSelectCategoryOption = (category: keyof typeof PRODUCT_CATEGORY_MAP) => {
    setCategory(category);
    onResetPage();
    onResetProducts();
  };

  return {
    sortType,
    category,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  };
};

export default useSelectProductDropdown;
