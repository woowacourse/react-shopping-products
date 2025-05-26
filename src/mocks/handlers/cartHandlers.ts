import { http, HttpResponse } from 'msw';
import { mockCartItems } from '../data/mockCartItem';
import { mockProducts, mockProductStock } from '../data/mockProducts';
import { CartItem } from '../../types/product';

const API_URL = 'https://api.example.com';

// 메모리에 장바구니 데이터 저장
let cartItems: CartItem[] = [...mockCartItems.content];
let cartIdCounter = Math.max(...cartItems.map(item => item.id), 0) + 1;

export const cartHandlers = [
  // GET /cart-items
  http.get(`${API_URL}/cart-items`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '0';
    const size = url.searchParams.get('size') || '50';
    const sort = url.searchParams.get('sort') || 'desc';

    // 정렬
    const sortedItems = [...cartItems].sort((a, b) => {
      return sort === 'desc' ? b.id - a.id : a.id - b.id;
    });

    // 페이지네이션
    const startIndex = Number(page) * Number(size);
    const endIndex = startIndex + Number(size);
    const paginatedItems = sortedItems.slice(startIndex, endIndex);

    const response = {
      content: paginatedItems,
      pageable: {
        sort: {
          empty: false,
          sorted: true,
          unsorted: false
        },
        offset: startIndex,
        pageNumber: Number(page),
        pageSize: Number(size),
        paged: true,
        unpaged: false
      },
      last: endIndex >= cartItems.length,
      totalElements: cartItems.length,
      totalPages: Math.ceil(cartItems.length / Number(size)),
      first: Number(page) === 0,
      size: Number(size),
      number: Number(page),
      sort: {
        empty: false,
        sorted: true,
        unsorted: false
      },
      numberOfElements: paginatedItems.length,
      empty: paginatedItems.length === 0
    };

    return HttpResponse.json(response);
  }),

  // POST /cart-items
  http.post(`${API_URL}/cart-items`, async ({ request }) => {
    // Authorization 헤더 체크 (실제 서버와 동일하게)
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json() as { productId: number; quantity?: number };
    const { productId, quantity = 1 } = body;

    // 상품 존재 확인
    const product = mockProducts.find(p => p.id === productId);
    if (!product) {
      return HttpResponse.json(
        { message: '상품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 재고 확인 (README의 MSW 스펙에 따라)
    const stock = mockProductStock[productId] || 0;
    if (stock === 0) {
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.'
        },
        { status: 400 }
      );
    }

    // 이미 장바구니에 있는지 확인
    const existingItem = cartItems.find(item => item.product.id === productId);
    if (existingItem) {
      // 이미 있으면 수량 증가 (재고 체크)
      if (existingItem.quantity + quantity > stock) {
        return HttpResponse.json(
          {
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.'
          },
          { status: 400 }
        );
      }
      existingItem.quantity += quantity;
      return HttpResponse.json(existingItem, { status: 200 });
    }

    // 장바구니 최대 개수 확인 (50개)
    if (cartItems.length >= 50) {
      return HttpResponse.json(
        { message: '장바구니는 최대 50개까지 담을 수 있습니다.' },
        { status: 400 }
      );
    }

    // 새로운 장바구니 아이템 추가
    const newCartItem: CartItem = {
      id: cartIdCounter++,
      quantity: quantity,
      product: product
    };

    cartItems.push(newCartItem);

    return HttpResponse.json(newCartItem, { status: 201 });
  }),

  // DELETE /cart-items/:id
  http.delete(`${API_URL}/cart-items/:id`, ({ request, params }) => {
    // Authorization 헤더 체크
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const id = Number(params.id);
    const index = cartItems.findIndex(item => item.id === id);

    if (index === -1) {
      return HttpResponse.json(
        { message: '장바구니 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    cartItems.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  }),

  // PATCH /cart-items/:id (수량 변경)
  http.patch(`${API_URL}/cart-items/:id`, async ({ request, params }) => {
    // Authorization 헤더 체크
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json() as { quantity: number };
    const id = Number(params.id);
    const cartItem = cartItems.find(item => item.id === id);

    if (!cartItem) {
      return HttpResponse.json(
        { message: '장바구니 아이템을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 재고 확인 (README의 MSW 스펙에 따라)
    const stock = mockProductStock[cartItem.product.id] || 0;
    if (body.quantity > stock) {
      return HttpResponse.json(
        {
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.'
        },
        { status: 400 }
      );
    }

    if (body.quantity <= 0) {
      return HttpResponse.json(
        { message: '수량은 1개 이상이어야 합니다.' },
        { status: 400 }
      );
    }

    cartItem.quantity = body.quantity;

    return HttpResponse.json(cartItem);
  })
];