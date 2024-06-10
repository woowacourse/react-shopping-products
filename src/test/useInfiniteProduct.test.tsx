import { describe, it, expect } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useInfiniteProduct } from "@/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useInfiniteProduct hook 테스트", () => {
  it("첫 페이지는 아이템의 개수가 20개이다.", async () => {
    const { result } = renderHook(
      () => useInfiniteProduct("books", "price,id,asc"),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    if (result.current.data) {
      expect(result.current.data?.pages[0].content).toHaveLength(20);
    }
  });

  it("두 번째 페이지부터는 아이템의 개수가 4개이다", async () => {
    const { result } = renderHook(
      () => useInfiniteProduct("books", "price,id,asc"),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    await act(async () => {
      result.current.fetchNextPage();
    });

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    if (result.current.data) {
      expect(result.current.data?.pages[1].content).toHaveLength(4);
    }
  });

  it.only("카테고리가 books인 상품을 낮은 가격순으로 반환한다.", async () => {
    const { result } = renderHook(
      () => useInfiniteProduct("books", "price,id,asc"),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    const products = result.current.data?.pages[0].content;

    if (products) {
      for (let i = 1; i < products.length; i++) {
        expect(products[i - 1].category === "books");
        expect(products[i - 1].price).toBeLessThanOrEqual(products[i].price);
        if (products[i - 1].price === products[i].price) {
          expect(products[i - 1].id).toBeLessThanOrEqual(products[i].id);
        }
      }
    }
  });

  it("카테고리가 electronics인 상품을 높은 가격순으로 반환한다.", async () => {
    const { result } = renderHook(
      () => useInfiniteProduct("electronics", "price,id,desc"),
      { wrapper }
    );

    await waitFor(() => expect(result.current.isFetching).toBe(false));

    const products = result.current.data?.pages[0].content;
    if (products) {
      for (let i = 1; i < products.length; i++) {
        expect(products[i - 1].category === "electronics");
        expect(products[i - 1].price).toBeGreaterThanOrEqual(products[i].price);
        if (products[i - 1].price === products[i].price) {
          expect(products[i - 1].id).toBeGreaterThanOrEqual(products[i].id);
        }
      }
    }
  });
});
