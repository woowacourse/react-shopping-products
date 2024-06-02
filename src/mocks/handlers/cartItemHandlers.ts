import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import cartItemListData from '../datas/cartItemList.json';
import { CartItem } from '@/types/cartItem.type';
import { CART_ITEM_ENDPOINT } from '@/apis/endpoints';

const cartItems: CartItem[] = cartItemListData as CartItem[];

type AddCartItemRequestBody = {
  productId: number;
  quantity: number;
};

type AddCartItemParams = {
  id: string;
};

type DeleteCartItemParams = {
  id: string;
};

export const handlers = [
  http.get(`${BASE_URL.SHOP}${CART_ITEM_ENDPOINT.CART_LIST}`, ({ request }) => {
    const url = new URL(request.url);
    console.log(url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');

    const start = (page - 1) * size;
    const end = start + size;
    const paginatedCartItems = cartItems.slice(start, end);

    const totalPages = Math.ceil(cartItems.length / size);

    return HttpResponse.json({
      content: paginatedCartItems,
      totalPages,
    });
  }),

  // ⛔️ async 추가로 인한 이펙트 확인 안됨. ⛔️
  // ⛔️ as 로 인한 이펙트 확인 안됨. ⛔️
  http.post<AddCartItemParams>(
    `${BASE_URL.SHOP}${CART_ITEM_ENDPOINT.CART_LIST}/:id`,
    ({ params }) => {
      const productId = Number(params);

      const cartItem = cartItems.find(({ product }) => product.id === productId);

      if (cartItem)
        return HttpResponse.json(
          { error: `cartItem already exists; cartItemId=${cartItem.id}` },
          { status: 400 },
        );
      if (!productId) return HttpResponse.json({ error: `Invalid productId` }, { status: 400 });

      return HttpResponse.json({
        message: 'Success create',
      });
    },
  ),

  // 장바구니 아이템 삭제 delete
  http.delete<DeleteCartItemParams>(
    `${BASE_URL.SHOP}${CART_ITEM_ENDPOINT.CART_LIST}/:id`,
    ({ params }) => {
      const cartItemId = Number(params);
      const index = cartItems.findIndex((item) => item.id === cartItemId);

      if (index > -1) {
        cartItems.splice(index, 1);
        return HttpResponse.json({}, { status: 200 });
      }

      return HttpResponse.json({ error: '아이템 없음' }, { status: 404 });
    },
  ),
];
