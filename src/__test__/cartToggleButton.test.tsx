// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useState, useEffect } from "react";
import CartToggleButton from "../components/cartToggleButton/CartToggleButton";
import "@testing-library/jest-dom";
const TEST_PRODUCT_ID = 4;

interface CartItem {
  id: number;
  product: { id: number };
}

const fetchCartItems = async (): Promise<
  { cartId: number; productId: number }[]
> => {
  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/cart-items`, {
    headers: {
      Authorization: import.meta.env.VITE_TOKEN,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.content.map((item: CartItem) => ({
    cartId: item.id,
    productId: item.product.id,
  }));
};

describe("CartToggleButton 통합 테스트 (실제 API)", () => {
  it("처음에는 '담기' 버튼이 보이고 클릭 시 장바구니에 추가되며 '빼기' 버튼으로 전환된다", async () => {
    const Wrapper = () => {
      const [cartItems, setCartItems] = useState<
        { productId: number; cartId: number }[]
      >([]);

      const updateCart = async () => {
        const items = await fetchCartItems();
        setCartItems(items);
      };

      useEffect(() => {
        updateCart();
      }, []);

      const item = cartItems.find((item) => item.productId === TEST_PRODUCT_ID);

      return (
        <CartToggleButton
          productId={TEST_PRODUCT_ID}
          cartId={item?.cartId}
          isAdded={!!item}
          cartAmount={cartItems.length}
          setCartItemIds={setCartItems}
          setErrorTrue={() => {}}
          fetchCartProducts={updateCart}
        />
      );
    };

    render(<Wrapper />);

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
