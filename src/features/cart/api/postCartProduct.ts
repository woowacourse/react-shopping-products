import {apiClient} from '../../../shared/utils/requestApi';

export const postCartProduct = (productId: number) =>
  apiClient.post({
    endPoint: '/cart-items',
    body: JSON.stringify({
      productId: productId,
      quantity: 1,
    }),
  });
