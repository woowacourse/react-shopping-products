import { render, screen } from "@testing-library/react";
import { vi, expect } from "vitest";

import Header from "../components/Header/Header";

import "@testing-library/jest-dom";

import { ErrorContextProvider } from "../contexts/ErrorContext";
import { mockQueryContextValue } from "../test-utils/mock-data";
vi.mock("assets/cart.svg", () => ({
  default: "cart-icon-url",
}));
vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => ({
    ...mockQueryContextValue,
    productFetchLoading: false,
    setProductsQuery: vi.fn(),
  }),
}));

vi.mock("../hooks/useGetQuery", () => ({
  useGetQuery: () => ({
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),
}));

describe("Header 컴포넌트", () => {
  beforeEach(() => {
    // Clear mocks before each test
  });

  it("Header 컴포넌트가 올바르게 렌더링된다", () => {
    render(
      <ErrorContextProvider>
        <Header />
      </ErrorContextProvider>
    );

    expect(screen.getByText("SHOP")).toBeTruthy();
    expect(screen.getByAltText("cart-icon")).toBeTruthy();
  });

  it("장바구니가 비어있을 때 숫자가 표시되지 않는다.", () => {
    render(
      <ErrorContextProvider>
        <Header />
      </ErrorContextProvider>
    );

    const cartCountElement = screen.queryByText("0");
    expect(cartCountElement).toBeNull();
  });

  it("장바구니에 아이템이 있을 때 숫자가 표시된다", () => {
    vi.mock("../contexts/QueryContext", () => ({
      useQueryContext: () => mockQueryContextValue,
      QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
        <>{children}</>
      ),
    }));

    render(
      <ErrorContextProvider>
        <Header />
      </ErrorContextProvider>
    );

    // Check that the cart count is displayed correctly
    const cartCountElement = screen.getByText("2");
    expect(cartCountElement).toBeTruthy();
    expect(cartCountElement).not.toHaveAttribute("hidden");
  });
});
