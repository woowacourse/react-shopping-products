import React from "react";
import { cleanup, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import "@testing-library/jest-dom";
import {
  setupUseDataMock,
  mockFetchProducts,
  mockFetchCart,
} from "../test-utils/setupUseDataMock";
import { mockProducts } from "../test-utils/mock-data";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

vi.mock("@emotion/react");
vi.mock("../components/ErrorToast/ErrorToast");
vi.mock("../components/Spinner/Spinner");

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: vi.fn(), error: null }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => ({
    dataPool: { products: [...mockProducts] },
    productsQuery: "낮은 가격순",
    setProductsQuery: vi.fn(),
  }),
  QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("App UI", () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("로딩 상태", () => {
    beforeEach(() => {
      setupUseDataMock({ productsLoading: true, cartLoading: true });
    });

    it("마운트 시 스피너가 보인다", async () => {
      await renderAppWithProviders();

      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });

  describe("데이터 로드 후 UI", () => {
    beforeEach(() => {
      setupUseDataMock({ productsData: [...mockProducts], cartData: [] });
    });

    it("컴포넌트 마운트 시 fetch 함수가 호출된다", async () => {
      await renderAppWithProviders();
      expect(mockFetchProducts).toHaveBeenCalledTimes(1);
      expect(mockFetchCart).toHaveBeenCalledTimes(1);
    });

    it("카테고리 필터링이 올바르게 동작한다", async () => {
      await renderAppWithProviders();

      await waitFor(() => expect(screen.getByText("바지")).toBeInTheDocument());

      fireEvent.click(screen.getByText("전체"));
      fireEvent.click(screen.getByText("식료품"));

      expect(screen.getByText("코카콜라")).toBeInTheDocument();
      expect(screen.getByText("사이다")).toBeInTheDocument();
      expect(screen.queryByText("바지")).not.toBeInTheDocument();
      expect(screen.queryByText("치마")).not.toBeInTheDocument();
    });
  });
});
