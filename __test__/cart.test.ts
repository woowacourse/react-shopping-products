import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { cartMutations } from './../src/components/hooks/queries/cart';

import cartItems from '../src/mocks/cartItems.json';
import products from '../src/mocks/products.json';

const { useAddCartItem, useDeleteCartItem } = cartMutations;

describe('장바구니 테스트', () => {
  describe('장바구니 아이템 추가', () => {
    it('존재하는 상품 id를 전달하면 장바구니에 추가할 수 있다.', async () => {
      const { result } = renderHook(() =>
        useAddCartItem({ productId: products[0].id })
      );

      await act(async () => {
        await result.current.query();
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it('존재하지 않는 상품의 id를 전달하면 404 에러가 반환된다.', async () => {
      const { result } = renderHook(() => useAddCartItem({ productId: 100 }));

      await act(async () => {
        await result.current.query();
      });

      await waitFor(() => {
        expect(result.current.error?.statusCode).toBe(404);
      });
    });
  });

  describe('장바구니 아이템 삭제', () => {
    const TEST_CART_ITEM_ID = cartItems[0].id;

    it('장바구니에 존재하는 아이템의 id를 전달하면 장바구니에 삭제할 수 있다.', async () => {
      const { result } = renderHook(() =>
        useDeleteCartItem({ cartItemId: TEST_CART_ITEM_ID })
      );

      await act(async () => {
        await result.current.query();
      });

      await waitFor(() => {
        expect(result.current.error).toBeNull();
      });
    });

    it('장바구니에 존재하지 않는 아이템의 id를 전달하면 404 에러가 반환된다.', async () => {
      const { result } = renderHook(() =>
        useDeleteCartItem({ cartItemId: TEST_CART_ITEM_ID })
      );

      await act(async () => {
        await result.current.query();
      });

      await waitFor(() => {
        expect(result.current.error?.statusCode).toBe(404);
      });
    });
  });
});
