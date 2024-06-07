import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useProductQuery from '../useProductQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useProducts', () => {
  it('상품 목록을 가져올 수 있다', async () => {
    const selectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    const { result } = renderHook(() => useProductQuery({ selectBarCondition }), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.content).toHaveLength(20);
  });
});
