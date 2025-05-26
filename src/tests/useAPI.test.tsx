import { renderHook, waitFor } from '@testing-library/react';
import { APIProvider } from '../context/APIContext';
import { useAPI } from '../hooks/useAPI';
import { ProductElement } from '../types/type';
import { describe, it, expect } from 'vitest';
import { getProduct } from '../api/fetchProduct';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <APIProvider>{children}</APIProvider>
);

describe('useAPI with MSW', () => {
  it('상품 데이터를 성공적으로 받아온다', async () => {
    const fetchProductList = async () => {
      return await getProduct({ page: 0, size: 50, sortBy: 'asc' }).then(
        (res) => res.content
      );
    };

    const { result } = renderHook(
      () =>
        useAPI<ProductElement[]>({
          fetcher: fetchProductList,
          name: 'products',
        }),
      { wrapper }
    );
    console.log('Loading state:', result.current.data);
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.data?.length).toBeGreaterThan(0);
    expect(result.current.error.isError).toBe(false);
  });
});
