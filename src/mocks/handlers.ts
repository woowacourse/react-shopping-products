import { HttpResponse, http, StrictRequest } from 'msw';

import { ENDPOINTS_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { CartResponse, ProductResponse } from '../types/fetch';
import productSorter from '../utils/productSorter';

import { mockCart as mockCartResponse } from './cart';
import { mockProductsResponse } from './products';

interface RequestIdResponse {
  productId: number;
  quantity: number;
}

const filterProductHandler = (
  productCopy: ProductResponse,
  category: string | null,
) => {
  return category
    ? productCopy.content.filter((product) => product.category === category)
    : productCopy.content;
};

const sortProductHandler = (
  sortings: string[],
  productCopy: ProductResponse,
) => {
  return sortings.length > 0
    ? productSorter(sortings, productCopy)
    : productCopy;
};

const sortByIdCartItemsHandler = (cartItemsCopy: CartResponse) => {
  const newCartItems = Object.assign({}, cartItemsCopy);
  return newCartItems.content.sort((a, b) => a.id - b.id);
};

export const handlers = [
  http.get(ENDPOINTS_PRODUCTS, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const sortings = url.searchParams.getAll('sort');
    const category = url.searchParams.get('category');

    const productCopy = Object.assign({}, mockProductsResponse);
    productCopy.content = filterProductHandler(productCopy, category);

    const productSorted = sortProductHandler(sortings, productCopy);

    const start = page * size;
    const end = (page + 1) * size;
    const productSliced = Object.assign({}, productSorted);
    productSliced.content = productSorted.content.slice(start, end);
    productSliced.last = productSliced.content.at(-1)!.id === 36;

    return HttpResponse.json(productSliced);
  }),

  // 카트에 상품 담기
  // 상품 담는 api 호출
  // -> cart-items (GET) 호출 대신 cart.json에 mock data 추가
  // -> mock data에서 id값이 같은 것 찾기
  http.post(
    `${ENDPOINTS_CART}`,
    async ({ request }: { request: StrictRequest<number> }) => {
      const requestId = (await request.json()) as unknown as RequestIdResponse;
      const findProduct = mockProductsResponse.content.find(
        (product) => product.id === (requestId.productId as number),
      );

      if (findProduct) {
        const data = {
          id: Math.random() * 1000,
          quantity: 1,
          product: findProduct,
        };
        mockCartResponse.content = [...mockCartResponse.content, data];
      }
      return HttpResponse.json(mockCartResponse);
    },
  ),
  /**
   * 장바구니 상품 목록 가져오기
   */
  http.get(`${ENDPOINTS_CART}`, async ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));

    const cartItemsSorted = Object.assign({}, mockCartResponse);
    cartItemsSorted.content = sortByIdCartItemsHandler(cartItemsSorted);

    const start = page * size;
    const end = (page + 1) * size;
    const cartItemsSliced = Object.assign({}, cartItemsSorted);
    cartItemsSliced.content = cartItemsSorted.content.slice(start, end);

    return HttpResponse.json(mockCartResponse);
  }),

  // 카트에서 상품 제거
  http.delete(`${ENDPOINTS_CART}/:id`, ({ params }) => {
    const id = Number(params.id);
    const newMockCart = mockCartResponse.content.filter(
      (cart) => cart.id !== id,
    );
    mockCartResponse.content = newMockCart;
  }),
];
