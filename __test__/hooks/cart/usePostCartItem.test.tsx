import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePostCartItem } from '@/hooks/index';
import { combinedContextWrapper } from '../../utils/test-utils';

describe('usePostCartItem 테스트', () => {
  it('productId로 상품을 장바구니에 추가한다.', async () => {
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
});
