import { renderHook, waitFor, act } from '@testing-library/react';
import useCartItem from '../hooks/useCartItem';
import { initialCartItems } from '../mocks/cartItems/initialCartItems';

describe('useCartItem', () => {
  const INITIAL_CART_ITEMS_LENGTH = initialCartItems.content.length;

  describe('장바구니 초기 상태', () => {
    it(`장바구니에 담긴 아이템 초기 수량은 ${INITIAL_CART_ITEMS_LENGTH}이다.`, async () => {
      const { result } = renderHook(() => useCartItem());

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH);
      });
    });
  });

  describe('상품의 장바구니 추가 및 제거', () => {
    it('상품 하단의 "담기" 버튼을 누르면 장바구니에 추가되어야 한다.', async () => {
      const ADD_CART_ITEM_ID = 2;

      const { result } = renderHook(() => useCartItem());

      act(() => {
        result.current.handleAddCartItem(ADD_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH + 1);
        expect(result.current.checkIsInCart(ADD_CART_ITEM_ID)).toBeTruthy();
      });
    });

    it.skip(`상품 하단의 "빼기" 버튼을 누르면 해당 상품이 장바구니에서 제거되어야 하고, 남은 장바구니 상품 종류 수는 ${INITIAL_CART_ITEMS_LENGTH - 1}이어야 한다.`, async () => {
      const DELETE_CART_ITEM_ID = 108;

      const { result } = renderHook(() => useCartItem());

      act(() => {
        result.current.handleRemoveCartItem(DELETE_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.selectedCartItemsLength).toBe(INITIAL_CART_ITEMS_LENGTH - 1);
        expect(result.current.checkIsInCart(DELETE_CART_ITEM_ID)).toBeFalsy();
      });
    });
  });
});
