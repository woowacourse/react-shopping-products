import { ToastProvider } from './../context/ToastProvider';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useProductFetch } from './useProductFetch';
import { productCategories } from '../constant/products';

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

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(
        () => useProductFetch({ selectBarCondition: initialSelectBarCondition }),
        {
          wrapper: ToastProvider,
        },
      );

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });

      for (let i = 1; i < 21; i++) {
        await waitFor(() => {
          act(() => {
            result.current.increaseNextPage();
          });
        });

        const expectedLength = 20 + i * 4;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }

      await act(async () => {
        result.current.increaseNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
      });
    });
  });
  describe('상품 필터링 기능 테스트', () => {
    // 'all' 카테고리 제외
    it.each(Object.keys(productCategories).slice(1))(
      '카테고리 "%s"으로 요청하면 해당 카테고리 상품만을 요청한다',
      async (category) => {
        const selectBarCondition = {
          category: category,
          sort: 'priceAsc',
        };

        const { result } = renderHook(() => useProductFetch({ selectBarCondition }), {
          wrapper: ToastProvider,
        });

        await waitFor(() => {
          expect(result.current.isLoading).toBe(true);
        });

        await waitFor(() => {
          expect(result.current.isLoading).toBe(false);
          result.current.products.forEach((product) => {
            expect(product.category).toBe(category);
          });
        });
      },
    );
  });
});
