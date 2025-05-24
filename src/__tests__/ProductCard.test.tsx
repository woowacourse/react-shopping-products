import { screen, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { vi, expect, describe, it, beforeEach, afterEach } from "vitest";
import React from "react";
import "@testing-library/jest-dom";
import {
  mockCartItems,
  mockProducts,
  mockProductsWithZeroStock,
} from "../test-utils/mock-data";
import { renderProductCardWithProviders } from "../test-utils/renderWithProviders";
import { CartItem } from "../types/cartContents";
import { ProductWithQuantity } from "../types/product";
import { testStateStore } from "../mocks/handlers";
import { server } from "../mocks/node";

// 외부 컴포넌트 모킹
vi.mock("../components/ErrorToast/ErrorToast");
vi.mock("../components/Spinner/Spinner");
vi.mock("assets/filledCart.svg", () => ({
  default: "cart-icon-url",
}));

const mockShowError = vi.fn();
vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: mockShowError, error: null }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

interface MockContextValue {
  dataPool: {
    products: ProductWithQuantity[];
    "cart-items": CartItem[];
  };
  productsQuery: string;
  setProductsQuery: () => void;
  setData: () => void;
  controllers: { current: Record<string, AbortController | null> };
}

const mockContextValue: MockContextValue = {
  dataPool: {
    products: [],
    "cart-items": [],
  },
  productsQuery: "낮은 가격순",
  setProductsQuery: vi.fn(),
  setData: vi.fn(),
  controllers: { current: {} },
};

vi.mock("../contexts/QueryContext", () => {
  return {
    useQueryContext: () => mockContextValue,
    QueryContextProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
  };
});

// useFetch 훅 모킹
const mockFetchCart = vi.fn();
vi.mock("../hooks/useFetch", () => ({
  default: () => ({
    fetcher: mockFetchCart,
    error: null,
    isLoading: false,
    data: null,
  }),
}));

describe("ProductCard 컴포넌트는", () => {
  beforeEach(() => {
    testStateStore.reset();
    mockContextValue.dataPool.products = [...mockProducts];
    mockContextValue.dataPool["cart-items"] = [];
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    testStateStore.reset();
    server.resetHandlers();
  });

  it("장바구니에 없는 상품은 '담기' 버튼이 렌더링된다", async () => {
    await renderProductCardWithProviders(mockProducts[0]);
    waitFor(() => {
      expect(screen.getByText("담기")).toBeInTheDocument();
      expect(screen.getByAltText("장바구니 아이콘")).toBeInTheDocument();
    });
  });

  it("장바구니에 해당 품목이 이미 담겨져 있으면, 수량 버튼이 렌더링되어야 한다", async () => {
    mockContextValue.dataPool["cart-items"] = [...mockCartItems];

    await renderProductCardWithProviders(mockProducts[0]);
    waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByAltText("장바구니 아이콘")).toBeInTheDocument();
    });
  });

  it("해당 상품이 품절되면, 품절이 보이고, 버튼이 렌더링 되지 않아야 한다.", async () => {
    mockContextValue.dataPool.products = [...mockProductsWithZeroStock];

    await renderProductCardWithProviders({
      ...mockProducts[0],
      quantity: 0,
    });
    waitFor(() => {
      expect(screen.getByText("품절")).toBeInTheDocument();
      expect(screen.queryByText("담기")).not.toBeInTheDocument();
    });
  });

  it("로딩 중에는 버튼이 비활성화된다", async () => {
    await renderProductCardWithProviders(mockProducts[0]);

    const cartButton = screen.getByRole("button", {
      name: "장바구니 아이콘 담기",
    });
    fireEvent.click(cartButton);
    waitFor(() => {
      expect(cartButton).toBeDisabled();
    });
  });

  it("장바구니에 50개 이상의 품목을 담을 수 없다", async () => {
    const dummyCartItems = Array.from(
      { length: 50 },
      () => mockCartItems
    ).flat();
    mockContextValue.dataPool.products = [...mockProducts];
    mockContextValue.dataPool["cart-items"] = [...dummyCartItems];

    await renderProductCardWithProviders(mockProducts[4]);

    const cartButton = screen.getByRole("button", {
      name: "장바구니 아이콘 담기",
    });

    fireEvent.click(cartButton);
    waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        new Error("장바구니에 50개 이상의 품목을 담을수 없습니다.")
      );
    });
  });

  it("장바구니 담기 실패 시 아무런 동작을 하지 않는다.", async () => {
    mockFetchCart.mockRejectedValue(new Error("장바구니 담기 실패"));

    await renderProductCardWithProviders(mockProducts[0]);

    const cartButton = screen.getByRole("button", {
      name: "장바구니 아이콘 담기",
    });
    fireEvent.click(cartButton);
    waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        new Error("장바구니 담기 실패")
      );
    });
  });
});
