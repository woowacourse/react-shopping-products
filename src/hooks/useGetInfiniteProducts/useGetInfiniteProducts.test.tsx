import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useGetInfiniteProducts from "./index";

const PAGE_SIZE = 4;
const INITIAL_PAGE_SIZE = 20;

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCartItems", () => {
  it(`첫 로딩 시 ${INITIAL_PAGE_SIZE}개를 불러온다.`, async () => {
    const { result } = renderHook(() => useGetInfiniteProducts(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    expect(result.current.products).toHaveLength(20);
  });

  it(`첫 로딩 이후에는 ${PAGE_SIZE}개를 불러온다.`, async () => {
    const { result } = renderHook(() => useGetInfiniteProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(INITIAL_PAGE_SIZE);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(
        INITIAL_PAGE_SIZE + PAGE_SIZE
      );
    });
  });

  it("카테고리 필터를 적용할 경우, 해당 카테고리의 상품만 불러온다.", async () => {
    const CATEGORY = "fashion";

    const { result } = renderHook(() => useGetInfiniteProducts(), { wrapper });

    act(() => {
      result.current.setCategoryFilter(CATEGORY);
    });

    await waitFor(() => {
      expect(
        result.current.products.every(
          (product) => product.category === CATEGORY
        )
      ).toBe(true);
    });
  });
  it("선택한 가격 정렬 기준에 따라 상품을 불러온다.", async () => {
    const PRICE_SORT = "desc";
    const { result } = renderHook(() => useGetInfiniteProducts(), { wrapper });

    act(() => {
      result.current.setPriceSort(PRICE_SORT);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    const sortedProducts = result.current.products
      .slice()
      .sort((a, b) => b.price - a.price);

    await waitFor(() => {
      expect(result.current.products).toEqual(sortedProducts);
    });
  });

  it("존재하는 모든 상품을 불러오면 더 이상 요청을 보내지 않는다.", async () => {
    const FIRST_PAGE = 1;
    const LAST_PAGE = 20;

    queryClient.clear();

    const { result } = renderHook(() => useGetInfiniteProducts(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    expect(result.current.products).toHaveLength(INITIAL_PAGE_SIZE);

    // NOTE : 마지막 페이지에 도달하기 위한 for문
    for (
      let currentPage = FIRST_PAGE;
      currentPage <= LAST_PAGE;
      currentPage++
    ) {
      await waitFor(() => {
        act(() => {
          result.current.fetchNextPage();
        });
      });

      const expectedLength = INITIAL_PAGE_SIZE + currentPage * PAGE_SIZE;

      await waitFor(() => {
        expect(result.current.products).toHaveLength(expectedLength);
      });
    }

    await act(async () => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(100);
    });
  });
});
