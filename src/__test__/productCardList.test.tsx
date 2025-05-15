import { render, screen, waitFor } from "@testing-library/react";
import { useState } from "react";
import { ProductPageResponse } from "../types/response.types";
import ProductCardList from "../components/productCardList/ProductCardList";
import { expect, test } from "vitest";

test("ProductCardList는 API에서 상품을 받아와 20개의 상품을 렌더링한다", async () => {
  function Wrapper() {
    const [products, setProducts] = useState<ProductPageResponse | null>(null);

    return (
      <ProductCardList
        products={products}
        setProducts={setProducts}
        category="전체"
        sort="낮은 가격순"
        cartItemIds={[]}
        setCartItemIds={() => {}}
        setErrorTrue={() => {}}
        fetchCartProducts={() => {}}
      />
    );
  }

  render(<Wrapper />);

  await waitFor(
    () => {
      const headings = screen.getAllByRole("heading", { level: 3 });
      expect(headings).toHaveLength(20);
    },
    { timeout: 3000 }
  );
});
