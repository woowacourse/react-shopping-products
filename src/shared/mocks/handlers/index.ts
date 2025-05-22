import { http, HttpResponse } from 'msw';

import { ENV } from '@/api/env';

import { cartData } from './cart.data';
import { productsData } from './products.data';

let productsDataCopy = [...productsData.content];
const cartDataCopy = { ...cartData, content: [...cartData.content] };

export const handlers = [
  http.get(`${ENV.BASE_URL}products`, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');
    const category = url.searchParams.get('category');

    if (category === 'ALL') {
      productsDataCopy = [...productsData.content];
    }

    if (category !== 'ALL' && category) {
      productsDataCopy = productsDataCopy.filter((item) => item.category === category);
    }

    if (sort?.includes('asc')) {
      productsDataCopy.sort((a, b) => a.price - b.price);
    }

    if (sort?.includes('desc')) {
      productsDataCopy.sort((a, b) => b.price - a.price);
    }

    const result = {
      ...productsData,
      content: productsDataCopy,
    };

    return HttpResponse.json(result);
  }),

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
