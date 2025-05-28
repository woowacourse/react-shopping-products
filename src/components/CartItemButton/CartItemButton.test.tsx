import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { CartItemProvider } from "@/contexts/CartItemProvider";
import CartItemButton from ".";

const { mockCartItems } = vi.hoisted(() => {
  return {
    mockCartItems: [
      {
        id: 1,
        quantity: 2,
        product: {
          id: 2,
          name: "토마토",
          price: 10000,
          imageUrl: "2",
          category: "식료품",
          quantity: 5,
        },
      },
    ],
  };
});

vi.mock("@/apis/cartItems/getCartItems", () => ({
  getCartItems: vi
    .fn()
    .mockImplementation(() => Promise.resolve([...mockCartItems])),
}));

describe("CartItemButton 테스트", () => {
  it("장바구니 버튼을 클릭하면 장바구니 모달이 렌더링된다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <CartItemButton />
        </CartItemProvider>
      );
    });

    const cartItemButton = screen.getByRole("button");
    fireEvent.click(cartItemButton);
    expect(
      within(screen.getByRole("dialog")).getByText("장바구니")
    ).toBeInTheDocument();
  });

  it("장바구니에는 토마토 2개(개당 10,000원)가 담겨있어 총 결제 금액은 20,000원이다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <CartItemButton />
        </CartItemProvider>
      );
    });

    const cartItemButton = screen.getByRole("button");
    fireEvent.click(cartItemButton);

    expect(
      within(screen.getByRole("dialog")).getByText("장바구니")
    ).toBeInTheDocument();
    expect(
      within(screen.getByRole("dialog")).getByTestId("total-cart-item-price")
    ).toHaveTextContent("20,000원");
  });

  it("장바구니 닫기 버튼을 클릭하면 장바구니 모달이 닫힌다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <CartItemButton />
        </CartItemProvider>
      );
    });

    const cartItemButton = screen.getByRole("button");
    fireEvent.click(cartItemButton);

    expect(
      within(screen.getByRole("dialog")).getByText("장바구니")
    ).toBeInTheDocument();

    screen.getByRole("button", { name: "닫기" }).click();
    screen.debug();
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
