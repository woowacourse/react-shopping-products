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

describe('adjustCartItemQuantity', () => {
  it('상품의 수량을 조절할 수 있다', async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    act(() => {
      result.current.adjustCartItemQuantity.mutate({ cartItemId: 1, quantity: 2 });
    });

    await waitFor(() => expect(result.current.adjustCartItemQuantity.isSuccess).toBe(true));
  });

  it('server error의 경우, "Error"를 반환한다.', async () => {
    server.use(
      http.patch(`${CART_ITEMS_ENDPOINT}/:itemId`, async () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useCartItems(), { wrapper });

    act(() => {
      result.current.adjustCartItemQuantity.mutate({ cartItemId: 1, quantity: 2 });
    });

    await waitFor(() => {
      expect(result.current.adjustCartItemQuantity.error).toBeDefined();
      expect(result.current.adjustCartItemQuantity.isError).toBe(true);
    });
  });
});
