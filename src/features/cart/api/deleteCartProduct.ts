import {apiClient} from '../../../shared/utils/requestApi';

export const deleteCartProduct = (productId: number) =>
  apiClient.delete({endPoint: `/cart-items/${productId}`});
