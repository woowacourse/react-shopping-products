import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import CartToggleButton from "../components/cartToggleButton/CartToggleButton";
import { CartProvider } from "../hooks/useCart";
import * as domain from "../components/cartToggleButton/cartToggleButton.domain";

describe("CartToggleButton (mock 기반)", () => {
  it("담기 버튼 클릭 시 addItemToCart가 호출되고 버튼이 비활성화된다", async () => {
    const mockAdd = vi
      .spyOn(domain, "addItemToCart")
      .mockResolvedValue(undefined);

    render(
      <CartProvider setErrorTrue={() => {}}>
        <CartToggleButton
          productId={4}
          cartId={undefined}
          isAdded={false}
          cartAmount={0}
          setErrorTrue={() => {}}
        />
      </CartProvider>
    );

    const button = await screen.findByText("담기");
    fireEvent.click(button);

    expect(mockAdd).toHaveBeenCalledWith(
      expect.objectContaining({ productId: 4 })
    );
  });

  it("빼기 버튼 클릭 시 removeItemToCart가 호출된다", async () => {
    const mockRemove = vi
      .spyOn(domain, "removeItemToCart")
      .mockResolvedValue(undefined);

    render(
      <CartProvider setErrorTrue={() => {}}>
        <CartToggleButton
          productId={4}
          cartId={10}
          isAdded={true}
          cartAmount={1}
          setErrorTrue={() => {}}
        />
      </CartProvider>
    );

    const button = await screen.findByText("빼기");
    fireEvent.click(button);

    expect(mockRemove).toHaveBeenCalledWith(
      expect.objectContaining({ cartId: 10, productId: 4 })
    );
  });
});
