import { renderHook, waitFor } from '@testing-library/react';
import useProducts from '../../src/hooks/useProducts';
import sortProductList from '../../src/utils/sortProductList';
import products from '../../src/mocks/data/products.json';

describe('useProducts', () => {
  describe('상품 목록 조회', () => {
    it('가장 앞 상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProducts({}));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it('가장 앞 상품 목록을 식료품으로 필터링하여 조회한다..', async () => {
      const { result } = renderHook(() => useProducts({ filterType: '식료품' }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(10);
      });
    });

    it('가장 앞 상품 목록을 오름차순으로 정렬하여 조회한다.', async () => {
      const { result } = renderHook(() => useProducts({ sortingType: 'asc' }));

      await waitFor(() => {
        expect(result.current.products).toEqual(sortProductList(products, 'asc'));
      });
    });
  });
});
