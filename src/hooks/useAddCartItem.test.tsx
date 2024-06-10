import { renderHook, act, waitFor } from '@testing-library/react';
import useAddCartItem from './useAddCartItem';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from '../store/ToastProvider';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

describe('useAddCartItem', () => {
  it('장바구니 아이템을 추가해야 한다', async () => {
    const { result } = renderHook(() => useAddCartItem(), { wrapper });

    await act(async () => {
      result.current.mutate({ productId: 1, quantity: 1 });
    });

    await waitFor(() => {
      expect(result.current.error).toBeUndefined();
    });
  });
});
