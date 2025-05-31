import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CartButton from "../components/cartButton/CartButton";
import { CartProductProvider } from "../hooks/useCartProduct";
import { ErrorProvider } from "../hooks/useError";
import "@testing-library/jest-dom";

const mockAddCartItem = vi.fn().mockResolvedValue(undefined);
const mockSetErrorTrue = vi.fn();
const mockSetCartItemIds = vi.fn();
const mockFetchCartProducts = vi.fn();
const mockSetToggle = vi.fn();
const mockHandlePlus = vi.fn().mockResolvedValue(undefined);
const mockHandleMinus = vi.fn().mockResolvedValue(undefined);

vi.mock("../hooks/useCartProduct", () => ({
  useCartProduct: () => ({
    setCartItemIds: mockSetCartItemIds,
    fetchCartProducts: mockFetchCartProducts,
  }),
  CartProductProvider: ({ children }: { children: React.ReactNode }) =>
    children,
}));

vi.mock("../hooks/useError", () => ({
  useError: () => ({
    setErrorTrue: mockSetErrorTrue,
  }),
  ErrorProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock("../hooks/useCartItemActions", () => ({
  useCartItemActions: () => ({
    handlePlus: mockHandlePlus,
    handleMinus: mockHandleMinus,
  }),
}));

vi.mock("../api/addCartItem", () => ({
  addCartItem: mockAddCartItem,
}));

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <ErrorProvider>
      <CartProductProvider>{ui}</CartProductProvider>
    </ErrorProvider>
  );
};

describe("CartButton", () => {
  const defaultProps = {
    isToggled: false,
    setToggle: mockSetToggle,
    productId: 4,
    cartId: 10,
    cartAmount: 1,
    productQuantity: 10,
    quantity: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("담기 버튼이 렌더링되어야 한다", async () => {
    renderWithProvider(<CartButton {...defaultProps} />);
    expect(await screen.findByText("담기"));
  });

  it("isToggled가 true일 때 ControlButton이 렌더링되어야 한다", () => {
    renderWithProvider(<CartButton {...defaultProps} isToggled={true} />);
    expect(screen.getByText("-")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("+ 버튼 클릭 시 handlePlus가 호출되어야 한다", async () => {
    renderWithProvider(<CartButton {...defaultProps} isToggled={true} />);

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    await waitFor(() => {
      expect(mockHandlePlus).toHaveBeenCalled();
    });
  });

  it("- 버튼 클릭 시 handleMinus가 호출되어야 한다", async () => {
    renderWithProvider(<CartButton {...defaultProps} isToggled={true} />);

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    await waitFor(() => {
      expect(mockHandleMinus).toHaveBeenCalled();
    });
  });

  it("상품 수량이 0일 때 담기 버튼 클릭 시 에러가 발생해야 한다", async () => {
    renderWithProvider(<CartButton {...defaultProps} productQuantity={0} />);

    const button = screen.getByText("담기");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetErrorTrue).toHaveBeenCalledWith("CART_ADD");
    });
  });
});
