import {http, HttpResponse} from 'msw';
import {cartItem, products} from './mockData';
import {Product} from '../features/products/type/product';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const handlers = [
  http.get(BASE_URL + '/products', ({request}) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get('sort');

    if (sort === 'price,desc')
      return HttpResponse.json({
        content: [...products.content].sort((a, b) => b.price - a.price),
      });

    if (sort === 'price,asc')
      return HttpResponse.json({
        content: [...products.content].sort((a, b) => a.price - b.price),
      });

    return HttpResponse.json(products);
  }),

  http.get(BASE_URL + '/cart-items', () => {
    return HttpResponse.json(cartItem);
  }),

  http.post(BASE_URL + '/cart-items', async ({request}) => {
    const requestBody = (await request.json()) as {
      productId: number;
      quantity: number;
    };
    const productId = requestBody?.productId;
    const quantity = requestBody?.quantity;

    cartItem.content.push({
      id: Math.floor(Math.random() * 1000000),
      product: products.content.find(
        (product) => product.id === productId
      ) as Product,
      quantity: quantity,
    });

    return new HttpResponse(null, {status: 201});
  }),

  http.delete(BASE_URL + '/cart-items/:cartId', async ({params}) => {
    const {cartId} = params;

    const targetId = Number(cartId);
    cartItem.content = cartItem.content.filter((item) => item.id !== targetId);

    return new HttpResponse(null, {status: 200});
  }),

  http.patch(BASE_URL + '/cart-items/:cartId', async ({params, request}) => {
    const {cartId} = params;
    const requestBody = (await request.json()) as {
      quantity: number;
    };
    const quantity = requestBody?.quantity;

    const targetId = Number(cartId);
    const index = cartItem.content.findIndex((item) => item.id === targetId);
    const item = cartItem.content[index];

    cartItem.content[index] = {
      ...item,
      quantity: quantity,
    };

    return new HttpResponse(null, {status: 200});
  }),
];
