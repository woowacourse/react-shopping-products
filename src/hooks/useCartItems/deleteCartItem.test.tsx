import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HttpResponse, http } from 'msw';

import useCartItems from '.';

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

describe('deleteCartItem', () => {
  it('장바구니에 상품을 삭제할 수 있다', async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    act(() => {
      result.current.deleteCartItem.mutate(1);
    });

    await waitFor(() => expect(result.current.deleteCartItem.isSuccess).toBe(true));
  });

  it('server error의 경우, "Error"를 반환한다.', async () => {
    server.use(
      http.delete(`${CART_ITEMS_ENDPOINT}/:itemId`, async () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useCartItems(), { wrapper });

    act(() => {
      result.current.deleteCartItem.mutate(1);
    });

    await waitFor(() => {
      expect(result.current.deleteCartItem.error).toBeDefined();
      expect(result.current.deleteCartItem.isError).toBe(true);
    });
  });
});
