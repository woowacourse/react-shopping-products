import { cleanup, waitFor } from "@testing-library/react";
import { vi } from "vitest";

import { mockProducts } from "../test-utils/mock-data";
import { setupUseDataMock } from "../test-utils/setupUseDataMock";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

const mockShowError = vi.fn();

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: mockShowError, error: null }),
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
  beforeEach(() => {
    setupUseDataMock({ productsLoading: true, cartLoading: true });
  });
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });
  test("제품 정보 가져오기 실패시 해당 오류가 호출되어야 한다.", async () => {
    setupUseDataMock({
      productsData: [...mockProducts],
      productsError: new Error("제품 정보를 가져오는데 실패했습니다."),
      cartData: [],
    });
    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 해당 오류가 호출되어야 한다.", async () => {
    setupUseDataMock({
      productsData: [...mockProducts],
      productsError: null,
      cartData: [],
      cartError: new Error("장바구니 정보를 가져오는데 실패했습니다."),
    });

    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("여러 개의 에러가 발생했을 때 모든 에러가 처리되어야 한다.", async () => {
    setupUseDataMock({
      productsData: [...mockProducts],
      productsError: new Error("제품 정보를 가져오는데 실패했습니다."),
      cartData: [],
      cartError: new Error("장바구니 정보를 가져오는데 실패했습니다."),
    });
    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledTimes(2);
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("에러가 없는 경우 해당 오류가 호출되지 않아야 함", async () => {
    setupUseDataMock({
      productsData: [...mockProducts],
      productsError: null,
      cartData: [],
      cartError: null,
    });
    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });
  });
});
