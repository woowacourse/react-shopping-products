import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useDeleteCartItem } from '@/hooks/index';
import {
  combinedContextWrapper,
  testQueryClient,
} from '../../utils/test-utils';
import { server } from '../../../src/mocks/server';
import { ENDPOINT } from '@/api/endpoints';
import { HttpResponse, http } from 'msw';

describe('useDeleteCartItem', () => {
  afterEach(() => {
    testQueryClient.clear();
  });

  it('cartItemId로 cartItem를 성공적으로 삭제하면 isSuccess값을 true로 반환한다.', async () => {
    const CART_ITEM_ID = 100;

    const { result } = renderHook(() => useDeleteCartItem(), {
      wrapper: combinedContextWrapper,
    });

    await act(async () => {
      result.current.deleteCartMutation.mutateAsync(CART_ITEM_ID);
    });

    await waitFor(() =>
      expect(result.current.deleteCartMutation.isSuccess).toBe(true),
    );
  });

  it('장바구니에 없는 cartItemId로 삭제할려고할 시 isError값을 true로 반환한다.', async () => {
    const CART_ITEM_ID = 100;

    server.use(
      http.get(ENDPOINT.cartItem.deleteItem(CART_ITEM_ID), () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useDeleteCartItem(), {
      wrapper: combinedContextWrapper,
    });

    await act(async () => {
      await result.current.deleteCartMutation.mutateAsync(CART_ITEM_ID);
    });

    waitFor(() => expect(result.current.deleteCartMutation.isError).toBe(true));
  });
});
