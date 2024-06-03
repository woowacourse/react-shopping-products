import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import cartItemListData from '../datas/cartItemList.json';
import { CartItem } from '@/types/cartItem.type';
import { ENDPOINT } from '@/apis/endpoints';

const cartItems: CartItem[] = cartItemListData as CartItem[];

type DeleteCartItemParams = {
  id: string;
};

export const cartItemHandlers = [
  http.get(`${BASE_URL.SHOP}${ENDPOINT.CART_ITEM}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');

    const start = page * size;
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
  http.post(`${BASE_URL.SHOP}${ENDPOINT.CART_ITEM}`, ({ params }) => {
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
  }),

  // 장바구니 아이템 삭제 delete
  http.delete<DeleteCartItemParams>(`${BASE_URL.SHOP}${ENDPOINT.CART_ITEM}/:id`, ({ params }) => {
    const cartItemId = Number(params);
    const index = cartItems.findIndex((item) => item.id === cartItemId);

    if (index > -1) {
      cartItems.splice(index, 1);
      return HttpResponse.json({}, { status: 200 });
    }

    return HttpResponse.json({ error: '아이템 없음' }, { status: 404 });
  }),
];
