import { renderHook, waitFor } from '@testing-library/react';
import useProducts from './useProducts';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('초기 렌더링 시, 전체 목록 중 20개의 상품 목록을 가져온다.', async () => {
      const { result } = renderHook(() => useProducts());
      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });
  });
});
