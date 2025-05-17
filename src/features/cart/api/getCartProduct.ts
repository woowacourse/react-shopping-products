import {apiClient} from '../../../shared/utils/requestApi';

export const getCartProduct = async () =>
  (await apiClient.get({endPoint: `/cart-items?page=0&size=20`})).json();
