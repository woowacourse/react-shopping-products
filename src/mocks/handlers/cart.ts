import { http, HttpResponse } from 'msw';
import { AddCartItemsProps } from '../../services/cartItemServices';
import { MOCK_PRODUCTS } from '../dummy';

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
];

export default handlers;
