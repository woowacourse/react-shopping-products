import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useDeleteCartItem } from '@/hooks/index';
import { combinedContextWrapper } from '../../utils/test-utils';

describe('useDeleteCartItem', () => {
  it('cartItemId로 cartItem을 삭제해야한다.', async () => {
    const CART_ITEM_ID = 100;

    const { result } = renderHook(() => useDeleteCartItem(), {
      wrapper: combinedContextWrapper,
    });

    await act(async () => {
      result.current.delelteCartMutation.mutateAsync(CART_ITEM_ID);
    });

    await waitFor(() =>
      expect(result.current.delelteCartMutation.isSuccess).toBe(true),
    );
  });
});
