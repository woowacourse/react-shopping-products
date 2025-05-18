// CartButton.test.tsx
import { render, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import CartButton from "../components/CartButton/CartButton";
import React from "react";
import { CartContextProvider } from "../contexts/CartContext"; // Import the real provider
import { CartItem } from "../types/cartContents"; // Import CartItem type

// Mock useFetch hook - keep this for internal POST/DELETE in CartButton for now
// If CartButton is refactored to use context for POST/DELETE, this can be removed.
const mockInternalFetcher = vi.fn(() => Promise.resolve());
vi.mock("../hooks/useFetch", () => ({
  default: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
    fetcher: mockInternalFetcher, // Mock the internal fetcher
  })),
}));

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
const mockFetchCart = vi.fn(() => Promise.resolve());
let mockCartData: CartItem[] | undefined = []; // Use CartItem[] type

vi.mock("../contexts/CartContext", async () => {
  const actual = await vi.importActual("../contexts/CartContext"); // Get actual context for Provider
  return {
    ...(actual as object), // Spread actual to keep CartContextProvider
    useCartContext: () => ({
      fetchCart: mockFetchCart,
      cartData: mockCartData,
      cartFetchLoading: false,
      cartFetchError: null,
    }),
  };
});

// Reset mock functions before each test
beforeEach(() => {
  vi.clearAllMocks();
  mockCartData = []; // Reset cart data
  mockInternalFetcher.mockClear(); // Clear internal fetcher mock
  mockFetchCart.mockClear(); // Clear fetchCart mock
});

describe("CartButton 컴포넌트 테스트", () => {
  test("장바구니에 최대 개수(50개) 이상 담으려고 할 때 에러가 발생해야 함", async () => {
    mockCartData = new Array(50).fill({
      id: 1,
      product: {
        id: 1,
        name: "Test Product",
        price: 100,
        imageUrl: "test.jpg",
        category: "Test Category",
      },
      quantity: 1,
    }); // Set cart data to maximum

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <CartButton
            isInCart={false}
            // refetchCart is no longer a prop
            productId={1}
          />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    const addToCartButton = document.querySelector("button");
    fireEvent.click(addToCartButton!);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 갯수가 50개 이상 담을수 없습니다.",
        })
      );
    });

    expect(mockFetchCart).not.toHaveBeenCalled(); // fetchCart from context should not be called on error
  });

  test("장바구니에 상품 추가 기능이 동작해야 함", async () => {
    mockCartData = new Array(5).fill({
      id: 1,
      product: {
        id: 1,
        name: "Test Product",
        price: 100,
        imageUrl: "test.jpg",
        category: "Test Category",
      },
      quantity: 1,
    }); // Not at max capacity

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <CartButton
            isInCart={false}
            // refetchCart is no longer a prop
            productId={1}
          />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    const addToCartButton = document.querySelector("button");
    fireEvent.click(addToCartButton!);

    await waitFor(() => {
      // The internal addCartItem (useFetch) should be called
      expect(mockInternalFetcher).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });

    // fetchCart from context should be called after successful internal add
    expect(mockFetchCart).toHaveBeenCalled();
  });

  test("장바구니에서 상품 제거 기능이 동작해야 함", async () => {
    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <CartButton
            isInCart={true} // Already in cart
            // refetchCart is no longer a prop
            productId={1}
            cartItemId={101} // Provide a cartItemId for deletion
          />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    const removeFromCartButton = document.querySelector("button");
    fireEvent.click(removeFromCartButton!);

    await waitFor(() => {
      // The internal deleteCartItem (useFetch) should be called
      expect(mockInternalFetcher).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });

    // fetchCart from context should be called after successful internal delete
    expect(mockFetchCart).toHaveBeenCalled();
  });
});
