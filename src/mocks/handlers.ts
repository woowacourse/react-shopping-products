import { http, HttpResponse } from 'msw';
import { CART_URL, PRODUCT_URL } from '../constants/endpoint';
import { filterType, Product, SortingType } from '../types';
import productsMockData from './data/productsMockData';
import cartMockData from './data/cartMockData';
import { filterProductList, getElementById, sortProductList } from '../utils';

let nextId = cartMockData.content.length + 1;

export const handlers = [
  http.get(PRODUCT_URL, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category') as filterType;
    const sort = url.searchParams.get('sort');

    let resultProducts = productsMockData.content;
    if (category) resultProducts = filterProductList(resultProducts, category);
    if (sort) resultProducts = sortProductList(resultProducts, sort.split(',')[1] as SortingType);

    return HttpResponse.json({ content: resultProducts });
  }),

  http.get(CART_URL, () => {
    return HttpResponse.json(cartMockData);
  }),

  http.post(CART_URL, async ({ request }) => {
    const body = await request.json();
    const { productId, quantity } = body as { productId: number; quantity: number };

    const cartId = nextId;
    nextId += 1;
    const product = getElementById<Product[]>(productsMockData.content, productId);

    if (!productId || quantity < 1 || product.length === 0) return HttpResponse.error();

    if (quantity > product[0].quantity)
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        },
        { status: 400 }
      );

    cartMockData.content.push({ id: cartId, quantity, product: product[0] });

    return HttpResponse.json({ ok: true }, { status: 201 });
  }),

  http.delete(`${CART_URL}/:id`, async ({ params }) => {
    const id = Number(params.id);

    cartMockData.content = cartMockData.content.filter((cart) => cart.id !== id);

    return HttpResponse.json({ ok: true }, { status: 201 });
  }),

  http.patch(`${CART_URL}/:id`, async ({ params, request }) => {
    const cartId = Number(params.id);
    const body = await request.json();

    const { quantity } = body as { quantity: number };
    const cartIndex = cartMockData.content.findIndex((item) => item.id === cartId);

    if (!cartId || quantity < 1 || cartIndex === -1) return HttpResponse.error();

    const cartItem = cartMockData.content[cartIndex];

    console.log(quantity, cartItem.product.quantity);

    if (quantity > cartItem.product.quantity)
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        },
        { status: 400 }
      );

    cartMockData.content[cartIndex] = {
      ...cartItem,
      quantity,
    };

    return HttpResponse.json({ ok: true }, { status: 200 });
  }),
];
