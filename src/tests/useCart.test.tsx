import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useCart } from '../hooks/useCart';
import * as api from '../api/cart';
import { DataProvider } from '../context/DataContext';
import { ToastProvider } from '../context/ToastContext';
import { ReactNode } from 'react';

vi.mock('../api/cart');
const mockedGetCartItem = vi.mocked(api.getCartItem);

vi.mock('../hooks/useData', async () => {
  const actual = await vi.importActual<typeof import('../hooks/useData')>('../hooks/useData');
  return {
    ...actual,
    useData: (key: string, fetcher: () => Promise<any>, options: any = {}) => {
      return actual.useData(key, fetcher, { ...options, retry: 0 });
    },
  };
});

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <DataProvider>{children}</DataProvider>
    </ToastProvider>
  );
}

describe('useCart 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('정상적으로 장바구니 데이터를 가져오면 상태가 업데이트된다', async () => {
    const fakeData = {
      content: [
        {
          id: 100,
          product: { id: 1, name: '첫번째 상품', price: 10000, imageUrl: '', category: '' },
          quantity: 1,
        },
        {
          id: 200,
          product: { id: 2, name: '두번째 상품', price: 20000, imageUrl: '', category: '' },
          quantity: 2,
        },
      ],
      totalElements: 2,
      totalPages: 1,
      size: 10,
      number: 0,
    };
    mockedGetCartItem.mockResolvedValueOnce(fakeData);

    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.cart).toEqual(fakeData);
    expect(result.current.isError).toBe(false);
    expect(result.current.isInCart(1)).toBe(true);
    expect(result.current.isInCart(3)).toBe(false);
    expect(result.current.getCartItemId(1)).toBe(100);
    expect(result.current.getCartItemId(3)).toBe(null);
  });

  it('장바구니 조회 실패 시 isError가 true가 된다', async () => {
    mockedGetCartItem.mockRejectedValueOnce(new Error('network error'));

    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.cart).toBe(null);
    expect(result.current.isInCart(1)).toBe(false);
    expect(result.current.getCartItemId(1)).toBe(null);
  });

  it('fetchCart를 수동으로 재호출할 수 있다', async () => {
    mockedGetCartItem.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useCart(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    const fakeData = {
      content: [
        {
          id: 300,
          product: { id: 3, name: '세번째 상품', price: 30000, imageUrl: '', category: '' },
          quantity: 1,
        },
      ],
      totalElements: 1,
      totalPages: 1,
      size: 10,
      number: 0,
    };
    mockedGetCartItem.mockResolvedValueOnce(fakeData);

    result.current.fetchCart();

    await waitFor(() => {
      expect(result.current.cart).not.toBe(null);
    });

    expect(result.current.isError).toBe(false);
    expect(result.current.cart).toEqual(fakeData);
  });
});
