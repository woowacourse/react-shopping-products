import { renderHook, waitFor } from '@testing-library/react';
import useCart from '../../src/hooks/useCart';

describe('useCart', () => {
  describe('장바구니 목록 조회', () => {
    it('장바구니에 등록된 아이템 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useCart());

      await waitFor(() => {
        expect(result.current.cartProducts).toHaveLength(5);
      });
    });
  });
});
