// CartButton.test.tsx
import { render, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import CartButton from "../components/CartButton/CartButton";
import React from "react";

// Mock useFetch hook
vi.mock("../hooks/useFetch", () => ({
  default: vi.fn(() => {
    return {
      data: null,
      isLoading: false,
      error: null,
      fetcher: vi.fn(),
    };
  }),
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
});

describe("CartButton 컴포넌트 테스트", () => {
  test("장바구니에 최대 개수(50개) 이상 담으려고 할 때 에러가 발생해야 함", async () => {
    // Set cart length to maximum (50)
    mockCartLength = 50;

    const mockRefetchCart = vi.fn();

    render(
      <ErrorContextProvider>
        <CartButton
          isInCart={false}
          refetchCart={mockRefetchCart}
          productId={1}
        />
      </ErrorContextProvider>
    );

    // Trigger the add to cart action
    const addToCartButton = document.querySelector("button");
    fireEvent.click(addToCartButton!);

    // Verify that showError was called with the correct error message
    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 갯수가 50개 이상 담을수 없습니다.",
        })
      );
    });

    // The refetchCart should not be called when we have an error
    expect(mockRefetchCart).not.toHaveBeenCalled();
  });

  test("장바구니에 상품 추가 기능이 동작해야 함", async () => {
    mockCartLength = 5; // 아직 최대 개수에 도달하지 않음

    const mockRefetchCart = vi.fn();

    render(
      <ErrorContextProvider>
        <CartButton
          isInCart={false}
          refetchCart={mockRefetchCart}
          productId={1}
        />
      </ErrorContextProvider>
    );

    // Trigger the add to cart action
    const addToCartButton = document.querySelector("button");
    fireEvent.click(addToCartButton!);

    // 에러가 발생하지 않아야 함
    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });

    // refetchCart가 호출되어야 함
    expect(mockRefetchCart).toHaveBeenCalled();
  });

  test("장바구니에서 상품 제거 기능이 동작해야 함", async () => {
    const mockRefetchCart = vi.fn();

    render(
      <ErrorContextProvider>
        <CartButton
          isInCart={true} // 이미 장바구니에 있는 상태
          refetchCart={mockRefetchCart}
          productId={1}
        />
      </ErrorContextProvider>
    );

    // Trigger the remove from cart action
    const removeFromCartButton = document.querySelector("button");
    fireEvent.click(removeFromCartButton!);

    // 에러가 발생하지 않아야 함
    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });

    // refetchCart가 호출되어야 함
    expect(mockRefetchCart).toHaveBeenCalled();
  });
});
