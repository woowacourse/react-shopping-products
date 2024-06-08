import { renderHook, waitFor } from '@testing-library/react';
import { useCartItemTotalQuantity } from '@/hooks/index';
import { queryClientWrapper } from '../../utils/test-utils';

describe('useCartItemTotalQuantity 테스트', () => {
  it('장바구니에 담긴 상품들의 총 수량을 반환해야한다.', async () => {
    const { result } = renderHook(() => useCartItemTotalQuantity(), {
      wrapper: queryClientWrapper,
    });

    await waitFor(() => expect(result.current.totalQuantity).toBe(4));
  });
});
