import React, { ReactNode } from "react";
import { vi } from "vitest";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";
import { OrderByOptionType } from "../types/categoryOption";

// Mock product data
export const mockProducts: Product[] = [
  {
    id: 1,
    name: "상품 1",
    price: 10000,
    imageUrl: "https://example.com/image1.jpg",
    category: "전자제품",
  },
  {
    id: 2,
    name: "상품 2",
    price: 20000,
    imageUrl: "https://example.com/image2.jpg",
    category: "의류",
  },
];

// Mock cart data
export const mockCartItems: CartItem[] = [
  {
    id: 1,
    quantity: 2,
    product: mockProducts[0],
  },
];

// Mock the context hooks
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
  };
};

// Type for ProductContext value
interface ProductContextValue {
  productsData: Product[] | undefined;
  productFetchLoading: boolean;
  productFetchError: Error | null;
  fetchProducts: () => Promise<void>;
  orderBy: OrderByOptionType;
  setOrderBy: (orderBy: OrderByOptionType) => void;
}

// Type for CartContext value
interface CartContextValue {
  cartData: CartItem[] | undefined;
  cartFetchLoading: boolean;
  cartFetchError: Error | null;
  fetchCart: () => Promise<void>;
}

// Mock providers with customizable values
export const MockProductProvider = ({
  children,
  mockValue = {},
}: {
  children: ReactNode;
  mockValue?: Partial<ProductContextValue>;
}) => {
  // Create mock implementation of the hook
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
  // Create mock implementation of the hook
  vi.mock("../contexts/CartContext", () => ({
    useCartContext: () => ({
      ...mockUseCartContext(),
      ...mockValue,
    }),
  }));

  return <>{children}</>;
};

// Combined provider for convenience
export const MockProvidersWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <MockProductProvider>
      <MockCartProvider>{children}</MockCartProvider>
    </MockProductProvider>
  );
};

// Predefined error states
export const mockProductError = new Error(
  "제품 정보를 가져오는데 실패했습니다."
);
export const mockCartError = new Error(
  "장바구니 정보를 가져오는데 실패했습니다."
);

// Error states
export const MockProductProviderWithError = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <MockProductProvider
      mockValue={{
        productFetchError: mockProductError,
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
        cartFetchError: mockCartError,
        cartData: undefined,
      }}
    >
      {children}
    </MockCartProvider>
  );
};

// Loading states
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
