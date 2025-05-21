import {apiClient} from '../../../shared/utils/requestApi';

export const postCartProduct = (productId: number, quantity: number) =>
  apiClient.post({
    endPoint: '/cart-items',
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
  });
