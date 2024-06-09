import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

import {
  useFetchCartItems,
  useFetchAddCart,
  useFetchProductQuantity,
} from '../index';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchProductQuantity', () => {
  const PRODUCT_ID = 3;

  it('장바구니에서 찾고자 하는 상품을 반환한다.', async () => {
    const { result } = renderHook(
      () => {
        const fetchCartItems = useFetchCartItems();
        const fetchAddCart = useFetchAddCart();
        const fetchProductQuantity = useFetchProductQuantity();
        return { fetchCartItems, fetchAddCart, fetchProductQuantity };
      },
      { wrapper },
    );
    await waitFor(() => {
      result.current.fetchAddCart.addCartItem(PRODUCT_ID);
    });
    await waitFor(() => {
      const cartItem =
        result.current.fetchProductQuantity.getCartItemByProduct(PRODUCT_ID);
      expect(cartItem?.quantity).toBe(1);
    });
  });
});
