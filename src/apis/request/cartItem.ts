import { CartItem } from '@/types';
import { BASE_URL } from '../baseUrl';
import { ENDPOINT } from '../endpoints';
import { requestGet, requestPost, requestDelete } from '../fetcher';

export const requestCartItemList = async (): Promise<CartItem[]> => {
  const data = await requestGet<ResponseCartItemList>({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.CART_LIST,
  });

  return data.content;
};

export const requestAddCartItem = async (productId: number, quantity: number = 1) => {
  await requestPost({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.CART_LIST,
    body: {
      productId,
      quantity,
    },
  });
};

export const requestDeleteCartItem = async (cartItemId: number) => {
  await requestDelete({
    baseUrl: BASE_URL.SHOP,
    endpoint: ENDPOINT.cartItemId(cartItemId),
    body: {
      id: cartItemId,
    },
  });
};
