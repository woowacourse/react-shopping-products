import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCartItems } from '../hooks/useCartItems';
import { ToastProvider } from '../context/ToastProvider';
import { server } from '../mocks/server';

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createQueryClient()}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

describe('useCartItems', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  describe('장바구니 항목 조회', () => {
    it('초기 장바구니 항목을 가져온다', async () => {
      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItems.length).toBeGreaterThan(0);
      });
    });
  });
});
