import { http, HttpResponse } from 'msw';
import { cartDataStore } from '../data/cartData';
import { mockProducts } from '../data/productsData';

export const cartHandlers = [
  http.get('*/cart-items', ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '50');

    const allCartItems = cartDataStore.getAll();

    const startIndex = page * size;
    const endIndex = startIndex + size;
    const paginatedItems = allCartItems.slice(startIndex, endIndex);

    const response = {
      content: paginatedItems,
      totalElements: allCartItems.length,
      totalPages: Math.ceil(allCartItems.length / size),
      size: size,
      number: page,
    };

    return HttpResponse.json(response);
  }),

  http.post('*/cart-items', async ({ request }) => {
    try {
      const body = (await request.json()) as { productId: number; quantity: number };
      const { productId, quantity } = body;

      const product = mockProducts.find((p) => p.id === productId);
      if (!product) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'PRODUCT_NOT_FOUND',
            message: '상품을 찾을 수 없습니다.',
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      if (product.quantity < quantity) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      const existingCartItem = cartDataStore.findByProductId(productId);
      if (existingCartItem) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'ALREADY_IN_CART',
            message: '이미 장바구니에 담긴 상품입니다.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      const newCartItem = cartDataStore.add(productId, quantity);
      if (!newCartItem) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'INTERNAL_ERROR',
            message: '장바구니 추가 중 오류가 발생했습니다.',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      return HttpResponse.json(newCartItem, { status: 201 });
    } catch (error) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'INTERNAL_ERROR',
          message: '요청 처리 중 오류가 발생했습니다.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }),

  http.delete('*/cart-items/:id', ({ params }) => {
    const cartId = parseInt(params.id as string);

    const cartItem = cartDataStore.findById(cartId);
    if (!cartItem) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'CART_ITEM_NOT_FOUND',
          message: '장바구니 아이템을 찾을 수 없습니다.',
        }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    const success = cartDataStore.remove(cartId);
    if (!success) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'INTERNAL_ERROR',
          message: '장바구니 삭제 중 오류가 발생했습니다.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch('*/cart-items/:id', async ({ params, request }) => {
    try {
      const cartId = parseInt(params.id as string);
      const body = (await request.json()) as { quantity: number };
      const { quantity } = body;

      const cartItem = cartDataStore.findById(cartId);
      if (!cartItem) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'CART_ITEM_NOT_FOUND',
            message: '장바구니 아이템을 찾을 수 없습니다.',
          }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      if (cartItem.product.quantity < quantity) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.',
          }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      const updatedCartItem = cartDataStore.updateQuantity(cartId, quantity);
      if (!updatedCartItem) {
        return new HttpResponse(
          JSON.stringify({
            errorCode: 'INTERNAL_ERROR',
            message: '수량 업데이트 중 오류가 발생했습니다.',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          },
        );
      }

      return HttpResponse.json(updatedCartItem);
    } catch (error) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'INTERNAL_ERROR',
          message: '요청 처리 중 오류가 발생했습니다.',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }),
];
