import { isAscendingPrice, isDescendingPrice } from './utils/productPrice';
import { renderHook, waitFor } from '@testing-library/react';

import { PRODUCT_CATEGORY_MAP } from '../src/components/product/ProductDropdown/ProductDropdown.constant';
import { act } from 'react';
import useProducts from '../src/hooks/product/useProductItems/useProductItems';

describe('상품 목록 정렬 테스트', () => {
  it('초기 상품 목록은 가격 오름차순으로 정렬된다.', async () => {
    // when
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      const isSortedAscending = result.current.products.every(isAscendingPrice);

      // then
      expect(result.current.products.length).toBeGreaterThan(0);
      expect(isSortedAscending).toBe(true);
    });
  });

  it('가격 오름차순으로 정렬된 상태에서 내림차순으로 설정 시 가격 내림차순으로 정렬된다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products.length).toBeGreaterThan(0);
    });

    await act(async () => result.current.onSelectOption('sort', 'desc'));

    const isSortedDescending = result.current.products.every(isDescendingPrice);

    expect(isSortedDescending).toBe(true);
  });

  it.each(Object.keys(PRODUCT_CATEGORY_MAP))(
    '가격 오름차순으로 정렬 된 상태에서 카테고리를 "%s"로 변경하면 "%s" 카테고리의 상품들은 가격 오름차순으로 정렬된다. ',
    async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products.length).toBeGreaterThan(0);
      });

      await act(async () => result.current.onSelectOption('category', 'fashion'));

      const isSortedAscending = result.current.products.every(isAscendingPrice);

      expect(isSortedAscending).toBe(true);
    }
  );
});
