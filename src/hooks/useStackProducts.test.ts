import { fetchProduct } from '@src/apis';
import { renderHook, waitFor } from '@testing-library/react';

import useFetch from './useFetch';
import useStackProducts from './useStackProducts';

describe('상품 목록 무한 스크롤 테스트', () => {
  it('다음 목록을 불러올 때 상품 4개를 불러오게 된다.', async () => {
    const { result } = renderHook(() => {
      const { fetch } = useFetch<typeof fetchProduct>(fetchProduct);
      const { getStackedProducts } = useStackProducts({
        fetch,
        products: [],
        filtering: { category: '', sort: 'price,asc' },
        isLast: false,
        productLength: 20,
      });
      return { getStackedProducts };
    });

    await waitFor(async () => {
      const response = await result.current.getStackedProducts(0);
      expect(response?.newProducts.length).toBe(4);
    });
  });
  it('마지막 목록을 불러오고 다음 상품을 불러올 때 상품을 불러오지 않는다.', async () => {
    const { result } = renderHook(() => {
      const { fetch } = useFetch<typeof fetchProduct>(fetchProduct);
      const { getStackedProducts } = useStackProducts({
        fetch,
        products: [],
        filtering: { category: '', sort: 'price,asc' },
        isLast: true,
        productLength: 100,
      });
      return { getStackedProducts };
    });

    await waitFor(async () => {
      const response = await result.current.getStackedProducts(20);
      expect(response).toBeUndefined();
    });
  });
});
