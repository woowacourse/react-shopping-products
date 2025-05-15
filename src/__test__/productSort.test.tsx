import { render, screen, waitFor } from "@testing-library/react";
import ProductCardList from "../components/productCardList/ProductCardList";
import { useState } from "react";
import { ProductPageResponse } from "../types/response.types";
import { describe, it, expect } from "vitest";

function Wrapper({ sort }: { sort: "낮은 가격순" | "높은 가격순" }) {
  const [products, setProducts] = useState<ProductPageResponse | null>(null);

  return (
    <ProductCardList
      products={products}
      setProducts={setProducts}
      category="전체"
      sort={sort}
      cartItemIds={[]}
      setCartItemIds={() => {}}
      setErrorTrue={() => {}}
      fetchCartProducts={() => {}}
    />
  );
}

// 💡 "숫자 추출 유틸"
function extractPricesFromScreen(): number[] {
  return screen
    .getAllByText(/원$/)
    .map((el) => el.textContent?.replace(/[^\d]/g, "") || "")
    .map(Number);
}

describe("상품 정렬 테스트", () => {
  it("낮은 가격순(오름차순) 정렬이 되어야 한다", async () => {
    render(<Wrapper sort="낮은 가격순" />);

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      expect(prices).toHaveLength(20);
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });
  });

  it("높은 가격순(내림차순) 정렬이 되어야 한다", async () => {
    render(<Wrapper sort="높은 가격순" />);

    await waitFor(() => {
      const prices = extractPricesFromScreen();
      expect(prices).toHaveLength(20);
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    });
  });
});
