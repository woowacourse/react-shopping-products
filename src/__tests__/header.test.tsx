import "@testing-library/jest-dom";
import { cleanup, screen } from "@testing-library/react";
import { vi, expect } from "vitest";
import { mockCartItems, mockProducts } from "../test-utils/mock-data";
import { setupUseDataMock } from "../test-utils/setupUseDataMock";
import { renderHeaderWithProviders } from "../test-utils/renderWithProviders";

vi.mock("assets/cart.svg", () => ({
  default: "cart-icon-url",
}));
vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: vi.fn(), error: null }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => ({
    dataPool: { products: [...mockProducts], "cart-items": [...mockCartItems] },
    productsQuery: "낮은 가격순",
    setProductsQuery: vi.fn(),
  }),
  QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("Header 컴포넌트는", () => {
  beforeEach(() => {
    setupUseDataMock({ productsLoading: false, cartLoading: false });
  });
  afterEach(() => {
    cleanup();
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("올바르게 렌더링된다", async () => {
    await renderHeaderWithProviders();

    expect(screen.getAllByText("SHOP")).toBeTruthy();
    expect(screen.getAllByAltText("cart-icon")).toBeTruthy();
  });

  it("장바구니가 비어있을 때 숫자가 표시되지 않는다.", async () => {
    await renderHeaderWithProviders();

    const cartCountElement = screen.queryByText("0");
    expect(cartCountElement).toBeNull();
  });

  it("장바구니에 아이템이 있을 때 숫자가 표시된다", async () => {
    setupUseDataMock({
      productsData: [...mockProducts],
      cartData: [...mockCartItems],
    });
    await renderHeaderWithProviders();

    expect(screen.getByText("2")).toBeTruthy();
  });
});
