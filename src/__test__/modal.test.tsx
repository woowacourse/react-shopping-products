import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../components/modal/Modal";
import { CartProductProvider } from "../hooks/useCartProduct";

const mockCartItemIds = [
  { productId: 1, cartId: 101, quantity: 2 },
  { productId: 2, cartId: 102, quantity: 3 },
];

const mockProducts = {
  content: [
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
  ],
  totalPages: 1,
  size: 2,
};

vi.mock("../hooks/useCartProduct", () => ({
  useCartProduct: () => ({
    cartItemIds: mockCartItemIds,
    products: mockProducts,
    fetchCartProducts: vi.fn(),
    fetchProducts: vi.fn(),
    setCartItemIds: vi.fn(),
  }),
  CartProductProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("../hooks/useError", () => ({
  useError: () => ({
    setErrorTrue: vi.fn(),
  }),
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<CartProductProvider>{ui}</CartProductProvider>);
};

describe("Modal", () => {
  const mockClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("카트 아이템과 총 금액이 렌더링된다", () => {
    renderWithProvider(<Modal onClose={mockClose} />);

    expect(screen.getByText("사과")).toBeInTheDocument();
    expect(screen.getByText("바나나")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("8,000원")).toBeInTheDocument();
  });

  it("닫기 버튼 클릭 시 onClose 호출된다", () => {
    renderWithProvider(<Modal onClose={mockClose} />);
    fireEvent.click(screen.getByText("닫기"));
    expect(mockClose).toHaveBeenCalled();
  });
});
