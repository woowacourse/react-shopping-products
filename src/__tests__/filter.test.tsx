import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import "@testing-library/jest-dom";
import { mockQueryContextValue } from "../test-utils/mock-data";

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

vi.mock("../components/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />,
}));

const mockSetOrderBy = vi.fn();

vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => ({
    ...mockQueryContextValue,
    productFetchLoading: false,
    setProductsQuery: mockSetOrderBy,
  }),
}));

vi.mock("../hooks/useGetQuery", () => ({
  useGetQuery: () => ({
    loading: false,
    error: null,
    refetch: vi.fn(),
  }),
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

  it("정렬 드롭다운을 클릭하면 setOrderBy가 호출되어야 함", () => {
    const sortDropdown = screen.getByText("낮은 가격순");
    fireEvent.click(sortDropdown);

    const highToLow = screen.getByText("높은 가격순");
    fireEvent.click(highToLow);

    expect(mockSetOrderBy).toHaveBeenCalledWith("높은 가격순");
  });
});
