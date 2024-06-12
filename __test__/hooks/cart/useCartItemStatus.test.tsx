import { renderHook, waitFor } from '@testing-library/react';
import { useCartItemStatus } from '@/hooks/index';
import { queryClientWrapper } from '../../utils/test-utils';

describe('useCartItemStatus 테스트', () => {
  const renderUseCartItemStatusHook = (productId: number) =>
    renderHook(() => useCartItemStatus(productId), {
      wrapper: queryClientWrapper,
    });

  describe('productId로 장바구니의 수량을 알 수 있어야한다.', () => {
    it('장바구니 목록에서 productId로 cartItem을 찾으면 그 수량을 반환한다.', async () => {
      const PRODUCT_ID = 100;
      const { result } = renderUseCartItemStatusHook(PRODUCT_ID);

      await waitFor(() => expect(result.current.quantity).toBe(1));
    });

    it('장바구니 목록에서 productId로 cartItem을 찾지 못하면 0을 반환한다.', async () => {
      const NOT_IN_CART_PRODUCT_ID = 200;
      const { result } = renderUseCartItemStatusHook(NOT_IN_CART_PRODUCT_ID);

      await waitFor(() => expect(result.current.quantity).toBe(0));
    });
  });

  describe('productId로 장바구니에 해당 아이템이 들어있는지 아닌지 확인 할 수 있어야한다.', () => {
    it('장바구니 목록에 해당 아이템이 들어있으면 true를 반환해야한다.', async () => {
      const PRODUCT_ID = 100;
      const { result } = renderUseCartItemStatusHook(PRODUCT_ID);

      await waitFor(() => expect(result.current.isInCart).toBe(true));
    });

    it('장바구니 목록에 해당 아이템이 들어있지 않으면 false를 반환해야한다.', async () => {
      const NOT_IN_CART_PRODUCT_ID = 200;
      const { result } = renderUseCartItemStatusHook(NOT_IN_CART_PRODUCT_ID);

      await waitFor(() => expect(result.current.isInCart).toBe(false));
    });
  });
});
