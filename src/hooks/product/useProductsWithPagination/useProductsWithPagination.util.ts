import { ProductCategory } from '@appTypes/product';
import { generateQueryParams } from '@utils/queryString';
import {
  DEFAULT_SIZE,
  INIT_PAGE,
  PAGE_OFFSET,
  PAGE_PER_SIZE,
} from '@hooks/product/useProductsWithPagination/useProductsWithPagination.constant';
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

  const adjustedPage = page === INIT_PAGE ? INIT_PAGE : page + PAGE_OFFSET;
  const size = page === INIT_PAGE ? DEFAULT_SIZE : PAGE_PER_SIZE;

  const queryParams = {
    category: category === 'all' ? null : category,
    page: adjustedPage,
    size,
    sort: `${sortBy},${sort}`,
  };

  const queryString = generateQueryParams(queryParams).toString();

  return `${baseEndpoint}?${queryString}`;
};
