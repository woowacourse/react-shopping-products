import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import "@testing-library/jest-dom"; // This will add the custom matchers like toBeInTheDocument

// Mock the CartContext
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

// Mock useFetch for test data
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

// Mock the Spinner component
vi.mock("../components/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />,
}));

describe("App Dropdown 테스트", () => {
  beforeEach(() => {
    render(
      <ErrorContextProvider>
        <App />
      </ErrorContextProvider>
    );
  });

  it('카테고리 드롭다운이 초기에는 "전체"로 설정되어 있어야 함', () => {
    const categoryDropdown = screen.getByText("전체");
    expect(categoryDropdown).toBeDefined();
  });

  it("카테고리 드롭다운을 클릭하면 옵션 목록이 표시되어야 함", () => {
    // 카테고리 드롭다운 버튼 찾기
    const categoryDropdown = screen.getByText("전체");

    // 드롭다운 클릭
    fireEvent.click(categoryDropdown);

    // 카테고리 옵션이 표시되는지 확인
    expect(screen.getByText("패션잡화")).toBeDefined();
    expect(screen.getByText("식료품")).toBeDefined();
  });

  it("카테고리 옵션을 선택하면 해당 카테고리의 상품만 표시되어야 함", () => {
    // 카테고리 드롭다운 버튼 찾기
    const categoryDropdown = screen.getByText("전체");

    // 드롭다운 클릭
    fireEvent.click(categoryDropdown);

    // 패션잡화 카테고리 선택
    fireEvent.click(screen.getByText("패션잡화"));

    // 패션잡화 카테고리의 상품만 있는지 확인
    expect(screen.getByText("바지")).toBeDefined();
    expect(screen.getByText("치마")).toBeDefined();
    expect(screen.queryByText("코카콜라")).toBeNull();
  });

  it("정렬 드롭다운 테스트 - 낮은 가격순 정렬", () => {
    // 정렬 드롭다운 찾기 (초기값은 낮은 가격순일 것으로 가정)
    const sortDropdown = screen.getByText(/낮은 가격순/);

    // 드롭다운 클릭
    fireEvent.click(sortDropdown);

    // 다른 정렬 옵션 선택
    fireEvent.click(screen.getByText("높은 가격순"));

    // 변경된 정렬이 적용되었는지 확인
    expect(screen.getByText("높은 가격순")).toBeDefined();
  });
});
