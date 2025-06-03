import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useProducts } from '../hooks/useProducts';
import * as api from '../api/products';
import { ERROR_MESSAGES } from '../constants/errorMessages';
import { DataProvider } from '../context/DataContext';
import { ToastProvider } from '../context/ToastContext';
import { ReactNode } from 'react';

const mockShowToast = vi.fn();

vi.mock('../api/products');
const mockedGetProducts = vi.mocked(api.getProducts);

vi.mock('../context/ToastContext', () => ({
  ToastProvider: ({ children }: { children: ReactNode }) => children,
  useToast: () => ({ showToast: mockShowToast }),
}));

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
    mockedGetProducts.mockResolvedValueOnce(fakeData);

    const { result } = renderHook(() => useProducts('asc', '식료품'), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.products).toEqual(fakeData.content);
    expect(result.current.isError).toBe(false);
    expect(mockShowToast).not.toHaveBeenCalled();
  });

  it('상품 가져오기 실패 시 에러 상태가 true가 되고 토스트를 띄운다', async () => {
    mockedGetProducts.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() => useProducts('desc', '패션잡화'), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isLoading).toBe(false);
    expect(mockShowToast).toHaveBeenCalledWith(ERROR_MESSAGES.productsFetchError);
  });
});
