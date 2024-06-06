import { act, renderHook, waitFor } from '@testing-library/react';
import useFetchProducts from '../useFetchProducts';

import wrapper from './wrapper';

describe('sort', () => {
  it('기본값은 낮은 가격순으로 한다.', async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    const sortByPriceAscending = [...result.current.products!].sort(
      (prevProduct, nextProduct) => prevProduct.price - nextProduct.price,
    );

    expect(result.current.products).toHaveLength(20);
    expect(result.current.products).toEqual(sortByPriceAscending);
  });

  it('가격이 높은순 정렬을 선택했을 때, 높은 가격순으로 정렬된다.', async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    act(() => {
      result.current.setSorting('price', 'desc');
    });

    await waitFor(() => {
      const sortByPriceDescending = [...result.current.products!].sort(
        (prevProduct, nextProduct) => nextProduct.price - prevProduct.price,
      );

      expect(result.current.products).toHaveLength(20);
      expect(result.current.products).toEqual(sortByPriceDescending);
    });
  });
});
