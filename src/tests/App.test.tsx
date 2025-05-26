/// <reference types="vitest" />
import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useAPI } from '../hooks/useAPI';
import { getProduct } from '../api/fetchProduct';
import { ProductElement } from '../types/type';
import { APIProvider } from '../context/APIContext';

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
  <APIProvider>{children}</APIProvider>
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
          fetcher: async () =>
            getProduct({ page: 0, size: 50, sortBy: 'asc' }).then(
              (res) => res.content
            ),
          name: 'products',
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.error.isError).toBe(false);
  });

  it('에러가 발생하면 error 상태를 반환한다', async () => {
    getProductMock.mockRejectedValue(new Error('상품 조회 실패'));

    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: async () =>
            getProduct({ page: 0, size: 50, sortBy: 'asc' }).then(
              (res) => res.content
            ),
          name: 'products',
        }),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.data).toBe(undefined);
    expect(result.current.error.isError).toBe(true);
    expect(result.current.error.errorMessage).toBe('상품 조회 실패');
  });

  it('refetch를 수동으로 실행할 수 있다', async () => {
    getProductMock.mockResolvedValue({ content: mockProducts });

    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: async () =>
            getProduct({ page: 0, size: 50, sortBy: 'asc' }).then(
              (res) => res.content
            ),
          name: 'refetch-products',
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
