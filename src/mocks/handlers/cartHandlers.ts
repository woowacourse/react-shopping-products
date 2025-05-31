import { http, HttpResponse } from 'msw';
import { CartItem, mockCartItems } from '../datas/mockCartItem';
import { mockProducts } from '../datas/mockProducts';

export const cartHandlers = [
  http.get(`${import.meta.env.VITE_API_URL}/cart-items`, ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const response: { content: CartItem[] } = {
      content: mockCartItems,
    };

    return HttpResponse.json(response);
  }),

  http.patch(`${import.meta.env.VITE_API_URL}/cart-items/:cartId`, async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const cartId = Number(params.cartId);
    const requestBody = (await request.json()) as { quantity: number };
    const newQuantity = requestBody.quantity;
    const cartItemIndex = mockCartItems.findIndex((cart) => cart.id === cartId);

    if (cartItemIndex === -1) {
      return HttpResponse.json(
        {
          errorCode: 'CART_ITEM_NOT_FOUND',
          message: '장바구니 아이템을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    const cartItem = mockCartItems[cartItemIndex];

    if (newQuantity > cartItem.product.quantity) {
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        },
        { status: 400 },
      );
    }

    if (newQuantity < 0) {
      return HttpResponse.json(
        {
          errorCode: 'INVALID_QUANTITY',
          message: '수량은 1개 이상이어야 합니다.',
        },
        { status: 400 },
      );
    }

    mockCartItems[cartItemIndex] = {
      ...cartItem,
      quantity: newQuantity,
    };

    return HttpResponse.json(mockCartItems[cartItemIndex]);
  }),

  http.post(`${import.meta.env.VITE_API_URL}/cart-items`, async ({ request }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const requestBody = (await request.json()) as { productId: number; quantity: number };
    const { productId, quantity } = requestBody;

    const product = mockProducts.find((p) => p.id === productId);

    if (!product) {
      return HttpResponse.json(
        {
          errorCode: 'PRODUCT_NOT_FOUND',
          message: '상품을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    if (quantity > product.quantity) {
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        },
        { status: 400 },
      );
    }

    if (quantity <= 0) {
      return HttpResponse.json(
        {
          errorCode: 'INVALID_QUANTITY',
          message: '수량은 1개 이상이어야 합니다.',
        },
        { status: 400 },
      );
    }

    const existingCartItemIndex = mockCartItems.findIndex((cart) => cart.product.id === productId);

    if (existingCartItemIndex !== -1) {
      const existingItem = mockCartItems[existingCartItemIndex];
      const newQuantity = existingItem.quantity + quantity;

      if (newQuantity > product.quantity) {
        return HttpResponse.json(
          {
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.',
          },
          { status: 400 },
        );
      }

      mockCartItems[existingCartItemIndex] = {
        ...existingItem,
        quantity: newQuantity,
      };

      return HttpResponse.json(mockCartItems[existingCartItemIndex], { status: 200 });
    } else {
      const newCartItem: CartItem = {
        id: Math.max(...mockCartItems.map((item) => item.id)) + 1,
        quantity,
        product,
      };

      mockCartItems.push(newCartItem);

      return HttpResponse.json(newCartItem, { status: 201 });
    }
  }),

  http.delete(`${import.meta.env.VITE_API_URL}/cart-items/:id`, async ({ request, params }) => {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader) {
      return HttpResponse.json({ message: '인증이 필요합니다.' }, { status: 401 });
    }

    const cartItemId = parseInt(params.id as string);

    if (isNaN(cartItemId)) {
      return HttpResponse.json(
        {
          errorCode: 'INVALID_ID',
          message: '유효하지 않은 장바구니 아이템 ID입니다.',
        },
        { status: 400 },
      );
    }

    const cartItemIndex = mockCartItems.findIndex((item) => item.id === cartItemId);

    if (cartItemIndex === -1) {
      return HttpResponse.json(
        {
          errorCode: 'CART_ITEM_NOT_FOUND',
          message: '장바구니에서 해당 상품을 찾을 수 없습니다.',
        },
        { status: 404 },
      );
    }

    const deletedItem = mockCartItems[cartItemIndex];
    mockCartItems.splice(cartItemIndex, 1);

    return HttpResponse.json(
      {
        message: '장바구니에서 상품이 삭제되었습니다.',
        deletedItem,
      },
      { status: 200 },
    );
  }),
];
