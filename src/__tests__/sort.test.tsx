import "@testing-library/jest-dom";
import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { mockProducts } from "../test-utils/mock-data";
import { setupUseDataMock } from "../test-utils/setupUseDataMock";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";
vi.mock("../components/ErrorToast/ErrorToast");
vi.mock("../components/Spinner/Spinner");
vi.mock("../components/Product/ProductCard");
vi.mock("../contexts/QueryContext", async () => {
  const actual = await vi.importActual("../contexts/QueryContext");
  return {
    ...actual,
    useQueryContext: () => ({
      dataPool: { products: [...mockProducts] },
    }),
  };
});
vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: vi.fn(), error: null }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("App에서는 정렬이 작동하며,", () => {
  beforeEach(() => {
    setupUseDataMock({ productsLoading: true, cartLoading: true });
  });
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('카테고리 드롭다운이 초기에는 "낮은 가격순"로 설정되어 있어야 한다', async () => {
    setupUseDataMock({ productsLoading: false, cartLoading: false });
    await renderAppWithProviders();

    const categoryDropdown = screen.getByText("낮은 가격순");
    expect(categoryDropdown).toBeDefined();
  });

  it("카테고리 옵션을 선택하면 각 정렬 기준에 따라 정렬된 상품이 표시되어야 한다.", async () => {
    setupUseDataMock({
      productsLoading: false,
      cartLoading: false,
      productsData: [...mockProducts],
    });
    await renderAppWithProviders();

    await waitFor(() => screen.getAllByTestId("loading-spinner"), {
      timeout: 3000,
    });

    // ── 3) 초기 “낮은 가격순” 정렬 확인
    const pricesAsc = getPrices();
    function getPrices() {
      return screen
        .getAllByTestId("product-card")
        .map((li) => Number(li.getAttribute("data-price")));
    }
    const sortedAsc = [...pricesAsc].sort((a, b) => a - b);
    expect(pricesAsc).toEqual(sortedAsc); // 오름차순이어야 함

    // ── 4) 드롭다운 열고 “높은 가격순” 선택
    fireEvent.click(screen.getByText("낮은 가격순"));

    fireEvent.click(screen.getByText("높은 가격순"));
    await waitFor(() => screen.getAllByTestId("loading-spinner"), {
      timeout: 3000,
    });
    // 상태 업데이트 → 재렌더까지 대기
    await waitFor(() => {
      const prices = getPrices();
      // prices가 최소 1개 이상이고, 첫 번째 원소가 마지막보다 크면 내림차순이라 간주
      expect(prices.length).toBeGreaterThan(0);
      expect(prices[0]).toBeGreaterThanOrEqual(prices[prices.length - 1]);
    });

    // ── 5) 최종 내림차순 검증
    const pricesDesc = getPrices();
    const sortedDesc = [...pricesDesc].sort((a, b) => b - a);
    expect(pricesDesc).toEqual(sortedDesc); // 내림차순이어야 함
  });
});
