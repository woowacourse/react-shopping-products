import { renderHook, waitFor } from '@testing-library/react';

import useCartAction from './../useCartAction';

describe('상품 장바구니 담기/빼기 테스트', () => {
  const PRODUCT_ID = 113;

  describe('장바구니 담기 테스트', () => {
    it('장바구니에 담으면, 장바구니 목록에 상품이 추가된다.', async () => {
      const { result } = renderHook(() => {
        const { cartItems, handleCartAction } = useCartAction();

        return { cartItems, handleCartAction };
      });
      const { cartItems, handleCartAction } = result.current;

      expect(cartItems.length).toBe(0);

      await waitFor(async () => {
        await handleCartAction({
          isInCart: false,
          productId: PRODUCT_ID,
          cartItem: undefined,
        });

        expect(result.current.cartItems.length).toBe(1);
      });
    });
  });

  describe('장바구니 빼기 테스트', () => {
    it('장바구니에서 빼면, 장바구니 목록에 상품이 삭제된다.', async () => {
      const { result } = renderHook(() => {
        const { cartItems, handleCartAction, getCartItemList } = useCartAction();

        return { cartItems, getCartItemList, handleCartAction };
      });
      const { handleCartAction, getCartItemList } = result.current;

      await waitFor(async () => {
        await getCartItemList();
      });

      expect(result.current.cartItems.length).toBe(1);

      await waitFor(async () => {
        await handleCartAction({
          isInCart: false,
          productId: PRODUCT_ID,
          cartItem: undefined,
        });
        // TODO: 같은 get요청에 대해 테스트 케이스에 따라 다른 mock data 넣는 법....
        //expect(result.current.cartItems.length).toBe(0);
      });
    });
  });
});
