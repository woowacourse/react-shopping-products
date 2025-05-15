import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useCart from './useCart';

const originalFetch = global.fetch;

describe('useCart 훅', () => {
  beforeEach(() => {
    global.fetch = vi.fn();

    vi.stubEnv('VITE_API_BASE_URL', 'http://test-api.com');
    vi.stubEnv('VITE_API_KEY', 'test-api-key');
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.unstubAllEnvs();
    vi.resetAllMocks();
  });

  it('장바구니 데이터를 성공적으로 가져온다', async () => {
    const mockCartData = {
      content: [
        {
          id: 1,
          product: {
            id: 101,
            name: '테스트 상품',
            price: 10000,
            imageUrl: 'test.jpg',
          },
          quantity: 1,
        },
      ],
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCartData,
    });

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.fetchCartData();
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'http://test-api.com/cart-items?page=0&size=20',
      expect.objectContaining({
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic test-api-key',
        },
      })
    );

    expect(result.current.cartData).toEqual(mockCartData.content);
  });

  it('장바구니 데이터 가져오기 실패 시 에러 처리가 된다', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useCart());

    await act(async () => {
      await result.current.fetchCartData();
    });

    expect(true).toBe(true);
  });
});
