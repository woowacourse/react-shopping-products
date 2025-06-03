import { http, HttpResponse } from 'msw';
import { AddCartItemsProps } from '../../services/cartItemServices';
import { MOCK_CART_ITEMS, MOCK_PRODUCTS } from '../dummy';
import { CartItemType } from '../../types/data';

interface AddCartItemsParams {
  id: string;
}

const addBaseURL = (endpoint: string) => {
  return `${import.meta.env.VITE_API_BASE_URL}${endpoint}`;
};

const handlers = [
  http.get<never, CartItemType[]>(addBaseURL('/cart-items'), () => {
    return HttpResponse.json({ content: MOCK_CART_ITEMS }, { status: 200 });
  }),

  http.post<never, AddCartItemsProps>(addBaseURL('/cart-items'), async ({ request }) => {
    const { productId, quantity: addQuantity } = await request.json();
    const targetIndex = MOCK_PRODUCTS.findIndex((product) => product.id === productId);
    if (targetIndex === -1) {
      return HttpResponse.json(
        { errorCode: 'NOT_FOUND', message: '상품을 찾을 수 없습니다. 상품 id를 확인해주세요.' },
        { status: 404 },
      );
    }

    const targetProduct = MOCK_PRODUCTS[targetIndex];
    if (addQuantity > targetProduct.quantity) {
      return HttpResponse.json(
        { errorCode: 'OUT_OF_STOCK', message: '재고 수량을 초과하여 담을 수 없습니다.' },
        { status: 400 },
      );
    }

    MOCK_CART_ITEMS.push({
      id: Math.max(...MOCK_CART_ITEMS.map(({ id }) => id)) + 1,
      quantity: addQuantity,
      product: targetProduct,
    });

    MOCK_PRODUCTS[targetIndex] = {
      ...targetProduct,
      quantity: targetProduct.quantity - addQuantity,
    };

    return HttpResponse.json({ message: '장바구니 담기에 성공했습니다.' }, { status: 201 });
  }),

  http.patch<AddCartItemsParams, AddCartItemsProps>(
    addBaseURL('/cart-items/:id'),
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

      const targetProduct = MOCK_PRODUCTS[targetIndex];
      if (quantity > targetProduct.quantity) {
        return HttpResponse.json(
          { errorCode: 'OUT_OF_STOCK', message: '재고 수량을 초과하여 담을 수 없습니다.' },
          { status: 400 },
        );
      }

      if (quantity < 1) {
        return HttpResponse.json(
          { errorCode: 'OUT_OF_STOCK', message: '장바구니 수량은 최소 1이상 담아야 합니다.' },
          { status: 400 },
        );
      }

      MOCK_CART_ITEMS[targetIndex] = { ...MOCK_CART_ITEMS[targetIndex], quantity };

      return HttpResponse.json(
        { message: '장바구니 아이템 수량 변경에 성공했습니다.' },
        { status: 200 },
      );
    },
  ),

  http.delete(addBaseURL('/cart-items/:id'), async ({ params }) => {
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

    MOCK_CART_ITEMS.splice(targetIndex, 1);

    return HttpResponse.json(
      { message: '장바구니 아이템 수량 변경에 성공했습니다.' },
      { status: 200 },
    );
  }),
];

export default handlers;
