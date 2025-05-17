import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { screen } from "@testing-library/react";
import { expect } from "vitest";
import useFetch from "../hooks/useFetch";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import "@testing-library/jest-dom"; // For toBeInTheDocument matcher

vi.mock("../contexts/CartContext", () => ({
  useCartContext: () => ({
    setCartLength: vi.fn(),
    cartLength: 1,
  }),
}));

// Mock the emotion css prop
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

vi.mock("../components/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />,
}));

vi.mock("../hooks/useFetch", () => ({
  default: vi.fn((url) => {
    if (url.toString().includes("products")) {
      return {
        data: {
          content: [
            {
              id: 1,
              category: "패션잡화",
              name: "바지",
              price: 1000000,
              imageUrl: "laptop.jpg",
            },
            {
              id: 2,
              category: "패션잡화",
              name: "치마",
              price: 50000,
              imageUrl: "chair.jpg",
            },
            {
              id: 3,
              category: "식료품",
              name: "코카콜라",
              price: 2000,
              imageUrl: "coke.jpg",
            },
            {
              id: 4,
              category: "식료품",
              name: "사이다",
              price: 2000,
              imageUrl: "cider.jpg",
            },
          ],
        },
        isLoading: false,
        error: null,
        fetcher: vi.fn(),
      };
    }
    if (url.toString().includes("cart-items")) {
      return {
        data: {
          content: [
            {
              id: 101,
              product: {
                id: 2,
                category: "패션잡화",
                name: "치마",
                price: 50000,
                imageUrl: "chair.jpg",
              },
              quantity: 1,
            },
          ],
        },
        isLoading: false,
        error: null,
        fetcher: vi.fn(),
      };
    }
    return {
      data: { content: [] },
      isLoading: false,
      error: null,
      fetcher: vi.fn(),
    };
  }),
}));

describe("App - 필터링 및 상태 테스트", () => {
  it("카테고리 필터링이 올바르게 동작한다", () => {
    render(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    );

    const categoryDropdown = screen.getByText("전체");
    fireEvent.click(categoryDropdown);

    const electronicOption = screen.getByText("식료품");
    fireEvent.click(electronicOption);

    expect(screen.getByText("코카콜라")).toBeTruthy();
    expect(screen.getByText("사이다")).toBeTruthy();
    expect(screen.queryByText("바지")).toBe(null);
    expect(screen.queryByText("치마")).toBe(null);
  });

  it("로딩 상태에서는 스피너를 표시한다", () => {
    vi.mocked(useFetch).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
      fetcher: vi.fn(),
    });

    render(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    );
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("에러 상태에서는 에러 메시지를 표시한다", () => {
    vi.mocked(useFetch).mockReturnValueOnce({
      data: null,
      isLoading: false,
      error: new Error("API 에러 발생"),
      fetcher: vi.fn(),
    });

    render(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    );
    expect(screen.getByText(/에러/i)).toBeInTheDocument();
  });
});
