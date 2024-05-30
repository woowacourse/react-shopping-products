import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@/apis/baseUrl';
import { ENDPOINT } from '@/apis/endpoints';
import productListData from './productList.json';
import cartItemListData from './cartItemList.json';
import { Category, SortType, Product, CartItem } from '@/types';

let cartItems: CartItem[] = cartItemListData as CartItem[];

// type AddCartItemRequestBody = {
//   productId: number;
//   quantity: number;
// };

// type AddCartItemParams = {
//   id: string;
// };

export const handlers = [
  http.get(`${BASE_URL.SHOP}${ENDPOINT.PRODUCT_LIST}`, ({ request }) => {
    const url = new URL(request.url);
    const products: Product[] = productListData as Product[];

    const page = Number(url.searchParams.get('page') ?? '1');
    const size = Number(url.searchParams.get('size') ?? '20');
    const category = url.searchParams.get('category') as Category;
    const sortType = url.searchParams.get('sort') as SortType;

    // 카테고리와 정렬 기준에 맞게 상품 목록 정리
    const productListFilteredCategory: Product[] = !category
      ? products
      : products.filter((product) => product.category === category);
    const sortedProductList = [...productListFilteredCategory].sort((a, b) =>
      sortType === 'asc' ? a.price - b.price : b.price - a.price,
    );

    // 필요한 길이만큼 자르기
    const start = (page - 1) * size;
    const end = start + size;
    const paginatedProducts = sortedProductList.slice(start, end);

    // 입력받은 size를 기반으로 한 총 페이지수 계산
    const totalPages = Math.ceil(products.length / size);

    return HttpResponse.json({
      content: paginatedProducts,
      totalPages,
    });
  }),

  http.get(`${BASE_URL.SHOP}${ENDPOINT.CART_LIST}`, ({ request }) => {
    const url = new URL(request.url);

    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');

    const start = (page - 1) * size;
    const end = start + size;
    const paginatedCartItems = cartItemListData.slice(start, end);

    const totalPages = Math.ceil(cartItemListData.length / size);

    return HttpResponse.json({
      content: paginatedCartItems,
      totalPages,
    });
  }),

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

  // 장바구니 아이템 삭제 delete
  http.delete(`${BASE_URL.SHOP}/cart-items/:id`, ({ params }) => {
    const id = Number(params.id);
    const index = cartItems.findIndex((item) => item.id === id);

    console.log('index : ', index);

    if (index > -1) {
      cartItems.splice(index, 1);
      return HttpResponse.json({}, { status: 200 });
    }

    return HttpResponse.json({ error: '아이템 없음' }, { status: 404 });
  }),
];
