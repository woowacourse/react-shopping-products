import { isAscendingPrice, isDescendingPrice } from './utils/productPrice';
import { renderHook, waitFor } from '@testing-library/react';

import { act } from 'react';
import products from '../src/mocks/handlers/products/mockData';
import useProducts from '../src/hooks/product/useProductItems/useProductItems';

describe('무한 스크롤 테스트', () => {
  it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });
  });

  it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });

    act(() => {
      result.current.updateNextProductItem();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
      expect(result.current.page).toBe(1);
    });
  });

  it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    for (let i = 1; i <= (products.length - 20) / 4; i++) {
      await waitFor(() => {
        act(() => {
          result.current.updateNextProductItem();
        });
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20 + i * 4);
        expect(result.current.page).toBe(i);
      });
    }

    await act(async () => {
      result.current.updateNextProductItem();
    });

    await waitFor(() => {
      expect(result.current.page).toBe(20);
    });
  });

  it('스크롤을 내려 4개의 상품을 확인 한 후 가격 내림차순으로 정렬하면, 내림차순으로 정렬된 0 page 20개의 상품이 보여져야 한다.', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.updateNextProductItem();
    });

    await act(async () => result.current.onSelectOption('sort', 'desc'));

    const isSortedDescending = result.current.products.every(isDescendingPrice);

    expect(isSortedDescending).toBe(true);
    expect(result.current.products).toHaveLength(20);
    expect(result.current.page).toBe(0);
  });

  it('스크롤을 내려 4개의 상품을 확인 한 후 가격 내림차순으로 정렬한 다음, 다시 스크롤을 내려 4개의 상품을 확인 하고 오름차순으로 정렬하게 되면 오름차순으로 정렬된 0 page 20개의 상품이 보여져야 한다.', async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.updateNextProductItem();
    });

    await act(async () => result.current.onSelectOption('sort', 'desc'));

    act(() => {
      result.current.updateNextProductItem();
    });

    await act(async () => result.current.onSelectOption('sort', 'asc'));

    const isSortedAscending = result.current.products.every(isAscendingPrice);

    expect(isSortedAscending).toBe(true);
    expect(result.current.products).toHaveLength(20);
    expect(result.current.page).toBe(0);
  });
});
