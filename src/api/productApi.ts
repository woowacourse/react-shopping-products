import { apiClient } from './apiClient';
import { ApiConfigType, ProductParamsType, ResponseProduct } from './types';

export const productApi = {
  get: async ({ category, sort }: { category: string; sort: string }) => {
    const params: ProductParamsType = {
      sort,
      size: '20',
      page: '0',
      ...(category && { category }),
    };
    const apiConfigs: ApiConfigType = {
      method: 'GET',
      isAuthorization: false,
    };
    const productList = await apiClient<ResponseProduct[], ProductParamsType>(apiConfigs, `/products`, params);

    return productList;
  },
};
