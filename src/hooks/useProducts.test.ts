import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import useProducts from "@/hooks/useProducts";
import { server } from "@/mocks/servers";
import { renderHook, waitFor, act } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import mockProducts from "@/mocks/mockResponse/products.json";
import { SIZE_FIRST_PAGE, SIZE_PER_PAGE } from "@/hooks/useProducts";

describe("useProducts 테스트", () => {
  it("상품 목록을 조회한다.", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.fetchFirstPage("전체", "낮은 가격순");
    });

    const expectedLength = mockProducts.content.length;

    await waitFor(() => {
      expect(result.current.products).toHaveLength(expectedLength);
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
      result.current.fetchFirstPage("건강", "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  });

  it("다음 페이지의 상품 4개를 추가로 불러온다", async () => {
    const { result } = renderHook(() => useProducts());

    act(() => {
      result.current.fetchFirstPage("전체", "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
      expect(result.current.currentPage).toBe(1);
    });

    act(() => {
      result.current.fetchNextPage("도서", 1, "낮은 가격순");
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(SIZE_FIRST_PAGE + SIZE_PER_PAGE);
      expect(result.current.currentPage).toBe(2);
    });
  });
});
