import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { CartContextProvider, useCartContext } from "../contexts/CartContext";
import Header from "../components/Header/Header";

// CartContext의 모의 구현을 위한 커스텀 컴포넌트
const HeaderWithMockCartContext = ({ cartLength }: { cartLength: number }) => {
  const MockCartContext = () => {
    const { setCartLength } = useCartContext();

    setCartLength(cartLength);

    return <Header />;
  };

  return (
    <CartContextProvider>
      <MockCartContext />
    </CartContextProvider>
  );
};

describe("Header 컴포넌트", () => {
  beforeEach(() => {
    vi.mock("assets/cart.svg", () => ({
      default: "cart-icon-url",
    }));
  });

  it("Header 컴포넌트가 올바르게 렌더링된다", () => {
    render(
      <CartContextProvider>
        <Header />
      </CartContextProvider>
    );

    expect(screen.getByText("SHOP")).toBeInTheDocument();
    expect(screen.getByAltText("cart-icon")).toBeInTheDocument();
  });

  it("장바구니가 비어있을 때 숫자가 표시되지 않는다", () => {
    render(<HeaderWithMockCartContext cartLength={0} />);

    const cartCountElement = screen.queryByText("0");
    expect(cartCountElement).not.toBeVisible();
  });

  it("장바구니에 아이템이 있을 때 숫자가 표시된다", () => {
    render(<HeaderWithMockCartContext cartLength={3} />);

    const cartCountElement = screen.getByText("3");
    expect(cartCountElement).toBeVisible();
  });
});
