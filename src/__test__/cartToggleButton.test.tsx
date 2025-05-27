// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CartToggleButton from "../components/cartToggleButton/CartToggleButton";
import "@testing-library/jest-dom";
import { ToastProvider } from "../provider/ToastProvider";
import { DataProvider } from "../provider/DataProvider";

const TEST_PRODUCT_ID = 4;

describe("CartToggleButton 컴포넌트", () => {
  it("상품이 장바구니에 없을 때는 '담기' 버튼이 보인다", () => {
    render(
      <DataProvider>
        <ToastProvider>
          <CartToggleButton
            productId={TEST_PRODUCT_ID}
            isAdded={false}
            isSoldOut={false}
            quantity={10}
            cartAmount={0}
          />
        </ToastProvider>
      </DataProvider>
    );

    expect(screen.getByText("담기")).toBeInTheDocument();
  });

  it("상품이 장바구니에 있을 때는 수량 조절 버튼이 보인다", () => {
    render(
      <DataProvider>
        <ToastProvider>
          <CartToggleButton
            productId={TEST_PRODUCT_ID}
            cartId={1}
            isAdded={true}
            isSoldOut={false}
            quantity={10}
            cartAmount={0}
          />
        </ToastProvider>
      </DataProvider>
    );

    expect(screen.getByRole("button", { name: "-" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+" })).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });
});
