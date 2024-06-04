import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import { CartItem } from '@/types/cartItem.type';
import useGetCartListQuery from '../cart/useGetCartListQuery';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useGetCartListQuery', () => {
  it('장바구니 목록을 가져올 수 있다', async () => {
    const { result } = renderHook(() => useGetCartListQuery(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.slice(0, 1)).toEqual<CartItem[]>([
      {
        id: 7076,
        quantity: 1,
        product: {
          id: 109,
          name: '과학소설',
          price: 7000,
          imageUrl:
            'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=2730&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'books',
        },
      },
    ]);
  });
});
