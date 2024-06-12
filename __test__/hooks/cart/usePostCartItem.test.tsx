import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePostCartItem } from '@/hooks/index';
import {
  combinedContextWrapper,
  testQueryClient,
} from '../../utils/test-utils';
import { server } from '../../../src/mocks/server';
import { HttpResponse, http } from 'msw';
import { ENDPOINT } from '@/api/endpoints';

describe('usePostCartItem 테스트', () => {
  afterEach(() => {
    testQueryClient.clear();
  });

  it('productId로 상품을 장바구니에 성공적으로 추가하면 isSuccess값을 true로 반환한다.', async () => {
    const PRODUCT_ID = 10;
    const { result } = renderHook(() => usePostCartItem(), {
      wrapper: combinedContextWrapper,
    });

    await act(async () => {
      result.current.addToCartMutation.mutateAsync(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.addToCartMutation.isSuccess).toBe(true);
    });
  });

  it('productId로 상품을 장바구니에 담기 실패하면 isError값을 true로 반환한다.', async () => {
    const PRODUCT_ID = 10;
    server.use(
      http.get(ENDPOINT.cartItem.postItem, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => usePostCartItem(), {
      wrapper: combinedContextWrapper,
    });

    await act(async () => {
      result.current.addToCartMutation.mutateAsync(PRODUCT_ID);
    });

    waitFor(() => expect(result.current.addToCartMutation.isError).toBe(true));
  });
});
