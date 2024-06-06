import { HttpResponse, http } from "msw";
import { renderHook, waitFor, act } from "@testing-library/react";

import { API_URL } from "@apis/__constants__/apiUrl";
import { server } from "@mocks/server";
import { CART_API_URL } from "@env/envVariables";
import { PRICE_SORT_OPTIONS } from "@apis/__constants__/productQueryParams";
import { useInfiniteProducts } from "@server/useInfiniteProducts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const wrapper = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe("useInfiniteProducts", () => {
  describe("상품 목록 조회", () => {
    it("초기 상품 목록을 불러온다", async () => {
      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toBeDefined();
      });
    });

    it("초기 상품 목록을 불러올 때 로딩 상태를 표시한다", () => {
      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      expect(result.current.isLoading).toBe(true);
    });

    it("초기 상품 목록을 불러올 때 에러가 발생하면 에러를 표시한다", async () => {
      server.use(
        http.get(CART_API_URL + API_URL.products, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });
  describe("페이지네이션", () => {
    it("첫 페이지의 경우 상품 20개를 불러온다", async () => {
      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(20);
      });
    });

    it("두 번째 페이지부터는 상품 4개를 불러온다", async () => {
      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(20);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(24);
      });
    });

    it("존재하는 모든 상품을 불러오면 더 이상 상품을 불러오지 않는다", async () => {
      const FIRST_PAGE = 1;
      const LAST_PAGE = 20;
      const PAGE_SIZE = 4;
      const INITIAL_PAGE_SIZE = 20;

      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(20);
      });

      // NOTE : 마지막 페이지에 도달하기 위한 for문
      for (let currentPage = FIRST_PAGE; currentPage <= LAST_PAGE; currentPage++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = INITIAL_PAGE_SIZE + currentPage * PAGE_SIZE;

        await waitFor(() => {
          expect(result.current.data).toHaveLength(expectedLength);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.data).toHaveLength(100);
      });
    });

    it("추가 상품을 불러올 때 로딩 상태를 표시한다", async () => {
      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });
  });

  describe("상품 필터링", () => {
    it("카테고리 필터를 적용할 경우, 해당 카테고리의 상품만 볼러온다", async () => {
      const CATEGORY = "fashion";

      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      act(() => {
        result.current.updateCategoryFilter(CATEGORY);
      });

      await waitFor(() => {
        expect(result.current.data.every((product) => product.category === CATEGORY)).toBe(true);
      });
    });
  });

  describe("상품 정렬", () => {
    it("선택한 가격 정렬 기준에 따라 상품을 불러온다", async () => {
      const PRICE_SORT = PRICE_SORT_OPTIONS.desc;
      const { result } = renderHook(() => useInfiniteProducts(), { wrapper });

      act(() => {
        result.current.updatePriceSort(PRICE_SORT);
      });

      await waitFor(() => expect(result.current.isLoading).toBe(false));

      const sortedProducts = result.current.data.slice().sort((a, b) => b.price - a.price) ?? [];

      await waitFor(() => {
        expect(result.current.data).toEqual(sortedProducts);
      });
    });
  });
});
