import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import useFilteredProducts from "@/hooks/server/useFilteredProducts";
import { SIZE_FIRST_PAGE, SIZE_PER_PAGE } from "@/constants/page";
import { act } from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useProducts 테스트", () => {
  it(`첫 페이지에서는 ${SIZE_FIRST_PAGE}개의 상품을 불러온다.`, async () => {
    const sort = "낮은 가격순";
    const category = "전체";
    const { result } = renderHook(() => useFilteredProducts({ sort, category }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(SIZE_FIRST_PAGE);
    });
  });

  it(`두번쨰 페이지부터는 ${SIZE_PER_PAGE}개의 상품을 불러온다.`, async () => {
    const sort = "낮은 가격순";
    const category = "전체";
    const { result } = renderHook(() => useFilteredProducts({ sort, category }), {
      wrapper,
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.data?.pages).toHaveLength(SIZE_FIRST_PAGE + SIZE_PER_PAGE);
    });
  });
});
