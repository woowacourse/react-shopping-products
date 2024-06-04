import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

import useProductList from '@/hooks/useProductList';
import { server } from '@/mocks/server';
import { HttpResponse, http } from 'msw';
import { END_POINT } from '@/api/endpoints';
import { PRODUCT_DATA_SIZE } from '@/constants/productData';

describe('productList', () => {
  describe('pagination 테스트', () => {
    it(`첫 페이지에서는 ${PRODUCT_DATA_SIZE.firstPage}개의 상품 목록을 불러와야 한다.`, async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PRODUCT_DATA_SIZE.firstPage);
        expect(result.current.page).toBe(0);
      });
    });

    it(`다음 페이지에서는 ${PRODUCT_DATA_SIZE.nextPage}개의 상품 목록을 추가로 불러와야 한다.`, async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(PRODUCT_DATA_SIZE.firstPage);
        expect(result.current.page).toBe(0);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(
          PRODUCT_DATA_SIZE.firstPage + PRODUCT_DATA_SIZE.nextPage,
        );
        expect(result.current.page).toBe(5);
      });
    });
    it('마지막 페이지 일 때 상품 목록을 불러오지 않아야 한다.', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.productList.length).toBe(PRODUCT_DATA_SIZE.firstPage);
        expect(result.current.page).toBe(0);
      });

      for (let page = 5; page < 10; page += 1) {
        act(() => {
          result.current.fetchNextPage();
        });

        const expectedProductsCount =
          PRODUCT_DATA_SIZE.firstPage +
          (page - PRODUCT_DATA_SIZE.nextPage) * PRODUCT_DATA_SIZE.nextPage;

        await waitFor(() => {
          expect(result.current.page).toBe(page);
          expect(result.current.productList).toHaveLength(expectedProductsCount);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList.length).toBe(40);
        expect(result.current.page).toBe(9);
      });
    });
  });

  describe('상품 목록 불러오기 테스트', () => {
    it('초기 화면에서 상품 목록 데이터를 불러온다', async () => {
      const { result } = renderHook(() => useProductList());

      await waitFor(() => {
        expect(result.current.productList.length > 0).toBeTruthy();
      });
    });
    it('상품 목록 데이터를 불러오기 전 로딩 화면이 표시된다.', async () => {
      const { result } = renderHook(() => useProductList());

      expect(result.current.isLoading).toBeTruthy();

      await waitFor(() => {
        expect(result.current.isLoading).toBeFalsy();
      });
    });

    const errorCases = [
      { status: 400, errorName: 'BAD_REQUEST_ERROR' },
      { status: 401, errorName: 'AUTHORIZED_ERROR' },
      { status: 404, errorName: 'NOT_FOUND_ERROR' },
      { status: 500, errorName: 'SERVER_ERROR' },
    ];

    it.each(errorCases)(
      '상품 목록을 불러올 때 status 가 $status 인 에러 발생 시 errorName 이 $errorName 여야 한다.',
      async ({ status, errorName }) => {
        server.use(
          http.get(END_POINT.products, () => {
            return new HttpResponse(null, { status: status });
          }),
        );
        const { result } = renderHook(() => useProductList());

        await waitFor(() => {
          expect(result.current.productList).toEqual([]);
          expect(result.current.isLoading).toBeFalsy();
          expect(result.current.errorState.isError).toBeTruthy();
          expect(result.current.errorState.name).toBe(errorName);
        });
      },
    );
  });
});
