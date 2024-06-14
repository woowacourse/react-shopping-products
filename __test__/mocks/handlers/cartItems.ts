import { http, HttpResponse } from 'msw';

import cartItems from '../cartItems.json';
import products from '../products.json';
import { InternalServerError, NotFoundError, Success } from './response';
import { CART_ITEMS_ENDPOINT } from '../../../src/api/endpoints';
import { INITIAL_PAGE_NUMBER } from '../../../src/constants/paginationRules';

export const cartItemsHandlers = [
  http.get(CART_ITEMS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get('size')) ?? 20;

    const start = INITIAL_PAGE_NUMBER;
    const end = start + size;

    const paginatedCartItems = cartItems.slice(start, end);

    return HttpResponse.json(paginatedCartItems, { status: 200 });
  }),

  http.post(CART_ITEMS_ENDPOINT, async ({ request }) => {
    const body = (await request.json()) as {
      productId: number;
      quantity: number;
    };
    const productId = Number(body.productId);
    const quantity = Number(body.quantity);

    if (productId !== 0 && !productId) return InternalServerError();

    const newCartItemId = cartItems[cartItems.length - 1].id + 1;
    const product = products.find((product) => product.id === productId);

    if (!product) return NotFoundError();

    cartItems.push({ id: newCartItemId, quantity, product });

    return Success();
  }),

  http.delete(`${CART_ITEMS_ENDPOINT}/:cartItemId`, ({ params }) => {
    const cartItemId = Number(params.cartItemId);

    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === Number(cartItemId)
    );

    if (cartItemIndex !== -1) {
      cartItems.splice(cartItemIndex, cartItemIndex + 1);
      return Success();
    } else {
      return NotFoundError();
    }
  }),

  http.patch(
    `${CART_ITEMS_ENDPOINT}/:cartItemId`,
    async ({ request, params }) => {
      const { quantity } = (await request.json()) as { quantity: number };
      const cartItemId = Number(params.cartItemId);

      const cartItemIndex = cartItems.findIndex(
        (cartItem) => cartItem.id === Number(cartItemId)
      );

      if (cartItemIndex !== -1) {
        if (quantity === 0) cartItems.splice(cartItemIndex, cartItemIndex + 1);
        else cartItems[cartItemIndex].quantity = quantity;
        return Success();
      } else {
        return NotFoundError();
      }
    }
  ),
];
