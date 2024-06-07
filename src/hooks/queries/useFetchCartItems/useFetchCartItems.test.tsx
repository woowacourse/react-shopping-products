import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useFetchCartItems from './useFetchCartItems';
import cartItems from '../../../mocks/cartItem/cartItem.json';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchCartItems', () => {
  describe('장바구니 아이템 조회', () => {
    it('장바구니 아이템을 조회한다.', async () => {
      const { result } = renderHook(() => useFetchCartItems(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(cartItems.length);
      });
    });
  });
});
