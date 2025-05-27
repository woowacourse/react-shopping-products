import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/setup';
import useCart from '../cart/useCart';
import { CartItem } from '../../types/common';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
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

const mockAddCartItem = (cartItem: CartItem) => {
  return http.post(CART_ITEMS_ENDPOINT, () => {
    return HttpResponse.json(cartItem);
  });
};

const mockDeleteCartItem = (cartItemId: number) => {
  return http.delete(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, () => {
    return new HttpResponse(null, { status: 204 });
  });
};

const mockPatchCartItem = (cartItemId: number, cartItem: CartItem) => {
  return http.patch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, () => {
    return HttpResponse.json(cartItem);
  });
};

describe('useCart 훅', () => {
  beforeEach(() => {
    // 각 테스트 전에 핸들러 리셋
    server.resetHandlers();
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
    const newCartItem = createMockCartItem({
      id: 2,
      product: {
        id: 102,
        name: '새 상품',
        price: 20000,
        imageUrl: 'new.jpg',
        category: '패션잡화',
        quantity: 5,
      },
    });

    server.use(mockAddCartItem(newCartItem), mockGetCartItems([newCartItem]));

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.addCart(102);
    });

    expect(result.current.cartData).toEqual([newCartItem]);
  });

  it('장바구니에서 상품을 성공적으로 제거한다', async () => {
    server.use(mockDeleteCartItem(1), mockGetCartItems([]));

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.removeCart(1);
    });

    expect(result.current.cartData).toEqual([]);
  });

  it('장바구니 상품 수량을 성공적으로 변경한다', async () => {
    const updatedCartItem = createMockCartItem({
      product: {
        id: 101,
        name: '테스트 상품',
        price: 10000,
        imageUrl: 'test.jpg',
        category: '패션잡화',
        quantity: 10,
      },
      quantity: 3,
    });

    server.use(
      mockPatchCartItem(1, updatedCartItem),
      mockGetCartItems([updatedCartItem])
    );

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.patchCart(1, 3, 101);
    });

    expect(result.current.cartData).toEqual([updatedCartItem]);
  });
});
