import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import {
  useFetchAddCart,
  useFetchCartItems,
  useFetchDeleteCart,
} from '../index';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchDeleteCart', () => {
  const PRODUCT_ID = 3;

  it('장바구니에 담겨있는 제품을 삭제하면 해당 제품의 id는 cartItems에 없어야 한다.', async () => {
    const { result } = renderHook(
      () => {
        const fetchCartItems = useFetchCartItems();
        const fetchAddCart = useFetchAddCart();
        const fetchDeleteCart = useFetchDeleteCart();
        return { fetchCartItems, fetchAddCart, fetchDeleteCart };
      },
      { wrapper },
    );
    await waitFor(() => {
      result.current.fetchAddCart.addCartItem(PRODUCT_ID);
    });

    await waitFor(() => {
      result.current.fetchCartItems.refetch();
    });

    await waitFor(() => {
      expect(
        result.current.fetchCartItems.cartItems.some(
          (item) => item.product.id === PRODUCT_ID,
        ),
      ).toBe(true);
    });

    await waitFor(() => {
      result.current.fetchDeleteCart.deleteCartItem(PRODUCT_ID);
    });

    await waitFor(() => {
      result.current.fetchCartItems.refetch();
    });

    await waitFor(() => {
      expect(
        result.current.fetchCartItems.cartItems.some(
          (item) => item.product.id === PRODUCT_ID,
        ),
      ).toBe(false);
    });
  });
});
