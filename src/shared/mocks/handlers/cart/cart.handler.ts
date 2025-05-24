import { http, HttpResponse } from 'msw';

import { ENV } from '@/api/env';

import { cartData } from './cart.data';

import { productsData } from '../product/products.data';

const cartDataCopy = { ...cartData, content: [...cartData.content] };

export const cartHandlers = [
  http.get(`${ENV.BASE_URL}cart-items`, () => {
    return HttpResponse.json(cartDataCopy);
  }),

  http.post(`${ENV.BASE_URL}cart-items`, async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: string;
      quantity: number;
    };
    const productToAdd = productsData.content.find((product) => product.id === Number(productId));

    const existingCartItemIndex = cartDataCopy.content.findIndex(
      (item) => item?.id === Number(productId)
    );

    if (existingCartItemIndex !== -1) {
      cartDataCopy.content[existingCartItemIndex].quantity += quantity;
    }

    if (existingCartItemIndex === -1 && productToAdd) {
      const newCartItem = {
        id: productToAdd.id,
        quantity: quantity,
        product: productToAdd,
      };
      cartDataCopy.content.push(newCartItem);
    }

    return HttpResponse.json({ success: true, productId, quantity });
  }),

  http.patch(`${ENV.BASE_URL}cart-items/:id`, async ({ request }) => {
    const cartItemId = Number(request.url.split('/').pop());
    const { quantity } = (await request.json()) as { quantity: number };
    const cartItemIndex = cartDataCopy.content.findIndex((item) => item.id === cartItemId);
    const cartItem = cartDataCopy.content[cartItemIndex];
    if (cartItem) {
      cartItem.quantity = quantity;
    }
    return HttpResponse.json({ success: true });
  }),

  http.delete(`${ENV.BASE_URL}cart-items/:id`, async ({ request }) => {
    const cartItemId = Number(request.url.split('/').pop());
    const cartItemIndex = cartDataCopy.content.findIndex((item) => item.id === cartItemId);

    if (cartItemIndex !== -1) {
      cartDataCopy.content.splice(cartItemIndex, 1);
    }

    return HttpResponse.json({ success: true });
  }),
];
