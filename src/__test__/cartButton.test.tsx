import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartButton from "../components/cartButton/CartButton";
import * as domain from "../components/cartButton/cartButton.domain";

vi.mock("../hooks/useData", () => ({
  useData: () => ({
    setCartItemIds: vi.fn(),
    fetchCartProducts: vi.fn(),
  }),
}));

describe("CartButton", () => {
  const defaultProps = {
    productId: 4,
    cartId: 10,
    cartAmount: 1,
    productQuantity: 10,
    quantity: 1,
    setErrorTrue: vi.fn(),
    setToggle: vi.fn(),
  };

  it("담기 버튼 클릭 시 addItemToCart 호출", async () => {
    const mockAdd = vi
      .spyOn(domain, "addItemToCart")
      .mockResolvedValue(undefined);

    render(<CartButton {...defaultProps} isToggled={false} />);

    const button = await screen.findByText("담기");
    fireEvent.click(button);

    expect(mockAdd).toBeCalled();
  });

  it("+ 버튼 클릭 시 PlusItem 호출", async () => {
    const mockPlus = vi.spyOn(domain, "PlusItem").mockResolvedValue(undefined);

    render(<CartButton {...defaultProps} isToggled={true} />);

    const plusButton = await screen.findByText("+");
    fireEvent.click(plusButton);

    expect(mockPlus).toBeCalled();
  });

  it("- 버튼 클릭 시 MinusItem 호출", async () => {
    const mockMinus = vi
      .spyOn(domain, "MinusItem")
      .mockResolvedValue(undefined);

    render(<CartButton {...defaultProps} isToggled={true} quantity={2} />);

    const minusButton = await screen.findByText("-");
    fireEvent.click(minusButton);

    expect(mockMinus).toBeCalled();
  });

  it("수량 1에서 감소 버튼 클릭 시 removeItemToCart 호출", async () => {
    const mockRemove = vi
      .spyOn(domain, "removeItemToCart")
      .mockResolvedValue(undefined);

    render(<CartButton {...defaultProps} isToggled={true} quantity={1} />);

    const minusButton = await screen.findByText("-");
    fireEvent.click(minusButton);

    expect(mockRemove).toBeCalled();
  });
  it("최대 수량에서 + 버튼 클릭 시 setErrorTrue 호출", async () => {
    const setErrorTrue = vi.fn();

    vi.spyOn(domain, "PlusItem").mockImplementation(
      async ({ quantity, productQuantity, setErrorTrue }) => {
        if ((quantity ?? 0) >= productQuantity) {
          setErrorTrue("CART_ADD");
        }
      }
    );

    render(
      <CartButton
        {...defaultProps}
        isToggled={true}
        quantity={10}
        productQuantity={10}
        setErrorTrue={setErrorTrue}
      />
    );

    const plusButton = await screen.findByText("+");
    fireEvent.click(plusButton);

    expect(setErrorTrue).toHaveBeenCalledWith("CART_ADD");
  });
});
