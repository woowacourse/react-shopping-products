import { HttpResponse, http } from 'msw';
import fullProductList from './products.json';
import fullCartData from './cart.json';
import { ENV } from '@/api/env';

const baseUrl = ENV.BASE_URL;

export let cartData: any[] = [...fullCartData.content];

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export const handlers = [
  http.get(`${baseUrl}products`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page') || '0');
    const size = Number(url.searchParams.get('size') || '20');
    const sort = url.searchParams.get('sort') || '';
    const category = url.searchParams.get('category') || '';

    // 실제 products 배열은 content 필드 안에 있음
    let filtered = [...fullProductList.content];

    // category 필터
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    const allowedSortKeys: (keyof Product)[] = ['price', 'id'];

    // sort (예: price,asc)
    if (sort) {
      const [key, direction] = sort.split(',') as [keyof Product, 'asc' | 'desc'];

      if (allowedSortKeys.includes(key)) {
        filtered.sort((a, b) =>
          direction === 'desc' ? (b[key]! > a[key]! ? 1 : -1) : a[key]! > b[key]! ? 1 : -1
        );
      }
    }

    // pagination
    const paged = filtered.slice(page * size, (page + 1) * size);

    // 최종 응답 구성
    return HttpResponse.json({
      ...fullProductList,
      content: paged,
      totalElements: filtered.length,
      totalPages: Math.ceil(filtered.length / size),
      number: page,
      size,
      numberOfElements: paged.length,
      empty: paged.length === 0,
      first: page === 0,
      last: (page + 1) * size >= filtered.length,
    });
  }),

  // GET /cart-items
  http.get(`${baseUrl}cart-items`, () => {
    return HttpResponse.json({ content: cartData });
  }),

  http.post(`${baseUrl}cart-items`, async ({ request }) => {
    const { productId, quantity } = (await request.json()) as {
      productId: number;
      quantity: number;
    };

    const product = fullProductList.content.find((p) => p.id === productId);

    if (!product) {
      return HttpResponse.json(
        { errorCode: 'PRODUCT_NOT_FOUND', message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const existing = cartData.find((item) => item.product.id === productId);
    const stock = product.quantity;

    if ((existing?.quantity ?? 0) + quantity > stock) {
      return HttpResponse.json(
        { errorCode: 'OUT_OF_STOCK', message: '품절된 상품은 장바구니에 담을 수 없습니다.' },
        { status: 400 }
      );
    }

    if (existing) {
      existing.quantity += quantity;
      return HttpResponse.json(existing); // 단일 아이템 반환
    } else {
      const newItem = {
        id: Math.floor(1000 + Math.random() * 9000), // 랜덤 ID
        quantity,
        product,
      };
      cartData.push(newItem);
      return HttpResponse.json(newItem); // 단일 아이템 반환
    }
  }),

  // PATCH /cart-items/:id
  http.patch(`${baseUrl}cart-items/:id`, async ({ params, request }) => {
    const cartItemId = Number(params.id);
    const { quantity } = (await request.json()) as { quantity: number };
    const cartItem = cartData.find((item) => item.id === cartItemId); // 변경됨

    if (!cartItem) {
      return HttpResponse.json(
        { errorCode: 'CART_ITEM_NOT_FOUND', message: '장바구니 항목을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const stock = fullProductList.content.find((p) => p.id === cartItem.product.id)?.quantity ?? 0;

    if (quantity > stock) {
      return HttpResponse.json(
        { errorCode: 'OUT_OF_STOCK', message: '재고 수량을 초과하여 담을 수 없습니다.' },
        { status: 400 }
      );
    }

    cartItem.quantity = quantity;
    return HttpResponse.json({ content: cartData });
  }),

  // DELETE /cart-items/:id
  http.delete(`${baseUrl}cart-items/:id`, ({ params }) => {
    const cartItemId = Number(params.id);
    cartData = cartData.filter((item) => item.id !== cartItemId); // 여기서 cartData 기반으로
    return HttpResponse.json({ content: cartData });
  }),
];
