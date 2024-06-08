import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useCartItemQuery from '../useCartItemQuery';
import cartItems from '../../mocks/cartItems.json';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useCartItemQuery 훅 테스트', () => {
  it('장바구니 상품 목록을 불러온다.', async () => {
    const { result } = renderHook(() => useCartItemQuery(), { wrapper });

    await waitFor(() => {
      expect(result.current.cartItemsQuerySuccess).toBe(true);
      expect(result.current.cartItems).toEqual(cartItems.content);
    });
  });
});
