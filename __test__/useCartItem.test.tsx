import useCartItem from '../src/hooks/useCartItem';
import { renderHook, waitFor } from '@testing-library/react';
import { wrapper } from './utils/test-utils';

const renderUseCartItemHook = () =>
  renderHook(() => useCartItem(), {
    wrapper: wrapper,
  });

describe('useCartItem', () => {
  it('장바구니에 담겨있는 아이템들은 가져와야한다.', async () => {
    const { result } = renderUseCartItemHook();

    await waitFor(() => {
      expect(result.current.cartItemIds).toHaveLength(2);
    });
  });

  it('상품이 장바구니에 있는지 확인한다.', async () => {
    const { result } = renderUseCartItemHook();

    await waitFor(() => {
      expect(result.current.isInCart(14)).toBe(true);
      expect(result.current.isInCart(12)).toBe(true);
    });
  });
});
