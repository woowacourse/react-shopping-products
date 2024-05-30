import React, { act } from 'react';
import { ToastContextProvider } from '../src/context/ToastContextProvider';
import { CartProvider } from '../src/context/ShoppingCartCountContext';
import useCartItem from '../src/hooks/useCartItem';
import { renderHook, waitFor } from '@testing-library/react';

describe('useCartItem', () => {
  describe('상품 목록 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(
        () => useCartItem({ itemId: 10, initIsInCart: true }),
        {
          wrapper: ({ children }) => (
            <ToastContextProvider>
              <CartProvider>{children}</CartProvider>
            </ToastContextProvider>
          ),
        },
      );

      await waitFor(() => {
        act(() => result.current.handleAddCartItem());
      });

      expect(result.current.isInCart).toBe(true);
    });
  });
});
