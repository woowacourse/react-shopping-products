import { PRODUCT_CATEGORY_MAP } from '@components/product/CategoryDropdown/CategoryDropdown.constant';

export const isValidCategory = (
  category: string
): category is keyof typeof PRODUCT_CATEGORY_MAP => {
  return category in PRODUCT_CATEGORY_MAP;
};
