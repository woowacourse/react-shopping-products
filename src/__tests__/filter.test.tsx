import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import "@testing-library/jest-dom"; // This will add the custom matchers like toBeInTheDocument
import { ProductContextProvider } from "../contexts/ProductContext";
import { CartContextProvider } from "../contexts/CartContext";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";

const mockProducts: Product[] = [
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
];
const mockCartItems: CartItem[] = [];

const mockFetchProducts = vi.fn();
const mockSetOrderBy = vi.fn();
const mockFetchCart = vi.fn();

vi.mock("../contexts/ProductContext", async () => {
  const actual = await vi.importActual("../contexts/ProductContext");
  return {
    ...(actual as object),
    useProductContext: () => ({
      productsData: mockProducts,
      productFetchLoading: false,
      productFetchError: null,
      fetchProducts: mockFetchProducts,
      orderBy: "낮은 가격순",
      setOrderBy: mockSetOrderBy,
    }),
  };
});

vi.mock("../contexts/CartContext", async () => {
  const actual = await vi.importActual("../contexts/CartContext");
  return {
    ...(actual as object),
    useCartContext: () => ({
      cartData: mockCartItems,
      cartFetchLoading: false,
      cartFetchError: null,
      fetchCart: mockFetchCart,
    }),
  };
});

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

// Mock the Spinner component
vi.mock("../components/Spinner/Spinner", () => ({
  __esModule: true,
  default: () => <div data-testid="loading-spinner" />,
}));

describe("App Dropdown 테스트", () => {
  beforeEach(() => {
    // Clear mocks
    mockFetchProducts.mockClear();
    mockSetOrderBy.mockClear();
    mockFetchCart.mockClear();

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
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
