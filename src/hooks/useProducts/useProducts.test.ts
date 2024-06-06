import { act, renderHook, waitFor } from '@testing-library/react';

import wrapper from './wrapper';
import useProducts from '.';

import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  MOCK_PRODUCTS_TOTAL_SIZE,
  SIZE_PER_PAGE,
} from '../../constants/pagination';
import { Category } from '../../types/product';

describe('첫 페이지 상품 목록 조회', () => {
  it(`첫 페이지에서는 상품 목록 ${FIRST_PAGE_SIZE}개를 조회한다.`, async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
    });
  });
});

describe('페이지네이션', () => {
  it(`첫 페이지 이후 다음 페이지의 상품 ${SIZE_PER_PAGE}개를 추가로 불러온다.`, async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(MOCK_PRODUCTS_LAST_PAGE);
    });
  });

  it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
    });

    for (let i = FIRST_PAGE + GAP_WITH_FIRST_PAGE; i <= MOCK_PRODUCTS_LAST_PAGE; i++) {
      await waitFor(() => {
        act(() => {
          result.current.fetchNextPage();
        });
      });

      const expectedLength = FIRST_PAGE_SIZE + (i - GAP_WITH_FIRST_PAGE + 1) * SIZE_PER_PAGE;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    }

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(MOCK_PRODUCTS_TOTAL_SIZE);
    });
  });
});

describe('카테고리 필터링', () => {
  const CATEGORIES: Category[] = [
    'fashion',
    'beverage',
    'books',
    'electronics',
    'fitness',
    'kitchen',
  ];

  it('카테고리에 해당되는 상품만 불러온다.', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    for (const selectedCategory of CATEGORIES) {
      await waitFor(() => {
        expect(
          result.current.products?.every(({ category }) => category === selectedCategory),
        ).toBeFalsy();
      });

      act(() => {
        result.current.filterByCategory(selectedCategory);
      });

      await waitFor(() => {
        expect(
          result.current.products?.length &&
            result.current.products?.every(({ category }) => selectedCategory === category),
        ).toBeTruthy();
      });
    }
  });
});

describe('정렬', () => {
  it('기본값은 낮은 가격순으로 한다.', async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

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
    const { result } = renderHook(() => useProducts(), { wrapper });

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
