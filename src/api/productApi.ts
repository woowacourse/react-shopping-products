import { apiClient } from './apiClient';
import { ApiConfigType, ProductParamsType, ResponseDefault, ResponseProduct } from './types';

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
    const productList = await apiClient<ResponseDefault<ResponseProduct[]>, ProductParamsType>(apiConfigs, `/products`, params);

    return productList.content;
  },
};
