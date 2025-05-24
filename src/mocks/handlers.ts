import { CartItemContent } from '@/components/features/product/api/type';
import { http, HttpResponse } from 'msw';
import products from './data/mock-products.json';

const baseURL = import.meta.env.VITE_BASE_URL;

export const handlers = [
  http.get(`${baseURL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');

    let filtered = products;
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (sort) {
      const [, direction] = sort.split(',');
      filtered = filtered.sort((a, b) => {
        const delta = a.price - b.price;
        return direction === 'desc' ? -delta : delta;
      });
    }

    const totalElements = filtered.length;
    const totalPages = Math.ceil(filtered.length / 20);

    return HttpResponse.json({
      content: filtered,
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
      last: totalElements <= 20,
      totalElements,
      totalPages,
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
  http.get(`${baseURL}/cart-items`, () => {
    // localStorage에서 장바구니 데이터 가져오기
    const raw = localStorage.getItem('cartItems');
    const cartItems = raw ? JSON.parse(raw) : [];

    const totalElements = cartItems.length;
    const totalPages = Math.ceil(cartItems.length / 20);

    return HttpResponse.json({
      content: cartItems,
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
      last: true,
      totalElements,
      totalPages,
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
  http.post(`${baseURL}/cart-items`, async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: string;
      quantity: number;
    };
    const raw = localStorage.getItem('cartItems');
    const cartItems: CartItemContent[] = raw ? JSON.parse(raw) : [];

    const addingProduct = products.find(
      (item) => item.id === Number(productId)
    );
    if (!addingProduct) {
      return HttpResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const newCartItems = [
      ...cartItems,
      {
        id: Date.now(),
        quantity,
        product: addingProduct,
      },
    ];
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));

    return HttpResponse.json(null, { status: 201 });
  }),
  http.delete(`${baseURL}/cart-items/:id`, ({ params }) => {
    const { id } = params;
    const raw = localStorage.getItem('cartItems');
    const cartItems: CartItemContent[] = raw ? JSON.parse(raw) : [];

    console.log(cartItems);

    const updatedCartItems = cartItems.filter(
      (item) => String(item.id) !== String(id)
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    return new HttpResponse(null, { status: 204 });
  }),
  http.patch(`${baseURL}/cart-items/:id`, async ({ params, request }) => {
    const { id } = params;
    const { quantity } = (await request.json()) as {
      quantity: number;
    };
    const raw = localStorage.getItem('cartItems');
    const cartItems: CartItemContent[] = raw ? JSON.parse(raw) : [];

    console.log(cartItems);

    const updatedCartItems = cartItems.map((item) => {
      if (String(item.id) !== String(id)) return item;

      return { ...item, quantity };
    });

    console.log(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    return HttpResponse.json(null, { status: 200 });
  }),
];
