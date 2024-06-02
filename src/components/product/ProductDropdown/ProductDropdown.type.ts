import {
  PRODUCT_CATEGORY_MAP,
  PRODUCT_MAP,
  PRODUCT_SORT_MAP,
} from '@components/product/ProductDropdown/ProductDropdown.constant';

export interface ProductDropdownOptions {
  sort: keyof typeof PRODUCT_SORT_MAP;
  category: keyof typeof PRODUCT_CATEGORY_MAP;
}

export type ProductDropdownOptionKeys = ProductDropdownOptions[keyof typeof PRODUCT_MAP];
