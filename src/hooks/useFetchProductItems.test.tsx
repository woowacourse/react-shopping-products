import useFetchProductItems from "@/hooks/useFetchProductItems";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useProducts 테스트", () => {
  it("상품 목록을 조회 시 첫 페이지는 20개의 상품을 불러온다.", async () => {
    const { result } = renderHook(() => useFetchProductItems("전체", "낮은 가격순"), { wrapper });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(20);
    });
  });

  it("상품 목록 조회 시 첫 페이지 이외에는 페이지는 4개의 아이템을 불러온다.", async () => {
    const { result } = renderHook(() => useFetchProductItems("전체", "낮은 가격순"), { wrapper });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(20);
    });

    act(() => {
      expect(result.current.fetchNextPage());
    });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(24);
    });
  });
});
