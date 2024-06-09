import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act } from 'react';

import useProducts from '.';

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('getProducts', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  describe('첫 페이지 상품 목록 조회', () => {
    it(`첫 페이지에서는 상품 목록 ${FIRST_PAGE_SIZE}개를 조회한다.`, async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(FIRST_PAGE_SIZE);
      });
    });

    it('상품 목록 조회 중 server error의 경우 "error"를 가지고 isError 값을 "true"로 세팅한다.', async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.getProducts.error).toBeDefined();
        expect(result.current.getProducts.isError).toEqual(false);
      });
    });
  });

  describe('페이지네이션', () => {
    it(`첫 페이지 이후 다음 페이지의 상품 ${SIZE_PER_PAGE}개를 추가로 불러온다.`, async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });
      const EXPECTED_TOTAL_PRODUCTS_COUNT = FIRST_PAGE_SIZE + SIZE_PER_PAGE;

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(FIRST_PAGE_SIZE);
      });

      act(() => {
        result.current.getProducts.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(EXPECTED_TOTAL_PRODUCTS_COUNT);
      });
    });

    it('모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(FIRST_PAGE_SIZE);
      });

      for (let i = FIRST_PAGE + GAP_WITH_FIRST_PAGE; i <= MOCK_PRODUCTS_LAST_PAGE; i++) {
        await waitFor(() => {
          act(() => {
            result.current.getProducts.fetchNextPage();
          });
        });

        const EXPECTED_PRODUCTS_COUNT =
          FIRST_PAGE_SIZE + (i - GAP_WITH_FIRST_PAGE + 1) * SIZE_PER_PAGE;

        await waitFor(() => {
          expect(result.current.getProducts.data).toHaveLength(EXPECTED_PRODUCTS_COUNT);
        });
      }

      act(() => {
        result.current.getProducts.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(MOCK_PRODUCTS_TOTAL_SIZE);
      });
    });

    it('페이지네이션으로 추가 데이터를 불러오는 중 발생하는 server error의 경우 "error"를 가지고 isError 값을 "true"로 세팅한다.', async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      act(() => {
        result.current.getProducts.refetch();
      });

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(FIRST_PAGE_SIZE);
      });

      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      act(() => {
        result.current.getProducts.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.getProducts.data).toHaveLength(20);
        expect(result.current.getProducts.error).toBeDefined();
        expect(result.current.getProducts.isError).toBe(true);
      });
    });
  });
});
