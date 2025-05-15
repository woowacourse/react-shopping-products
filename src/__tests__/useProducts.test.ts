import { renderHook } from "@testing-library/react";
import useProducts from "../hooks/useProducts";
import { waitFor } from "@testing-library/react";

describe("useProducts integration (real API)", () => {
  it("상품 목록을 20개씩 보여준다 (실제 API)", async () => {
    const { result } = renderHook(() => useProducts());

    // 로딩이 끝날 때까지 대기
    await waitFor(() => {
      expect(result.current.isProductsLoading).toBe(false);
    });

    // 상품이 20개 이하로 반환되는지 확인
    expect(result.current.products).toBeDefined();
    expect(result.current.products?.length).toBeLessThanOrEqual(20);
    expect(result.current.products?.length).toBeGreaterThan(0);
  });
});
