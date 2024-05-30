import { ENDPOINT } from '../constants/apis';
import { CartItem } from '../types/cartItem';
import { generateBasicToken } from '../utils/generateBasicToken';
import { fetchClient } from './fetchClient';

interface CartItemResponse {
  content: CartItem[];
  totalElements: number;
}

function createCartItemUrl(totalItemCount?: number) {
  const additionalUrl = totalItemCount ? `?size=${totalItemCount}` : '';

  return `${ENDPOINT.CART_ITEMS}${additionalUrl}`;
}

export async function getCartItems(totalItemCount?: number): Promise<CartItemResponse> {
  const token = generateBasicToken();
  const cartItemUrl = createCartItemUrl(totalItemCount);

  const response = await fetchClient({ url: cartItemUrl, method: 'GET', token });
  return {
    content: response.content,
    totalElements: response.totalElements,
  };
}

export async function addCartItem(productId: number) {
  const token = generateBasicToken();
  const body = { productId, quantity: 1 };

  await fetchClient({
    url: ENDPOINT.CART_ITEMS,
    method: 'POST',
    body,
    token,
  });
}

export async function removeCartItem(cartItemId: number) {
  const token = generateBasicToken();
  const url = ENDPOINT.DELETE_CART_ITEM(cartItemId);

  await fetchClient({ url, method: 'DELETE', token });
}
