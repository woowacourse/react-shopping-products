import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';

import { QUERY_KEYS } from '@/constants/queryKeys';
import { useAddToCartListQuery } from '../cart/useAddToCartListQuery';
import { vi } from 'vitest';

vi.mock('@/api/cartItem', () => ({
  postCartItem: vi.fn().mockResolvedValue({}),
}));

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAddToCartListQuery', () => {
  it('장바구니에 상품을 추가할 수 있다', async () => {
    const { result } = renderHook(() => useAddToCartListQuery(), { wrapper });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });

  it('장바구니에 상품 추가 후 invalidateQueries를 호출한다', async () => {
    const invalidateQueriesSpy = vi.spyOn(queryClient, 'invalidateQueries');

    const { result } = renderHook(() => useAddToCartListQuery(), { wrapper });

    act(() => {
      result.current.mutate(1);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(invalidateQueriesSpy).toHaveBeenCalledWith({
      queryKey: [QUERY_KEYS.CART],
    });

    invalidateQueriesSpy.mockRestore();
  });
});
