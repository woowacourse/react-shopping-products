import buildGetProductURL from './buildProductURL';
import { getProductListProps } from './product';

export const ENDPOINT = {
  product: {
    getList: ({ page, size, category, order }: getProductListProps) => {
      return buildGetProductURL({
        baseUrl: `/products`,
        page,
        size,
        category,
        order,
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
