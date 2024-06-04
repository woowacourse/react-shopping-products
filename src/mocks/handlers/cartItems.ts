import { http, HttpResponse } from 'msw';
import { CART_ITEMS_ENDPOINT } from '../../api/endpoints';
import { INITIAL_PAGE_NUMBER } from '../../constants/paginationRules';

import cartItems from '../cartItems.json';
import products from '../products.json';
import { InternalServerError, NotFoundError, Success } from './response';

interface PostCartItemRequestBody {
  productId: number;
  quantity: number;
}

export const cartItemsHandlers = [
  http.get(CART_ITEMS_ENDPOINT, ({ request }) => {
    const url = new URL(request.url);
    const size = Number(url.searchParams.get('size')) ?? 20;

    const start = INITIAL_PAGE_NUMBER;
    const end = start + size;

    const paginatedCartItems = cartItems.slice(start, end);

    return HttpResponse.json(paginatedCartItems);
  }),

  http.post(CART_ITEMS_ENDPOINT, async ({ request }) => {
    const body = (await request.json()) as PostCartItemRequestBody;
    const productId = Number(body.productId);
    const quantity = Number(body.quantity);

    if (productId !== 0 && !productId) return InternalServerError;

    const newCartItemId = cartItems[cartItems.length - 1].id + 1;
    const product = products.find((product) => product.id === productId);

    if (!product) return NotFoundError;

    cartItems.push({ id: newCartItemId, quantity, product });
    return Success;
  }),

  http.delete(`${CART_ITEMS_ENDPOINT}/:cartItemId`, ({ params }) => {
    const { cartItemId } = params;

    const cartItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === Number(cartItemId)
    );

    if (cartItemIndex !== -1) {
      cartItems.splice(cartItemIndex, cartItemIndex + 1);
      return Success;
    } else {
      return NotFoundError;
    }
  }),
];
