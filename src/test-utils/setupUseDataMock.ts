import { vi } from "vitest";
import { DataKey } from "../types/data-types";

export const mockFetchProducts = vi.fn();
export const mockFetchCart = vi.fn();

export interface UseDataMockOptions {
  productsLoading?: boolean;
  cartLoading?: boolean;
  productsError?: Error | null;
  cartError?: Error | null;
  productsData?: unknown;
  cartData?: unknown;
}

export const setupUseDataMock = (opts: UseDataMockOptions = {}) => {
  const {
    productsLoading = false,
    cartLoading = false,
    productsError = null,
    cartError = null,
    productsData,
    cartData,
  } = opts;

  vi.doMock("../hooks/useData.ts", () => ({
    useData: vi.fn((key: DataKey) => {
      if (key === "products") {
        return {
          data: productsData,
          loading: productsLoading,
          error: productsError,
          refetch: mockFetchProducts,
          abort: vi.fn(),
        };
      }
      if (key === "cart-items") {
        return {
          data: cartData,
          loading: cartLoading,
          error: cartError,
          refetch: mockFetchCart,
          abort: vi.fn(),
        };
      }
      return {
        data: undefined,
        loading: false,
        error: null,
        refetch: vi.fn(),
        abort: vi.fn(),
      };
    }),
  }));
};
