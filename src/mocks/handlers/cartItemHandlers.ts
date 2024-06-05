import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import cartItemListData from '../datas/cartItemList.json';
import { ENDPOINT } from '@/apis/endpoints';
import { ResponseCartItemList } from '@/apis/responseTypes';

const cartItems = cartItemListData as ResponseCartItemList;

type DeleteCartItemParams = {
  id: string;
};

export const cartItemHandlers = [
  http.get(`${BASE_URL.SHOP}${ENDPOINT.CART_ITEM}`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');

    const { content } = cartItems;

    const start = page * size;
    const end = start + size;
    const paginatedCartItems = content.slice(start, end);

    const totalPages = Math.ceil(content.length / size);

    return HttpResponse.json({
      content: paginatedCartItems,
      totalPages,
      last: false,
      pageable: {
        pageNumber: 1,
      },
    });
  }),

  // ⛔️ async 추가로 인한 이펙트 확인 안됨. ⛔️
  // ⛔️ as 로 인한 이펙트 확인 안됨. ⛔️
  http.post(`${BASE_URL.SHOP}${ENDPOINT.CART_ITEM}`, ({ params }) => {
    const productId = Number(params);

    const { content } = cartItems;

    const cartItem = content.find(({ product }) => product.id === productId);

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

    const { content } = cartItems;

    const index = content.findIndex((item) => item.id === cartItemId);

    if (index > -1) {
      content.splice(index, 1);
      return HttpResponse.json({}, { status: 200 });
    }

    return HttpResponse.json({ error: '아이템 없음' }, { status: 404 });
  }),

  http.patch(`${BASE_URL.SHOP}${ENDPOINT.CART_ITEM}/:id`, ({ params, request }) => {
    const cartItemId = Number(params);
    const { quantity } = request.body;
    const { content } = cartItems;

    const index = content.findIndex((item) => item.id === cartItemId);

    if (index > -1) {
      content[index].quantity = quantity;
      return HttpResponse.json(
        {
          message: 'Success create',
        },
        { status: 200 },
      );
    }
  }),
];
