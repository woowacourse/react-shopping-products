import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react';

import { HttpResponse, http } from 'msw';

import useCartItems from '.';

import { CART_ITEMS_ENDPOINT } from '../../api/endpoints';
import { server } from '../../mocks/server';
import maxCartItems from '../../mocks/maxCartItems.json';
import { MAX_CART_ITEMS_SIZE } from '../../constants/pagination';

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

describe('addCartItem', () => {
  it('장바구니에 상품을 추가할 수 있다', async () => {
    const { result } = renderHook(() => useCartItems(), { wrapper });

    act(() => {
      result.current.addCartItem.mutate(1);
    });

    await waitFor(() => expect(result.current.addCartItem.isSuccess).toBe(true));
  });

  it('장바구니에 상품이 이미 최대치인 경우, 추가시 에러를 반환한다', async () => {
    server.use(
      http.get(CART_ITEMS_ENDPOINT, () => {
        return HttpResponse.json({ content: maxCartItems });
      }),
    );
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => expect(result.current.getCartItems.data).toHaveLength(MAX_CART_ITEMS_SIZE));

    act(() => {
      result.current.addCartItem.mutate(1);
    });

    await waitFor(() => {
      expect(result.current.addCartItem.error).toBeDefined();
      expect(result.current.addCartItem.isError).toBe(true);
    });
  });

  it('server error의 경우, "Error"를 반환한다.', async () => {
    server.use(
      http.post(CART_ITEMS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useCartItems(), { wrapper });

    act(() => {
      result.current.addCartItem.mutate(1);
    });

    await waitFor(() => {
      expect(result.current.addCartItem.error).toBeDefined();
      expect(result.current.addCartItem.isError).toBe(true);
    });
  });
});
