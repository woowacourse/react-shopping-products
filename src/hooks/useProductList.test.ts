import { http, HttpResponse } from "msw";
import { act } from "react";

import { renderHook, waitFor } from "@testing-library/react";

import { PRODUCTS_ENDPOINT } from "../apis/config";
import expectedDefaultParamsData from "../mocks/handlers/productList/expectedDefaultParamsData.json";
import expectedFitnessPriceDescData from "../mocks/handlers/productList/expectedFitnessPriceDescData.json";
import { server } from "../mocks/server";
import useProductList from "./useProductList";
import { Category } from "../interfaces/Product";
import { Sorting } from "../interfaces/Sorting";

describe("useProductList", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회한다.", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );
      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
      });
    });

    it("상품 목록 조회 중 로딩 상태", () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );

      expect(result.current.productListLoading).toBe(true);
    });

    it("상품 목록 조회 중 에러 상태", async () => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );

      await waitFor(() => {
        expect(result.current.productList).toEqual([]);
        expect(result.current.productListLoading).toBe(false);
        expect(result.current.productListError).toBeTruthy();
      });
    });
  });

  describe("페이지네이션", () => {
    it("초기에 첫 페이지의 상품 20개를 불러온다", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
        expect(result.current.page).toBe(0);
      });
    });

    it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
        expect(result.current.page).toBe(0);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(24);
        expect(result.current.page).toBe(5);
      });
    });

    it("모든 페이지의 상품을 불러오면 더 이상 요청하지 않는다.", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
      });

      for (let i = 5; i < 38; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = 20 + (i - 4) * 4;

        await waitFor(() => {
          expect(result.current.productList).toHaveLength(expectedLength);
          expect(result.current.page).toBe(i);
        });
      }

      await act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(154);
        expect(result.current.page).toBe(38);
      });
    });

    it("페이지네이션으로 추가 데이터를 불러올 때 로딩 상태를 표시한다.", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );

      await waitFor(() => {
        expect(result.current.productListLoading).toBe(false);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      expect(result.current.productListLoading).toBe(true);

      await waitFor(() => {
        expect(result.current.productListLoading).toBe(false);
      });
    });
  });

  describe("상품 목록 카테고리 필터 및 정렬", () => {
    it("기본 값은 전체 카테고리를 낮은 가격순으로 정렬한다.", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: undefined,
          sortOption: Sorting.PRICE_ASC,
        })
      );
      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
        expect(result.current.productList).toStrictEqual(
          expectedDefaultParamsData
        );
      });
    });

    it("전달된 category의 product만을 필터링한 후 전달된 sort 옵션에 따라 정렬하여 보여준다.", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: "fitness" as Category,
          sortOption: "price,desc" as Sorting,
        })
      );
      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
        expect(result.current.productList).toStrictEqual(
          expectedFitnessPriceDescData.slice(0, 20)
        );
      });
    });

    it("정렬 및 필터링된 데이터의 모든 상품을 가져오면 더 이상 요청하지 않는다.", async () => {
      const { result } = renderHook(() =>
        useProductList({
          category: "fitness" as Category,
          sortOption: "price,desc" as Sorting,
        })
      );
      await waitFor(() => {
        expect(result.current.productList).toHaveLength(20);
        expect(result.current.productList).toStrictEqual(
          expectedFitnessPriceDescData.slice(0, 20)
        );
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.productList).toHaveLength(24);
        expect(result.current.productList).toStrictEqual(
          expectedFitnessPriceDescData
        );
      });
    });
  });
});
