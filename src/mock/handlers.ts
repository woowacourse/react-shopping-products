import { http, HttpResponse, bypass } from 'msw';
import fullProductList from './products.json';
import shoppingCart from './shoppingCart.json';
import { ProductTypes } from '../types/ProductTypes';
import { CartItemTypes } from '../types/CartItemType';

const baseUrl = import.meta.env.VITE_BASE_URL;

type CartItemRequestBody = {
  productId: number;
  quantity: number;
};

type CartItemPatchRequestBody = {
  id: number;
  quantity: number;
};

const inMemoryUpdates: Record<number, { quantity: number; productId: number }> =
  {};

let shoppingCartData = [...shoppingCart.content];

export function resetCartState() {
  shoppingCartData = JSON.parse(JSON.stringify(shoppingCart.content));
}

const isTestEnv =
  process.env.NODE_ENV === 'test' ||
  (typeof import.meta !== 'undefined' && import.meta.env?.MODE === 'test');

const isProduction = process.env.NODE_ENV === 'production';

export const handlers = [
  http.post<Record<string, never>, CartItemRequestBody>(
    `${baseUrl}/cart-items`,
    async ({ request }) => {
      const cloned = request.clone();

      const body = await request.json();
      if (!body) return;

      const { productId } = body as CartItemRequestBody;

      const products = [...fullProductList.content];

      const matchProduct = products.find((product) => product.id === productId);

      if (isTestEnv || isProduction) {
        const newItem = {
          id: Date.now(),
          quantity: 1,
          product: matchProduct!,
        };
        shoppingCartData.push(newItem);
        return HttpResponse.json(newItem, { status: 200 });
      }

      if (matchProduct?.quantity === 0) {
        return HttpResponse.json(
          {
            ...body,
            message: '수량 초과 에러',
          },
          {
            status: 500,
          }
        );
      }

      const realReq = bypass(cloned);
      const realRes = await fetch(realReq);

      return new HttpResponse(body, {
        status: 200,
        headers: realRes.headers,
      });
    }
  ),
  http.patch<{ id: string }, CartItemPatchRequestBody>(
    `${baseUrl}/cart-items/:id`,
    async ({ request }) => {
      const cloned = request.clone();

      const body = await request.json();
      const { id, quantity } = body as CartItemPatchRequestBody;

      const matchCartItem = shoppingCartData.find(
        (cartItem) => cartItem.id === id
      )!;

      const matchIndex = shoppingCartData.findIndex(
        (cartItem) => cartItem.id === id
      )!;

      if (isTestEnv || isProduction) {
        if (quantity === 0) {
          shoppingCartData.splice(matchIndex, 1);
        } else {
          const copy = { ...matchCartItem };
          copy.quantity = quantity;

          shoppingCartData[matchIndex] = copy;
        }

        return HttpResponse.json(body, { status: 200 });
      }

      const prevQuantity = inMemoryUpdates[Number(id)].quantity;
      inMemoryUpdates[Number(id)] = {
        ...inMemoryUpdates[Number(id)],
        quantity,
      };
      const currentQuantity = inMemoryUpdates[Number(id)].quantity;

      const products = [...fullProductList.content];

      const productId = inMemoryUpdates[Number(id)].productId;
      const matchProduct = products.find((product) => product.id === productId);

      if (
        prevQuantity < currentQuantity &&
        matchProduct &&
        matchProduct.quantity + 1 === quantity
      ) {
        return HttpResponse.json(
          {
            ...body,
            message: '수량 초과 에러',
          },
          {
            status: 500,
          }
        );
      }

      const realReq = bypass(cloned);
      const realRes = await fetch(realReq);

      return new HttpResponse(body, {
        status: 200,
        headers: realRes.headers,
      });
    }
  ),
  http.get(`${baseUrl}/cart-items`, async ({ request }) => {
    if (isTestEnv || isProduction) {
      return HttpResponse.json({ content: shoppingCartData });
    }
    const realReq = bypass(request);

    const realRes = await fetch(realReq);
    const realBody = await realRes.json();

    const mergedContent = realBody.content.map((item: CartItemTypes) => {
      if (!inMemoryUpdates[item.id]) {
        inMemoryUpdates[item.id] = {
          quantity: item.quantity,
          productId: item.product.id,
        };
      } else if (inMemoryUpdates[item.id].quantity !== item.quantity) {
        inMemoryUpdates[item.id] = {
          quantity: inMemoryUpdates[item.id].quantity,
          productId: item.product.id,
        };
      }

      return inMemoryUpdates[item.id] != null
        ? { ...item, quantity: inMemoryUpdates[item.id].quantity }
        : item;
    });

    return HttpResponse.json({ ...realBody, content: mergedContent });
  }),
  http.get(`${baseUrl}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const sort = url.searchParams.get('sort') || '';
    const category = url.searchParams.get('category') || '';

    let filtered = [...fullProductList.content];

    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    const allowedSortKeys: (keyof ProductTypes)[] = ['price', 'id'];

    if (sort) {
      const [key, direction] = sort.split(',') as [
        keyof ProductTypes,
        'asc' | 'desc'
      ];

      if (allowedSortKeys.includes(key)) {
        filtered.sort((a, b) =>
          direction === 'desc'
            ? b[key]! > a[key]!
              ? 1
              : -1
            : a[key]! > b[key]!
            ? 1
            : -1
        );
      }
    }

    return HttpResponse.json({
      ...fullProductList,
      content: filtered,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size,
      numberOfElements: filtered.length,
      empty: filtered.length === 0,
      first: page === 0,
      last: (page + 1) * size >= filtered.length,
    });
  }),
];
