import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';

export const isValidSortType = (sortType: string): sortType is keyof typeof PRODUCT_SORT_MAP => {
  return sortType in PRODUCT_SORT_MAP;
};
