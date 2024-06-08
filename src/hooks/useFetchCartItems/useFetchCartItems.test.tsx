import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import useFetchCartItems from './useFetchCartItems';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchCartItems', () => {
  it('장바구니 목록 첫 조회시에는 0개의 상품을 가져온다.', async () => {
    const { result } = renderHook(() => useFetchCartItems(), { wrapper });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(0);
    });
  });
});
