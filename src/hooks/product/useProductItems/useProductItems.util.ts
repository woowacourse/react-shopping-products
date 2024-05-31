import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';
import { Product } from '@appTypes/product';
import { generateQueryParams } from '@utils/queryString';

interface ProductEndpoint {
  page: number;
  sortType: keyof typeof PRODUCT_SORT_MAP;
  category: Product['category'] | 'all';
}

export const getProductEndpoint = ({ category, page, sortType }: ProductEndpoint): string => {
  const baseEndpoint = 'products';

  const queryParams = {
    category: category === 'all' ? null : category,
    page: page && page + 4,
    size: page === 0 ? 20 : 4,
    sort: `price,${sortType}`,
  };

  const queryString = generateQueryParams(queryParams).toString();

  return `${baseEndpoint}?${queryString}`;
};
