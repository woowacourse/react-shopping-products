import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useProductFetch } from '../hooks/useProductFetch';
import { ToastProvider } from '../context/ToastProvider';
import { act } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

describe('useProductFetch', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  describe('상품 목록 조회', () => {
    it('초기 상품 목록을 20개를 가져온다', async () => {
      const { result } = renderHook(() => useProductFetch(), { wrapper });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });
  });

  describe('페이지네이션', () => {
    it('다음 페이지 상품 목록 4개를 가져온다', async () => {
      const { result } = renderHook(() => useProductFetch(), { wrapper });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
      });
    });
  });
});
