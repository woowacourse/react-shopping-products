import { ToastProvider } from './../context/ToastProvider';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useProductFetch } from './useProductFetch';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    const initialSelectBarCondition = {
      category: 'all',
      sort: 'priceAsc',
    };
    it('초기 렌더링 시, 전체 목록 중 20개의 상품 목록을 가져온다.', async () => {
      const { result } = renderHook(
        () => useProductFetch({ selectBarCondition: initialSelectBarCondition }),
        {
          wrapper: ToastProvider,
        },
      );

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('다음 페이지 상품 4개를 불러온다.', async () => {
      const { result } = renderHook(
        () => useProductFetch({ selectBarCondition: initialSelectBarCondition }),
        {
          wrapper: ToastProvider,
        },
      );

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      act(() => {
        result.current.increaseNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
      });
    });
  });
});
