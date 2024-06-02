import { HttpResponse, http } from 'msw';

import APIClient from '@apis/APIClient';
import cartItems from '@mocks/handlers/shoppingCart/cartItems';
import products from '@mocks/handlers/products/mockData';
import { getHTTPResponseConfig } from '@mocks/utils/getHTTPResponseConfig';

export const getShoppingCartHandler = http.get(`${APIClient.API_URL}/cart-items`, () => {
  return HttpResponse.json({ content: cartItems });
});

export const deleteCartItemHandler = http.delete(
  `${APIClient.API_URL}/cart-items/*`,
  ({ request }) => {
    const targetId = request.url.split('/').pop();

    const targetIndex = cartItems.findIndex((item) => item.id === Number(targetId));
    if (targetIndex === -1) return getHTTPResponseConfig(404, '잘못된 아이디 입니다.');

    cartItems.splice(targetIndex, 1);
    return new HttpResponse(null);
  }
);

let nowCartItemId = 1;

export const postCartItemHandler = http.post(
  `${APIClient.API_URL}/cart-items`,
  async ({ request }) => {
    const parseRequestConfig = await request.json();

    if (!parseRequestConfig) return getHTTPResponseConfig(404, 'Request body가 필요합니다.');

    const id = (parseRequestConfig as { productId: number; quantity: number }).productId;
    const quantity = (parseRequestConfig as { productId: number; quantity: number }).quantity;

    const targetProduct = products.find((product) => product.id === id);

    if (!targetProduct)
      return getHTTPResponseConfig(404, '장바구니 내 존재하지 않는 아이디 입니다.');

    if (cartItems.some((item) => item.product.id === id))
      return getHTTPResponseConfig(404, '이미 장바구니에 존재하는 아이디 입니다.');

    cartItems.push({ id: nowCartItemId++, quantity, product: targetProduct });

    return HttpResponse.json({ content: cartItems });
  }
);
