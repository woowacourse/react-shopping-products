import { CartResponse, PostCartItemRequestBody } from '../types/fetch';
import { ApiClient, token } from './ApiClient';
import { ENDPOINTS_CART, ENDPOINTS_REMOVE_CART } from './endpoints';

const apiClient = new ApiClient({
  Authorization: token,
  'Content-Type': 'application/json',
});

export const postAddItems = async (productId: number) => {
  return await apiClient.post(`${ENDPOINTS_CART}`, {
    productId,
    quantity: 1,
  } satisfies PostCartItemRequestBody);
};

export const fetchToDeleteCartItem = async (cartId: number) => {
  return await apiClient.delete(`${ENDPOINTS_REMOVE_CART(cartId)}`);
};

export const fetchCartItems = async () => {
  return await apiClient.get<CartResponse>(`${ENDPOINTS_CART}?page=0&size=100`);
};

export const patchCartQuantity = async ({
  cartId,
  quantity,
}: {
  cartId: number;
  quantity: number;
}) => {
  const requestBody = { quantity };
  return await apiClient.patch(`${ENDPOINTS_CART}/${cartId}`, requestBody);
};
