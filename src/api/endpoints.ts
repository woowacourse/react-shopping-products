import { buildURL } from './buildURL';
import { getProductListProps } from './product';

export const API_URL = import.meta.env.VITE_API_URL;
export const USER_ID = import.meta.env.VITE_USER_ID;
export const USER_PASSWORD = import.meta.env.VITE_PASSWORD;

export const ENDPOINT = {
  product: {
    getList: ({ page, size, category, sort = 'price' }: getProductListProps) =>
      buildURL('/products', { page, size, category, sort: `price%2C${sort}` }),
    postItem: `${API_URL}/products`,
    getItem: (id: number) => `${API_URL}/product/${id}`,
    deleteItem: (id: number) => `${API_URL}/product/${id}`,
  },
};
