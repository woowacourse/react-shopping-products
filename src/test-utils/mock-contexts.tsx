import { ReactNode } from "react";
import { vi } from "vitest";
import { OrderByOptionType } from "../types/categoryOption";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";
import {
  mockProducts,
  mockCartItems,
  productError,
  cartError,
} from "./mock-data";

interface ProductContextValue {
  productsData: Product[] | undefined;
  productFetchLoading: boolean;
  productFetchError: Error | null;
  fetchProducts: () => Promise<void>;
  orderBy: OrderByOptionType;
  setOrderBy: (orderBy: OrderByOptionType) => void;
}

interface CartContextValue {
  cartData: CartItem[] | undefined;
  cartFetchLoading: boolean;
  cartFetchError: Error | null;
  fetchCart: () => Promise<void>;
  setCartLength?: (cartLength: number) => void;
  cartLength?: number;
}

export const mockUseProductContext = () => {
  return {
    productsData: mockProducts,
    productFetchLoading: false,
    productFetchError: null,
    fetchProducts: vi.fn().mockResolvedValue(undefined),
    orderBy: "낮은 가격순" as OrderByOptionType,
    setOrderBy: vi.fn(),
  };
};

export const mockUseCartContext = () => {
  return {
    cartData: mockCartItems,
    cartFetchLoading: false,
    cartFetchError: null,
    fetchCart: vi.fn().mockResolvedValue(undefined),
    setCartLength: vi.fn(),
    cartLength: mockCartItems.length,
  };
};

export const setupContextMocks = () => {
  vi.mock("../contexts/ProductContext", () => ({
    useProductContext: () => mockUseProductContext(),
    ProductContextProvider: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
  }));

  vi.mock("../contexts/CartContext", () => ({
    useCartContext: () => mockUseCartContext(),
    CartContextProvider: ({ children }: { children: ReactNode }) => (
      <>{children}</>
    ),
  }));

  vi.mock("../contexts/ErrorContext", () => {
    const mockShowError = vi.fn();
    return {
      useErrorContext: () => ({
        showError: mockShowError,
        error: null,
      }),
      ErrorContextProvider: ({ children }: { children: ReactNode }) => (
        <>{children}</>
      ),
    };
  });
};

export const MockProductProvider = ({
  children,
  mockValue = {},
}: {
  children: ReactNode;
  mockValue?: Partial<ProductContextValue>;
}) => {
  vi.mock("../contexts/ProductContext", () => ({
    useProductContext: () => ({
      ...mockUseProductContext(),
      ...mockValue,
    }),
  }));

  return <>{children}</>;
};

export const MockCartProvider = ({
  children,
  mockValue = {},
}: {
  children: ReactNode;
  mockValue?: Partial<CartContextValue>;
}) => {
  vi.mock("../contexts/CartContext", () => ({
    useCartContext: () => ({
      ...mockUseCartContext(),
      ...mockValue,
    }),
  }));

  return <>{children}</>;
};

export const MockProvidersWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MockProductProvider>
      <MockCartProvider>{children}</MockCartProvider>
    </MockProductProvider>
  );
};

export const MockProductProviderWithError = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MockProductProvider
      mockValue={{
        productFetchError: productError,
        productsData: undefined,
      }}
    >
      {children}
    </MockProductProvider>
  );
};

export const MockCartProviderWithError = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MockCartProvider
      mockValue={{
        cartFetchError: cartError,
        cartData: undefined,
      }}
    >
      {children}
    </MockCartProvider>
  );
};

export const MockProductProviderLoading = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MockProductProvider
      mockValue={{
        productFetchLoading: true,
        productsData: undefined,
      }}
    >
      {children}
    </MockProductProvider>
  );
};

export const MockCartProviderLoading = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MockCartProvider
      mockValue={{
        cartFetchLoading: true,
        cartData: undefined,
      }}
    >
      {children}
    </MockCartProvider>
  );
};
