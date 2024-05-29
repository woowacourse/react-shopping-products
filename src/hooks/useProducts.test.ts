import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";
import { server } from "../mocks/server";
import useProducts from "./useProducts";
import { ErrorProvider } from "../context/errorContext";

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회하면 100개의 상품을 불러온다.", async () => {
      const { result } = renderHook(() => useProducts(), { wrapper: ErrorProvider });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(100);
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
});
