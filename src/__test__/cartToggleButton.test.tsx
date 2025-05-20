// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useEffect } from "react";
import CartToggleButton from "../components/cartToggleButton/CartToggleButton";
import "@testing-library/jest-dom";
import useFetchCartProducts from "../hooks/useFetchCartProducts/useFetchCartProducts";
import { ToastProvider } from "../components/toastProvider/ToastProvider";
const TEST_PRODUCT_ID = 4;

describe("CartToggleButton 통합 테스트", () => {
  it("처음에는 '담기' 버튼이 보이고 클릭 시 장바구니에 추가되며 '빼기' 버튼으로 전환된다", async () => {
    const Wrapper = () => {
      const { cartItemIds, setCartItemIds, fetchCartProducts } =
        useFetchCartProducts();

      useEffect(() => {
        fetchCartProducts();
      }, [fetchCartProducts]);

      const item = cartItemIds.find(
        (item) => item.productId === TEST_PRODUCT_ID
      );

      return (
        <CartToggleButton
          productId={TEST_PRODUCT_ID}
          cartId={item?.cartId}
          isAdded={!!item}
          cartAmount={cartItemIds.length}
          setCartItemIds={setCartItemIds}
          fetchCartProducts={fetchCartProducts}
        />
      );
    };

    render(
      <ToastProvider>
        <Wrapper />
      </ToastProvider>
    );

    const addBtn = await screen.findByText("담기");
    expect(addBtn).toBeInTheDocument();

    fireEvent.click(addBtn);

    await waitFor(
      async () => {
        const removeBtn = await screen.findByText("빼기");
        expect(removeBtn).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const removeBtn = await screen.findByText("빼기");
    fireEvent.click(removeBtn);

    await waitFor(
      async () => {
        const newAddBtn = await screen.findByText("담기");
        expect(newAddBtn).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });
});
