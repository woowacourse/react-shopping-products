import { CartItem } from '../types/cart';
import { CART_ITEMS_ENDPOINT } from './endpoints';
import { FetchWithToken } from './fetchWithToken';

interface CartItemResponse {
  content: CartItem[];
}

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const data = await FetchWithToken.get<CartItemResponse>(`${CART_ITEMS_ENDPOINT}?size=1000`);

  return data.content;
};

export const addCartItem = async (productId: number) => {
  await FetchWithToken.post(CART_ITEMS_ENDPOINT, {
    headers: { 'Content-Type': 'application/json' },
    body: { productId, quantity: 1 },
  });
};

export const deleteCartItem = async (cartId: number) => {
  await FetchWithToken.delete(`${CART_ITEMS_ENDPOINT}/${cartId}`);
};

export const patchCartItemQuantity = async (cartId: number, quantity: number) => {
  await FetchWithToken.patch(`${CART_ITEMS_ENDPOINT}/${cartId}`, {
    headers: { 'Content-Type': 'application/json' },
    body: { quantity },
  });
};
