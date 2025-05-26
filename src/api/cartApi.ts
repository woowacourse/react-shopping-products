import { apiClient } from './apiClient';
import { AddCartParamsType, ApiConfigType, initializeApiParamsType, ResponseCartItem, ResponseDefault } from './types';

export const cartApi = {
  get: async () => {
    const params = {
      size: '20',
      page: '0',
    };
    const apiConfigs: ApiConfigType = {
      method: 'GET',
      isAuthorization: true,
    };
    const cartList = await apiClient<ResponseDefault<ResponseCartItem[]>, initializeApiParamsType>(apiConfigs, `/cart-items`, params);

    return cartList.content;
  },
  post: async (productId: number, quantity: number) => {
    const apiConfigs: ApiConfigType = {
      method: 'POST',
      isAuthorization: true,
      body: {
        productId,
        quantity,
      },
    };

    await apiClient<ResponseCartItem, AddCartParamsType>(apiConfigs, `/cart-items`);
  },
  delete: async (cartItemId: number) => {
    const apiConfigs: ApiConfigType = {
      method: 'DELETE',
      isAuthorization: true,
    };
    const response = await apiClient<ResponseCartItem, { cartItemId: number }>(apiConfigs, `/cart-items/${cartItemId}`, { cartItemId });

    return response;
  },
  patch: async (quantity: number, cartItemId: number) => {
    const apiConfigs: ApiConfigType = {
      method: 'PATCH',
      isAuthorization: true,
      body: {
        quantity,
      },
    };
    const response = await apiClient<ResponseCartItem, { cartItemId: number }>(apiConfigs, `/cart-items/${cartItemId}`, { cartItemId });

    return response;
  },
};
