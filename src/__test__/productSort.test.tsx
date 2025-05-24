import { render, screen, waitFor } from "@testing-library/react";
import ProductCardList from "../components/productCardList/ProductCardList";
import { describe, it, expect } from "vitest";
import { ToastProvider } from "../components/toastProvider/ToastProvider";

function Wrapper({ sort }: { sort: "낮은 가격순" | "높은 가격순" }) {
  return (
    <ProductCardList
      category="전체"
      sort={sort}
      cartItemIds={[]}
      setCartItemIds={() => {}}
      fetchCartProducts={() => {}}
    />
  );
}

function extractPricesFromScreen(): number[] {
  return screen
    .getAllByText(/원$/)
    .map((el) => el.textContent?.replace(/[^\d]/g, "") || "")
    .map(Number);
}

describe("상품 정렬 테스트", () => {
  it("낮은 가격순(오름차순) 정렬이 되어야 한다", async () => {
    render(
      <ToastProvider>
        <Wrapper sort="낮은 가격순" />
      </ToastProvider>
    );

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      expect(prices).toHaveLength(20);
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });
  });

  it("높은 가격순(내림차순) 정렬이 되어야 한다", async () => {
    render(
      <ToastProvider>
        <Wrapper sort="높은 가격순" />
      </ToastProvider>
    );

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      expect(prices).toHaveLength(20);
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    });
  });
});
