import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import useFetchCartItems from '@/queries/cartItem/useFetchCartItems';
import useAddCartItem from '@/queries/cartItem/useAddCartItem';
import useDeleteCartItem from '@/queries/cartItem/useDeleteCartItem';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useAddCartItem 테스트', () => {
  it(`장바구니에 아이템을 담을 수 있다.`, async () => {
    const PRODUCT_ID = 16755;

    const { result: addCartItemResult } = renderHook(() => useAddCartItem(), {
      wrapper,
    });
    const { result: fetchCartItemsResult } = renderHook(
      () => useFetchCartItems(),
      { wrapper },
    );

    await act(async () => {
      await addCartItemResult.current.addCartItem(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(fetchCartItemsResult.current.cartItems).toContainEqual(
        expect.objectContaining({
          id: PRODUCT_ID,
        }),
      );
    });
  });
});

describe('useDeleteCartItem 테스트', () => {
  it(`장바구니에서 아이템을 삭제할 수 있다.`, async () => {
    const CART_ID = 110;

    const { result: deleteCartItemResult } = renderHook(
      () => useDeleteCartItem(),
      {
        wrapper,
      },
    );

    const { result: fetchCartItemsResult } = renderHook(
      () => useFetchCartItems(),
      { wrapper },
    );

    await act(async () => {
      deleteCartItemResult.current.deleteCartItem(CART_ID);
    });

    await waitFor(() => {
      expect(fetchCartItemsResult.current.cartItems).not.toContainEqual(
        expect.objectContaining({
          product: expect.objectContaining({ productId: CART_ID }),
        }),
      );
    });
  });
});
