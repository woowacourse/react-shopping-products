import { act } from 'react';
import { HttpResponse, http } from 'msw';
import { renderHook, waitFor } from '@testing-library/react';

import useProductList from '@/hooks/useProductList';

import { API_URL } from '@/api/config';
import ENDPOINT from '@/api/endpoints';
import { server } from '@/mocks/server';

import { FETCH_SIZE } from '@/constants/productList';

const NEXT_PAGE = 5;
const TOTAL_DATA_LENGTH =
  FETCH_SIZE.firstPageItemCount + FETCH_SIZE.moreLoadItemCount;

describe('useProductList 테스트', () => {
  describe('상품 목록 조회 테스트', () => {
    it('상품 목록을 조회한다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });
    });

    it('상품 목록 조회 전 로딩 상태를 가진다.', async () => {
      const { result } = renderHook(() => useProductList());

      expect(result.current.loading).toBe(true);
    });

    it('상품 목록 조회 중 에러 발생시 에러 상태를 가진다.', async () => {
      server.use(
        http.get(`${API_URL}${ENDPOINT.product.getList({})}`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe('페이지네이션 테스트', () => {
    it(`초기 랜더링시 첫 페이지의 상품 ${FETCH_SIZE.firstPageItemCount}개를 불러온다.`, async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });
    });

    it(`스크롤 다운 시 다음 페이지의 상품 ${FETCH_SIZE.moreLoadItemCount}개를 불러온다.`, async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(NEXT_PAGE);
        expect(result.current.products).toHaveLength(TOTAL_DATA_LENGTH);
      });
    });

    it('마지막 페이지일 시 다음 페이지가 존재하지 않는다고 알려준다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.page).toBe(0);
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
        expect(result.current.hasNextPage).toBe(true);
      });

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(NEXT_PAGE);
        expect(result.current.products).toHaveLength(TOTAL_DATA_LENGTH);
        expect(result.current.hasNextPage).toBe(false);
      });

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(TOTAL_DATA_LENGTH);
        expect(result.current.hasNextPage).toBe(false);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      act(() => {
        result.current.loadNextPage();
      });

      expect(result.current.loading).toBe(true);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });
  });

  describe('상품 카테고리 필터링 테스트', () => {
    it('`fashion` 카테고리 선택시 패션 카테고리 상품 목록만 필터링되어 보여준다.', async () => {
      const { result } = renderHook(() => useProductList());

      const SELECTED_CATEGORY = 'fashion';

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.handleChangeCategory(SELECTED_CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      const isAllFashion = result.current.products.some(
        (item) => item.category === SELECTED_CATEGORY,
      );

      expect(isAllFashion).toBe(true);
    });

    it('`fashion` 카테고리 선택 후 다음 페이지 로드시 패션 카테고리 상품 목록만 필터링되어 보여준다.', async () => {
      const { result } = renderHook(() => useProductList());

      const SELECTED_CATEGORY = 'fashion';

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.handleChangeCategory(SELECTED_CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(NEXT_PAGE);
        expect(result.current.products).toHaveLength(TOTAL_DATA_LENGTH);
      });

      const isAllFashion = result.current.products.some(
        (item) => item.category === SELECTED_CATEGORY,
      );

      expect(isAllFashion).toBe(true);
    });

    it('`fitness` 카테고리 선택시 피트니스 카테고리 상품 목록만 필터링되어 보여준다.', async () => {
      const { result } = renderHook(() => useProductList());

      const SELECTED_CATEGORY = 'fitness';

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.handleChangeCategory(SELECTED_CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      const isAllFashion = result.current.products.some(
        (item) => item.category === SELECTED_CATEGORY,
      );

      expect(isAllFashion).toBe(true);
    });

    it('`fitness` 카테고리 선택 후 다음 페이지 로드시 해당 카테고리 상품 목록만 필터링되어 보여준다.', async () => {
      const { result } = renderHook(() => useProductList());

      const SELECTED_CATEGORY = 'fitness';

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.handleChangeCategory(SELECTED_CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          FETCH_SIZE.firstPageItemCount,
        );
      });

      act(() => {
        result.current.loadNextPage();
      });

      await waitFor(() => {
        expect(result.current.page).toBe(NEXT_PAGE);
        expect(result.current.products).toHaveLength(TOTAL_DATA_LENGTH);
      });

      const isAllFashion = result.current.products.some(
        (item) => item.category === SELECTED_CATEGORY,
      );

      expect(isAllFashion).toBe(true);
    });
  });
});
