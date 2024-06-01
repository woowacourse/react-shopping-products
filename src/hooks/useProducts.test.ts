import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import useProducts from "@/hooks/useProducts";
import { server } from "@/mocks/servers";
import { renderHook, waitFor, act } from "@testing-library/react";
import { HttpResponse, http } from "msw";

describe("useProducts 테스트", () => {
  it("상품 목록을 조회한다.", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.fetchProductPage("전체", 0, "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });
  });

  it("상품 목록 조회 중 로딩 상태", () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
  });

  it("상품 목록 조회 중 에러 상태", async () => {
    server.use(
      http.get(SERVER_URL.apiUrl + END_POINT.products, () => {
        return new HttpResponse(JSON.stringify({ ok: false }), { status: 500 });
      })
    );

    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.fetchProductPage("건강", 1, "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.fetchProductPage("전체", 0, "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.currentPage).toBe(1);
    });

    act(() => {
      result.current.fetchProductPage("도서", 1, "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
      expect(result.current.currentPage).toBe(2);
    });
  });
});
