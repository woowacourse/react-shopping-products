import { renderHook, waitFor } from '@testing-library/react';
import { useTotalPrice } from '@/hooks/index';
import { queryClientWrapper } from '../../utils/test-utils';

describe('useTotalPrice 테스트', () => {
  it('장바구니에 담긴 상품들의 총액을 반환해야한다.', async () => {
    const MOCK_CART_ITEMS_TOTAL_PRICE = 22_000;
    const { result } = renderHook(() => useTotalPrice(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() =>
      expect(result.current.totalPrice).toBe(MOCK_CART_ITEMS_TOTAL_PRICE),
    );
  });
});
