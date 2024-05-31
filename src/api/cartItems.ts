import { generateBasicToken } from './auth';

import { CartItem } from '../types/cart';
import { CART_ITEMS_ENDPOINT } from './endpoints';
import { USER_ID, USER_PASSWORD } from './userInformation';

export const fetchCartItems = async (): Promise<CartItem[]> => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(CART_ITEMS_ENDPOINT, {
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

export const fetchDeleteCartItem = async (cartId: number) => {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartId}`, {
    method: 'DELETE',
    headers: { Authorization: token },
  });

  if (!response.ok) {
    throw new Error('Failed to delete cart items');
  }
};
