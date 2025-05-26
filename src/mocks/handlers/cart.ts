import { http, HttpResponse } from 'msw';
import { MAX_STOCK } from '../../constant/product';

// 장바구니 아이템 타입 정의
interface CartItemWithId {
  id: number;
  productId: number;
  quantity: number;
}

// 상품 타입 정의
interface ProductWithStock {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

// 목업 상품 데이터 (product.ts와 동일한 데이터)
const products: ProductWithStock[] = [
  {
    id: 1,
    name: '에어포스',
    price: 129000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '패션잡화',
    quantity: MAX_STOCK,
  },
  {
    id: 2,
    name: '맥북 프로',
    price: 2500000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '전자기기',
    quantity: MAX_STOCK,
  },
  {
    id: 3,
    name: '아이패드',
    price: 800000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '전자기기',
    quantity: MAX_STOCK,
  },
  {
    id: 4,
    name: '커피',
    price: 5000,
    imageUrl: 'https://via.placeholder.com/200',
    category: '식료품',
    quantity: MAX_STOCK,
  },
];

// 장바구니 아이템 목록 (DB 역할)
const cartItems: CartItemWithId[] = [];
let nextCartId = 1;

// 장바구니 API 핸들러
export const cartHandlers = [
  // 장바구니 목록 조회
  http.get('/cart-items', () => {
    // 장바구니 아이템과 상품 정보를 조합
    const cartItemsWithProduct = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        id: item.id,
        product: product!,
        quantity: item.quantity,
      };
    });

    return HttpResponse.json({
      content: cartItemsWithProduct,
    });
  }),

  // 장바구니 추가
  http.post('/cart-items', async ({ request }) => {
    const body = await request.json();
    const { productId, quantity } = body as {
      productId: number;
      quantity: number;
    };

    // 상품 존재 확인
    const product = products.find((p) => p.id === productId);
    if (!product) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'PRODUCT_NOT_FOUND',
          message: '상품을 찾을 수 없습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 기존 장바구니 아이템 확인
    const existingCartItem = cartItems.find(
      (item) => item.productId === productId
    );
    const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

    // 재고 확인
    if (currentQuantity + quantity > product.quantity) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 기존 장바구니 아이템이 있으면 수량 업데이트
    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      return HttpResponse.json({
        id: existingCartItem.id,
        product,
        quantity: existingCartItem.quantity,
      });
    }

    // 새 장바구니 아이템 추가
    const newCartItem = {
      id: nextCartId++,
      productId,
      quantity,
    };

    cartItems.push(newCartItem);

    return HttpResponse.json({
      id: newCartItem.id,
      product,
      quantity: newCartItem.quantity,
    });
  }),

  // 장바구니 아이템 수정 (PATCH)
  http.patch('/cart-items/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const body = await request.json();
    const { quantity } = body as { quantity: number };

    // 장바구니 아이템 찾기
    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'CART_ITEM_NOT_FOUND',
          message: '장바구니 아이템을 찾을 수 없습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 상품 정보 가져오기
    const product = products.find((p) => p.id === cartItem.productId);
    if (!product) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'PRODUCT_NOT_FOUND',
          message: '상품을 찾을 수 없습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 재고 확인
    if (quantity > product.quantity) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 수량 업데이트
    cartItem.quantity = quantity;

    return HttpResponse.json({
      id: cartItem.id,
      product,
      quantity: cartItem.quantity,
    });
  }),

  // 장바구니 아이템 삭제
  http.delete('/cart-items/:id', ({ params }) => {
    const id = Number(params.id);

    // 아이템 존재 확인
    const cartItemIndex = cartItems.findIndex((item) => item.id === id);
    if (cartItemIndex === -1) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'CART_ITEM_NOT_FOUND',
          message: '장바구니 아이템을 찾을 수 없습니다.',
        }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 아이템 삭제
    cartItems.splice(cartItemIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
