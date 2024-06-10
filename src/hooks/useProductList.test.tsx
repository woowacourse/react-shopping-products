import { http, HttpResponse } from 'msw';
import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { END_POINTS, QUERY_KEYS } from '../apis/config';
import expectedDefaultParamsData from '../mocks/handlers/productList/expectedDefaultParamsData.json';
import expectedFitnessPriceDescData from '../mocks/handlers/productList/expectedFitnessPriceDescData.json';
import { server } from '../mocks/server';
import { PRODUCT_LIST } from '../constants/productList';

import useProductList from './useProductList';

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

beforeEach(() => {
  queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });
});

describe('useProductList', () => {
  describe('상품 목록 조회', () => {
    it('초기 상품은 1개 페이지를 조회한다.', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });
      await waitFor(() => {
        expect(result.current.data?.pages.length).toBe(1);
      });
    });

    it('상품 목록 조회 중 로딩 상태', () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });

      expect(result.current.isFetching).toBe(true);
    });

    // failed
    it('상품 목록 조회 중 에러 상태', async () => {
      server.use(
        http.get(
          END_POINTS.PRODUCTS,
          () => new HttpResponse(null, { status: 500 }),
        ),
      );

      const { result } = renderHook(() => useProductList({}), { wrapper });
      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('페이지네이션', () => {
    it('초기에 첫 페이지의 상품이 20개보다 작다면, 모두 불러온다.', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });
      await waitFor(() => {
        if (expectedDefaultParamsData.length < PRODUCT_LIST.initialQuantity) {
          expect(result.current.data?.pages[0].content.length).toBe(
            expectedDefaultParamsData.length,
          );
        }
      });
    });

    it('초기에 첫 페이지의 상품 20개를 불러온다', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });
      await waitFor(() => {
        if (expectedDefaultParamsData.length >= PRODUCT_LIST.initialQuantity) {
          expect(result.current.data?.pages[0].content.length).toBe(
            PRODUCT_LIST.initialQuantity,
          );
        }
      });
    });

    it('다음 페이지의 상품 4개를 추가로 불러온다', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });
      await waitFor(() => {
        expect(result.current.data?.pages[0].content.length).toBe(
          PRODUCT_LIST.initialQuantity,
        );
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.data?.pages[1].content.length).toBe(
          PRODUCT_LIST.quantityPerPage,
        );
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });

      for (let i = 0; i < 34; i++) {
        act(() => {
          result.current.fetchNextPage();
        });
        await waitFor(() => {
          expect(result.current.data?.pages.length).toBe(i + 2);
        });
      }

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(
          result.current.data?.pages[result.current.data?.pages.length - 1]
            .content.length,
        ).toBe(0);
      });
    });

    // failed
    it('페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });

      await waitFor(() => {
        expect(result.current.isFetching).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });
      expect(result.current.isFetchingNextPage).toBe(true);

      await waitFor(() => {
        expect(result.current.isFetchingNextPage).toBe(false);
      });
    });
  });

  describe('상품 목록 카테고리 필터 및 정렬', () => {
    it('기본 값은 전체 카테고리를 낮은 가격순으로 정렬한다.', async () => {
      const { result } = renderHook(() => useProductList({}), { wrapper });
      await waitFor(() => {
        expect(result.current.data?.pages[0].content).toStrictEqual(
          expectedDefaultParamsData,
        );
      });
    });

    it('전달된 category의 product만을 필터링한 후 전달된 sort 옵션에 따라 정렬하여 보여준다.', async () => {
      const { result } = renderHook(
        () => useProductList({ category: 'fitness', sort: 'price,desc' }),
        { wrapper },
      );
      await waitFor(() => {
        expect(result.current.data?.pages[0].content).toStrictEqual(
          expectedFitnessPriceDescData.slice(0, PRODUCT_LIST.initialQuantity),
        );
      });
    });

    it('정렬 및 필터링된 데이터의 모든 상품을 가져오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(
        () => useProductList({ category: 'fitness', sort: 'price,desc' }),
        { wrapper },
      );

      await waitFor(() => {
        expect(result.current.data?.pages[0].content).toStrictEqual(
          expectedFitnessPriceDescData.slice(0, PRODUCT_LIST.initialQuantity),
        );
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.data?.pages[1].content).toStrictEqual(
          expectedFitnessPriceDescData.slice(
            PRODUCT_LIST.initialQuantity,
            PRODUCT_LIST.initialQuantity + PRODUCT_LIST.quantityPerPage,
          ),
        );
      });
    });
  });
});
