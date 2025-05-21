import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../../src/hooks/useProducts';
import sortProductList from '../../src/utils/sortProductList';
import products from '../../src/mocks/data/products.json';
import { SortingType } from '../../src/types';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('가장 앞 상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProducts({}));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it.each(['식료품', '패션잡화'])(
      '가장 앞 상품 목록을 필터링(%s)하여 조회한다.',
      async (filterType) => {
        const { result } = renderHook(() => useProducts({ filterType }));

        await waitFor(() => {
          expect(result.current.products).toHaveLength(
            products.content.filter((product) => product.category === filterType).length
          );
        });
      }
    );

    it.each(['asc', 'desc'])('가장 앞 상품 목록을 정렬(%s)하여 조회한다.', async (sortingType) => {
      const { result } = renderHook(() => useProducts({ sortingType }));

      await waitFor(() => {
        expect(result.current.products).toEqual(
          sortProductList(products.content, sortingType as SortingType)
        );
      });
    });
  });
});
