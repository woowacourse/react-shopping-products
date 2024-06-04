import { renderHook, waitFor, act } from '@testing-library/react';
import useProducts from '../useProducts';
import { server } from '../../mocks/server';
import { HttpResponse, http } from 'msw';

import { PRODUCTS_ENDPOINT } from '../../api/endpoints';
import {
  FIRST_PAGE,
  FIRST_PAGE_SIZE,
  GAP_WITH_FIRST_PAGE,
  MOCK_PRODUCTS_LAST_PAGE,
  MOCK_PRODUCTS_TOTAL_SIZE,
  SIZE_PER_PAGE,
} from '../../constants/pagination';

describe('페이지네이션', () => {
  it(`첫 페이지 이후 다음 페이지의 상품 ${SIZE_PER_PAGE}개를 추가로 불러온다.`, async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(FIRST_PAGE_SIZE);
      expect(result.current.page).toBe(FIRST_PAGE);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(MOCK_PRODUCTS_LAST_PAGE);
      expect(result.current.page).toBe(FIRST_PAGE + GAP_WITH_FIRST_PAGE);
    });
  });

  it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useProducts());

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
        expect(result.current.page).toBe(i);
      });
    }

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(MOCK_PRODUCTS_TOTAL_SIZE);
      expect(result.current.page).toBe(MOCK_PRODUCTS_LAST_PAGE);
    });
  });

  it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 "true"로 세팅한다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.productsLoading).toBeFalsy();
    });

    act(() => {
      result.current.fetchNextPage();
    });

    expect(result.current.productsLoading).toBeTruthy();

    await waitFor(() => {
      expect(result.current.productsLoading).toBeFalsy();
    });
  });

  it('페이지네이션으로 추가 데이터를 불러오는 중 에러가 발생한다면 에러 상태를 "Error"로 세팅하고 이전 페이지로 돌아간다.', async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    server.use(
      http.get(PRODUCTS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.page).toBe(FIRST_PAGE);
      expect(result.current.products).toHaveLength(20);
      expect(result.current.productsLoading).toEqual(false);
      expect(result.current.productsError).not.toBeNull();
    });
  });
});
