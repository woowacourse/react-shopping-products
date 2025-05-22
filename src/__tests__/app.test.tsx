import React from "react";
import { cleanup, screen } from "@testing-library/react";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import "@testing-library/jest-dom";
import {
  setupUseDataMock,
  mockFetchProducts,
  mockFetchCart,
} from "../test-utils/setupUseDataMock";
import { mockProducts } from "../test-utils/mock-data";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

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

describe("App에서는 ", () => {
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });

  describe("로딩 상태에", () => {
    beforeEach(() => {
      setupUseDataMock({ productsLoading: true, cartLoading: true });
    });

    it("마운트 시 스피너가 보인다", async () => {
      await renderAppWithProviders();

      const spinner = await screen.findByTestId("loading-spinner");
      expect(spinner).toBeInTheDocument();
    });
  });

  describe("초기화 단계에서는", () => {
    beforeEach(() => {
      setupUseDataMock({ productsData: [...mockProducts], cartData: [] });
    });

    it("컴포넌트 마운트 시 두개의 fetch 함수가 호출된다", async () => {
      await renderAppWithProviders();
      expect(mockFetchProducts).toHaveBeenCalledTimes(1);
      expect(mockFetchCart).toHaveBeenCalledTimes(1);
    });
  });
});
