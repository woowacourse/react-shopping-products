import { render, screen, waitFor } from "@testing-library/react";
import ProductCardList from "../components/productCardList/ProductCardList";
import { expect, test } from "vitest";
import { ToastProvider } from "../components/toastProvider/ToastProvider";

test("ProductCardList는 API에서 상품을 받아와 20개의 상품을 렌더링한다", async () => {
  function Wrapper() {
    return (
      <ProductCardList
        category="전체"
        sort="낮은 가격순"
        cartItemIds={[]}
        setCartItemIds={() => {}}
        fetchCartProducts={() => {}}
      />
    );
  }

  render(
    <ToastProvider>
      <Wrapper />
    </ToastProvider>
  );

  await waitFor(
    () => {
      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings).toHaveLength(20);
    },
    { timeout: 3000 }
  );
});
