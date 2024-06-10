import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '../store/ToastProvider';

import usePatchCartItem from './usePatchCartItem';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

describe('usePatchCartItem', () => {
  it('장바구니 아이템 수량을 업데이트해야 한다', async () => {
    const { result } = renderHook(() => usePatchCartItem(), {
      wrapper,
    });

    act(() => {
      result.current.mutate({ cartItemId: 3091, quantity: 2 });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.error).toBeUndefined();
  });
});
