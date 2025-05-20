import { ReactNode } from "react";
import { vi } from "vitest";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { server } from "../mocks/node";
import { http, HttpResponse } from "msw";
import { URLS } from "../constants/url";

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

  // Reset MSW handlers to defaults
  server.resetHandlers();
};

// Mock product error
export const productError = new Error("제품 정보를 가져오는데 실패했습니다.");
export const cartError = new Error("장바구니 정보를 가져오는데 실패했습니다.");
export const networkError = new TypeError("Failed to fetch");

// Setup MSW handlers for different error scenarios
export const setupProductError = () => {
  mockProductFetchError.active = true;
  server.use(
    http.get(URLS.PRODUCTS, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
};

export const setupCartError = () => {
  mockCartFetchError.active = true;
  server.use(
    http.get(URLS.CART_ITEMS, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
};

export const setupNetworkError = () => {
  mockNetworkError.active = true;
  server.use(
    http.get("*", () => {
      return HttpResponse.error();
    })
  );
};

export const setupMultipleErrors = () => {
  mockProductFetchError.active = true;
  mockCartFetchError.active = true;

  // Setup product error first
  server.use(
    http.get(URLS.PRODUCTS, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  // Then cart error (which should be displayed last)
  server.use(
    http.get(URLS.CART_ITEMS, () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
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
    resetMocks();
  }

  return <ErrorContextProvider>{children}</ErrorContextProvider>;
};
