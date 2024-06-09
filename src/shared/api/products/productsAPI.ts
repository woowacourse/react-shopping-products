import { DEFAULT_CATEGORY, DEFAULT_SORT_ORDER } from '@/shared';

import { requestServer } from '../requestServer';

import { ALL } from './constants';
import { Category, ProductsResponse, SortOrder } from './types';

const path = '/products';

export interface productApiGetParams {
  page?: number;
  size?: number;
  category?: typeof ALL | Category;
  sortOrder?: SortOrder;
}

export const productApi = {
  get: async ({
    page = 1,
    size = 20,
    category = DEFAULT_CATEGORY,
    sortOrder: sort = DEFAULT_SORT_ORDER,
  }: productApiGetParams) => {
    let query;
    if (category === ALL) {
      query = new URLSearchParams({ page: page.toString(), size: size.toString(), sort }).toString();
    } else {
      query = new URLSearchParams({ page: page.toString(), size: size.toString(), category, sort }).toString();
    }

    return requestServer<ProductsResponse>({ method: 'GET', path, query });
  },
};
