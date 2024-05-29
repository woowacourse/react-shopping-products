import { act, renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import { ErrorProvider } from "../context/errorContext";
import { server } from "../mocks/server";
import useProducts from "./useProducts";

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회하면 20개의 상품을 불러온다.", async () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ErrorProvider });
      console.log(result);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it("상품 목록 조회 중 로딩 상태가 true이다.", () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ErrorProvider });

      expect(result.current.isLoading).toBe(true);
    });

    it.each([[400], [404], [500]])("상품 목록 조회 중 %i 에러가 발생한다.", async (status) => {
      server.use(
        http.get(PRODUCTS_ENDPOINT, () => {
          return new HttpResponse(null, { status });
        })
      );

      const { result } = renderHook(() => useProducts(), { wrapper: ErrorProvider });

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe("페이지네이션", () => {
    it("초기에 첫 페이지의 상품 20개를 불러온다", async () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ErrorProvider });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(1);
      });
    });

    it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ErrorProvider });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.page).toBe(1);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(24);
        expect(result.current.page).toBe(2);
      });
    });
  });
});
