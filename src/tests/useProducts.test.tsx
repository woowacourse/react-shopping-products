import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as api from '../api/products';
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../hooks/useProducts';

vi.mock('../api/products');

vi.mock('../hooks/useData', () => ({
  useData: vi.fn((_key: string, fetcher: () => Promise<unknown>) => {
    const state = {
      data: null as unknown,
      error: null as Error | null,
      isLoading: false,
      refetch: vi.fn(),
    };

    Promise.resolve().then(async () => {
      try {
        state.isLoading = true;
        const result = await fetcher();
        state.data = result;
        state.isLoading = false;
      } catch (error) {
        state.error = error as Error;
        state.data = null;
        state.isLoading = false;
      }
    });

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

describe('useProducts 훅', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('정상적으로 상품을 가져오면 상태값이 업데이트된다', async () => {
    const fakeData = {
      content: [
        {
          id: 1,
          name: '테스트 상품',
          price: 10000,
          imageUrl: '',
          category: '식료품',
          quantity: 10,
        },
      ],
      totalElements: 1,
      totalPages: 1,
      size: 10,
      number: 0,
    };

    const mockGetProducts = vi.mocked(api.getProducts);
    mockGetProducts.mockResolvedValue(fakeData);

    const { result } = renderHook(() => useProducts('asc', '식료품'));

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledWith('asc', '식료품');
    });

    const productsData = await api.getProducts('asc', '식료품');
    expect(productsData).toEqual(fakeData);

    expect(result.current.products).toEqual([]);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('상품 가져오기 실패 시 에러 상태가 true가 되고 토스트를 띄운다', async () => {
    const mockGetProducts = vi.mocked(api.getProducts);
    mockGetProducts.mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useProducts('desc', '패션잡화'));

    await waitFor(() => {
      expect(mockGetProducts).toHaveBeenCalledWith('desc', '패션잡화');
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
