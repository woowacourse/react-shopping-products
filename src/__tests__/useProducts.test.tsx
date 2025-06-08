import { act, renderHook, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { APIProvider } from "../apis/contexts/APIContext";
import { Products } from "../apis/types/response";
import { ProductsAPI } from "../features/product/apis/ProductsAPI";
import {
  CategoryOptionsKey,
  SortOptionsKey,
} from "../features/product/config/filter";
import { useProducts } from "../features/product/hooks/useProducts";
import { ToastProvider } from "../shared/contexts/ToastContext";
import { API_BASE_URL } from "../apis/httpClient";

const PRODUCTS_URL = "products";

const wrapper = ({ children }: React.PropsWithChildren) => (
  <MemoryRouter initialEntries={["/?category=전체&sort=낮은 가격 순"]}>
    <ToastProvider>
      <APIProvider>{children}</APIProvider>
    </ToastProvider>
  </MemoryRouter>
);

describe("useProducts 훅", () => {
  it("초기 상태가 올바르게 설정된다", async () => {
    const { result } = renderHook(() => useProducts(), { wrapper });

    expect(result.current.products).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.products).not.toBeNull();
    });

    expect(result.current.category).toBe("전체");
    expect(result.current.sortOption).toBe("낮은 가격 순");
    expect(result.current.products?.content.length).toBeGreaterThan(0);
  });

  describe("카테고리 변경 시 상품 목록이 올바르게 필터링된다", () => {
    it("카테고리 변경 시 카테고리 상태가 올바르게 업데이트된다", async () => {
      const getSpy = vi.spyOn(ProductsAPI, "get");
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        result.current.setCategory("패션잡화" as CategoryOptionsKey);
      });

      expect(result.current.category).toBe("패션잡화");
      expect(getSpy).toHaveBeenLastCalledWith("패션잡화", "낮은 가격 순");
    });

    it("카테고리 매개변수로 직접 API를 호출하면 필터링된 결과를 반환한다", async () => {
      const response = await fetch(
        `${API_BASE_URL}${PRODUCTS_URL}?category=패션잡화`
      );
      const data = (await response.json()) as Products;

      expect(
        data.content.every((product) => product.category === "패션잡화")
      ).toBe(true);
    });
  });

  describe("정렬 옵션 변경 시 상태와 API 호출이 올바르게 업데이트된다", () => {
    it("정렬 옵션 변경 시 정렬 옵션 상태가 올바르게 업데이트된다", async () => {
      const getSpy = vi.spyOn(ProductsAPI, "get");
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        result.current.setSortOption("높은 가격 순" as SortOptionsKey);
      });

      expect(result.current.sortOption).toBe("높은 가격 순");
      expect(getSpy).toHaveBeenLastCalledWith("전체", "높은 가격 순");
    });

    it("정렬 매개변수로 직접 API를 호출하면 필터링된 결과를 반환한다", async () => {
      const response = await fetch(
        `${API_BASE_URL}${PRODUCTS_URL}?sort=price,desc`
      );
      const data = (await response.json()) as Products;
      const prices = data.content.map((product) => product.price);

      expect(
        prices.every((price, i) => i === 0 || price <= prices[i - 1])
      ).toBe(true);
    });
  });

  describe("복합 필터링 및 정렬", () => {
    it("카테고리와 정렬 옵션을 모두 변경하면 상태가 올바르게 업데이트된다", async () => {
      const getSpy = vi.spyOn(ProductsAPI, "get");
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      await act(async () => {
        result.current.setCategory("패션잡화" as CategoryOptionsKey);
      });

      expect(result.current.category).toBe("패션잡화");
      expect(getSpy).toHaveBeenLastCalledWith("패션잡화", "낮은 가격 순");

      await act(async () => {
        result.current.setSortOption("높은 가격 순" as SortOptionsKey);
      });

      expect(result.current.category).toBe("패션잡화");
      expect(result.current.sortOption).toBe("높은 가격 순");
      expect(getSpy).toHaveBeenLastCalledWith("패션잡화", "높은 가격 순");
    });

    it("카테고리와 정렬 매개변수로 직접 API를 호출하면 필터링된 결과를 반환한다", async () => {
      const response = await fetch(
        `${API_BASE_URL}${PRODUCTS_URL}?category=패션잡화&sort=price,desc`
      );
      const data = (await response.json()) as Products;

      expect(data.content.length).toBeGreaterThan(0);
      expect(
        data.content.every((product) => product.category === "패션잡화")
      ).toBe(true);

      const prices = data.content.map((product) => product.price);
      expect(
        prices.every((price, i) => i === 0 || price <= prices[i - 1])
      ).toBe(true);
    });
  });

  describe("데이터 다시 가져오기", () => {
    it("refetchProducts 함수 호출 시 데이터를 다시 가져온다", async () => {
      const getSpy = vi.spyOn(ProductsAPI, "get");
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      const callCount = getSpy.mock.calls.length;

      await act(async () => {
        result.current.refetchProducts();
      });

      expect(getSpy.mock.calls.length).toBeGreaterThan(callCount);

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.products).not.toBeNull();
      });
    });
  });

  describe("상품 데이터 특성", () => {
    it("상품 목록에 품절 상품과 재고 있는 상품이 모두 포함된다", async () => {
      const { result } = renderHook(() => useProducts(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.products).not.toBeNull();
      });

      const hasOutOfStock = result.current.products?.content.some(
        (product) => product.quantity === 0
      );
      const hasInStock = result.current.products?.content.some(
        (product) => product.quantity > 0
      );

      expect(hasOutOfStock).toBe(true);
      expect(hasInStock).toBe(true);
    });
  });
});
