import React, { ReactNode } from "react";
import { vi } from "vitest";
import { ErrorContextProvider } from "../contexts/ErrorContext";

// Mock error states
export const mockProductFetchError = { active: false };
export const mockCartFetchError = { active: false };
export const mockNetworkError = { active: false };

// Reset mock flags
export const resetMocks = () => {
  vi.clearAllMocks();
  mockProductFetchError.active = false;
  mockCartFetchError.active = false;
  mockNetworkError.active = false;
};

// Mock product error
export const productError = new Error("제품 정보를 가져오는데 실패했습니다.");
export const cartError = new Error("장바구니 정보를 가져오는데 실패했습니다.");
export const networkError = new TypeError("Failed to fetch");

// Mock useFetch hook for error toast testing
export const mockUseFetch = () => {
  vi.mock("../hooks/useFetch", () => {
    const mockFetcher = vi.fn();

    return {
      default: vi.fn((url) => {
        // Case 1: Mock product fetch error
        if (
          url.toString().includes("products") &&
          mockProductFetchError.active
        ) {
          return {
            data: null,
            isLoading: false,
            error: productError,
            fetcher: mockFetcher,
          };
        }

        // Case 2: Mock cart fetch error
        if (
          url.toString().includes("cart-items") &&
          mockCartFetchError.active
        ) {
          return {
            data: null,
            isLoading: false,
            error: cartError,
            fetcher: mockFetcher,
          };
        }

        // Case 3: Network error
        if (mockNetworkError.active) {
          return {
            data: null,
            isLoading: false,
            error: networkError,
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
};

// Wrapper component for error toast testing
export const ErrorToastTestWrapper = ({
  children,
  setupMocks = true,
}: {
  children: ReactNode;
  setupMocks?: boolean;
}) => {
  if (setupMocks) {
    mockUseFetch();
    resetMocks();
  }

  return <ErrorContextProvider>{children}</ErrorContextProvider>;
};

// Helper functions to set up specific error scenarios
export const setupProductError = () => {
  mockProductFetchError.active = true;
};

export const setupCartError = () => {
  mockCartFetchError.active = true;
};

export const setupNetworkError = () => {
  mockNetworkError.active = true;
};

export const setupMultipleErrors = () => {
  mockProductFetchError.active = true;
  mockCartFetchError.active = true;
};
