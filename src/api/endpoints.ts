import buildGetProductListURL from '@/api/product/buildGetProductListURL';
import { getProductListProps } from '@/api/product';

const ENDPOINT = {
  product: {
    getList: ({ page, size, category, order }: getProductListProps) => {
      return buildGetProductListURL({
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

export default ENDPOINT;
