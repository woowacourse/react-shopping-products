import { isDescendingPrice } from './utils/productPrice';
import { waitFor } from '@testing-library/react';

import { act } from 'react';

import { createProductsRenderHook } from './utils/createProductsRenderHook';

describe('무한 스크롤 테스트', () => {
  it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
    const { result } = createProductsRenderHook();

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.page).toBe(0);
    });
  });

  it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
    const { result } = createProductsRenderHook();

    await waitFor(() => {
      expect(result.current.products.length).toBe(20);
    });

    act(() => {
      result.current.updateNextProductItem();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
      expect(result.current.page).toBe(1);
    });
  });
});

it('스크롤을 내려 4개의 상품을 확인 한 후 가격 내림차순으로 정렬하면, 내림차순으로 정렬된 0 page 20개의 상품이 보여져야 한다.', async () => {
  const { result } = createProductsRenderHook();

  act(() => {
    result.current.updateNextProductItem();
  });

  act(() => {
    result.current.onSelectOption('sort', 'desc');
  });

  await waitFor(() => {
    const isSortedDescending = result.current.products.every(isDescendingPrice);

    expect(isSortedDescending).toBe(true);
    expect(result.current.products).toHaveLength(20);
    expect(result.current.page).toBe(0);
  });
});
