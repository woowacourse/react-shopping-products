import { CartItemContent } from '@/components/features/cart/api/type';
import { http, HttpResponse } from 'msw';
import productsMockData from './data/mock-products.json';
import cartItemsMockData from './data/mock-cart-items.json';
import { ProductContent } from '@/components/features/product/api/type';

const baseURL = import.meta.env.VITE_BASE_URL;

let inMemoryCartItems = [...cartItemsMockData] as CartItemContent[];

export function resetCartItems() {
  inMemoryCartItems = [...cartItemsMockData] as CartItemContent[];
}

export const handlers = [
  http.get(`${baseURL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);
    const category = url.searchParams.get('category');
    const sort = url.searchParams.get('sort');

    const start = page * size;
    const end = start + size;

    let filtered = productsMockData;
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

    const content = filtered.slice(start, end);
    const totalElements = filtered.length;
    const totalPages = Math.ceil(filtered.length / 20);

    return HttpResponse.json({
      content,
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
      size,
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
  http.get(`${baseURL}/cart-items`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '20', 10);

    const start = page * size;
    const end = start + size;

    const content = inMemoryCartItems.slice(start, end);
    const totalElements = inMemoryCartItems.length;
    const totalPages = Math.ceil(totalElements / size);

    return HttpResponse.json({
      content,
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
      size,
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

    const addingProduct = productsMockData.find(
      (item) => item.id === Number(productId)
    ) as ProductContent;
    if (!addingProduct) {
      return HttpResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    inMemoryCartItems = [
      ...inMemoryCartItems,
      {
        id: Date.now(),
        quantity,
        product: addingProduct,
      },
    ];

    return HttpResponse.json(null, { status: 201 });
  }),
  http.delete(`${baseURL}/cart-items/:id`, ({ params }) => {
    const { id } = params;

    inMemoryCartItems = inMemoryCartItems.filter(
      (item) => String(item.id) !== String(id)
    );

    return new HttpResponse(null, { status: 204 });
  }),
  http.patch(`${baseURL}/cart-items/:id`, async ({ params, request }) => {
    const { id } = params;
    const { quantity } = (await request.json()) as {
      quantity: number;
    };

    const patchingCartItem = inMemoryCartItems.find(
      (item) => item.id === Number(id)
    );
    if (!patchingCartItem || quantity > patchingCartItem?.product.quantity) {
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        },
        { status: 404 }
      );
    }

    inMemoryCartItems = inMemoryCartItems.map((item) =>
      String(item.id) === String(id) ? { ...item, quantity } : item
    );

    return HttpResponse.json(null, { status: 200 });
  }),
];
