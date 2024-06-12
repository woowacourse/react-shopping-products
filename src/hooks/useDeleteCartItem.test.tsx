import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '../store/ToastProvider';
import { QUERY_KEYS } from '../apis/config';
import mockCartItemList from '../mocks/handlers/cartItemList/defaultData.json';
import { CartItemList, CartItemListResponse } from '../types/type';

import useDeleteCartItem from './useDeleteCartItem';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <ToastProvider>{children}</ToastProvider>
  </QueryClientProvider>
);

describe('useDeleteCartItem', () => {
  it('장바구니 아이템을 제거해야 한다', async () => {
    const { result } = renderHook(() => useDeleteCartItem(), {
      wrapper,
    });

    queryClient.setQueryData([QUERY_KEYS.CART_ITEMS], {
      content: mockCartItemList,
    });

    const beforeData: CartItemListResponse =
      queryClient.getQueryData([QUERY_KEYS.CART_ITEMS]) ??
      ({ content: [] as CartItemList } as CartItemListResponse);
    expect(beforeData.content.length).toBe(7);

    await act(async () => {
      result.current.mutate({ cartItemId: 3091 });
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    const afterData: CartItemListResponse =
      queryClient.getQueryData([QUERY_KEYS.CART_ITEMS]) ??
      ({ content: [] as CartItemList } as CartItemListResponse);
    await waitFor(() => {
      expect(afterData.content.length).toBe(6);
    });
  });
});
