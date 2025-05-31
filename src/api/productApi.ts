import { apiClient } from './apiClient';
import { ApiConfigType, ProductParamsType, ResponseDefault, ResponseProduct } from './types';

export const productApi = {
  get: async (params: ProductParamsType) => {
    const apiConfigs: ApiConfigType = {
      method: 'GET',
      isAuthorization: false,
    };
    const productList = await apiClient<ResponseDefault<ResponseProduct[]>, ProductParamsType>(apiConfigs, `/products`, params);

    return productList.content;
  },
};
