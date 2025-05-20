// CartButton.test.tsx
import { render, waitFor, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import CartButton from "../components/CartButton/CartButton";

import { CartContextProvider } from "../contexts/CartContext";
import { CartItem } from "../types/cartContents";

const mockInternalFetcher = vi.fn(() => Promise.resolve());
vi.mock("../hooks/useFetch", () => ({
  default: vi.fn(() => ({
    data: null,
    isLoading: false,
    error: null,
    fetcher: mockInternalFetcher,
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

const mockFetchCart = vi.fn(() => Promise.resolve());
let mockCartData: CartItem[] | undefined = [];

vi.mock("../contexts/CartContext", async () => {
  const actual = await vi.importActual("../contexts/CartContext");
  return {
    ...(actual as object),
    useCartContext: () => ({
      fetchCart: mockFetchCart,
      cartData: mockCartData,
      cartFetchLoading: false,
      cartFetchError: null,
    }),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  mockCartData = [];
  mockInternalFetcher.mockClear();
  mockFetchCart.mockClear();
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
    });

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <CartButton productId={2} />
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

    expect(mockFetchCart).not.toHaveBeenCalled();
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
    });

    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <CartButton productId={2} />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    const addToCartButton = document.querySelector("button");
    fireEvent.click(addToCartButton!);

    await waitFor(() => {
      expect(mockInternalFetcher).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });

    expect(mockFetchCart).toHaveBeenCalled();
  });

  test("장바구니에서 상품 제거 기능이 동작해야 함", async () => {
    render(
      <ErrorContextProvider>
        <CartContextProvider>
          <CartButton productId={2} cartItemId={101} />
        </CartContextProvider>
      </ErrorContextProvider>
    );

    const removeFromCartButton = document.querySelector("button");
    fireEvent.click(removeFromCartButton!);

    await waitFor(() => {
      expect(mockInternalFetcher).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockShowError).not.toHaveBeenCalled();
    });

    expect(mockFetchCart).toHaveBeenCalled();
  });
});
