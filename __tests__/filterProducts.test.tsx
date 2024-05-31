import { renderHook, waitFor } from '@testing-library/react';

import { PRODUCT_CATEGORY_MAP } from '../src/components/product/ProductDropdown/ProductDropdown.constant';
import useProducts from '../src/hooks/product/useProductItems/useProductItems';

describe('상품 목록 카테고리 테스트', () => {
  it.each(Object.keys(PRODUCT_CATEGORY_MAP))(
    '카테고리를 "%s"로 불러올 수 있다.',
    async (category: string) => {
      // when
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        const isEverySameCategory = result.current.products.every(
          (product) => product.category === category
        );

        // then
        expect(isEverySameCategory).toBe(true);
      });
    }
  );
});
