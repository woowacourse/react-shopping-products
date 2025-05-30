import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/modal/Modal";
import { useCartProduct } from "../hooks/useCartProduct";
import type { CartProductContextType } from "../hooks/useCartProduct";
import type { MockedFunction } from "vitest";

vi.mock("../hooks/useData");

describe("Modal", () => {
  const mockClose = vi.fn();
  const mockSetErrorTrue = vi.fn();

  const mockProducts = [
    {
      id: 1,
      name: "사과",
      price: 1000,
      imageUrl: "/apple.png",
      category: "식료품",
      quantity: 100,
    },
    {
      id: 2,
      name: "바나나",
      price: 2000,
      imageUrl: "/banana.png",
      category: "식료품",
      quantity: 100,
    },
  ];

  const mockCartItemIds = [
    { productId: 1, cartId: 101, quantity: 2 },
    { productId: 2, cartId: 102, quantity: 3 },
  ];

  const mockedUseData = useCartProduct as MockedFunction<
    () => CartProductContextType
  >;

  mockedUseData.mockReturnValue({
    cartItemIds: mockCartItemIds,
    products: { content: mockProducts, totalPages: 1, size: 2 },
    fetchCartProducts: vi.fn(),
    fetchProducts: vi.fn(),
    setCartItemIds: vi.fn(),
    isLoading: false,
  });

  it("카트 아이템과 총 금액이 렌더링된다", () => {
    render(<Modal onClose={mockClose} setErrorTrue={mockSetErrorTrue} />);

    expect(screen.getByText("사과")).toBeInTheDocument();
    expect(screen.getByText("바나나")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("8,000원")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose 호출된다", () => {
    render(<Modal onClose={mockClose} setErrorTrue={mockSetErrorTrue} />);
    fireEvent.click(screen.getByText("닫기"));
    expect(mockClose).toHaveBeenCalled();
  });
});
