import { renderHook, waitFor } from '@testing-library/react';
import useCartItems from './useCartItems';
import cartItems from '../../mocks/cartItem/cartItem.json';

describe('useCartItems', () => {
  describe('장바구니 아이템 조회', () => {
    it('장바구니 아이템을 조회한다.', async () => {
      const { result } = renderHook(() => useCartItems());

      await waitFor(() => {
        expect(result.current.cartItems).toHaveLength(cartItems.length);
      });
    });
  });
});
