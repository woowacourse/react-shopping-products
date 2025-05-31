import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartButton from "../components/cartButton/CartButton";

const mockAddCartItem = vi.fn();
const mockHandlePlus = vi.fn();
const mockHandleMinus = vi.fn();
const mockSetErrorTrue = vi.fn();

vi.mock("../../hooks/useCartProduct", () => ({
  useCartProduct: () => ({
    setCartItemIds: vi.fn(),
    fetchCartProducts: vi.fn(),
  }),
}));

vi.mock("../../hooks/useError", () => ({
  useError: () => ({
    setErrorTrue: mockSetErrorTrue,
  }),
}));

vi.mock("../../hooks/useCartItemActions", () => ({
  useCartItemActions: () => ({
    handlePlus: mockHandlePlus,
    handleMinus: mockHandleMinus,
  }),
}));

vi.mock("../api/addCartItem", () => ({
  addCartItem: mockAddCartItem,
}));

describe("CartButton", () => {
  const defaultProps = {
    isToggled: false,
    setToggle: vi.fn(),
    productId: 4,
    cartId: 10,
    cartAmount: 1,
    productQuantity: 10,
    quantity: 1,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("담기 버튼이 렌더링되어야 한다", () => {
    render(<CartButton {...defaultProps} />);
    expect(screen.getByText("담기")).toBeInTheDocument();
  });

  it("담기 버튼 클릭 시 addCartItem 호출", () => {
    render(<CartButton {...defaultProps} />);

    const button = screen.getByText("담기");
    fireEvent.click(button);

    expect(mockAddCartItem).toHaveBeenCalled();
  });

  it("isToggled가 true일 때 ControlButton이 렌더링되어야 한다", () => {
    render(<CartButton {...defaultProps} isToggled={true} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("+ 버튼 클릭 시 handlePlus 호출", () => {
    render(<CartButton {...defaultProps} isToggled={true} />);

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(mockHandlePlus).toHaveBeenCalled();
  });

  it("- 버튼 클릭 시 handleMinus 호출", () => {
    render(<CartButton {...defaultProps} isToggled={true} quantity={2} />);

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    expect(mockHandleMinus).toHaveBeenCalled();
  });

  it("수량 1에서 감소 버튼 클릭 시 handleMinus 호출", () => {
    render(<CartButton {...defaultProps} isToggled={true} quantity={1} />);

    const minusButton = screen.getByText("-");
    fireEvent.click(minusButton);

    expect(mockHandleMinus).toHaveBeenCalled();
  });

  it("최대 수량에서 + 버튼 클릭 시 setErrorTrue 호출", () => {
    render(
      <CartButton
        {...defaultProps}
        isToggled={true}
        quantity={10}
        productQuantity={10}
      />
    );

    const plusButton = screen.getByText("+");
    fireEvent.click(plusButton);

    expect(mockSetErrorTrue).toHaveBeenCalledWith("CART_ADD");
  });
});
