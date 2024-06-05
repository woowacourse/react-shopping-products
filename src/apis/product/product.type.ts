import { ProductCategory } from '@appTypes/product';
import { PRODUCT_SORT_MAP } from '@components/product/ProductDropdown/ProductDropdown.constant';

export interface ProductEndpointParams {
  page: number;
  category: ProductCategory | 'all';
  sort: keyof typeof PRODUCT_SORT_MAP;
  sortBy?: string;
}
