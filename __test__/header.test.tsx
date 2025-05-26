import { render, screen } from "@testing-library/react";
import Header from "../src/components/header/Header";

describe("Header 컴포넌트", () => {
  it("장바구니 상품 개수가 전달되어 숫자가 보인다", () => {
    render(<Header openCartModal={} />);
    const cartCount = screen.queryByText("5");
    expect(cartCount).toBeTruthy();
  });

  it("장바구니에 상품이 없으면 숫자가 표시되지 않는다", () => {
    render(<Header cartItemCount={0} />);
    const badge = screen.queryByText("0");
    expect(badge).toBeNull();
  });
});
