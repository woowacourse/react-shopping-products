import { http, HttpResponse } from 'msw';
import products from './products.json';

interface CartProductType {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
  quantity: number;
}

const cartProducts: CartProductType[] = [];

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const sortParam = url.searchParams.get('sort');

    const sorted = [...products];

    if (sortParam) {
      const [key, direction] = sortParam.split(',');

      sorted.sort((a, b) => {
        const isAsc = direction === 'asc';
        if (key === 'price') {
          return isAsc ? a.price - b.price : b.price - a.price;
        }
        if (key === 'name') {
          return isAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
      });
    }

    return HttpResponse.json({ content: sorted });
  }),

  http.get(`${BASE_URL}/cart-items*`, () => {
    return HttpResponse.json({
      content: cartProducts,
    });
  }),

  http.post(`${BASE_URL}/cart-items*`, async ({ request }) => {
    const body = await request.json();
    const { productId } = body as { productId: number };

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return new HttpResponse('Product not found', { status: 404 });
    }

    const existing = cartProducts.find((item) => item.product.id === productId);
    if (existing) {
      return HttpResponse.json(existing);
    }

    const newCartProduct = {
      id: Number(Date.now()),
      quantity: 1,
      product,
    };

    cartProducts.push(newCartProduct);

    return HttpResponse.json({
      message: 'Cart product added successfully',
    });
  }),

  http.patch(`${BASE_URL}/cart-items/:id`, async ({ params, request }) => {
    const cartProductId = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };

    console.log('params', params);

    cartProducts.forEach((item) => {
      if (item.id === cartProductId) {
        console.log('item', item);
        console.log('cartProductId', cartProductId);
        item.quantity = quantity;
        console.log('updateditem', item);
      }
    });

    return HttpResponse.json({ message: 'Cart product updated', productId: cartProductId });
  }),

  http.delete(`${BASE_URL}/cart-items/:id`, ({ params }) => {
    const cartProductId = Number(params.id);

    const index = cartProducts.findIndex((item) => item.id === cartProductId);
    if (index === -1) {
      return new HttpResponse('Cart product not found', { status: 404 });
    }

    cartProducts.splice(index, 1);

    return HttpResponse.json({
      message: 'Cart product deleted successfully',
      cartProducts,
    });
  }),
];
