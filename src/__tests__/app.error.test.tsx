import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { CartContextProvider } from "../contexts/CartContext";
import React from "react";

// Mock useFetch hook to simulate different errors
vi.mock("../hooks/useFetch", () => ({
  default: vi.fn((url) => {
    // Case 1: Mock product fetch error
    if (url.toString().includes("products") && mockProductFetchError.active) {
      return {
        data: null,
        isLoading: false,
        error: new Error("제품 정보를 가져오는데 실패했습니다."),
        fetcher: vi.fn(),
      };
    }

    // Case 2: Mock cart fetch error
    if (url.toString().includes("cart-items") && mockCartFetchError.active) {
      return {
        data: null,
        isLoading: false,
        error: new Error("장바구니 정보를 가져오는데 실패했습니다."),
        fetcher: vi.fn(),
      };
    }

    // Case 3: Network error
    if (mockNetworkError.active) {
      return {
        data: null,
        isLoading: false,
        error: new TypeError("Failed to fetch"),
        fetcher: vi.fn(),
      };
    }

    // Default case for cart operations (POST/DELETE)
    if (url.toString().includes("cart-items")) {
      return {
        data: null,
        isLoading: false,
        error: null,
        fetcher: vi.fn(),
      };
    }

    // Default case: Return success response with empty data
    return {
      data: { content: [] },
      isLoading: false,
      error: null,
      fetcher: vi.fn(),
    };
  }),
}));

// Create mock functions that we can enable in specific tests
const mockProductFetchError = { active: false };
const mockCartFetchError = { active: false };
const mockNetworkError = { active: false };

// Mock the ErrorContext
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

// Mock the CartContext
const mockSetCartLength = vi.fn();
let mockCartLength = 0;

vi.mock("../contexts/CartContext", () => ({
  useCartContext: () => ({
    setCartLength: mockSetCartLength,
    cartLength: mockCartLength,
  }),
  CartContextProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

// Reset mock functions before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockCartLength = 0;
  mockProductFetchError.active = false;
  mockCartFetchError.active = false;
  mockNetworkError.active = false;
});

describe("App 에러 처리 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    // Enable product fetch error for this test
    mockProductFetchError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Verify that showError was called with the correct error
    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    // Enable cart fetch error for this test
    mockCartFetchError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Verify that showError was called with the correct error
    await waitFor(() => {
      // Check that the error message is shown

      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("여러 개의 에러가 발생했을 때 모든 에러가 처리되어야 함", async () => {
    // Enable both product and cart fetch errors
    mockProductFetchError.active = true;
    mockCartFetchError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Verify that showError was called for both errors
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
    // Both errors disabled by default in beforeEach

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Wait a bit to make sure error handling had a chance to run
    await waitFor(
      () => {
        expect(mockShowError).not.toHaveBeenCalled();
      },
      { timeout: 500 }
    );
  });

  test("네트워크 에러 발생시 에러 토스트가 표시되어야 함", async () => {
    // Enable network error
    mockNetworkError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Verify that showError was called with the correct error
    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "Failed to fetch",
        })
      );
    });
  });
});
