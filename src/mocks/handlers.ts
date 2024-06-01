import { http, HttpResponse } from 'msw';
import productListData from './productList.json';
import { API_ROUTES } from '@/constants/route';
import { BASE_URL } from '@/apis/baseUrl';

// type AddCartItemRequestBody = {
//   productId: number;
//   quantity: number;
// };

// type AddCartItemParams = {
//   id: string;
// };

export const handlers = [
  http.get(`${BASE_URL.PRODUCT}${API_ROUTES.PRODUCT_LIST}?page=0&size=20`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '20';
    const start = parseInt(page, 10) * parseInt(size, 10);
    const end = start + parseInt(size, 10);

    return HttpResponse.json({
      content: productListData.slice(start, end),
    });
  }),

  // http.get(`${BASE_URL.SHOP}${ENDPOINT.CART_LIST}`, ({ request }) => {
  //   const url = new URL(request.url);

  //   const page = Number(url.searchParams.get('page') || '0');
  //   const size = Number(url.searchParams.get('size') || '20');

  //   const start = (page - 1) * size;
  //   const end = start + size;
  //   const paginatedCartItems = cartItemListData.slice(start, end);

  //   const totalPages = Math.ceil(cartItemListData.length / size);

  //   return HttpResponse.json({
  //     content: paginatedCartItems,
  //     totalPages,
  //   });
  // }),

  // ⛔️ async 추가로 인한 이펙트 확인 안됨. ⛔️
  // ⛔️ as 로 인한 이펙트 확인 안됨. ⛔️
  // http.post<AddCartItemParams, AddCartItemRequestBody>(
  //   `${BASE_URL.SHOP}${ENDPOINT.CART_LIST}/:id`,
  //   ({ params, request }) => {
  //     const productId = Number(params);
  //     const cartItem = cartItems.find(({ product }) => product.id === productId);

  //     if (cartItem)
  //       return HttpResponse.json(
  //         { error: `cartItem already exists; cartItemId=${cartItem.id}` },
  //         { status: 400 },
  //       );
  //     if (!productId) return HttpResponse.json({ error: `Invalid productId` }, { status: 400 });

  //     return HttpResponse.json({
  //       message: 'Success create',
  //     });
  //   },
  // ),

  // // 장바구니 아이템 삭제 delete
  // http.delete(`${BASE_URL.SHOP}/cart-items/:id`, ({ params }) => {
  //   const id = Number(params.id);
  //   const index = cartItems.findIndex((item) => item.id === id);

  //   console.log('index : ', index);

  //   if (index > -1) {
  //     cartItems.splice(index, 1);
  //     return HttpResponse.json({}, { status: 200 });
  //   }

  //   return HttpResponse.json({ error: '아이템 없음' }, { status: 404 });
  // }),
];
