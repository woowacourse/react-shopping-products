import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '../store/ToastProvider';
import { QUERY_KEYS } from '../apis/config';
import mockCartItemList from '../mocks/handlers/cartItemList/defaultData.json';
import { CartItemList, CartItemListResponse } from '../types/type';

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

    queryClient.setQueryData([QUERY_KEYS.CART_ITEMS], {
      content: mockCartItemList,
    });

    const beforeData: CartItemListResponse =
      queryClient.getQueryData([QUERY_KEYS.CART_ITEMS]) ??
      ({ content: [] as CartItemList } as CartItemListResponse);
    expect(
      beforeData.content.find((cartItem) => cartItem.id === 3091)?.quantity,
    ).toBe(1);

    act(() => {
      result.current.mutate({ cartItemId: 3091, quantity: 2 });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const afterData: CartItemListResponse =
      queryClient.getQueryData([QUERY_KEYS.CART_ITEMS]) ??
      ({ content: [] as CartItemList } as CartItemListResponse);
    expect(
      afterData.content.find((cartItem) => cartItem.id === 3091)?.quantity,
    ).toBe(2);
  });
});
