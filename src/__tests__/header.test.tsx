import { render, screen } from "@testing-library/react";
import { vi, expect } from "vitest";
import { CartContextProvider } from "../contexts/CartContext";
import Header from "../components/Header/Header";
import { CartItem } from "../types/cartContents";
import "@testing-library/jest-dom";

// Mock the cart SVG asset
vi.mock("assets/cart.svg", () => ({
  default: "cart-icon-url",
}));

// Mock useCartContext
const mockFetchCart = vi.fn();
let mockCartData: CartItem[] | undefined = [];

vi.mock("../contexts/CartContext", async () => {
  const actual = await vi.importActual("../contexts/CartContext");
  return {
    ...(actual as object), // Keep CartContextProvider
    useCartContext: () => ({
      cartData: mockCartData,
      fetchCart: mockFetchCart,
      cartFetchError: null,
      cartFetchLoading: false,
    }),
  };
});

describe("Header 컴포넌트", () => {
  beforeEach(() => {
    // Clear mocks before each test
    mockFetchCart.mockClear();
    mockCartData = [];
  });

  it("Header 컴포넌트가 올바르게 렌더링된다", () => {
    render(
      <CartContextProvider>
        <Header />
      </CartContextProvider>
    );

    expect(screen.getByText("SHOP")).toBeTruthy();
    expect(screen.getByAltText("cart-icon")).toBeTruthy();
  });

  it("장바구니가 비어있을 때 숫자가 표시되지 않는다.", () => {
    mockCartData = [];
    render(
      <CartContextProvider>
        <Header />
      </CartContextProvider>
    );

    // Check that the cart count element has the hidden attribute
    const cartCountElement = screen.getByText("0");
    expect(cartCountElement).toHaveAttribute("hidden");
  });

  it("장바구니에 아이템이 있을 때 숫자가 표시된다", () => {
    // Mock CartItem structure
    mockCartData = [
      {
        id: 1,
        quantity: 1,
        product: {
          id: 101,
          name: "Test Item 1",
          price: 10,
          imageUrl: "test1.jpg",
          category: "Test",
        },
      },
      {
        id: 2,
        quantity: 2,
        product: {
          id: 102,
          name: "Test Item 2",
          price: 20,
          imageUrl: "test2.jpg",
          category: "Test",
        },
      },
    ];

    render(
      <CartContextProvider>
        <Header />
      </CartContextProvider>
    );

    // Check that the cart count is displayed correctly
    const cartCountElement = screen.getByText("2");
    expect(cartCountElement).toBeTruthy();
    expect(cartCountElement).not.toHaveAttribute("hidden");
  });
});
