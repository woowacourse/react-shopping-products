import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HttpResponse, http } from 'msw';

import useCartItems from '.';

import { CartItem } from '../../types/cart';
import { server } from '../../mocks/server';
import { CART_ITEMS_ENDPOINT } from '../../api/endpoints';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('getCartItems', () => {
  it('장바구니를 조회할 수 있다', async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => expect(result.current.getCartItems.isSuccess).toBe(true));

    expect(result.current.getCartItems.data).toEqual<CartItem[]>([
      {
        id: 8456,
        quantity: 1,
        product: {
          id: 152,
          name: '홈 시어터 시스템',
          price: 1800000,
          imageUrl:
            'https://images.unsplash.com/photo-1623998021450-85c29c644e0d?q=80&w=3357&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'electronics',
        },
      },
      {
        id: 8768,
        quantity: 1,
        product: {
          id: 146,
          name: '노트북 Pro 15',
          price: 1500000,
          imageUrl:
            'https://images.unsplash.com/photo-1593081891731-fda0877988da?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          category: 'electronics',
        },
      },
    ]);
  });

  it('server error의 경우 "error"를 가지고 isError 값을 "true"로 세팅한다.', async () => {
    server.use(
      http.get(CART_ITEMS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => {
      expect(result.current.getCartItems.error).toBeDefined();
      expect(result.current.getCartItems.isError).toBe(true);
    });
  });
});
