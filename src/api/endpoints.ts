import buildURL from './buildURL';
import { getProductListProps } from './product';

export const ENDPOINT = {
  product: {
    getList: ({ page, size, category, sortOrder }: getProductListProps) => {
      return buildURL({
        baseUrl: `/products`,
        page,
        size,
        category,
        sortOrder,
      });
    },
    postItem: `/products`,
    getItem: (id: number) => `/product/${id}`,
    deleteItem: (id: number) => `/product/${id}`,
  },
  cartItem: {
    getList: '/cart-items',
    postItem: '/cart-items',
    deleteItem: (id: number) => `/cart-items/${id}`,
    patchItem: (id: number) => `/cart-items/${id}`,
    getItemCount: '/cart-items/counts',
  },
};
