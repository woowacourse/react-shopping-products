import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { CartContextProvider } from "../contexts/CartContext";
import React from "react";
import { ProductContextProvider } from "../contexts/ProductContext";

// Create a consistent error reference to avoid infinite re-renders
const productError = new Error("제품 정보를 가져오는데 실패했습니다.");
const cartError = new Error("장바구니 정보를 가져오는데 실패했습니다.");
const networkError = new TypeError("Failed to fetch");

// Mock useFetch hook
vi.mock("../hooks/useFetch", () => {
  const mockFetcher = vi.fn();

  return {
    default: vi.fn((url) => {
      // Case 1: Mock product fetch error
      if (url.toString().includes("products") && mockProductFetchError.active) {
        return {
          data: null,
          isLoading: false,
          error: productError, // Use consistent reference
          fetcher: mockFetcher,
        };
      }

      // Case 2: Mock cart fetch error
      if (url.toString().includes("cart-items") && mockCartFetchError.active) {
        return {
          data: null,
          isLoading: false,
          error: cartError, // Use consistent reference
          fetcher: mockFetcher,
        };
      }

      // Case 3: Network error
      if (mockNetworkError.active) {
        return {
          data: null,
          isLoading: false,
          error: networkError, // Use consistent reference
          fetcher: mockFetcher,
        };
      }

      // Default case for cart operations
      if (url.toString().includes("cart-items")) {
        return {
          data: null,
          isLoading: false,
          error: null,
          fetcher: mockFetcher,
        };
      }

      // Default: Success with empty data
      return {
        data: { content: [] },
        isLoading: false,
        error: null,
        fetcher: mockFetcher,
      };
    }),
  };
});

// Create mock flags for controlling error states
const mockProductFetchError = { active: false };
const mockCartFetchError = { active: false };
const mockNetworkError = { active: false };

// Reset mock flags before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockProductFetchError.active = false;
  mockCartFetchError.active = false;
  mockNetworkError.active = false;
});

describe("ErrorToast 컴포넌트 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    // Enable product fetch error
    mockProductFetchError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Check that the error toast appears with the correct message
    await waitFor(() => {
      expect(
        screen.getByText("제품 정보를 가져오는데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    // Enable cart fetch error
    mockCartFetchError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Check that the error toast appears with the correct message
    await waitFor(() => {
      expect(
        screen.getByText("장바구니 정보를 가져오는데 실패했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("네트워크 에러 발생시 에러 토스트가 화면에 표시되어야 함", async () => {
    // Enable network error
    mockNetworkError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorContextProvider>
    );

    // Check that the error toast appears with the correct message
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
    });
  });

  test("여러 개의 에러가 동시에 발생했을 때 마지막 에러 토스트가 표시되어야 함", async () => {
    // Enable both product and cart errors
    mockProductFetchError.active = true;
    mockCartFetchError.active = true;

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText("장바구니 정보를 가져오는데 실패했습니다.")
      ).toBeInTheDocument();

      expect(
        screen.queryByText("제품 정보를 가져오는데 실패했습니다.")
      ).not.toBeInTheDocument();
    });
  });
});
