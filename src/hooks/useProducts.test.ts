import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "./useProducts";

describe("useProducts", () => {
  describe("상품 목록 조회", () => {
    it("상품 목록을 조회하면 20개의 상품을 불러온다.", async () => {
      const { result } = renderHook(() => useProducts());

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
      });
    });

    it("상품 목록 조회 중 로딩 상태가 true이다.", () => {
      const { result } = renderHook(() => useProducts());

      expect(result.current.isLoading).toBe(true);
    });
  });
});
