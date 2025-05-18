import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { ProductContextProvider } from "../contexts/ProductContext";
import { CartContextProvider } from "../contexts/CartContext";
import React from "react";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";

// Define types for our mock context values to match ContextType interfaces
interface MockProductContextType {
  productsData: Product[] | undefined;
  productFetchLoading: boolean;
  productFetchError: Error | null;
  fetchProducts: () => Promise<void>;
  orderBy: string; // Assuming OrderByOptionType is a string subtype
  setOrderBy: (orderBy: string) => void;
}

interface MockCartContextType {
  cartData: CartItem[] | undefined;
  cartFetchLoading: boolean;
  cartFetchError: Error | null;
  fetchCart: () => Promise<void>;
}

// Default mock values for contexts
let mockProductContextValue: MockProductContextType = {
  productsData: undefined,
  productFetchLoading: false,
  productFetchError: null,
  fetchProducts: vi.fn(() => Promise.resolve()),
  orderBy: "낮은 가격순",
  setOrderBy: vi.fn(),
};

let mockCartContextValue: MockCartContextType = {
  cartData: undefined,
  cartFetchLoading: false,
  cartFetchError: null,
  fetchCart: vi.fn(() => Promise.resolve()),
};

// Mock the contexts
vi.mock("../contexts/ProductContext", async () => {
  const actual = await vi.importActual("../contexts/ProductContext");
  return {
    ...(actual as object),
    useProductContext: () => mockProductContextValue,
  };
});

vi.mock("../contexts/CartContext", async () => {
  const actual = await vi.importActual("../contexts/CartContext");
  return {
    ...(actual as object),
    useCartContext: () => mockCartContextValue,
  };
});

// Mock the ErrorContext to spy on showError
const mockShowError = vi.fn();
vi.mock("../contexts/ErrorContext", async () => {
  const actual = await vi.importActual("../contexts/ErrorContext");
  return {
    ...(actual as Record<string, unknown>),
    useErrorContext: () => ({
      showError: mockShowError,
    }),
  };
});

// Reset mocks and context values before each test
beforeEach(() => {
  vi.clearAllMocks();
  // Reset to default (no error) states, ensuring types match
  mockProductContextValue = {
    productsData: [], // This is Product[] | undefined, so [] is valid
    productFetchLoading: false,
    productFetchError: null, // This is Error | null, so null is valid
    fetchProducts: vi.fn(() => Promise.resolve()),
    orderBy: "낮은 가격순",
    setOrderBy: vi.fn(),
  };
  mockCartContextValue = {
    cartData: [], // This is CartItem[] | undefined, so [] is valid
    cartFetchLoading: false,
    cartFetchError: null, // This is Error | null, so null is valid
    fetchCart: vi.fn(() => Promise.resolve()),
  };
});

describe("App 에러 처리 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    // Simulate product fetch error
    mockProductContextValue.productFetchError = new Error(
      "제품 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    // Simulate cart fetch error
    mockCartContextValue.cartFetchError = new Error(
      "장바구니 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("여러 개의 에러가 발생했을 때 모든 에러가 처리되어야 함", async () => {
    // Simulate both product and cart fetch errors
    mockProductContextValue.productFetchError = new Error(
      "제품 정보를 가져오는데 실패했습니다."
    );
    mockCartContextValue.cartFetchError = new Error(
      "장바구니 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledTimes(2);
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("에러가 없는 경우 에러 처리가 호출되지 않아야 함", async () => {
    // Default state (no errors) is set in beforeEach

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(
      () => {
        expect(mockProductContextValue.fetchProducts).toHaveBeenCalled(); // Ensure fetch was called
        expect(mockCartContextValue.fetchCart).toHaveBeenCalled(); // Ensure fetch was called
      },
      { timeout: 500 }
    );
    // Give a very brief moment for any potential async error handling to trigger (it shouldn't)
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockShowError).not.toHaveBeenCalled();
  });

  test("네트워크 에러 (TypeError Failed to fetch)가 ProductContext에서 발생시 에러 토스트가 표시되어야 함", async () => {
    // Simulate a TypeError similar to a network error from ProductContext
    mockProductContextValue.productFetchError = new TypeError(
      "Failed to fetch"
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Failed to fetch",
        })
      );
    });
  });

  test("네트워크 에러 (TypeError Failed to fetch)가 CartContext에서 발생시 에러 토스트가 표시되어야 함", async () => {
    // Simulate a TypeError similar to a network error from CartContext
    mockCartContextValue.cartFetchError = new TypeError("Failed to fetch");

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Failed to fetch",
        })
      );
    });
  });
});
