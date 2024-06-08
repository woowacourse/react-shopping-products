import Fetcher from './Fetcher';
import { BASE_URL } from '@/constants/baseUrl';
import { API_ROUTES } from '@/constants/route';
import token from './token';
import { CartItemListData, AdjustCartItemQuantity } from '@/types';

const MAX_CART_ITEM_LENGTH = 2_000;

export const getAllCartItemList = async () => {
  const data = await Fetcher.get<CartItemListData>(
    `${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}?size=${MAX_CART_ITEM_LENGTH}`,
    { headers: { Authorization: token } },
  );

  return data.content;
};

export const deleteCartItemById = async (cartItemId: number) => {
  await Fetcher.delete(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}/${cartItemId}`, {
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });
};

export const addCartItemByProductId = async (productId: number, quantity = 1) => {
  await Fetcher.post(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}`, {
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });
};

export const adjustCartItemQuantity = async ({ cartItemId, quantity }: AdjustCartItemQuantity) => {
  await Fetcher.patch(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}/${cartItemId}`, {
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      quantity,
    }),
  });
};
