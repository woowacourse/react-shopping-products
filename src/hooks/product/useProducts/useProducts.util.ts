import { ProductCategory } from '@appTypes/product';
import { generateQueryParams } from '@utils/queryString';
import {
  DEFAULT_SIZE,
  PAGE_OFFSET,
  PAGE_PER_SIZE,
} from '@hooks/product/useProducts/useProducts.constant';
import { PRODUCT_SORT_MAP } from '@components/product/ProductDropdown/ProductDropdown.constant';

interface ProductEndpoint {
  page: number;
  category: ProductCategory | 'all';
  sort: keyof typeof PRODUCT_SORT_MAP;
  sortBy?: string;
}

export const getProductEndpoint = ({
  category,
  page,
  sortBy = 'price',
  sort,
}: ProductEndpoint): string => {
  const baseEndpoint = 'products';

  const adjustedPage = page === 0 ? 0 : page + PAGE_OFFSET;
  const size = page === 0 ? DEFAULT_SIZE : PAGE_PER_SIZE;

  const queryParams = {
    category: category === 'all' ? null : category,
    page: adjustedPage,
    size,
    sort: `${sortBy},${sort}`,
  };

  const queryString = generateQueryParams(queryParams).toString();

  return `${baseEndpoint}?${queryString}`;
};
