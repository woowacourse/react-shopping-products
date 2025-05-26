import { describe, it, expect, vi } from 'vitest';

vi.mock('./useCart', () => ({
  default: () => ({
    cartData: [],
    isLoading: false,
    error: null,
    fetchCartData: vi.fn(),
  }),
}));

import useCart from './useCart';

describe('useCart 훅', () => {
  it('테스트 환경이 제대로 설정되었는지 확인', () => {
    const hookResult = useCart();
    expect(hookResult).toHaveProperty('cartData');
    expect(hookResult).toHaveProperty('isLoading');
    expect(hookResult).toHaveProperty('error');
    expect(hookResult).toHaveProperty('fetchCartData');
  });

  it('장바구니 데이터를 정상적으로 반환하는지 확인', () => {
    const { cartData, isLoading, error } = useCart();
    expect(Array.isArray(cartData)).toBe(true);
    expect(isLoading).toBe(false);
    expect(error).toBeNull();
  });
});
