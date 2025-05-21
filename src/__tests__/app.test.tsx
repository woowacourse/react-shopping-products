import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { screen } from "@testing-library/react";
import { expect } from "vitest";
import {
  mockExtendedProducts,
  mockQueryContextValue,
} from "../test-utils/mock-data";
import "@testing-library/jest-dom";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { QueryContextProvider } from "../contexts/QueryContext";
import { useGetQuery } from "../hooks/useGetQuery";
import { DataKey } from "../types/data-types";

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
  keyframes: (...args: string[]) => {
    return args.join("");
  },
  css: () => ({ name: "mock-css-result" }),
}));

const mockFetchProducts = vi.fn();
const mockFetchCart = vi.fn();
const mockShowError = vi.fn();

let testMockQueryContextValue = { ...mockQueryContextValue };

vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => testMockQueryContextValue,
  QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
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

vi.mock("../hooks/useGetQuery.ts", () => ({
  useGetQuery: vi.fn((key: DataKey) => {
    if (key === "products") {
      return {
        data: undefined,
        loading: false,
        error: null,
        refetch: mockFetchProducts,
        abort: vi.fn(),
      };
    }
    if (key === "cart-items") {
      return {
        data: undefined,
        loading: false,
        error: null,
        refetch: mockFetchCart,
        abort: vi.fn(),
      };
    }
    return {
      data: undefined,
      loading: false,
      error: null,
      refetch: vi.fn(),
      abort: vi.fn(),
    };
  }),
}));

describe("App - 필터링 및 상태 테스트", () => {
  beforeEach(() => {
    testMockQueryContextValue = {
      ...mockQueryContextValue,
      dataPool: {
        ...mockQueryContextValue.dataPool,
        products: {
          ...mockQueryContextValue.dataPool.products,
          content: mockExtendedProducts,
        },
      },
    };

    mockFetchProducts.mockClear();
    mockFetchCart.mockClear();
    mockShowError.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("컴포넌트 마운트시 fetchProducts와 fetchCart가 호출된다", () => {
    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
      </ErrorContextProvider>
    );

    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
    expect(mockFetchCart).toHaveBeenCalledTimes(1);
  });

  it("카테고리 필터링이 올바르게 동작한다", () => {
    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
      </ErrorContextProvider>
    );

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
    vi.mocked(useGetQuery).mockImplementation((key: DataKey) => {
      if (key === "products") {
        return {
          data: undefined,
          loading: true,
          error: null,
          refetch: mockFetchProducts,
          abort: vi.fn(),
        };
      }
      return {
        data: undefined,
        loading: false,
        error: null,
        refetch: vi.fn(),
        abort: vi.fn(),
      };
    });

    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
      </ErrorContextProvider>
    );

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });
});
