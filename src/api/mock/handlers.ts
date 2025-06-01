import { delay, http, HttpResponse } from 'msw';
import { dummyData } from './dummy';
import { ResponseCartItem } from '../types';

interface RequestCartItem {
  productId: number;
  quantity: number;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
let productCart: ResponseCartItem[] = [];

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),
  http.get(`${BASE_URL}/products`, async ({ request }) => {
    const newUrl = new URL(request.url);
    const category = newUrl.searchParams.get('category');
    const size = newUrl.searchParams.get('size');
    const sort = newUrl.searchParams.get('sort');

    let filterDummyData = dummyData.content;

    if (size) {
      filterDummyData = filterDummyData.slice(0, Number(size));
    }

    if (category) {
      filterDummyData = filterDummyData.filter((item) => item.category === category);
    }

    if (sort) {
      const [, sortType] = sort.split(',');
      filterDummyData = filterDummyData.sort((a, b) => {
        if (sortType === 'asc') {
          return a.price - b.price;
        } else if (sortType === 'desc') {
          return b.price - a.price;
        }

        return a.price - b.price;
      });
    }

    return HttpResponse.json({ ...dummyData, content: filterDummyData });
  }),
  http.get(`${BASE_URL}/cart-items`, () => {
    return HttpResponse.json({
      content: productCart,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 51,
      totalPages: 3,
      size: 20,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: 20,
      empty: false,
    });
  }),
  http.post(`${BASE_URL}/cart-items`, async ({ request }) => {
    const { productId, quantity } = (await request.json()) as RequestCartItem;
    const addProductItem = dummyData.content.filter((item) => item.id === productId)[0];

    productCart.push({
      id: productCart.length + 1,
      quantity: quantity,
      product: addProductItem,
    });

    return HttpResponse.json({
      content: productCart,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 51,
      totalPages: 3,
      size: 20,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: 20,
      empty: false,
    });
  }),
  http.delete(`${BASE_URL}/cart-items/:id`, async ({ params }) => {
    const { id } = params;

    productCart = productCart.filter((item) => item.id !== Number(id));

    return HttpResponse.json({
      content: productCart,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 51,
      totalPages: 3,
      size: 20,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: 20,
      empty: false,
    });
  }),
  http.patch(`${BASE_URL}/cart-items/:id`, async ({ request, params }) => {
    const { id } = params;
    const { quantity } = (await request.json()) as RequestCartItem;
    const productQuantity = productCart.filter((item) => item.id === Number(id))[0].product.quantity;

    if (quantity > productQuantity!) {
      return HttpResponse.json(
        {
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        },
        { status: 400 }
      );
    }
    productCart = productCart
      .map((item) => {
        if (item.id === Number(id)) {
          item.quantity = quantity;
        }

        return item;
      })
      .filter((item) => item.quantity > 0);
    return HttpResponse.json({
      content: productCart,
      pageable: {
        pageNumber: 0,
        pageSize: 20,
        sort: {
          empty: false,
          sorted: true,
          unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
      },
      last: false,
      totalElements: 51,
      totalPages: 3,
      size: 20,
      number: 0,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      first: true,
      numberOfElements: 20,
      empty: false,
    });
  }),
];
