import { renderHook, waitFor } from '@testing-library/react';

import useProducts from '../useProducts';
import { act } from 'react';

describe('sort', () => {
  it('기본값은 낮은 가격순으로 한다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      const sortByPriceAscending = [...result.current.products].sort(
        (prevProduct, nextProduct) => prevProduct.price - nextProduct.price,
      );

      expect(result.current.products).toHaveLength(20);

      expect(result.current.products).toEqual(sortByPriceAscending);
    });
  });

  it('가격이 높은순 정렬을 선택했을 때, 높은 가격순으로 정렬된다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    act(() => {
      result.current.handlePriceOrderChange('desc');
    });

    await waitFor(() => {
      const sortByPriceDescending = [...result.current.products].sort(
        (prevProduct, nextProduct) => nextProduct.price - prevProduct.price,
      );

      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(sortByPriceDescending);
    });
  });
});
