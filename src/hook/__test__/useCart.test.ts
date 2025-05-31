import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setup';
import useCart from '../cart/useCart';
import { CartItem } from '../../types/common';

const API_BASE_URL =
  'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com';
const CART_ITEMS_ENDPOINT = `${API_BASE_URL}/cart-items`;

const createMockCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  product: {
    id: 101,
    name: '테스트 상품',
    price: 10000,
    imageUrl: 'test.jpg',
    category: '패션잡화',
    quantity: 1,
  },
  quantity: 1,
  ...overrides,
});

// 응답 데이터 생성 헬퍼
const createCartResponse = (content: CartItem[]) => ({
  content,
  totalElements: content.length,
  totalPages: content.length > 0 ? 1 : 0,
  size: content.length,
  number: 0,
});

// MSW 핸들러 헬퍼 함수들
const mockGetCartItems = (cartItems: CartItem[]) => {
  return http.get(CART_ITEMS_ENDPOINT, () => {
    return HttpResponse.json(createCartResponse(cartItems));
  });
};

const mockGetCartItemsError = () => {
  return http.get(CART_ITEMS_ENDPOINT, () => {
    return HttpResponse.error();
  });
};

describe('useCart 훅', () => {
  beforeEach(() => {
    // 각 테스트 전에 핸들러 리셋
    server.resetHandlers();
  });

  it('장바구니 초기 데이터는 빈 배열이다', async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.loadCartData();
    });

    expect(result.current.cartData).toEqual([]);
  });

  it('장바구니 데이터를 성공적으로 가져온다', async () => {
    const mockCartData = [createMockCartItem()];

    server.use(mockGetCartItems(mockCartData));

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.loadCartData();
    });

    expect(result.current.cartData).toEqual(mockCartData);
  });

  it('장바구니 데이터 가져오기 실패 시 에러 처리가 된다', async () => {
    server.use(mockGetCartItemsError());

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.loadCartData();
    });

    expect(result.current.cartData).toEqual([]);
  });

  it('장바구니에 상품을 성공적으로 추가한다', async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addCart(4);
    });

    expect(result.current.cartData.length).toBe(1);

    await act(async () => {
      const cartItem = result.current.cartData[0];
      await result.current.removeCart(cartItem.id);
    });
  });

  it('장바구니에서 상품을 성공적으로 제거한다', async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addCart(4);
    });

    await act(async () => {
      const cartItem = result.current.cartData[0];
      await result.current.removeCart(cartItem.id);
    });

    expect(result.current.cartData).toEqual([]);
  });

  it('장바구니 상품 수량을 성공적으로 증가시킨다', async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addCart(4);
    });

    await act(async () => {
      const cartItem = result.current.cartData[0];
      await result.current.increaseCart(
        cartItem.id,
        cartItem.quantity + 1,
        cartItem.product.id
      );
    });

    expect(result.current.cartData[0].quantity).toBe(2);

    await act(async () => {
      const cartItem = result.current.cartData[0];
      await result.current.removeCart(cartItem.id);
    });
  });

  it('장바구니 상품 수량을 성공적으로 감소시킨다', async () => {
    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addCart(4);
    });

    console.log(result.current.cartData);

    expect(result.current.cartData[0].quantity).toBe(1);

    await act(async () => {
      const cartItem = result.current.cartData[0];
      await result.current.increaseCart(
        cartItem.id,
        cartItem.quantity + 1,
        cartItem.product.id
      );
    });

    expect(result.current.cartData[0].quantity).toBe(2);

    await act(async () => {
      const cartItem = result.current.cartData[0];
      await result.current.decreaseCart(cartItem.id, cartItem.quantity - 1);
    });

    expect(result.current.cartData[0].quantity).toBe(1);
  });
});
