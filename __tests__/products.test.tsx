import { waitFor } from '@testing-library/react';

import { createProductsRenderHook } from './utils/createProductsRenderHook';

describe('상품 확인 테스트', () => {
  describe('상품 조회', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = createProductsRenderHook();

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });
  });
});
