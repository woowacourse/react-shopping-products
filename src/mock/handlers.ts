import { http, HttpResponse } from 'msw';
import fullProductList from './products.json';
import shoppingCart from './shoppingCart.json';
import { ProductTypes } from '../types/ProductTypes';

const baseUrl = import.meta.env.VITE_BASE_URL;

type CartItemRequestBody = {
  productId: number;
  quantity: number;
};

type CartItemPatchRequestBody = {
  id: number;
  quantity: number;
};

let shoppingCartData = [...shoppingCart.content];

export function resetCartState() {
  shoppingCartData = JSON.parse(JSON.stringify(shoppingCart.content));
}

export const handlers = [
  http.delete(`${baseUrl}/cart-items/:id`, async ({ params }) => {
    const id = params.id as string;

    const matchIndex = shoppingCartData.findIndex(
      (cartItem) => cartItem.id === Number(id)
    )!;

    shoppingCartData.splice(matchIndex, 1);
    return HttpResponse.json({ status: 200 });
  }),
  http.post<Record<string, never>, CartItemRequestBody>(
    `${baseUrl}/cart-items`,
    async ({ request }) => {
      const body = await request.json();
      if (!body) return;

      const { productId } = body as CartItemRequestBody;

      const products = [...fullProductList.content];

      const matchProduct = products.find((product) => product.id === productId);

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

      const newItem = {
        id: Date.now(),
        quantity: 1,
        product: matchProduct!,
      };
      shoppingCartData.push(newItem);
      return HttpResponse.json(newItem, { status: 200 });
    }
  ),
  http.patch<{ id: string }, CartItemPatchRequestBody>(
    `${baseUrl}/cart-items/:id`,
    async ({ request }) => {
      const body = await request.json();
      const { id, quantity } = body as CartItemPatchRequestBody;

      const matchCartItem = shoppingCartData.find(
        (cartItem) => cartItem.id === id
      )!;

      const matchIndex = shoppingCartData.findIndex(
        (cartItem) => cartItem.id === id
      )!;

      const products = [...fullProductList.content];
      const matchProduct = products.find(
        (product) => product.id === matchCartItem.product.id
      );

      const prevQuantity = shoppingCartData[matchIndex].quantity;
      shoppingCartData[matchIndex] = {
        ...shoppingCartData[matchIndex],
        quantity,
      };
      const currentQuantity = shoppingCartData[matchIndex].quantity;

      if (quantity === 0) {
        shoppingCartData.splice(matchIndex, 1);
      } else {
        const copy = { ...matchCartItem };
        copy.quantity = quantity;
        shoppingCartData[matchIndex] = copy;
      }

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

      return HttpResponse.json(body, { status: 200 });
    }
  ),
  http.get(`${baseUrl}/cart-items`, async () => {
    return HttpResponse.json({ content: shoppingCartData });
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
