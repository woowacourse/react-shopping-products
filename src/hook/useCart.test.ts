import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCart from './useCart';
import { cartApi } from '../api/cart';
import { CartItem } from '../types/common';

vi.mock('../api/cart', () => ({
  cartApi: {
    getCartItems: vi.fn(),
  },
}));

describe('useCart 훅', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('장바구니 데이터를 성공적으로 가져온다', async () => {
    const mockCartData: CartItem[] = [
      {
        id: 1,
        product: {
          id: 101,
          name: '테스트 상품',
          price: 10000,
          imageUrl: 'test.jpg',
          category: '패션잡화',
        },
        quantity: 1,
      },
    ];

    vi.mocked(cartApi.getCartItems).mockResolvedValueOnce(mockCartData);

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.loadCartData();
    });

    expect(cartApi.getCartItems).toHaveBeenCalled();
    expect(result.current.cartData).toEqual(mockCartData);
  });

  it('장바구니 데이터 가져오기 실패 시 에러 처리가 된다', async () => {
    vi.mocked(cartApi.getCartItems).mockRejectedValueOnce(
      new Error('API 오류')
    );

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.loadCartData();
    });

    expect(cartApi.getCartItems).toHaveBeenCalled();
    expect(result.current.cartData).toEqual([]);
  });
});
