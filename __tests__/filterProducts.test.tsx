import { waitFor } from '@testing-library/react';

import { PRODUCT_CATEGORY_MAP } from '../src/components/product/ProductDropdown/ProductDropdown.constant';
import { createProductsRenderHook } from './utils/createProductsRenderHook';

describe('상품 목록 카테고리 테스트', () => {
  it.each(Object.keys(PRODUCT_CATEGORY_MAP))(
    '카테고리를 "%s"로 불러올 수 있다.',
    async (category: string) => {
      // when
      const { result } = createProductsRenderHook();

      await waitFor(() => {
        result.current.onSelectOption('category', category);
      });

      await waitFor(() => {
        const isEverySameCategory = result.current.products.every((product) =>
          category === 'all' ? true : product.category === category
        );

        // then
        expect(isEverySameCategory).toBe(true);
      });
    }
  );
});
