import { http, HttpResponse } from 'msw';
import mockProducts from './mockProduct.json';

const cartItems: Array<{
  id: number;
  productId: number;
  quantity: number;
  product: (typeof mockProducts)[0] | null;
}> = [];

let cartItemIdCounter = 1;

export const handlers = [
  http.get(`${import.meta.env.VITE_API_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');
    const size = parseInt(url.searchParams.get('size') || '20');

    let filteredProducts = [...mockProducts];
    if (category && category !== '전체') {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (sort) {
      if (sort === 'price,desc') {
        filteredProducts.sort((a, b) => b.price - a.price);
      } else if (sort === 'price,asc') {
        filteredProducts.sort((a, b) => a.price - b.price);
      }
    }

    const slicedProducts = filteredProducts.slice(0, size);

    return HttpResponse.json({
      content: slicedProducts,
      totalElements: filteredProducts.length,
      totalPages: 1,
      size: slicedProducts.length,
      number: 0,
    });
  }),

  http.get(`${import.meta.env.VITE_API_BASE_URL}/cart-items`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0');
    const size = parseInt(url.searchParams.get('size') || '50');

    const cartItemsWithProduct = cartItems.map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      return {
        ...item,
        product: product || null,
      };
    });

    return HttpResponse.json({
      content: cartItemsWithProduct,
      totalElements: cartItems.length,
      totalPages: Math.ceil(cartItems.length / size),
      size: cartItemsWithProduct.length,
      number: page,
    });
  }),

  http.post(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
    async ({ request }) => {
      const body = (await request.json()) as {
        productId: number;
        quantity: number;
      };

      const existingItem = cartItems.find(
        (item) => item.productId === body.productId
      );

      if (existingItem) {
        existingItem.quantity += body.quantity;
        const product = mockProducts.find(
          (p) => p.id === existingItem.productId
        );

        return HttpResponse.json({
          ...existingItem,
          product: product || null,
        });
      } else {
        const newCartItem = {
          id: cartItemIdCounter++,
          productId: body.productId,
          quantity: body.quantity,
          product: mockProducts.find((p) => p.id === body.productId) || null,
        };

        cartItems.push(newCartItem);

        return HttpResponse.json(newCartItem);
      }
    }
  ),

  http.delete(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items/:cartItemId`,
    ({ params }) => {
      const cartItemId = parseInt(params.cartItemId as string);

      const itemIndex = cartItems.findIndex((item) => item.id === cartItemId);

      if (itemIndex === -1) {
        return new HttpResponse(null, { status: 404 });
      }

      cartItems.splice(itemIndex, 1);

      return new HttpResponse(null, { status: 204 });
    }
  ),

  http.patch(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items/:cartItemId`,
    async ({ params, request }) => {
      const cartItemId = parseInt(params.cartItemId as string);
      const body = (await request.json()) as { quantity: number };

      const itemIndex = cartItems.findIndex((item) => item.id === cartItemId);

      if (itemIndex === -1) {
        return new HttpResponse(null, { status: 404 });
      }

      if (body.quantity <= 0) {
        cartItems.splice(itemIndex, 1);
        return new HttpResponse(null, { status: 204 });
      }

      const item = cartItems[itemIndex];
      item.quantity = body.quantity;
      const product = mockProducts.find((p) => p.id === item.productId);

      return HttpResponse.json({
        ...item,
        product: product || null,
      });
    }
  ),
];
