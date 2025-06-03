/// <reference types="vitest" />
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAPI } from '../hooks/useAPI';
import { getProduct } from '../api/fetchProduct';
import { ProductElement } from '../types/type';
import { APIProvider } from '../context/APIContext';
import { fetchProductList } from '../utils/getProductList';
import { API_CONFIG } from '../constants/APIConfig';
import { ToastProvider } from '../context/ToastContext';

vi.mock('../api/fetchProduct');

const mockProducts: ProductElement[] = [
  {
    id: 1,
    name: '상품1',
    price: 100,
    category: '식료품',
    imageUrl: 'url1',
    quantity: 10,
  },
  {
    id: 2,
    name: '상품2',
    price: 200,
    category: '패션잡화',
    imageUrl: 'url2',
    quantity: 5,
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <APIProvider>{children}</APIProvider>
  </ToastProvider>
);

describe('useAPI 훅', () => {
  const getProductMock = getProduct as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    getProductMock.mockReset();
  });

  it('정상적으로 데이터를 가져온다', async () => {
    getProductMock.mockResolvedValue({ content: mockProducts });

    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: fetchProductList,
          name: API_CONFIG.PRODUCT_NAME,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockProducts);
  });

  it('에러가 발생하면 error 상태를 반환한다', async () => {
    getProductMock.mockRejectedValue(new Error('상품 조회 실패'));

    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: fetchProductList,
          name: API_CONFIG.PRODUCT_NAME,
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBe(undefined);
  });

  it('refetch를 수동으로 실행할 수 있다', async () => {
    getProductMock.mockResolvedValue({ content: mockProducts });

    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: fetchProductList,
          name: API_CONFIG.PRODUCT_NAME,
        }),
      { wrapper }
    );

    await act(async () => {
      await result.current.refetch();
    });

    expect(getProductMock).toHaveBeenCalledTimes(2);
    expect(result.current.data?.length).toBe(2);
  });
});
