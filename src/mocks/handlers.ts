import { http, HttpResponse } from 'msw';
import { CartItem } from '../components/ShoppingCartModal/cart.type';
import { Product } from '../components/ProductCardList/product.type';
import mockProducts from './products.json';

export const cartItems: CartItem[] = [];

export const handlers = [
  http.get(`${import.meta.env.VITE_BASE_URL}/products*`, ({ request }) => {
    const url = new URL(request.url);
    const sortParam = url.searchParams.get('sort');
    const categoryParam = url.searchParams.get('category');

    let sorted = [...mockProducts];

    if (categoryParam) {
      sorted = sorted.filter((product) => product.category === categoryParam);
    }

    if (sortParam) {
      const [, direction] = sortParam.split(',');

      sorted.sort((a, b) => {
        return direction === 'asc' ? a.price - b.price : b.price - a.price;
      });
    }

    return HttpResponse.json({ content: sorted });
  }),

  http.get(`${import.meta.env.VITE_BASE_URL}/cart-items*`, () => {
    return HttpResponse.json({ content: cartItems });
  }),

  http.post(
    `${import.meta.env.VITE_BASE_URL}/cart-items`,
    async ({ request }) => {
      const { productId, quantity } = (await request.json()) as {
        productId: number;
        quantity: number;
      };

      const product = mockProducts.find((product) => product.id === productId);

      if (!product) {
        return HttpResponse.json(
          { errorCode: 'NOT_FOUND', message: '상품을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      if (product.quantity < quantity) {
        return HttpResponse.json(
          {
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.',
          },
          { status: 400 }
        );
      }

      cartItems.push({
        id: Number(Date.now()),
        product: product as Product,
        quantity,
      });

      return HttpResponse.json({ content: cartItems });
    }
  ),

  http.patch(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:cartItemId`,
    async ({ params, request }) => {
      const { cartItemId } = params;
      const { quantity } = (await request.json()) as {
        quantity: number;
      };

      const cartItem = cartItems.find((item) => item.id === Number(cartItemId));

      if (!cartItem) {
        return HttpResponse.json(
          { errorCode: 'NOT_FOUND', message: '상품을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      if (cartItem.product.quantity < quantity) {
        return HttpResponse.json(
          {
            errorCode: 'OUT_OF_STOCK',
            message: '재고 수량을 초과하여 담을 수 없습니다.',
          },
          { status: 400 }
        );
      }

      cartItem.quantity = quantity;

      return HttpResponse.json({ content: cartItems });
    }
  ),

  http.delete(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:cartItemId`,
    async ({ params }) => {
      const { cartItemId } = params;
      const cartItem = cartItems.find((item) => item.id === Number(cartItemId));

      if (!cartItem) {
        return HttpResponse.json(
          { errorCode: 'NOT_FOUND', message: '상품을 찾을 수 없습니다.' },
          { status: 404 }
        );
      }

      cartItems.splice(cartItems.indexOf(cartItem), 1);

      return HttpResponse.json({ content: cartItems });
    }
  ),
];
