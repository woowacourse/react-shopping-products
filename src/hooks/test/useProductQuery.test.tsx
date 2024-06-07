import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProductQuery from '../useProductQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProducts', () => {
  beforeEach(() => {
    queryClient.clear();
  });
  it('상품 목록을 가져올 수 있다', async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProductQuery({ selectBarCondition }), { wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.products).toHaveLength(20);
    });
  });

  it('다음 페이지 상품 4개를 불러온다.', async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProductQuery({ selectBarCondition }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.products).toHaveLength(24);
    });
  });

  it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProductQuery({ selectBarCondition }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.products).toHaveLength(20);
    });

    for (let i = 1; i < 21; i++) {
      await waitFor(() => {
        act(() => {
          result.current.fetchNextPage();
        });
      });

      const expectedLength = 20 + i * 4;

      await waitFor(async () => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    }

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.products).toHaveLength(100);
  });
});
