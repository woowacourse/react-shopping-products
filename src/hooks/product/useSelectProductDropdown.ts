import { PRODUCT_CATEGORY_MAP } from '@components/product/CategoryDropdown/CategoryDropdown.constant';
import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';
import { Product } from '@appTypes/product';
import { useState } from 'react';

const useSelectProductDropdown = (onResetPage: () => void, onResetProducts: () => void) => {
  const [sortType, setSortType] = useState<keyof typeof PRODUCT_SORT_MAP>('asc');
  const [category, setCategory] = useState<Product['category'] | 'all'>('all');

  const onSelectSortTypeOption = (selectSortType: keyof typeof PRODUCT_SORT_MAP) => {
    setSortType(selectSortType);

    if (selectSortType === sortType) return;

    onResetPage();
    onResetProducts();
  };

  const onSelectCategoryOption = (selectCategory: keyof typeof PRODUCT_CATEGORY_MAP) => {
    setCategory(selectCategory);

    if (selectCategory === category) return;

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
