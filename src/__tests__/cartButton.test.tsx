import { render, screen, fireEvent } from "@testing-library/react";
import { vi, expect, describe, it, beforeEach } from "vitest";
import React from "react";
import CartButton from "../components/CartButton/CartButton";
import "@testing-library/jest-dom";
import {
  mockExtendedProducts,
  mockQueryContextValue,
} from "../test-utils/mock-data";

// Mock error context
const mockShowError = vi.fn();
vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({
    showError: mockShowError,
    error: null,
  }),
}));

// Mock QueryContext
const mockUseQueryContext = vi.fn(() => ({
  ...mockQueryContextValue,
}));
vi.mock("../contexts/QueryContext", () => ({
  useQueryContext: () => mockUseQueryContext(),
}));

// Mock useGetQuery hook
const mockFetchCart = vi.fn();
vi.mock("../hooks/useGetQuery", () => ({
  useGetQuery: () => ({
    refetch: mockFetchCart,
    loading: false,
    error: null,
    data: null,
  }),
}));

// Mock useFetch hook
const mockAddCartItem = vi.fn();
vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    fetcher: mockAddCartItem,
    error: null,
    isLoading: false,
    data: null,
  }),
}));

// Mock SVG asset
vi.mock("assets/filledCart.svg", () => ({
  default: "cart-icon-url",
}));

// Mock emotion/react
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
  keyframes: (...args: string[]) => args.join(""),
  css: () => ({ name: "mock-css-result" }),
}));

// Test constants
const PRODUCT_ID = 1;
const CART_ITEM_ID = 1;

describe("CartButton 컴포넌트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("장바구니에 없는 상품은 '담기' 버튼이 렌더링된다", () => {
    // Setup: 장바구니 비어있는 상태로 설정
    vi.mocked(mockQueryContextValue.dataPool["cart-items"]).content = [];

    render(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    expect(screen.getByText("담기")).toBeInTheDocument();
    expect(screen.getByAltText("장바구니 아이콘")).toBeInTheDocument();
  });

  it("장바구니에 해당 품목이 이미 담겨져 있으면, 수량 버튼이 렌더링되어야 한다", () => {
    // Setup: 장바구니에 현재 상품이 있는 상태로 설정
    mockUseQueryContext.mockReturnValue(mockQueryContextValue);

    render(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("해당 상품이 품절되면, '품절!' 버튼이 렌더링되어야 한다", () => {
    // Setup: 품절 상품 설정
    const outOfStockProducts = [
      {
        ...mockExtendedProducts[0],
        id: PRODUCT_ID,
        quantity: 0, // 품절
      },
    ];

    mockUseQueryContext.mockReturnValue({
      ...mockQueryContextValue,
      dataPool: {
        ...mockQueryContextValue.dataPool,
        products: {
          ...mockQueryContextValue.dataPool.products,
          content: outOfStockProducts,
        },
        "cart-items": {
          ...mockQueryContextValue.dataPool["cart-items"],
          content: [],
        },
      },
    });

    render(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    expect(screen.getByText("품절!")).toBeInTheDocument();
  });

  it("로딩 중에는 버튼이 비활성화된다", () => {
    // Setup: 장바구니 비어있는 상태로 설정
    mockUseQueryContext.mockReturnValue({
      ...mockQueryContextValue,
      dataPool: {
        ...mockQueryContextValue.dataPool,
        "cart-items": {
          ...mockQueryContextValue.dataPool["cart-items"],
          content: [],
        },
      },
    });

    // Mock loading state for useFetch
    const mockUseFetch = vi.fn();
    mockUseFetch
      .mockReturnValueOnce({
        fetcher: mockAddCartItem,
        error: null,
        isLoading: false,
        data: null,
      })
      .mockReturnValueOnce({
        fetcher: mockAddCartItem,
        error: null,
        isLoading: true,
        data: null,
      });

    vi.doMock("../hooks/useFetch", () => ({
      default: () => mockUseFetch(),
    }));

    const { rerender } = render(
      <CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />
    );

    // 버튼 클릭
    const button = screen.getByText("담기").closest("button");
    fireEvent.click(button!);

    // Rerender to simulate state update
    rerender(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    // 클릭 직후 버튼이 비활성화되었는지 확인
    expect(button).toBeDisabled();
  });

  it("장바구니에 50개 이상의 품목을 담을 수 없다", async () => {
    // Setup: 장바구니에 50개의 상품이 있는 상태로 설정
    const manyItems = Array(50)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        product: mockExtendedProducts[0],
        quantity: 1,
      }));

    mockUseQueryContext.mockReturnValue({
      ...mockQueryContextValue,
      dataPool: {
        ...mockQueryContextValue.dataPool,
        "cart-items": {
          ...mockQueryContextValue.dataPool["cart-items"],
          content: manyItems,
        },
      },
    });

    // Mock addCartItem to throw error
    mockAddCartItem.mockImplementation(() => {
      throw new Error("장바구니에 50개 이상의 품목을 담을수 없습니다.");
    });

    render(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    // 버튼 클릭
    const button = screen.getByText("담기").closest("button");
    fireEvent.click(button!);

    // 에러 메시지가 표시되는지 확인
    expect(mockShowError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "장바구니에 50개 이상의 품목을 담을수 없습니다.",
      })
    );
  });

  it("장바구니 담기 성공적으로 처리된다", async () => {
    mockUseQueryContext.mockReturnValue({
      ...mockQueryContextValue,
      dataPool: {
        ...mockQueryContextValue.dataPool,
        "cart-items": {
          ...mockQueryContextValue.dataPool["cart-items"],
          content: [],
        },
      },
    });

    // Reset mocks
    mockAddCartItem.mockResolvedValue({});
    mockFetchCart.mockResolvedValue({});

    render(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    const button = screen.getByText("담기").closest("button");
    fireEvent.click(button!);

    expect(mockAddCartItem).toHaveBeenCalled();
    expect(mockFetchCart).toHaveBeenCalled();
  });

  it("장바구니 담기 실패 시 에러가 표시된다", async () => {
    // Setup: 장바구니 비어있는 상태로 설정
    mockUseQueryContext.mockReturnValue({
      ...mockQueryContextValue,
      dataPool: {
        ...mockQueryContextValue.dataPool,
        "cart-items": {
          ...mockQueryContextValue.dataPool["cart-items"],
          content: [],
        },
      },
    });

    // Mock addCartItem to throw error
    mockAddCartItem.mockImplementation(() => {
      throw new Error("Failed to add to cart");
    });

    render(<CartButton productId={PRODUCT_ID} cartItemId={CART_ITEM_ID} />);

    // 버튼 클릭
    const button = screen.getByText("담기").closest("button");
    fireEvent.click(button!);

    // 에러 메시지가 표시되는지 확인
    expect(mockShowError).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Failed to add to cart",
      })
    );
  });
});
