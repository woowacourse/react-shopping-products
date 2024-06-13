import { generateBasicToken } from './auth';

import { CartItem, FetchAdjustCartItemQuantityProps } from '../types/cart';
import { CART_ITEMS_ENDPOINT } from './endpoints';
import { USER_ID, USER_PASSWORD } from './userInformation';
import { MAX_CART_ITEMS_SIZE } from '../constants/pagination';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const params = new URLSearchParams();

  params.append('size', String(MAX_CART_ITEMS_SIZE));

  const response = await fetch(`${CART_ITEMS_ENDPOINT}?${String(params)}`, {
    method: 'GET',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch cart items');
  }

  const data = await response.json();

  return data.content;
};

export const fetchAddCartItem = async (productId: number): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(CART_ITEMS_ENDPOINT, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: productId,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
};

export const fetchDeleteCartItem = async (cartItemId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to delete cart items');
  }
};

export const fetchAdjustCartItemQuantity = async ({
  cartItemId,
  quantity,
}: FetchAdjustCartItemQuantityProps): Promise<void> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: 'PATCH',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error('Failed to add cart item');
  }
};
