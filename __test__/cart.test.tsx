import React from 'react';
import { queryClient } from './mocks/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import { cartMutations } from '../src/hooks/queries/cart';

import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import cartItems from './mocks/cartItems.json';
import products from './mocks/products.json';
import APIError from '../src/api/apiError';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const { useAddCartItem, useDeleteCartItem, useUpdateCartItemQuantity } =
  cartMutations;

describe('장바구니 테스트', () => {
  describe('장바구니 아이템 추가', () => {
    it('존재하는 상품 id를 전달하면 장바구니에 추가할 수 있다.', async () => {
      const { result } = renderHook(
        () => useAddCartItem({ productId: products[0].id }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutate();
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it('존재하지 않는 상품의 id를 전달하면 404 에러가 반환된다.', async () => {
      const { result } = renderHook(() => useAddCartItem({ productId: 100 }), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutate();
      });

      await waitFor(() => {
        const error = result.current.error as APIError;
        expect(error.statusCode).toBe(404);
      });
    });
  });

  describe('장바구니 아이템 삭제', () => {
    const TEST_CART_ITEM_ID = cartItems[0].id;

    it('장바구니에 존재하는 아이템의 id를 전달하면 장바구니에 삭제할 수 있다.', async () => {
      const { result } = renderHook(
        () => useDeleteCartItem({ cartItemId: TEST_CART_ITEM_ID }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutate();
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it('장바구니에 존재하지 않는 아이템의 id를 전달하면 404 에러가 반환된다.', async () => {
      const { result } = renderHook(
        () => useDeleteCartItem({ cartItemId: TEST_CART_ITEM_ID }),
        { wrapper }
      );

      await act(async () => {
        await result.current.mutate();
      });

      await waitFor(() => {
        const error = result.current.error as APIError;
        expect(error.statusCode).toBe(404);
      });
    });
  });

  describe('장바구니 아이템 수량 변경', () => {
    const TEST_CART_ITEM_ID = cartItems[1].id;

    it('장바구니에 존재하는 아이템 아이디와 변경할 수량을 전달하면 서버의 수량이 변경된다', async () => {
      const { result } = renderHook(() => useUpdateCartItemQuantity(), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutate({
          cartItemId: TEST_CART_ITEM_ID,
          quantity: 2,
        });
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it('수량을 0으로 전달하면 삭제된다', async () => {
      const { result } = renderHook(() => useUpdateCartItemQuantity(), {
        wrapper,
      });

      await act(async () => {
        await result.current.mutate({
          cartItemId: TEST_CART_ITEM_ID,
          quantity: 0,
        });
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });

      await act(async () => {
        await result.current.mutate({
          cartItemId: TEST_CART_ITEM_ID,
          quantity: 1,
        });
      });

      await waitFor(() => {
        const error = result.current.error as APIError;
        expect(error.statusCode).toBe(404);
      });
    });
  });
});
