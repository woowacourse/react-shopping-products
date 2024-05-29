import { act, renderHook } from '@testing-library/react';
import useFetchAddCart from './useFetchAddCart';

describe('useFetchAddCart', () => {
  // 장바구니에 담겨있지 않은 제품을 담으면 장바구니에 담긴 제품 종류가 증가되어야 한다.
  // 장바구니에 담겨있는 제품을 담으면 장바구니에 담긴 제품 종류가 감소되어야 한다.

  it('장바구니에 담는 API를 호출하면 해당 제품의 id는 cartIdSet에 포함되어야 한다.', () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(() => useFetchAddCart());

    act(() => {
      result.current.patchToAddCart(PRODUCT_ID);
    });

    expect(result.current.cartIdSet.has(PRODUCT_ID)).toBe(true);
  });

  it('장바구니에서 삭제하는 API를 호출하면 해당 제품의 id는 cartIdSet에서 삭제되어야 한다.', () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(() => useFetchAddCart());

    act(() => {
      result.current.patchToRemoveCart(PRODUCT_ID);
    });

    expect(result.current.cartIdSet.has(PRODUCT_ID)).toBe(false);
  });
});
