import Fetcher from './Fetcher';
import { BASE_URL } from '@/constants/baseUrl';
import { API_ROUTES } from '@/constants/route';
import token from './token';

export const deleteCartItemById = async (cartItemId: number) => {
  try {
    await Fetcher.delete(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}/${cartItemId}`, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};

export const addCartItemByProductId = async (productId: number, quantity = 1) => {
  try {
    await Fetcher.post(`${BASE_URL.PRODUCT}${API_ROUTES.CART_ITEM}`, {
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId,
        quantity,
      }),
    });
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
  }
};
