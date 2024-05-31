import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';
import { ProductCategory } from '@appTypes/product';
import { generateQueryParams } from '@utils/queryString';
import {
  DEFAULT_SIZE,
  PAGE_OFFSET,
  PAGE_PER_SIZE,
} from '@hooks/product/useProductItems/useProductItems.constant';

interface ProductEndpoint {
  page: number;
  category: ProductCategory | 'all';
  sortType: keyof typeof PRODUCT_SORT_MAP;
  sortBy?: string;
}

export const getProductEndpoint = ({
  category,
  page,
  sortBy = 'price',
  sortType,
}: ProductEndpoint): string => {
  const baseEndpoint = 'products';

  const adjustedPage = page === 0 ? 0 : page + PAGE_OFFSET;
  const size = page === 0 ? DEFAULT_SIZE : PAGE_PER_SIZE;

  const queryParams = {
    category: category === 'all' ? null : category,
    page: adjustedPage,
    size,
    sort: `${sortBy},${sortType}`,
  };

  const queryString = generateQueryParams(queryParams).toString();

  return `${baseEndpoint}?${queryString}`;
};
