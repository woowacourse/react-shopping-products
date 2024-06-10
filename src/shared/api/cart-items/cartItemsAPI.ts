import { DEFAULT_SORT_ORDER } from '../products/constants';
import { SortOrder } from '../products/types';
import { requestServer } from '../requestServer';

import { CartItemsResponse } from './types';

const path = '/cart-items';

interface GetParams {
  page?: number;
  size?: number;
  sortOrder?: SortOrder;
}

interface PostParams {
  productId: number;
  quantity: number;
}

interface PatchParams {
  id: number;
  quantity: number;
}

export const cartItemsAPI = {
  get: async ({ page = 0, size = 20, sortOrder: sort = DEFAULT_SORT_ORDER }: GetParams) => {
    const query = new URLSearchParams({ page: page.toString(), size: size.toString(), sort }).toString();
    return requestServer<CartItemsResponse>({ method: 'GET', path, query });
  },

  post: async ({ productId, quantity }: PostParams) => {
    const body = { productId, quantity };
    return requestServer<CartItemsResponse>({ method: 'POST', path, body });
  },

  patch: async ({ id, quantity }: PatchParams) => {
    const body = { quantity };
    return requestServer<CartItemsResponse>({ method: 'PATCH', path: `${path}/${id}`, body });
  },
};
