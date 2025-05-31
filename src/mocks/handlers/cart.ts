import { http, HttpResponse } from 'msw';
import { MAX_STOCK } from '../../constant/product';

interface CartItemWithId {
  id: number;
  productId: number;
  quantity: number;
}

interface ProductWithStock {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
}

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

const cartItems: CartItemWithId[] = [];
let nextCartId = 1;

export const cartHandlers = [
  http.get('/cart-items', () => {
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

  http.post('/cart-items', async ({ request }) => {
    const body = await request.json();
    const { productId, quantity } = body as {
      productId: number;
      quantity: number;
    };

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

    const existingCartItem = cartItems.find(
      (item) => item.productId === productId
    );
    const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;

    if (currentQuantity + quantity > product.quantity) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (existingCartItem) {
      existingCartItem.quantity += quantity;

      return HttpResponse.json({
        id: existingCartItem.id,
        product,
        quantity: existingCartItem.quantity,
      });
    }

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

  http.patch('/cart-items/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const body = await request.json();
    const { quantity } = body as { quantity: number };

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

    if (quantity > product.quantity) {
      return new HttpResponse(
        JSON.stringify({
          errorCode: 'OUT_OF_STOCK',
          message: '재고 수량을 초과하여 담을 수 없습니다.',
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    cartItem.quantity = quantity;

    return HttpResponse.json({
      id: cartItem.id,
      product,
      quantity: cartItem.quantity,
    });
  }),

  http.delete('/cart-items/:id', ({ params }) => {
    const id = Number(params.id);

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

    cartItems.splice(cartItemIndex, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
