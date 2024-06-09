import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useFetchCartItems from '@/queries/cartItem/useFetchCartItems';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchCartItems 테스트', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  describe('장바구니 목록 조회 테스트', () => {
    it(`장바구니 목록을 불러온다.`, async () => {
      const { result } = renderHook(() => useFetchCartItems(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItems).not.toEqual([]);
      });
    });

    it('상품 목록 조회 전 로딩 상태를 가진다.', async () => {
      const { result } = renderHook(() => useFetchCartItems(), { wrapper });

      expect(result.current.isLoading).toBe(true);
    });
  });
});
