import { http, HttpResponse } from 'msw';
import { cartDataStore } from '../data/cartData';
import { mockProducts } from '../data/productsData';
import { createErrorResponse } from '../utils/createErrorResponse';

const parseCartId = (id: string | ReadonlyArray<string>): number => {
  return parseInt(Array.isArray(id) ? id[0] : id);
};

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
      const body = await request.json();
      if (!body || typeof body !== 'object' || !('productId' in body) || !('quantity' in body)) {
        return createErrorResponse('INVALID_REQUEST', '유효하지 않은 요청 데이터입니다.', 400);
      }

      const { productId, quantity } = body;

      const product = mockProducts.find((p) => p.id === productId);
      if (!product) {
        return createErrorResponse('PRODUCT_NOT_FOUND', '상품을 찾을 수 없습니다.', 404);
      }

      if (product.quantity < quantity) {
        return createErrorResponse('OUT_OF_STOCK', '재고 수량을 초과하여 담을 수 없습니다.', 400);
      }

      const existingCartItem = cartDataStore.findByProductId(productId);
      if (existingCartItem) {
        return createErrorResponse('ALREADY_IN_CART', '이미 장바구니에 담긴 상품입니다.', 400);
      }

      const newCartItem = cartDataStore.add(productId, quantity);
      if (!newCartItem) {
        return createErrorResponse('INTERNAL_ERROR', '장바구니 추가 중 오류가 발생했습니다.', 500);
      }

      return HttpResponse.json(newCartItem, { status: 201 });
    } catch (error) {
      return createErrorResponse('INTERNAL_ERROR', '요청 처리 중 오류가 발생했습니다.', 500);
    }
  }),

  http.delete('*/cart-items/:id', ({ params }) => {
    const cartId = parseCartId(params.id);

    const cartItem = cartDataStore.findById(cartId);
    if (!cartItem) {
      return createErrorResponse('CART_ITEM_NOT_FOUND', '장바구니 아이템을 찾을 수 없습니다.', 404);
    }

    const success = cartDataStore.remove(cartId);
    if (!success) {
      return createErrorResponse('INTERNAL_ERROR', '장바구니 삭제 중 오류가 발생했습니다.', 500);
    }

    return new HttpResponse(null, { status: 204 });
  }),

  http.patch('*/cart-items/:id', async ({ params, request }) => {
    try {
      const cartId = parseCartId(params.id);
      const body = await request.json();
      if (!body || typeof body !== 'object' || !('quantity' in body)) {
        return createErrorResponse('INVALID_REQUEST', '유효하지 않은 요청 데이터입니다.', 400);
      }

      const { quantity } = body;

      const cartItem = cartDataStore.findById(cartId);
      if (!cartItem) {
        return createErrorResponse(
          'CART_ITEM_NOT_FOUND',
          '장바구니 아이템을 찾을 수 없습니다.',
          404,
        );
      }

      if (cartItem.product.quantity < quantity) {
        return createErrorResponse('OUT_OF_STOCK', '재고 수량을 초과하여 담을 수 없습니다.', 400);
      }

      const updatedCartItem = cartDataStore.updateQuantity(cartId, quantity);
      if (!updatedCartItem) {
        return createErrorResponse('INTERNAL_ERROR', '수량 업데이트 중 오류가 발생했습니다.', 500);
      }

      return HttpResponse.json(updatedCartItem);
    } catch (error) {
      return createErrorResponse('INTERNAL_ERROR', '요청 처리 중 오류가 발생했습니다.', 500);
    }
  }),
];
