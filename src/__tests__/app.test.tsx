import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { screen } from "@testing-library/react";
import { expect } from "vitest";
import { mockExtendedProducts, mockCartItems } from "../test-utils/mock-data";
import "@testing-library/jest-dom";
import { Product } from "../types/product";

vi.mock("../components/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />,
}));

vi.mock("../components/ErrorToast/ErrorToast", () => ({
  __esModule: true,
  default: () => <div data-testid="error-toast" />,
}));

vi.mock("@emotion/react", () => ({
  jsx: (
    type: React.ElementType,
    props: Record<string, unknown>,
    ...children: React.ReactNode[]
  ) => {
    return React.createElement(
      type,
      { ...props, className: "emotion-class" },
      ...children
    );
  },
  css: () => ({ name: "mock-css-result" }),
}));

const mockFetchProducts = vi.fn();
const mockFetchCart = vi.fn();
const mockShowError = vi.fn();

let productContextMock = {
  productsData: mockExtendedProducts,
  productFetchLoading: false,
  productFetchError: null as Error | null,
  fetchProducts: mockFetchProducts,
  orderBy: "낮은 가격순",
  setOrderBy: vi.fn(),
};

vi.mock("../contexts/ProductContext", () => ({
  useProductContext: () => productContextMock,
  ProductContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("../contexts/CartContext", () => ({
  useCartContext: () => ({
    cartData: mockCartItems,
    cartFetchLoading: false,
    cartFetchError: null,
    fetchCart: mockFetchCart,
    setCartLength: vi.fn(),
    cartLength: 1,
  }),
  CartContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({
    showError: mockShowError,
    error: null,
  }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("App - 필터링 및 상태 테스트", () => {
  beforeEach(() => {
    productContextMock = {
      productsData: mockExtendedProducts,
      productFetchLoading: false,
      productFetchError: null,
      fetchProducts: mockFetchProducts,
      orderBy: "낮은 가격순",
      setOrderBy: vi.fn(),
    };

    mockFetchProducts.mockClear();
    mockFetchCart.mockClear();
    mockShowError.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("컴포넌트 마운트시 fetchProducts와 fetchCart가 호출된다", () => {
    render(<App />);

    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
    expect(mockFetchCart).toHaveBeenCalledTimes(1);
  });

  it("카테고리 필터링이 올바르게 동작한다", () => {
    render(<App />);

    expect(screen.getByText("바지")).toBeInTheDocument();
    expect(screen.getByText("치마")).toBeInTheDocument();
    expect(screen.getByText("코카콜라")).toBeInTheDocument();
    expect(screen.getByText("사이다")).toBeInTheDocument();

    const categoryDropdown = screen.getByText("전체");
    fireEvent.click(categoryDropdown);

    const foodOption = screen.getByText("식료품");
    fireEvent.click(foodOption);

    expect(screen.getByText("코카콜라")).toBeInTheDocument();
    expect(screen.getByText("사이다")).toBeInTheDocument();
    expect(screen.queryByText("바지")).not.toBeInTheDocument();
    expect(screen.queryByText("치마")).not.toBeInTheDocument();
  });

  it("로딩 상태에서는 스피너를 표시한다", () => {
    productContextMock.productFetchLoading = true;
    productContextMock.productsData = [] as Product[];

    render(<App />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
