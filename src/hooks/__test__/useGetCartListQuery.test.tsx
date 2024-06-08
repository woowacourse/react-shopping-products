import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import useGetCartListQuery from '../cart/useGetCartListQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetCartListQuery', () => {
  it('장바구니 목록을 가져올 수 있다', async () => {
    const { result } = renderHook(() => useGetCartListQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.[0]).toHaveProperty('id');
    expect(result.current.data?.[0]).toHaveProperty('quantity');
    expect(result.current.data?.[0]).toHaveProperty('product');
    expect(result.current.data?.[0].product).toHaveProperty('id');
    expect(result.current.data?.[0].product).toHaveProperty('name');
    expect(result.current.data?.[0].product).toHaveProperty('price');
    expect(result.current.data?.[0].product).toHaveProperty('imageUrl');
    expect(result.current.data?.[0].product).toHaveProperty('category');
  });
});
