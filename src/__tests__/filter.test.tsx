import { screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import "@testing-library/jest-dom";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";
import { mockProducts } from "../test-utils/mock-data";
import { setupUseDataMock } from "../test-utils/setupUseDataMock";

const mockSetOrderBy = vi.fn();

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
    setProductsQuery: mockSetOrderBy,
  }),
  QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("App에서는 필터링이 작동하며,", () => {
  beforeEach(() => {
    setupUseDataMock({ productsLoading: true, cartLoading: true });
  });
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });
  it('카테고리 드롭다운이 초기에는 "전체"로 설정되어 있어야 함', async () => {
    setupUseDataMock({ productsLoading: false, cartLoading: false });
    await renderAppWithProviders();
    const categoryDropdown = screen.getByText("전체");
    expect(categoryDropdown).toBeDefined();
  });

  it("카테고리 드롭다운을 클릭하면 옵션 목록이 표시되어야 함", async () => {
    await renderAppWithProviders();
    const categoryDropdown = screen.getByText("전체");

    fireEvent.click(categoryDropdown);

    expect(screen.getByText("패션잡화")).toBeDefined();
    expect(screen.getByText("식료품")).toBeDefined();
  });

  it("카테고리 옵션을 선택하면 해당 카테고리의 상품만 표시되어야 함", async () => {
    setupUseDataMock({
      productsLoading: false,
      cartLoading: false,
      productsData: [...mockProducts],
    });
    await renderAppWithProviders();
    const categoryDropdown = screen.getByText("전체");

    fireEvent.click(categoryDropdown);

    fireEvent.click(screen.getByText("패션잡화"));

    expect(screen.getByText("바지")).toBeDefined();
    expect(screen.getByText("치마")).toBeDefined();
    expect(screen.queryByText("코카콜라")).toBeNull();
  });

  it("정렬 드롭다운을 클릭하면 setOrderBy가 호출되어야 함", async () => {
    await renderAppWithProviders();
    const sortDropdown = screen.getByText("낮은 가격순");
    fireEvent.click(sortDropdown);

    const highToLow = screen.getByText("높은 가격순");
    fireEvent.click(highToLow);

    expect(mockSetOrderBy).toHaveBeenCalledWith("높은 가격순");
  });
});
