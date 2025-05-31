import { act, renderHook, waitFor } from "@testing-library/react";
import useProducts from "../hooks/useProducts";
import { ErrorProvider } from "../contexts";
import { server } from "../mocks/node";
import { QueryProvider } from "../contexts/QueryContext";
import MOCKING_PRODUCT_DATA from "../../src/mocks/data/products.json";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ErrorProvider>
    <QueryProvider>{children}</QueryProvider>
  </ErrorProvider>
);

describe("useProducts 훅 테스트", () => {
  it("전체 상품을 불러올 수 있다.", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });
    await waitFor(() => {
      expect(result.current.products).toEqual(MOCKING_PRODUCT_DATA.content.sort((a, b) => b.price - a.price));
    });
  });

  it("(패션잡화) 카테고리 필터 적용 시 해당 항목만 남는다", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      act(() => {
        result.current.setFilter("패션잡화");
      });
    });

    await waitFor(() => {
      expect(result.current.products.every((p) => p.category === "패션잡화")).toBe(true);
    });
  });

  it("(식료품) 카테고리 필터 적용 시 해당 항목만 남는다", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      act(() => {
        result.current.setFilter("식료품");
      });
    });

    await waitFor(() => {
      expect(result.current.products.every((p) => p.category === "식료품")).toBe(true);
    });
  });

  it("낮은 가격순 정렬시 낮은 가격으로 정렬된다.", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      act(() => {
        result.current.setSort("낮은 가격순");
      });
    });

    await waitFor(() => {
      const prices = result.current.products.map((p) => p.price);
      const sortedPrices = [...prices].sort((a, b) => a - b);

      expect(prices).toEqual(sortedPrices);
    });
  });

  it("높은 가격순 정렬시 높은 가격으로 정렬된다.", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    await waitFor(() => {
      act(() => {
        result.current.setSort("높은 가격순");
      });
    });

    await waitFor(() => {
      const prices = result.current.products.map((p) => p.price);
      const sortedPrices = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sortedPrices);
    });
  });
});
