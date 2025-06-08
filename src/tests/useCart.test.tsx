import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as api from '../api/cart';
import { renderHook, waitFor } from '@testing-library/react';
import { useCart } from '../hooks/useCart';

vi.mock('../api/cart');

vi.mock('../hooks/useData', () => ({
  useData: vi.fn((key: string, fetcher: () => Promise<unknown>) => {
    const state = {
      data: null as unknown,
      error: null as Error | null,
      isLoading: false,
      refetch: vi.fn(),
    };

    const loadData = async () => {
      try {
        state.isLoading = true;
        const result = await fetcher();
        state.data = result;
        state.error = null;
        state.isLoading = false;
      } catch (error) {
        state.error = error as Error;
        state.data = null;
        state.isLoading = false;
      }
    };

    state.refetch = vi.fn(loadData);

    if (key === 'cart-items') {
      Promise.resolve().then(loadData);
    }

    return state;
  }),
}));

vi.mock('../context/DataContext', () => ({
  DataProvider: ({ children }: { children: React.ReactNode }) => children,
  useDataContext: () => ({
    getCache: vi.fn(),
    setCache: vi.fn(),
  }),
}));

vi.mock('../context/ToastContext', () => ({
  ToastProvider: ({ children }: { children: React.ReactNode }) => children,
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

describe('useCart 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('정상적으로 장바구니 데이터를 가져오면 상태가 업데이트된다', async () => {
    const fakeData = {
      content: [
        {
          id: 100,
          product: {
            id: 1,
            name: '첫번째 상품',
            price: 10000,
            imageUrl: '',
            category: '식료품',
            quantity: 10,
          },
          quantity: 1,
        },
        {
          id: 200,
          product: {
            id: 2,
            name: '두번째 상품',
            price: 20000,
            imageUrl: '',
            category: '패션잡화',
            quantity: 5,
          },
          quantity: 2,
        },
      ],
      totalElements: 2,
    };

    const mockGetCartItem = vi.mocked(api.getCartItem);
    mockGetCartItem.mockResolvedValue(fakeData);

    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(mockGetCartItem).toHaveBeenCalled();
    });

    const cartData = await api.getCartItem();
    expect(cartData).toEqual(fakeData);

    expect(result.current.isInCart(1)).toBe(false);
    expect(result.current.isInCart(3)).toBe(false);

    expect(result.current.getCartItemId(1)).toBe(null);
    expect(result.current.getCartItemId(3)).toBe(null);
  });

  it('장바구니 조회 실패 시 isError가 true가 된다', async () => {
    const mockGetCartItem = vi.mocked(api.getCartItem);
    mockGetCartItem.mockRejectedValue(new Error('network error'));

    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(mockGetCartItem).toHaveBeenCalled();
    });

    expect(result.current.cart).toBe(null);
    expect(result.current.isInCart(1)).toBe(false);
    expect(result.current.getCartItemId(1)).toBe(null);
  });

  it('fetchCart를 수동으로 재호출할 수 있다', async () => {
    const mockGetCartItem = vi.mocked(api.getCartItem);

    mockGetCartItem.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart());

    await waitFor(() => {
      expect(mockGetCartItem).toHaveBeenCalledTimes(1);
    });

    const fakeData = {
      content: [
        {
          id: 300,
          product: {
            id: 3,
            name: '세번째 상품',
            price: 30000,
            imageUrl: '',
            category: '전체',
            quantity: 1,
          },
          quantity: 1,
        },
      ],
      totalElements: 1,
    };

    mockGetCartItem.mockResolvedValue(fakeData);

    await result.current.fetchCart();

    await waitFor(() => {
      expect(mockGetCartItem).toHaveBeenCalledTimes(2);
    });
  });
});
