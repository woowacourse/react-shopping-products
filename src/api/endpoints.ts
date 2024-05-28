import { API_URL } from './config';
import buildURL from './buildURL';
import { getProductListProps } from './product';

export const ENDPOINT = {
  product: {
    getList: ({ page, size, category, sortOrder }: getProductListProps) => {
      return buildURL({
        baseUrl: `${API_URL}/products`,
        page,
        size,
        category,
        sortOrder,
      });
    },
    postItem: `${API_URL}/products`,
    getItem: (id: number) => `${API_URL}/product/${id}`,
    deleteItem: (id: number) => `${API_URL}/product/${id}`,
  },
};
