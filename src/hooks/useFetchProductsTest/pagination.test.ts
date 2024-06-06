import { renderHook, waitFor, act } from '@testing-library/react';
import useFetchProducts from '../useFetchProducts';

import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  MOCK_PRODUCTS_TOTAL_SIZE,
  SIZE_PER_PAGE,
} from '../../constants/pagination';

import wrapper from './wrapper';

describe('페이지네이션', () => {
  it(`첫 페이지 이후 다음 페이지의 상품 ${SIZE_PER_PAGE}개를 추가로 불러온다.`, async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

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
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

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
