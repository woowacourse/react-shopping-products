import { HttpResponse, http } from 'msw';

import APIClient from '@apis/APIClient';
import cartItems from '@mocks/handlers/shoppingCart/cartItems';
import products from '@mocks/handlers/products/mockData';

export const getShoppingCartHandler = http.get(`${APIClient.API_URL}/cart-items`, () => {
  return HttpResponse.json({ content: cartItems });
});

export const deleteCartItemHandler = http.delete(
  `${APIClient.API_URL}/cart-items/*`,
  ({ request }) => {
    const targetId = request.url.split('/').pop();

    const targetIndex = cartItems.findIndex((item) => item.id === Number(targetId));
    if (targetIndex === -1)
      return new HttpResponse(null, {
        status: 404,
        statusText: '없는 아이디',
      });

    cartItems.splice(targetIndex, 1);
  }
);

let nowCartItemId = 1;

export const postCartItemHandler = http.post(
  `${APIClient.API_URL}/cart-items`,
  async ({ request }) => {
    const parseRequestConfig = await request.json();

    if (!parseRequestConfig)
      return new HttpResponse(null, {
        status: 404,
        statusText: '잘못된 요청',
      });

    const id = (parseRequestConfig as { productId: number; quantity: number }).productId;
    const quantity = (parseRequestConfig as { productId: number; quantity: number }).quantity;

    const targetProduct = products.find((product) => product.id === id);

    if (!targetProduct) {
      return new HttpResponse(null, {
        status: 404,
        statusText: '잘못된 요청',
      });
    }

    cartItems.push({ id: nowCartItemId++, quantity, product: targetProduct });

    return HttpResponse.json({ content: cartItems });
  }
);
