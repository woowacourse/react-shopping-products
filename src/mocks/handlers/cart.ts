import { http, HttpResponse } from 'msw';
import { AddCartItemsProps } from '../../services/cartItemServices';
import { MOCK_CART_ITEMS, MOCK_PRODUCTS } from '../dummy';

interface AddCartItemsParams {
  id: string;
}

const handlers = [
  http.post<never, AddCartItemsProps>('/cart-items', async ({ request }) => {
    const { productId, quantity } = await request.json();
    const targetProduct = MOCK_PRODUCTS.find((product) => product.id === productId);

    if (!targetProduct) {
      return HttpResponse.json(
        { errorCode: 'NOT_FOUND', message: '상품을 찾을 수 없습니다. 상품 id를 확인해주세요.' },
        { status: 404 },
      );
    }

    if (quantity > targetProduct.quantity) {
      return HttpResponse.json(
        { errorCode: 'OUT_OF_STOCK', message: '재고 수량을 초과하여 담을 수 없습니다.' },
        { status: 400 },
      );
    }

    return HttpResponse.json({ message: '장바구니 담기에 성공했습니다.' }, { status: 201 });
  }),

  http.patch<AddCartItemsParams, AddCartItemsProps>(
    '/cart-items/:id',
    async ({ params, request }) => {
      const { quantity } = await request.json();
      const { id } = params;
      const targetIndex = MOCK_CART_ITEMS.findIndex((cart) => cart.id === Number(id));
      if (targetIndex === -1) {
        return HttpResponse.json(
          {
            errorCode: 'NOT_FOUND',
            message: '장바구니의 상품을 찾을 수 없습니다. 장바구니 id를 확인해주세요.',
          },
          { status: 404 },
        );
      }

      const targetItem = MOCK_CART_ITEMS[targetIndex];
      MOCK_CART_ITEMS[targetIndex] = { ...targetItem, quantity };

      return HttpResponse.json(
        { message: '장바구니 아이템 수량 변경에 성공했습니다.' },
        { status: 200 },
      );
    },
  ),
];

export default handlers;
