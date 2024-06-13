import { act, renderHook, waitFor } from '@testing-library/react';

import useUpdateItemQuantityQuery from './useUpdateItemQuantityQuery';

import cartItems from '@/mocks/cartItems.json';
import MockWrapper from '@/mocks/MockWrapper';

describe('useUpdateItemQuantityQuery', () => {
  it('장바구니에서 cartId에 해당하는 제품의 수량을 3개로 변경할 수 있다.', async () => {
    const { result } = renderHook(() => useUpdateItemQuantityQuery(), { wrapper: MockWrapper });
    const EXIST_CART_ID = cartItems[0].id;
    const NEW_QUANTITY = 3;

    act(() => {
      result.current.mutate({ cartId: EXIST_CART_ID, quantity: NEW_QUANTITY });
    });

    await waitFor(() =>
      expect(result.current.variables).toEqual({ cartId: EXIST_CART_ID, quantity: NEW_QUANTITY }),
    );
  });
});
